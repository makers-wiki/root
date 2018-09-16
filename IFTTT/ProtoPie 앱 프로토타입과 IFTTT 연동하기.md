{{WIKI}}
실제 스마트폰 앱을 개발하지 않고서, UI 프로토타이핑 툴인 ProtoPie를 사용해 간단히 스마트폰 앱 UI 시제품을 제작하고,  IFTTT를 활용해 Gmail, Facebook , littleBits 등 각종 서비스에 연동해 실제 작동시킬 수 있다. (안드로이드폰만 가능)
<youtube>https://youtu.be/JfKTo6tH4rY</youtube>

프로토파이는 IFTTT에 채널이 만들어져 있지 않으므로, IFTTT에 연결하기 위해서 Adafruit IO라는 서비스를 활용하기로 한다.

=== ProtoPie 설치 ===
참고: https://www.protopie.io/ko/learn/basics/

프로토파이는  파워포인트 자료 만들듯 쉽게 인터렉티브한 UI 프로토타입을 만들수 있도록 해주는 프로토타이핑 툴.  Studio XID 라는 국내 팀이 개발중이다.

Adobe XD, Sketch 로 개발된 UI를 import해 작동시킬 수도 있다.

최초 10일간 무료로 사용할 수 있다.

1. 컴퓨터에서 프로토파이 어플을 다운받고 설치한다. https://www.protopie.io/download/

2.  프로그램을 실행하고 'New Pie' 를 선택해 새 프로젝트를 시작한다.

<img src =https://cl.ly/q5qS/Image%202018-03-12%20at%205.15.41%20PM.png width = 600>

3.  제작하고자 하는 app의 UI를 개발한다. Adobe XD나 Sketch 파일을 임포트 할 수도 있다.

<img src = https://cl.ly/q5BJ/Image%202018-03-12%20at%205.18.42%20PM.png width = 600>

=== IFTTT에서 메시지를 받으면 반응하는 UI요소 만들기 ===

1. Trigger > Receive 를 선택한다.

<img src =https://cl.ly/q631/Image%202018-03-12%20at%205.25.29%20PM.png width = 600>

2. 프로퍼티에서 'Channel' 을 'Android Broadcast'로 선택합니다. <br> 'Message ID'는 어떤 메시지인지를 나중에도 알아볼 수 있게 적당히 이름짓는다.

<img src =https://cl.ly/q5Et/Image%202018-03-12%20at%205.28.27%20PM.png width = 600>

3. 방금 만든 'Receive' trigger 아래에 '+ 버튼'을 눌러 원하는 response를 추가한다.

=== ProtoPie에서 IFTTT 로 메시지 보내기 ===

1. 원하는 트리거 밑에 'Send' Response를 추가한다. <br>예를들어 버튼을 누르면 신호가 가도록 하고 싶다면 버튼이미지에 'Tap' trigger를 추가하고 그 하위에 'Send' Response를 추가한다.

<img src =https://cl.ly/q6Nk/Image%202018-03-12%20at%205.35.33%20PM.png width = 600>

2. Send response의 프로퍼티로 'Channel'은 'Android Broadcast'로 설정하고, 'Message ID'는 기억하기 쉽도록 적당히 이름짓는다.

<img src =https://cl.ly/q5CM/Image%202018-03-12%20at%205.47.18%20PM.png width = 600>

=== 스마트폰에서 ProtoPie 프로토타입 실행하기 ===
1. Google play store에서 'ProtoPie Player'를 다운받아 스마트폰에 설치한다.

https://play.google.com/store/apps/details?id=io.protopie.companion&hl=ko

2. 프로토파이 개발환경에서 'Device' 버튼을 눌러 qr 코드가 보이도록 한다.

<img src =https://cl.ly/q5Hz/Image%202018-03-12%20at%205.53.49%20PM.png width = 600>

3. 스마트폰에서 프로토파이 플레이어를 실행하고 QR코드를 스캔한다.

4. 프로토타입이 작동중일 때 화면 위에서 두 손가락으로 더블탭 (타탁!)하면 프로토타입을 스마트폰에 저장해 컴퓨터와 연결 없이 어디서나 실행시킬 수 있다.

<img src =https://cl.ly/q6XZ/Screenshot_2018-03-12-17-58-12.png width = 400>

== Adafruit IO ==

프로토파이에서 받은 메시지나 프로토파이로 가는 메시지를 저장해 두는 장소로 Adafruit.io를 활용한다. IFTTT의 adafruit io채널을 통해 gmail등 다른 서비스와 메시지를 주고받을 수 있다.

참고: https://io.adafruit.com/

1. Adafruit IO 계정 만들기. 기본 기능은 모두 무료로 사용 가능하다.

