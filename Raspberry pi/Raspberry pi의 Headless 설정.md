# Raspberry pi의 Headless 설정
라즈베리파이에 키보드나 마우스, 모니터 매번 연결하려니 번거롭다. 특히 pi-zero 같은 경우엔 usb포트는 하나밖에 없고 hdmi단자도 많이 쓰이지 않는 mini규격이라 난감하기 그지없다.
모니터 키보드 마우스 연결않고 (심지어 wifi동글 없어도!) 다른 노트북이나 데스크탑을 사용해 제어할 수 있는데, Headless 설정이라고 한다. (모니터 없다는 의미)

wifi나 usb케이블을 통해 최초 연결 후 vnc(화면공유)를 설치하고(사실 기본 설치되어있지만, 설정에서 켜주어야...) 그 이후엔 vnc를 사용해 사용토록 하자.

**2018년 6월버전의 Rasbian stretch가 Pi0W에서 무선 설정하는데 문제가 발견되어 이전버전인 Raspbian Jessie로 진행하였슴.**

## Raspbian 설치
NOOBS를 통하지않고 바로 라즈비안 이미지를 sd 카드에 복사 (NOOBS보다 더 빠르고, 단계가 적다.)
참고: https://www.raspberrypi.org/documentation/installation/installing-images/README.md

1. Raspbian 이미지 다운로드 & 압축풀기. https://www.raspberrypi.org/downloads/raspbian/
압축해제시 문제 발생하는 경우 7zip(윈도)나 the Unarchiver (mac) 사용.

2. Etcher 다운로드 & 설치 ( 이미지 버닝 툴 - 이미지파일을 sd카드로 옮겨줌.)

https://etcher.io/

3. Echer 사용해 다운받은 이미지를 SD카드에 굽기.

완성된 SD카드 뽑았다가 다시 꽂아보면, boot 라는 이름으로 라즈비안 이 설치되어있다. 여기에 몇개 파일을 수정해주어야 한다.
![||600](https://cl.ly/smt5/Image%202018-07-07%20at%202.59.16%20PM.png))

참고: https://medium.com/@aallan/setting-up-a-headless-raspberry-pi-zero-3ded0b83f274
참고: https://www.losant.com/blog/getting-started-with-the-raspberry-pi-zero-w-without-a-monitor

## 네트워크 연결 위한 설정파일 수정
wifi를 사용하거나, 혹은 wifi동글이 없거나 공유기가 없다면 USB케이블을 사용할해 노트북에 연결할 수 있다.

### SSH 켜기 설정
SD카드의 루트 디렉토리 `/boot`에 `ssh`라는 이름의 빈 파일을 하나 새로 만든다.(확장자 없음) 그러면 부팅시 SSH가 켜진다.

### case 1. wifi 켜기 설정
마찬가지로 `/boot`에 `wpa_supplicant.conf`파일을 아래 내용으로 만든다. 일반적인 텍스트 에디터 사용한다.
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
	ssid="와이파이 이름(SSID)"
	psk="암호"
	key_mgmt=WPA-PSK
}
```
#### tip. wifi 설정의 변경
 >/boot 에 만든 wap_supplicant.conf 파일은 부팅시 자동으로 `/etc/wpa_supplicant/wpa_supplicant.conf`위치로 옮겨진다.
>이후 wifi 설정을 수정해야 하는 경우가 생긴다면 (집에서 사용하던 라즈베리를 사무실로 옮긴다던지...) 이 위치에서 직접 수정하면 된다.
>```
>$ sudo nano /etc/wpa_supplicant/wap_supplicant.conf
>```


### case 2. USB OTG 켜기 설정
사실 wifi나 usb otg 둘 중 하나만 작동되면 되지만 일단 둘 다 켜두자. 특히 집에서 사용하다가 사무실로 옮겼다던지 하는 상황에서 wifi 연결을 재설정하려면 필요하다.
`/boot` 디렉토리에 `config.txt`파일을 열어서 편집한다.
```
dtoverlay=dwc2
```
라는 항목이 있는지 살펴보고 (아마 아래쪽에 있을 것임) 만약 없다면 추가한다.

또한 `cmdline.txt`파일을 열어서 (정확하게) 아래와 같이 `rootwait` 뒤에 한 칸 띄고
`modules-load=dwc2,g_ether`를 추가한다.

원래 cmdline.txt 내용:
```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=020c3677–02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

