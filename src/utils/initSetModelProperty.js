const initSetModelProperty = ({ ref }) => {
  const { position, rotation } = ref.current.userData;
  position && ref.current.position.set(position.x, position.y, position.z);
  if (rotation) {
    ref.current.rotation.x = (Math.PI / 180) * rotation.x;
    ref.current.rotation.y = (Math.PI / 180) * rotation.y;
    ref.current.rotation.z = (Math.PI / 180) * rotation.z;
  }
};

export default initSetModelProperty;
