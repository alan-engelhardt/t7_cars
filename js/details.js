const template = document.querySelector("#detailTemplate").content;

function showOne(data){
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
	detmain.appendChild(clone);

	loader.classList.add("hide");
	clearInterval(int);
}

loadOne(postID);
