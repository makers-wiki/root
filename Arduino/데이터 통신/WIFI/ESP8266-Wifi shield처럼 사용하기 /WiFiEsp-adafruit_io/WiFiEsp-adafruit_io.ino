/*
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
char ssid[] = "doguin_studio";            // your network SSID (name)
char pass[] = "***************";        // your network password
char server[] = "io.adafruit.com";
char ADAFRUIT_USERNAME[] = "doguin_workshop";
char ADAFRUIT_FEED_KEY[] = "sensor1";
char X_AIO_KEY[] = "a34e**********3959238";
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
  
  printWifiStatus();

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


void printWifiStatus()
{
  // print the SSID of the network you're attached to
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
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

