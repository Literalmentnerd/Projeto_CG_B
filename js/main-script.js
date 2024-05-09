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
    trolley.add(mesh);
    obj.add(trolley);
    
}

function createCables(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(0.05, 0.05, 12, 4);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z+0.2);
    cables.add(mesh);

    geometry = new THREE.CylinderGeometry(0.05, 0.05, 12, 4);
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.position.set(x, y, z-0.2);
    cables.add(mesh);

    obj.add(cables);
    
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

    createHookblock(claw, 47.5, 58, 0);
    createFinger1(claw, x, y, z);
    createFinger2(claw, x, y, z);
    createFinger3(claw, x, y, z);
    createFinger4(claw, x, y, z);

    let clawCamera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    clawCamera.position.set(x, y, z);
    clawCamera.rotateX(-Math.PI/2);
    cameras.push(clawCamera);
    claw.add(clawCamera);

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

    createTrolley(horizontal, 47.5, 72.5, 0);
    createClaw(horizontal, 47.5, 54.84, 0);
    createCables(horizontal, 47.5, 65, 0);

    scene.add(horizontal);

    obj.add(horizontal);

}

function createRotateCrane(obj) {
    'use strict'

    createTowerTop(rotater, 0, 71.5, 0);
    createCabin(rotater, 0, 71.5, 3.5);
    createPeak(rotater, 0, 85, 0);
    createJibandCounter(rotater, 14, 76.5, 0);
    createCounterWeight(rotater, -16, 71.5, 0);
    createLoadLine(rotater, 22.5, 85, 0);
    createCounterLoadLine(rotater, -8, 85, 0);
    createHorizontalMov(rotater);

    obj.add(rotater);
}

function createCrane(x, y, z) {
    'use strict'

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
        let temp = [randFloat(3, 5), randFloat(-40, 40), randFloat(-40, 40)]; //edge, x, z
        for(var j = i; j >= 0; j--) {
            if(checkCargosCollision(temp, cargos[j])) {
                    temp = [randFloat(3, 5), randFloat(-40, 40), randFloat(-40, 40)]
                    j = i+1;
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
    requestAnimationFrame(animate);

    if (keysPressed.includes('e') && claw.position.y < 10) {
        // Move the claw up
        claw.position.y += 0.5;
        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    } 
    else if (keysPressed.includes('d') && claw.position.y > -50) {
        // Move the claw down
        claw.position.y -= 0.5;
        // Render the scene
        renderer.render(scene, cameras[currentCam]);
    } 
    else if (keysPressed.includes('w') && trolley.position.x > -38) {
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
    else if (keysPressed.includes('q')) {
        rotater.rotateY(Math.PI/180);
        renderer.render(scene, cameras[currentCam]);
    }
    else if (keysPressed.includes('a')) {
        rotater.rotateY(-Math.PI/180);
        renderer.render(scene, cameras[currentCam]);
    }
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