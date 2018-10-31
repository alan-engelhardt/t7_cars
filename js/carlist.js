"use strict"
const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");
const catNav = document.querySelector("#cat-nav");
const listTemp = document.querySelector("#carlist-template").content;
const baseLink = "http://ale-kea.dk/t7_18/wp-json/wp/v2/";

function loadCats(){
	fetch(baseLink+"categories").then(e=>e.json()).then(makeCatMenu);
}

function loadAll(){
	fetch(link+"?_embed").then(e=>e.json()).then(showAll);
}

function loadCarsByCat(cat){
	console.log(cat)
	fetch(baseLink+"car?categories="+cat+"&_embed").then(e=>e.json()).then(showAll);
}

function makeCatMenu(data){
	data.forEach(cat=>{
		console.log(cat.name)
		const newA = document.createElement("a");
		newA.textContent=cat.name;
		newA.href="?cat="+cat.id;
		catNav.appendChild(newA)
	})
}

function showAll(data){
	data.forEach(elm=>{
		const clone = listTemp.cloneNode(true);
		//const img = elm._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
		const price = elm.acf.price;
		const fuel = elm.acf.motor_type;
		const km = elm.acf.km;
		const title = elm.title.rendered;
		const post = elm.content.rendered;

		clone.querySelector("h2").textContent=title;
		clone.querySelector(".km span").textContent=km;
		clone.querySelector(".mtype span").textContent=fuel;
		clone.querySelector("h3 span").textContent=price;
		if(elm._embedded['wp:featuredmedia']){
			clone.querySelector("img").src=elm._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;;
		}else{
			clone.querySelector("img").remove();
		}
		clone.querySelector("a").href="details.html?post="+elm.id;
		main.appendChild(clone);
	});

	loader.classList.add("hide");
	clearInterval(int);
}

loadCats();

if(catID){
	loadCarsByCat(catID)
}else{
	loadAll();
}


