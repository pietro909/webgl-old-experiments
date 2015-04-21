var
    theContainer, theColor = 0xFC6A45, renderer, theCube, theLight, theScene, theCamera, theGeometry, theMaterial, IS_WIRE_FRAME, ANIMATE;

function onStart() {

    theContainer = $("#theContainer");
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    theScene = new THREE.Scene();
    theCamera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
    theCamera.position.set(0, 0, 10);
    theContainer.append(renderer.domElement);

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

    theContainer('mousemove', on3DMouseMove, false);

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
            getOrSetComposition()['scene'].add(mesh);
        });

    }

    var getOrSetMousePosition = function (mouse) {
        if (mouse === undefined) {
            return (this.mouse);
        } else {
            this.mouse = mouse;
        }
    };

    function on3DMouseMove(event) {

        event.preventDefault();

        camera = getOrSetComposition()['camera'];
        canvas = getOrSetComposition()['container'].lastElementChild;

        n_x = event.offsetX - (canvas.width / 2);
        n_y = event.offsetY - (canvas.height / 2);
        camera_distance = 200;

        radius = camera_distance;

        // left & right
        k = (n_x < 0) ? 1 : -1;
        n_x = (n_x * n_x) / 800 * k;
        hypothenuse = (n_x * n_x) + (radius * radius);
        camera.position.x = (n_x * n_x) / hypothenuse * radius * k;
        camera.position.z = (radius * radius) / hypothenuse * radius;
        // up & down
        k = (n_y < 0) ? -1 : 1;
        hypothenuse = (n_y * n_y) + (radius * radius);
        camera.position.y = (n_y * n_y) / hypothenuse * radius * k;

        console.log(camera.position.x, camera.position.z);

        camera.lookAt(theScene.position);

        getOrSetMousePosition({
            'x': event.x,
            'y': event.y
        });
    }

}
/*
(document).ready(function () {
    function main() {

        var container = document.getElementById('3d4a-main');

        var scene = new THREE.Scene();

        render_size = {
            'width': container.clientWidth,
            'height': container.clientHeight
        };

        var fov = 45;
        var camera = new THREE.PerspectiveCamera(fov, render_size['width'] / render_size['height'], 1, 1000);
        camera.position.set(0, 0, 200);
        scene.add(camera);

        var lights = {};

        lights['left'] = new THREE.DirectionalLight(0xffffff, 0.5);
        lights['left'].position.set(-1, 1, 1);
        //lights['left'].castShadow = true;
        scene.add(lights['left']);

        lights['right'] = new THREE.DirectionalLight(0xffffff, 0.5);
        lights['right'].position.set(1, 1, 1);
        //lights['right'].castShadow = false;
        scene.add(lights['right']);

        var material = new THREE.MeshLambertMaterial({
            color: 0xBBCCBB
        });

        //var mesh = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material);
        loadModel("tha_face_web.dae");
        //scene.add(mesh);

        // build buttons

        var projector = new THREE.Projector();

        var renderer = new THREE.WebGLRenderer({
            antialias: true, // to get smoother output
            preserveDrawingBuffer: true, // to allow screenshot
            precision: 'mediump'
        });
        renderer.setClearColorHex(0xBBBBBB, 1);

        renderer.sortObjects = false;
        renderer.setSize(render_size['width'], render_size['height']);
        composition = {
            'camera': camera,
            'lights': lights,
            'scene': scene,
            'renderer': renderer,
            'container': container,
            'render_size': render_size
        }
        getOrSetComposition(composition);

        container.appendChild(renderer.domElement);

        getOrSetMousePosition({
            'x': 0,
            'y': 0
        });

        container.lastElementChild.addEventListener('mousemove', on3DMouseMove, false);

        $('.icons-frame').click(onIconClick);


        render();
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
            getOrSetComposition()['scene'].add(mesh);
        });

    }

    var getOrSetComposition = function (composition) {
        if (composition === undefined) {
            return (this.composition);
        } else {
            this.composition = composition;
        }
    }

    function render() {
        composition = getOrSetComposition();
        requestAnimationFrame(render);
        composition['renderer'].render(composition['scene'], composition['camera']);
    }

    var getOrSetMousePosition = function (mouse) {
        if (mouse === undefined) {
            return (this.mouse);
        } else {
            this.mouse = mouse;
        }
    };

    function on3DMouseMove(event) {

        event.preventDefault();

        camera = getOrSetComposition()['camera'];
        switch (event.keyCode) {

            case 68:

                var rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
                cube.matrix.multiply(rotation_matrix);
                cube.rotation.setEulerFromRotationMatrix(cube.matrix);

                break;

            case 65:

                var rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
                cube.matrix.multiply(rotation_matrix);
                cube.rotation.setEulerFromRotationMatrix(cube.matrix);

                break;

        }

        canvas = getOrSetComposition()['container'].lastElementChild;
        n_x = event.offsetX - (canvas.width / 2);
        n_y = event.offsetY - (canvas.height / 2);

        camera_distance = 200;

        radius = camera_distance;
        // left & right
        k = (n_x < 0) ? 1 : -1;
        n_x = (n_x * n_x) / 800 * k;
        hypothenuse = (n_x * n_x) + (radius * radius);
        camera.position.x = (n_x * n_x) / hypothenuse * radius * k;
        camera.position.z = (radius * radius) / hypothenuse * radius;
        // up & down
        k = (n_y < 0) ? -1 : 1;
        hypothenuse = (n_y * n_y) + (radius * radius);

        camera.position.y = (n_y * n_y) / hypothenuse * radius * k;

        console.log(camera.position.x, camera.position.z);

        camera.lookAt(getOrSetComposition()['scene'].position);
        getOrSetMousePosition({
            'x': event.x,
            'y': event.y
        });
    }

    function on3DKeyDown(event) {
        console.log("keydown");
        var rotateAngle = 0.1;
        cube = getOrSetComposition()['camera'];

    };
});
*/