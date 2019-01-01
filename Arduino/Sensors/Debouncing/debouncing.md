
# debounce
'contact bouncing', 또는 'Chatter'라고 함은 버튼 입력을 받을 때 노이즈 때문에 버튼을 한번 눌러도 2-3번 눌린 것으로 인식되는 현상을 이름. 이를 방지하기 위해 흔히 버튼이 감지되면 1초간 휴식하는 방법을 취하고 있는데, 연속적으로 버튼을 누르는 것이 안되어 매우 답답함. (급히 볼륨을 줄인다던지...)
버튼의 노이즈를 제거해 한번 누르면 두세번 감지되는일을 방지해 주는 알고리즘을 디바운싱 debouncing이라고 한다.

컨택 바운싱 참고: http://en.wikipedia.org/wiki/Debounce#Contact_bounce <br>
아두이노 디바운싱 참고:https://www.arduino.cc/en/tutorial/debounce

해결방법은 단순한데, 앞서 쓴 것 처럼 최초 버튼 입력이 감지되면 그 후 일정시간동안의 입력은 무시하는 것이다. 단지 이때의 일정시간은 milli sec 단위로 짧게 해서 사람이 인식하지 못하게 하는 것.
bounce2 등의 라이버러리를 사용하면 쉽게 적용할 수 있다.

## Bounce2 라이브러리
https://github.com/thomasfredericks/Bounce2
아두이노 라이브러리 관리자에서 다운받을 수 있다.
예제폴더 안에 도큐멘테이션이 잘 되어있으므로 참고한다.

### 사용방법
1. 라이브러리 부르기
`#include <Bounce2.h>`

2. 디바운서 오브젝트 만들기. 여러개 버튼을 사용한다면 각 버튼마다 오브젝트 만들어야 함. (어레이 사용도 좋다.)
`Bounce debouncer = Bounce();`

3. pinMode(INPUT) 대신 attach() 사용.
`debouncer.attach(BUTTON_PIN,INPUT_PULLUP);`

4. 인터벌 시간내의 연속적인 입력값은 무시함. 단위는 millisec.
`debouncer.interval(25);`

5. 매 루프 시작할 때 디바운서 업데이트 하기
`void loop() {
   debouncer.update();
   ...`

6. 핀 입력 감지
`if ( debouncer.fell() ){digitalWrite(LED,HIGH)}`

|감지방법|설명|
|---|---|
|fell()|HIGH -> LOW 로 떨어질 때|
|rose()|LOW -> HIGH 로 켜질 때|
|read()| 현재 상태 읽기|

### 디바운싱 알고리듬
1. 기본 알고리듬은 Stable Invertal 방식으로, 노이즈가 있는 구간은 무시하고 신호가 안정된 후에 입력값을 적용하는 것. 버튼이 눌리면 값이 적용되기 까지 약간의 시차가 있지만 쉽고 안정적임.

![](https://camo.githubusercontent.com/ced0ce18bfdc7a0a015780f0b0c158f8f1748c53/68747470733a2f2f7261772e6769746875622e636f6d2f74686f6d617366726564657269636b732f426f756e63652d41726475696e6f2d576972696e672f6d61737465722f6578747261732f426f756e63795377697463685f737461626c652e706e67)

2. `#define BOUNCE_LOCK_OUT` 혹은 `#define BOUNCE_WITH_PROMPT_DETECTION` 을 사용해 (라이브러리 인클루드보다 앞에..) Lock-Out Interval 알고리듬, With Prompt Detection 알고리듬을 사용할 수 있음. 반응이 즉각적이지만 노이즈 있을 수 있음. 테스트 해보기

![](https://camo.githubusercontent.com/af9bd2da9866b32eef692ac6d27f3b4cd767f0ac/68747470733a2f2f7261772e6769746875622e636f6d2f74686f6d617366726564657269636b732f426f756e63652d41726475696e6f2d576972696e672f6d61737465722f6578747261732f426f756e63795377697463685f6c6f636b6f75742e706e67)

### BASIC EXAMPLE

```cpp
// This example toggles the debug LED (pin 13) on or off
// when a button on pin 2 is pressed.

// Include the Bounce2 library found here :
// https://github.com/thomasfredericks/Bounce2
#include <Bounce2.h>

#define BUTTON_PIN 2
#define LED_PIN 13

int ledState = LOW;


Bounce debouncer = Bounce(); // Instantiate a Bounce object

void setup() {

  debouncer.attach(BUTTON_PIN,INPUT_PULLUP); // Attach the debouncer to a pin with INPUT_PULLUP mode
  debouncer.interval(25); // Use a debounce interval of 25 milliseconds


  pinMode(LED_PIN,OUTPUT); // Setup the LED
  digitalWrite(LED_PIN,ledState);

}

void loop() {

   debouncer.update(); // Update the Bounce instance

   if ( debouncer.fell() ) {  // Call code if button transitions from HIGH to LOW
     ledState = !ledState; // Toggle LED state
     digitalWrite(LED_PIN,ledState); // Apply new LED state
   }
}
```
