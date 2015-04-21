function showData(data, id) {
	list = [];
	idSelect = null;

	if (id == "nodelist") {
		idSelect = "NL_";
		for ( d = 0; d < data.length; d += 1) {
			list.push("<option>" + data[d].getName() + "</option>");
		}
	} else if (id == "matlist") {
		idSelect = "SL_";
		for ( d = 0; d < data.length; d += 1) {
			list.push("<option>" + data[d].getName() + "</option>");
		}
	}
	if (list.length > 0) {
		document.getElementById(id).innerHTML = "<select id='" + idSelect + "list'>" + list + "</select>";
		select = document.getElementById('SL_list');
		select.onchange = function() {
			onSelection(this.value, data)
		};
	}
}

function onSelection(select, data) {

	br = document.createElement('br');
	//new row for each info
	info = document.getElementById("info");

	console.log(select);
	console.log(data[0]);
	
	for (d = 0; d < data.length; d+=1){
		if (data[d].getName() == select) {
			console.log(data[d].textureAttributeMapList[0].);
			document.getElementById('diffuse_texture').innerHTML = "no texture";
		}
	}
	
//	document.getElementById('diffuse_texture').innerHTML = "no texture";

/*
	if (object.getStateSet() != undefined) {
		info.innerHTML = "Found!";
		info.appendChild(br);
		info.appendChild(document.createTextNode("You have requested " + select));
		info.appendChild(br);
		info.appendChild(document.createTextNode("Material: " + object.getStateSet().getName()));

		//if has textures
		if (object.getStateSet().textureAttributeMapList.length > 0) {
			for ( n = 0; n < object.getStateSet().textureAttributeMapList.length; n += 1) {
				if (object.getStateSet().textureAttributeMapList[n].Texture != undefined) {
					console.log("CODDIO ESISTE");
					info.appendChild(br);
					
					/*
					info.appendChild(document.createTextNode("Texture: " + object.getStateSet().textureAttributeMapList[n].Texture.getAttribute().getImage().src));
					console.log(object.getStateSet().textureAttributeMapList[n].Texture.getAttribute().getImage().src);
					
				} else if (object.getStateSet().textureAttributeMapList[n].attributeKeys == "TextureCubeMap") {
					texture = object.getStateSet().textureAttributeMapList[n].TextureCubeMap;
					info.appendChild(br);	
					info.appendChild(
						document.createTextNode("Texture type: "
							+ texture.getAttribute().attributeType)
							);
							/*
					for (t = 0; t < texture.getAttribute(); t+=1) {
						info.appendChild(br);	
						info.appendChild(document.createTextNode("	img ["+t+"]: "+texture.getAttribute()._images));
					}
					//console.log(texture.getAttribute().getType().getTextureObject);
					console.log(texture.getAttribute()._images);
				}
			}
		} else {
			info.appendChild(document.createTextNode("This material has no textures."));
		}
	} else {
		info.innerHTML = "You have requested " + select + " but it has no StateSet";
	}
	*/
}
