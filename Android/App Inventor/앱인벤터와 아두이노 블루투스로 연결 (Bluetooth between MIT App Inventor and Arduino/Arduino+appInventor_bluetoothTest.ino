
// 정수와 유리수 문자열을 전송해본다
int numberA = 12345;
float numberB = 0.02;
String text = "동해물과 백두산이 마르고 닳도록";

void setup() {
  pinMode(13,OUTPUT); // LED를 켜서 데이터를 받았음을 표시함
  
  Serial.begin(38400); // 블루투스모듈에 설정된 속도
  Serial.println("Connected!");
  delay(5000);
}

void loop() {
  
  if(Serial.available()){
    int receivedData = Serial.read(); // 받은 데이터는 버퍼에서 비워주어야하므로..
    digitalWrite(13,HIGH); // 받은 데이터가 있다면 LED를 켜고
  } else {
    digitalWrite(13,LOW); // 없다면 끄고
  }
  
  Serial.print(numberA); //정수
  delay(2000);
  Serial.print(numberB); //유리수
  delay(2000);
  Serial.print(text); // 애국가
  delay(2000);

}
