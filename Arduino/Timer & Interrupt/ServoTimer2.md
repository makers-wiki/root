# ServoTimer2 언제필요한가?
 아두이노의 기본 servo 라이브러리가 pwm신호를 만들기 위해 내부적으로 AVR칩의 timer1 타이머를 사용하는데, 가끔 timer1 타이머를 필요로 하는 다른 라이브러리와 충돌을 일이키는 경우가 있다. ( 특히 인터럽트, 타이머 사용시... )
 이럴 때에 충돌을 피하면서 servo를 사용하기 위해 AVR칩의 timer2타이머를 사용해 서보를 사용토록 하자.

# ServoTimer2 라이브러리 설치
아래 servotimer2 라이브러리 프로젝트 페이지의 [Repository](https://github.com/nabontra/ServoTimer2/blob/master/ServoTimer2.cpp)에서 .zip파일을 다운받은 후,
아두이노 메뉴 > 스케치 > 라이브러리 포함하기 > .zip 라이브러리 포함 을 선택해 라이브러리 설치한다.

[ServoTimer2 라이브러리](https://platformio.org/lib/show/1305/ServoTimer2)

# 예제
```C
//
// 서보의 작동범위를 테스트해보자.
// 0~5까지 시리얼 입력에 따라 servopin에 연결된 서보가 특정한 각도로 움직인다.
//
//

#include <ServoTimer2.h>
#define servopin 8

ServoTimer2 myservo;

void setup() {
  Serial.begin(9600);
  Serial.println("ServoTimer2 Test");
  myservo.attach(servopin);

}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()){
    int val = 0;
    int selection = Serial.read();
    switch(selection){
      case '0':
        val = 0;
        break;
      case '1':
        val = 500;
        break;
      case '2':
        val = 1000;
        break;
      case '3':
        val = 2000;
        break;
      case '4':
        val = 2300;
        break;
      case '5':
        val = 2500;
        break;

    }
    Serial.println(val);
    myservo.write(val);
  }

}
```

기본적인 사용법은 기본 servo 라이브러리와 동일하다.
그런데 write() 함수에 들어가는 값은 각도가 아니라 1000~3000 사이의 값.
값을 조정해가며 테스트를 통해 상한과 하한을 찾아내자.

* 참고
https://platformio.org/lib/show/1305/ServoTimer2/examples

[[category:Interrupt]]
