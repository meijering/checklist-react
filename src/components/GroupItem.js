import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'react-sweet-progress';
import AnimateHeight from 'react-animate-height';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const Group = styled.div`
  box-shadow: 1px 2px 5px #8bc34a;
  border-radius: 8px;
  padding: 10px;
  width:100%;
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
`;
export const GroupBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:flex-start;
  align-content: center;
  cursor: pointer;
`;

export const Button = styled(ChevronLeft)`
  &.closed {
    transform: rotateZ(-90deg);
    transition: all 0.4s ease;
    width: 40px;
    height: 40px;
  }
  &.opened {
    transform: rotateZ(90deg);
    transition: all 0.4s ease;
    width: 40px;
    height: 40px;
  }
`;

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
`;
export const QuestionContainer = styled(AnimateHeight)`
  max-width: 1000px;
  margin: 10px auto;
  background-color: #fdfdfd;
  text-align: left;
 `;
export const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin: 0 0.5em;
`;
export const Nmbr = styled.span`
  color: #222;
`;

export default class GroupItem extends React.PureComponent {
  state = {
    questionsToggled: true,
  }
  toggleQuestions = () =>
    this.setState(prevState => ({ questionsToggled: !prevState.questionsToggled }));

  render() {
    const {
      name,
      nmbrOfQuestions,
      nmbrOfAnswers,
      children,
    } = this.props;
    const { questionsToggled } = this.state;
    return (
      <Group>
        <GroupBar onClick={this.toggleQuestions}>
          <Div>
            <Progress
              type="circle"
              width={50}
              strokeWidth={10}
              percent={parseInt((nmbrOfAnswers / nmbrOfQuestions) * 100, 10)}
            />
            <Name>{name}</Name>
            <Nmbr>({nmbrOfQuestions})</Nmbr>
          </Div>
          <Button className={questionsToggled ? 'closed' : 'opened'} />
        </GroupBar>
        <QuestionContainer
          duration={300}
          animateOpacity
          height={questionsToggled ? 0 : 'auto'}
        >
          {children}
        </QuestionContainer>
      </Group>
    );
  }
}

GroupItem.propTypes = {
  name: PropTypes.string.isRequired,
  nmbrOfQuestions: PropTypes.number.isRequired,
  nmbrOfAnswers: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
