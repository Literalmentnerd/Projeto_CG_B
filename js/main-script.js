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

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

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

    geometry = new THREE.CylinderGeometry(0.01, 0.01, Math.sqrt(2169), 4);
    geometry.rotateZ(Math.acos(12/Math.sqrt(2169)));
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCounterLoadLine(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, 20, 4);
    geometry.rotateZ(-(Math.acos(12/20)));
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createTrolley(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 3, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCable(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, 12, 4);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createHookblock(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(2, 2, 2);
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createClaw(obj, x, y, z) {
    'use strict'

    var claw = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

    //Top Claws
    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x+2.9, y+1.29, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+1.29, z-2.90);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-2.9, y+1.29, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+1.29, z+2.9);
    claw.add(mesh);

    //Bottom Claws
    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    mesh = new THREE.Mesh(geometry,material),
    mesh.position.set(x+3.12, y-1.88, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry,material),
    mesh.position.set(x, y-1.88, z-3.12);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry,material),
    mesh.position.set(x-3.12, y-1.88, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry,material),
    mesh.position.set(x, y-1.88, z+3.12);
    claw.add(mesh);

    scene.add(claw);

    obj.add(claw);
    
}

function createContainer(x, y, z) {
    'use strict'
    
    var container = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    
    /*Bottom */
    geometry = new THREE.BoxGeometry(7, 0.5, 7);
    var material1 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
    mesh = new THREE.Mesh(geometry, material1);
    mesh.position.set(x, y-3.5, z);
    container.add(mesh);
    
    /*Sides */
    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z-3.5);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z+3.5);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-3.5, y, z);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x+3.5, y, z);
    container.add(mesh);

    container.position.set(x, y, z);
    
    scene.add(container);
}

function createCargo(edge, x, y, z) {
    'use strict'

    var cargo = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new THREE.BoxGeometry(edge, edge, edge);
    mesh = new THREE.Mesh(geometry, material);
    
    cargo.add(mesh);
    cargo.position.set(x, y, z);
    
    scene.add(cargo);
    
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
    createLoadLine(crane, 22.5, 85, 0);
    createCounterLoadLine(crane, -8, 85, 0);
    createTrolley(crane, 47.5, 72.5, 0);
    createCable(crane, 47.5, 65, 0.2);
    createCable(crane, 47.5, 65, -0.5);
    createHookblock(crane, 47.5, 58, 0);
    createClaw(crane, 47.5, 54.84, 0);

    scene.add(crane)
    
    crane.position.set(x, y, z)

}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.background = new THREE.Color(0x7796a1);

    scene.add(new THREE.AxesHelper(10))

    createCrane(0, 0, 0);
    createContainer(40, 0, 0);
    createCargo(2, 20, 0.5, 0);
    createCargo(2.5, 0, 1, 20);
    createCargo(3, 40, 1.5, 0);
    createCargo(4, 0, 2, 40);
    createCargo(5, 25, 2.5, 25);

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
    camera.position.x = 70;
    camera.position.y = 65;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

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