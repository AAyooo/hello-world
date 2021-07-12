/**Global Variables */

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const joinLineButton = document.getElementById('JoinLineButton');
const removeThing = document.getElementById('removeThing');

/// Sign in event handlers

signInBtn.onclick = () => firebaseAuth.signInWithPopup(authProvider);

signOutBtn.onclick = () => firebaseAuth.signOut();

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        var query = restaurantCollection.where("EUID", "==", user.uid);
        query.get().then((querySnapshot) =>  {
            restFlag = false;
            querySnapshot.forEach((doc)=>{
                console.log("EUID","=>", doc.data());
                restFlag = true;
            });
            whenSignedIn.hidden = false;
            whenSignedOut.hidden = true;
            userDetails.innerHTML = `<h3 style="color:#ffff">Hello ${user.displayName}!</h3>`;
            if(restFlag){
                document.getElementById("restaurantBox").style.display = "block";
                document.getElementById("customerBox").style.display = "none";
            }else {
                document.getElementById("restaurantBox").style.display = "none";
                document.getElementById("customerBox").style.display = "block";
            }

        });
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        document.getElementById("customerBox").style.display = "none";
        document.getElementById("restaurantBox").style.display = "none";
    }
});


let unsubscribe;

firebaseAuth.onAuthStateChanged(user => {

    if (user) {

        // Database Reference    
        joinLineButton.onclick = () => {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            var query = waitlistCollection.orderBy("createdAt").limit(100);

            waitlistCollection.add({
                uid: user.uid,
                name: document.getElementById("username").value,
                partySize: document.getElementById("partySize").value,
                createdAt: serverTimestamp()
            }).then(() => {
                console.log("added");
                var size = 0;
                query.get().then((querySnapshot) =>  {
                    querySnapshot.forEach((doc)=>{
                       size++;
                    });

                    console.log("size:" + size);
                    document.getElementById('qPos').style.display = "block";
                    if(size == 1){
                    document.getElementById('qPos').innerHTML = "You are the " + size + "st position in line";
                    }
                    else if(size == 2){
                    document.getElementById('qPos').innerHTML = "You are the " + size + "nd position in line";
                    }
                    else if(size == 3){
                    document.getElementById('qPos').innerHTML = "You are the " + size + "rd position in line";
                    }else {
                    document.getElementById('qPos').innerHTML = "You are the " + size + "th position in line";
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
        }


        // Query
        unsubscribe = waitlistCollection
            .where('uid', '==', user.uid)
            .orderBy('createdAt') // Requires a query
            .onSnapshot(querySnapshot => {
                
                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {

                    return `<li>${doc.data().name}</li>`

                });

                //thingsList.innerHTML = items.join('');

            });



    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }
});
