http://ale-kea.dk/t7_18/wp-json/wp/v2/car&_embed
http://ale-kea.dk/t7_18/wp-json/wp/v2/categories
http://ale-kea.dk/t7_18/wp-json/wp/v2/car?categories=5&_embed

function sortData(data){
	data.sort((a, b) => a.acf.someDate - b.acf.someDate)
	showAll(data)
}

function sortData(data){
	if(srt == "acc"){
		data.sort(function(a, b){
			return a.acf.someDate - b.acf.someDate
		})
	}else if(srt == "dec"){
		data.sort(function(a, b){
			return b.acf.someDate - a.acf.someDate
		})
	}
	showAll(data)
}
