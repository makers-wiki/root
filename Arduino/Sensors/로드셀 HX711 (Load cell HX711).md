{{WIKI}}
== 개요 ==
https://cdn.sparkfun.com/assets/learn_tutorials/3/8/3/HX711_and_Combinator_board_hook_up_guide-05.jpg
https://cdn.sparkfun.com/r/600-600/assets/learn_tutorials/3/8/3/HX711_and_Combinator_board_hook_up_guide-02.jpg

로드셀은 전자저울에 사용되는 부품. 보통 금속의 미세한 굽힘에 따라 달라지는 미세한 저항의 변화를 측정하는 방식 (strain gauge)으로 무게를 측정한다.
미세한 저항 변화를 감지하기 위해 휘트스톤 브릿지 (Wheatstone bridge)를 구성해 사용하거나, 간편하게 IC로 만들어진 load cell 증폭기(amplifier)를 사용한다.
HX711은  이러한  loadcell amplifier의 일종으로, 로드셀을  HX711에 연결하고  다시 HX711을 아두이노등 마이크로 컨트롤러에 연결해 사용한다.

[https://learn.sparkfun.com/tutorials/load-cell-amplifier-hx711-breakout-hookup-guide?_ga=2.201802135.728027377.1495453457-1856401587.1492456428 Sparkfun HX711 관련 자료]

== 회로 연결 ==
=== 4선식 로드셀 ===
https://cl.ly/03201u2M3u17/Load_Cell_Interface_Arduino.png
스파크펀제품은 보드에 표시된 색깔대로 연결하면 되나, 중국산 제품은 E+, E-, A+, A- 등으로 표시되어있다.
* 로드셀의 붉은 선 -> HX711보드의 E+ (Excitation+)
* 로드셀의 검은 선 -> HX711보드의 E- (Excitation-)
* 로드셀의 흰색 선 -> HX711보드의  O+(Output+) or S+(Signal+) or A+(Amplifier+)
* 로드셀의 초록 or 파란 선 -> HX711보드의  O- or S- or A-
에 각각 연결한다. (선 색깔 관련 참고->http://cfile21.uf.tistory.com/image/215EF54F55E031D422637A )

* HX711보드의 VCC(VDD) -> 아두이노의 5V전원,
* GND -> 그라운드,
* CLK는 클럭핀으로 -> 아무 디지털 핀에 연결.
* DOUT (DATA)는 데이터핀으로 -> 아무 디지털 핀에 연결.

* 출력을 확인했을 때 값이 반대로(중량을 늘리는데 값이 작아지는..) 나온다면 O+와 O-를 서로 바꾸어 연결해준다.
* 5개의 전선을 가지고 있는 로드셀의 경우 (노랑색 or foil or 굵은 검정선 추가) 나머지 한 가닥은 EMI 쉴드용. (매우 작은 신호를 변화를 다루므로 ..)
=== 3선식 로드셀 ===
3개의 전선을 가지고 있는 로드셀의 경우 휘트스톤브릿지에서 counter-load가 되는 2개의 저항을 사용하던지 동일한 로드셀을 2개, 혹은 4개를 짝지워 사용해야함.
https://cl.ly/1y0G2V3S1Y28/Image%202017-05-22%20at%209.53.01%20PM.png
https://cl.ly/3r3B2W2Z230H/Image%202017-05-22%20at%209.53.18%20PM.png
https://cl.ly/2E290b1H3E3S/Image%202017-05-22%20at%209.53.52%20PM.png
https://cl.ly/0y2S0y3J3T2K/Image%202017-05-22%20at%209.52.07%20PM.png<br>
출처: http://www.smartkit.co.kr/shop/item.php?it_id=6471914921

== 아두이노에서 ==
=== 미니멈 코드 ===
<syntaxhighlight lan="arduino">

#include "HX711.h"

#define calibration_factor -7050.0 //캘리브레이션을 통해 얻어진 값을 여기 넣는다.

#define DOUT  3 //데이터 핀
#define CLK  2 // 클럭 핀

HX711 scale(DOUT, CLK);

void setup() {
  Serial.begin(9600);  // 값 모니터링 위해서...
  scale.set_scale(calibration_factor);
  scale.tare();	//영점잡기. 현재 측정값을 0으로 둔다.
}

void loop() {
  Serial.print(scale.get_units()); //scale.get_units() returns a float
}
</syntaxhighlight>
=== Step1. 라이브러리 설치 ===
bogde가 편리한 형태로 라이브러리를 잘 만들어 두었다.
[[파일:HX711.zip|섬네일|HX711 아두이노 라이브러리 및 예제파일]]
아두이노 개발환경에서 Sketch 메뉴 > Include Library > Add .zip library로  라이브러리를 설치.

=== Step2. Calibration ===
주어진 상황에서 최초 영점을 잡기위해 캘리브레이션을 해 주어야 한다. 스파크펀에서 캘리브레이션용 스케치를 만들어 배포하고있다.
[[파일:SparkFun HX711 Calibration.zip|섬네일|스파크펀에서 제공하는 HX711 캘리브레이션용 스케치]]
<syntaxhighlight lan="arduino">

#include "HX711.h"

#define DOUT  3 //데이터핀 3번핀
#define CLK  2   // 클럭핀 2번핀

HX711 scale(DOUT, CLK);

float calibration_factor = -7050;    //로드셀 종류나 상황에 따라 적당한 값으로 시작

void setup() {
  Serial.begin(9600);
  Serial.println("HX711 calibration sketch");
  Serial.println("Remove all weight from scale");
  Serial.println("After readings begin, place known weight on scale");
  Serial.println("Press + or a to increase calibration factor");
  Serial.println("Press - or z to decrease calibration factor");

  scale.set_scale();
  scale.tare();	//Reset the scale to 0

  long zero_factor = scale.read_average(); //Get a baseline reading
  Serial.print("Zero factor: "); //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  Serial.println(zero_factor);
}

void loop() {

  scale.set_scale(calibration_factor); //Adjust to this calibration factor

  Serial.print("Reading: ");
  Serial.print(scale.get_units(), 1);
  Serial.print(" kg"); //Change this to kg and re-adjust the calibration factor if you follow SI units like a sane person 우리 한국인은 모두 이성적이므로^^
  Serial.print(" calibration_factor: ");
  Serial.print(calibration_factor);
  Serial.println();

  if(Serial.available())
  {
    char temp = Serial.read();
    if(temp == '+' || temp == 'a')
      calibration_factor += 10;
    else if(temp == '-' || temp == 'z')
      calibration_factor -= 10;
  }
}
</syntaxhighlight>
https://cl.ly/1p3R1r1f231E/Image%202017-05-22%20at%2010.52.49%20PM.png
배포되는 스케치에는 무게 단위가 lbs (파운드)로 표시되어있으므로 kg이나 g으로 바꾸어도 좋다. 그렇지만 바꾸지 않아도 기능적으로 아무런 문제는 없다. 그냥 1lbs로 표시되면 '음 1kg이군.'이라고 알아서 이해하면 족하다. (캘리브레이션은 스트레인 변화에대한 출력값의 변화 **비율**을 알아내는 것으로, 비율에는 단위가 필요없다.)
회로를 연결한 후 캘리브레이션 스케치를 실행시키고 시리얼 모니터를 열어둔다. (baud rate를  9600으로 맞추는 것 잊지말자)
로드셀에 아무것도 올려놓지 않은 상태에서 reading이 0.0이 되는 것을 확인 한 후,
이미 정확한 무게를 알고있는 물체 (추) 를 로드셀에 올려놓고 시리얼 모니터를 통해 +와 - (혹은 a와z)를 입력하면서 reading값이 물체의 무게(예를들면 1kg)와 같아질 때까지 calibration_factor를 조절한다.
이렇게 구해진 calibration_factor 값을 잘 기억해둔다.
캘리브레이션은 세팅이 바뀌지 않는 한 최초1번만 하면 된다.

===Step3. 스케치 작성 ===
* 먼저 '''#include "HX711.h"'''로 라이브러리를 불러들인 후
* '''HX711 scale(datapin, clockpin);''' 으로 오브젝트를 만들고
* '''setup()''' 에서
** '''scale.set_scale(calibration_factor);'''로 앞서 측정한 캘리브레이션 값을 적용한다.
** '''scale.tare();'''	는 현재 상태를 0으로 만드는 함수로, 용기사용 등 사용중 영점 조절 필요한 순간에도 유용하게 쓸 수 있다.
* loop()에서,
** '''float'''을 리턴하는 '''scale.get_units()'''로 값을 읽어와 사용한다.

== snap4arduino 에서 ==
=== step1. 라이브러리 설치 및 캘리브레이션 ===
회로 연결과 라이브러리 설치, calibration은 아두이노에서와 동일하다. <br>
스파크펀에서 제공하는 캘리브레이션 스케치를 사용해 캘리브레이션 값을 찾는다. [[#Step1. 라이브러리 설치| 아두이노에서 HX711 로드셀 라이브러리 설치 및 캘리브레이션하기]]
=== step2. snap4arduino+HX711LoadCell 용 아두이노 스케치 업로드 ===
아두이노보드에 첨부된 파일을 업로드한다. standardFirmata의 mod이다.<br>
[[파일:LoadCell-HX711+snap4arduino firmata-mod.ino|섬네일|로드셀HX711 + snap4arduino 아두이노 스케치]]

=== step3. snap4arduino 블록정의파일 불러오기 ===
snap4arduino에서 "import"명령을 사용해 첨부된 블록정의파일을 불러온다. (압축푼 후...)<br>
[[파일:LoadCell-HX711_snap!-blocks.zip|섬네일|로드셀HX711 + snap4arduino 블록정의파일]]<br>
불러오기 후 arduino명령 모음에 아래와 같이 두개의 블록이 추가 된 것을 확인한다.<br>
https://cl.ly/1u0m2w0s0g2P/Image%202017-05-23%20at%2010.28.55%20AM.png

=== step4.  샘플 코드 ===
https://cl.ly/1D0Q3m2a2S3A/Image%202017-05-23%20at%2010.29.38%20AM.png
[[파일:LoadCell_HX711+snap4arduino_example.xml|섬네일|로드셀HX711 +snap4arduino 예제파일]]
* '''config loadcell...''' 블록으로 로드셀을 초기화한다.
** CLKpin: 클록신호 연결된 핀
** DATApin:  데이터신호 연결된 핀
** calibrationFactor: 앞서 측정한 캘리브레이션 값
*무게 측정이 필요한 순간에  ''' read loadcell value'''블록으로 값을 읽어 사용한다.

== 참고 ==
[https://learn.sparkfun.com/tutorials/load-cell-amplifier-hx711-breakout-hookup-guide?_ga=2.201802135.728027377.1495453457-1856401587.1492456428 Sparkfun HX711 관련 자료] <br>
[https://github.com/bogde/HX711 bogde의 HX711 라이브러리]<br>
[https://github.com/sparkfun/HX711-Load-Cell-Amplifier HX711 데이타시트, 보드 회로도, calibration 스케치, 스파크펀 아두이노 예제 등]<br>

[[category:loadcell]]
[[category:snap4arduino]]
