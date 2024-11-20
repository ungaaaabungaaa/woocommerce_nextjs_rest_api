'use client';

import React from "react";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../public/thankyou.json";

const LottieAnimation = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    height: 80
  };
  const { View } = useLottie(options);
  return <>{View}</>;
};

export default LottieAnimation;
