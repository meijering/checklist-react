import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getGroups } from '../utils/APICalls';
import GroupItem from './GroupItem';
// import { Button } from 'react-material-design'

class Question extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.error = '';
  }

  componentDidMount() {
    getGroups()
    .then((result) => {
      console.log(result);
        this.setState({ groups: result.data });
      // state.credentials.password = ''; // no need to keep password
      // this.setState(state);
    });
  }

  render() {
    return this.state.groups.filter(group => group.thema === 1).map(group => {
      const checkQuestions = group.questions.filter(q => q.type === 'checkbox');
      const nmbrOfQuestions = checkQuestions.length;
      const nmbrOfAnswers = checkQuestions.filter(cq => cq.answers.length > 0 && cq.answers[0].antwoord==='1').length;
      return (
        <GroupItem
          key={group.groep_id}
          name={group.naam}
          nmbrOfQuestions={nmbrOfQuestions}
          nmbrOfAnswers={nmbrOfAnswers}>
            {group.questions.map(question => <div key={question.vraag_id}>{question.vraag}</div>)}
        </GroupItem>
      );
    });
  }
}

export default Question;
