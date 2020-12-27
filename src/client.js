var io = require('socket.io-client');
var Peer = require('simple-peer');
var wrtc = require('wrtc');

var socket = io(window.location.href);

var sessionId;
socket.on('connect', function() {
    sessionId = socket.id;
});

if (location.hash === '#host') {

    socket.emit('newHost');

    var hostStream;
    window.onload = function() {
        var button = document.getElementById('displayToggle');
        button.style.display = 'block';

        var video = document.getElementById('display');
        display.style.display = 'none';

        button.addEventListener('click', function() {
            navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                .then(function(stream) {
                    hostStream = stream;
                })
                .catch(function(error) {
                    console.log('error', error);
                })
        })
    }

    var connectionList = [];

    socket.on('newConnection', function(socketId) {
        var connection = {
            socketId: socketId,
            peer: new Peer({ initiator: true, trickle: false, wrtc: wrtc, stream: hostStream }),
            offer: '',
            answer: ''
        }

        connection.peer.on('signal', function(offer) {
            connection.offer = JSON.stringify(offer);
            socket.emit('newOffer', connection);
        })

        socket.on('newAnswer', function(answer) {
            if (answer.socketId === connection.socketId) {
                connection.answer = answer;
                connection.peer.signal(connection.answer.answer);
            }
        })

        connectionList.push(connection);
    })

    connectionList.forEach(function (connection) {
        connection.peer.on('data', function (data) {
            console.log('data: ' + data);
        })

        connection.peer.on('error', function(error) {
            console.log('error', error);
        })
    })

} else {

    var peer = new Peer({ trickle: false, wrtc: wrtc });

    var isDraggingMouse = false;
    
    var lastMouseMove = {
        x: 0,
        y: 0,
        time: Date.now()
    };
    
    var mouseMoveTimerId = 0;
    
    var maxMousePositionUpdatesPerSecond = 12;

    var minMouseMoveInterval =  1000 / maxMousePositionUpdatesPerSecond;

    socket.on('newOffer', function(connection) {
        console.log(connection);
        peer.signal(connection.offer);
    })

    peer.on('signal', function(answer) {
        answer = {
            answer: JSON.stringify(answer),
            socketId: sessionId
        }
        socket.emit('newAnswer', answer);
    })

    peer.on('stream', function(stream) {
        var video = document.querySelector('video');

        if ('srcObject' in video) {
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
    })

    peer.on('connect', function() {
        peer.send('peer connected');
    })

    peer.on('error', function(error) {
        console.log('error', error);
    })

    window.onload = function() {
        var video = document.querySelector('video');

        class coordsAndSize {
            constructor(event, video) {
                this.x = event.clientX - video.getBoundingClientRect().left;
                this.y = event.clientY - video.getBoundingClientRect().top;
                this.videoWidth = video.getBoundingClientRect().width;
                this.videoHeight = video.getBoundingClientRect().height;
            }
        }

        video.addEventListener('click', function (event) {
            socket.emit('leftClick', new coordsAndSize(event, video));
        })

        video.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            socket.emit('rightClick', new coordsAndSize(event, video));
        })

        video.addEventListener('mousemove', function (event) {
            if (lastMouseMove.x === event.clientX && lastMouseMove.y === event.clientY) return;

            var currentTime = Date.now();

            if (currentTime - lastMouseMove.time < minMouseMoveInterval) {
                clearTimeout(mouseMoveTimerId);

                mouseMoveTimerId = setTimeout(function () {
                    socket.emit(isDraggingMouse ? 'dragMouse' : 'mouseMove', new coordsAndSize(event, video));
                }, minMouseMoveInterval);

                return;
            }

            socket.emit(isDraggingMouse ? 'dragMouse' : 'mouseMove', new coordsAndSize(event, video));

            lastMouseMove.x = event.clientX;
            lastMouseMove.y = event.clientY;
            lastMouseMove.time = currentTime;
        })

        video.addEventListener('mousedown', function () {
            socket.emit('mouseDown', new coordsAndSize(event, video));
            isDraggingMouse = true;
        })

        video.addEventListener('mouseup', function() {
            socket.emit('mouseUp');
            isDraggingMouse = false;
        })

        video.addEventListener('wheel', function(event) {
            socket.emit('scroll', {
                x: event.deltaX,
                y: event.deltaY,
            })
        })

        window.addEventListener('keydown', function (event) {
            socket.emit('keyDown', event.key)
        })

        window.addEventListener('keyup', function (event) {
            socket.emit('keyUp', event.key)
        })

    }

}
