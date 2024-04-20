export default ({ ref, state, delta }) => {
  const { animationType, animationData } = ref.current.userData;
  if (!animationData) return;
  const {
    enableRotateSelf,
    rotatePivot,
    rotateRadius,
    rotateClockwise,
    rotateSpeed,
  } = animationData[animationType];
  const rotatePivotX = rotatePivot.x;
  const rotatePivotZ = rotatePivot.z;
  const { clock } = state;

  const speed = rotateSpeed / 10;

  const step = clock.getElapsedTime() * speed * rotateClockwise;
  const oldX = ref.current.position.x;
  const oldY = ref.current.position.y;
  const oldZ = ref.current.position.z;

  // TODO 计算新坐标，计算当前差值
  const x = rotateRadius * Math.sin(step) + rotatePivotX;
  const z = rotateRadius * Math.cos(step) + rotatePivotZ;

  // 自身旋转
  if (enableRotateSelf) {
    // TODO 计算模型根据y轴旋转
    // ref.current.rotation.y += delta * speed * rotateClockwise;
  }
  ref.current.position.set(x, oldY, z);
};