2. <u>가입 후 첫 화면에서 좌측 메뉴의 'View AIO Key'를 눌러 User Name과 AIO key를 확인한다. (잠시 후 받아적어야 하므로 창을 열어두자)</u>
<img src =https://cl.ly/q3Wg/[2a4933f30f8698a67c56573cf042050e]_Image%202018-03-10%20at%208.40.49%20AM.png width = 600>

== IoT Bridge 앱 for 도구의 인간 워크샵 ==
IoT Bridge 앱은 인터넷 연결 기능이 없는 ProtoPie 프로토타입에서 신호를 받아 외부에 연결해주는 역할을하므로 프로토타입이 실행되는 동안 항상 켜져있도록 한다.

1. 구글 플레이 스토에서 'IoT Bridge for Doguin Workshop' 앱을 다운받아 설치한다.

https://play.google.com/store/apps/details?id=com.doguin.android.protopiebridge

2. 앞서 확인 한 'Adafruit IO Username' 과 'AIO key'를 입력해 넣는다. ( 좀 길지만 최초 한번만 하면 된다^^)

<img src =https://cl.ly/q5b2/Screenshot_20180312-182941.png width = 400>

3. Connect 버튼을 누르면 실행중인 프로토파이 앱과, Adafruit IO와 연결이 된다. <br>  <u>최초 연결시 자동으로 Adafruit.io에 두개의 feed 가 생성된다. frompie피드는 프로토파이(스마트폰)에서 보내오는 신호이며, topie피드는 프로토파이(스마트폰)으로 가는 신호이다.</u>  자세한 내용은 무시해도 좋지만 frompie 피드와 topie 피드는 구분할 수 있어야 한다.

참고: https://learn.adafruit.com/adafruit-io-basics-feeds

<img src =https://cl.ly/q5VQ/Image%202018-03-12%20at%206.28.33%20PM.png width = 400>

4. 연결을 끊고싶다면 Disconnect 버튼을 누르면 된다. 현재 연결이 되어있는 상태라면 버튼의 라벨이 Disconnect로 보이며, 현재 연결되어있지 않는 상태라면 Connect라고 쓰여진다.

== IFTTT ==

ifttt를 사용하면 클릭 몇 번으로 여러가지 다양한 웹 서비스 들을 조합하는 것 만으로 나만의 새로운 서비스를 만들 수 있다.  참고: https://ifttt.com/about <br>

무료이므로 부담 없이 계정을 만들자. <br>

앞서 프로토파이와 연결한 adafruit io 채널을 다른 채널들과 조합하여 여러가지 서비스를 프로토타입과 연동해 실행시킬 수 있다.  단순화해 말하자면 IFTTT에서는 Adafruit IO가 프로토파이 프로토타입을 대리한다고 생각하면 된다.

=== ProtoPie로 메시지 보내기 ===

예를 들어 Gmail 계정에 메일을 받으면 protopie 프로토타입에 'GotMail'메시지를 전달하고자 한다면,

1. IFTTT 웹페이지나 전용 앱에서 My Applets > New Applet 클릭

2. 'This'항목에 Gmail 선택. (최초사용시 사용자 인증)

3. gmail에서 가능한 액션 리스트에서 첫번째 'Any new email in inbox'선택.

4. 'That'항목에 Adafruit 선택. (최초사용시 사용자 인증)

5. <u>프로토파이로 메시지를 보내고자 하므로 피드네임 topie선택. 전달하고자 하는  데이터: GotMail (앞서 ProtoPie에서 정한 Message ID) 입력.</u>

6. 메일을 보내 프로토타입이 작동하는지 테스트해본다.

<img src =https://cl.ly/q6FY/Screen%20Recording%202018-03-12%20at%2011.35%20PM.gif width = 600>

=== ProtoPie에서 메시지 받기 ===

예를 들어 앱 프로토타입의 버튼을 누르면 cloud bit에 연결된 리틀비츠 회로의 LED가 켜지도록 하고자 한다면,

1. IFTTT 웹페이지나 전용 앱에서 My Applets > New Applet 클릭

2. 'This'항목에 Adafruit IO 선택. (최초사용시 사용자 인증)

3. 액션 리스트에서 첫번째 'Monitor a feed ...'선택.

4. <u>프로토파이에서 메시지를 받고자 하므로 피드네임 frompie선택. Relationship은 'equal to', Value는 LedOn (앞서 ProtoPie에서 정한 Message ID)입력. (frompie로 보내진 데이터를 지켜보다가
LedOn이라는 값이 오면 작동해라)</u>

5. 'That'항목에 littleBits 선택. (최초사용시 사용자 인증)

6. 액션 리스트에서 'Activate Output'선택. 신호를 받는 클라우드모듈 선택.

7. 버튼을 눌러 회로에 불이 켜지는지 테스트해본다.

<img src =https://cl.ly/q5kt/download/Screen%20Recording%202018-03-12%20at%2011.53%20PM.gif width = 600>

[[category:ProtoPie]]
[[category:IFTTT]]
[[category:Adafruit IO]]
