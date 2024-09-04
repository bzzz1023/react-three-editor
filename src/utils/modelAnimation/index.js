import easeMove from "./easeMove";
import rotateAroundAxis from "./rotateAroundAxis";

const AnimationMap = {
  1: rotateAroundAxis,
  2: easeMove,
};

export default ({ ref, state, delta }) => {
  const {
    userData: { animationType },
  } = ref.current;

  if (animationType === 0) return;

  if (animationType == 1 || animationType == 2) {
    const animationExecute = AnimationMap[animationType];
    animationExecute({ ref, state, delta });
  }
};
