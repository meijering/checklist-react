import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Progress } from 'react-sweet-progress';
import GroupItem, { GroupBar, Name, Nmbr, QuestionContainer } from '../GroupItem';

configure({ adapter: new Adapter() });

describe('GroupItem', () => {
  let group;
  const groupProps = {
    name: 'Title of Group',
    nmbrOfQuestions: 5,
    nmbrOfAnswers: 2,
    toggleQuestions: () => {},
  };

  beforeEach(() => {
    group = mount(<GroupItem {...groupProps}><div>1</div><div>2</div><div>3</div></GroupItem>);
  });

  test('should show the long title of the group', () => {
    expect(group.find(Name).get(0).props.children).toEqual(groupProps.name);
  });

  test('should show the number of questions', () => {
    expect(group.find(Nmbr).get(0).props.children[1]).toEqual(groupProps.nmbrOfQuestions);
  });

  test('should show the percentage of answerred questions', () => {
    expect(group.find(Progress).get(0).props.percent)
      .toEqual((groupProps.nmbrOfAnswers / groupProps.nmbrOfQuestions) * 100);
  });

  test('should contain the questions', () => {
    expect(group.find(QuestionContainer).get(0).props.children).toBe(group.props().children);
  });

  test('should initially hide the questions', () => {
    expect(group.find(QuestionContainer).get(0).props.height).toBe(0);
  });

  test('should have an action to open the questions', () => {
    group.find(GroupBar).get(0).props.onClick();
    group.update();
    expect(group.find(QuestionContainer).get(0).props.height).toBe('auto');
  });
});
