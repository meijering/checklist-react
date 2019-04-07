import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '@material-ui/core';
import { Icon } from 'react-icons-kit';
/* eslint-disable camelcase */
import { ic_lightbulb_outline } from 'react-icons-kit/md/ic_lightbulb_outline';
import { ic_comment } from 'react-icons-kit/md/ic_comment';
/* eslint-enable camelcase */
import AnimateHeight from 'react-animate-height';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { media } from '../utils/media';
import Remarks from './Remarks';

const Loader = styled.div`
  position: absolute;
  background-color: #ffffff;
  z-index: 2;
  display: block;
  margin: 0 auto;
`;

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
  display: inline-flex;
  align-items: center;
  & span {
    font-size: 18px;
  }
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

const setLastAnswer = question => (question.answers
  ? question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
    .map(a => a.antwoord)[0]
  : '');

const Question = ({ question, saveAnswer, showDetail }) => {
  const [more, setMore] = useState(setLastAnswer(question));
  const [inProgress, setInProgress] = useState(false);
  useEffect(() => {
    setInProgress(false);
  }, [question]);
  const lastAnswer = (question.answers
    ? question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
      .map(a => a.antwoord)[0] === '1'
    : false);

  const onChange = (e) => {
    setMore(e.target.value);
  };

  const saveCheck = () => {
    setInProgress(true);
    saveAnswer(question.vraag_id, lastAnswer ? '' : '1');
  };

  const saveThis = () => {
    if (more !== setLastAnswer(question)) {
      saveAnswer(question.vraag_id, more);
    }
  };

  /* eslint-disable camelcase */
  return (
    <React.Fragment>
      <Bar>
      {question.type === 'checkbox' && (
        <QuestionBox>
          <Loader>
            <ScaleLoader
              widthUnit="px"
              heightUnit="px"
              width={3}
              height={24}
              margin="2px"
              color="#008025"
              loading={inProgress}
            />
          </Loader>
          <FormControlLabel
            control={(
              <Check
                checked={lastAnswer}
                onChange={() => saveCheck()}
                value="1"
                disabled={inProgress}
              />
              )}
            label={question.vraag}
          />
        </QuestionBox>
      )}
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
        <TextField rows="4" multiline fullWidth value={more} onChange={onChange} onBlur={saveThis} variant="outlined" />
      )}
    </React.Fragment>
  );
};

Question.propTypes = {
  question: PropTypes.shape().isRequired,
  saveAnswer: PropTypes.func.isRequired,
  showDetail: PropTypes.bool,
};

Question.defaultProps = {
  showDetail: false,
};

export default Question;
