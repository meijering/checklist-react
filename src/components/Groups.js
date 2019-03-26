import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import AnimateHeight from 'react-animate-height';
import GroupItem from './GroupItem';
import Question from './Question';
import ExpandingList from './ExpandingList/ExpandingList';

class Groups extends PureComponent {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    saveAnswer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const currentGroups = props.groups.filter(group => group.thema === 1);
    this.state = {
      currentGroups,
      groupsToggled: currentGroups.map(group => ({ id: `group-${group.groep_id}`, active: true })),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevGroups } = prevState;
    const currentGroups = nextProps.groups.filter(group => group.thema === 1);
    if (!equal(prevGroups, currentGroups)) {
      return { currentGroups };
    }
    return null;
  }

  toggleGroups = (item, value) => {
    const { currentGroups } = this.state;
    const groupsToggled = !value
      ? currentGroups.map(group => ({
        id: `group-${group.groep_id}`,
        active: true,
      }))
      : currentGroups.map(group => ({
        id: `group-${group.groep_id}`,
        active: `group-${group.groep_id}` === item,
      }));
    this.setState({ groupsToggled });
  }

  render() {
    const { saveAnswer } = this.props;
    const { currentGroups, groupsToggled } = this.state;
    return currentGroups.map((group) => {
      const checkQuestions = group.questions.filter(q => q.type === 'checkbox');
      const nmbrOfQuestions = checkQuestions.length;
      const nmbrOfAnswers = checkQuestions.filter(cq => cq.answers.length > 0
        && cq.answers[0].antwoord === '1').length;
      const { active } = groupsToggled.find(qt => qt.id === `group-${group.groep_id}`);
      return (
        <AnimateHeight
          key={`group-${group.groep_id}`}
          duration={300}
          animateOpacity
          height={active ? 'auto' : 0}
        >
          <GroupItem
            id={`group-${group.groep_id}`}
            name={group.naam}
            nmbrOfQuestions={nmbrOfQuestions}
            nmbrOfAnswers={nmbrOfAnswers}
            toggleActive={this.toggleGroups}
          >
            <ExpandingList>
              {group.questions.sort((a, b) => a.rang - b.rang).map(question => (
                <Question
                  key={`question-${question.vraag_id}`}
                  question={question}
                  saveAnswer={saveAnswer}
                />
              ))}
            </ExpandingList>
          </GroupItem>
        </AnimateHeight>
      );
    });
  }
}

export default Groups;
