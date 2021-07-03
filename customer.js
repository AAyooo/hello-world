/**
 * Join The Line button
 */
 function addCust() {
    var posInQ = line.enqueue("New Customer, ID:" + count);
    document.getElementById("qPos").innerHTML = "You are the " + posInQ + "th person in line";

}