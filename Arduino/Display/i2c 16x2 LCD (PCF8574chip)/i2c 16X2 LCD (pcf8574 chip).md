# i2c lcd (PCF8574 chip)
![](http://makeshare.org/data/editor/1808/7595aa66b97a8262ba54081667a4c0aa_1534685901_35.jpg)

i2c 통신으로 간편하게 lcd display를 제어할 수 있다. 다양한 제조사에서 만드는 비슷한 제품들이 많은데, 사용법은 다 대동소이하다.

## 하드웨어 연결
arduino uno, nano, promini 모두 A4, A5가 i2c 통신을 위해 할당되어있다.
![](http://www.4tronix.co.uk/arduino/pictures/i2c_03.jpg)

## i2c address
하나의 mcu(아두이노)에 i2c 디바이스를 여러개 연결할 수 있는데, 이 때 각 디바이스를 구분하기 위해 고유한 i2c address를 갖도록 한다. i2c lcd는 출하시 기본 0x27을 주소로 갖고있고, pcb위의 A0, A1, A2 패드를 연결하느냐에 따라 0x20~0x27로 설정할 수 있다. <br>

(1= 연결안됨. 0 = 연결됨) <br>
![](http://www.ardumotive.com/uploads/1/2/7/2/12726513/screenshot-6_3.png)
![](http://www.microsolution.com.pk/wp-content/uploads/2017/11/I2C-Lcd-Module.jpg)

## i2c lcd library
### 라이브러리 설치
아두이노 ide에서 메뉴 > 스케치 > 라이브러리 포함하기> 라이브러리 관리 > LiquidCristal I2C 검색 & 설치
https://github.com/marcoschwartz/LiquidCrystal_I2C

** 한글출력 가능한 버전도 있다. https://github.com/junwha0511/LiquidCrystal_I2C_Hangul **

### 기본 사용법
기본 제공되는 helo world 예제를 보면 사용법이 간단하다. (2행16열 버전으로 바꾸었다.)
```c++
// LiquidCristal I2C/ HelloWorld.ino

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);  // set the LCD address to 0x27 for a 16 chars and 2 line display

void setup()
{
  lcd.init();                      // initialize the lcd
  lcd.init();
  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(3,0);
  lcd.print("Hello, world!");
  lcd.setCursor(2,1);
  lcd.print("I love Arduino!");

}


void loop()
{
}
```
kokoafab에 함수가 잘 정리되어있어 가져왔다.: https://kocoafab.cc/tutorial/view/689

|함수|하는 일|
|--|--|
|lcd.begin()|	LCD를 사용을 시작|
|lcd.display()|	LCD에 내용을 표시|
|lcd.noDisplay()|	LCD에 내용을 숨김|
|lcd.setCursor(col,row)|	row, col의 좌표로 커서를 위치|
|lcd.cursor()|	LCD에 커서를 표시|
|lcd.noCursor()|	LCD에 커서를 숨김|
|lcd.home()|	커서의 위치를 0,0으로 이동|
|lcd.blink()|	커서를 깜빡임|
|lcd.noBlink()|	커서를 깜빡이지 않음|
|lcd.backlight()|	LCD backlight을 킴|
|lcd.noBacklight()|	LCD backlight를 끔|
|lcd.write(val)|	LCD 화면에 val 출력(아스키 코드 입력 시에는 아스키 코드에 해당하는 문자 출력)|
|lcd.print(val)|	LCD 화면에 val 출력|
|lcd.clear()|	LCD 화면의 모든 내용 지움|
|lcd.scrollDisplayRight()|	내용을 우측으로 1칸 이동|
|lcd.scrollDisplayLeft()|	내용을 좌측으로 1칸 이동|
|lcd.autoscroll()|	내용을 자동으로 우에서 좌로 스크롤|
