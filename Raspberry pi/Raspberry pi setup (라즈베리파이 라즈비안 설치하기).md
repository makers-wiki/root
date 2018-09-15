
# Raspberry Pi setup (Raspbian version9, stretch기준)

## 준비물

<img src="https://cl.ly/pyVs/Image%202018-03-06%20at%204.34.03%20AM.png" width=600 >

== Raspbian 설치 ==
 '''라즈베리파이에 키보드나 마우스, 모니터 매번 연결하려니 번거롭다. 특히 pi-zero 같은 경우엔 usb포트는 하나밖에 없고 hdmi단자도 많이 쓰이지 않는 mini규격이라 난감하기 그지없다. 모니터 키보드 마우스 연결않고 (심지어 wifi동글 없어도!) 다른 노트북이나 데스크탑을 사용해 제어할 수 있는데, Headless 설정이라고 한다. (모니터 없다는 의미) [[Raspberry pi의 Headless 설정]] 문서를 참고하자'''

** 2018년 6월 버전의 Raspbian이 ibus 한글입력기와 호환성 문제가 있는 것 같다. 한글을 써야한다면 다른 버전을 설치하자. 보다 안정적인 예전 버전의  raspbian Jessie 는 이곳에서...: http://downloads.raspberrypi.org/raspbian/images/raspbian-2017-07-05/2017-07-05-raspbian-jessie.zip **
=== Noobs 사용(더 쉽다) ===
* 설치방법 참고: https://www.raspberrypi.org/learning/software-guide/quickstart/<br />


# ‘NOOBS’ 다운로드 https://www.raspberrypi.org/downloads/

<img src = "https://cl.ly/pwrJ/Image%202018-03-06%20at%204.39.37%20AM.png" width = 600>

 ''NOOBS를 통하지않고 바로 라즈비안 이미지를 sd 카드에 복사할 수도 있다. 더 빠르고, 단계가 적다.''
# ‘SD formatter’ 다운로드 &amp; 설치 https://www.sdcard.org/downloads/formatter_4/index.html
# SD카드를 노트북에 삽입하고 SD formatter 실행.

<img src="https://cl.ly/pwqB/Image%202018-03-06%20at%204.42.19%20AM.png" width=600>

 ''다른 방법을 통해 SD카드에 raspbian 설치해도 좋지만 FAT32로 포맷되어야함을 잊지말것. FATex는 안됨.''
# NOOPS zip파일을 풀어 SD카드에 모두 복사
# RPI에 usb(파워), HDMI( 모니터), 키보드, 마우스, 그리고 SD카드를 끼우고 실행!
# os 선택하도록 하는데, Raspbian 을 선택. 아래에서 언어는 한글로, 키보드레이아웃은 kr로… ’설치’를 눌러 설치 진행.

<img src="https://cl.ly/pxxt/Image%202018-03-06%20at%204.49.56%20AM.png" width=600>
# 기다리면 설치 완료

===  NOOBS를 통하지않고 바로 라즈비안 이미지를 sd 카드에 복사 (더 빠르고, 단계가 적다.) ===
참고: https://www.raspberrypi.org/documentation/installation/installing-images/README.md


1. Raspbian 이미지 다운로드 & 압축풀기.
https://www.raspberrypi.org/downloads/raspbian/
압축해제시 문제 발생하는 경우 7zip(윈도)나 the Unarchiver (mac) 사용.
Desktop 버전은 윈도우와 같은 GUI환경이고, Lite버전은 DOS같은 콘솔환경이다.
잘 모르겠다면 Desktop 버전을 설치.

2. Etcher 다운로드 & 설치 ( 이미지 버닝 툴 - 이미지파일을 sd카드로 옮겨줌.)

https://etcher.io/

3. Echer 사용해 다운받은 이미지를 SD카드에 굽기.

4. RPI에 usb(파워),  HDMI( 모니터),  키보드, 마우스, 그리고 SD카드를 끼우고 실행!

== wifi 연결 ==

# usb wifi 동글을 꽂는다.
# xwindow 우상단에 네트워크 아이콘을 클릭해 AP를 선택하고 비번을 입력하면 끝.

<img src="https://cl.ly/pwv0/Image%202018-03-06%20at%204.50.27%20AM.png" width=600>

== 소프트웨어 업데이트 ==

# 터미널을 열고

<img src="https://cl.ly/pwlh/Image%202018-03-06%20at%204.52.39%20AM.png" width=300>
# 다음을 입력해 업데이트 필요한 소프트웨어 목록을 로드한다.

<source lang="bash">sudo apt-get update</source>
<img src="https://cl.ly/pyP6/Image%202018-03-06%20at%204.56.43%20AM.png" width=600>

<ol start="3" style="list-style-type: decimal;">
<li>upgrade 명령으로 업데이트를 설치한다.</li></ol>

<source lang="bash">sudo apt-get upgrade</source>
업그레이드 할건지 확인하면 [y] [Enter]. 4. 한참 기다린 후 업그레이드가 완료되면 다운로드한 업데이트 파일을 지워서 용량을 확보한다.

<source lang="bash">sudo apt-get clean</source>
== 한글설치 ==

참고: http://cccding.tistory.com/96 1. 한글폰트 설치

<source lang="bash">sudo apt-get install fonts-unfonts-core</source>

<img src="https://cl.ly/pxzH/Image%202018-03-06%20at%204.57.23%20AM.png" width=600>

<ol start="2" style="list-style-type: decimal;">
<li>ibus한글 입력기 설치</li></ol>

