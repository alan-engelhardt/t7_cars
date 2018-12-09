"use strict"
const loader = document.querySelector("#loader");
const main = document.querySelector("main");
const baseLink = "http://ale-kea.dk/themes/T7_A2018_wp/wp-json/wp/v2/";
let i=0

let int = setInterval(function(){
	i++
	if(i > 10){
		clearInterval(int)
	}else{
		loader.textContent+="."
	}
}, 200);
