import { keyframes } from 'styled-components';

export const teaserFadeInOut = keyframes`
  0% {
    opacity: 0; 
    transform: translateY(14px);
  }
  30% {
    opacity: 1; 
    transform: translateY(7px);
  }
  50% {
    opacity: 1; 
    transform: translateY(7px);
  }
  70% {
    opacity: 1; 
    transform: translateY(7px);
  }
  100% {
    opacity: 0;
    transform: translateY(0px);
  }
`;

export const notificationSlideIn = keyframes`
  0% {
    transform: translateX(-285px);
  }
  40% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(0px);
  }
`;

export const flashFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  85% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`;

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-7px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const scrollToY = (scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') => {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use
  let currentTime = 0;
  const time = Math.max(0.1, Math.min(Math.abs(window.scrollY - scrollTargetY) / speed, 0.8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  // const PI_D2 = Math.PI / 2;
  const easingEquations = {
    easeOutSine: pos => Math.sin(pos * (Math.PI / 2)),
    easeInOutSine: pos => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
    easeInOutQuint: pos => (
      (pos / 0.5) < 1 ?
        0.5 * ((pos / 0.5) ** 5) :
        0.5 * ((((pos / 0.5) - 2) ** 5) + 2)),
  };

  // add animation loop
  const tick = () => {
    currentTime += 1 / 60;
    const p = currentTime / time;
    const t = easingEquations[easing](p);
    if (p < 1) {
      window.requestAnimationFrame(tick);
      window.scrollTo(0, window.scrollY + ((scrollTargetY - window.scrollY) * t));
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  };
  tick();
};

export const greenLine = keyframes`
  0% {
    width: 0%;
    margin-left: 50%
  }
  50% {
    width: 100%;
    margin-left: 0%
  }
  100% {
    width: 0%;
    margin-left: 50%
  }
`;
