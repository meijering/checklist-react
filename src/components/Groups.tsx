import React, { useState, useEffect } from 'react'
import { useOvermind } from '../overmind'
import { Group, Question } from '../overmind/state'
import AnimateHeight from 'react-animate-height'
import GroupItem from './GroupItem'
import QuestionEl from './Question'

const Groups: React.FC = () => {
  const { state } = useOvermind()
  const saveAnswer = () => {}

  const [currentGroups, setCurrentGroups] = useState<any>(state.themedGroups)
  const [activeItem, setActiveItem] = useState<any>()

  useEffect(() => {
    setCurrentGroups(state.themedGroups)
  }, [state.themedGroups])

  const toggleGroups = (item: number, value: boolean) => {
    setActiveItem(value ? undefined : item)
  };

  return currentGroups.map((group: Group) => {
    const checkQuestions = group.questions.filter((q: Question) => q.type === 'checkbox');
    const nmbrOfQuestions = checkQuestions.length
    const nmbrOfAnswers = checkQuestions.filter((cq: Question) => cq.answers.length > 0
      && cq.answers[0].antwoord === '1').length
    return (
      <AnimateHeight
        key={`group-${group.groep_id}`}
        duration={300}
        animateOpacity
        height={!activeItem || group.groep_id === activeItem ? 'auto' : 0}
      >
        <GroupItem
          id={group.groep_id}
          name={group.naam}
          nmbrOfQuestions={nmbrOfQuestions}
          nmbrOfAnswers={nmbrOfAnswers}
          toggleActive={toggleGroups}
        >
          {/* <ExpandingList> */}
            {group.questions.map(question => (
              <QuestionEl
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

export default Groups;
