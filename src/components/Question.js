import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Icon } from 'react-icons-kit';
/* eslint-disable camelcase */
import { ic_lightbulb_outline } from 'react-icons-kit/md/ic_lightbulb_outline';
import { ic_comment } from 'react-icons-kit/md/ic_comment';
/* eslint-enable camelcase */
import AnimateHeight from 'react-animate-height';

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 0;
`;

const Dots = withStyles({
  root: {
    padding: '1px',
    marginLeft: '8px',
  },
})(IconButton);

const Check = withStyles({
  root: {
    flex: '0 0 auto',
    height: 'auto',
    padding: '0',
    marginRight: '12px',
    marginLeft: '2px',
  },
})(Checkbox);

const QuestionBox = styled.div`
  padding-right: 6px;
  line-height: 24px;
`;
export const QuestionInfo = styled(AnimateHeight)`
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tip = styled.div`
  margin-bottom: 5px;
`;

const Remark = styled.div`
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
  }
  constructor(props) {
    super(props);
    this.state = {
      more: this.setLastAnswer(),
      showDetail: false,
    };
  }

  onChange = (e) => {
    this.setState({ more: e.target.value });
  };

  getLastAnswer = () => (this.props.question.answers ?
    this.props.question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
      .map(a => a.antwoord)[0] === '1' : false);

  setLastAnswer = () => (this.props.question.answers ?
    this.props.question.answers.sort((a, b) => new Date(b.ingevoerd_op) - new Date(a.ingevoerd_op))
      .map(a => a.antwoord)[0] : '');

  saveCheck = () => this.props.saveAnswer(this.props.question.vraag_id, this.getLastAnswer() ? '' : '1');

  saveThis = () => {
    if (this.state.more !== this.setLastAnswer()) {
      this.props.saveAnswer(this.props.question.vraag_id, this.state.more);
    }
  }

  toggleTips = () => {
    this.setState(prevState => ({ showDetail: !prevState.showDetail }));
  }
  /* eslint-disable camelcase */
  render() {
    const { question } = this.props;
    const { more, showDetail } = this.state;
    return (
      <React.Fragment>
        <Bar>
        {question.type === 'checkbox' &&
        <React.Fragment>
          <Dots aria-label="meer..." onClick={this.toggleTips}>
            <MoreVert />
          </Dots>
          <Check checked={this.getLastAnswer()} onChange={this.saveCheck} value="1" />
        </React.Fragment>
        }
        <QuestionBox>{question.vraag}</QuestionBox>
        </Bar>
        {(question.tips || question.remarks) &&
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
                {question.remarks.map(remark => <Remark key={`remark-${remark.opmerking_id}`}>{remark.opmerking}</Remark>)}
              </InfoContent>
            </InfoContainer>
          </QuestionInfo>
        }
        {question.type !== 'checkbox' &&
          <TextField rows="4" multiline fullWidth value={more} onChange={this.onChange} onBlur={this.saveThis} variant="outlined" />
        }
      </React.Fragment>
    );
  }
}

export default Question;
