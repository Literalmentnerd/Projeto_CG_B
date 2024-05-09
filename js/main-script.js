import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MeshBasicMaterial } from 'three';

///////////////
/* CONSTANTS */
///////////////

// SIZES
const BASE_WIDTH = 12;
const BASE_HEIGHT = 4;
const BASE_DEPTH = 12; 

const TOWER_BOT_WIDTH = 5;
const TOWER_BOT_HEIGHT = 67;
const TOWER_BOT_DEPTH = 5;

const TOWER_TOP_SIDE = 5;

const CABIN_WIDTH = 5;
const CABIN_HEIGHT = 5;
const CABIN_DEPTH = 2;

const PEAK_RADIUS = 3.3;
const PEAK_HEIGHT = 12;

const JIBAND_COUNTER_WIDTH = 72;
const JIBAND_COUNTER_HEIGHT = 5;
const JIBAND_COUNTER_DEPTH = 5;

const COUNTER_WEIGHT_SIDE = 5;

const LOAD_LINE_RADIUS = 0.05;
const LOAD_LINE_HEIGHT1 = Math.sqrt(2169);
const LOAD_LINE_HEIGHT2 = 20;

const TROLLEY_WIDTH = 5;
const TROLLEY_HEIGHT = 3;
const TROLLEY_DEPTH = 5;

const CABLE_RADIUS = 0.05;
const CABLE_HEIGHT = 12;

const HOOK_BLOCK_SIDE = 2;
const HOOK_BLOCK_DELAY = 3.16;

const FINGER_WIDTH = 1;
const FINGER_HEIGHT = 4;
const FINGER_DEPTH = 1;

const TOP_FINGER_ANGLE = (5/18)*Math.PI;
const TOP_FINGER_XZ_DELAY = 2.6119;
const TOP_FINGER_Y_DELAY = 1.5148;

const BOTTOM_FINGER_ANGLE = -(2/18)*Math.PI;
const BOTTOM_FINGER_XZ_DELAY = 3.8920;
const BOTTOM_FINGER_Y_DELAY = -2.0181;

const CONTAINER_SIDE = 7;
const CONTAINER_THICKNESS = 0.5;

//MODEL POSITIONS
const TROLLEY_POS = new THREE.Vector3(47.5, 72.5, 0);
const CLAW_POS = new THREE.Vector3(47.5, 54.84, 0);
const CABLES_POS = new THREE.Vector3(47.5, 65, 0);
const TOWER_TOP_POS = new THREE.Vector3(0, 71.5, 0);
const CABIN_POS = new THREE.Vector3(0, 71.5, 3.5);
const PEAK_POS = new THREE.Vector3(0, 85, 0);
const JIBAND_COUNTER_POS = new THREE.Vector3(14, 76.5, 0);
const COUNTER_WEIGHT_POS = new THREE.Vector3(-16, 71.5, 0);
const LOAD_LINE_POS = new THREE.Vector3(22.5, 85, 0);
const COUNTER_LOAD_LINE_POS = new THREE.Vector3(-8, 85, 0);
const BASE_POS = new THREE.Vector3(0, 0, 0);
const TOWER_BOT_POS = new THREE.Vector3(0, 35.5, 0);
const CRANE_POS = new THREE.Vector3(0, 0, 0);
const CONTAINER_POS = new THREE.Vector3(23.75, 0, 0);

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let cameras = [];

var currentCam = 1;

var movement;

var crane = new THREE.Object3D();
var horizontal = new THREE.Object3D();
var claw = new THREE.Object3D();
var cables = new THREE.Object3D();
var trolley = new THREE.Object3D();
var rotater = new THREE.Object3D();

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

