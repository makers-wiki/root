# dotstar
[adafruit](https://adafruit.com)에서 만든 led strip 하드웨어와 라이브러리. neopixel과 마찬가지로 strip 형태의 제품을 원하는 곳에서 끊어 사용할 수 있다.
SPI 통신 프로토콜을 사용하며 기존의 neopixel에 비해 빠르기 때문에 POV (잔상효과) 디스플레이 만들기에 더 적합하다.
![||600](https://cdn-learn.adafruit.com/assets/assets/000/021/922/medium800/leds_dotstar-banner.jpg?1419375063)
![||600](https://cdn-learn.adafruit.com/assets/assets/000/026/743/medium640/projects_Bike_Wheel_POV_Display_adafruit_02.jpg?1438085928)

## dotstar vs neopixel

|dotstar|noepixel|
|-------|--------|
|데이터 전송과 깜빡이는 속도(19.2Khz)가 빠르기 때문에 POV display에 적합.|데이터 전송속도가 800khz로 고정됨. 긴 strip의 경우 데이터 정체 발생함.|
||깜빡이는 속도가 400hz로 POV 에 부적합.|
|아두이노의 서보 라이브러리, tone()명령, 인터럽트 사용 가능|인터럽트 사용불가|
|좀 더 비쌈|좀 더 저렴함|
|제품 구성이 제한적임| 매우 다양한 제품군(원형,선형 등등)|
|4핀 터미널(파워+-/데이터/클럭)|3핀 터미널(파워+-/데이터)|

## dotstar 사용지 주의점
* dotstar 는 5V에서 작동한다. rsapberry pi 등 3.3v 시스템을 사용하는 경우 레벨시프터를 사용해 3.3v 신호를 5v로 변환해주어야 한다. ([레벨시프터](https://www.adafruit.com/product/1787), [국내 메카솔루션 레벨컨버터](http://mechasolution.com/shop/goods/goods_view.php?goodsno=545609&category=))
* led 1개당 최대60mA를 소비한다. 갯수에 따라 충분한 전력을 공급토록 한다. 아마도 아두이노의 내부전원(500mA) 만으로는 부족할 것이다. (예를들어 30개 led의 dotstar를 사용한다면 60mA * 30개 = 1800mA, 즉 약 2A 전원장치를 사용하는 것이 좋다.) 
* led가 동시에 모두 켜져있는 것이 아니라면 최소20mA로 계산토록하자.

# Arduino 코드
## Adafruit DotStar 라이브러리 인스톨
![||600](https://cl.ly/3P0D2w3g251U/Image%202018-08-18%20at%2010.00.58%20AM.png)
## 샘플 코드
```c
	#include <Adafruit_DotStar.h>
	#include <SPI.h>

	Adafruit_DotStar strip = Adafruit_DotStar(100, 4, 5, DOTSTAR_GRB);
	// led 100개, 데이터핀 4, 클럭핀 5, 데이터 순서 Green-Red-Blue

	void setup(){
		strip.begin();
		strip.show(); 	// led 초기화. 모두 끔.
	}

	void loop(){
		strip.setPixelColor(30, 0xFF0000);	//31번째 led, 빨강색
		strip.show();
		delay(20);
	}
```

* `Adafruit_DotStar(int howManyLeds, int DATA, int CLK, 컬러타입)`
데이터핀과 클럭핀은 임의의 디지털 핀으로(하드웨어 연결한대로) 지정해 주면된다.
컬러타입은 dotstar 제품마다 고유하게 정해져있다. 생산시기에 따라 BRG를 사용하기도, GRB를 사용하기도 한다. 구매한 하드웨어의 스펙시트를 살펴보자.
* `Adafruit_DotStar(howManyLeds, 컬러타입)`
하드웨어 SPI를 사용하고자 하는 경우에는 (조금 더 빠르다) 사용할 수 있는 핀이 보드 종류마다 정해져있으므로 특별히 써주지 않아도 된다. (물론 하드웨어는 그에 알맞게 연결되어있어야 한다. Arduino uno의 경우 data-11, clk-13)

* `strip.begin()`으로 ledstrip 과 통신을 시작한다.

* `strip.setPixelColor(ledNumber, 컬러)`
ledNumber 는 0부터 카운트한다. 
컬러는 16진수로 RGB를 표기한다.

* 컬러를 설정한 후에는 `strip.show()`를 해주어야만 실제 적용된다.

# adafruit_dotstar.h 함수 목록
```
public:

    Adafruit_DotStar(uint16_t n, uint8_t o=DOTSTAR_BRG);
    Adafruit_DotStar(uint16_t n, uint8_t d, uint8_t c, uint8_t o=DOTSTAR_BRG);
   ~Adafruit_DotStar(void);
  void
    begin(void),                            // Prime pins/SPI for output
    clear(),                                // Set all pixel data to zero
    setBrightness(uint8_t),                 // Set global brightness 0-255
    setPixelColor(uint16_t n, uint32_t c),
    setPixelColor(uint16_t n, uint8_t r, uint8_t g, uint8_t b),
    show(void),                             // Issue color data to strip
    updatePins(void),                       // Change pin assignments (HW)
    updatePins(uint8_t d, uint8_t c),       // Change pin assignments (SW)
    updateLength(uint16_t n);               // Change length
  uint32_t
    Color(uint8_t r, uint8_t g, uint8_t b), // R,G,B to 32-bit color
    getPixelColor(uint16_t n) const;        // Return 32-bit pixel color
  uint16_t
    numPixels(void);                        // Return number of pixels
  uint8_t
    getBrightness(void) const,              // Return global brightness
   *getPixels(void) const,                  // Return pixel data pointer
    sine8(uint8_t) const,
    gamma8(uint8_t) const;
```

## fastLed 라이브러리
fastled 라이브러리를 사용하면 더 다양한 시각효과를 더 정교하게 조작할 수 있다고 한다.
시도해보자.
https://github.com/FastLED/FastLED/wiki/Overview

# 참고
adafruit 제품 소개: https://learn.adafruit.com/adafruit-dotstar-leds/overview