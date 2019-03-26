import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
/* eslint-disable camelcase */
import { ic_lightbulb_outline } from 'react-icons-kit/md/ic_lightbulb_outline';
import { ic_comment } from 'react-icons-kit/md/ic_comment';
/* eslint-enable camelcase */
import AnimateHeight from 'react-animate-height';
import { media } from '../utils/media';
import Remarks from './Remarks';


const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 0;
  height: 40px;
  ${media.phone`
    height: auto;
  `}
`;

const Check = styled(Checkbox)`
  flex: 0 0 auto;
  padding: 0;
  margin-right: 12px;
  margin-left: 2px;
  & svg {
    height: 1.5em;
    width: 1.5em;
    fill: #008025;
  }
`;

const QuestionBox = styled.div`
  padding-right: 6px;
  line-height: 24px;
`;

export const QuestionInfo = styled(AnimateHeight)`
  ${media.phone`
    display: none;
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60vh;
`;

const Tip = styled.div`
  margin-bottom: 5px;
`;

const Navigator = styled.div`
  display: flex;
  flex: 0 0 40px;
  flex-direction: column;
  align-items: center;
`;
const InfoContent = styled.div`
  flex: 0 0 90%;
`;

class Question extends PureComponent {
  static propTypes = {
    question: PropTypes.shape().isRequired,
    saveAnswer: PropTypes.func.isRequired,
    showDetail: PropTypes.bool,
  }

  static defaultProps = {
    showDetail: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      more: this.setLastAnswer(),
    };
  }

  onChange = (e) => {
    this.setState({ more: e.target.value });
  };

  getLastAnswer = () => {
    const { question } = this.props;
    return (question.answers
      ? question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
        .map(a => a.antwoord)[0] === '1' : false);
  }

  setLastAnswer = () => {
    const { question } = this.props;
    return (question.answers
      ? question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
        .map(a => a.antwoord)[0] : '');
  }

  saveCheck = () => {
    const { question, saveAnswer } = this.props;
    saveAnswer(question.vraag_id, this.getLastAnswer() ? '' : '1');
  }

  saveThis = () => {
    const { question, saveAnswer } = this.props;
    const { more } = this.state;
    if (more !== this.setLastAnswer()) {
      saveAnswer(question.vraag_id, more);
    }
  }

  /* eslint-disable camelcase */
  render() {
    const { question, showDetail } = this.props;
    const { more } = this.state;
    return (
      <React.Fragment>
        <Bar>
        {question.type === 'checkbox' && (
          <React.Fragment>
            <Check checked={this.getLastAnswer()} onChange={() => this.saveCheck()} value="1" />
          </React.Fragment>
        )}
        <QuestionBox>{question.vraag}</QuestionBox>
        </Bar>
        {(question.tips || question.remarks) && (
          <QuestionInfo
            duration={300}
            animateOpacity
            height={showDetail ? 'auto' : 0}
          >
            <InfoContainer>
              <Navigator>
              <Icon size="20" icon={ic_lightbulb_outline} />
              <Icon size="16" icon={ic_comment} />
              </Navigator>
              <InfoContent>
                {question.tips.map(tip => <Tip key={`tip-${tip.tip_id}`} dangerouslySetInnerHTML={{ __html: tip.tip }} />)}
                <Remarks remarks={question.remarks} />
              </InfoContent>
            </InfoContainer>
          </QuestionInfo>
        )}
        {question.type !== 'checkbox' && (
          <TextField rows="4" multiline fullWidth value={more} onChange={this.onChange} onBlur={this.saveThis} variant="outlined" />
        )}
      </React.Fragment>
    );
  }
}

export default Question;
