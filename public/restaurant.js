var customer;

function removeCust() {
    var query = waitlistCollection.orderBy("createdAt").limit(1);
    var emptyQ = true;
    query.get().then((querySnapshot) => {
        var docId;
        querySnapshot.forEach((doc) => {
            console.log("EUID", "=>", doc.data());
            customer = doc.data();
            docId = doc.id;
            emptyQ = false;
        });
        if (emptyQ == false) {
            waitlistCollection.doc(docId).delete().then(() => {
                console.log("Document successfully deleted! " + docId);
                document.getElementById('customerName').innerHTML = customer.name;
                document.getElementById('customerParty').innerHTML = customer.partySize;
                document.getElementById('customerPhone').innerHTML = customer.phoneNumber;
                document.getElementById('id02').style.display = 'block';
                document.getElementById('emptyLine').style.display = 'none';
                document.getElementById('restaurantModalContainer').style.display = 'block';

                console.log("MQTT connected: " + mqtt.isConnected());
                notifyCustomer();

            });
        } else {
            document.getElementById('id02').style.display = 'block';
            document.getElementById('emptyLine').style.display = 'block';
            document.getElementById('restaurantModalContainer').style.display = 'none';
        }
    });
};

function notifyCustomer() {
        console.log("Notifying customer");
        msg = new Paho.MQTT.Message(customer.name + "," + customer.partySize + "," + customer.phoneNumber);
        msg.destinationName = "cutsies/restaurant1";
        mqtt.send(msg);

        console.log("updating waiting time");
        msg = new Paho.MQTT.Message("YYY min");
        msg.destinationName = "cutsies/restaurant1/waitingtime";
        mqtt.send(msg);

    
};