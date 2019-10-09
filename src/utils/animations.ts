import { keyframes } from 'styled-components'

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
`

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
`

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
`

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
`
/**
 * scrollTargetY: the target scrollY property of the window
 * speed: time in pixels per second
 * easing: easing equation to use
 */
enum EasingProp {
  easeOutSine = 'easeOutSine',
  easeInOutSine = 'easeInOutSine',
  easeInOutQuint = 'easeInOutQuint',
}
interface ColorType {
  dataType: number | null,
  value: string,
}
export const scrollToY = (scrollTargetY = 0, speed = 2000, easing = EasingProp.easeOutSine) => {
  let currentTime = 0
  const time = Math.max(0.1, Math.min(Math.abs(window.scrollY - scrollTargetY) / speed, 0.8))

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  // const PI_D2 = Math.PI / 2;
  interface EasingEq {
    easeOutSine: (p: number) => number,
    easeInOutSine: (p: number) => number,
    easeInOutQuint: (p: number) => number,
  }
  const easingEquations: EasingEq = {
    easeOutSine: (pos) => Math.sin(pos * (Math.PI / 2)),
    easeInOutSine: (pos) => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
    easeInOutQuint: (pos) => (
      (pos / 0.5) < 1 ? 0.5 * ((pos / 0.5) ** 5) : 0.5 * ((((pos / 0.5) - 2) ** 5) + 2)),
  }

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
  }
  tick();
}

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
`

// constants for switch/case checking representation type
const HEX = 1
const RGB = 2
const RGBA = 3

// get the string representation
// type and set it on the element (HEX/RGB/RGBA)
const getColorType = (val: string) => {
  if (val.indexOf('#') > -1) return HEX
  if (val.indexOf('rgb(') > -1) return RGB
  if (val.indexOf('rgba(') > -1) return RGBA
  return null
}

// return a workable RGB int array [r,g,b] from hex representation
const processHEX = (val: string) => {
  // does the hex contain extra char?
  const hex = (val.length > 6) ? val.substr(1, val.length - 1) : val
  // is it a six character hex?
  // scrape out the numerics
  // if not six character hex,
  // then work as if its a three character hex
  const r = hex.length > 3 ? hex.substr(0, 2) : hex.substr(0, 1) + hex.substr(0, 1)
  const g = hex.length > 3 ? hex.substr(2, 2) : hex.substr(1, 1) + hex.substr(1, 1)
  const b = hex.length > 3 ? hex.substr(4, 2) : hex.substr(2, 1) + hex.substr(2, 1)
  // return our clean values
  return [
    parseInt(r, 16),
    parseInt(g, 16),
    parseInt(b, 16),
  ]
}

// return a workable RGB int array [r,g,b] from rgb/rgba representation
const processRGB = (val: string) => {
  const rgb = val.split('(')[1].split(')')[0].split(',')
  return [
    parseInt(rgb[0], 10),
    parseInt(rgb[1], 10),
    parseInt(rgb[2], 10),
  ]
}

// process the value irrespective of representation type
const processValue = ( el: ColorType ) => {
  switch (el.dataType) {
    case HEX:
      return processHEX(el.value)
    case RGB:
      return processRGB(el.value)
    case RGBA:
      return processRGB(el.value)
    default:
      return null
  }
}

const pad = (nn: string, width: number, zn: string = '0'): string => {
  return nn.length >= width ? nn : new Array(width - nn.length + 1).join(zn) + nn
}

export const findColors = (startColor: string, endColor: string, steps: number) => {
  // elements for obtaining vals
  // attach start value
  const startWith = {
    dataType: getColorType(startColor),
    value: startColor,
  }
  const endWith = {
    dataType: getColorType(endColor),
    value: endColor,
  }
  const val1RGB = processValue(startWith) || [0, 0, 0]
  const val2RGB = processValue(endWith) || [0, 0, 0]

  // the percentage representation of the step
  const stepsPerc = 100 / (steps + 1)

  // diffs between two values
  const valClampRGB = [
    val2RGB[0] - val1RGB[0],
    val2RGB[1] - val1RGB[1],
    val2RGB[2] - val1RGB[2],
  ]

  // build the color array out with color steps

  return [...Array(steps)].map((s, i) => [
    '#',
    (valClampRGB[0] > 0)
      ? pad((Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[0] + (valClampRGB[0])
        / 100 * (stepsPerc * (i + 1))))).toString(16), 2),
    (valClampRGB[1] > 0)
      ? pad((Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[1] + (valClampRGB[1])
        / 100 * (stepsPerc * (i + 1))))).toString(16), 2),
    (valClampRGB[2] > 0)
      ? pad((Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[2] + (valClampRGB[2])
        / 100 * (stepsPerc * (i + 1))))).toString(16), 2),
  ].join(''))
}
