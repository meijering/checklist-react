import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GroupItem from './GroupItem';
import Question from './Question';

class Groups extends PureComponent {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    saveAnswer: PropTypes.func.isRequired,
  }

  render() {
    const { groups, saveAnswer } = this.props;
    return groups.filter(group => group.thema === 1).map((group) => {
      const checkQuestions = group.questions.filter(q => q.type === 'checkbox');
      const nmbrOfQuestions = checkQuestions.length;
      const nmbrOfAnswers = checkQuestions.filter(cq => cq.answers.length > 0 &&
        cq.answers[0].antwoord === '1').length;
      return (
        <GroupItem
          key={group.groep_id}
          name={group.naam}
          nmbrOfQuestions={nmbrOfQuestions}
          nmbrOfAnswers={nmbrOfAnswers}
        >
          {group.questions.sort((a, b) => a.rang - b.rang).map(question =>
            <Question key={question.vraag_id} question={question} saveAnswer={saveAnswer} />)
          }
        </GroupItem>
      );
    });
  }
}

export default Groups;
