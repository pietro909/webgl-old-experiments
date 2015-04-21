/*
 * mouse_events.js:	all mouse handlers are here.
 */

function addListeners() {
	console.log("added listenerse");
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	document.addEventListener('mouseover', onDocumentMouseOver, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseDown(event) {

	event.preventDefault();

	console.log("mousedown");

	x = (event.clientX / window.innerWidth) * 2 - 1;
	y = -(event.clientY / window.innerHeight) * 2 + 1;
	z = 0.5;

	var intersects = findIntersection(x, y, z); // let's find intersections

	if (intersects.length > 0) { // if objects intersected
		// if LEFT button pressed:
		if (event.button == 0) {
			// if object is an hear
			if (intersects[0].object.id == hearRid
					|| intersects[0].object.id == hearLid) {
				animateHears(intersects[0]);
			} else {
				intersects[0].object.material.color
						.setHex(Math.random() * 0xffffff);
			}
		}
	}
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDownX = targetRotationX;
}

function animateHears(obj) {
	if (obj.object.id == hearRid) {
		console.log("destro");
		obj.object.material.color.setHex(0x00ff00 + hear_anim_R);
		tween = new TWEEN.Tween(obj.object.position).to({
			x : obj.object.position.x,
			y : obj.object.position.y,
			z : obj.object.position.z += (100 * hear_anim_R)
		}, 2000).easing(TWEEN.Easing.Elastic.EaseOut).start();
		tween.start();
		// obj.object.position.z += (100 * hear_anim_R);
		hear_anim_R *= -1; // invert animation boolean!
	} else {
		obj.object.material.color.setHex(0x00ff00 + hear_anim_L);
		obj.object.position.z -= (100 * hear_anim_L);
		hear_anim_L *= -1; // invert animation boolean!
	}
	if ((hear_anim_L == -1) || (hear_anim_R == -1)) {
		k_rotation = 0;
	} else {
		k_rotation = 0.05;
	}
}

function onDocumentMouseOver() {
	console.log("mouseover");
	// if ((hear_anim_L == -1) || (hear_anim_R == -1)) {
	k_rotation = 0.05;
	// }
}

// mouseover: si muove mentre è premuto il tasto
// event.button = 0 tasto dx
// event.button = 1 tasto sx
function onDocumentMouseMove(event) {

	event.preventDefault();
	console.log("mousemove");

	// if midbutton pressed: rotate object
	if (event.button == 1) {
		mouseX = event.clientX - windowHalfX; // shift in X
		mouseY = event.clientY - windowHalfY; // shift in Y
		targetRotationX = targetRotationOnMouseDownX
				+ (mouseX - mouseXOnMouseDown) * 0.02; // coordinates to
														// object's rotation X
		targetRotationY = targetRotationOnMouseDownY
				+ (mouseY - mouseYOnMouseDown) * 0.02; // coordinates to
														// object's rotation Y
	} else {

		x = (event.clientX / window.innerWidth) * 2 - 1;
		y = -(event.clientY / window.innerHeight) * 2 + 1;
		z = 0.5;

		var intersects = findIntersection(x, y, z); // let's find intersections
		if (intersects.length > 0) { // if objects intersected

			if (INTERSECTED != intersects[0].object) {

				if (INTERSECTED)
					INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
				INTERSECTED = intersects[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
				INTERSECTED.material.color.setHex(0xff0000);
			}
		} else {
			if (INTERSECTED)
				INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

			INTERSECTED = null;
		}
	}
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// mouseup: viene rilasciato il pulsante
function onDocumentMouseUp(event) {
	console.log("mouseup");
}

function onDocumentMouseOut(event) {
	console.log("mouseout");
	k_rotation = 0;
}

function onDocumentTouchStart(event) {
	console.log("mousetouchstart");
	if (event.touches.length == 1) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
		mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
		targetRotationOnMouseDownX = targetRotationX;
		targetRotationOnMouseDownY = targetRotationY;
	}
}

function onDocumentTouchMove(event) {
	console.log("mousetouchmove");
	if (event.touches.length == 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
		targetRotationY = targetRotationOnMouseDownY
				+ (mouseX - mouseXOnMouseDown) * 0.05;
		targetRotationY = targetRotationOnMouseDownY
				+ (mouseY - mouseYOnMouseDown) * 0.05;
	}
}

// find intersections
function findIntersection(x, y, z) {
	// defines a 3D Vector(x,y,z) describing where event lies with new system
	// coordinates
	var vector = new THREE.Vector3(x, y, z);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position)
			.normalize());

	return (ray.intersectObjects(objects));
}
