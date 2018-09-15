# MOSFET 를 사용한 switching 회로

arduino 등 디지털 신호로 회로를 켜고 끄는 스위칭회로를 구현하기 위해 일반적으로 가장 먼저 생각할 수 있는 방법은 
트랜지스터일것이다. 그러나 led strip이나 대형 모터와 같이 많은 전류를 사용하는 경우 일반적인 트랜지스터의 200~800mA의 
정격용량으로는 감당하지 못한다.
이 때 transistor 대신 사용 할 수 있는 것이 `IRLB8721` `IRFZ44N`등 MOSFET.
기본적인 용도는 트랜지스터와 동일하게 증폭 / switching 이며, 더 높은 전압, 더 많은 전류를 허용한다. 대신 동작속도는 접합형 TR보다 다소 느리다.
트랜지스터와는 달리 순수하게 (전류아닌) 전압으로 제어한다. 

`TP120`등 달링턴 트랜지스터는 일반 BJT 트랜지스터를 2개 연속 연결해 한 묶음으로 묶은 것인데 전압 손실과 열 발산에서 MOSFET이 더 유리하다고 한다.


## MOSFET
![||600](https://cl.ly/f6d6d9da3520/Image%202018-08-25%20at%2010.46.41%20PM.jpg)

Metal Oxide Semiconductor Field Effect Transistor 의 약자로 Fieㅣd Effect(전계효과)를 사용하기에 이런 이름이 붙었다. GATE 터미널에 전압(Gate-source Voltage, V<sub>GS</sub>)이 가해지면
Source와 Drain 터미널 사이에 전류가 흐르거나 끊기도록 할 수 있다. 

![](https://www.electronics-tutorials.ws/transistor/tran20a.gif)
^ 위 기호에서 보이는 Substrate 단자는 일반적으로 Source에 연결되어있어 생략된다.

* 모델마다 특정 V<sub>GS</sub> 에서 허용하는 전류가 다르므로 작은 신호전압(3.3V) 을 사용하거나 큰 전류를 사용하는 경우 데이터시트를 확인하자.
![](https://cdn.instructables.com/FFD/1CB8/JDYUZ55K/FFD1CB8JDYUZ55K.LARGE.jpg?auto=webp&width=600&crop=3:2_)

### N-channel 과 P-Channel.
* N-channel MOSFET (NMOS): 소스와 드레인 터미널이 N 물질로, 몸통은 P물질로 만들어져 전자의 이동에 의해 전류를 제어한다.
* P-channel MOSFET (PMOS): 소스와 드레인 터미널이 P 물질로, 몸통은 N물질로 만들어져 전공의 이동에 의해 전류를 제어한다.

### Depletion Mode, Enhancement Mode

 N-channel type 에서...
* Depletion Mode:  GATE terminal에 전압(V<sub>GS</sub>)이 0이상인 경우 전류가 흐르고 있다가, -전압을 인가했을 때 전류가 줄어들어 OFF되는 제품. 자주 사용되지는 않음.
* ** Enhancement Mode: GATE terminal에 전압(V<sub>GS</sub>)이 0이하인 경우 전류가 OFF이다가 +전압을 인가하면(좀 더 정확히는 threshold 이상의 전압,V<sub>TH</sub>sub>) 전류가 흐르는 제품. 스위치 용도로 좋기 때문에 널리 사용됨.** 

P-channel type 에서...
* Depletion Mode:  GATE terminal에 전압(V<sub>GS</sub>)이 0이하인 경우 전류가 흐르고 있다가, +전압을 인가했을 때 전류가 줄어들어 OFF되는 제품.
* Enhancement Mode: GATE terminal에 전압(V<sub>GS</sub>)이 0이상인 경우 전류가 OFF이다가 -전압을 인가하면 전류가 흐르는 제품.

<table class="table1">
<tbody>
<tr>
<td style="width:230px;">MOSFET type</td>
<td style="width:100px;">V<sub>GS</sub>&#160;&#061;&#160;+ve</td>
<td style="width:90px;">V<sub>GS</sub>&#160;&#061;&#160;0</td>
<td style="width:90px;">V<sub>GS</sub>&#160;&#061;&#160;-ve</td>
</tr>
<tr>
<td>N-Channel Depletion</td>
<td>ON</td>
<td>ON</td>
<td>OFF</td>
</tr>
<tr>
<td>N-Channel Enhancement</td>
<td>ON</td>
<td>OFF</td>
<td>OFF</td>
</tr>
<tr>
<td>P-Channel Depletion</td>
<td>OFF</td>
<td>ON</td>
<td>ON</td>
</tr>
<tr>
<td>P-Channel Enhancement</td>
<td>OFF</td>
<td>OFF</td>
<td>ON</td>
</tr>
</tbody>
</table>

## N-channel MOSFET 스위치 회로
가장 기본적인 회로
![](https://cl.ly/aae5302eb99e/Image%2525202018-08-26%252520at%25252012.25.06%252520AM.gif)

* npn 트랜지스터 스위치 회로와 비슷하다고 생각해도 좋다.
* 전자를 사용해 전류를 이동시키는 N-channel이므로 SOURCE terminal은 GND에 연결.
* 신호 전압 V<sub>in</sub>를 Gate 에 연결. 
* R<sub>gs</sub>는 pull-down 저항. arduino의 출력핀에 연결한다면 필요없다.
* R<sub>in</sub>으로 V<sub>GS</sub>를 max값 아래로 유지한다. 아두이노에 연결한다면 구지 필요 없다. 
* Drain쪽에 로드를 연결한다. 모터 등 인덕턴스가 있어 역전류가 우려되는 상황이라면 플라이휠 다이오드를 달아준다.

![||600](https://cl.ly/5d579901e500/Image%202018-08-26%20at%201.19.20%20AM.jpg)

## 참고
영문 자료: https://www.electronics-tutorials.ws/transistor/tran_6.html 