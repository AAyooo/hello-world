var mqtt;
var reconnectTimeout = 2000;
var host = "broker.mqttdashboard.com";
var port = 8000;

function MQTTconnect(){
    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, 'clientId-' + randomString(10));
    var options = {
        timeout:3, 
        onSuccess: onConnect,
        onFailure: onFailure
    };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}

function onConnect(){
    console.log('Connected');
    mqtt.subscribe("cutsies/restaurant1");

    //var message = new Paho.MQTT.Message("hello World");
    //message.destinationName = 'cutsies/restaurant1';
    //mqtt.send(message);
}
function onFailure(){
    console.log("Connection Attempt to Host" + host + "Failed");
    setTimeout(MQTTconnect, reconnectTimeout);

}
function onMessageArrived(msg) {
    //Called each time a message is received
    console.log('Received message:', msg.destinationName, msg.payloadString);
    if(msg.destinationName == "cutsies/restaurant1"){
     document.getElementById("waitingTime").innerHTML = msg.payloadString;
    }
}

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

