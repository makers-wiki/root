#!/usr/bin/env python3

"""

Written by August Sanghyun Park.
 Alan Yorinks 의 s2pi project의 fork.

서보기능 추가
adafruit motor hat 기능 추가
MCP3008 AD converter 사용해 아날로그 입력 받기. 서버 열리는 순간부터 업데이트 시작함.

"""
import json
import sys
import time
import os
import pigpio
import psutil
from subprocess import call
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

# adafruit motor hat
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor
import atexit

# MCP3008 a-d converter 라이브러리
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import threading    # 주기적으로 updateAnalogValue 하기위해...

# This class inherits from WebSocket.
# It receives messages from the Scratch and reports back for any digital input
# changes.
class S2Pi(WebSocket):

    def handleMessage(self):
        # get command from Scratch2
        payload = json.loads(self.data)
        print(payload)
        client_cmd = payload['command']
        # When the user wishes to set a pin as a digital Input
        if client_cmd == 'input':
            pin = int(payload['pin'])
            self.pi.set_glitch_filter(pin, 20000)
            self.pi.set_mode(pin, pigpio.INPUT)
            self.pi.callback(pin, pigpio.EITHER_EDGE, self.input_callback)
        # when a user wishes to set the state of a digital output pin
        elif client_cmd == 'digital_write':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            state = payload['state']
            if state == '0':
                self.pi.write(pin, 0)
            else:
                self.pi.write(pin, 1)
        # when a user wishes to set a pwm level for a digital input pin
        elif client_cmd == 'analog_write':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            value = int(payload['value'])
            self.pi.set_PWM_dutycycle(pin, value)
        # when a user wishes to output a tone
        elif client_cmd == 'tone':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)

            frequency = int(payload['frequency'])
            frequency = int((1000 / frequency) * 1000)
            tone = [pigpio.pulse(1 << pin, 0, frequency),
                    pigpio.pulse(0, 1 << pin, frequency)]

            self.pi.wave_add_generic(tone)
            wid = self.pi.wave_create()

            if wid >= 0:
                self.pi.wave_send_repeat(wid)
                time.sleep(1)
                self.pi.wave_tx_stop()
                self.pi.wave_delete(wid)
     
        # when a user wishes to 서보를 움직이고자 할 때
        elif client_cmd == 'servo':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            degree = int(payload['degree'])
            pulseWidth = 500 + 2000 / 180 * degree # (0도~180도 => 500~2500)

            self.pi.set_servo_pulsewidth(pin, pulseWidth)

        # DC 모터 제어 명령
        elif client_cmd == 'run_DC':
            motorNum = int(payload['motorNum'])
            speed = payload['speed']
            
            dc = self.mh.getMotor(motorNum)
             
            # 스피드 >0이면 정방향, < 0 이면 역방향 회전. 0은 정지.
            if (speed > 0):
                dc.setSpeed(speed)
                dc.run(Adafruit_MotorHAT.FORWARD)
            elif (speed < 0):
                dc.setSpeed(abs(speed))
                dc.run(Adafruit_MotorHAT.BACKWARD)
            else:
                dc.run(Adafruit_MotorHAT.RELEASE)

        # Stepper 제어명령
        elif client_cmd == 'set_stepper':
            portNum = int(payload['portNum'])
            steps_per_turn = int(payload['steps_per_turn'])
            styleList =  ['SINGLE', 'DOUBLE', 'INTERLEAVE', 'MICROSTEP']
            stepStyleList = [Adafruit_MotorHAT.SINGLE, Adafruit_MotorHAT.DOUBLE, Adafruit_MotorHAT.INTERLEAVE, Adafruit_MotorHAT.MICROSTEP]
            stepstyle = stepStyleList[styleList.index(payload['stepstyle'])]
            rpm = int(payload['rpm'])

            self.steps_per_turn[portNum-1] = steps_per_turn
            # self.stepper[portNum-1] = self.mh.getStepper(steps_per_turn, portNum)
            self.stepstyle[portNum-1] = stepstyle
            self.rpm[portNum-1] = rpm

        elif client_cmd == 'run_stepper':
            portNum = int(payload['portNum'])
            direction = Adafruit_MotorHAT.BACKWARD if (payload['direction'] == 'BACKWARD' ) else Adafruit_MotorHAT.FORWARD
            print("direction: %s" %direction)
            steps = int(payload['steps'])

            stepper = self.mh.getStepper(self.steps_per_turn[portNum -1],portNum)
            stepper.setSpeed(self.rpm[portNum -1])
            stepper.step(steps, direction, self.stepstyle[portNum - 1])

        elif client_cmd == 'ready':
            pass
        else:
            print("Unknown command received", client_cmd)

    # call back from pigpio when a digital input value changed
    # send info back up to scratch
    def input_callback(self, pin, level, tick):
        payload = {'report': 'digital_input_change', 'pin': str(pin), 'level': str(level)}
        print('callback', payload)
        msg = json.dumps(payload)
        self.sendMessage(msg)

    def handleConnected(self):
        self.pi = pigpio.pi()
        print(self.address, 'connected')
        
        # motor hat
        self.mh = Adafruit_MotorHAT(addr=0x60)
        print("motorHAT connected")
        # 2개의 stepper 모터의 설정정보를 멤버변수로 기억해둠
        self.steps_per_turn = [None, None]
        self.stepper =[ None, None]
        self.stepstyle = [None, None]
        self.rpm = [None, None]

        # MCP3008 ADconverter
        SPI_PORT   = 0
        SPI_DEVICE = 0
        self.mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))
        self.updateAnalogValue()

    # 아날로그 입력값 업데이트 해주기 -주기적으로 실행    
    def updateAnalogValue(self):
        for ch in range(8):
            #print("channel: %d, level: %d" %(ch,self.mcp.read_adc(ch)))
            payload = {'report' : 'analog_input_change', 'channel': str(ch), 'level': str(self.mcp.read_adc(ch))}
            msg = json.dumps(payload)
            self.sendMessage(msg)
        threading.Timer(0.5, self.updateAnalogValue).start()

    def handleClose(self):
        print(self.address, 'closed')
        # 프로그램 끝낼 때는 모터 멈추도록
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)        

def run_server():
    # checking running processes.
    # if the backplane is already running, just note that and move on.
    found_pigpio = False

    for pid in psutil.pids():
        p = psutil.Process(pid)
        if p.name() == "pigpiod":
            found_pigpio = True
            print("pigpiod is running")
        else:
            continue

    if not found_pigpio:
        call(['sudo', 'pigpiod'])
        print('pigpiod has been started')

    os.system('scratch2&')
    server = SimpleWebSocketServer('', 9000, S2Pi)
    server.serveforever()

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:

        sys.exit(0)


