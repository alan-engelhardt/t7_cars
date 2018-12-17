const listTemp = document.querySelector("#carlist-template").content;
const nav = document.querySelector("#cat-nav");

const params = new URLSearchParams(window.location.search);
const catID = params.get("catid");
const srt = params.get("sort");

let savedData = [];

console.log(srt)

if(catID){
	loadCarsByCat(catID);
}else{
	loadAll();
}

function loadCategories(){
	fetch(baseLink+"categories").then(e=>e.json()).then(makeCatMenu);
}

function loadCarsByCat(catID){
	fetch(baseLink+"car?categories="+catID+"&_embed").then(e=>e.json()).then(showAll);
}

function makeCatMenu(cats){
	cats.forEach(cat=>{
		//console.log(cat);
		const newA = document.createElement("a");
		newA.textContent=cat.name;
		newA.href="?catid="+cat.id;
		nav.appendChild(newA);
	})
}

loadCategories();

function sortD(elm){
	return elm.acf.motor_type == "Diesel"
}

function showAll(data){
	console.log(data.filter(sortD));

	data.forEach(elm=>{
		const clone = listTemp.cloneNode(true);
		const price = elm.acf.price;
		const fuel = elm.acf.motor_type;
		const km = elm.acf.km;
		const title = elm.title.rendered;

		clone.querySelector("h2").textContent=title;
		clone.querySelector(".km span").textContent=km;
		clone.querySelector(".mtype span").textContent=fuel;
		clone.querySelector("h3 span").textContent=price;
		clone.querySelector("a").href="details.html?carid="+elm.id;

		if(elm._embedded['wp:featuredmedia']){
			clone.querySelector("img").src=elm._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
		}else{
			clone.querySelector("img").remove();
		}
		main.appendChild(clone);
	});

	loader.classList.add("hide");
	clearInterval(int);
}

function loadAll(){
	//fetch(baseLink+"car?_embed").then(e=>e.json()).then(showAll);
	fetch(baseLink+"car?_embed").then(e=>e.json()).then(sortData);
}

function sortData(data){
	if(srt == "acc"){
		data.sort(function(a, b){
			return a.acf.first_registration - b.acf.first_registration
		})
	}else if(srt == "dec"){
		data.sort(function(a, b){
			return b.acf.first_registration - a.acf.first_registration
		})
	}
	showAll(data)
}

