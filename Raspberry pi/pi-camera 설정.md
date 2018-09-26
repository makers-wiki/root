# picamera (Raspberry pi 카메라) 설치
참고: [라즈베리파이 공식 페이지의 카메라 연결. 파이썬 사용](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera)

## 하드웨어 준비
* Raspberry pi 보드 (나는 pi-zero w 사용했다.)
* pi-camera (나는 pimoroni.com에서 나온 pi-zero 용 카메라 사용.)
* 모니터 + hdmi 케이블 (optional. vnc화면 공유 사용 가능하나 omxplayer를 사용한 동영상 재생은 hdmi 사용해 직접 연결할 것.)
* 키보드 마우스 (optional. 나는  vnc 화면공유 사용.)

## 카메라 연결하고 활성화
### 카메라 포트에 카메라 연결
![||600](https://projects-static.raspberrypi.org/projects/getting-started-with-picamera/76595bc53548f43cb74fe647dfd7a322022c7fe0/en/images/connect-camera.jpg)

pi-zero camera
![||600](https://cdn.shopify.com/s/files/1/0174/1800/products/Camera_module_3_of_4_1024x1024.JPG?v=1488988334)

### 카메라 활성화
부팅 후  시작메뉴 > preference > raspberry pi configuration > Interface > camera 항목을 활성화 (Enabled)
데스크탑GUI가 아닌 CLI환경이라면
```
$ sudo raspi-config
```
명령을 실행해 카메라 활성화한다.

![||600](https://projects-static.raspberrypi.org/projects/getting-started-with-picamera/76595bc53548f43cb74fe647dfd7a322022c7fe0/en/images/raspi-config-menu.png)
![||600](https://cl.ly/sniO/Image%202018-07-09%20at%2011.00.40%20AM.png)

재부팅된다...

## 테스트샷
`raspistill` 은 스틸 이미지, `raspivid`는 동영상을 찍는 프로그램이다.
### 사진
```
$ raspistill -o testImage.jpg
```
`-o` 옵션은 저장파일명 설정.

![||600](https://cl.ly/so23/Image%202018-07-09%20at%2011.14.36%20AM.png)

### 동영상

```
$ raspivid -t 10000 -o testVid.h264
$ omxplayer testVid.h264
```
10초동안 녹화 & 재생(omxplayer)