function createBase(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(BASE_WIDTH, BASE_HEIGHT, BASE_DEPTH);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerBot(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(TOWER_BOT_WIDTH, TOWER_BOT_HEIGHT, TOWER_BOT_DEPTH);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createTowerTop(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(TOWER_TOP_SIDE, TOWER_TOP_SIDE, TOWER_TOP_SIDE);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCabin(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(CABIN_WIDTH, CABIN_HEIGHT, CABIN_DEPTH);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createPeak(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.ConeGeometry(PEAK_RADIUS, PEAK_HEIGHT, 4, 1, false, Math.PI/4);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createJibandCounter(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(JIBAND_COUNTER_WIDTH, JIBAND_COUNTER_HEIGHT, JIBAND_COUNTER_DEPTH);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCounterWeight(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(COUNTER_WEIGHT_SIDE, COUNTER_WEIGHT_SIDE, COUNTER_WEIGHT_SIDE);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createLoadLine(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.CylinderGeometry(LOAD_LINE_RADIUS, LOAD_LINE_RADIUS, LOAD_LINE_HEIGHT1, 4);
    geometry.rotateZ(Math.acos(PEAK_HEIGHT/LOAD_LINE_HEIGHT1));
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createCounterLoadLine(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.CylinderGeometry(LOAD_LINE_RADIUS, LOAD_LINE_RADIUS, LOAD_LINE_HEIGHT2, 4);
    geometry.rotateZ(-(Math.acos(PEAK_HEIGHT/LOAD_LINE_HEIGHT2)));
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createTrolley(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(TROLLEY_WIDTH, TROLLEY_HEIGHT, TROLLEY_DEPTH);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    trolley.add(mesh);
    obj.add(trolley);
    
}

function createCables(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.CylinderGeometry(CABLE_RADIUS, CABLE_RADIUS, CABLE_HEIGHT, 4);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z+0.2);
    cables.add(mesh);  

    geometry = new THREE.CylinderGeometry(CABLE_RADIUS, CABLE_RADIUS, CABLE_HEIGHT, 4);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z-0.2);
    cables.add(mesh);

    obj.add(cables);
    
}

function createHookblock(obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(HOOK_BLOCK_SIDE, HOOK_BLOCK_SIDE, HOOK_BLOCK_SIDE);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function createFinger1 (obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(TOP_FINGER_ANGLE);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x+TOP_FINGER_XZ_DELAY, y+TOP_FINGER_Y_DELAY, z);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(BOTTOM_FINGER_ANGLE);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x+BOTTOM_FINGER_XZ_DELAY, y+BOTTOM_FINGER_Y_DELAY, z);
    obj.add(mesh);

}

function createFinger2 (obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(TOP_FINGER_ANGLE);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+TOP_FINGER_Y_DELAY, z-TOP_FINGER_XZ_DELAY);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(BOTTOM_FINGER_ANGLE);
    geometry.rotateY(Math.PI/2);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y+BOTTOM_FINGER_Y_DELAY, z-BOTTOM_FINGER_XZ_DELAY);
    obj.add(mesh);
    
}

function createFinger3 (obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(TOP_FINGER_ANGLE);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x-TOP_FINGER_XZ_DELAY, y+TOP_FINGER_Y_DELAY, z);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(BOTTOM_FINGER_ANGLE);
    geometry.rotateY(Math.PI);
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x-BOTTOM_FINGER_XZ_DELAY, y+BOTTOM_FINGER_Y_DELAY, z);
    obj.add(mesh);
    
}

function createFinger4 (obj, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(TOP_FINGER_ANGLE);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, y+TOP_FINGER_Y_DELAY, z+TOP_FINGER_XZ_DELAY);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(FINGER_WIDTH, FINGER_HEIGHT, FINGER_DEPTH);
    geometry.rotateZ(BOTTOM_FINGER_ANGLE);
    geometry.rotateY(-(Math.PI/2));
    mesh = new THREE.Mesh(geometry,materials[2]),
    mesh.position.set(x, y+BOTTOM_FINGER_Y_DELAY, z+BOTTOM_FINGER_XZ_DELAY);
    obj.add(mesh);
    
}

function createClaw(obj, pos) {
    'use strict'    
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;
    const hookBlockPos = new THREE.Vector3(x, y + HOOK_BLOCK_DELAY, z);

    createHookblock(claw, hookBlockPos);
    createFinger1(claw, pos);
    createFinger2(claw, pos);
    createFinger3(claw, pos);
    createFinger4(claw, pos);

    let clawCamera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    clawCamera.position.set(x, y, z);
    clawCamera.rotateX(-Math.PI/2);
    cameras.push(clawCamera);
    claw.add(clawCamera);

    scene.add(claw);

    obj.add(claw);
    
}

function createContainer(pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;
    
    var container = new THREE.Object3D();
    
    /*Bottom */
    geometry = new THREE.BoxGeometry(CONTAINER_SIDE, 0.5, CONTAINER_SIDE);
    mesh = new THREE.Mesh(geometry, materials[4]);
    mesh.position.set(x, y-2, z);
    container.add(mesh);
    
    /*Sides */
    geometry = new THREE.BoxGeometry(CONTAINER_SIDE, CONTAINER_SIDE, CONTAINER_THICKNESS);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y+1.5, z-CONTAINER_SIDE/2);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(CONTAINER_SIDE, CONTAINER_SIDE, CONTAINER_THICKNESS);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x, y+1.5, z+CONTAINER_SIDE/2);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(CONTAINER_THICKNESS, CONTAINER_SIDE, CONTAINER_SIDE);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x-CONTAINER_SIDE/2, y+1.5, z);
    container.add(mesh);
    
    geometry = new THREE.BoxGeometry(CONTAINER_THICKNESS, CONTAINER_SIDE, CONTAINER_SIDE);
    mesh = new THREE.Mesh(geometry, materials[5]);
    mesh.position.set(x+CONTAINER_SIDE/2, y+1.5, z);
    container.add(mesh);

    container.position.set(x, y, z);
    
    scene.add(container);
}

