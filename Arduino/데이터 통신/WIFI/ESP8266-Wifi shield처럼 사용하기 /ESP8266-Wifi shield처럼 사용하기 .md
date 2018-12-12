# ESP8266
초저가 wifi모듈이라 생각하면 된다. 사실은 단순히 wifi모듈 이상, 직접 프로그램밍 할 수 있는 MCU이다.
아두이노에 연결해 wifi기능을 사용할 수 도 있지만, 칩 자체에 아두이노 부트로더를 올리고 아두이노로 개발할 수도 있고, 혹은 micropython이나 기타 여거가지 개발환경을 사용할 수도 있다.
ESP32도 새롭게 소개되었는데, wifi + BLE 내장되어있다.

esp8266은 칩의 이름이고 이를 사용한 개발 보드가 많이 나와있는데, ESP-01 (작고 심플), ESP-12가 많이 사용된다.

ESP-01
![](http://www.hardcopyworld.com/ngine/aduino/wp-content/uploads/sites/3/2016/01/SP-WRL13678-150x150.jpg)

ESP-12
![](http://www.hardcopyworld.com/ngine/aduino/wp-content/uploads/sites/3/2016/01/20160112_142749-150x150.jpg)

제조사 페이지: https://www.espressif.com/products/hardware/esp8266ex/overview/
데이터시트: https://nurdspace.nl/ESP8266<br>
커뮤니티 포럼: https://www.esp8266.com/  
AT command :https://cdn.sparkfun.com/datasheets/Wireless/WiFi/ESP8266ModuleV1.pdf
한글자료: http://www.hardcopyworld.com/gnuboard5/bbs/board.php?bo_table=lecture_esp&wr_id=1

**ESP계열 사용시 잘 까먹는 꼭주의할 점은 모든 입출력은 3.3v라는 점!!**

## 연결테스트
일단 잘 작동하는지 컴퓨터에 UART연결해 테스트 해보자.
USB-UART 컨버터를 사용해 노트북에 연결한다.
![||600](http://remotexy.com/img/help/help-esp8266-firmware-update-usbuart.png)
![||600](https://cl.ly/2a3c25456ff5/Image%202018-11-07%20at%2010.18.16%20PM.png)

위 이미지에서 처럼

|usb-uart|esp8266|
|---|---|
|3.3v|4번 (3.3v), <br> 8번(CHPD-chip enable)|
|TX| 7번(RX)|
|RX| 2번(TX)|
|GND| 1번(GND)|
으로 연결하고, 혹시나 펌웨어 업데이트가 필요할 때에는 한시적으로

|usb-uart|esp8266|
|---|---|
|GND| 5번(GPIO0)|
을 연결한다.

![||600](https://cl.ly/515a30afe019/Image%202018-11-07%20at%2010.31.09%20PM.png)

coolterm 등 시리얼 터미널 프로그램을 사용해 연결한다.(물론 아두이노 시리얼 모니터도 좋다) 이때
초기 설정된 baudrate는 115200.
아래의 컴맨드를 넣어서 연결확인해보자. ** 명령어를 보낼 때에는 대소문자를 구분한다는 점, 그리고 리턴문자(both NL + CR)까지 보내야 한다는 점.**
![||600](https://cl.ly/4da8b2803c5f/Image%202018-11-17%20at%209.21.57%20AM.png)

아래 명령어를 차례로 입력해 작업실의 wifi에 연결하고 확인해보자.
```
AT+CWMODE=3
(Response) OK

AT+CWJAP="ssid","password"
(Response)
WIFI CONNECTED
WIFI GOT IP
OK

AT+CIFSR
(Response)
+CIFSR:APIP,"192.168.4.1"
+CIFSR:APMAC,"62:01:94:05:56:47"
+CIFSR:STAIP,"192.168.0.104"
+CIFSR:STAMAC,"60:01:94:05:56:47"  
```

![||600](https://cl.ly/5f7014a8002f/Image%202018-11-07%20at%2010.44.14%20PM.png)

잘된다.

## baudrate 변경
많은 예전 자료에서 8266을 사용하려면 가장먼저 펌웨어를 바꾸어 baudrate를 낮추어주어야 한다고 하는데, 기본 펌웨어로도 잘 된다.(사실 항상 잘 되지는 않고 데이터를 자꾸 잃어버린다. 펌웨어를 바꿀 필요는 없지만 아래 방법으로 속도를 낮추어 사용하자.)

아두이노 software Serial은 19200 bps까지밖에 지원하지 않기 때문이라는 설이 있으나 arduino uno에서는 115200까지 지원된다. 다만 attiny85라든가 클락수가 낮은 칩에서는 115200의 속도를 지원하지 않기 때문에 기본 115200으로 되어있는 시리얼 속도는 낮춰주어야 통신할 수 있다.

~~`AT+CIOBAUD=9600` 명령어로 속도를 조절한다.<br>~~
~~이 명령어는 `AT+GMR`로 버전 확인 했을 때~~
>~~AT version:0.40.0.0(Aug  8 2015 14:45:58)
SDK version:1.3.0
Ai-Thinker Technology Co.,Ltd.
Build:1.3.0.2 Sep 11 2015 11:48:04~~

~~이 이상에서 잘 작동한다.~~

`AT+UART_DEF=9600,8,1,0,0`명령어로 속도 및 기타 시리얼 통신을 설정한다.<br>
물론 전원 뽑았다가 다시 연결해도 변경된 9600으로 잘 작동되고, 앞서 설정한 wifi ap에 자동으로 연결된다.

## 펌웨어 업데이트
필요한 경우가 생겼다면 아래 페이지를 참고한다.
펌웨어업데이트 참고: https://www.allaboutcircuits.com/projects/flashing-the-ESP-01-firmware-to-SDK-v2.0.0-is-easier-now/

**업데이트시에는 GPIO0번 핀을 GND에 연결한상태여야 한다는 점.!**

펌웨어 바이너리 파일은 이곳에서:https://www.espressif.com/en/support/download/at
<br>v1.6이 잘 작동하는 것 확인하였다.

바이너리파일을 모듈에 복사해주는 flash tool은 이곳에서: https://www.espressif.com/en/support/download/other-tools

![||600](https://cl.ly/0d830b1d7ccc/esp8266_update.PNG)

## Arduino와 연결
세가지 정도 주의하면 되겠다.
* Baudrate 우에서 설정한대로 맞춰주기 (기본은 115200),
* 리인 끝에 'both NL & CR' ("\n\r") 반드시 붙여 메시지 보내기
* esp로의 입력은 3.3v로 맞춰주기 - 레벨 시프터를 사용하거나 10K, 4.7K 저항을 사용해 voltage divider를 만들어 사용한다. (그냥 rx에 5v 신호 꽂아도 잘 된다는 자료도 있는데 고장날까 아까워서 테스트해보지는 못했다.)

## AT 명령어
https://www.espressif.com/sites/default/files/documentation/4A-ESP8266_AT_Instruction_Set__EN.pdf

주요한 명령어 몇개만 보자.

|명령어| 기능|예제|
|--|--|--|
| AT| test||
| AT+RST| 모듈 리셋||
|AT+GMR| 펌웨어 버전 체크||
|~~AT+CIOBAUD~~<BR>AT+UART_DEF| uart Baudrate 변경| ~~AT+CIOBAUD=9600~~<br>AT+UART_DEF=9600,8,1,0,0<br> 참고: https://arduino.stackexchange.com/questions/24156/how-to-change-baudrate-of-esp8266-12e-permanently |
|AT+CWMODE| wifi mode 변경<br> 1: station mode (공유기에 접속)<br> 2: softAT mode (esp가 공유기가 됨 (인트라넷 구성))<br> 3: both| AT+CWMODE=3|
| AT+CWJAP| ap에 연결| AT+CWJAP="wifi-ssid","wifi-password"|
|AT+CWQAP| ap 연결 종료||
|AT+CIPMUX| 동시연결 기능<br>0: 단일연결 (클라이언트로 사용시)<br> 1~4: 동시연결 가능수 (서버로 사용시)|  AT+CIPMUX=0|
|AT+CIPSTART| TCP, UDP,SSL 연결 시작|AT+CIPSTART=”TCP”,”teachmemicro.com”,8080 <br> AT+CIPSTART=”UDP”,192.168.10.110”,1000,1001,1|
|AT+CIPSEND|데이터 보내기. parameter= 보내는 바이트| 	AT+CIPSEND=8|
|AT+CIPCLOSE| tcp 연결 종료|  ||

## HTTP 리퀘스트
참고: https://www.linkedin.com/pulse/how-make-rest-api-http-post-call-using-arduino-uno-esp8266-taha-ali/ <br>
제조사에서 제공하는 공식 예제: https://www.espressif.com/en/products/hardware/esp8266ex/resources<br>
제조사 자료 참고:
https://www.espressif.com/sites/default/files/documentation/4b-esp8266_at_command_examples_en.pdf<br>

1. set Wifi mode

```
AT+CWMODE = 3

response:
ok
```

2. Connect to a router

```
AT+CWJAP="SSID","PASS"

response:
ok
```

3. ESP8266 connects to the server as a TCP client

```
AT+CIPSTART="TCP","192,168,4,1",8080 // protocol, server IP, port

response:
ok
```

4. ESP8266 sends data to the server

```
AT+CIPSEND = 4 // 보낼 데이터의 바이트수
response:
>   // 데이터 보낼 준비 완료 프롬프트

>test   // no CR
response:
Recv 4 bytes
SEND OK
```

5. 서버에서 응답받으면 표시됨

```
response:
+IPD,n:xxxxxxxxxxx // received n bytes, data=xxxxxxxxxxx
```

6. 연결 끊기

```
AT+CIPCLOSE

response:
CLOSED
OK
```



### GET request
핵심은 서버로 전달할 데이터(리퀘스트 ) 스트링의 형식이다. 아래 예제를 보면...

```c
char* request =  "GET /maps/api/geocode/json?latlng=24.9047,67.11885&sensor=trueHTTP/1.1\r\nHost: maps.googleapis.com\r\nConnection: close\r\n\r\n";

```

![](https://media.licdn.com/dms/image/C4D12AQEBfqKb-aHbdA/article-inline_image-shrink_1500_2232/0?e=1547683200&v=beta&t=p3k360dwCLpqXKTPrOsrtB_nicju_IHuwXceaZzQisU)
**GET 명령어 + 한칸 띠고 + api endpoint + (공백없이)HTTP/1.1 + line end + HOST: + 한칸 띄고 + url + line end + 헤더(Connection: close는 필수 헤더) + line end + line end**

### POST
post 명령의 경우도 비슷한데, `content-length:데이터 길이(바이트)`가 꼭 들어가야하는점, 그리고 헤더 뒤에 `{}`로 둘러쌓인 data에 뒤따르는 점이 차이점이다.
```c
char* request = "POST /fcm/send HTTP/1.1\r\nHost: fcm.googleapis.com\r\ncontent-type: application/json\r\ncontent-length: 200\r\nauthorization: key=AIzaSyAFRHNLIRXjVkEHHhzkEYk3_cycj2yVkv0\r\nConnection: close\r\n\r\n{\r\n\t\"to\": \"/topics/general\",\r\n\t\"notification\":{\r\n\t\t\"title\": \"Motion detected!\",\r\n\t\t\"body\": \"An activity was registered by sensor.\",\r\n\t\t\"sound\": \"default\"\r\n\t},\r\n\t\"data\": {\r\n\t\t\"sensorValue\": \"01\"\r\n\t}\r\n}";

```  
## WiFiEsp library

**AT command니 뭐니 복잡한 것 다 잊고 심플하게, ESP8266 을 Arduino wifi shield처럼 사용할 수 있도록 해주는 WiFiEsp라이브러리를 사용하자.**
참고: https://github.com/bportaluri/WiFiEsp
대부분의 함수는 arduino wifi shield와 동일하므로 사용법은 아래 arduino wifi library 참고. https://www.arduino.cc/en/Reference/WiFi

### 라이브러리 설치하기
![](https://cl.ly/c0de281f01d8/Image%202018-11-21%20at%204.07.31%20AM.png)
라이브러리 매니저에서 'WiFiEsp'를 검색해 설치한다.

### 예제실행하기
라이브러리 설치시 함께 복사된 'WebClient' 예제를 사용해 Adafruit Io에 데이터 보내보자.
1. 아두이노의 파일 > 예제 > wifiesp > webclient 메뉴를 선택해 예제 불러오기
2.  softwareserial 핀연결 수정
3. 시리얼 통신 속도 수정
3.  ssid[] 와 pass[] 수정
4. 아두이노에 스케치 업로드하고 시리얼 모니터 실행시켜 테스트

잘된다~!

![||600](https://cl.ly/22e88b/download/Image%2525202018-11-21%252520at%2525204.17.49%252520AM.png)


## Adafruit IO에 데이터 보내고 받기
WiFiEsp 라이브러리와 함께 응답으로 오는 json을 손쉽게 처리하기 위해 ArduinoJson 라이브러리를 사용하였다.
arduinojson 참고: https://arduinojson.org/

adafruit io 참고: https://github.com/makers-wiki/root/blob/master/Adafruit%20IO/Adafruit%20IO%20(io.adafruit.com)%20IoT%20%EC%84%9C%EB%B2%84%EB%A1%9C%20%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0.md


```c
/* WiFiEsp-adafruit_io.ino
 *
 * ESP8266 + http request (rest) 사용해 Adafruit IO에 데이터 주고받기
 * Written by 도구의 인간 박상현
 * 2018.Nov
 *
 * 키보드로 '?'를 입력받으면 adafruit.io 에 저장된 마지막 feed data 값 읽어오기
 * 이외의 입력은 adafruit.io에 저장하기.
 *
 * POST request 보낼 때 서버로 값 전달이 잘 된다면 시리얼모니터에 뜨는 에러 메시지는 무시하자.
 * 숫자만 전달이되고 영문자가 전달되지 않는데, adafruit io쪽에서 손질해주어야하는 것 같다. 문자 사용필요하다면 좀 더 연구해보자
 *
 */

#include "WiFiEsp.h"
#include "ArduinoJson.h"
#include "SoftwareSerial.h"

SoftwareSerial Serial1(10, 11); // RX, TX

/////////////////// 사용자 값 설정 //////////////////////////////////////////////////////////
char ssid[] = "mySSID";            // your network SSID (name)
char pass[] = "myPASS";        // your network password
char server[] = "io.adafruit.com";
char ADAFRUIT_USERNAME[] = "myID";
char ADAFRUIT_FEED_KEY[] = "sensor1";
char X_AIO_KEY[] = "a34eb5d---myKEY---b7e3959238";
////////////////////////////////////////////////////////////////////////////////////////

int status = WL_IDLE_STATUS;     // the Wifi radio's status

// Initialize the Ethernet client object
WiFiEspClient client;

void setup()
{
  // initialize serial for debugging
  Serial.begin(115200);
  // initialize serial for ESP module
  Serial1.begin(9600);
  // initialize ESP module
  WiFi.init(&Serial1);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }

  // you're connected now, so print out the data
  Serial.println("You're connected to the network");


}

void loop()
{
  // 시리얼 키입력을 받아 값이 '?' 라면 최근 데이터 가져오기
  // '?'외의 입력은 adafruit io로 보내 기록하기
  String input;
  if (Serial.available()){
    input = Serial.readString();
    Serial.print("key input: "); Serial.println(input);

    if (input.equals("?")){
      String lastValue = readAdafruitData();
      Serial.print("last value:"); Serial.println(lastValue);
    }else{
      writeAdafruitData(input);
    }
  }

//  // 서버로부터의 응답 모니터링
//  while (client.available()) {
//    char c = client.read();
//    Serial.write(c);
//  }

}

// adafruit io의 가장 최근 값 가져오기
char* readAdafruitData(){

  Serial.println("Starting connection to server...");
  // if you get a connection, report back via serial
  if (client.connect(server, 80)) {
    Serial.println("Connected to server");
    // Make a HTTP request
    client.println("GET /api/v2/" + String(ADAFRUIT_USERNAME) + "/feeds/" + String(ADAFRUIT_FEED_KEY) + "/data/last HTTP/1.1");
    //header
    client.println("Host: " + String(server));
    client.println("X-AIO-Key: " + String(X_AIO_KEY));
    client.println("Connection: close");
    client.println();

    //delay(200);   // 상황에 따라 시간 조절필요..

    // arduinoJson library사용해 값 읽기
    char endOfHeaders[] = "\r\n\r\n";   
    client.find(endOfHeaders);

    client.read();   // 왜인지 모르겠는데 응답의 body앞에 d5\r\n, d7\r\n하는 식으로 4byte가 붙어온다.
    client.read();
    client.read();
    client.read();

    DynamicJsonBuffer jsonBuffer(100);
    JsonObject& root = jsonBuffer.parseObject(client);

    return(root["value"].as<char*>());

  }
}

// adafruit io에 값 쓰기
void writeAdafruitData(String data){

   String content = "{\"value\":"+ data +"}";

   Serial.println("Starting connection to server...");
  // if you get a connection, report back via serial
  if (client.connect(server, 80)) {
    Serial.println("Connected to server");
    // Make a HTTP request
    client.println("POST /api/v2/" + String(ADAFRUIT_USERNAME) + "/feeds/" + String(ADAFRUIT_FEED_KEY) + "/data HTTP/1.1");
    //header
    client.println("Host: " + String(server));
    client.println("X-AIO-Key: " + String(X_AIO_KEY));
    client.println("Content-Length: " + String(content.length()));
    client.println("Content-Type: application/json");  
    client.println("Connection: close");
    client.println();
    //body
    client.println(content);

  }
}
```
