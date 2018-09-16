{{WIKI}}
== 증상 ==
https://cl.ly/2c1e0D3s0u3w/Image%202017-05-30%20at%2012.58.00%20AM.png

컴파일시 WProgrma.h 파일 없음 메시지

error message:
<pre>
/arduino/FWXYIQ4G1BBD44S/FWXYIQ4G1BBD44S.ino:3:22: fatal error: WProgram.h: No such file or directory
 #include "WProgram.h"
                      ^
compilation terminated.
exit status 1
Error compiling for board Arduino/Genuino Uno.

This report would have more information with
"Show verbose output during compilation"
option enabled in File -> Preferences.
</pre>

== 원인 ==
옛 아두이노 0.0. xx 버전에서의 WProgram.h는 최근의 아두이노 1.0.xx 이상 버전에서에서 Arduino.h 로 변경됨.

== 해결책 ==
소스 코드중
<syntaxhighlight lan="arduino">
#include "WProgram.h"
</syntaxhighlight>
를
<syntaxhighlight lan="arduino">
#if defined(ARDUINO) && (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif
</syntaxhighlight>
로 수정한다.

https://cl.ly/2I211w0W1n3b/Image%202017-05-30%20at%201.07.29%20AM.png

[[category:Arduino Tip]]
