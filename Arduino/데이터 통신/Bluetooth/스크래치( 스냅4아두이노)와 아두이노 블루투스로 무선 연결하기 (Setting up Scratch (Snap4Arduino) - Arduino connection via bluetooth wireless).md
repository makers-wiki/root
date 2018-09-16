{{WIKI}}
== 개요 ==
스크래치 (scratch) 나 s4a, scratchX, 엔트리, snap4arduino등은 아두이노의 기본 개발환경인 C언어를 다루지 않고도 아두이노를 프로그래밍 할 수 있도록 해주기 때문에 편리하지만 USB케이블이 언제나 연결되어있어야 하는 불편이 있다.
블루투스를 사용하면 이 케이블을 제거해 무선 통신을 통해 스크래치로 아두이노를 제어토록 할 수 있다.
스크래치, 엔트리, s4a 나 snap4arduino등 도 물론이고, firmata 프로토콜을 사용해 프로세싱( processingn)이나 다른 툴로 개발한 데스크탑 어플리케이션도 당연히 같은 방법으로 블루투스를 사용해 아두이노와 연결 가능하다.

<youtube>vcpCOqo4G0c</youtube>

== 준비물 ==
아두이노 보드,  HC-06 블루투스 모듈, 9V 배터리

== 아두이노(arduino) -  스냅4아두이노( snap4arduino) 블루투스로 무선연결하기 ==
=== step 1. 블루투스 설정 ===
* 블루투스 모듈에 두가지 설정을 해주어야 하는데, 1. 통신속도를 '''standardfirmata'''에서 사용하는 57600baud로 맞추는 것과 2.다른 블루투스 기기와 구분되도록 고유한 이름을 부여하는 것.
* 먼저 블루투스 모듈에 AT command 를 입력하기위해 회로 구성하고 아두이노 스케치를 실행한다. 이 스케치에서 아두이노는 단순히 컴퓨터와는 Serial로, 블루투스 모듈과는 SoftwareSerial 로 연결해 양쪽 통신을 중계하는 역할만 한다.
https://cl.ly/1d1x0u2L231G/bluetooth%20ATcommand.png

<syntaxhighlight lan='arduino'>
#include <SoftwareSerial.h>

SoftwareSerial BTSerial(9,10); // RX | TX (블루투스 모듈의 tx|rx에 각각 연결

void setup()
{
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(9600);  // 처음 hc-06의 기본값은 9600이지만 연결이 이루어지지 않으면 19200, 38400, 57600 ...등으로 바꾸어가며 시도한다.
}

void loop()
{
  // Keep reading from HC-06 and send to Arduino Serial Monitor
  if (BTSerial.available())
  Serial.write(BTSerial.read());

  // Keep reading from Arduino Serial Monitor and send to HC-06
  if (Serial.available())
  BTSerial.write(Serial.read());
}
</syntaxhighlight>
[[파일:Bluetooth-setup-ATmode.zip|섬네일|블루투스 모듈 ATcommand 입력용 아두이노 스케치]]

* AT command가 잘작동하는지 '''AT'''(대문자!!)를 입력해 확인한다. '''OK'''라는 답이오면 OK. '''OK'''가 되돌아오지 않는 경우 가장 먼저 확인할 것은 현재 블루투스 모듈의 통신속도가 위 스케치상의 통신속도 '''BTSerial.begin(9600);'''과 다를 가능성이다. 이 때에는 9600대신 19200, 38400, 57600 ...등으로 바꾸어가며 스케치를 업로드 해 OK가 되돌아 오는 통신속도로 연결한다.

https://cl.ly/262Q0A150d3W/Screen%20Recording%202017-07-02%20at%2005.58%20PM.gif

* 여러개의 블루투스 모듈을 사용하는 경우 혼란을 방지하기 위해 블루투스모듈의 이름을 고유하게 설정한다. HC-06모듈에서 이를 위해 사용하는 명령어는 '''AT+NAME이름'''이다.
* firmata 프로토콜은 기본으로 Baudrate 57600을 사용하므로 블루투스 모듈의 속도를 이와같이 설정한다. HC-06모듈에서 사용하는 명령어는 '''AT+BAUD7 '''(대문자) 이다. (참고로 9600으로 되돌릴 때에는 '''AT+BAUD4''')

=== step 2. 아두이노에 standardFirmata 스케치 업로드 ===
* 아두이노보드에 StandardFirmata 스케치를 업로드한다.  아두이노 메뉴바에서 File -> Examples -> Firmata -> StandardFirmata 를 선택해 업로드하면 된다.

=== step 3. 회로 연결 ===
* USB 케이블을 제거하고 배터리를 사용해 아두이노에 전원 공급한다.
* 블루투스 모듈의 TX-> 아두이노 0번핀 (RX 라고 씌여있다.), 블루투스 모듈의 RX -> 아두이노 1번핀 (TX라고 씌여있다)에 연결한다.
'''''주의!!: 아두이노 스케치를 업로드할때는 반드시 아두이노 0,1번핀은 뽑아두도록 하자. 아두이노의 0,1번핀은 시리얼 통신을 위해 사용되며 USB와 연결되어있다. '''''

https://cl.ly/1E2R2U3V3K44/bluetooth-snap4arduino%20connection.png

=== step 4.  블루투스 페어링 (pairing) ===
* 운영체제의 블루투스 설정에서 새로운 블루투스장치를 검색한다.
* step1에서 설정한 블루투스 모듈 이름을 찾아 페어링 시킨다. 비밀번호는 보통 1234 혹은 0000 이다.
* 컴퓨터와 블루투스 모듈이 최초 연결 이후 재차 연결이 잘 되지 않을 때에는 페어링을 끊은 후 다시 처음부터 연결을 시도해본다.

http://cl.ly/373b0V081b1G/Screen%20Recording%202017-06-02%20at%2010.43%20PM.gif

=== step 5. snap4arduino 연결 ===
* 블루투스와 연결된 포트가 2개 이상 표시될 때, '''dev B'''라고 표시된 포트를 선택한다.  <br> [http://www.mt-system.ru/sites/default/files/documents/iwrap_spp_application_note_0.pdf dev B프로파일에 대한 설명 참고]
* 윈도우즈 경우 '''dev B'''표시 없이 '''com4, com5''' 하는 식으로 둘 이상의 포트가 보이는 경우에는. '''윈도우즈 메뉴바 -> 블루투스 -> 설정 열기 -> COM포트 '''에서 dev B라고 표시된 포트를 선택한다.
https://d3vv6lp55qjaqc.cloudfront.net/items/0N1N3Z2L3y1N280y3q33/Screen%20recording%202017-06-02%20at%2011.41.36%20PM.gif
*  연결에 성공했다는 메세지가 나오면 일반적인 USB케이블을 사용하는 것과 동일하게 snap4arduino를 사용하면 된다.

== 참고 ==
[http://www.micro4you.com/files/ElecFreaks/Bluetooth%20HC-06.pdf HC-06  블루투스 모듈 AT 명령어]

[http://www.hardcopyworld.com/ngine/aduino/index.php/archives/2101 하드카피월드 블루투스 기초]

[[category:snap4arduino]]
[[category:bluetooth]]
