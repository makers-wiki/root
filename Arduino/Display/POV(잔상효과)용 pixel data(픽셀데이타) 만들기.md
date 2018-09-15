# POV (잔상효과)용 pixel data (픽셀 데이타) 만들기

## 이미지 구하기
일단 pov 디스플레이에 표시할 이미지를 만들거나 구한다.
## rescale & GIF converting
표시할 POV 디스플레이의 세로 픽셀수 (led strip의 led 수)에 맞추어 스케일 조절하고 GIF로 저장한다. 
## GIF > pixel data 컨버터 **convert.py**
adafruit의 `Kinetic POV project` github페이지에서 구할 수 있다.
https://github.com/adafruit/Kinetic_POV
convert폴더에 예제용 이미지와 함께 들어있다.
python 2.7용이다.

### PIL 설치
python으로 만들어진 converter에서 `PIL` (python Image Library)라는 모듈을 필요로함.
PIL은 개발중지되었으므로 우리는 그 후속 버전인 `pilow`를 설치해 사용함.(사용방법은 동일) 
파이썬 모듈 설치 프로그램인 `pip`를 사용한다. [참고: pip사용해 python 모둘 설치하기](https://wikidocs.net/5763)

```bash
$pip2 install pillow
```
![||600](https://cl.ly/2r322G0U2a1W/Image%202018-08-19%20at%207.38.16%20AM.png)

### convert.py 실행
```bash
$python2 convert.py testImage.gif > testImage.h
```
여러개의 이미지를 동시에 변환할 수도 있다.
```bash
$python2 convert.py *.gif > testImages.h
```

![](https://cl.ly/1F2m2n1x3c0a/pride.gif)

^원본
```c
// Don't edit this file!  It's software-generated.
// See convert.py script instead.

#define PALETTE1  0
#define PALETTE4  1
#define PALETTE8  2
#define TRUECOLOR 3

#define NUM_LEDS 16

// pride.gif ---------------------------------------------------------------

const uint8_t PROGMEM palette00[][3] = {
  {  34,   0,  75 },
  {  75,  75,   0 },
  {   0,  50,   0 },
  {   0,   0,   0 },
  {  75,   0,   0 },
  {  75,  18,   0 },
  {   0,   6,  75 } };

const uint8_t PROGMEM pixels00[] = {
  0X34, 0X44, 0X44, 0X44, 0X44, 0X44, 0X44, 0X43,
  0X33, 0X44, 0X44, 0X44, 0X44, 0X44, 0X44, 0X33,
  0X53, 0X34, 0X44, 0X44, 0X44, 0X44, 0X43, 0X35,
  0X55, 0X33, 0X44, 0X44, 0X44, 0X44, 0X33, 0X55,
  0X55, 0X53, 0X34, 0X44, 0X44, 0X43, 0X35, 0X55,
  0X55, 0X55, 0X33, 0X44, 0X44, 0X33, 0X55, 0X55,
  0X55, 0X55, 0X53, 0X34, 0X43, 0X35, 0X55, 0X55,
  0X55, 0X55, 0X55, 0X33, 0X33, 0X55, 0X55, 0X55,
  0X55, 0X55, 0X55, 0X53, 0X35, 0X55, 0X55, 0X55,
  0X35, 0X55, 0X55, 0X55, 0X55, 0X55, 0X55, 0X53,
  0X33, 0X55, 0X55, 0X55, 0X55, 0X55, 0X55, 0X33,
  0X13, 0X35, 0X55, 0X55, 0X55, 0X55, 0X53, 0X31,
  0X11, 0X33, 0X55, 0X55, 0X55, 0X55, 0X33, 0X11,
  0X11, 0X13, 0X35, 0X55, 0X55, 0X53, 0X31, 0X11,
  0X11, 0X11, 0X33, 0X55, 0X55, 0X33, 0X11, 0X11,
  0X11, 0X11, 0X13, 0X35, 0X53, 0X31, 0X11, 0X11,
  0X11, 0X11, 0X11, 0X33, 0X33, 0X11, 0X11, 0X11,
  0X11, 0X11, 0X11, 0X13, 0X31, 0X11, 0X11, 0X11,
  0X31, 0X11, 0X11, 0X11, 0X11, 0X11, 0X11, 0X13,
  0X33, 0X11, 0X11, 0X11, 0X11, 0X11, 0X11, 0X33,
  0X23, 0X31, 0X11, 0X11, 0X11, 0X11, 0X13, 0X32,
  0X22, 0X33, 0X11, 0X11, 0X11, 0X11, 0X33, 0X22,
  0X22, 0X23, 0X31, 0X11, 0X11, 0X13, 0X32, 0X22,
  0X22, 0X22, 0X33, 0X11, 0X11, 0X33, 0X22, 0X22,
  0X22, 0X22, 0X23, 0X31, 0X13, 0X32, 0X22, 0X22,
  0X22, 0X22, 0X22, 0X33, 0X33, 0X22, 0X22, 0X22,
  0X22, 0X22, 0X22, 0X23, 0X32, 0X22, 0X22, 0X22,
  0X32, 0X22, 0X22, 0X22, 0X22, 0X22, 0X22, 0X23,
  0X33, 0X22, 0X22, 0X22, 0X22, 0X22, 0X22, 0X33,
  0X63, 0X32, 0X22, 0X22, 0X22, 0X22, 0X23, 0X36,
  0X66, 0X33, 0X22, 0X22, 0X22, 0X22, 0X33, 0X66,
  0X66, 0X63, 0X32, 0X22, 0X22, 0X23, 0X36, 0X66,
  0X66, 0X66, 0X33, 0X22, 0X22, 0X33, 0X66, 0X66,
  0X66, 0X66, 0X63, 0X32, 0X23, 0X36, 0X66, 0X66,
  0X66, 0X66, 0X66, 0X33, 0X33, 0X66, 0X66, 0X66,
  0X66, 0X66, 0X66, 0X63, 0X36, 0X66, 0X66, 0X66,
  0X36, 0X66, 0X66, 0X66, 0X66, 0X66, 0X66, 0X63,
  0X33, 0X66, 0X66, 0X66, 0X66, 0X66, 0X66, 0X33,
  0X03, 0X36, 0X66, 0X66, 0X66, 0X66, 0X63, 0X30,
  0X00, 0X33, 0X66, 0X66, 0X66, 0X66, 0X33, 0X00,
  0X00, 0X03, 0X36, 0X66, 0X66, 0X63, 0X30, 0X00,
  0X00, 0X00, 0X33, 0X66, 0X66, 0X33, 0X00, 0X00,
  0X00, 0X00, 0X03, 0X36, 0X63, 0X30, 0X00, 0X00,
  0X00, 0X00, 0X00, 0X33, 0X33, 0X00, 0X00, 0X00,
  0X00, 0X00, 0X00, 0X03, 0X30, 0X00, 0X00, 0X00,
  0X30, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X03,
  0X33, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X33,
  0X43, 0X30, 0X00, 0X00, 0X00, 0X00, 0X03, 0X34,
  0X44, 0X33, 0X00, 0X00, 0X00, 0X00, 0X33, 0X44,
  0X44, 0X43, 0X30, 0X00, 0X00, 0X03, 0X34, 0X44,
  0X44, 0X44, 0X33, 0X00, 0X00, 0X33, 0X44, 0X44,
  0X44, 0X44, 0X43, 0X30, 0X03, 0X34, 0X44, 0X44,
  0X44, 0X44, 0X44, 0X33, 0X33, 0X44, 0X44, 0X44,
  0X44, 0X44, 0X44, 0X43, 0X34, 0X44, 0X44, 0X44 };

typedef struct {
  uint8_t        type;    // PALETTE[1,4,8] or TRUECOLOR
  line_t         lines;   // Length of image (in scanlines)
  const uint8_t *palette; // -> PROGMEM color table (NULL if truecolor)
  const uint8_t *pixels;  // -> Pixel data in PROGMEM
} image;

const image PROGMEM images[] = {
  { PALETTE4 ,   54, (const uint8_t *)palette00, pixels00 }
};

#define NUM_IMAGES (sizeof(images) / sizeof(images[0]))

```
^ 변환된 데이타

* GIF 파일형식에서는 palette라는 개념이 있는데, 이미지에서 사용된 컬러를 표로 만들어 놓은 것이다. 예를들어 이미지가 빨강 흰색 보라 3개 색만 사용하고 있다면 팔레트에는 이 3개 색이 등록된다. 이런 방법을 쓰면 각 픽셀마다 RGB값을 기억하는 대신 팔레트의 몇번째 색인지만 기록하면 되므로 저장공간을 많이 아낄 수 있다.

팔레트기능을 사용하지 않는 GIF파일은 아무리 적은 수의 컬러를 사용하고 있어도 truecolor로 취급되어 크기가 커진다. GIF opimizer를 사용해 크기즐 줄이도록 하자.
[online GIF optimizer](http://gifgifs.com/optimizer/)
![||600](https://cl.ly/3M3C2t3M1K0h/Image%202018-08-19%20at%209.28.40%20AM.png)
color Reduction 옵션을 사용한다.

* 위 예제에서 컬러팔레트는...
```c
const uint8_t PROGMEM palette00[][3] = {
  {  34,   0,  75 },
  {  75,  75,   0 },
  {   0,  50,   0 },
  {   0,   0,   0 },
  {  75,   0,   0 },
  {  75,  18,   0 },
  {   0,   6,  75 } };
```
이 부분이 이미지에 사용된 컬러를 나타내는 컬러팔레트다. 7개 컬러가 사용되었나보다.

* 각 픽셀정보를 담고 있는 곳은 
```c
const uint8_t PROGMEM pixels00[] = {
  0X34, 0X44, 0X44, 0X44, 0X44, 0X44, 0X44, 0X43,
  0X33, 0X44, 0X44, 0X44, 0X44, 0X44, 0X44, 0X33,
  .
  .
  .

```
이 부분이다.
흑백 이미지는 1개byte에 8개 픽셀 데이터를,
16색이하 이미지는 1개 byte에 2개 팩셀 데이터를, 
256색 이미지는 1개 byte가 1개 픽셀데이터를,
트루컬러 이미지는 3개 byte가 1가 픽셀데이터를 담도록 하고 있다.(저장공간 아끼기위함)

위 변환된 예제는 1byte가 2픽셀 데이터를 담고잇으며, 각 바이트 값을 보면 0~6의 값을 갖는데, 물론 팔레트의 몇번 컬러인지를 나타내는 것이다.

* `image`라는 struct 를 만들어 사용하고 있는데, 
```
typedef struct {
  uint8_t        type;    // PALETTE[1,4,8] or TRUECOLOR
  line_t         lines;   // Length of image (in scanlines)
  const uint8_t *palette; // -> PROGMEM color table (NULL if truecolor)
  const uint8_t *pixels;  // -> Pixel data in PROGMEM
} image;
```

* 배열로 선언된 이유는 여러개 이미지를 동시에 변환하는 기능을 위해서인다. 첫번째 그림은 image[0], 두번째는 image[1]...에 담긴다.
```c
const image PROGMEM images[] = {
  { PALETTE4 ,   54, (const uint8_t *)palette00, pixels00 }
};
```

* 데이터가 모두 `PROGMEM`키워드를 사용해 선언되었는데, 이는 아두이노 코드가 실행될 때 이 데이터는 sram에 로딩하지 않고 flash 메모리에서 직접 읽도록 한다는 의미이다. 속도는 느려지겠지만 램공간을 아낄 수 있다.
참고: https://www.arduino.cc/reference/en/language/variables/utilities/progmem/

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

# 참고자료
https://learn.adafruit.com/genesis-poi-dotstar-led-persistence-of-vision-poi?view=all#preparing-images
