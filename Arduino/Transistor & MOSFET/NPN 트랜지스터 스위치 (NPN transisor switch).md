{{WIKI}}
== 개요 ==
다리가 세개있는 BJT 트랜지스터는 교류전류에 쓰이면 증폭기, 직류전류에 쓰이면 스위치가 된다.
관련된 많은 내용은 일단 덮어두고, 일단 일반적으로 쓰일 수 있는 트랜지스터 스위치를 만든다.
여기에서는 2n2222a npn 트랜지스터를 사용해 직류모터를 돌려본다. pnp보다는 npn을 사용한 회로가 더 직관적으로 이해가 쉽고, 그중에서도 2n2222a 가 허용전류등의 면에서 범용적으로 쓰이기 알맞기 때문이다.
[[파일:Npn transistor switch.jpg|800px|npn transistor switch, running a dc motor]]

! 위 그림상 collector와 emitter의 위치가 바뀌었다.!!

== 2N2222A ==
[http://web.mit.edu/6.101/www/reference/2N2222A.pdf 2N2222A 데이타시트]
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/2N2222%2C_PN2222%2C_and_P2N2222_BJT_Pinout.jpg/800px-2N2222%2C_PN2222%2C_and_P2N2222_BJT_Pinout.jpg", width=800>
{|class="wikitable"
|-
!Manufacturer
!V<sub>ce</sub>
!I<sub>c</sub>
!P<sub>D</sub>
!f<sub>T</sub>
|-
!ST Microelectronics<ref>http://www.st.com/st-web-ui/static/active/en/resource/technical/document/datasheet/CD00003223.pdf Datasheet accessed 2013-10-26</ref><br>2N2222A
|40 V
|800 mA
|500&nbsp;mW/1.8 W
|300&nbsp;MHz
|}

== 회로 구성 ==
[[파일:Npn transistor switch-fritging.jpg||npn transistor switch, running a dc motor]]
[[파일:Npn transisor switch schem.png||회로도]]
* BJT 트랜지스터는 3개의 다리- Base, Collector, Emitter를 가지고 있다. B,C,E 각 가각 어느 다리인지는 모델마다 다르므로 자료를 찾아 확인하자.
* Base에 연결된 아두이노 신호로 Collector 와 Emittier사이에 전류를 끄거나 켤 수 있다.
* Base에 아두이노를, Collector에 작동시키고자 하는 부하를 (이 경우에 디씨모터), Emitter에 그라운드를 연결한다.
* Base와 Emitter (그라운드) 사이에 풀다운 저항을 넣어 아두이노 신호가 open 되었을 때 Base로 입력되는 신호가 Floating(정확한 값을 가지지 못하고 주변 환경-공기중 수증기 등-에 따라 마구 바뀌는 것) 되는 것을 방지한다. 일반적으로 10K옴이면 적당하다.
* Base와 아두이노 사이에 적당한 저항을 넣어 Base에 Bias 전압을 걸어준다. Bias가 너무 작으면(일반적으로 0.7V이하) 스위치가 안켜지고 너무 크면(6V이상) 트랜지스터가 과열된다. 일반적으로 1K 옴이면 적당하다. ( 정확한 계산 예 추가요함)
* 모터에 연결된 다이오드는 모터 운전시작/ 정지시 역전류가 회로를 망치는 것을 방지하기위함.

== 참고 ==
electronics-tutorials.ws 의 트랜지스터 강좌 <ref> http://www.electronics-tutorials.ws/transistor/tran_4.html</ref>

[[category:Transistor]]
