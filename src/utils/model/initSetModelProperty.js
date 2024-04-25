const initSetModelProperty = ({ ref }) => {
  const { position, rotation, scale } = ref.current.userData;
  if (position) {
    ref.current.position.set(position.x, position.y, position.z);
  }
  if (rotation) {
    ref.current.rotation.x = (Math.PI / 180) * rotation.x;
    ref.current.rotation.y = (Math.PI / 180) * rotation.y;
    ref.current.rotation.z = (Math.PI / 180) * rotation.z;
  }
  if (scale) {
    ref.current.scale.set(scale.x, scale.y, scale.z);
  }
};

export default initSetModelProperty;
