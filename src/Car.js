import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a) 
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/tesla_2018_model_3/scene.gltf"
  );
  
  useEffect(() => {
    gltf.scene.scale.set(0.0097, 0.0097, 0.0097);
    gltf.scene.position.set(0.18, 0.75, 0.1);
    gltf.scene.rotation.set(0, 3.14, 0)

    /* 
    fonction traverse pour passer à travers tous les enfants du modèle (pneus, fenêtre, etc)
    et appliquer mêmes propriétés 
    */
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  // ***Difficulté d'aller trouver les bons noeux.  Pour l'instant essaie et erreur
  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();
    // console.log(gltf.scene.children[0])
    let group = gltf.scene.children[0].children[0].children[0].children[0];
    group.children[3].rotation.x = t * -1.5;
    group.children[7].children[0].rotation.x = t * -1.5;
    group.children[7].children[1].rotation.x = t * -1.5;

    console.log(group.children[7])
  });
  



  /* chaque fois qu'un objet est créé à l'extérieur de fiber three js, 
  il faut y référer en objet jsx 
  Ref : "putting already existing objects into the scene graph" */
  return <primitive object={gltf.scene} />;
}
