/**Global Variables */


const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const removeThing = document.getElementById('removeThing');
var username = document.getElementById("username").value;
var party = document.getElementById("partySize").value;
var phoneNum = document.getElementById("phoneNum").value;
var randomTime;

/// Sign in event handlers

signInBtn.onclick = () => firebaseAuth.signInWithPopup(authProvider);

signOutBtn.onclick = () => firebaseAuth.signOut();

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        var query = restaurantCollection.where("EUID", "==", user.uid);
        query.get().then((querySnapshot) => {
            restFlag = false;
            querySnapshot.forEach((doc) => {
                console.log("EUID", "=>", doc.data());
                restFlag = true;
            });
            whenSignedIn.hidden = false;
            whenSignedOut.hidden = true;
            userDetails.innerHTML = `<h3 style="color:#ffff">Hello ${user.displayName}!</h3>`;
            if (restFlag) {
                document.getElementById("restaurantBox").style.display = "block";
                document.getElementById("customerBox").style.display = "none";
                document.getElementById("alrLine").style.display = "none";
                document.getElementById('seated').style.display = "none";
                document.getElementById("id02").style.display = "none";
            }
        })

    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        document.getElementById("customerBox").style.display = "none";
        document.getElementById("restaurantBox").style.display = "none";
    }
});

function customerLogin() {
    document.getElementById("restaurantBox").style.display = "none";
    document.getElementById("customerBox").style.display = "block";
    document.getElementById('alrLine').style.display = 'none';
    document.getElementById('seated').style.display = "none";
    mqtt.subscribe("cutises/restaurant1");
    mqtt.subscribe("cutises/restaurant1/waitingtime");
}
function posReport(size) {
    if (size == 0) {
        document.getElementById('qPos').style.display = "none";
        document.getElementById('waitingTime').style.display = "none";
        return;
    }
    document.getElementById('qPos').style.display = "block";
    document.getElementById('qPos').className= "blinking";
    if (size == 1) {
        document.getElementById('qPos').innerHTML = size + "st";
    }
    else if (size == 2) {
        document.getElementById('qPos').innerHTML = size + "nd";
    }
    else if (size == 3) {
        document.getElementById('qPos').innerHTML = size + "rd";
    } else {
        document.getElementById('qPos').innerHTML = size + "th";
    }

    setTimeout(function() {
        document.getElementById('qPos').className= "";
      }, 5000);
}
let unsubscribe;

//firebaseAuth.onAuthStateChanged(user => {

//if (user) {

// Database Reference    
function joinLine() {

    const { serverTimestamp } = firebase.firestore.FieldValue;
    var query = waitlistCollection.orderBy("createdAt").limit(100);

    username = document.getElementById("username").value;
    party = document.getElementById("partySize").value;
    phoneNum = document.getElementById("phoneNum").value;

    if (username == "" || party == "" || phoneNum == "") {
        return false;
    } else {

        var size = 1;
        var inLine = -1;

        query.get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                if (doc.get('name') == username && doc.get('phoneNumber') == phoneNum) {
                    if (inLine == -1) { inLine = size; }
                }
                size++;
            });

            if (inLine == -1) {
                waitlistCollection.add({
                    //uid: user.uid,
                    name: username,
                    partySize: party,
                    createdAt: serverTimestamp(),
                    phoneNumber: phoneNum
                }).then(() => {
                    console.log("added");
                    posReport(size);
                    document.getElementById('id01').style.display = 'none';

                    randomTime = Math.floor(Math.random() * (2) + 1) + size *2;
                    displayWaitingTime(randomTime);
                });
            } else {
                document.getElementById('id01').style.display = 'none';
                document.getElementById('alrLine').style.display = 'inline';
                posReport(inLine);
                setTimeout(function () {
                    document.getElementById('alrLine').style.display = 'none';
                }, 5000);

                randomTime = Math.floor(Math.random() * (2) + 1) + inLine *2;
                displayWaitingTime(randomTime);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

// Database Reference    
function displayWaitingTime(randomTime) {
    document.getElementById('waitingTime').innerHTML = randomTime + " minutes";
    document.getElementById('waitingTime').style.display = 'inline';
    document.getElementById('waitingTime').className= "blinking";
    setTimeout(function() {
        document.getElementById('waitingTime').className= "";
        }, 5000);
}

        // Query
/*unsubscribe = waitlistCollection
    .where('uid', '==', user.uid)
    .orderBy('createdAt') // Requires a query
    .onSnapshot(querySnapshot => {

        // Map results to an array of li elements

        const items = querySnapshot.docs.map(doc => {

            return `<li>${doc.data().name}</li>`

        });

        //thingsList.innerHTML = items.join('');

    });
*/


    //} else {
        // Unsubscribe when the user signs out
        //unsubscribe && unsubscribe();
   //}
//});
