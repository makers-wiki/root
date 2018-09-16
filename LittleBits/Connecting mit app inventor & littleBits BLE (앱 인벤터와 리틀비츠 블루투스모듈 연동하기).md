{{WIKI}}
= mit app inventor &lt;-&gt; littleBits BLE =

@(4_skills)[littleBits, app inventor] @[littleBits, app inventor]

참고: http://discuss.littlebits.cc/t/is-it-possible-to-control-a-w30-ble-bit-from-a-custom-made-app/25376/6

참고: https://github.com/khanning/littlebits-ble-extension/blob/gh-pages/littleBitsBLE_extension.js

== 예제 ==

[[File:LittleBits_w30_BLE.aia.zip]]

예제를 다운받아 app inventor에서 import 한 후, 각 프로젝트에 맞게 수정해 사용한다.

 https://cl.ly/pZeY/appInventor-littleBIts_BLE.gif

== 예제 분석 ==

=== 1. BLE scanner app으로 littleBits BLE 모듈이 어떻게 작동되는지 살펴보자 ===

BLE scanner app으로 연결해 살펴보았다.

<img src="https://cl.ly/pWVO/IMG_20180214_123843.jpg" width="500">

==== UUID ====

CUSTOM SERVICE UUID: 0705d0c0c8d841c9ae1552fad5358b8a

Cstom Characteristic UUID: 0705d0c2c8d841c9ae1552fad5358b8a

==== appinventor -&gt; littleBits BLE ====

Khanning의 scratchx용 BLE extention 코드를 참고하여...

https://cl.ly/pVSi/Image%202018-02-14%20at%202.46.00%20PM.png

BLE bit에 write할 때는 byteWrite[ 0, 2, 전달하려는 값(0~255) ] 하면 된다.
<img src="https://cl.ly/pWnQ/Screenshot_2018-02-14-15-34-33.png" width="500">

==== littleBits BLE -&gt; appinventor ====

BLE bit에 연결된 버튼을 누르면 뭔지 잘 모르겠지만 HEX값 3번째 byte가 01 -&gt; 255(0xFF)로 NOTIFY 받는다.
<img src="https://cl.ly/pWrQ/Image%202018-02-14%20at%2012.51.17%20PM.png" width="500">

=== 2. app inventor BLE extension을 설치한다. ===

다운로드: http://appinventor.mit.edu/extensions/ (2.1버전 이상인지 확인! -아래쪽에 관련 내용)

도큐먼트: http://iot.appinventor.mit.edu/#/bluetoothle/bluetoothleintro

=== 3. app inventor 코드 분석 ===

확대해서 보자
https://cl.ly/pXZV/Image%202018-02-15%20at%206.10.17%20AM.png
https://cl.ly/pXPB/Image%202018-02-15%20at%206.03.49%20AM.png

==== BLE extention의 버그: apk로 설치해 실행시 WriteByte 블록 에러 &quot;Runtime error failed resolution Lcom/google/common/collect/List&quot; ====

<div><del>

참고: https://www.google.co.kr/search?q=failed+resolution+of:+Lcom/google/common/collect/Lists%3B+app+inventor&amp;ei=VcGEWtv2OMzC0gSjxL3ICg&amp;start=0&amp;sa=N&amp;biw=1920&amp;bih=983

https://groups.google.com/forum/#!msg/mitappinventortest/at_zp8d4E_w/P_nT8enqCAAJ

앱인벤터의 버그로 apk를 다운받아 실행할 때 BLE WriteByte 블록이 에러가 난다. 앱인벤터 개발진이 해결해 줄 때 까지 번거롭지만 app inventor companion에 연결해 사용하자. </del></div>

ble extention이 버전 업 (v.2.1)되면서 해결됨.

참고: https://groups.google.com/forum/#!searchin/mitappinventortest/failed$20resolution$20/mitappinventortest/zjnHBb_FK7c/3RG77w-gBgAJ

[[File:BLE-v2.1-rc4.aix.zip|writebyte block 버그 해결된 BLE extension]]

[[category:app Inventor]]
[[category:littleBits]]
