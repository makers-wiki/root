{{WIKI}}
== 개요 ==
automate <ref> 오토메이트 홈페이지: http://llamalab.com/automate/  </ref> 는 안드로이드의 여러기능들- 각종 센서, 인터페이스, 앱 등등- 을 서로 연결해 사용자가 원하는 기능을 직접 간단히 구현할 수 있도록 해주는 스크립트 프로그램이다.

Beacon은 주기적으로 짧은 신호를 쏘는 장치를 말한다. 주기적으로 깜빡이는 등대가 대표적인 비컨이다.

블루투스 규격에는 advertisement 라고 하는 통신방식이 있는데, 두개의 디바이스가 서로 연결( connect) 해 통신하는 기존 방식과 달리 하나의 장치가 (대상이 없을지라도) 지속적으로 주변이 메세지를 방송토록 하는 것이다. 비컨이다. 특히 이 비컨의 신호세기를 측정하면 비컨으로부터 수신측이 얼마나 떨어져있는지 알 수 있고, 좀 더 정교하게는 2개이상의 위치를 알고있는 비컨으로부터 (삼각측량방식으로) 현재 수신측의 정확한 위치를 알 수도 있다. gps신호가 안 잡히는 실내에서 위치를 추적할 수 있는 좋은 방법이다.
블루투스의 advertisement 프로토콜 위에 apple이 위치추적기능을 위해 특별히 약속한 규격이 iBeacon(아이비컨) 이다.

 성균관대 나는7ㅏ수다팀의 아이디어로 지갑(블루투스 모듈, 비컨 이 들어있는..)을 놓고 현관을 나서려하면 알림을 주는 시스템을 프로토타이핑 해본다.
안드로이드 폰이 현관 잠금장치로 쓰이고, 주변 밝기를 감지( 동작인식 현관등) 해 현관 앞에 사람이 있고, 블루투스 신호가 가까우면 (지갑을 소지) 그냥 문을 열어주지만 사람이 현관에 있고, 블루투스 신호가 멀면(지갑 놓고나옴) 알림을 주도록 한다.
블루투스모듈을 iBeacon으로 설정할 것 없이 연결을위해 방송하는 신호를 활용한다. (advertisement 모드 사용안한다.) 그렇지만 물론 advertisement 모드를 사용한 비컨으로도 구현할 수 있다. (저전력등 여러면에서 유리하다)

== 블루투스 모듈 연결 ==
bluetooth2.0 모듈도 활용가능할 것으로 여겨지지만 (advertisement 모드는 4.0에만 있지만 우리는 연결요청신호를 활용한다.) 어떤 이유인지 신호강도표시를 못한다. HM-10 ble(blutoothe 4.0) 모듈을 사용한다.
전원만 연결되면 되므로 3v 코인배터리를 VCC와 GND사이에 꽂아 파워 공급하는 것으로 족하다.
<img src="https://cl.ly/1b432F0H0m3B/IMG_20170606_091144.jpg" width=800px>

== 블루투스 모듈 이름 확인 ==
'''ble 스캐너''' <ref> ble 스캐너 앱스토어 페이지: https://play.google.com/store/apps/details?id=com.macdom.ble.blescanner&hl=en  </ref> 등의 앱을 사용해 모듈의 이름을 확인한다.  여기서는'''doguinBLE01'''이 이름이다.
물론 AT command를 사용해 이름을 바뿍 수도 있다. <ref> hm-10으로 아이비컨 만들기: http://www.blueluminance.com/HM-10-as-iBeacon.pdf </ref>

https://cl.ly/2T330k2w2f1a/Image%202017-06-06%20at%209.19.49%20AM.png

== automate 스크립트 작성 ==
시작화면

https://cl.ly/0C2p1I3m190m/Image%202017-06-06%20at%209.28.56%20AM.png

스크립트 표지

https://cl.ly/3B1w2x2u0y40/Image%202017-06-06%20at%209.32.29%20AM.png

스크립트 편집화면

https://cl.ly/0D0d1h1P2w0J/ecd81d156be49d5843fabf3a2c0b086e_Image%202017-06-06%20at%209.37.29%20AM.png

https://cl.ly/2x0X3o3X3A2V/Image%202017-06-06%20at%209.40.33%20AM.png
https://cl.ly/0f033x3n2u45/Image%202017-06-06%20at%209.42.50%20AM.png
https://cl.ly/3r2F1F2V2l20/Image%202017-06-06%20at%209.43.51%20AM.png
https://cl.ly/351y1c2h0P16/Image%202017-06-06%20at%209.48.09%20AM.png
https://cl.ly/2B2P3o223a3J/Image%202017-06-06%20at%209.54.28%20AM.png
https://cl.ly/3u45260O020g/Image%202017-06-06%20at%209.55.46%20AM.png
https://cl.ly/1e1S383C3q1s/Image%202017-06-06%20at%209.58.17%20AM.png


== 참고 ==
[https://en.wikipedia.org/wiki/IBeacon 아이비컨 위키피디아 페이지]

[http://www.blueluminance.com/HM-10-as-iBeacon.pdf hm-10으로 ibeacon 만들기]

[http://blog.naver.com/PostView.nhn?blogId=xisaturn&logNo=220714044323 BLE 간단 설명 한글]

[[category:Llama Automate]]
[[category:BLE]]
[[category:Ibeacon]]
