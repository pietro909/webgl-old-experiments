/*
 * buildScene.js: builds up the scene and updates canvas
 */

function buildScene() {
	// creates first geometry: a Cube
	var cubeX = 200;
	var cubeY = 200;
	var cubeZ = 200;
	var mesh = new THREE.CubeGeometry(cubeX, cubeY, cubeZ);
	 var sphere = new THREE.SphereGeometry(cubeX * 0.54, 16, 16, false);

	var elements = []; // array of objects

	var material = new THREE.MeshBasicMaterial();

	
	 var head = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color:
	 0x00ff00, opacity: 0.5 }));
	head.position.x = 0;
	head.position.y = 0;
	head.position.z = 0;
	scene.add(head);
	elements.push(head);

	var nose = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
		color : 0xff0000,
		opacity : 0.5
	}));

	nose.scale.x = 0.3;
	nose.scale.y = 0.6;
	nose.scale.z = 0.2;
	nose.position.x = cubeX / 2 + cubeX / 2 * 0.3;
	nose.position.y = 0;
	nose.position.z = 0;
	scene.add(nose);
	elements.push(nose);

	var hearR = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
		color : 0x00ff00 + hear_anim_R,
		opacity : 1
	}));
	hearR.scale.x = 0.3;
	hearR.scale.y = 0.3;
	hearR.scale.z = 0.1;
	hearR.position.x = 0;
	hearR.position.y = 0;
	hearR.position.z = cubeY / 2 + cubeY / 2 * 0.1;
	scene.add(hearR);
	elements.push(hearR);
	hearRid = hearR.id;

	var hearL = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
		color : 0x00ff00 + hear_anim_L,
		opacity : 1
	}));
	hearL.scale.x = 0.3;
	hearL.scale.y = 0.3;
	hearL.scale.z = 0.1;
	hearL.position.x = 0;
	hearL.position.y = 0;
	hearL.position.z = -(cubeY / 2 + cubeY / 2 * 0.1);
	scene.add(hearL);
	elements.push(hearL);
	hearLid = hearL.id;

	core = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
		color : 0xaaaaaa,
		opacity : 1
	}));
	core.position.x = 0;
	core.position.y = 0;
	core.position.z = 0;
	core.scale.x = 0.4;
	core.scale.y = 0.4;
	core.scale.z = 0.4;
	scene.add(core);
	elements.push(core);

	return (elements);
}
