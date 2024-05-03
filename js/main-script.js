import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MeshBasicMaterial } from 'three';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera, scene, renderer;

var geometry, material, mesh;

function createBase(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(12, 4 ,12);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerBot(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 67 ,5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerTop(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCabin(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createPeak(obj, x, y, z) {
    'use strict'

    geometry = new THREE.ConeGeometry(3.3, 12, 4, 1, false, Math.PI/4); //base radius is prob wrong (first argument)
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createJibandCounter(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(72, 5, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCounterWeight(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createLoadLine(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, 15, 22);
    geometry.rotateZ(Math.PI/2.5)
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    

}

function createCounterLoadLine(obj, x, y, z) {
    
}

function createTrolley(obj, x, y, z) {
    
}

function createCable(obj, x, y, z) {
    
}

function createHookblock(obj, x, y, z) {
    
}

function createClawFingerTop(obj, x, y, z) {
    
}

function createClawFingerBot(obj, x, y, z) {

}

function createClawSupport(obj, x, y, z) {

}

function createContainer(x, y, z) {
    'use strict'

    var container = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    /*Bottom */
    geometry = new THREE.BoxGeometry(7, 0.5, 7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y-3.5, z);
    container.add(mesh);

    /*Sides */
    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-3.5, y, z);
    container.add(mesh);

    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x+3.5, y, z);
    container.add(mesh);

    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z-3.5);
    container.add(mesh);

    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z+3.5);
    container.add(mesh);

    
}

function createCargo(edge, x, y, z) {
    'use strict'

    var cargo = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    geometry = new THREE.BoxGeometry(edge, edge, edge);
    mesh = new THREE.Mesh(geometry, material);

    cargo.add(mesh);
    cargo.position.set(x, y, z);

    scene.add(cargo);
    
}

function createClaw(obj, x, y, z) {
    'use strict'

    var claw = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    
    createClawSupport(claw, 0, 0, 0);
    createClawFingerTop(claw,);
    createClawFingerBot(claw,);
    createClawFingerTop(claw,);
    createClawFingerBot(claw,);
    createClawFingerTop(claw,);
    createClawFingerBot(claw,);
    createClawFingerTop(claw,);
    createClawFingerBot(claw,);

    scene.add(claw);

    claw.position.set(x, y, z);
}

function createCrane(x, y, z) {
    'use strict'

    var crane = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    createBase(crane, 0, 0, 0);
    createTowerBot(crane, 0, 35.5, 0);
    createTowerTop(crane, 0, 71.5, 0);
    createCabin(crane, 0, 71.5, 3.5);
    createPeak(crane, 0, 85, 0);
    createJibandCounter(crane, 14, 76.5, 0);
    createCounterWeight(crane, -16, 71.5, 0);
    //createLoadLine(crane, 6.8, 22.5, 0); //TODO after cameras
    createCounterLoadLine(crane,); //TODO after cameras
    createTrolley(crane,);
    createCable(crane,);
    createHookblock(crane,);
    createClaw(crane,);

    scene.add(crane)
    
    crane.position.set(x, y, z)

}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxesHelper(10))

    createCrane(0, 0, 0);
    createContainer(10, 10, 10); //Ask Teacher
    //createCargo(2, 20, 0.5, 0);
    //createCargo(2.5, 0, 1, 20);
    //createCargo(3, 40, 1.5, 0);
    //createCargo(4, 0, 2, 40);
    //createCargo(5, 25, 2.5, 25);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 90;
    camera.position.y = 90;
    camera.position.z = 90;
    camera.lookAt(scene.position);
}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: //1
           scene.traverse(function (node) {
           });
           break;
        case 50: //2
           scene.traverse(function (node) {
           });
           break;
        case 51: //3
           scene.traverse(function (node) {
           });
           break;
        case 52: //4
           scene.traverse(function (node) {
           });
           break;
        case 53: //5
           scene.traverse(function (node) {
           });
           break;
        case 65 || 81: //A, Q
           scene.traverse(function (node) {
           });
           break;
        case 83 || 87: //S, W
           scene.traverse(function (node) {
           });
           break;
        case 68 || 69: //D, E
           scene.traverse(function (node) {
           });
           break;
        case 70 || 82: //F,R
           scene.traverse(function (node) {
           });
           break;
        }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();