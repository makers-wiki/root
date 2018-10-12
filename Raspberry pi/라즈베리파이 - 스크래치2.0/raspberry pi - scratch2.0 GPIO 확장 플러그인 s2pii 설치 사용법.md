# raspberry pi - scratch2.0 GPIO 확장 플러그인 s2pii 설치 사용법
's2pii'는 MrYslab의 s2_pi 프로젝트를 기반으로 하여,
라즈베리파이의 GPIO를 scratch2.0으로 제어할 수 있도록 해준다.

* PWM 아날로그 출력
* mcp3008을 사용한 아날로그 입력
* adafruit motor HAT을 통한 dc 모터, 스테퍼 모터 제어,
* 서보모터 제어
를 위한 커스텀 블럭을 제공한다.

## 확장기능 설치
***설치에 앞서, 라즈베리파이가 인터넷에 연결되어있는지 확인한다.***

1. s2pii.zip 파일 받기
깃허브 저장소:<br> https://github.com/makers-wiki/root/tree/master/Raspberry%20pi/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4%20-%20%EC%8A%A4%ED%81%AC%EB%9E%98%EC%B9%982.0

2. 라즈베레 파이의 홈 디렉토리 '/home/pi'에 압축을 푼다.
 ![||600](https://cl.ly/5d18887acd00/Image%202018-10-12%20at%205.06.06%20PM.png)

3. 설치스크립트 s2pii_setup.sh 실행가능토록 선언한다.
```bash
~$ chmod +x s2pii_setup.sh
```
`ls -l` 명령으로 `x`(eXecutable) 특성이 추가되었음을 볼 수 있다.(파일명은 녹색으로 나타남)
![||600](https://cl.ly/f9ddac567c6b/Image%202018-10-12%20at%205.10.53%20PM.png)

4. 수퍼유저 권한으로 s2pii_setup.sh 를 실행한다.
```bash
~$ sudo ./s2pii_setup.sh
```
여러가지 필요한 모듈이 설치되고 파일 위치가 이동된다.

## raspberry pi - scratch2.0 GPIO 확장 플러그인 s2pii 실행법
1. 홈 디렉토리 (/home/pi)에서 s2pii.py 를 실행한다.
```bash
~$ python3 s2pii.py
```
scratch2.0이 자동으로 실행된다.
터미널창은 스크래치 사용이 끝날 때까지 닫지 않도록 한다. (파이썬 코드가 실행중이다.)

2. [추가블록] 그룹의 [확장프로그램 추가] 버튼을 누른 후,
![||600](https://cl.ly/5192b07253ac/Image%202018-10-12%20at%205.36.09%20PM.png)

  [s2pii - Custom Pi GPIO] 를 선택하고 [확인]한다.
![||600](https://cl.ly/698cc8a4cc92/Image%202018-10-12%20at%205.38.18%20PM.png)

3. `Connect to s2_pii server` 블럭을 눌러 연결표시등이 녹색으로 바뀌는 것을 확인한다.
![||600](https://cl.ly/44a66ed2f801/Image%202018-10-12%20at%205.42.02%20PM.png)

4. 추가된 블럭을 활용해 코드를 작성한다. 끝낼 때에는 터미널창에서 `Ctrl + c` 키를 눌러 종료한다.
