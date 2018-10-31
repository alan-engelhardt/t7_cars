"use strict"
const listTemp = document.querySelector("#carlist-template").content;

const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");
const catNav = document.querySelector("#cat-nav");

function loadCats(){
	fetch(baseLink+"categories").then(e=>e.json()).then(makeCatMenu);
}

function makeCatMenu(data){
	data.forEach(cat=>{
		const newA = document.createElement("a");
		newA.textContent=cat.name;
		newA.href="?cat="+cat.id;
		catNav.appendChild(newA);
	})
}

function loadCarsByCat(cat){
	fetch(baseLink+"car?categories="+cat+"&_embed").then(e=>e.json()).then(showAll);
}

function showAll(data){
	data.forEach(elm=>{
		const clone = listTemp.cloneNode(true);
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
			clone.querySelector("img").src=elm._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
		}else{
			clone.querySelector("img").remove();
		}
		clone.querySelector("a").href="details.html?id="+elm.id;
		main.appendChild(clone);
	});

	loader.classList.add("hide");
	clearInterval(int);
}

function loadAll(){
	fetch(baseLink+"car?_embed").then(e=>e.json()).then(showAll);
}

loadCats();

if(catID){
	loadCarsByCat(catID);
}else{
	loadAll();
}
