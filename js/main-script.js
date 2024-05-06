import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MeshBasicMaterial } from 'three';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let cameras = [];

var currentCam = 0;

var scene, renderer;

var geometry, mesh;

let materials = [new THREE.MeshBasicMaterial({ color: 0xbcbcbc }),
    new THREE.MeshBasicMaterial({ color: 0xffd03f }),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })];

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createBase(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(12, 4 ,12);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerBot(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 67 ,5);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerTop(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 5);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCabin(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 2);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createPeak(obj, x, y, z) {
    'use strict'

    geometry = new THREE.ConeGeometry(3.3, 12, 4, 1, false, Math.PI/4); //base radius is prob wrong (first argument)
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createJibandCounter(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(72, 5, 5);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCounterWeight(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 5, 5);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createLoadLine(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, Math.sqrt(2169), 4);
    geometry.rotateZ(Math.acos(12/Math.sqrt(2169)));
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCounterLoadLine(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, 20, 4);
    geometry.rotateZ(-(Math.acos(12/20)));
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createTrolley(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(5, 3, 5);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCable(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.01, 0.01, 12, 4);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createHookblock(obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(2, 2, 2);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createClaw(obj, x, y, z) {
    'use strict'

    var claw = new THREE.Object3D();

    //Top Claws
    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x+2.9, y+1.29, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+1.29, z-2.90);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x-2.9, y+1.29, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+1.29, z+2.9);
    claw.add(mesh);

    //Bottom Claws
    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x+3.12, y-1.88, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y-1.88, z-3.12);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x-3.12, y-1.88, z);
    claw.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y-1.88, z+3.12);
    claw.add(mesh);

    scene.add(claw);

    obj.add(claw);
    
}

function createContainer(x, y, z) {
    'use strict'
    
    var container = new THREE.Object3D();
    
    /*Bottom */
    geometry = new THREE.BoxGeometry(7, 0.5, 7);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y-2, z);
    container.add(mesh);
    
    /*Sides */
    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y+1.5, z-3.5);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(7, 7, 0.5);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y+1.5, z+3.5);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x-3.5, y+1.5, z);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(0.5, 7, 7);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x+3.5, y+1.5, z);
    container.add(mesh);

    container.position.set(x, y, z);
    
    scene.add(container);
}

function createCargo(edge, x, y, z) {
    'use strict'

    var cargo = new THREE.Object3D();
    
    geometry = new THREE.BoxGeometry(edge, edge, edge);
    mesh = new THREE.Mesh(geometry, materials[5]);
    
    cargo.add(mesh);
    cargo.position.set(x, y, z);
    
    scene.add(cargo);
    
}

function createRotateCrane(obj) {
    'use strict'

    createTowerTop(obj, 0, 71.5, 0);
    createCabin(obj, 0, 71.5, 3.5);
    createPeak(obj, 0, 85, 0);
    createJibandCounter(obj, 14, 76.5, 0);
    createCounterWeight(obj, -16, 71.5, 0);
    createLoadLine(obj, 22.5, 85, 0);
    createCounterLoadLine(obj, -8, 85, 0);
    createTrolley(obj, 47.5, 72.5, 0);
    createCable(obj, 47.5, 65, 0.2);
    createCable(obj, 47.5, 65, -0.5);
    createHookblock(obj, 47.5, 58, 0);
    createClaw(obj, 47.5, 54.84, 0);
}

function createCrane(x, y, z) {
    'use strict'

    var crane = new THREE.Object3D();

    createBase(crane, 0, 0, 0);
    createTowerBot(crane, 0, 35.5, 0);
    createRotateCrane(crane);

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
    createCargo(2, 20, 0, 0);
    createCargo(2.5, 0, 0, 20);
    createCargo(3, 40, 0, 0);
    createCargo(4, 0, 0, 40);
    createCargo(5, 25, 0, 25);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    let xCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    xCamera.position.set(100,0,0);
    xCamera.lookAt(scene.position);
    cameras.push(xCamera);

    let zCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    zCamera.position.set(0,0,100);
    zCamera.lookAt(scene.position);
    cameras.push(zCamera);

    let yCamera = new THREE.OrthographicCamera(window.innerWidth/-4, window.innerWidth/4, window.innerHeight/4, window.innerHeight/-4, 1, 1000);
    yCamera.position.set(0,100,0);
    yCamera.lookAt(scene.position);
    cameras.push(yCamera);

    let ortogonalCamera = new THREE.OrthographicCamera(window.innerWidth/-4, window.innerWidth/4, window.innerHeight/4, window.innerHeight/-4, 1, 1000);
    ortogonalCamera.position.set(100,100,100);
    ortogonalCamera.lookAt(scene.position);
    cameras.push(ortogonalCamera);

    let perspectiveCamera = new THREE.PerspectiveCamera(window.innerWidth/-4, window.innerWidth/4, window.innerHeight/4, window.innerHeight/-4, 1, 1000);
    perspectiveCamera.position.set(100,100,100);
    perspectiveCamera.lookAt(scene.position);
    cameras.push(perspectiveCamera);

    let clawCamera = new THREE.PerspectiveCamera(window.innerWidth/-4, window.innerWidth/4, window.innerHeight/4, window.innerHeight/-4, 1, 1000);
    clawCamera.position.set(47.5, 54.84, 0);
    clawCamera.lookAt(scene.position);
    cameras.push(clawCamera);

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
    renderer.render(scene, cameras[currentCam]);

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

    render();

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        cameras[currentCam].aspect = window.innerWidth / window.innerHeight;
        cameras[currentCam].updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: //1
            currentCam = 0;
            break;
        case 50: //2
            currentCam = 1;
            break;
        case 51: //3
            currentCam = 2;
            break;
        case 52: //4
            currentCam = 3;
            break;
        case 53: //5
            currentCam = 4;
            break;
        case 54: //6
            currentCam = 5;
            break;
        case 55: //7
           for(var i = 0; i < materials.length; i++){
            materials[i].wireframe = !materials[i].wireframe;
           }
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