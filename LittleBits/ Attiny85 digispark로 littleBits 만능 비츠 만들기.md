
## perf 사용해 모듈 만들기

* 프로그램시 번거로움때문에 usb가 달려있는 digispark보드로 일단 진행. 그러나 attiny85로 더 단순하고 저렴하게 만들수도...
* 뒷면의 배선![||600](https://cl.ly/s6nK/Image%202018-06-08%20at%204.25.01%20AM.png)
* 정면에서 보았을 때 오른쪽의 헤더핀에 i2c활용할 수 있도록 핀 구성함.
* 리틀비츠 출력에 p5를 사용했다가 p4로 수정했는데, 이유는 중국산 싸구려 digispark 클론은 p5를 곧바로 사용할 수 없기 때문.(귀찮아서) 자세한 내용은 아래에 다시 기록.
* 앞면 ![||600](https://cl.ly/s7nD/Image%202018-06-08%20at%204.26.36%20AM.png)


## 아두이노(arduino)에서 Digispark attiny85 사용하기
*  아두이노 보드매니저에 attiny85 설치
=>  arduino > preference > 추가적인 보드 매니저 URLs에 http://digistump.com/package_digistump_index.json 추가.
![||600](https://cl.ly/s7dZ/Image%202018-06-08%20at%204.26.56%20AM.png)

* 메뉴 > tool > 보드 > digispark (default 16.5mhz) 선택.
![||600](https://cl.ly/s7GA/Image%202018-06-08%20at%204.27.16%20AM.png)

* 프로그램 업로드 할 때 주의할 점은 USB가 연결되지 **않은** 상태에서 업로드 버튼을 눌러  ` Plug in device now... (will timeout in 60 seconds) > Please plug in the device ...` 메시지가 나오는 걸 확인한 후 usb를 꽂는다.

* 메카솔루션 digispark attiny85 판매 싸이트: http://mechasolution.com/shop/goods/goods_view.php?goodsno=329301&category=117001002
* Digistump.com digispark 개발사 wiki:  http://digistump.com/wiki/digispark/tutorials/connecting

* attiny85 핀 구성
![||600](https://cl.ly/s7Zq/Image%202018-06-08%20at%204.27.51%20AM.png)
기본적으로 모든 핀은 Digital I/O로 사용 가능.
Pin 0 → I2C SDA, PWM (LED on Model B)
Pin 1 → PWM (LED on Model A)
Pin 2 → I2C SCK, Analog In
Pin 3 → Analog In (also used for USB+ when USB is in use)
Pin 4 → PWM, Analog (also used for USB- when USB is in use)
Pin 5 → Analog In

p1의 리틀비츠 아웃풋
p4의 리틀비츠 인풋은 아날로그 인풋가능.
우측의 p0, 5v, p2, gnd 헤더핀을 사용해 i2c통신 가능.

## digispark attiny85에서 arduino 코딩
* Digital Write

```Arduino

void setup() {
    //All pins are capable of Digital output, though P5 is 3 V at HIGH instead of 5 V
    pinMode(0, OUTPUT); //0 is P0, 1 is P1, 2 is P2, etc. - unlike the analog inputs, for digital outputs the pin number matches.
}

void loop() {
    digitalWrite(0,HIGH); //Turn the pin HIGH (5 V)
    delay(1000);
    digitalWrite(0,LOW); //Turn the pin LOW (GND)
    delay(1000);
}
```

* Digital Read

```Arduino
int sensorValue = 0;

void setup() {
    //All pins are capable of digital input.
    pinMode(0, INPUT); //0 is P0, 1 is P1, 2 is P2, etc. - unlike the analog inputs, for digital inputs the pin number matches.
}

void loop() {
    sensorValue = digitalRead(1); //Returns HIGH or LOW (true or false / 1 or 0).
}
```

* Analog Write (PWM)

```C
void setup() {
    //P0, P1, and P4 are capable of hardware PWM (analogWrite).
    pinMode(0, OUTPUT); //0 is P0, 1 is P1, 4 is P4 - unlike the analog inputs,
                        //for analog (PWM) outputs the pin number matches the port number.
}

void loop() {
    analogWrite(0,255); //Turn the pin on full (100%)
    delay(1000);
    analogWrite(0,128); //Turn the pin on half (50%)
    delay(1000);
    analogWrite(0,0);   //Turn the pin off (0%)
    delay(1000);
}
```

* Analog read
헷갈리게도 analogRead( pin) 할 때 pin넘버에는 digispark 보드상의 핀 번호가 아니라 chip의 핀 번호를 사용해야만 한다.
**P0, P1 -> 아날로그 인풋 지원하지 않음.**
**P2 -> 1**
**P3 -> 3**
**P4 -> 2**
**P5 -> 0**

```C
int sensorValue = 0;

void setup() {
    //You need not set pin mode for analogRead - though if you have set the pin to
    //output and later want to read from it then you need to set pinMode(0,INPUT);
    //where 0 is the physical pin number not the analog input number.
    //
    //See below for the proper pinMode statement to go with each analog read.
}

void loop() {
    // The analog pins are referenced by their analog port number, not their pin
    //number and are as follows:

    sensorValue = analogRead(1); //Read P2
    //To set to input: pinMode(2, INPUT);
    //THIS IS P2, P2 is analog input 1, so when you are using analog read, you refer to it as 1.

    //sensorValue = analogRead(2); //Read P4
    //To set to input: pinMode(4, INPUT);
    //THIS IS P4, P4 is analog input 2, so when you are using analog read, you refer to it as 2.

    //sensorValue = analogRead(3); //Read P3
    //To set to input: pinMode(3, INPUT);
    //THIS IS P3, P3 is analog input 3, so when you are using analog read, you refer to it as 3.

    //sensorValue = analogRead(0); //Read P5
    //To set to input: pinMode(5, INPUT);
    //THIS IS P5, P5 is analog input 0, so when you are using analog read, you refer to it as 0.
}
```

## 중국산 저가 클론의 문제: P5번 핀 작동 안함.
* digispark attiny85 보드에서 p5핀이 왠일인지 정상작동하지 않는다. 혹은 p5 핀의 연결상태에 따라 프로그램이 작동하지 않거나 리셋된다라고 할 때에는 이 항목을 참고하기 바람.

* 일부(?) 중국산 저가 보드의 경우 p5핀이 reset 핀으로 설정된 채 출고되고있음. 이는 attiny85 칩셋에 부트로더를 프로그램하면서 설정 해 준 것을 GPIO로 사용할 수 있도록 재설정 하지 않은 때문으로 추측됨.
* 조금 번거롭지만 해결방법은 있다. 반드시 p5핀을 사용해야하는 경우라면 아래 링크를 참고해 해결할 것.
* http://thetoivonen.blogspot.kr/2015/12/fixing-pin-p5-or-6-on-digispark-clones.html

## 만능모듈의 5초 부팅시간 제거
* digispark tiny85 제품은 기본적으로 전원이 연결된 후 5초간 프로그램 업로드대기시간이 있음. 이 때문에 연결하자마자 작동하지 않고 5초간 멍때리는데, 어떤 프로젝트 의 경우 결정적으로 문제가됨.
* 5초간 프로그램 업로드를 기다리는 대신 p0핀(p5였으나 최근버전에서 p0로 변경됨.)과 gnd를 연결한 채 usb에 꽂으면 프로그램 업로드가 되는, 다른 버전의 부트로더가 제공된다.
참고: http://digistump.com/wiki/digispark/tricks
참고: https://vimeo.com/57036841
참고: https://digistump.com/board/index.php?topic=1837.0

1. https://github.com/micronucleus/micronucleus 에서 micronucleus commandline tool 을 다운받음.
2. homebew 를 사용해 libusb-compat 를 맥에 설치 (micronucleus를 빌드하는데 필요한 라이브러리)  
``` bash
$ brew install libusb-compat
```
3. 앞서받은 micronucleus command tool 이 있는 디렉토리로 이동해서 commandline tool 빌드
``` bash
$ make install
```
[[Micronucleus commandline tool]](파일:Micronucleus.zip)

4.  만들어진 micronucleus 파일로 아래에있는 부트로더파일을 업로드
```
$ micronucleus --run micronucleus-1.11-entry-jumper-pb0-upgrade.hex
```
[5초 부팅 제거된 부트로더파일(압축풀고 설치)](파일:Micronucleus-1.11-entry-jumper-pb0-upgrade.hex.zip)

*https://github.com/micronucleus/micronucleus/tree/v1.11 에서 펌웨어들을 볼 수 있는데, firmware 디렉토리가 아닌, upgrade디렉토리에 있는 펌웨어파일을 사용하도록 한다. 이유설명은 이곳에https://github.com/micronucleus/micronucleus/issues/22 *

진행중 'please plug in the device...' 라는 메세지가 나오면 digispark를 usb에 꽂아준다.
![||600](https://cl.ly/s73H/Image%202018-06-08%20at%204.29.07%20AM.png)
5. 아두이노에서 스케치가 잘 업로드 되는지 테스트. p0번 핀과 gnd를 점퍼선으로 연결한 채 usb에 꽂아야만 스케치가 올라간다.

6. 딜레이없이 전원 공급하자마자 스케치가 잘 실행된다.


## 다음 도전과제
리틀비츠 출력p1에 pwm신호를 주어도 뒤따르는 리틀비츠 모듈은 아날로그값으로 인식하지 못한다. 리틀비츠 아두이노 모듈처럼 아날로그 <->pwm스위치가 달려있다면 좋겠다. 혹은 아예 아날로그 출력으로 고정.
리틀비츠 아두이노 비츠를 보면 로패스필터로 pwm을 아날로그 신호로 만들고 있다.

[[category:littleBits]]
