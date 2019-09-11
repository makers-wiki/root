/**
 Writen by August Sanghyun Park.
 2018,Sep.
 Alan Yorinks 의 s2-pi 프로젝트로부터 fork함.

 servo 작동기능 추가.
 Adafruit_motorHat 지원
 DCmotor, Stepper motor 추가
 블록 순서 바꾸고 디바이더로 구획 나누어 정리
 MCP3008 AD converter 사용한 아날로그 입력블럭

 */

(function (ext) {
    var socket = null;

    var connected = false;

    // an array to hold possible digital input values for the reporter block
    var digital_inputs = new Array(32);
    // 아날로그 인풋값 저장하기 위한 버퍼
    var analog_inputs = new Array(8);
    var myStatus = 1; // initially yellow
    var myMsg = 'not_ready';

    ext.cnct = function (callback) {
        window.socket = new WebSocket("ws://127.0.0.1:9000");
        window.socket.onopen = function () {
            var msg = JSON.stringify({
                "command": "ready"
            });
            window.socket.send(msg);
            myStatus = 2;

            // change status light from yellow to green
            myMsg = 'ready';
            connected = true;

            // initialize the reporter buffer
            digital_inputs.fill('0');

            // give the connection time establish
            window.setTimeout(function() {
            callback();
        }, 1000);

        };

        window.socket.onmessage = function (message) {
            var msg = JSON.parse(message.data);

            var reporter = msg['report'];
            // handle the only reporter message from the server
            // for changes in digital input state
            if(reporter === 'digital_input_change') {
                var pin = msg['pin'];
                digital_inputs[parseInt(pin)] = msg['level']
            }

            // 아날로그값 변경에 대응
            else if(reporter === 'analog_input_change') {
                var channel = msg['channel'];
                analog_inputs[parseInt(channel)] = msg['level']
            }

            console.log(message.data)
        };
        window.socket.onclose = function (e) {
            console.log("Connection closed.");
            socket = null;
            connected = false;
            myStatus = 1;
            myMsg = 'not_ready'
        };
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function () {
        var msg = JSON.stringify({
            "command": "shutdown"
        });
        window.socket.send(msg);
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function (status, msg) {
        return {status: myStatus, msg: myMsg};
    };

    // when the connect to server block is executed
    ext.input = function (pin) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'input', 'pin': pin
            });
            window.socket.send(msg);
        }
    };

    // when the digital write block is executed
    ext.digital_write = function (pin, state) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        console.log("digital write");
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'digital_write', 'pin': pin, 'state': state
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };

    // when the PWM block is executed
    ext.analog_write = function (pin, value) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        console.log("analog write");
        // validate the pin number for the mode
        if (validatePin(pin)) {
            // validate value to be between 0 and 255
            if (value === 'VAL') {
                alert("PWM Value must be in the range of 0 - 255");
            }
            else {
                value = parseInt(value);
                if (value < 0 || value > 255) {
                    alert("PWM Value must be in the range of 0 - 255");
                }
                else {
                    var msg = JSON.stringify({
                        "command": 'analog_write', 'pin': pin, 'value': value
                    });
                    console.log(msg);
                    window.socket.send(msg);
                }
            }
        }
    };

    // when the play tone block is executed
    ext.play_tone = function (pin, frequency) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'tone', 'pin': pin, 'frequency': frequency
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };

    // when 서보작동 block is executed
    ext.moveServo = function (pin, degree) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'servo', 'pin': pin, 'degree': degree
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };

    // DC 모터 구동 블럭
    ext.run_DC = function (motorNum, speed){
    	if (connected == false){
    		alert("Server Not Connected");
    	}
    	var msg = JSON.stringify({
    		"command":'run_DC', 'motorNum' : motorNum, 'speed' : speed
    	});
    	console.log(msg);
    	window.socket.send(msg);
    };

    // step 모터 세팅
    ext.set_stepper = function (portNum, steps_per_turn, stepstyle, rpm){
    	if (connected == false){
    		alert("Server Not Connected");
    	}
    	var msg = JSON.stringify({
    		"command":'set_stepper', 'portNum' : portNum, 'steps_per_turn': steps_per_turn, 'stepstyle': stepstyle, 'rpm' : rpm
    	});
    	console.log(msg);
    	window.socket.send(msg);
    };

    // step 모터 작동
    ext.run_stepper = function (portNum, direction, steps){
    	if (connected == false){
    		alert("Server Not Connected");
    	}
    	var msg = JSON.stringify({
    		"command":'run_stepper', 'portNum' : portNum, 'direction': direction, 'steps': steps,
    	});
    	console.log(msg);
    	window.socket.send(msg);
    };

    // when the digital read reporter block is executed
    ext.digital_read = function (pin) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        else {
                return digital_inputs[parseInt(pin)]

        }
    };

    // 아날로그 read 블록 reporter block is executed
    ext.analog_read = function (channel) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        else {
                return analog_inputs[parseInt(channel)]

        }
    };

    // general function to validate the pin value
    function validatePin(pin) {
        var rValue = true;
        if (pin === 'PIN') {
            alert("Insert a valid BCM pin number.");
            rValue = false;
        }
        else {
            var pinInt = parseInt(pin);
            if (pinInt < 0 || pinInt > 31) {
                alert("BCM pin number must be in the range of 0-31.");
                rValue = false;
            }
        }
        return rValue;
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ["w", 'Connect to s2_pii server.', 'cnct'],
            ["--"],	// 예쁘게 구획 나누기
            [" ", 'Set BCM %n as an Input', 'input','PIN'],
            ["r", "Read Digital Pin %n", "digital_read", "PIN"],
            ["r", "Read Analog at MCP3008 CH:%m.mcp3008_channel", 'analog_read','channel'],
            ["--"],
            [" ", "Set BCM %n Output to %m.high_low", "digital_write", "PIN", "0"],
            [" ", "Set BCM PWM Out %n to %n", "analog_write", "PIN", "VAL"],
            [" ", "Tone: BCM %n HZ: %n", "play_tone", "PIN", 1000],
            ["--"],
            [" ", "Move Servo at BCM %n to %n degree", "moveServo", "PIN", 0],	// 실행명령, n번ㅍ에 서보 n도로 움직이기. 기본표시값'PIN',0도
            [" ", "Run DCmotor %m.DC at speed %n","run_DC",1,"-255~255"],
            [" ", "Set Stepper port: %m.step_motor_port steps/turn: %n step style: %m.stepstyle speed: %n", "set_stepper", 1, 200, "INTERLEAVE", "RPM"], // 먼저 스텝모터 특성 설정 후
            [" ", "Run Stepper port: %m.step_motor_port direction: %m.direction steps: %n", "run_stepper", 1, "FORWARD", 0],							 // 스텝모터 작동

        ],
        "menus": {
            "high_low": ["0", "1"],
            "mcp3008_channel": [0,1,2,3,4,5,6,7],
            "DC": [1,2,3,4],
            "step_motor_port": [1,2],
            "stepstyle": ["SINGLE","DOUBLE","INTERLEAVE","MICROSTEP"],
            "direction" : ["FORWARD", "BACKWARD"]

        },
        url: 'http://doguin.com'
    };

    // Register the extension
    ScratchExtensions.register('s2pii', descriptor, ext);
})({});

