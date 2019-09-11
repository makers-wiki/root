# Autodesk Eagle 로 PCB 제작하기
참고: https://www.instructables.com/lesson/PCB-Concepts-and-Materials/

## PCB를 구성하는 층(layer)
일단 pcb를 구성하는 기본 4개 층을 알아둘 필요가 있다.
1. base layer - 전기가 안통하는 FR4라고하는 유리섬유로 만들어져있다. 1.6mm두께가 일반적이다.
![](https://www.instructables.com/files/deriv/FDB/IG0E/J16PISAD/FDBIG0EJ16PISAD.LARGE.jpg)
2. copper layer - 전기가 통하는 부분. 얇은 구리의 층이다.
![](https://www.instructables.com/files/deriv/FWO/5WV7/J16PIS69/FWO5WV7J16PIS69.LARGE.jpg)
3. soldermask layer - 구리패턴 위를 덮는 초록색 레진 층. 물론 초록색이 아닌 다른 색도 있다. 이 솔더마스크가 칠해진 부분에는 땜납이 묻지 않는다. 즉, 납땜을 하게되는 pad 위치에는 이 초록색 레진을 칠하지 않는다. (도선 위에도 칠한다.)
![](https://www.instructables.com/files/deriv/FNR/KBEH/J0MOQ4F5/FNRKBEHJ0MOQ4F5.LARGE.jpg)
4. silkscreen layer - 사람이 볼 수 있도록 (보통 흰색으로) 텍스트나 기호를 인쇄한 층. 기능과는 무관하지만 어느구멍에 어느 부품이 와야하는지 알려준다.
![](https://www.instructables.com/files/deriv/FFR/SKBC/J0MOQ4FC/FFRSKBCJ0MOQ4FC.LARGE.jpg)

* pcb의 한 면은 위와 같은 4개 층으로 이루어져 있으며, 앞, 뒤 양면을 사용한다면 각 면마다 각각4개 layer가 있는것이다.
* 노트북이나 스마트폰같은 복잡한 장치는 앞뒤면 뿐 아니라 여러장의 copper layer 를 사용해 16층까지 샌드위치로 만들기도 한다.
* 그러나 일반적인 회로는 앞뒤면으로 충분하고, eagle 무료버전은 앞뒤면2개 층만 사용할 수 있다.
* **eagle에도 위의 4개층+ 몇가지 더 세세하게 편집할 수 있도록 layer가 있다. 이들 레이어는 adobe 포토샵처럼 사용자가 마음대로 만들고 지우는 것이 아니라 미리 각 레이어의 역할이 정해져 있으므로 주요한 레이어의 역할은 꼭 알고있어야 한다.**  
참고: https://www.lucidar.me/en/eagle/understanding-layers/

|layer no.|name|역할|
|-|-|-|
|1|Top|윗면 배선 및 윗면 copper pour|
|16|Bottom|아랫면 배선 및 copper pour|
|17| Pads| through hole pad|
|18|Vias| Vias|
|20|Dimension| 외곽선과 hole|
|21|tPlace| 윗면 실크인쇄|
|22|bPlace| 아랬면 실크인쇄|
|25|tNames| 윗면 name 실크인쇄|
|26|bNames| 아랬면 name 실크인쇄|
|27|tValues| 윗면 Value 실크인쇄|
|28|bValues| 아랬면 value 실크인쇄|
|29|tStop| 윗면 soldermask|
|30|bStop| 아랬면 soldermask|
|31|tCream| 윗면 SMD FLUX|
|32|bCream| 아랬면 SMD Flux|
|44|Drills| 드릴 가공 위치|
|51|tDocu| 부가정보-인쇄되지 않음|


## 기본 용어
* component: 회로 위에 설치되는 각종 부품들을 일컫는다.
![](https://www.instructables.com/files/deriv/FKE/BL85/J1CELHRE/FKEBL85J1CELHRE.LARGE.jpg)
* symbol : 회로도 (혹은 회로도에 사용되는 기호)를 말한다.
![](https://www.instructables.com/files/deriv/FUL/0PXU/J1CEK97J/FUL0PXUJ1CEK97J.LARGE.jpg)
* package : 부품의 물리적인 형상으로, 동일한 기능을하는 콤포넌트도 제조사가 2개 이상의 다른 package로 판매한다. 문맥에 따라 2가지 조금 다른 의미로 사용된다.
  * 3d package : fusion360등에서 읽어 사용할 수 있는 3d 형상
  ![](https://www.instructables.com/files/deriv/F7T/8Y6Z/J1CEK9FN/F7T8Y6ZJ1CEK9FN.LARGE.jpg)
  * THM (through hole mounting) 인지 SMD/SMT(surface mount technology)인지, pcb에 부착하는 방법
* footprint : 각 부품의 PCB상의 표현. 동일한 component도 다른 package로 제조되었다면 다른 footprint를 갖는다. pad와, 실크스크린 기호, 이름, 구멍 등을 포함한다.
![](https://www.instructables.com/files/deriv/FAJ/5CX3/J1CEK92Z/FAJ5CX3J1CEK92Z.LARGE.jpg)

## Autodesk Eagle 설치
* 무료버전은 2-sided, 최대 80cm2 면적까지 제작 가능하다. 일반적인 용도로는 충분하다.
* [여기에서 다운로드 ](https://www.autodesk.com/products/eagle/free-download?mktvar004=707235&internalc=true)

## 새 project 만들기
* File > New > Project 로 새 프로젝트 만든다.

## 회로도 (schematic) 그리기
* 회로도를 먼저그린다. 미리 종이위에 그려둔 게 있다면 더 좋다.
* File > New > Schematic 으로 새 회로도를 만든다.
* 'ADD Part' 툴을 사용해 부품들을 라이브러리에서 찾아 넣어준다. 일단은 연결하기 전에 적당한 위치에 배치한다.  
![](https://cl.ly/d9d9baeb475a/Image%202019-02-18%20at%206.45.50%20PM.png)

![||600](https://www.instructables.com/files/deriv/FMC/LIX8/J08EGSGF/FMCLIX8J08EGSGF.LARGE.jpg)

![|600](https://cdn.instructables.com/FRZ/6YVR/J08ELMFS/FRZ6YVRJ08ELMFS.LARGE.jpg?auto=webp)

* search에서 원하는 부품이 찾아지지 않을 땐
  1. library manager에서 다른 라이브러리를 다운로드 받는다. (라이브러리 매니저의 'available' 항목에서 리스트 볼 수 있다.)
  2. 인터넷에서 원하는 부품의 라이브러리를 찾아 다운로드 받는다.
  3. 동일한 footprint를 가진 다른 부품으로 대체한다.
  4. 직접 라이브러리를 만든다. (아래 별도 항목)

** 부품을 이동하고 회전할 때 아무데나 누르면 잘 안된다. 각 부품의 기준점에 + 표시가 되어있는데, 이부분을 선택해야만 한다. 때로는 기준점이 터무니없이 멀리 있어 못찾는 경우도 있는데, 오토데스크에서 다음 버전엔 꼭 좀 고쳐주라 **

* 'Name' 툴과 'Value'툴로 부품 이름과 값 적어준다. 예를들어 저항이라면 'R2', '10Kohm' 하는 식으로...
![||600](https://cdn.instructables.com/ORIG/FC5/WQLE/J08EM6JG/FC5WQLEJ08EM6JG.gif)

* 'NET' 툴을 사용해 부품을 연결해준다.
![||600](https://www.instructables.com/files/orig/FDW/2X7T/J08EM934/FDW2X7TJ08EM934.gif)

## board 파일 만들기
* 회로도가 완성되었으면 'Generate/Switch to Board'툴로 보드을 만든다.
![](https://cdn.instructables.com/ORIG/FLJ/AB3P/J08EMDKH/FLJAB3PJ08EMDKH.gif)

### 격자 크기 설정
'GRID' 명령으로 그리드 를 사용하면 작업하기 수월하다. 1mil == 0.001" 로, 빵판의 한 칸 간격이 100mil 이다.

### 보드 크기 수정
* 보드의 외곽선 dimension 을 수정하고 싶다면 'info' 툴을 사용한다. 외곽선의 한 변을 선택하고 info에서 'from'과 'to' 값을 수정해준다. 20-demension layer를 확인한다.
![](https://cl.ly/0ad2c388f35c/Screen%20Recording%202019-02-18%20at%2007.12%20PM.gif)

### 부품 배치와 연결
* 부품을 이동/ 회전 시켜 배치하고 'NET' 툴로 연결해준다. 이때 앞면 배선은 1-top layer, 뒷변 배선은 16-bottom layer에 하는 것 잊지 않는다.
* 배선 폭은 6mil기 기본값은이 여유있게 12mil정도로 해주다. 정확한 계산을 위해서는 pcb trace width 계산기 [이곳](https://www.4pcb.com/trace-width-calculator.html)를 활용하자.

* 앞뒤를 연결하는 'VIA'가 필요한 순간이 있을 것이다.
![](https://cl.ly/c33a74682161/Image%202019-02-18%20at%207.22.41%20PM.png)

* net를 지울 때에는 'Ripup'툴을 사용한다.

## copper pour (ground plane) 만들기
* 부품이나 배선이 지나가지 않는 남는 pcb의 면 전체를 GND에 연결하면 배선도 쉽고, 무엇보다 노이즈가 줄어드는 효과가 있다.
* gnd에 연결되는 배선은 아직 연결되어있지 않도록 한다. (그림에서 노란색 unrouted 배선.)
* layer 는 1-top 혹은 16-bottom인 상태에서,
* polygon으로 copper pour 를 채울 사각형 영역을 그려준다.  이 때 isolate옵션으로 부품, 배선으로부터의 이격거리를 설정한다. 예제에서는 12로 했다.
![||800](https://cl.ly/43cb2de8024a/download/Screen%252520Recording%2525202019-02-18%252520at%25252011.17%252520AM.gif)

* signal name을 'GROUND'(혹은 GND)로 정해준다.
* renest 툴을 사용해 면을 생성한다.
![||800](https://cl.ly/47b8c8395b68/download/Screen%252520Recording%2525202019-02-18%252520at%25252011.19%252520AM.gif)

* 이 상태로는 copper pour는 형성 되었지만 gnd에 연결되어있지는 않다. gnd핀에 연결하자.  
* unrouted  상태의 gnd 배선 한 가닥을 info 툴로 열고, '$N6'과 같은 형식으로 되어있는 Signal name을 위에서와 같이 'GROUND'로 바꿔준다.
![||800](https://cl.ly/31de87fc98bf/download/Screen%252520Recording%2525202019-02-18%252520at%25252011.20%252520AM.gif)
* 완성! 그라운드 핀을 확대해보면 + 모양으로 주변의 copper pour에 연결된 걸 확인할 수 있다.

## DRC, ERC 에러 체크
아래 버튼 눌러서 에러 없는지 체크하고 메시지에 따라 처리한다.

## gerber 파일로 내보내기
* 우측의 'manufacturing' 버튼을 누르고 미리보기를 확인한 후 'CAM...'을 누른다.
* 거버파일을 레이어별로 확인한 후 'Process Job' 으로 export 한다.
![||600](https://cl.ly/2e48bf06ced6/Image%202019-02-18%20at%202.59.05%20PM.png)


# 다른 사람이 만든 pcb를 breakout 보드 형태로 가져다 쓰기 (기존 sch, brd 파일에서 footprint 가져오기)
참고: https://forums.autodesk.com/t5/eagle-forum/converting-sch-amp-brd-into-a-single-library-component/td-p/7007483
* 위 링크에서 제시하는 방법대로 design block사용해 보았으나, 디자인블록은 부품의 연결은 유지되지만 부품의 외관선과 배치는 유지되지 않는다.
* 또한 위 링크에서 제시하는 다른 방법은 라이브러리를 직접 만드는 것으로, 번거롭기도 하고 정확하게 만들수 있을지 불안하다.
* 그래서 아래에서와 같이 Fritzing 용으로 제작된 부품으로부터 eagle 에서 pcb만드는 방법을 사용한다.

# Fritzing 부품으로부터 Eagle에서 pcb footprint 만들기
* ULP 중, import-gerber 프로그램을 사용한다.
* 일단 Fritzing 부품을 구하고 fritzing에서 연다. 여기서는 Adafruit VS1053 mp3 breakout 보드를 예제로 사용한다.
![||600](https://cl.ly/4455ef0350b0/Image%202019-02-15%20at%205.23.05%20PM.png)
* PCB보기에서 작업영역 안에 들어오도록 배치하도록 하자. 회전할 필요있다면 회전시킨다.
![||600](https://cl.ly/6f43abc445a9/Image%202019-02-15%20at%205.26.18%20PM.png)

* 파일 > 내보내기 > 생산을위해 > Extended Gerber  로 내보낸다.
* 9개 내외의 파일이 있는데, 각각의 역할을 알아야 한다.
참고:http://fritzing.org/forum/thread/253/

|파일확장자 |역할|대응하는 eagle layer| 설명|
|-|-|
|.gm1|outline||
|.gtl|Top Copper||
|.gbl|Bottom Copper||
|.gto|Top silkscreen||
|.gbo|Bottom Silkscreen||
|.gts|Top Soldermask||
|.gbs|Bottom soldermask||
|.txt|Drill, PNP|pnp는 SMT공정에서 필요한듯?|
|.dri|Drill station info|Fritzing에서 사용안함|
|.gpi|Photoplotter Info |Fritzing에서 사용안함|
|.gml|Milling|Fritzing에서 사용안함|
|.gtp|Top Paste|Fritzing에서 사용안함|

* eagle 에서 작업중인 project를 열고, Board 편집 화면으로 간다.
* ULP > import-gerber 를 선택한다.
** import-gerber ULP 프로그램은 보드편집모드에서만 작동한다!**

* 각각의 gerber 파일을 대응하는 layer에 import한다. 필요한만큼 반복한다.
참고: https://www.lucidar.me/en/eagle/understanding-layers/

|gerber파일| 목표 eagle layer| 목적|
|-|-|-|
|.gm1|21-tPlace (or 22-bPlace)| 외곽선을 실크스크린인쇄해 위치를 표시한다.|
|.gbl|16-bottom|bottom면 동박|
|.gtl|1-Top| Top 면 동박|
|~drill.txt|44-drill| drill|
|.gbs|30-bStop| bottom면 solder마스크|
|.gts|29-tStop| top면 soldermask|
|.gbo|22-bPlace| bottom면 실크인쇄|
|.gto|21-tPlace| top면 실크인쇄|

![||600](https://cl.ly/d3bce742a880/Image%202019-02-15%20at%206.22.07%20PM.png0)

* 이렇게 했더니 wiring이 안되고, pad에 구멍도 뚫리지 않는 문제저머 발견...
  역시나 library로 만들어야 할듯...


# 직접 부품 만들어 library로 사용하기
참고:
https://www.autodesk.com/products/eagle/blog/library-basics-part-1-creating-first-package-autodesk-eagle/
https://www.autodesk.com/products/eagle/blog/library-basics-part-2-creating-first-symbol-autodesk-eagle/
https://www.autodesk.com/products/eagle/blog/library-basics-part-3-creating-first-device-autodesk-eagle/

* file > new > library로 새 라이브러리 만든다

## symbol 만들기
* Add symbol 선택해 심볼먼저 만든다
* 이름을 적당히 지어준다.
![||600](https://cl.ly/0fe2d26ec559/Image%202019-02-15%20at%207.34.08%20PM.png)
* pin 을 눌러 핀 먼저 만들어준다.
![](https://cl.ly/5ded31e3a498/Image%202019-02-15%20at%207.36.17%20PM.png)
* 갯수만큼 추가한다. 우클릭하면 회전한다.
![](https://cl.ly/0a9c3f18e18b/Image%202019-02-15%20at%207.38.38%20PM.png)
* Info 버튼으로 각 핀의 이름과 direction을 변경해준다.
* 위 그림은 핀 방향이 반대가 되었다. 동그라미 달린 부분이 바깥으로 향해야 한다.
![||600](https://cl.ly/d6dad425c9b3/Image%202019-02-15%20at%207.47.58%20PM.png)
* 여러개의 GND 핀이 있는 경우 핀 이름 뒤에 '@숫자'를 붙여주면 모두 동일한 연결로 간주된다.
* direction은 초급사용자에게는 크게 의미없는 듯한데... 일단 vcc, gnd, 3v3 등 파워 관련한 핀은 모두 'pwr'로 변경하였다.
'pas'는 passive를 의미.

* line 버튼으로 부품 테두리를 쳐준다.
![](https://cl.ly/6e25269bcf7a/Image%202019-02-15%20at%207.57.54%20PM.png)
![||600](https://cl.ly/62486c15034a/Image%202019-02-15%20at%207.58.57%20PM.png)
심볼 완성!
* 저장한다.

## footprint 만들기
* add footprint...  누르고 파일 이름지어준다.
* 먼저 'grid' 버튼 눌러서 격자 눈금 크기 정해준다. 단위는 'mm', 'inch', 'mil' 사용할 수 있다. 1 mil = 0.001 inch로, 빵판의 피치(한 칸 간격)이 100mil이다. eagle 격자의 기본값이 50 mil인데, 빵판 간격의 절반이라고 보면 된다.
![](https://cl.ly/40dc5cd09e05/Image%202019-02-15%20at%208.11.23%20PM.png)

* pad 먼저 그려준다. 'pad'버튼을 사용한다. smd용 pad는 그 옆에 있는 버튼이다.
* 헤더핀 꽂기에 적당한 pad size는 pad:66, drill:39 (mil)정도면 좋다.  
![](https://cl.ly/f9e7610b3457/Image%202019-02-15%20at%208.13.13%20PM.png)
![||600](https://cl.ly/6ddf7ef94b25/Image%202019-02-15%20at%208.46.45%20PM.png)
여기서는 pad array 버튼을 사용해 쉽게 등간격으로 32개 pad를 그렸다.

* 51-tDocu layer에 외관선과 기타 정보를 그려넣는다. 이 레이어는 기능과는 전혀 무관한다. 낙서해도 된다.
* 21-tPlace layer에 윗면 silk 인쇄될 내용을 그려넣는다. 각 핀의 라벨 등 넣으면 되겠다. 난기존 부품에서 copy&paste했다.    
** 윤곽선을 20-dimension layer에 두지 말고 반드시 21-tPlace 에 만들자. 나중에 라이브러리에서 부품을 가져와 pcb에 올렸을 때 pcb모양을 잘라내라는 의미가 되버린다.**  
* 25-tName, 27-tValue layer에  text툴로 이름과 값 넣을 자리를 써넣는다. 일단 >name, >value로 써서 라이브러리에 저장해 놓고 나중에 사용할 때 이름과 값을 바꿔준다.
![||600](https://cl.ly/c97562309bbd/Image%202019-02-15%20at%208.59.27%20PM.png)
footprint 완성! 저장한다.

## symbol과 footprint 연결해 device 만들기
* add divece... 눌러 디바이스 만들고 이름지어준다.
* add part 버튼으로 아까 만든 symbol을 추가해준다.
* 오른쪽 아래 new 버튼으로 아까 만든 footprint를 추가해준다.
![||600](https://cl.ly/18ac232379ef/Image%202019-02-15%20at%209.08.17%20PM.png)
![||600](https://cl.ly/687700cd6203/Image%202019-02-15%20at%209.10.17%20PM.png)
* 오른쪽 아래 'connect'버튼을 눌러 심볼의 핀과 footprint의 pad를 짝지워준다.
![||600](https://cl.ly/8f803b9f0c2d/Image%202019-02-15%20at%209.12.54%20PM.png)
* 모든게 성공적이라면 초록색 체크표시가 나타난다.
![||600](https://cl.ly/caff5da58991/Image%202019-02-15%20at%209.17.49%20PM.png)
완성! 저장한다.

* 원한다면 왼쪽아래 3/4분면에는 description 을 쓸 수도 있다. 여길 잘 써 주어야 library에서 검색할 때 잘 찾을 수 있다.

# fusion360 - eagle 연동
참고: https://www.autodesk.com/products/eagle/blog/fusion-360-integration-eagle/
영상 튜토리얼: https://www.youtube.com/playlist?list=PL1rOC5j_Fyi6B0wRJw2GAVEjE_dNR7rlK  
* ~~일단 fusion360에서 pcb 기능을 활성화 해 주어야 한다.
preferences > pcb feature 를 체크한다.~~
pcb기능은 preview 단계를 지나 기본 활성화 되어있다.

* 보드편집화면에서 화면 오른쪽의 Fusion360연동 버튼을 누른다.
![||600](https://cl.ly/18a06c7039ec/Image%202019-02-16%20at%207.08.37%20AM.png)
* fusion360에서 만들어진 pcb를 볼 수 있다!!
![||600](https://cl.ly/003622d47751/Image%202019-02-16%20at%207.10.55%20AM.png)
하필이면 위에서 사용한 부품들은 모두 라이브러리에 3d data가 탑재되어있지 않아 납작한 빨간 덩어리로만 표현되었으나, 3d데이터가 있는 부품은 멋지게 그려진다.
![](https://www.autodesk.com/products/eagle/blog/wp-content/uploads/2017/08/2017-08-15_11-06-19.png)

* 이제 fusion360에서도, eagle에서도 부품 위치나 pcb크기등 편집할 수 있다. 편입을 마치면 eagle에서 'pull,push'로 동기화 해주어야 한다.

# 부품data- footprint, 3D model - 얻는 법
* mouser.com에서 대부분의 부품을 다운로드할 수 있다.
 ![](https://cl.ly/709e395c0c34/Image%202019-05-03%20at%203.44.58%20PM.png)
 * samacsys 라는 회사의 형식으로 되어있는 듯한데, samacsys library loader라는 프로그램으로 autodesk eagle에서 쓸 수 있도록 바꿀 수 있다. ... 그런데 library loader가 윈도우 전용 ㅠㅠ
* 찾아보니 eagle plugin으로 samacsys 라이브러리 로더가 제공된다.
설치방법 참고:   https://www.autodesk.com/products/eagle/blog/now-available-new-free-eagle-library-plugin-samacsys/
참고로 설치할 때 .png파일은 Applications/Eagle9.4/bin  아래로, 나머지 파일은 /Applications/EAGLE-9.4.0/examples/ulps 폴더로 복사하면 된다.(mac)
eagle.scr파일은 /Documents/EAGLE/아래에 있다.

* 최초에 samacsys 버튼을 눌러서 실행시키면 회원가입 먼저하고, library를 지정해 주어야 하는데, eagle에서 새라이브러리 만들기로 만든 후(file> new> library) 적당한 이름으로저장하고 browse로 지정하면 된다.
* 라이브러리는 managed library로 바꿔주어야 3d 패키지 적용할 수 있다.

![](https://cl.ly/3d0230a2f4c7/Image%202019-05-03%20at%204.40.43%20PM.png)
