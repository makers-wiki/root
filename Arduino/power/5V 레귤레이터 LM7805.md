# 5V 레귤레이터

## 5V 레귤레이터 만들기
가장 일반적인 방법으로 7805 (LM7805) IC를 많이 사용한다. 7v ~35v 입력전원을 5v로 일정하게 만들어준다.
먼저 7805 IC의 핀배치 먼저 확인하자. (내가 가지고 있는건 MC7805CT)
![||600](https://cl.ly/sjSH/Image%202018-07-05%20at%208.04.05%20PM.png)
위 자료를 보면 앞에서 보았을 때 좌측부터 input, GND, output이다.
입력단과 출력단에 각각 0.33uF, 0.1uF 세라믹 capacitor 를 연결한다. 혹시 있을 수 있는 불안정한 전압성분을 제거하기 위한 필터다.
![||600](http://www.learningaboutelectronics.com/images/LM7805Circuit5.jpg)

#참고자료
5v 레귤레이터 만드는 다양한 방법: http://hook.tistory.com/entry/5V-%EB%A0%88%EA%B7%A4%EB%A0%88%EC%9D%B4%ED%84%B0-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%A9%EB%B2%95%EB%93%A4
