var
  theHead, theContainer, theColor = 0xFC6A45, renderer, theCube, theLight, theScene, theCamera, theGeometry, theMaterial, IS_WIRE_FRAME, ANIMATE;

function onStart() {

  var getOrSetMousePosition = function (mouse) {
    if (mouse === undefined) {
      return (this.mouse);
    } else {
      this.mouse = mouse;
    }
  };

  var camera_distance = 20;

  theContainer = $("#theContainer");
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(640, 480);
  theScene = new THREE.Scene();
  theCamera = new THREE.PerspectiveCamera(35, 640 / 480, 0.1, 1000);
  theCamera.position.set(0, 2, 20);
  theContainer.append(renderer.domElement);

  var theCanvas = renderer.domElement;

  lightOne = new THREE.DirectionalLight(0xffffff, 0.5);
  lightOne.position.set(-1, 1, 1);
  //lights['left'].castShadow = true;
  theScene.add(lightOne);

  lightTwo = new THREE.DirectionalLight(0xffffff, 0.5);
  lightTwo.position.set(1, 1, 1);
  //lights['right'].castShadow = false;
  theScene.add(lightTwo);

  var material = new THREE.MeshLambertMaterial({
    color: 0xBBCCBB
  });

  //var mesh = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material);
  loadModel("tha_face_web.dae");

  getOrSetMousePosition({
    'x': 0,
    'y': 0
  });

  theContainer.on('mousemove', on3DMouseMove);

  requestAnimationFrame(animate);

  function animate() {
    renderer.render(theScene, theCamera);
    requestAnimationFrame(animate);
  }

  function loadModel(file) {

    var mesh;
    loader = new THREE.ColladaLoader();

    loader.load(file, function (collada) {
      mesh = collada.scene;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = 10;
      mesh.rotation.x = -1.5
      mesh.position.y = -30;
      mesh.name = "tha_face";
      theScene.add(mesh);
      theHead = mesh;
    });

  }

  function on3DMouseMove(event) {

    event.preventDefault();

    console.log('mooove ');
    /*
     camera = getOrSetComposition()['camera'];
     theCanvas = getOrSetComposition()['container'].lastElementChild;
     */
    n_x = event.offsetX - (theCanvas.width / 2);
    n_y = event.offsetY - (theCanvas.height / 2);
    radius = camera_distance;

    // left & right
    k = (n_x < 0) ? 1 : -1;
    n_x = (n_x * n_x) / 800 * k;
    hypothenuse = (n_x * n_x) + (radius * radius);
    theCamera.position.x = (n_x * n_x) / hypothenuse * radius * k;
    //theCamera.position.z = (radius * radius) / hypothenuse * -radius;
    // up & down
    k = (n_y < 0) ? -1 : 1;
    hypothenuse = (n_y * n_y) + (radius * radius);
    theCamera.position.y = (n_y * n_y) / hypothenuse * radius * k;

    console.log(theCamera.position.x, theCamera.position.z);

    theCamera.lookAt(theScene.position);

    getOrSetMousePosition({
      'x': event.x,
      'y': event.y
    });
  }

}