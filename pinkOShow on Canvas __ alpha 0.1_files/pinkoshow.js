/*
 * pinkoshow object declaration
 * prefix for DOM objects is 'posw-'
 */

Pinkoshow = function(id, container, width, height) {
	this.id = id;
	this.container = container;
	this.width = width;
	this.height = height;
	this.index_now = 0;
	this.index_max = 0;
	this.step = 40;
	this.speed = 6;
	this.layers = {};
	this.layers_by_index = [];
	

	this.init();

}
function stripPath(src) {
	splitted = src.split('/');
	return (splitted[splitted.length - 1]);
}

Pinkoshow.Layer = function(id, width, height, z_index, mask, images_src) {
	this.id = id;
	this.width = width;
	this.height = height;
	this.z_index = z_index;
	this.mask = mask;
	this.images_src = images_src;
	this.images = {};
	this.how_many_loaded = 0;
	this.slides = [];
	this.ready = false;
	this.kinetic_layer = new Kinetic.Layer();
}

Pinkoshow.prototype = {

	addLayer : function(layer) {

		show = this;
		this.layers_by_index[layer.z_index] = layer.id;
		this.layers[layer.id] = layer;

		for ( i = 0; i < layer.images_src.length; ++i) {
			name = stripPath(layer.images_src[i]);
			layer.images[name] = new Image();
			layer.images[name].src = layer.images_src[i];
			layer.images_src[i] = stripPath(layer.images_src[i]);
			layer.images[name].onload = function() {
				var slide = new Kinetic.Image({
					x : 0,
					y : 0,
					image : layer.images[stripPath(this.src)],
					width : layer.width,
					height : layer.height,
				});
				/*
				 slide.createImageHitRegion(function() {
				 layer.drawHit();
				 });
				 */
				layer.slides[layer.images_src.indexOf(stripPath(this.src))] = slide;
				layer.how_many_loaded += 1;

				if (layer.how_many_loaded == (layer.images_src.length - 1)) {
					layer.ready = true;
					show.update(layer);
				}

			}
		}
		this.index_max = (this.index_max < i) ? i : this.index_max;
		
	},

	stepBack : function() {
		this.showSlide(this.index_now - 1);
	},

	stepFort : function() {
		this.showSlide(this.index_now + 1);
	},

	writeMessage : function(message) {
		var context = this.message_layer.getContext();
		this.message_layer.clear();
		context.font = '18pt Calibri';
		context.fillStyle = 'black';
		context.fillText(message, 10, 25);
	},

	update : function(layer) {
		this.stage.add(layer.kinetic_layer);
		this.showSlide(this.index_now);
	},

	init : function() {

		var stage = new Kinetic.Stage({
			container : 'posw-main',
			width : this.width,
			height : this.height
		});

		this.stage = stage;
		this.message_layer = new Kinetic.Layer();
		show = this;

		stage.on('mousemove touchmove touchstart', function(e) {
			event.preventDefault();
			/*
			 var touchPos = stage.getTouchPosition();
			 var x = touchPos.x - 190;
			 var y = touchPos.y - 40;

			 show.writeMessage('oveer');
			 */
			if (e.which == 1) {
				show.dragSlides(event.webkitMovementX);
			}
		});

		/*
		 stage.on('touchmove touchstart', function(e) {
		 //event.preventDefault();
		 writeMessage('oveeer');
		 //show.dragSlides(event);
		 });
		 */

		stage.add(this.message_layer);

		//this.writeMessage("ciao");

	},

	dragSlides : function(movement_x) {
		//movement_x = e.webkitMovementX;

		this.step += Math.abs(movement_x);
		if ((this.step > this.speed) && ((this.index_now - movement_x) != this.index_now)) {
			console.log("page: ", this.index_now - movement_x);
			this.showSlide(this.index_now - movement_x);
			this.step = 0;
		}
	},

	setBackroundLayer : function(layer) {
		stage = this.stage;
		layer.kinetic_layer.on('mousemove touchmove', function() {
			if (event.which == 1) {
				event.preventDefault();
				show.dragSlides(event);
			}
		});
	},

	showSlide : function(index) {
		
		i = 0;
		show = this;		

		if (index >= 0 && index < this.index_max) {
			
			layer = this.layers[this.layers_by_index[i]];
			slide = layer.slides[index];
			layer.kinetic_layer.add(slide);
			layer.kinetic_layer.draw();
			
			i += 1;
			layer = this.layers[this.layers_by_index[1]];
			slide = layer.slides[index];
			layer.kinetic_layer.removeChildren();
			layer.kinetic_layer.add(slide);
			slide.createImageHitRegion(function() {
				// image hit region created.  redraw hit graph
				layer.kinetic_layer.drawHit();
			});
			layer.kinetic_layer.draw();
			this.index_now = index;
		}
		this.message_layer.moveToTop();
		
	}
}
