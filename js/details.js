const searchParams = new URLSearchParams(window.location.search);
const category = searchParams.get('category');
const cname = searchParams.get('cname');
const postID = searchParams.get('post');

const carName = document.querySelector("h2");
const price = document.querySelector("h3 span");
const km = document.querySelector(".km span");
const mType = document.querySelector(".mtype span");
const mYear = document.querySelector(".myear span");
const firstReg = document.querySelector(".first-reg span");
const bigImg = document.querySelector(".bigimg");
const body = document.querySelector("#body");

function loadOne(id){
	fetch(link+id+"?_embed").then(e=>e.json()).then(showOne);
}

function showOne(data){
	console.log(data._embedded['wp:featuredmedia'])
	if(data._embedded['wp:featuredmedia'][0].media_details.sizes.large){
		bigImg.src=data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
	}else{
		bigImg.src=data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
	}
	price.textContent = data.acf.price;
	km.textContent = data.acf.km;
	firstReg.textContent = data.acf.first_registration;
	mYear.textContent = data.acf.model_year;
	mType.textContent = data.acf.motor_type;
	carName.textContent = data.title.rendered;
	body.innerHTML = data.content.rendered;

	loader.classList.add("hide");
	clearInterval(int);
}

loadOne(postID);
