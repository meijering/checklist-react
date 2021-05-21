import React, { useState, ChangeEvent } from 'react';
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

import { useOvermind } from '../overmind';
import { Question } from '../overmind/state';
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

const setLastAnswer = (question: Question) => (question.answers
  ? question.answers.map(a => a.antwoord)[0]
  : '');

interface QuestionProps {
  question: Question;
  showDetail?: boolean;
}

const QuestionEl: React.FC<QuestionProps> = ({ question, showDetail = false }: QuestionProps) => {
  const { state, actions }: any = useOvermind();
  const [more, setMore] = useState(setLastAnswer(question));

  const lastAnswer = question.answers
    ? question.answers.map(a => a.antwoord)[0] === '1'
    : false;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMore(e.currentTarget.value);
  };

  const saveCheck = () => {
    actions.saveAnswer({ question: question.vraagId, answer: lastAnswer ? '' : '1' });
  };

  const saveThis = () => {
    if (more !== setLastAnswer(question)) {
      actions.saveAnswer({ question: question.vraagId, answer: more });
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
                width={3}
                height={24}
                margin="2px"
                color="#008025"
                loading={state.isSaving === question.vraagId}
              />
            </Loader>
            <FormControlLabel
              control={(
                <Check
                  checked={lastAnswer}
                  onChange={() => saveCheck()}
                  value="1"
                  disabled={!!state.isSaving}
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
              {question.tips.map(tip => <Tip key={`tip-${tip.tipId}`} dangerouslySetInnerHTML={{ __html: tip.tip }} />)}
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

export default QuestionEl;
