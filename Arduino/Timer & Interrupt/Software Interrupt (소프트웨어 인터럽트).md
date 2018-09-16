
# 개요
아두이노에서 하드웨어 인터럽트는 2개 (Uno, nano) 사용할 수 있는데, 가끔 인터럽트가 더 많았으면 좋겠다 싶을 때도 있고, 또 때로는 일정한 시간마다 주기적으로 어떤 처리를 해야하는 경우도 있다. 이럴 때 유용하게 쓸 수 있는 소프트웨어 인터럽트 (타이머) 활용법 대 공개!

아두이노에는 기본 3개의 타이머가 내장되어있는데, timer0, timer1, timer2이다. timer0은 delay()등의 시간관련 함수에서 내부적으로 사용하고,  timer1은 서보라이브러리가 사용, timer2는 tone()에서 사용한다. 이 타이머도 일종의 인터럽트라고 할 수 있겠다. TimerOne라이브러리는 Timer1 타이머를 사용해 인터럽트를 구현토록 해준다.

# TimerOne 라이브러리 설치
아두이노 메뉴 > 스케치 > 라이브러리 포함하기 > 라이브러리 매니저 에서 TimerOne 라이브러리를 검색 해 설치한다.
혹은 [이곳](https://code.google.com/archive/p/arduino-timerone/downloads)에서 다운.

# 예제
```C
/*
* 언제라도 버튼(핀7)누르면 즉시 불(핀13) 켜지는 회로
*/

#include <TimerOne.h>

void setup()
{
	pinMode(7,INPUT_PULLUP);

	Timer1.initialize(100000); // 1초마다 실행. in microseconds
	Timer1.attachInterrupt(intFunction);
}

void loop(){
	digitalWrite(13, LOW);
	delay(1000);
}

void intFunction(){
	if (digitalRead(7) == LOW){
		digitalWrite(13,HIGH);
	}
}
```
# 주의점
아두이노 서보 라이브러리가 Timer1을 사용하고있어 충돌이 일어날 수 있다. 그럴 땐 servo 라이브러리 대신 timer2를 사용하는 servotimer2 라이브러리를 사용해 충돌을 피하자.

[[ServoTimer2]]

[ServoTimer2 라이브러리](https://platformio.org/lib/show/1305/ServoTimer2)
아두이노 메가 등은 타이머가 총 6개 내장되어있고, 충돌을 피하기 위해 Timer3을 사용할 수 있다. [TimerThree 라이브러리 다운로드](http://playground.arduino.cc/Code/Timer1)

# 참고
한글자료: http://www.hardcopyworld.com/gnuboard5/bbs/board.php?bo_table=lecture_pract&wr_id=12

라이브러리 문서: http://playground.arduino.cc/Code/Timer1

[[category:Arduino Tip]]
[[category:interrupt]]
