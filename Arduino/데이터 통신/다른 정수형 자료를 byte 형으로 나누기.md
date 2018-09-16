# 언제 필요한가?
특히 데이터 통신할 때, 보통 테이터는 byte 단위로 다루는 경우가 많다. 이 때 자료를 보낼 때는 int, long 등의 다른 자료형을 byte (8bit)형으로 바꾸었다가 수신측에서 다시 원래 형태로 재 조합해야하는 경우가 종종있다.

# 활용예

```C


byte s[4] = {0,0,0,0};
uint32_t l = 0xefa2338b; // 아무 숫자나 테스트해보자

void setup(){
  Serial.begin(9600);

  Serial.print("input_long number: ");Serial.println(l);   //원본

  // uint32 l 을 byte s[4] 로 나누기
  for (int i = 0; i < 4; i++){
    s[i] = byte((l >> (8*i) ) & 0x000000ff);
    Serial.print("s["); Serial.print(i); Serial.print("]: "); Serial.println(s[i]);
  }

  // byte s[4]를 uint32로 재조합하
  uint32_t longNumber = ((uint32_t) s[3] << 8*3) | ((uint32_t) s[2] << 8*2) | ((uint32_t) s[1] << 8 ) | (uint32_t) s[0];

  // 변환 잘 되었는지 검사. 위의 원본과 동일해야한다.
  Serial.print("output_long number: "); Serial.println(longNumber);
}

void loop(){
  delay(500);
}
```
* 1byte (8bit)씩 시프트해서 원하는 자맀수에 맞추는 것이 핵심!
* 변환 원하는 자료형에 따라 응용하자.

# 참고:
각 데이터 형식의 크기: https://msdn.microsoft.com/ko-kr/library/s3f49ktz.aspx

[[category: Arduino Tip]]
