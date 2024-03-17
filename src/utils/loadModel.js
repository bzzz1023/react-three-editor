import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const url = `http://127.0.0.1:7001/v1/model/camera.glb`

const createGLTFLoader = () => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  return loader;
};

export const load = ( scence) => {
  
  const loader = createGLTFLoader();

  loader.load(url, function (gltf) {
    scence.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
  });

};
