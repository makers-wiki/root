![](https://i2.wp.com/electronicshobbyists.com/wp-content/uploads/2017/02/SD-card-module-arduino.png?w=432&ssl=1)

# SD library (sd카드 사용)
아두이노 이더넷 쉴드나 adafruit vs1053 mp3 decoder처럼 sd 카드를 사용하는 경우 아두이노에서 sd라이브러리로 파일을 읽거나 쓰도록 한다. 하드웨어에 따라 다르지만 spi로 통신하는 대부분의 쉴드나 브레이크아웃 보드들은 다 쓸 수 있다.
아두이노에 기본 포함된 라이브러리이다.
참고: https://www.arduino.cc/en/Reference/SD

* SPI방식 통신. (주의점! 기본적으로 CS(ChipSelect)핀으로 아두이노에 할당된 핀은 10번(우노)이다. 다른 핀을 사용해도 되지만 이 경우에도 10번 핀은 output모드로 설정해두어야 라이브러리가 작동한다.)
* FAT16, FAT32 로 포맷된 sd카드 사용 가능.
* 8자+3자(확장자) 파일명 사용가능.
* 한글 안됨.
* 디렉토리 구분자로'/' 사용. (유닉스방식)
* working directory는 언제나 root (/)

## 하드웨어 연결
기본적인 SPI연결방식을 따르면 됨.
아두이노 우노(나노 포함)에서, 디폴트로 디지털 11, 12, 13 그리고 10을 사용함.
아두이노 spi 연결 참고: https://www.arduino.cc/en/Reference/SPI

## 제공되는 함수들
* `bool SD.begin()`  : SD 카드 사용을 시작함.
* `bool SD.exists(filename)` : sd카드에 해당 파일이나 디렉토리가 있는지 확인
* `bool SD.mkdir(directory)`  : 디렉토리 새로 만듬
* `bool SD.rmdir(didrectory)` : 디렉토리 삭제 (빈 디렉토리이어야 함 )
* `File SD.open(directory, mode)` : 파일 열기 . (FILE_READ와 FILE_WRITE 모드 있음.)
* `bool SD.remove(filename)`  : 파일 삭제

* `char* File.name()` : 파일 오브젝트의 sd카드에서의 파일명
* `int File.available()`  : 파일의 끝까지 몇 바이트 남았는지 (Stream.available()참고)
* `void File.close()` : 파일 사용을 마치고 파일 닫기
* `char File.peek()`  : 파일 스트림은 진행하지 않은 채 다음번 1바이트만 미리보기
* `u_long File.position()`  : 파일스트림의 현재 위치
* `int print(), int println()`  : 파일에 데이터 쓰기
* `int write()` : 파일에 데이터 쓰기
* `bool File.seek(unsigned long)` : 파일 스트림을 지정된 위치로 이동
* `u_long File.size()`  : 파일사이즈(byte)
* `char File.read()`  : 다음 1byte, 혹은 지정된바이트만큼 읽기
* `File File.openNextFile()`  : 다음 파일 오브젝트를 리턴
* `bool File.isDirectory()` : 디렉토리인지 확인
* `void File.rewindDirectory()` : openNextFile등을 사용시 가장 첫번째 파일로 되돌아가기


# SDFat 라이브러리
sd library가 파일명을 8자까지만 지원. + 한글이 안되는듯. 그래서 보다 발전된 sdfat 라이브러리로 교체. 사용방법은 유사하다고함.
라이브러리 폴더안에 documentation이 아주 잘 되어있으므로 참고.

## SD 라이브러리로 만들어진 소스 코드 SDFat 으로 교체하기
sd > sdfat으로 교체하기 참고: http://forum.arduino.cc/index.php?topic=287298.0
기본제공되는 sdfat 라이브러리를 수정하는것은 꺼려지는일이므로 아두이노의 편집창에 sdfat.h와 sdfat.cpp등 라이브러리 파일을 불러와 수정해 프로젝트와 함께 저장하고, include문에서 '<>' 대신에 ""를 사용해 부르면 안심.`#include"SdFat.h"`이렇게..

참고: https://github.com/greiman/SdFat


* #include <SdFat.h> 를 다른 include문 보다 앞으로 보내기
* `SdFat sd` object 추가
* `SD` ->`sd`로 모두 바꾸기
* `File` -> `SdFile` 로 모두 바꾸기
* `openNextFile()` -> `openNext()`로 바꾸기
* directory = sd.open("/") 를 sd.chdir("/")로 바꾸기
