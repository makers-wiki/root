# Adafruit IO

adafruit io를 사용하여 인터넷에 연결된 여러 센서들의 값을 저장, 보관, 추적하고 요청에 따라 어떤 장소에서도 확인 할
수 있다. 센서자체가 서버가 되기에는 용량이라든가 제약이 많으므로 adafruit io가 값을 저장하고 요청을 처리하는
브로커가 되는 것이다.

adafruit는 단순히 전자부품 유통업체에 머무는 것이 아니라 maker 문화의 hub가 되기 위해 새로운 부품 개발이라든지,
학습자료, 영상컨텐츠만들기 등등 전방위 활동하고 있다. io.adafruit는 adafruit에서 제공하는 maker용
서버다. 경쟁서비스로 삼성 artik cloud, thingspeak 등이 있는데, adafruit io가 젤
**쉽다**(주관적)

adafruit io 소개 페이지: (https://learn.adafruit.com/adafruit-io/overview)

## 특징

  - REST & MQTT api 지원.
  - IFTTT 연동
  - feed 마다 접근 설정(private/ public) 가능
  - 언제어디서나 web으로 현재상황 살필수 있는 dashboard 제공
  - 공짜

( 30 data points per minute 30 days of data storage 10 feeds 5
dashboards Community support Projects and guides)

  - 유료 plan도 있다.

## 주요개념

### feed

하나의 센서에서 연속적으로 들어오는 데이터는 하나의 **feed**를 구성한다. feed 에는 타임스탬프 등의 각종
metadata, public인지 private인지 등등 각종 정보가 포함된다. 핵심만 말해 **하나의 센서마다 하나의
feed를 만들어주어야한다.**
![](https://cl.ly/pKMj/Image%202018-02-06%20at%205.04.23%20PM.png)

### dashboard

피드의 현 상태& 지속적인 변화를 시각적으로 볼 수 있는 계기판 모음. (무료버전에서) 피드는 10개까지, 대쉬보드는 5개까지
만들 수 있다. 하나의 대쉬보드에는 여러 피드 데이터를 예쁘게 배치해 넣을 수 있다.
![](https://cl.ly/pJhk/Image%202018-02-06%20at%204.23.42%20PM.png)

### group

여러개의 피드를 하나의 그룹으로 모아서 관리 할 수 있다. 예를들어 침실 공기측정 프로젝트에 co2센서, 습도센서, 먼지센서를
사용하고 있고, 방범 시스템 프로젝트에 적외선 센서, 마그네틱 센서를 사용하고 있다고 한다면, 침실 프로젝트 그룹으로
3개의 피드; co2센서, 습도센서, 먼지센서를 묶고 방범 프로젝트 그룹으로 2개의 피드; 적외선 센서, 마그네틱 센서를
할당해 쓸 수 있다.
![](https://cl.ly/pJfj/Image%202018-02-06%20at%204.42.00%20PM.png)

### trigger

adafruit io에 내장된 ifttt(http://www.ifttt.com)라고 할 수 있다. 특정한 feed값이 미리 지정한
값보다 커지거나 작아지면, 혹은 다른 피드와 비교해서, 혹은 매일,매시간 주기적으로 미리 정해진 메시지를 발송한다. 메시지는
이메일, 혹은 다른 feed값으로, 혹은 http 연결로... 보낼 수 있다.

### AIO key

데이터에 접근할 권한을 확인하기위한 암호. 모든 feed 공통의 master key를 디폴트로 사용하지만 각 feed마다 다른
key를 발급해 활용할 수 도 있다.

## 시작하기

### 1. adafruit.com 계정 만들기

io.adafruit.com 에서 계정을 만든다. 무료이니 부담없다.

### 2. feed 새로 만들기

피드 이름과 설명 써
넣는다.

![](https://cdn-learn.adafruit.com/assets/assets/000/039/195/medium800/adafruit_io_00_create_feed_button.png)

### 3. feed 특성 조정하기

![](https://cl.ly/pKIh/Image%202018-02-06%20at%205.11.07%20PM.png)

#### feed information

피드 이름이나 설명, key(호출할 때 이름대신 부르는 값. 일반적으로 디폴트값 쓰면 된다.) 등을 수정할 수 있다.
![](https://cdn-learn.adafruit.com/assets/assets/000/039/203/medium800/adafruit_io_Screen_Shot_2017-02-13_at_12.19.53_PM.png)

#### privacy

피드데이터를 모든 사람에게 공개할 것인지 결정.

#### feed history

이전까지의 피드데이터를 얼마나 저장할까를 결정. 피드 데이터를 적게 저장하면 대신 한번에 보낼 수 있는 데이터 양이 늘어남
(피드에 string이나 어떤 데이터도 저장할 수 있다.) 이전 데이터 저장 안하고 최근값만 저장하는 것으로 설정
(history off)하면 한번에 100KB까지 보낼 수 있다고 하는데...(기본값은 1KB)

#### notification

피드에 새로운 데이터가 들어오지 않을 때 (센서 고장 등?) 이메일 보내주는 기능 on/off

#### license

피드 데이터에 라이센스 조건을 걸 수 있다.

## RESTful API

<https://io.adafruit.com/api/docs>

### Authentication

http request를 보낼 때 header 혹은 query에 AIO key를 넣어보낸다.

![](https://cl.ly/pTMO/Image%202018-02-10%20at%201.54.53%20PM.png)

이 때 `io_key_12345`는 `lsdkfjlkdjf87sidjkfnlwi098jwWDFW8nlwdh`같은 형태로
주어지는 AIO
key이다.

### data 저장하기 1.(API v2)

|        |                                                                                                                                     |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| action | post                                                                                                                                |
| header | "X-AIO-Key": "어쩌구저쩌구"                                                                                                               |
| url    | [https://io.adafruit.com/api/v2/{유저네임}/feeds/{feed\_key}/data](https://io.adafruit.com/api/v2/%7B유저네임%7D/feeds/%7Bfeed_key%7D/data) |
| body   | { "value": "값(string)"}                                                                                                             |

주의할 점은 feed-key는 feed name과 다르다는 것. io.adafruit.com에 로그인해서 각 피드의
feed-key를 확인할 수 있다. 한편 body에 data 센싱 시간, 위도, 경도, 고도 등의 메타 데이터 보낼 수도 있다.

``` bash
curl -X POST -F 'value=65.5' -H 'X-AIO-Key: **********' \
  http://io.adafruit.vm/api/v2/doguin_workshop/feeds/cimsil.meonjisenseo/data
```

`참고: `<https://io.adafruit.com/api/docs/#operation/createData>

### data 저장하기 2.(API v0.1)

|         |                                                                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action: | get|                                                                                                                                                                                    |
| url:    | [https://io.adafruit.com/api/group/{그룹명}/send.json/?x-aio-key=](https://io.adafruit.com/api/group/%7B그룹명%7D/send.json/?x-aio-key=)\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*&피드네임=value |

옛날 버전 api를 사용하면 웹브라우저에서 바로 테스트해볼
수있다.

### 최근data 불러오기 (api v2)

|         |                                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| action: | get                                                                                                                                           |
| header: | "X-AIO-Key": "어쩌구저쩌구"                                                                                                                         |
| url:    | [https://io.adafruit.com/api/v2/{유저네임}/feeds/{feed\_key}/data/last](https://io.adafruit.com/api/v2/%7B유저네임%7D/feeds/%7Bfeed_key%7D/data/last) |

``` bash
curl -X GET -H 'X-AIO-Key: **************' \
  http://io.adafruit.vm/api/v2/doguin_workshop/feeds/cimsil.meonjisenseo/data/last
```

응답에서 value의 값을 사용하면 된다.

``` bash
{
  "id": "string",
  "value": "string",
  "feed_id": 0,
  "group_id": 0,
  "expiration": "string",
  "lat": 0,
  "lon": 0,
  "ele": 0,
  "completed_at": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_epoch": 0
}
```

### 그 외의 기능

피드를 추가 삭제 한다던지 다양한 일들을 api로 할 수 있다. 자세한 사항은
참고:<https://io.adafruit.com/api/docs>

## adafruit io <-> snap4arduino 연동

아래 확장 블록을 사용한다.
[Adafruit-io-snap4arduino.xml]
![](https://cl.ly/8cd808/Image%202019-06-27%20at%2011.29.31%20AM.png)

* 먼저 `adafruit.io 새피드 만들기`로 새로운 센서에 대한 피드를 만들고, `adafruit.io 데이터 기록하기` 로 값을 기록하고, 값을 읽을 때는 `adafruit.io 최근 데이터 가져오기`를 한다.
* 물론 계정은 각자 새로 만들어야 하며 그에 따른 x-aio-key도 웹페이지에서 확인해 입력해야 한다.
* 위 그림과 같이 숫자 뿐만 아니라 텍스트도 데이터로 활용 할 수 있다.

## adafruit io <-> llama Automate 연동

![](https://cl.ly/pRw1/Adafruit%20io.png)

## Adafruit IO <-> 아두이노 + ESP8266으로 데이터 보내고 받기
https://github.com/makers-wiki/root/blob/master/Arduino/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%86%B5%EC%8B%A0/WIFI/ESP8266-Wifi%20shield%EC%B2%98%EB%9F%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%20/ESP8266-Wifi%20shield%EC%B2%98%EB%9F%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%20.md
