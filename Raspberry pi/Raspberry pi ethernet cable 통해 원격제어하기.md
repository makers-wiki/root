# Raspberry pi ethernet cable 통해 원격제어하기

wifi와 VNC를 사용해 모니터와 키보드 마우스 없이 노트북에서 라즈베리를 제어할 수 있었는데,
사무실에서 집으로 옯겨 wifi연결이 되지 않는다던지, 여러명의 사용자가 무선라우터를 공유해서 연결상태가 
고르지 못하다던지 (워크샵 상황 등...) 할 때에는 이더넷 포트를 사용하도록 하자. 인터넷 연결 없어도 VNC 연결 잘 된다.

라즈베리파이를 최초 설치하고 VNC를 설정하는 등은 이 문서 참고:  https://github.com/makers-wiki/root/blob/master/Raspberry%20pi/Raspberry%20pi%20setup%20(%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4%20%EB%9D%BC%EC%A6%88%EB%B9%84%EC%95%88%20%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0).md#raspberry-pi-setup-raspbian-version9-stretch%EA%B8%B0%EC%A4%80

키보드,모니터, hdmi 케이블 등이 없는 상태에서 headless로 설치진행 하는 방법은 이 문서: https://github.com/makers-wiki/root/blob/master/Raspberry%20pi/Raspberry%20pi%EC%9D%98%20Headless%20%EC%84%A4%EC%A0%95.md#raspberry-pi%EC%9D%98-headless-%EC%84%A4%EC%A0%95

## 준비물
* ethernet cable,
* 노트북에 랜포트가 없다면 USB-ethernet port를 준비하자.
https://search.shopping.naver.com/search/all.nhn?query=usb+%EC%9D%B4%EB%8D%94%EB%84%B7&cat_id=&frm=NVSHATC

![||600](https://www.lenovo.com/medias/?context=bWFzdGVyfHJvb3R8ODUzNDN8aW1hZ2UvanBlZ3xoODcvaDE4Lzk0NDgxNTkyMTU2NDYuanBnfGE0NTQ3MzI0NmE5MjY4ZDJmMjNmMjY2NDg3MWRlNWJhNjVmOTVkYzQyNzZjYjNhNDFkNDMzZTgxZDViMDY2Nzg)

## 랜케이블 연결
한쪽끝은 RPi의 이더넷 소켓에, 다른 쪽 끝은 노트북의 이더넷 소켓에...
![||600](https://cl.ly/27e7741f6bee/Image%202018-09-26%20at%205.32.02%20PM.png)

## 노트북에서 VNC를 통해 연결
연결 주소창에 라즈베리파이의 주소 'raspberrypi.local'입력.
<br>연결에 시간이 오래 걸리면 취소했다가 다시 시도해 본다.
![||600](https://cl.ly/aa1bf541505b/Image%202018-09-26%20at%205.38.56%20PM.png)

## 'raspberrypi.local'을 바로 입력했는데 연결이 안된다면...
대부분의 경우 간단히 `raspberrypi.local`을 주소로 사용하면 되지만, 이 호스트명이 작동하지 안는 경우 `dns-sd`프로그램으로 IP주소를 찾아주어야 함.

mac이나 linux의 경우 터미널에서
```bash
$ dns-sd -G v4 raspberrypi.local
```
![||600](https://cl.ly/6107a4138c32/Image%202018-09-26%20at%205.57.39%20PM.png)

윈도우노트북의 경우 'Bonjour SDK for windows'를 통해 dns-sd 명령을 사용할 수 있다는데...(테스트 후 보충) https://marknelson.us/posts/2011/10/25/dns-service-discovery-on-windows.html
