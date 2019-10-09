import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { StyledFunction } from 'styled-components'
import { Progress } from 'react-sweet-progress'
import AnimateHeight from 'react-animate-height'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { media } from '../utils/media'
import { findColors } from '../utils/animations'

export const Group = styled.div`
  box-shadow: 1px 2px 5px #8bc34a;
  border-radius: 8px;
  padding: 12px 12px 6px 12px;
  max-width: 1000px;
  margin: 10px auto;
  background-color: #f0f7e6;
  font-family: sans-serif;

  .react-sweet-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .react-sweet-progress-symbol {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 35px;
    height: 20px;
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 800;
  }

  .react-sweet-progress-symbol-absolute {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
    justify-content: center;
    transform: translate3d(-50%, -50%, 0);
  }
  .react-sweet-progress-symbol-absolute .react-sweet-progress-symbol {
    padding: 0;
    width: 100%;
  }

  .react-sweet-progress-circle-outer {
    position: relative;
    display: inline-block;
    vertical-align: middle; 
  }
  .react-sweet-progress-line {
    width: 100%;
    border-radius: 100px;
    background-color: #efefef;
    vertical-align: middle; 
  }
  .react-sweet-progress-line-inner {
    position: relative;
    min-height: 10px;
    border-radius: 100px;
    transition: width 0.3s ease; 
  }
  .react-sweet-progress-line-inner-status-active:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    background: #fff;
    animation: active-anim 2s cubic-bezier(0.25, 1, 0.6, 1) infinite;
    content: "";
    opacity: 0; 
  }

  @keyframes active-anim {
    0% {
      width: 0;
      opacity: .1;
    }
    20% {
      width: 0;
      opacity: .5;
    }
    to {
      width: 100%;
      opacity: 0;
    }
  }
  .react-sweet-progress-circle path {
    stroke-linecap: round;
  }

  ${media.phone`
    border-radius: 0px;
  `}
`

export const GroupBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:flex-start;
  align-content: center;
  cursor: pointer;
`
interface MyProps {
  toggled: boolean,
} 

export const Toggle = styled.div<MyProps>`
  transition: all 0.4s ease;
  transform: rotateZ(${({ toggled }) => (toggled ? '-' : '')}90deg);
`

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
`

export const QuestionContainer = styled(AnimateHeight)`
  max-width: 1000px;
  background-color: #fdfdfd;
  text-align: left;
  margin: 6px auto;
`

export const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin: 0 0.5em;
`

export const Nmbr = styled.span`
  color: #222;
`

const progressTheme = () => {
  const colors = [
    ...findColors('#ff0000', '#EE9A00', 50),
    ...findColors('#EE9A00', '#008025', 50),
  ]
  return colors.map((color, idx) => ({ [`percent${idx}`]: { color } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
interface Prop {
  id: number,
  name: string,
  nmbrOfQuestions: number,
  nmbrOfAnswers: number,
  toggleActive: (item: number, value: boolean) => void,
} 

const GroupItem: React.FC<Prop> = ({
  id, name, toggleActive, nmbrOfQuestions, nmbrOfAnswers, children,
}) => {
  const [questionsToggled, setQuestionsToggled] = useState(true)
  const percent = Math.round((nmbrOfAnswers / nmbrOfQuestions) * 100)

  const toggleQuestions = () => {
    setQuestionsToggled(!questionsToggled)
    toggleActive(id, !questionsToggled)
  }

  const colorSwitch = () => {
    if (percent === 0) return 'error'
    if (percent === 100) return 'success'
    return `percent${percent}`
  }

  return (
    <Group>
      <GroupBar onClick={toggleQuestions}>
        <Div>
          <Progress
            type="circle"
            width={50}
            strokeWidth={10}
            theme={
              {
                ...progressTheme(),
                success: {
                  color: '#008025',
                },
                error: {
                  color: '#ff0000',
                },
              }
            }
            status={colorSwitch()}
            percent={percent}
          />
          <Name>{name}</Name>
          <Nmbr>{`(${nmbrOfQuestions})`}</Nmbr>
        </Div>
        <Toggle toggled={questionsToggled}>
          <ChevronLeft style={{  width: '40px', height: '40px' }} />
        </Toggle>
      </GroupBar>
      <QuestionContainer
        duration={300}
        animateOpacity
        height={questionsToggled ? 0 : 'auto'}
      >
        {children}
      </QuestionContainer>
    </Group>
  )
}

export default GroupItem
