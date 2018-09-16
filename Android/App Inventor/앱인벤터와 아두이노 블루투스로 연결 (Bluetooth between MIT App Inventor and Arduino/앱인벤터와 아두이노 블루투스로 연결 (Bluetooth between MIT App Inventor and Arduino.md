{{WIKI}}
== 개요 ==
아두이노로 만든 회로와 안드로이드 스마트폰이 무선으로 통신하는데에 여러 방법을 사용할 수 있겠지만, 가장 쉽고도 범용적으로 쓰일 수 있는 방법중 하나는 블루투스이다.
아두이노회로와 앱인벤터 (혹은 Thunkable)로 만든 안드로이드 앱이 블루투스(2.0)로 통신할 수 있도록 해본다.

<youtube>EKvsLEEWR0c</youtube>
== 아두이노 회로 ==
hc-05 (hc-06)블루투스 모듈을 사용하였다.

<img src="https://cl.ly/1s0O3O2a1v2q/Image%202017-05-25%20at%206.14.36%20AM.png" width=800>
* 아두이노의 RX는 블루투스 모듈의 TX에,
* 아두이노의 TX는 블루투스 모듈의 RX에 연결.

테스트를 위해  아두이노에서 블루투스를 통해 정수, 유리수, 문자열을 주기적으로 전송하고, 스마트폰으로부터 데이터를 받으면 13번핀에 연결된 led에 불을 켜도록 만들어본다.

''''' 블루투스 모듈과 아두이노 보드간 시리얼 통신을 위해 0번과 1번 핀을 사용하고 있다. 이 두 핀은 아두이노 보드의 usb에도 연결되어있으므로 스케치를 업로드할 때는 반드시 블루투스와 아두이노간의 0번,1번 핀 연결을 끊도록 한다. ( 이걸 깜빡 잊으면 컴퓨터를 재부팅하는 등 번거롭게 된다...)'''''

<syntaxhighlight lan="arduino">

// 정수와 유리수 문자열을 전송해본다
int numberA = 12345;
float numberB = 0.02;
String text = "동해물과 백두산이 마르고 닳도록";

void setup() {
  pinMode(13,OUTPUT); // LED를 켜서 데이터를 받았음을 표시함

  Serial.begin(38400); // 블루투스모듈에 설정된 속도
  Serial.println("Connected!");
  delay(5000);
}

void loop() {

  if(Serial.available()){
    int receivedData = Serial.read(); // 받은 데이터는 버퍼에서 비워주어야하므로..
    digitalWrite(13,HIGH); // 받은 데이터가 있다면 LED를 켜고
  } else {
    digitalWrite(13,LOW); // 없다면 끄고
  }

  Serial.print(numberA); //정수
  delay(2000);
  Serial.print(numberB); //유리수
  delay(2000);
  Serial.print(text); // 애국가
  delay(2000);

}
</syntaxhighlight>
[[파일:Arduino+appInventor bluetoothTest.ino|섬네일|블루투스 테스트용 아두이노 스케치]]

== 앱인벤터 코딩 ==
[[파일:AppInventor Bluetooth Client.aia.zip|섬네일|앱인벤터( or  thunkable) 용 예제파일]]

블루투스 디바이스와 통신하기 위해서는 5단계가 필요하다.
# 스마트폰과 블루투스 디바이스 페어링(pairing)
# 스마트폰에 블루투스기능이 있고, 지금 켜져있는지 확인
#  페어링된 디바이스중 선택하여 연결
# 데이터 보내고 받기
# 연결 끊기

=== 1. 스마트폰과 블루투스 디바이스 페어링(pairing) ===
블루투스를 통해 연결할 디바이스는 미리 페이링(Pairing) 되어있어야 한다. 페이링이란 최초 연결함으로써 서로를 기억해두는 것을 말한다. 안드로이드의 '''설정 > 블루투스''' 에서 새로운 기기를 페어링 하거나 페어링을 해지할 수 있다.

=== 2. 스마트폰에 블루투스 기능이 있고, 지금 켜져있는지 확인 ===
앱이 켜지는 순간 블루투스 기능이 켜져있는지 확인하도록 한다.
블루투스 서버모드와 클라이언트 모드가 있는데, 서버모드는 계속 켜져있으면서 클라이언트 디바이스가 연결해오기를 기다리는 방법이며, 클라이언트모드는 특정 디바이스(서버)를 선택해 연결하는 방법이다.  여기에서는 클라이언트모드를 사용해 디바이스를 직접 선택해 연결한다.
'''액티비티_스타터'''는 블루투스가 꺼져있을 때 알림 메시지를 나타나게 하는데에 필요하다.

<img src="https://cl.ly/3B330a0B1R2Z/Image%202017-05-24%20at%207.38.10%20PM.png" width=800>

<img src ="https://cl.ly/1q0q2R2Q022V/Image%202017-05-24%20at%207.39.07%20PM.png">
* ''' when Screen1.Initialize'''는 스크린1이 열릴 때, 즉 앱이 맨 처음 시작할 때 자동으로 실행된다.
* ''' Bluetooth_client1.Avaliable'''과 '''Enabled'''는 각각 디바이스에 블루투스 기능이 있는지, 지금 사용 설정이 되어있는지를 알려준다.
* "android.bluetooth.adapter.action.REQUEST_ENABLE" 액션은 블루투스기능 활성화를 요청한다.

=== 3. 페어링된 디바이스중 선택하여 연결 ===
<img src = "https://cl.ly/2a2P3s0Q2V0d/Image%202017-05-24%20at%207.53.36%20PM.png" width=800>
https://cl.ly/2h262l1A2H1A/Image%202017-05-24%20at%207.54.16%20PM.png
* '''when List_Picker1.Before Picking'''은 리스트피커가 열림과 동시에 실행된다.
** '''set List_Picker1.Elements to'''는 뒤따라는 list로 선택 가능한 목록(list picker) 를 만든다.
** '''Bluetooth_Client1.Addresses And Names'''는 스마트폰과 페어링된 블루투스 기기의 list를 리턴한다.
* '''when List_Picker1.After Picking'''은 사용자가 리스트에서 어떤 아이템을 클릭해 선택하는 순간 실행된다.
** '''call Bluetooth_Client1.Connect address'''는 뒤따르는 블루투스기기에 접속한다.
** ''' List_Picker1.Selection'''은 리스트피커에서 사용자에의해 선택된 아이템을 리턴한다.

=== 4-1. 데이터 보내기 ===
<img src="https://cl.ly/1s2W2C0b1N0f/Image%202017-05-25%20at%203.26.19%20AM.public.png" width=800>
https://cl.ly/0x0U322k0830/Image%202017-05-25%20at%203.27.09%20AM.png

텍스트 상자에 메세지를 입력한 후 send! 버튼을 누르면 ''' call Bluetooth_client1.Send Text text'''블럭에 의해 메시지 전송됨.

===4-2 데이터 받기 ===
'''clock'''콤포넌트를 사용해 1초마다 한번씩 수신된 데이터를 확인해 '''Label'''에 표시하도록 한다.
<img src="https://cl.ly/0k1p312f0P1z/Image%202017-05-25%20at%203.42.45%20AM.public.png" width=800>
https://cl.ly/2p223k3j1V3d/Image%202017-05-25%20at%203.48.00%20AM.png
* '''when Clock1.Timer'''는 설정한 주기 (1000ms)마다 자동 실행됨.
* 블루투스가 연결상태일때('''Bluetooth_client1 Is Connected'''), 그리고 수신한 데이터가 있을 때 ('''call Bluetooth_client1. Bytes Available To Receive > 0 '''),
* '''call Bluetooth_client1.Receive Text number of Bytes'''를 통해 N byte의 텍스트 수신해 '''label2'''에 표시함.

=== 5. 연결 끊기 ===
<img src="https://cl.ly/2m2D431c2E1t/Image%202017-05-25%20at%203.57.13%20AM.png" width=800>
* 연결종료 버튼을 누르면 '''call bluetooth_client1.Disconnect''' 블록으로 연결을 해제함.

== 참고 ==
[http://pevest.com/appinventor2/?p=520 Basic Bluetooth communications using App Inventor BY EDWARD M]

[http://ai2.appinventor.mit.edu/reference/components/connectivity.html Connectivity Components - App Inventor for Android 레퍼런스  도큐먼트]

[[category:App Inventor]]
[[category:Bluetooth]]
