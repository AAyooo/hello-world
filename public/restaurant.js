function removeCust(){
    var customer;
    var query = waitlistCollection.orderBy("createdAt").limit(1);
    var emptyQ = true;

    query.get().then((querySnapshot) =>  {
        var docId;
        querySnapshot.forEach((doc)=>{
            console.log("EUID","=>", doc.data());
            customer = doc.data();
            docId = doc.id;
            emptyQ = false;
        });
        if(emptyQ == false){
            waitlistCollection.doc(docId).delete().then(() => {
                console.log("Document successfully deleted! " + docId);
                document.getElementById('seated').style.display = "block";
            });
        }
    });


};