import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import GroupItem from './GroupItem';
import Question from './Question';
// import ExpandingList from './ExpandingList/ExpandingList';

const Groups = ({ groups, saveAnswer }) => {
  const initialGroups = groups.filter(group => group.thema === 1);
  const toggleState = initialGroups.map(group => ({ id: `group-${group.groep_id}`, active: true }));
  const [currentGroups, setCurrentGroups] = useState(initialGroups);
  const [groupsToggled, setGroupsToggled] = useState(toggleState);

  useEffect(() => {
    setCurrentGroups(groups.filter(group => group.thema === 1));
  }, [groups]);

  const toggleGroups = (item, value) => {
    const toggled = value
      ? currentGroups.map(group => ({
        id: `group-${group.groep_id}`,
        active: true,
      }))
      : currentGroups.map(group => ({
        id: `group-${group.groep_id}`,
        active: `group-${group.groep_id}` === item,
      }));
    setGroupsToggled(toggled);
  };

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
          toggleActive={toggleGroups}
        >
          {/* <ExpandingList> */}
            {group.questions.sort((a, b) => a.rang - b.rang).map(question => (
              <Question
                key={`question-${question.vraag_id}`}
                question={question}
                saveAnswer={saveAnswer}
              />
            ))}
          {/* </ExpandingList> */}
        </GroupItem>
      </AnimateHeight>
    );
  });
};

Groups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveAnswer: PropTypes.func.isRequired,
};

export default Groups;
