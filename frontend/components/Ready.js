import * as THREE from 'three';
import React, { Component } from "react";
import axios from 'axios';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
// const worldStyle = {
// 	 position: 'absolute',
// 	 width: '100%',
// 	 height: '100%',
// 	 overflow: 'hidden',
// 	 background: 'linear-gradient(#e4e0ba, #f7d9aa)'
// };

var Colors = {
	red:0xf25346,
	yellow:0xedeb27,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	green:0x458248,
	purple:0x551A8B,
	lightgreen:0x629265,
};



var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;


function createScene() {
	// Get the width and height of the screen
	// and use them to setup the aspect ratio
	// of the camera and the size of the renderer.
	   HEIGHT = window.innerHeight;
	   WIDTH = window.innerWidth;

	// Create the scene.
	   scene = new THREE.Scene();

	// Add FOV Fog effect to the scene. Same colour as the BG int he stylesheet.
	   scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	// Create the camera
	   aspectRatio = WIDTH / HEIGHT;
	   fieldOfView = 60;
	   nearPlane = 1;
	   farPlane = 10000;
	   camera = new THREE.PerspectiveCamera(
		    fieldOfView,
	      aspectRatio,
	 	    nearPlane,
		    farPlane
	   );
	// Position the camera
	   camera.position.x = 0;
	   camera.position.y = 150;
	   camera.position.z = 100;

	// Create the renderer

	 renderer = new THREE.WebGLRenderer({
	// Alpha makes the background transparent, antialias is performant heavy
  		alpha: true,
  		antialias: true
	  });

	// set the size of the renderer to fullscreen
	  renderer.setSize(WIDTH, HEIGHT);
	// enable shadow rendering
	  renderer.shadowMap.enabled = true;

	// Add the Renderer to the DOM, in the world div.
	  container = document.getElementById('world');
	  container.appendChild(renderer.domElement);

	// RESPONSIVE LISTENER
	  window.addEventListener('resize', handleWindowResize, false);
}

//RESPONSIVE FUNCTION
function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}


var hemispshereLight, shadowLight;

function createLights(){
	// Gradient coloured light - Sky, Ground, Intensity
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	// Parallel rays
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);



	shadowLight.position.set(0,350,350);
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -650;
	shadowLight.shadow.camera.right = 650;
	shadowLight.shadow.camera.top = 650;
	shadowLight.shadow.camera.bottom = -650;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// Shadow map size
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// Add the lights to the scene
	scene.add(hemisphereLight);

	scene.add(shadowLight);
}


var Land = function(){
	var geom = new THREE.CylinderGeometry(600,600,1700,40,10);
	//rotate on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	//create a material
	var mat = new THREE.MeshPhongMaterial({
		color: Colors.lightgreen,
		shading:THREE.FlatShading,
	});

	//create a mesh of the object
	this.mesh = new THREE.Mesh(geom, mat);
	//receive shadows
	this.mesh.receiveShadow = true;
}

var Orbit = function(){

	var geom =new THREE.Object3D();

	this.mesh = geom;
	//this.mesh.add(sun);
}

var Sun = function(){

	this.mesh = new THREE.Object3D();

	var sunGeom = new THREE.SphereGeometry( 400, 20, 10 );
	var sunMat = new THREE.MeshPhongMaterial({
		color: Colors.yellow,
		shading:THREE.FlatShading,
	});
	var sun = new THREE.Mesh(sunGeom, sunMat);
	//sun.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	sun.castShadow = false;
	sun.receiveShadow = false;
	this.mesh.add(sun);
}

var Cloud = function(){
	// Create an empty container for the cloud
	this.mesh = new THREE.Object3D();
	// Cube geometry and material
	var geom = new THREE.DodecahedronGeometry(20,0);
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.white,
	});

	var nBlocs = 3+Math.floor(Math.random()*3);

	for (var i=0; i<nBlocs; i++ ){
		//Clone mesh geometry
		var m = new THREE.Mesh(geom, mat);
			//Randomly position each cube
			m.position.x = i*15;
			m.position.y = Math.random()*10;
			m.position.z = Math.random()*10;
			m.rotation.z = Math.random()*Math.PI*2;
			m.rotation.y = Math.random()*Math.PI*2;

			//Randomly scale the cubes
			var s = .1 + Math.random()*.9;
			m.scale.set(s,s,s);
			this.mesh.add(m);
	}
}

var Sky = function(){

	this.mesh = new THREE.Object3D();

	// Number of cloud groups
	this.nClouds = 25;

	// Space the consistenly
	var stepAngle = Math.PI*2 / this.nClouds;

	// Create the Clouds

	for(var i=0; i<this.nClouds; i++){

		var c = new Cloud();

		//set rotation and position using trigonometry
		var a = stepAngle*i;
		// this is the distance between the center of the axis and the cloud itself
		var h = 800 + Math.random()*200;
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// rotate the cloud according to its position
		c.mesh.rotation.z = a + Math.PI/2;

		// random depth for the clouds on the z-axis
		c.mesh.position.z = -400-Math.random()*400;

		// random scale for each cloud
		var s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		this.mesh.add(c.mesh);
	}
}

