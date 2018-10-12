#!/usr/bin/env bash
sudo

# 파이썬과 웹소켓 통한 통신을 위해 라이브러리 설치
pip3 install git+https://github.com/dpallot/simple-websocket-server.git
pip3 install git+https://github.com/giampaolo/psutil.git

# Adafruit Motor HAT 라이브러리
apt-get update
apt-get install python-smbus i2c-tools
pip3 install git+https://github.com/adafruit/Adafruit-Motor-HAT-Python-Library.git

# 아날로그 입력을 위한 mcp3008 ADC library
pip3 install adafruit-mcp3008

#스크래치2 에 extension등록
mv ./s2_pii.js /usr/lib/scratch2/scratch_extensions
mv ./extensions.json /usr/lib/scratch2/scratch_extensions
mv ./s2_pii.png /usr/lib/scratch2/medialibrarythumbnails