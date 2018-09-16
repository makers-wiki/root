# ATTINY85 칩에 arduino 프로그래밍

## ATTINY85 chip
amtel에서 만든 초소형 mcu. 아두이노와 호환되므로 쉽게 아두이노 코드를 사용할 수 있지만 메모리용량이 작고 입출력 핀 갯수와 구성이 (당연히) 적다.
부트로더가 심어져있지 않으므로 아두이노 프로그래밍하듯이 usb만 꽂아서 프로그래밍 할 수는 없다. 때문에 아래와 같은 약간 번거로운 방법으로 - 아두이노보드를 ISP로 활용해 프로그래밍 하도록 한다. ATTINY85에 부트로더가 심겨져있고 USB포트가 납땜되어있어 편리하게 쓸수 있는 보드 제품 - digispark http://digistump.com/products/1 - 도 있다.

![enter image description here](https://cdn.instructables.com/FU0/N41R/J8AGYVAO/FU0N41RJ8AGYVAO.MEDIUM.jpg)
ATTINY85 스펙시트: http://www.microchip.com/wwwproducts/en/ATtiny85

## Arduino ISP 하드웨어 셋업
![enter image description here](http://highlowtech.org/wp-content/uploads/2011/06/Screen-shot-2011-06-06-at-1.46.39-PM.png)

###준비물:
* ATTINY85 칩
* 아두이노보드
* 아두이노IDE 최신버전
* 캐퍼시터 10~100uF
* 만능기판
* 점퍼와이어
* usb 케이블

###steps:
####1. 회로구성
위 그림과 같이 회로를 구성한다.
ATTINY85 칩 위의 동그랗게 표시된 쪽이 1번핀이다.
UNO----------------->Attiny
Pin 10 (RESET)----->Pin 1
Pin 11 (MOSI)------>Pin 5
Pin 12 (MISO)------>Pin 6
Pin 13 (SCK)------->Pin 7
5V-------------------->Pin 8
Gnd------------------>Pin 4
아두이노의 GND와 RST사이에 캐패시터를 설치.

####2. Attiny 보드매니저 설치
아두이노 IDE를 열고,  메뉴>Arduino>Preferences... (Mac 기준) 에서 '추가적인 보드 메니저 URLs'에 **https://raw.githubusercontent.com/damellis/attiny/ide-1.6.x-boards-manager/package_damellis_attiny_index.json** 입력.

메뉴의 툴> 보드 > 보드 매니저...에서 Attiny by David A. Mellis 를 찾아 설치.
![](https://cl.ly/341139321L0U/Image%202017-11-03%20at%205.06.01%20AM.png)

####3.  아두이노에 arduinoISP용 스케치 업로드
아두이노를 ISP 프로그래머로 만들기 위한 스케치를 아두이노에 업로드해준다. 아두이노 IDE에 기본 포함되어있다. 메뉴 > 파일 > 예제 > 11. ArduinoISP > ArduinoISP 를 업로드한다.

**나의 경우 업로드할 때에 아두이노보드의 RSET 핀에  연결된 캐퍼시터는 잠시 뽑아둔 상태에서 업로드해야만했다. (CH340, 중국산 Arduino nano)*

여기까지 arduino ISP 프로그래머가 완성되었다. 이렇게 만들어진 isp 프로그래머는 해체하지 말고 잘 보관하면서 ATTINY85 칩을 프로그래밍 할 때 계속 사용하자.
![](https://cl.ly/1i1e3u0k383M/Image%202017-11-03%20at%207.50.17%20AM.png)
####4. ATTINY에 프로그램 업로드
* 아두이노 IDE에서 업로드 원하는 프로그램 작성.(Blink 예제로 테스트 해 보자.)
* 메뉴 > 툴 에서
	- 보드: ATtiny25/45/85 선택
	- 프로세서: ATtiny85 선택
	- Clock: Internal 16MHz 선택 & 아래쪽에 '부트로더 굽기'  클릭

**클락스피드는 1/8/16중에 선택할 수 있는데, 디폴트는 1mhz임. 아두이노 우노가 16mhz로 작동하므로 호환성을 위해 16을 추천. 클락이 낮아시면 작동속도가 낮아지면서 전력소모도 적어짐. 필요에 따라 선택적으로 활용.클락스피드에 따라 delay()명령이 실제보다 길거나 짧아지는 점도 유의! (예를들어 8mhz에서는 16mhz때의 두배 시간 걸림.) external은 외부 발진자를 사용하는 경우이므로 선택할 일이 많지 않음*

* ATTINY 칩이 제자리에 잘 꽂혀있는지 확인 (동그란 마크가 1번핀 표시.)
* 캐퍼시터도 잘 꽂혀있는지 확인
* 업로드 버튼을 눌러 프로그램 업로드
![enter image description here](https://cl.ly/2Y0R2w2z0X2T/Image%202017-11-03%20at%206.12.50%20AM.png)
####5. 테스트
blink 예제를 업로드해 테스트 해 보자.
아두이노 우노와 attiny는 핀구성이 다르므로 코드를 수정해야할 수 있다. 핀 배치는 아래 이미지 참고.
![enter image description here](http://highlowtech.org/wp-content/uploads/2011/10/ATtiny45-85.png)
pin0~4라고 씌여진 핀이 디지털 입출력핀.
그 중 pin0,1은 pwm출력 가능.
analog input 이라고 씌여진 핀이 아날로그 입력핀.
**칩의 물리적인 다리 번호와 아두이노 에서 사용하는 핀 번호가 다르므로 혼동하지 말것!**

우리는 기본 제공되는 예제에 ``` #define LED_BUILTIN 4```이라는 코드를 삽입해 디지털 4번핀을 깜빡이도록 해보자.
위 표를 보면 디지털핀4번은 attiny85 칩의 3번 다리이므로 led 를 3번째 다리에 연결한다. (LED(-) 쪽은 당연히 GND에 연결된 4번째 다리...)
![enter image description here](https://cl.ly/3m03332R1m3m/download/2017-11-03%2007_01_47.gif)
![Alt text](./2017-11-03 07_01_47.gif)

##참고
http://highlowtech.org/?p=1695

[[category:Arduino]]
