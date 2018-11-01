const template = document.querySelector("#detailTemplate").content;const params = new URLSearchParams(window.location.search);
const carID = params.get("carid");

function loadOne(carID){
	fetch(baseLink+"car/"+carID+"?_embed").then(e=>e.json()).then(showOne);
}

function showOne(data){
	console.log(data);
	const clone = template.cloneNode(true);
	const bigImg = clone.querySelector(".bigimg");

	if(data._embedded['wp:featuredmedia'][0].media_details.sizes.large){
		bigImg.src=data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
	}else{
		bigImg.src=data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
	}
	clone.querySelector("h3 span").textContent = data.acf.price;
	clone.querySelector(".km span").textContent = data.acf.km;
	clone.querySelector(".first-reg span").textContent = data.acf.first_registration;
	clone.querySelector(".myear span").textContent = data.acf.model_year;
	clone.querySelector(".mtype span").textContent = data.acf.motor_type;
	clone.querySelector("h2").textContent = data.title.rendered;
	clone.querySelector("#body").innerHTML = data.content.rendered;
	main.appendChild(clone);

	loader.classList.add("hide");
	clearInterval(int);
}

loadOne(carID);
