import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={["you", 3000, "...", 2000]}
      wrapper="span"
      speed={50}
      style={{ display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
