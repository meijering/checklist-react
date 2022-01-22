import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useOvermind } from '../overmind';
import { Group, Question } from '../overmind/state';
import GroupItem from './GroupItem';
import QuestionEl from './Question';

interface IAllGroups extends RouteComponentProps {
  checked?: boolean;
}

const getCriterium = (checked, question) => {
  if (question.type !== 'checkbox') {
    return false;
  }
  const crit = (question.answers.length > 0 && question.answers[0].antwoord);
  return checked ? crit : !crit;
};

const AllGroups: FC<IAllGroups> = ({ checked = false }) => {
  const { state } = useOvermind();

  const [currentGroups, setCurrentGroups] = useState<any>(state.themedGroups);

  useEffect(() => {
    setCurrentGroups(state.themedGroups);
  }, [state.themedGroups]);

  return currentGroups.map((group: Group) => {
    const checkQuestions = group.questions.filter((q: Question) => q.type === 'checkbox');
    const nmbrOfQuestions = checkQuestions.length;
    const nmbrOfAnswers = checkQuestions.filter((cq: Question) => cq.type === 'checkbox'
      && cq.answers.length > 0
      && cq.answers[0].antwoord === '1').length;
    return (
      <GroupItem
        key={group.groepId}
        id={group.groepId}
        name={group.naam}
        nmbrOfQuestions={nmbrOfQuestions}
        nmbrOfAnswers={nmbrOfAnswers}
      >
        {group.questions
          .filter((question) => getCriterium(checked, question))
          .map((question) => (
            <QuestionEl
              key={`question-${question.vraagId}`}
              question={question}
              showDetail={false}
            />
          ))}
      </GroupItem>
    );
  });
};

export default AllGroups;
