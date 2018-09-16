#PN532 NFC shield
![||600](https://cl.ly/s6tV/Image%202018-06-07%20at%203.09.44%20PM.png)

 아두이노의 ICSP핀(SPI)을 사용해 다른핀을 충분히 활용할 수 있어 좋다나... Adafruit의 PN532 라이브러리를 활용한다.

 ***카드 구입할 때 MIFARE ISO14443A cards/tags 호환을 확인한다!!***

[구입한곳 디바이스마트](http://www.devicemart.co.kr/1383144)

[제조사 위키](https://www.elecrow.com/wiki/index.php?title=NFC_Shield)

##RFID, NFC 그리고 MiFare
참고: http://baator9.tistory.com/7
간단히 말하자면 RFID는 NFC를 포함하고 NFC는 MiFare를 포함하는 표준이다. 버스카드, 출입카드 등 어플리케이션에서 mifare가 가장 널리 사용된다. mifare는 저장 용량과 보안유무에 따라 다시 MiFare classic과 Mifare Ultralight로 구분된다.

[MiFare 프로토콜에 대한 자세한 설명 ](https://learn.adafruit.com/adafruit-pn532-rfid-nfc/mifare)

###Mifare Classic
Mifare Classic 카드(태그)는 저장용량에 따라 1K, 2K, 4K가 있고, 데이터는 아래 표와 같이 16바이트가 하나의 블록으로, 4블록이 하나의 섹터로 구분되어 저장되고 기록된다.
![||600](https://upload.wikimedia.org/wikipedia/commons/3/39/MiFare_Byte_Layout.png)

기억할 점은 사용자가 기록할 수 있는 블록이 정해져있다는 것.

| block | 용도 |
|--|--|
| block#0 				| 제조자 블록으로 카드 아이디번호 등이 담기므로 사용금지. |
| block#1,2 			| Mifare application 용으로  단순 데이터 저장용으로 사용금지. |
| block#3,7,11,15,19...	| sector trailer로 보안을 위한 key를 저장하는 곳. (특정한 기기만 특정한 태그를 인식 가능토록 함) |
| **block#4,5,6, 8,9,10, 12,13,14,...** | **여기에 데이터 저장하자.** |

기초적인 방식의 보안적용되어 블록에 데이터 쓰고 읽을 때 키을 확인해야 한다.

###MiFare Ultralight
더 싸고 가벼운 버전의 태그시스템이다. 보안따위는 전혀 없고, 한 블록은 4개 바이트로 이루어져있다. 맨 앞의 4개 블록은 사용자가 쓸 수 없고, 0x04블록부터 사용자 데이터 저장가능하다.
![||600](https://www.researchgate.net/profile/Flavio_Garcia/publication/255593385/figure/fig6/AS:297841592422425@1448022377757/Memory-of-a-Mifare-Ultralight-tag11.png)


##라이브러리 설치
[라이브러리 다운로드](https://www.elecrow.com/wiki/index.php?title=File:PN532_SPI.zip)에서 다운로드 받은 후 아두이노 IDE 메뉴 > 스케치 > 라이브러리 포함하기 > .zip 라이브러리 포함에서 다운받은 zip파일 선택하면 라이브러리 설치 됨.

라이브러리 설치 후 메뉴> 파일 > 예제 > PN532-SPI > readMifareMemory 예제 불러들여 태그 잘 읽히는 지 테스트.
![||600](https://cl.ly/s6vD/Image%202018-06-07%20at%203.29.43%20PM.png)


##태그서 DATA 읽기
###MiFare Classic 읽기
```C++
#include <PN532.h>
#include <SPI.h>

// SPI로 2개 이상의 장치가 동시에 연결될 때, SS(CS)핀을 D9,혹은 D10을 선택한다. 디폴트는 D10번핀.
#define PN532_CS 10

PN532 nfc(PN532_CS);

void setup(void){
	Serial.begin(9600); // 디버깅용
	nfc.begin();
	nfc.SAMConfig();	// PN532를 Normal Mode로 설정.
}

void loop(void){
	uint32_t id;
	id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A); 	// 카드 접근인식
	if (id != 0){	// 인식 성공하면,

		// 블록 0x08에 접근 승인받기 ...
		uint8_t keys[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};	// 기본 키
		if (nfc.authenticateBlock(1, id, 0x08, KEY_A, keys)) {	//승인 성공하면,

			uint8_t readBuffer[16];
			if (nfc.readMemoryBlock(1,0x08,readBuffer)){		// 읽기 성공하면...

				// 데이터 보여주기
				 for (int i = 0; i < 16; i++){
				 	Serial.print(readBuffer[i],HEX);	Serial.print(" ");
				 }
			}
		}
		Serial.println();
	}
	delay(500);
}
```

`boolean SAMConfig(void)` 명령으로 장치를 normal mode 로 설정한다. 여기에서 SAM은 'Security Access Module'로, PN532장치를 의미함. 모드는 Normal mode, Virtual Card mode, Wired Card mode, Dual Card mode가 있다.

`uint32_t readPassiveTargetID(uint8_t cardbaudrate)` 명령은 카드를 읽어들인 후 카드의 고유ID를 리턴함. 카드가 없을 때는 0을 리턴.

`uint32_t authenticateBlock(uint8_t cardnumber, uint32_t cid, uint8_t blockaddress, uint8_t authtype, uint8_t* keys)` 명령은 카드의 특정 메모리 블럭에 접근권한 획득.

* cardnumber can be 1 or 2 ( 최대 2장 동시 감지)
* cid is 32-bit Card ID
* blockaddress is block number (any number between 0 - 63 for MIFARE card)
* authtype is which key is to be used for authentication (either KEY_A or KEY_B)
* keys points to the byte-array holding 6 keys.

`uint32_t readMemoryBlock(uint8_t cardnumber, uint8_t blockaddress, uint8_t* block)` 메소드로 실제 블록 데이터를 읽어들여 미리 만들어둔 버퍼(uint8_t 배열 )에 저장한다. 읽기 성공하면 true를 리턴한다.

###MiFare Ultralight 읽기
classic에서 보안관련 부분만 빼고 데이터 블록 크기는 16 -> 4바이트로.

```C++
#include <PN532.h>
#include <SPI.h>

// SPI로 2개 이상의 장치가 동시에 연결될 때, SS(CS)핀을 D9,혹은 D10을 선택한다. 디폴트는 D10번핀.
#define PN532_CS 10

PN532 nfc(PN532_CS);

void setup(void){
	Serial.begin(9600); // 디버깅용
	nfc.begin();
	nfc.SAMConfig();	// PN532를 Normal Mode로 설정.
}

void loop(void){
	uint32_t id;
	id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A); 	// 카드 접근인식
	if (id != 0){	// 인식 성공하면,

			uint8_t readBuffer[4];
			if (nfc.readMemoryBlock(1,0x08,readBuffer)){		// 1block 은 4Byte.

				// 데이터 보여주기
				 for (int i = 0; i < 4; i++){
				 	Serial.print(readBuffer[i],HEX);	Serial.print(" ");
				 }
			}

		Serial.println();
	}
	delay(500);
}
```

## 태그에 데이터 쓰기
### Mifare Classic 쓰기
```C++
#include <PN532.h>
#include <SPI.h>

#define PN532_CS 10

PN532 nfc(PN532_CS);

void setup(){
	Serial.begin(9600);	//디버깅용
	nfc.begin();
	nfc.SAMConfig();	// normal모드 설정
}

void loop(){
	uint32_t id;
	id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A); 	// 카드 접근 인식
	if (id != 0){	// 인식 성공하면,

		// 블록 0x08에 접근 승인받기
		uint8_t keys[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};	// 기본 키
		if (nfc.authenticateBlock(1, id, 0x08, KEY_A, keys)) {	//승인 성공하면,

			// 기록할 데이터
			uint8_t writeBuffer[16];
			for (int i = 0; i < 16; i++){
				writeBuffer[i] = i;
			}

			// 데이터 기록하기
			bool written = nfc.writeMemoryBlock(1, 0x08, writeBuffer);
			if (written){
				Serial.println("write Successful");
			}

			// 기록한 데이터 확인
			uint8_t readBuffer[16];
			if (nfc.readMemoryBlock(1,0x08,readBuffer)){		// 읽기 성공하면...

				// 데이터 보여주기
				 for (int i = 0; i < 16; i++){
				 	Serial.print(readBuffer[i],HEX); Serial.print(" ");
				 }
			}

		}
		Serial.println();
	}
	delay(500);
}

```

`uint32_t writeMemoryBlock(uint8_t cardnumber, uint8_t blockaddress, uint8_t* block)` 메소드 사용해 인식된 카드중 cardnumber 번째 카드의 blockaddress 블록에 block배열의 내용을 기록함 (16바이트)

### Mifare Ultralight 쓰기
```C++
#include <PN532.h>
#include <SPI.h>

#define PN532_CS 10

PN532 nfc(PN532_CS);

void setup(){
	Serial.begin(9600);	//디버깅용
	nfc.begin();
	nfc.SAMConfig();	// normal모드 설정
}

void loop(){
	uint32_t id;
	id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A); 	// 카드 접근 인식
	if (id != 0){	// 인식 성공하면,

		/*  보안따위 없다.
		// 블록 0x08에 접근 승인받기
		uint8_t keys[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};	// 기본 키
		if (nfc.authenticateBlock(1, id, 0x08, KEY_A, keys)) {	//승인 성공하면*/

			// 기록할 데이터
			uint8_t writeBuffer[4];
			for (int i = 0; i < 4; i++){
				writeBuffer[i] = i;
			}

			// 데이터 기록하기
			bool written = nfc.writeMemoryBlock(1, 0x04, writeBuffer);
			if (written){
				Serial.println("write Successful");
			}

			// 기록한 데이터 확인
			uint8_t readBuffer[4];
			if (nfc.readMemoryBlock(1,0x04,readBuffer)){		// 읽기 성공하면...

				// 데이터 보여주기
				 for (int i = 0; i < 4; i++){
				 	Serial.print(readBuffer[i],HEX); Serial.print(" ");
				 }
			}

		Serial.println();
	}
	delay(500);
}

```
##주의점
* 하드웨어 인터럽트 사용시 충돌 일으키는 것으로 보임. 소프트웨어 인터럽트를 사용하는 것으로 해결 [[Software_Interrupt_(소프트웨어_인터럽트)]]
* 아두이노 d12, d13번핀에 입력장치 연결되면 간섭일으키는 것으로 보임. 회로도상에는 12,13번 핀과 아무런 연결없는데 왜 이런 현상일어나는지 모르겠음....
좀 더 테스트 필요

[[category:NFC]]
[[category:MiFare]]
[[category:RFID]]
