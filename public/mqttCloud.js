var mqtt = require('mqtt')

var options = {
    host: 'a37e151e3f1a49b5a43a1cac4b531d25.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'cutsiesInfo',
    password: 'Cutsies123'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');