function createCargo(edge, pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

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

    createTrolley(horizontal, TROLLEY_POS);
    createClaw(horizontal, CLAW_POS);
    createCables(horizontal, CABLES_POS);

    scene.add(horizontal);

    obj.add(horizontal);

}

function createRotateCrane(obj) {
    'use strict'

    createTowerTop(rotater, TOWER_TOP_POS);
    createCabin(rotater, CABIN_POS);
    createPeak(rotater, PEAK_POS);
    createJibandCounter(rotater, JIBAND_COUNTER_POS);
    createCounterWeight(rotater, COUNTER_WEIGHT_POS);
    createLoadLine(rotater, LOAD_LINE_POS);
    createCounterLoadLine(rotater, COUNTER_LOAD_LINE_POS);
    createHorizontalMov(rotater);

    obj.add(rotater);
}

function createCrane(pos) {
    'use strict'
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    createBase(crane, BASE_POS);
    createTowerBot(crane, TOWER_BOT_POS);
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

    createCrane(CRANE_POS);
    createContainer(CONTAINER_POS);

    let cargos = [[8,0,0]]; // Base is added to cargos list for collision check
    for(var i = 0; i < 5; i++) {
        let temp = [randFloat(3, 5), randFloat(-40, 40), randFloat(-40, 40)]; //edge, x, z
        for(var j = i; j >= 0; j--) {
            if(checkCargosCollision(temp, cargos[j])) {
                    temp = [randFloat(3, 5), randFloat(-40, 40), randFloat(-40, 40)]
                    j = i+1;
            }
        }
        cargos.push(temp);

        createCargo(temp[0], new THREE.Vector3(temp[1], 0 + temp[0]/2 - 2, temp[2]));
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

    if (keysPressed.includes('e') && claw.position.y <= 11.5) { //scaling goes from 0 to 5.125
        // Move the claw up
        claw.position.y += 0.5;
        cables.scale.y -= 0.04166;
        cables.position.y += 2.9575;

        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    } 
    else if (keysPressed.includes('d') && claw.position.y >= -50) {
        // Move the claw down
        claw.position.y -= 0.5;
        cables.scale.y += 0.04166;
        cables.position.y -= 2.9575;

        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    } 
    if (keysPressed.includes('w') && trolley.position.x > -38) {
        // Move the trolley inward
        trolley.position.x -= 0.5;
        cables.position.x -= 0.5;
        claw.position.x -= 0.5;
        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    }
    else if (keysPressed.includes('s') && trolley.position.x < 0) {
        // Move the trolley outward
        trolley.position.x += 0.5;
        cables.position.x += 0.5;
        claw.position.x += 0.5;
        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    }
    if (keysPressed.includes('q')) {
        rotater.rotateY(Math.PI/180);
        renderer.render(scene, cameras[currentCam]);
    }
    else if (keysPressed.includes('a')) {
        rotater.rotateY(-Math.PI/180);
        renderer.render(scene, cameras[currentCam]);
    }
    if (keysPressed.includes('r')) {
        //TODO
    } 
    else if (keysPressed.includes('f')) {
        //TODO
    }

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
    
    update();
    
    render();

    requestAnimationFrame(animate);
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