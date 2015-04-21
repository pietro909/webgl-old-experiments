/*
 * prefix for DOM objects is 'posw-'
 */

function main() {

	pinkoshow = new Pinkoshow('theShow', $('#posw-main'), 1024, 576);

	images = [];
	for ( n = 0; n < 48; ++n) {
		images.push("pinkoshow/slides/shop/strip_000" + ((n < 10) ? ("0" + n.toString()) : n.toString()) + ".jpg");
	}
	layer = new Pinkoshow.Layer('background', pinkoshow.width, pinkoshow.height, 0, false, images);
	pinkoshow.addLayer(layer);
	
	images = [];
	for ( n = 1; n < 49; ++n) {
		images.push("pinkoshow/slides/lamp/mask_lamp_00" + ((n < 10) ? ("0" + n.toString()) : n.toString()) + ".png");
	}
	layer = new Pinkoshow.Layer('lamp', pinkoshow.width, pinkoshow.height, 1, true, images);
	pinkoshow.addLayer(layer);
	
	$('#btn_back').click(function() {
		event.preventDefault();
		pinkoshow.stepBack();
	})
	$('#btn_fort').click(function() {
		event.preventDefault();
		pinkoshow.stepFort();
	})
	$('#btn_reset').click(function() {
		event.preventDefault();
		pinkoshow.showSlide(1);
	})
	/*
	layer.kinetic_layer.on('mouseover', function() {
		//document.body.style.cursor = 'pointer';
		console.log("mouseover");
	});
	
	layer.kinetic_layer.on('mouseout', function() {
		//document.body.style.cursor = 'default';
		console.log("mouseout");
	});
	
	layer.kinetic_layer.on('click', function() {
		console.log("EEEEEEEEEhhh");
	});
	*/
}