var Tree = function () {

	this.mesh = new THREE.Object3D();

	var matTreeLeaves = new THREE.MeshPhongMaterial( { color:Colors.green, shading:THREE.FlatShading});

	var geonTreeBase = new THREE.BoxGeometry( 10,20,10 );
	var matTreeBase = new THREE.MeshBasicMaterial( { color:Colors.brown});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	this.mesh.add(treeBase);

	var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12*3, 12*3, 4 );
	var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1,matTreeLeaves);
	treeLeaves1.castShadow = true;
	treeLeaves1.receiveShadow = true;
	treeLeaves1.position.y = 20
	this.mesh.add(treeLeaves1);

	var geomTreeLeaves2 = new THREE.CylinderGeometry( 1, 9*3, 9*3, 4 );
	var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2,matTreeLeaves);
	treeLeaves2.castShadow = true;
	treeLeaves2.position.y = 40;
	treeLeaves2.receiveShadow = true;
	this.mesh.add(treeLeaves2);

	var geomTreeLeaves3 = new THREE.CylinderGeometry( 1, 6*3, 6*3, 4);
	var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3,matTreeLeaves);
	treeLeaves3.castShadow = true;
	treeLeaves3.position.y = 55;
	treeLeaves3.receiveShadow = true;
	this.mesh.add(treeLeaves3);

}

var Flower = function () {

	this.mesh = new THREE.Object3D();

	var geomStem = new THREE.BoxGeometry( 5,50,5,1,1,1 );
	var matStem = new THREE.MeshPhongMaterial( { color:Colors.green, shading:THREE.FlatShading});
	var stem = new THREE.Mesh(geomStem,matStem);
	stem.castShadow = false;
	stem.receiveShadow = true;
	this.mesh.add(stem);


	var geomPetalCore = new THREE.BoxGeometry(10,10,10,1,1,1);
	var matPetalCore = new THREE.MeshPhongMaterial({color:Colors.yellow, shading:THREE.FlatShading});
	petalCore = new THREE.Mesh(geomPetalCore, matPetalCore);
	petalCore.castShadow = false;
	petalCore.receiveShadow = true;

	var petalColor = petalColors [Math.floor(Math.random()*3)];

	var geomPetal = new THREE.BoxGeometry( 15,20,5,1,1,1 );
	var matPetal = new THREE.MeshBasicMaterial( { color:petalColor});
	geomPetal.vertices[5].y-=4;
	geomPetal.vertices[4].y-=4;
	geomPetal.vertices[7].y+=4;
	geomPetal.vertices[6].y+=4;
	geomPetal.translate(12.5,0,3);

		var petals = [];
		for(var i=0; i<4; i++){

			petals[i]=new THREE.Mesh(geomPetal,matPetal);
			petals[i].rotation.z = i*Math.PI/2;
			petals[i].castShadow = true;
			petals[i].receiveShadow = true;
		}

	petalCore.add(petals[0],petals[1],petals[2],petals[3]);
	petalCore.position.y = 25;
	petalCore.position.z = 3;
	this.mesh.add(petalCore);

}

var petalColors = [Colors.red, Colors.yellow, Colors.blue];



var Forest = function(){

	this.mesh = new THREE.Object3D();

	// Number of Trees
	this.nTrees = 300;

	// Space the consistenly
	var stepAngle = Math.PI*2 / this.nTrees;

	// Create the Trees

	for(var i=0; i<this.nTrees; i++){

		var t = new Tree();

		//set rotation and position using trigonometry
		var a = stepAngle*i;
		// this is the distance between the center of the axis and the tree itself
		var h = 605;
		t.mesh.position.y = Math.sin(a)*h;
		t.mesh.position.x = Math.cos(a)*h;

		// rotate the tree according to its position
		t.mesh.rotation.z = a + (Math.PI/2)*3;

		//Andreas Trigo funtime
		//t.mesh.rotation.z = Math.atan2(t.mesh.position.y, t.mesh.position.x)-Math.PI/2;

		// random depth for the tree on the z-axis
		t.mesh.position.z = 0-Math.random()*600;

		// random scale for each tree
		var s = .3+Math.random()*.75;
		t.mesh.scale.set(s,s,s);

		this.mesh.add(t.mesh);
	}

	// Number of Trees
	this.nFlowers = 350;

	var stepAngle = Math.PI*2 / this.nFlowers;


	for(var i=0; i<this.nFlowers; i++){

		var f = new Flower();
		var a = stepAngle*i;

		var h = 605;
		f.mesh.position.y = Math.sin(a)*h;
		f.mesh.position.x = Math.cos(a)*h;

		f.mesh.rotation.z = a + (Math.PI/2)*3;

		f.mesh.position.z = 0-Math.random()*600;

		var s = .1+Math.random()*.3;
		f.mesh.scale.set(s,s,s);

		this.mesh.add(f.mesh);
	}

}

