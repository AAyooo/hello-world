/**
 * Global Variables
 */
var navLinks = document.getElementById("navLinks");//header menu links 

//TODO: change for particular restaurant later
let line = new Queue(); //the restaurant queue 
var count = 0;//the restaurant queue size


/**
 * General Queue Structure
 */
function Queue() {
    this.elements = [];
}
Queue.prototype.enqueue = function (e) {
    this.elements.push(e);
    return this.elements.length;
};
Queue.prototype.dequeue = function () {
    return this.elements.shift();
};
Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};
Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};
Queue.prototype.length = function () {
    return this.elements.length;
}

/**
 * Mobile Menu Headers
 */
function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}
