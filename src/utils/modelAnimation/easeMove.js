import * as THREE from "three";

export default ({ ref, state, delta }) => {
  const { animationType, animationData } = ref.current.userData;
  if (!animationData) return;
  const { moveDirection, moveSpeed, moveRange } = animationData[animationType];
  const { clock } = state;
  const speed = (clock.getElapsedTime() / Math.PI) * moveSpeed;
  const range = Math.sin(speed) * moveRange;
  moveDirection.forEach(element => {
    ref.current.position[element] = range
  });
  // const targetPositionVector3 = new THREE.Vector3(5, 10, 5);
  // cameraRef.current.position.lerp(targetPositionVector3, 0);
  // ref.current.position.lerp(targetPositionVector3, 0.1);
  // console.log(ref.current.position);
};
