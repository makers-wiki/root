# 라즈베리파이 시리얼 통신  설정 (setting up Raspberry pi serial connection via GPIO)

참고: https://spellfoundry.com/2016/05/29/configuring-gpio-serial-port-raspbian-jessie-including-pi-3/
## 시리얼 포트 확인
가장 먼저, 라스베리파이에서 시리얼 포트가 어디에 있는지 알아야한다. GPIO상 14,15번 핀이 시리얼통신용 (각각 TX, RX)인데,  라스비안에서 `/dev/serial0`으로 불린다. (ls 명령어로 찾아보자)

* 원래 시리얼통신 포트 이름은 `/dev/ttyAMA0`이다. 그런데 파이3에서는, 이전까지 `/dev/ttyAMA0`에 할당되어있던 시리얼포트가 블루투스에 할당되었다. 시리얼포트는 `/dev/ttyS0`로 옮겨졌다.
* 위와같은 이유로 rpi3와 그 이전 기계에서 함께쓰는 코드를 쓰려면 `/dev/ttyAMA0`라는 이름을 쓰면 안된다. 대신 `/dev/serial0`라는 이름-일종의 바로가기(aliase)-를 사용하면 된다.
즉 rpi1,2에서는 `시리얼 == /dev/ttyAMA0 == /dev/serial0`
그리고 rpi3에서는 `시리얼 == /dev/ttyS0 == /dev/serial0`
터미널에서 확인해보자.
```
 $ ls -l /dev
```
![](https://cl.ly/3U0d47274025/Image%202017-10-27%20at%2011.01.08%20%EC%98%A4%EC%A0%84.png)

* rpi3에서 `/dev/ttyS0`포트는  UART(병렬<>직렬 컨버터 하드웨어)가 아닌, UART를 모사한 소프트웨어시리얼이다. 때문에 CPU상태에 따라 시리얼통신이 안정적이지 않은 경우가 있을 수 있다. 만약 블루투스를 소프트시리얼로 돌리고(혹은 사용하지 않고) 시리얼통신을 하드웨어 UART를 사용해 안정적으로 하고자한다면 GPIO 시리얼을 `/dev/ttyAMA0`에 할당할 수도 있다. 구체적인 방법은 위 자료 참고.  

# UART 활성화
rpi에서 기본값으로 uart가 비활성되어있다. 일단 이걸 켜주자
터미널에서
```
$sudo nano /boot/config.txt
```
로 파일을 열어 가장 아래쪽에 보면
`enable_uart=0`으로 되어있다. 이걸 `1`로 바꾸어준다.
![](https://cl.ly/0r1n1n0l1O1G/download/Image%202017-10-27%20at%2012.06.24%20%EC%98%A4%ED%9B%84.png)
[Ctrl]+[O]를 눌러 저장한 후 재부팅...

# 시리얼 콘솔연결(getty service) 비활성화
1. 예전에 LAN이 없던 시절에 다른 컴퓨터에 접속해 콘솔창을 띄우는 용도로 시리얼 포트를 사용하고는 했었는데, rpi에서 시리얼 포트를 바로 그런 용도로 사용하는 것을 기본으로 설정해 두었다. (getty 서비스라고 한다.) 시리얼 포트를 다른 하드웨어와 연결해 우리 마음대로 다루고 싶다면 콘솔 연결을 비활성시켜야한다.
![](https://cl.ly/272s331I3o1c/download/[f885f30a8379f4df9a197b839fb7a5c8]_Image%202017-10-27%20at%2011.57.24%20%EC%98%A4%EC%A0%84.png)
혹은 터미널에서
```
$ sudo systemctl stop serial-getty@ttyAMA0.service
$ sudo systemctl disable serial-getty@ttyAMA0.service
```
물론 rpi3를 사용중이라면 `ttyAMA0`대신 `ttyS0`를 사용해야한다.
2. 재부팅...

#putty 프로그램 설치, 테스트
2. putty를 설치해 시리얼통신을 테스트해본다.
* 터미널에서 `sudo apt-get install putty`를 입력해 putty 설치.
![](https://cl.ly/2V1o1A011w2e/download/[520c2c126a40c227d1242196f3133325]_Image%202017-10-27%20at%2012.31.13%20%EC%98%A4%ED%9B%84.png)
시리얼 연결을 선택한 후, 시리얼 포트이름, 연결 속도를 정해준다.

* 시리얼을 통해 연결될 상대측에는 무엇이 와도 좋다. 아두이노의 시리얼 모니터가 와도 좋을 것이지만,  간편하게 안드로이드의 시리얼 모니터에 연결 해 보았다.
![Alt text](./1509078200832.png)

* 잘 된다 ^^

## pySerial 라이브러리 설치
파이썬에서 시리얼 통신 사용하기 위해서 pySerial 라이브러리 필요함.
참고: https://pyserial.readthedocs.io/en/latest/index.html
1. 터미널에서 `$python -m pip install pyserial`을 입력해 라이브러리 설치. ( -m은 모듈실행명령. pip는 파이썬 라이브러리 관리 모듈인 pipy를 의미.)
2. pySerial  샘플 코드를 실행해보자. (한 라인씩 넣어도 좋다)
```python
import serial
ser = serial.Serial ("/dev/serial0")    #Open named port
ser.baudrate = 57600                     #Set baud rate to 57600
data = ser.read(10)                     #Read ten characters from serial port to data
ser.write(data)                         #Send back the received data
ser.close()     
```

[[category:raspberry pi]]
[[category:bluetooth]]
