/**
 * Join The Line button
 */
 function addCust() {
    var posInQ = line.enqueue("New Customer, ID:" + count);
    if(count == 1){
        document.getElementById("qPos").innerHTML = "You are the " + posInQ + "st person in line";
    }
    else if(count == 2){
        document.getElementById("qPos").innerHTML = "You are the " + posInQ + "nd person in line";
     }
    else if(count == 3){
        document.getElementById("qPos").innerHTML = "You are the " + posInQ + "rd person in line";
    }
    else if(count >= 4){
        document.getElementById("qPos").innerHTML = "You are the " + posInQ + "th person in line";
    }
    count++;
}