<source lang="bash"> sudo apt-get install ibus-hangul</source>
<ol start="3" style="list-style-type: decimal;">
<li>Raspberry Pi configuration의 Localisation 설정.
<br>
<img src="https://cl.ly/pxFi/Image%202018-03-06%20at%204.58.18%20AM.png" width=600>

<img src="https://cl.ly/pycS/Image%202018-03-06%20at%204.58.29%20AM.png" width=600>

<img src="https://cl.ly/pxkS/Image%202018-03-06%20at%204.58.40%20AM.png" width=600>
<br>
Timezone은 Asia &gt; Seoul로 …</li>
<li>OK를 누르면 재부팅~!</li>
<li>재부팅 후 우상단에 EN아이콘을 눌러 한글 입력기를 선택. 다시 한번 눌러 한글상태에 체크

<img src="https://cl.ly/pyTR/Image%202018-03-06%20at%204.59.14%20AM.png" width=600>

<img src="https://cl.ly/py45/Image%202018-03-06%20at%205.01.41%20AM.png" width=600>

</li>
<li>메뉴도 한글로 되어있고 한글 입력도 잘 된다. 한&lt;-&gt;영 변환키는 [shift]+[space]

<img src="https://cl.ly/pxVm/Image%202018-03-06%20at%205.02.15%20AM.png" width=600>


== 라즈베리파이 화면공유 ==

안그래도 좁은 책상위에 라즈베리파이용 키보드와 마우스까지 올라와있으니 안되겠다. 게다가 순간순간 어느 키보드를 눌러야 하는지 헷갈린다. 또 노트북에 물려 듀얼로 사용하던 모니터를 라즈베리파이에 연결하고나니 노트북 작업능률이 떨어진다. 이럴 때. VNC를 통해 라즈베리파이 화면을 노트북에 공유하고 노트북의 키보드와 마우스로 라즈베리파이를 제어한다. 참고: https://www.raspberrypi.org/documentation/remote-access/vnc/

# 최근의 라즈비안에는 realVNC가 기본탑재되어있다. 새로인 install 할 필요는 없다. 구지 해야한다면

<source lang="bash">sudo apt-get update
sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer</source>
<ol start="2" style="list-style-type: decimal;">
<li>menu &gt; 기본설정(preferences) &gt; Raspberry Pi Configuration &gt; Interfaces 에 들어가서 VNC 항목을 Enabled에 체크 후 OK한다.</li></ol>

내부 네트워크를 사용해 연결할 수 도, 인터넷을 통해 연결할 수도 있는데, 우리는 내부망을 사용하도록 하자. (아마 성능, 보안상 낫지 않을까?) 3. 작업표시줄 우측의 VNC아이콘을 누르면 RPI 의 IP address를 알 수 있다.

https://www.realvnc.com/en/connect/_images/raspberry-pi-direct-address.png

<ol start="4" style="list-style-type: decimal;">
<li>노트북에 VNC viewer를 설치한다. 여기에서 받을 수 있다. https://www.realvnc.com/en/connect/download/viewer/</li>
<li>주소창에 위에서 얻은 라즈베리파이의 IP주소를 넣는다. 처음 연결할 때 뭐라고 경고가 뜬다. 연결해도 되겠냐고 확인하는 거다.

<img src="https://cl.ly/pyRD/Image%202018-03-06%20at%205.03.29%20AM.png" width=600>

</li>
<li>기본 로그인 아이디는 ‘pi’, 패스워드는 ’raspberry’이다.</li>
<li><p>키보드와 마우스, 모니터를 다 뽑고 재부팅한다. 노트북에서 잘 컨트롤 됨을 확인한다.

<img src="https://cl.ly/pxbP/Image%202018-03-06%20at%205.04.06%20AM.png" width=600>
</p></li>
<li>해상도를 적절히 (작게)하면 속도가 만족스럽다. 1024x768정도면 괜찮은듯. (위에서 한 번 나온 configuration메뉴에서 설정할 수 있다.)</li>
<li><p>마지막으로, ip address는 보통 고정되어있지 않고 부팅할 때마다 바뀌기 때문에, 어느날 갑자기 VNC연결이 안 될 수도 있다. 공유기 설정에서 라즈베리파이(에 연결된 ipTIME usb 동글)에 항상 정해진 ip 주소를 할당토록 설정한다. 방법은 공유기마다 다르겠지만…

<img src="https://cl.ly/pwvV/Image%202018-03-06%20at%205.04.36%20AM.png" width=600>
</p></li>
<li><p>노트북과 라즈베리파이 사이에 파일교환이 필요한 경우 VNC viewer의 화살표 아이콘을 누르거나, 라즈베리파이의 작업표시줄상 VNC아이콘을 누르면 된다.

<img src="https://cl.ly/2h333e1Z3R3X/Image%202017-10-24%20at%208.11.24%20%EC%98%A4%ED%9B%84.png" width=600></p></li></ol>

== Raspberry leaf (GPIO 라벨)설치 ==

<img src="http://2.bp.blogspot.com/-AC6Gq5TaABU/USIcnBrnZaI/AAAAAAAAEfQ/bkCrzm4BZMc/s320/leaf+-+web.jpg
" width=600>

참고: http://www.doctormonk.com/2013/02/raspberry-pi-and-breadboard-raspberry.html * GPIO에 라벨을 프린트해 붙여놓으면 편하겠다. * 26핀( model A, modelB 1)용 https://github.com/simonmonk/wiki_images/raw/master/raspberry%20leaf%20r2.pdf * 40핀(modelB2,3, model zero)용 https://github.com/splitbrain/rpibplusleaf

[[category:raspberry pi]]
