# VS1053 mp3 decoder chip
![||600](https://cdn-learn.adafruit.com/assets/assets/000/011/219/medium640/adafruit_products_1381_LRG.jpg?1380121503)

참고: https://learn.adafruit.com/adafruit-vs1053-mp3-aac-ogg-midi-wav-play-and-record-codec-tutorial/assembly

mp3, ogg, acc, wav, midi등 대부분의 음악파일을 재생할 수 있다. wav파일이나 ogg으로 녹음  할 수 있다. 기본적으로 몇가지 드럼 사운드가 내장되어있어 드럼머신으로 사용할 수도 있다.

SPI 통신을 통해 아두이노 등 mcu와 통신한다. 내장된 sd 카드 슬롯도 SPI로 통신하므로 헷갈리지 않도록 주의한다. 아두이노의 기본 sd 라이브러리가 파일명을 8자 이상 인식하지 못하고 한글 파일명을 무시하는 등 문제가 많아 보다 발전된 sdFat 라이브러리를 사용하는 것을 추천함.

VLSI vs1053 칩을 사용하는 모듈이 몇가지 있는데, 여기서는 Adafruit의 제품을 사용했다. micro sd카드 슬롯이 내장되어있어 sd 라이브러리로 파일을 읽어들일 수 있다.

이어폰 출력부에 컨덴서가2개 달려있는 최근 버전은 외장 스피커에 바로 연결할 수 있지만, 없는 예전 버전 보드는 (이어폰이 아닌) 외장 스피커에 바로 연결하지는 않도록 주의하자.


## 라이브러리 설치
![||600](https://cl.ly/5ecbf6e8300a/Image%202018-12-04%20at%206.16.05%20PM.png)
라이브러리 매니저를 사용해 'adafruit vs1053'라이브러리를 설치한다.

## 회로 연결
![||600](https://cl.ly/3dcbe04b2161/Image%202018-12-04%20at%207.06.12%20PM.png)

 아두이노 uno, nano, pro mini 모두 동일하게 핀 연결 하면 된다.

## mp3파일 준비
마이크로 sd카드에 mp3파일을 준비한다. 알파벳순으로 이름을 넣어보자.
001.mp3, 2nd.mp3, aSong.mp3, badsong.mp3, 한글.mp3 ...

fat로 포맷하고 mp3파일 복사.

## 테스트
라이브러리와 함께 제공되는 'player_simple.ino' 예제 실행.
코드 중 mp3파일 이름은 수정 해주었다.

``` c++
// player_simple.ino

// 라이브러리 포함하기
#include <SPI.h>
#include <Adafruit_VS1053.h>
#include <SD.h>

// 핀 연결
//#define CLK 13       // SPI Clock, shared with SD card
//#define MISO 12      // Input data, from VS1053/SD card
//#define MOSI 11      // Output data, to VS1053/SD card
#define BREAKOUT_RESET  9      // VS1053 reset pin (output)
#define BREAKOUT_CS     10     // VS1053 chip select pin (output)
#define BREAKOUT_DCS    8      // VS1053 Data/command select pin (output)
#define SHIELD_CS     7      // VS1053 chip select pin (output)
#define SHIELD_DCS    6      // VS1053 Data/command select pin (output)
#define CARDCS 4     // Card chip select pin
#define DREQ 3       // VS1053 Data request, ideally an Interrupt pin

//mp3 모듈 오브젝트 만들기
Adafruit_VS1053_FilePlayer musicPlayer =
  Adafruit_VS1053_FilePlayer(BREAKOUT_RESET, BREAKOUT_CS, BREAKOUT_DCS, DREQ, CARDCS);

void setup() {
  Serial.begin(9600);

// mp3 시작하기
  if (! musicPlayer.begin()) {
     Serial.println(F("Couldn't find VS1053, do you have the right pins defined?"));
     while (1);
  }
  Serial.println(F("VS1053 found"));

// sd카드 시작하기  
   if (!SD.begin(CARDCS)) {
    Serial.println(F("SD failed, or not present"));
    while (1);  // don't do anything more
  }

  // 좌, 우 볼륨 셑팅. 숫자가 작을수록 큰 소리
  musicPlayer.setVolume(20,20);

  // Timer interrupts are not suggested, better to use DREQ interrupt!
  //musicPlayer.useInterrupt(VS1053_FILEPLAYER_TIMER0_INT); // timer int
  // If DREQ is on an interrupt pin (on uno, #2 or #3) we can do background
  // audio playing
  musicPlayer.useInterrupt(VS1053_FILEPLAYER_PIN_INT);  // DREQ int

  // 한 곡 끝까지 play
  musicPlayer.playFullFile("track001.mp3");

  // 백그랑운드에서 play. (REQUIRES interrupts!)
  musicPlayer.startPlayingFile("track002.mp3");
}

void loop() {
  // File is playing in the background
  if (musicPlayer.stopped()) {
    Serial.println("Done playing music");
    while (1) {
      delay(10);  // we're done! do nothing...
    }
  }


  if (Serial.available()) {
    // 키 입력을 하나 받아서
    char c = Serial.read();

    // 's' 입력 받으면 stop.
    if (c == 's') {
      musicPlayer.stopPlaying();
    }

    // if we get an 'p'입력 받으면  pause/unpause!
    if (c == 'p') {
      if (! musicPlayer.paused()) {
        Serial.println("Paused");
        musicPlayer.pausePlaying(true);
      } else {
        Serial.println("Resumed");
        musicPlayer.pausePlaying(false);
      }
    }
  }

  delay(100);
}

```

- `Adafruit_VS1053_FilePlayer musicPlayer =
  Adafruit_VS1053_FilePlayer(BREAKOUT_RESET, BREAKOUT_CS, BREAKOUT_DCS, DREQ, CARDCS);` musicPlayer 오브젝트 만들기.

- `musicPlayer.begin()`
  musicPlayer 시작하기

- `SD.begin(CARDCS)`
  sd카드 시작하기

- `musicPlayer.setVolume(20,20);`
  볼륨 셋팅하기. 값이 작을수록 큰 소리임. 좌, 우측 각각 조절

- `musicPlayer.useInterrupt(VS1053_FILEPLAYER_PIN_INT);`
  DREQ inturrupt가 on 상태로 설정되어있다면 background에서 재생 가능함.

- `musicPlayer.startPlayingFile("track002.mp3");`
 재생 시작

- `musicPlayer.pausePlaying(true); `
 잠시멈춤/ 계속재생 (true/false로 제어)

- `musicPlayer.stopPlaying();`
 멈춤 (이번 트랙 끝냄)

- `bool musicPlayer.paused()`
 현재 잠시멈춤중인지?

- `bool musicPlayer.stopped()`
 재생이 끝났는지?

라이브러리 참고: https://learn.adafruit.com/adafruit-vs1053-mp3-aac-ogg-midi-wav-play-and-record-codec-tutorial/library-reference
