# 라즈베리파이에서 파이썬으로 GPIO 사용하기

raspberry pi 에서  Python으로 GPIO 제어하기 위해서 사용하는 모듈은 **RPi.GPIO** . 참고로 C를 사용한다면 **WiringPi** 라이브러리를 사용해 Arduino와 비슷하게 사용할 수도 있다.  여기서는 RPi.GPIO모듈을 사용해 Python으로 GPIO제어토록 해보자.

## 기본 사용법
* 먼저 모듈을 임포트한다. (필수)

``` python
import RPi.GPIO as GPIO
```

* 핀 넘버를 부르는 방식을 선택한다.(필수)
``` python
GPIO.setmode(GPIO.BOARD)
#or
GPIO.setmode(GPIO.BCM)
```
GPIO.BOARD 는 라즈베리파이에 배열된 순서대로 핀 이름을 부르겠다는 의미이고, GPIO.BCM은 (Broadcom chip-specific pin numbers) 로  Broadcom SOC 칩에서 사용하는 핀이름을 사용하겠다는 의미.
즉, GPIO.BOARD 모드에서 8번핀은 GPIO.BCM  모드에서 14번 핀과 동일하다.
![Raspberry Pi GPIO 배치](https://cdn.sparkfun.com/r/600-600/assets/learn_tutorials/4/2/4/header_pinout.jpg)

* 핀 모드를 설정한다. 아두이노에서 `pinMode()` 와 같은 역할.(필수)
``` python
GPIO.setup(18, GPIO.OUT)
#or
GPIO.setup(18, GPIO.IN)
```
list를 사용해 한번에 여러 핀을 설정 할 수도 있고, output 모드로 설정하는 경우 초기값을 줄 수도 있다.
``` python
GPIO.setup([18, 19, 20], GPIO.OUT, initial=GPIO.HIGH)
```
input 모드로 설정하는 경우, 필요에 따라 내장 pull-up, pull-down 저항을 사용할 수도 있다.
``` python
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
#or
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
```
* digital output
``` python
import time

GPIO.output(18, GPIO.HIGH)
time.sleep(0.1)	# 100 millisecond 딜레이
GPIO.output(18,GPIO.LOW)
```
`GPIO.HIGH` 대신 `True `나 `1`을 써도 좋다. `GPIO.LOW` 대신에는 `False`나 `0`

* analog output (pwm)
RPi는 기본적으로 2개의 hardware PWM 채널을 가지고 있는데, 아쉽게도 RPi.GPIO에서는 사용할 방법이 없다. (C로 wiringPi를 사용하는경우 1개 채널(GPIO18) 사용가능.) 대신 software PWM을 어느 핀에서든 사용할 수 있다. 동시에 여러개도 가능하다.(참고:https://www.raspberrypi.org/forums/viewtopic.php?f=44&t=31714)
``` python
#swPWM 초기화
myPwm = GPIO.PWM(18, 1000) # pin, frequency
myPwm.start(50) #dutycycle (0~100사이 값). 아두이노로 치면 analogWrite(18, 128)과 동일.

# 출력값 변경
myPwm.ChangeDutyCycle(75)

#swPWM 정지
myPwm.stop()
```
* digital input
``` python
pin_read = GPIO.input(18)	#True / False
```
* analog input
안타깝게도 라즈베리파이는 analog input이 불가능하다. ADC(analog-digital converter)회로가 필요하다. **MCP3008**을 사용하도록 하자. (참고: https://learn.adafruit.com/reading-a-analog-in-and-controlling-audio-volume-with-the-raspberry-pi/overview) 혹은 간이로 만들수도 있다(참고: https://www.allaboutcircuits.com/projects/building-raspberry-pi-controllers-part-5-reading-analog-data-with-an-rpi/)

* 프로그램을 종료하기전, 리소스를 반납한다. (필수)
``` python
GPIO.cleanup()
```

## 참고
RPi.GPIO wiki: https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/
https://learn.sparkfun.com/tutorials/raspberry-gpio
http://studymake.tistory.com/498

[[category:raspberry pi]]
