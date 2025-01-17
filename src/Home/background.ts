import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import lightTex from '../assets/images/disturb.jpg';
import statue from '../assets/objects/statue.mp4';

export let renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera;

let spotLight: THREE.SpotLight;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    6,
    100,
  );
  camera.position.set(7, 4, 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI / 2;
  controls.target.set(0, 1, 0);
  controls.update();

  const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
  scene.add(ambient);

  const loader = new THREE.TextureLoader();
  const texture = loader.load(lightTex);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  spotLight = new THREE.SpotLight(0xffffff, 100);
  spotLight.position.set(2.5, 5, 2.5);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 1;
  spotLight.decay = 2;
  spotLight.distance = 0;
  spotLight.map = texture;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 10;
  spotLight.shadow.focus = 1;
  scene.add(spotLight);

  const geometry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshLambertMaterial({
    color: 0xbcbcbc,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -1, 0);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  new PLYLoader().load(statue, function (geometry) {
    geometry.scale(0.0024, 0.0024, 0.0024);
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = -Math.PI / 2;
    mesh.position.y = 0.8;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  });

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
  const time = performance.now() / 3000;

  spotLight.position.x = Math.cos(time) * 2.5;
  spotLight.position.z = Math.sin(time) * 2.5;

  renderer.render(scene, camera);
}

init();
