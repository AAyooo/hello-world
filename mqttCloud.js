var mqtt = require('mqtt')

var options = {
    host: '050d559fc0b14e87a663bb8f297b5eda.s1.eu.hivemq.cloud',
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