var AirPlane = function() {

	this.mesh = new THREE.Object3D();

	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(80,50,50,1,1,1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	geomCockpit.vertices[4].y-=10;
	geomCockpit.vertices[4].z+=20;
	geomCockpit.vertices[5].y-=10;
	geomCockpit.vertices[5].z-=20;
	geomCockpit.vertices[6].y+=30;
	geomCockpit.vertices[6].z+=20;
	geomCockpit.vertices[7].y+=30;
	geomCockpit.vertices[7].z-=20;
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);

	// Create the engine
	var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);

	// Create the tail
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);

	// Create the wing
	var geomSideWing = new THREE.BoxGeometry(40,4,150,1,1,1);
	var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});

	var sideWingTop = new THREE.Mesh(geomSideWing, matSideWing);
	var sideWingBottom = new THREE.Mesh(geomSideWing, matSideWing);
	sideWingTop.castShadow = true;
	sideWingTop.receiveShadow = true;
	sideWingBottom.castShadow = true;
	sideWingBottom.receiveShadow = true;

	sideWingTop.position.set(20,12,0);
	sideWingBottom.position.set(20,-3,0);
	this.mesh.add(sideWingTop);
	this.mesh.add(sideWingBottom);

	var geomWindshield = new THREE.BoxGeometry(3,15,20,1,1,1);
	var matWindshield = new THREE.MeshPhongMaterial({color:Colors.white,transparent:true, opacity:.3, shading:THREE.FlatShading});;
	var windshield = new THREE.Mesh(geomWindshield, matWindshield);
	windshield.position.set(5,27,0);

	windshield.castShadow = true;
	windshield.receiveShadow = true;

	this.mesh.add(windshield);

	var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	geomPropeller.vertices[4].y-=5;
	geomPropeller.vertices[4].z+=5;
	geomPropeller.vertices[5].y-=5;
	geomPropeller.vertices[5].z-=5;
	geomPropeller.vertices[6].y+=5;
	geomPropeller.vertices[6].z+=5;
	geomPropeller.vertices[7].y+=5;
	geomPropeller.vertices[7].z-=5;
	var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;


	var geomBlade1 = new THREE.BoxGeometry(1,100,10,1,1,1);
	var geomBlade2 = new THREE.BoxGeometry(1,10,100,1,1,1);
	var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});

	var blade1 = new THREE.Mesh(geomBlade1, matBlade);
	blade1.position.set(8,0,0);
	blade1.castShadow = true;
	blade1.receiveShadow = true;

	var blade2 = new THREE.Mesh(geomBlade2, matBlade);
	blade2.position.set(8,0,0);
	blade2.castShadow = true;
	blade2.receiveShadow = true;
	this.propeller.add(blade1, blade2);
	this.propeller.position.set(50,0,0);
	this.mesh.add(this.propeller);

	var wheelProtecGeom = new THREE.BoxGeometry(30,15,10,1,1,1);
	var wheelProtecMat = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	var wheelProtecR = new THREE.Mesh(wheelProtecGeom,wheelProtecMat);
	wheelProtecR.position.set(25,-20,25);
	this.mesh.add(wheelProtecR);

	var wheelTireGeom = new THREE.BoxGeometry(24,24,4);
	var wheelTireMat = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
	var wheelTireR = new THREE.Mesh(wheelTireGeom,wheelTireMat);
	wheelTireR.position.set(25,-28,25);

	var wheelAxisGeom = new THREE.BoxGeometry(10,10,6);
	var wheelAxisMat = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var wheelAxis = new THREE.Mesh(wheelAxisGeom,wheelAxisMat);
	wheelTireR.add(wheelAxis);

	this.mesh.add(wheelTireR);

	var wheelProtecL = wheelProtecR.clone();
	wheelProtecL.position.z = -wheelProtecR.position.z ;
	this.mesh.add(wheelProtecL);

	var wheelTireL = wheelTireR.clone();
	wheelTireL.position.z = -wheelTireR.position.z;
	this.mesh.add(wheelTireL);

	var wheelTireB = wheelTireR.clone();
	wheelTireB.scale.set(.5,.5,.5);
	wheelTireB.position.set(-35,-5,0);
	this.mesh.add(wheelTireB);

	var suspensionGeom = new THREE.BoxGeometry(4,20,4);
	suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0))
	var suspensionMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var suspension = new THREE.Mesh(suspensionGeom,suspensionMat);
	suspension.position.set(-35,-5,0);
	suspension.rotation.z = -.3;
	this.mesh.add(suspension);
};

