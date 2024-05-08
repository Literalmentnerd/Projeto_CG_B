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

var currentCam = 1;

var movement;

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

    geometry = new THREE.CylinderGeometry(0.05, 0.05, Math.sqrt(2169), 4);
    geometry.rotateZ(Math.acos(12/Math.sqrt(2169)));
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCounterLoadLine(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 4);
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

    geometry = new THREE.CylinderGeometry(0.05, 0.05, 12, 4);
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

function createFinger1 (obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x+2.6119, y+1.5148, z);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x+3.8920, y-2.0181, z);
    obj.add(mesh);

}

function createFinger2 (obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+1.5148, z-2.6119);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y-2.0181, z-3.8920);
    obj.add(mesh);
    
}

function createFinger3 (obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x-2.6119, y+1.5148, z);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x-3.8920, y-2.0181, z);
    obj.add(mesh);
    
}

function createFinger4 (obj, x, y, z) {
    'use strict'

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ((5/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+1.5148, z+2.6119);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(1, 4, 1);
    geometry.rotateZ(-(2/18)*Math.PI);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y-2.0181, z+3.8920);
    obj.add(mesh);
    
}

function createClaw(obj, x, y, z) {
    'use strict'

    var claw = new THREE.Object3D();

    createFinger1(claw, x, y, z);
    createFinger2(claw, x, y, z);
    createFinger3(claw, x, y, z);
    createFinger4(claw, x, y, z);

    let clawCamera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    clawCamera.position.set(x, y, z);
    clawCamera.rotateX(-Math.PI/2);
    cameras.push(clawCamera);

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

function checkCargosCollision(cargo1, cargo2){
    // Check collision between two cargos with circular hitboxes
    // Using the diagonal of the square as a radius
    const distance = Math.sqrt((cargo1[1] - cargo2[1])**2 + (cargo1[2] - cargo2[2])**2);
    const radiusSum = (Math.sqrt(cargo1[0]**2 + cargo1[0]**2) + Math.sqrt(cargo2[0]**2 + cargo2[0]**2))/2;
    return distance < radiusSum;
}

function randFloat(min, max) {
    return Math.random() * (max-min) + min;
}

function createHorizontalMov(obj) {
    'use strict'

    createTrolley(obj, 47.5, 72.5, 0);
    createCable(obj, 47.5, 65, 0.2);
    createCable(obj, 47.5, 65, -0.5);
    createHookblock(obj, 47.5, 58, 0);
    createClaw(obj, 47.5, 54.84, 0);

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
    createHorizontalMov(obj);
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
    createContainer(23.75, 0, 0);

    let cargos = [[8,0,0]]; // Base is added to cargos list for collision check
    for(var i = 0; i < 5; i++) {
        let temp = [randFloat(1, 5), randFloat(-40, 40), randFloat(-40, 40)]; //edge, x, z
        for(var j = i-1; j >= 0; j--) {
            if(checkCargosCollision(temp, cargos[j])) {
                    temp = [randFloat(1, 5), randFloat(-40, 40), randFloat(-40, 40)]
                    j = i;
            }
        }
        cargos.push(temp);
        createCargo(temp[0], temp[1], 0 + temp[0]/2 - 2, temp[2]);
    }
    cargos.splice(0, 1); // Base is removed from cargos list
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    let xCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    xCamera.position.set(100,30,0);
    xCamera.lookAt(0,30,0);
    cameras.push(xCamera);

    let zCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    zCamera.position.set(0,30,100);
    zCamera.lookAt(0,30,0);
    cameras.push(zCamera);

    let yCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    yCamera.position.set(0,100,0);
    yCamera.lookAt(scene.position);
    cameras.push(yCamera);

    let ortogonalCamera = new THREE.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight/10, window.innerHeight/-10, 1, 1000);
    ortogonalCamera.position.set(100,100,100);
    ortogonalCamera.lookAt(0,30,0);
    cameras.push(ortogonalCamera);

    let perspectiveCamera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    perspectiveCamera.position.set(75,85,75);
    perspectiveCamera.lookAt(0,30,0);
    cameras.push(perspectiveCamera);

}

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
function onResize() { //work in progress not working correctly
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        for(var camera in cameras){
            if(camera instanceof THREE.OrthographicCamera){
                camera.left = -window.innerWidth/10;
                camera.right = window.innerWidth/10;
                camera.top = window.innerHeight/10;
                camera.down = -window.innerHeight/10;
            } else {
                camera.aspect = window.innerWidth / window.innerHeight;
            }
            camera.updateProjectionMatrix();
        }
    }

    render();

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: //1
            currentCam = 1;
            break;
        case 50: //2
            currentCam = 2;
            break;
        case 51: //3
            currentCam = 3;
            break;
        case 52: //4
            currentCam = 4;
            break;
        case 53: //5
            currentCam = 5;
            break;
        case 54: //6
            currentCam = 0;
            break;
        case 55: //7
            for(var i = 0; i < materials.length; i++){
                materials[i].wireframe = !materials[i].wireframe;
            }
           break;
        case 65: //A
        case 97: //a
            movement = 2;
        case 68: //D
        case 100: //d
            movement = 5;
        case 69: //E
        case 101: //e
            movement = 6;
        case 81: //Q
        case 113: //q
            movement = 1;
        case 83: //S
        case 115: //s
            movement = 4;
        case 87: //W
        case 119: //w
            movement = 3;
        }
    render();
}

////////////////////////////
/* EVENT LISTENER FOR HUD */
////////////////////////////
var keysPressed = [];
var curCam = "1";
highlightKey(curCam);
var meshActive = false;

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (!keysPressed.includes(key) && !isNumeric(key)) {
        keysPressed.push(key);
        highlightKey(key);
    } else if(parseInt(key) >= 1 && parseInt(key) <= 6) {
        unhighlightKey(curCam);
        highlightKey(key);
        curCam = key;
    } else if(key == "7") {
        meshActive = !meshActive;
        if(meshActive) highlightKey(key);
        else unhighlightKey(key);
    }
});

document.addEventListener('keyup', function(event) {
    var key = event.key;
    if(!isNumeric(key)) {
        keysPressed = keysPressed.filter(function(item) {
            return item !== key;
        });
        unhighlightKey(key);
    }
});

function highlightKey(key) {
    var keyElement = document.getElementById('key-' + key.toLowerCase());
    if (keyElement) {
        keyElement.classList.add('active');
    }
}

function unhighlightKey(key) {
    var keyElement = document.getElementById('key-' + key.toLowerCase());
    if (keyElement) {
        keyElement.classList.remove('active');
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