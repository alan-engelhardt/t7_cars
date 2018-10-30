const loader = document.querySelector("#loader");
const main = document.querySelector("main");
const link = "http://ale-kea.dk/t7_18/wp-json/wp/v2/car/";
let imglink = "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url";

let int = setInterval(function(){
	loader.textContent+="."
}, 200);
