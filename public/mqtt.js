var mqtt;
var reconnectTimeout = 2000;
var host = "test.mosquitto.org";
var port = 8081;

function MQTTconnect(){
    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, 'clientId-' + randomString(10));
    var options = {
        timeout:3, 
        onSuccess: onConnect,
        onFailure: onFailure,
        useSSL: true,
        keepAliveInterval: 30
    };
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}
/*
function doConnect() {
    client = new Paho.MQTT.Client(host, port, 'clientId-' + randomString(10));  
    client.onConnect = onConnect;            // Callback when connected
    client.onConnectionLost = onConnectionLost;  // Callback when lost connection

    client.connect(
        {
            cleanSession : false, 
            onSuccess: onConnect,
            onFailure: onFailure,
            keepAliveInterval: 30, 
            reconnect : true,         // Enable automatic reconnect
            reconnectInterval: 10     // Reconnect attempt interval : 10 seconds
        }
    );
}
*/
function onConnect(){
    console.log('Connected');
    mqtt.subscribe("cutsies/restaurant1");

    //var message = new Paho.MQTT.Message("hello World");
    //message.destinationName = 'cutsies/restaurant1';
    //mqtt.send(message);
}

function onConnectionLost(resObj) {
    console.log("Lost connection to " + resObj.uri + "\nError code: " + resObj.errorCode + "\nError text: " + resObj.errorMessage);
    console.log("re-connecting to " + host + " " + port);

    var options = {
        timeout:3, 
        onSuccess: onConnect,
        onFailure: onFailure,
        useSSL: true,
        keepAliveInterval: 30
    };
    mqtt.connect(options);
    /*if (resObj.reconnect) {
        console.log("Automatic reconnect is currently active.");
    } else {
        alert("Lost connection to host.");
    }*/
}

function onFailure(){
    console.log("Connection Attempt to Host" + host + "Failed");
    setTimeout(MQTTconnect, reconnectTimeout);

}
function onMessageArrived(msg) {
    //Called each time a message is received
    console.log('Received message:', msg.destinationName, msg.payloadString);
    if(msg.destinationName == "cutsies/restaurant1"){
        let parsed = msg.payloadString.split(",");
        if(parsed[0] == username && parsed[2] == phoneNum){
            document.getElementById('seated').style.display = 'inline';
            posReport(0);
            setTimeout(function() {
                document.getElementById('seated').style.display = 'none';
              }, 20000);
        }else{
            if(randomTime > 2){
                randomTime-=2;
            }
            displayWaitingTime(randomTime);


            var position = 1;
            var query = waitlistCollection.orderBy("createdAt").limit(100);
            query.get().then((querySnapshot) =>  {
                querySnapshot.forEach((doc)=>{
                    console.log("EUID","=>", doc.data());
                    if (doc.get('name') == username && doc.get('phoneNumber') == phoneNum) {
                        posReport(position);
                    }else{
                        position++;
                    }
                });
            });
        }
    }

}

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
