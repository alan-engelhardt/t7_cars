const listTemp = document.querySelector("#carlist-template").content;

function loadAll(){
	fetch(link+"?_embed").then(e=>e.json()).then(showAll);
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

loadAll();
