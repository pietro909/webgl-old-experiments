
function onStart() {

    var theContainer = $("#theContainer");

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(640, 480);

    var theScene = new THREE.Scene();
    var theCamera = new THREE.PerspectiveCamera(35, 640 / 480, 0.1, 1000);
    var theCanvas = renderer.domElement;

    theCamera.position.set(0, 2, 20);
    theContainer.append(renderer.domElement);

    var lightOne = new THREE.DirectionalLight(0xffffff, 0.5);
    lightOne.position.set(-1, 1, 1);
    theScene.add(lightOne);

    var lightTwo = new THREE.DirectionalLight(0xffffff, 0.5);
    lightTwo.position.set(1, 1, 1);
    theScene.add(lightTwo);

    var object = new THREE.Object3D();
    var loader = new THREE.ColladaLoader();

    var theHead;

    loader.load("tha_face_web.dae", function (collada) {
        object.add(collada.scene);
        object.name = "tha_face";
        theScene.add(object);
        theHead = object;
    });

    theContainer.on('mousemove', 'canvas', function (e) {
        event.preventDefault();

        var actualX = event.offsetX - (theCanvas.width / 2),
            actualY = event.offsetY - (theCanvas.height / 2),
            rotationY = actualX * (Math.PI / 4) / (theCanvas.width / 2),
            rotationX = actualY * (Math.PI / 4) / (theCanvas.height / 2);

        theHead.rotation.set(rotationX, rotationY, 0);
    });

    requestAnimationFrame(animate);

    function animate() {
        renderer.render(theScene, theCamera);
        requestAnimationFrame(animate);
    }

}