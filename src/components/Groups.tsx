import React, { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useOvermind } from '../overmind';
import { Group, Question } from '../overmind/state';
import GroupItem from './GroupItem';
import QuestionEl from './Question';

const Groups: React.FC = () => {
  const { state } = useOvermind();

  const [currentGroups, setCurrentGroups] = useState<any>(state.themedGroups);
  const [activeItem, setActiveItem] = useState<any>();

  useEffect(() => {
    setCurrentGroups(state.themedGroups);
  }, [state.themedGroups]);

  const toggleGroups = (item: number, value: boolean) => {
    setActiveItem(value ? undefined : item);
  };

  return currentGroups.map((group: Group) => {
    const checkQuestions = group.questions.filter((q: Question) => q.type === 'checkbox');
    const nmbrOfQuestions = checkQuestions.length;
    const nmbrOfAnswers = checkQuestions.filter((cq: Question) => cq.answers.length > 0
      && cq.answers[0].antwoord === '1').length;
    return (
      <AnimateHeight
        key={`group-${group.groepId}`}
        duration={300}
        animateOpacity
        height={!activeItem || group.groepId === activeItem ? 'auto' : 0}
      >
        {}
        <GroupItem
          id={group.groepId}
          name={group.naam}
          nmbrOfQuestions={nmbrOfQuestions}
          nmbrOfAnswers={nmbrOfAnswers}
          toggleActive={toggleGroups}
        >
          {/* <ExpandingList> */}
          {group.questions.map((question) => (
            <QuestionEl
              key={`question-${question.vraagId}`}
              question={question}
            />
          ))}
          {/* </ExpandingList> */}
        </GroupItem>
      </AnimateHeight>
    );
  });
};

export default Groups;
