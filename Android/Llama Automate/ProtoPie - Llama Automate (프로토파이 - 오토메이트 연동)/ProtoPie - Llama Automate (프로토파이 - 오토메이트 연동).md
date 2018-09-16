{{WIKI}}
= ProtoPie &lt;-&gt; Llama Automate (프로토파이 - 오토메이트 연동) =

프로토파이에서 보내온 자료:

 [[File: ProtoPie_Android_Broadcast_Channel_Guide-KR.pdf |Alt text]]

 [[File: Protopie-arduino_sample.zip |Alt text]]

== ProtoPie 측 ==

프로토파이에서 네모 버튼을 누르면(버튼 눌리는 효과) &quot;messageFromProtoPie&quot; 메시지를 보내고, messageToProtoPie 메시지를 받으면 동그라미가 빨갛게 변했다가 되돌아오도록 만든다.

<img src="https://cl.ly/pb4o/Image%202018-02-17%20at%203.07.41%20AM.png" width=600>

* 사각형 버튼에 Add Response &gt; Send response를 만들고, Channel은 AndroidVroadcast, message ID는 아무거나 (여기서는 messageFromProtoPie)

* Add Trigger &gt; Receive trigger를 만들고, Channel은 AndroidBroadcast, message ID는 아무거나 (여기서는 messageToProtoPie)

[[File: ProtoPie-automate_androidbroadcast_test.pie.zip |Alt text]]

== Llama Automate 측 ==

프로토파이에서 &quot;messageFromProtoPie&quot; 메시지를 받으면 다이얼로그를 띄워 확인하고, 답장 보내기를 하면 'messageToProtoPie' 메시지를 내보낸다.

<img src ="https://cl.ly/pam8/automate-protopie.jpg" width=800>

 [[File: ProtoPie_연동테스트.flo.zip |automate script file]]

[[category:ProtoPie]]
[[category:Llama Automate]]
