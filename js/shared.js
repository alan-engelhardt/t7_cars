"use strict"
const loader = document.querySelector("#loader");
const main = document.querySelector("main");
const baseLink = "http://ale-kea.dk/t7_18/wp-json/wp/v2/";

let int = setInterval(function(){
	loader.textContent+="."
}, 200);