var sky;
var forest;
var land;
var orbit;
var airplane;
var sun;
var fox;

var mousePos={x:0, y:0};
var offSet = -600;


function createSky(){
  sky = new Sky();
  sky.mesh.position.y = offSet;
  scene.add(sky.mesh);
}

function createLand(){
  land = new Land();
  land.mesh.position.y = offSet;
  scene.add(land.mesh);
}

function createOrbit(){
  orbit = new Orbit();
  orbit.mesh.position.y = offSet;
  orbit.mesh.rotation.z = -Math.PI/6;
  scene.add(orbit.mesh);
}

function createForest(){
  forest = new Forest();
  forest.mesh.position.y = offSet;
  scene.add(forest.mesh);
}

function createSun(){
	sun = new Sun();
	sun.mesh.scale.set(1,1,.3);
	sun.mesh.position.set(0,-30,-850);
	scene.add(sun.mesh);
}


function createPlane(){
	airplane = new AirPlane();
	airplane.mesh.scale.set(.35,.35,.35);
	airplane.mesh.position.set(-40,110,-250);
	// airplane.mesh.rotation.z = Math.PI/15;
	scene.add(airplane.mesh);
}

function createFox(){
	fox = new Fox();
	fox.mesh.scale.set(.35,.35,.35);
	fox.mesh.position.set(-40,110,-250);
	scene.add(fox.mesh);
}


function updatePlane() {

	var targetY = normalize(mousePos.y,-.75,.75, 50, 190);
	var targetX = normalize(mousePos.x,-.75,.75,-100, -20);

	// Move the plane at each frame by adding a fraction of the remaining distance
	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.1;

	airplane.mesh.position.x += (targetX-airplane.mesh.position.x)*0.1;

	// Rotate the plane proportionally to the remaining distance
	airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
	airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;
	airplane.mesh.rotation.y = (airplane.mesh.position.x-targetX)*0.0064;

	airplane.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}


function loop(){
  land.mesh.rotation.z += .005;
  orbit.mesh.rotation.z += .001;
  sky.mesh.rotation.z += .003;
  forest.mesh.rotation.z += .005;
  updatePlane();

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function handleMouseMove (event) {
	var tx = -1 + (event.clientX / WIDTH)*2;
	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};
}


function init(event) {
	createScene();
	createLights();
	createPlane();
	createOrbit();
	createSun();
	createLand();
	createForest();
	createSky();

	document.addEventListener('mousemove', handleMouseMove, false);

	loop();
}

window.addEventListener('load', init, false);

// var height = window.innerHeight,
//     width = window.innerWidth;
//
// // 3 must haves - SCENE , CAMERA, RENDERER
//
// var scene = new THREE.Scene(); // Creates a new scene
//
// var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 ); // Creates a camera and passes (field of view, aspect ratio, near clipping plane, far clipping plane)
//       camera.position.set(0, 0, 5);// moves the camera back some so we won't be inside of the cube
//       camera.lookAt( scene.position ); // makes the camera always point toward the scene
//       scene.add(camera);
//
// var light = new THREE.PointLight( 0xFFFF00 );
//       light.position.set( 10, 0, 10 );
//       scene.add(light);
//
// var renderer = new THREE.WebGLRenderer();
//       renderer.setSize( width, height ); // sets size of render to the screen size
//       document.body.appendChild( renderer.domElement); // Renders a canvas tag to the DOM
//
// var geometry = new THREE.BoxGeometry( 2, 2, 2); // give the cube it's dimensions (width, height, depth)
// var material = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe: false} ); // creates material and gives it a color
// material.wireframe = false;
// var cube1 = new THREE.Mesh( geometry, material ); // crates the cube using the geometry and the material
// var cube2 = new THREE.Mesh( geometry, material );
//       cube2.position.set(5, -2, -5);
// var cube3 = new THREE.Mesh( geometry, material );
//       cube3.position.set(-5, -2, -5);
//
// scene.add( cube1, cube2, cube3); // adds the cube to the scene
//
// // Resize Three.js scene on window resize
// window.addEventListener( 'resize', onWindowResize, false );
//
// function onWindowResize(){
//
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
// }
//
// // Render loop to display cube
// function render() {
//   requestAnimationFrame( render ); // requestAnimationFrame will pause when the user navigates to a new tab
//   cube1.rotation.z += 0.01;
//   cube1.rotation.x += 0.01;
//   cube1.rotation.y += 0.01;  // Runs every frame giving it the animation
//
//   cube2.rotation.x += 0.01;
//
//   cube3.rotation.y += 0.01;
//
//   renderer.render( scene, camera );
// };
//
// render();

class Ready extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className="world"/>
        );
    }
}


export default Ready;