수정 후 cmdline.txt 내용:
```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=020c3677–02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait modules-load=dwc2,g_ether quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

## SSH 연결
### 라즈베리 파이 부팅
sd카드를 라즈베리에 꽂고 노트북과 pi-zero의 USB포트 (특히 usb-otg 사용하는 경우 PWR가 아님 주의!)를 usb 케이블로 연결해 파이를 부팅시킨다. LED가 깜빡이며 작동됨을 알려준다.
![||600](https://cdn-images-1.medium.com/max/800/1*3c-LB7bViYj340J63R-nUA.jpeg)

### case 1. wifi로 ssh연결
무선 라우터의 설정화면에 들어가 라즈베리파이의 ip 주소를 알아낸다.
![||600](https://cl.ly/snDE/Image%202018-07-07%20at%209.11.29%20AM.png)

이렇게 알아낸 주소로 ssh접속한다. ID: pi, PW: raspberry 가 디폴트이다.
```
$ ssh pi@위에서 알아낸 IP주소
```
![||600](https://cl.ly/sm36/Image%202018-07-07%20at%209.08.25%20AM.png)

### case 2. usb-otg로 ssh 연결
부팅이 끝난 후 노트북의 network항목을 보면 라즈베리파이가 `RNDIS/Ethernet Gadget` 라는 이름으로 잡혀있다.
![||600](https://cl.ly/skpI/Image%202018-07-06%20at%207.08.56%20PM.png)
위에 나와있는 169.254.254.230 은 노트북의 주소로, 라즈베리파이의 ip는 다른 방법으로 알아내야 한다.

`dns-sd` 명령어의  `-G v4 <NAME>`  옵션을 사용하면 맨 마지막에 오는 것이 그 컴퓨터(<NAME>의 컴퓨터)가 사용하는 ip 주소이다. (dns-sd 프로그램을 끝낼 때에는 `ctrl+C`)
```
$ dns-sd -G v4 raspberrypi.local
```
![||600](https://cl.ly/skI6/Image%202018-07-06%20at%207.28.34%20PM.png)

이렇게 알아낸 주소로 ssh접속한다. ID: pi, PW: raspberry 가 디폴트이다.
```
$ ssh pi@위에서 알아낸 IP주소
```
![||600](https://cl.ly/sjtn/Image%202018-07-06%20at%207.35.16%20PM.png)

## VNC로 화면 공유
### 라이브러리 목록 업데이트 & 업그레이드

```
$ sudo apt-get update
```
```
$ sudo apt-get upgrade
```
업그레이드 완료되면 다운로드된 업데이트 파일을 지워 용량 확보
```
$ sudo apt-get clean
```

### VNC Server 설치
```
$ sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
```
설치가 끝나면 `raspi-config`를 실행해 vnc 옵션을 켜준다.
```
$ sudo raspi-config
```
5.Interfacing Option -> P3 VNC -> YES를 선택.
![||600](https://cl.ly/sm1u/Image%202018-07-08%20at%207.56.01%20AM.png)

재부팅한다.
```
$ sudo reboot
```
### 노트북에 vnc viewer 설치 및 화면 공유 실행
[[Raspberry Pi setup 라즈베리파이 설치하기]]문서의 '라즈베리파이 화면공유' 항목 참고
![||600](https://cl.ly/smGx/Image%202018-07-08%20at%208.01.00%20AM.png)

## 한글 설치
[[Raspberry Pi setup 라즈베리파이 설치하기]]문서의 '한글설치' 항목 참고
![||600](https://cl.ly/py45/Image%202018-03-06%20at%205.01.41%20AM.png)
잘된다^^

[[category:Raspberry pi]]
