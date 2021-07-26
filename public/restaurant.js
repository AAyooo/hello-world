var customer;
var customers = [];
var docIDs = [];

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
            seatCust(0);
        } else {
            document.getElementById('id02').style.display = 'block';
            document.getElementById('emptyLine').style.display = 'block';
            document.getElementById('restaurantModalContainer').style.display = 'none';
        }
    });
};

function notifyCustomer() {
    console.log("Notifying customer");
    msg = new Paho.MQTT.Message("delete," + customer.name + "," + customer.partySize + "," + customer.phoneNumber);
    msg.destinationName = topic;
    mqtt.send(msg);
};

function alertCustomer() {
    console.log("Alerting customer");
    msg = new Paho.MQTT.Message("alert," + customer.name + "," + customer.partySize + "," + customer.phoneNumber);
    msg.destinationName = topic;
    mqtt.send(msg);
};

function toMinutes(seconds) {
    seconds /= 60;
    seconds = Math.floor(seconds);
    seconds++;
    var ans = seconds;
    if (seconds == 1)
        ans += "  minute";
    else
        ans += "  minutes";
    return ans;
}

function peopleInLine() {
    waitlistCollection.get().then(snap => {
        var temp = snap.size - 1;
        document.getElementById('numPpl').innerHTML = temp; // will return the collection size
    });

}

function updateQueue() {
    var query = waitlistCollection.orderBy("createdAt").limit(100);
    var queue = document.getElementById('customerQueue');
    queue.innerHTML = "";
    customers = [];
    docIDs = [];

    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            customers.push(doc.data());
            docIDs.push(doc.id);
        });

        for (let i = 0; i < customers.length; i++) {
            var count = i + 1;
            var party = customers[i].partySize;
            var name = customers[i].name;

            var newtr = document.createElement('tr');
            newtr.classList.add("section__block");
            var newtd1 = document.createElement('td');
            var newtd2 = document.createElement('td');
            var newtd3 = document.createElement('td');
            var newtd4 = document.createElement('td');
            var newtd5 = document.createElement('td');
            newtd1.innerHTML = count;
            newtd2.innerHTML = name;
            newtd3.innerHTML = party + " people";
            newtd1.style.width = "5%";
            newtd2.style.width = "45%";
            newtd3.style.width = "25%";
            newtd4.style.width = "12%";
            newtd5.style.width = "13%";



            var newbtn1 = document.createElement('button');
            var newbtn2 = document.createElement('button');
            newbtn1.classList.add("seat-btn");
            newbtn2.classList.add("alert-btn");
            newbtn1.setAttribute("onclick","seatCust(" + i +")");
            newbtn2.setAttribute("onclick","alertCust(" + i +")");

            newtd4.appendChild(newbtn1);
            newtd5.appendChild(newbtn2);

            newbtn1.innerHTML = "Seat";
            newbtn2.innerHTML = "Alert";

            newtr.appendChild(newtd1);
            newtr.appendChild(newtd2);
            newtr.appendChild(newtd3);
            newtr.appendChild(newbtn1);
            newtr.appendChild(newbtn2);

            queue.appendChild(newtr);
        }
    });
}

function seatCust(index){
    customer = customers[index];
    var docId = docIDs[index];
    waitlistCollection.doc(docId).delete().then(() => {
        var d = new Date().getTime();
        d /= 1000;
        console.log("Document successfully deleted! " + docId);
        document.getElementById('customerName').innerHTML = customer.name;
        document.getElementById('customerParty').innerHTML = customer.partySize;
        document.getElementById('customerPhone').innerHTML = customer.phoneNumber;
        document.getElementById('id02').style.display = 'block';
        document.getElementById('emptyLine').style.display = 'none';
        document.getElementById('restaurantModalContainer').style.display = 'block';
        document.getElementById('waitTime').innerHTML = toMinutes(d - customer.createdAt.seconds);

        notifyCustomer();
        peopleInLine();
    });
}

function alertCust(index){
    customer = customers[index];
    alertCustomer();
}

