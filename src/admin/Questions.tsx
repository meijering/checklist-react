import { RouteComponentProps } from '@reach/router';
import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import { useOvermind } from '../overmind';
import { Question } from '../overmind/state';
import ExpandingList from '../components/ExpandingList/ExpandingList';

export const SearchBox = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 0;
`;

interface IExtendedQuestion {
  display?: boolean;
  question: Question;
}

const QuestionEl: FC<IExtendedQuestion> = React.memo(({
  display = true,
  question,
}: IExtendedQuestion) => {
  const { state, actions }: any = useOvermind();
  const formik = useFormik({
    initialValues: {
      ...question,
      groepId: `${question.groepId}`,
    },
    onSubmit: (values) => {
      actions.saveQuestion(values);
    },
  });

  return display ? (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        multiline
        id="vraag"
        name="vraag"
        label="Vraag"
        value={formik.values.vraag}
        onChange={formik.handleChange}
        error={formik.touched.vraag && Boolean(formik.errors.vraag)}
        helperText={formik.touched.vraag && formik.errors.vraag}
      />
      <RadioGroup aria-label="groep" name="groepId" value={formik.values.groepId} onChange={formik.handleChange}>
        {state.themedGroups.map((group: any) => (
          <FormControlLabel key={`label-${group.groepId}`} value={`${group.groepId}`} control={<Radio />} label={`${group.navigatieNaam}`} />
        ))}
      </RadioGroup>
      <Button color="primary" variant="contained" type="submit">
          opslaan
      </Button>
    </form>
  ) : null;
});

const AdminQuestions: FC<RouteComponentProps> = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedGroups, setCheckedGroups] = useState<number[]>([]);
  const [extendedQuestions, setExtendedQuestions] = useState<IExtendedQuestion[]>([]);

  const { state, actions }: any = useOvermind();

  useEffect(() => {
    actions.getQuestions();
  }, []);

  useEffect(() => {
    setCheckedGroups(state.themedGroups.map((g) => g.groepId));
  }, [state.themedGroups]);

  useEffect(() => {
    setExtendedQuestions(state.questions.map((question) => ({ display: true, question })));
  }, [state.questions]);

  const isDisplayed = (q) => {
    return (
      checkedGroups.includes(q.groepId) &&
      q.vraag.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  };

  const setFilteredQuestions = () => extendedQuestions.map((q) => ({
    display: isDisplayed(q.question),
    question: q.question,
  }));

  useEffect(() => {
    setExtendedQuestions(setFilteredQuestions());
  }, [searchValue, checkedGroups]);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value;
    setSearchValue(safeInputValue);
  };

  const onGroupChange = (e: ChangeEvent<{}>, checked: boolean): void => {
    const element = e.currentTarget as HTMLInputElement;
    const safeInputValue: number = +element.value;
    if (checked && !checkedGroups.includes(safeInputValue)) {
      setCheckedGroups([
        ...checkedGroups,
        safeInputValue,
      ]);
    } else {
      setCheckedGroups(checkedGroups.filter((g) => g !== safeInputValue));
    }
  };

  return extendedQuestions?.length > 0 ? (
    <>
      <SearchBox>
        <TextField
          fullWidth
          id="searchValue"
          name="searchValue"
          label="Filter op vraag"
          value={searchValue}
          inputProps={{ onChange }}
        />
        {state.themedGroups.map((group: any) => (
          <FormControlLabel
            key={`label-${group.groepId}`}
            value={`${group.groepId}`}
            control={<Checkbox
              defaultChecked
            />}
            label={`${group.navigatieNaam}`}
            onChange={onGroupChange}
          />
        ))}
      </SearchBox>
      <ExpandingList>
        {extendedQuestions.map((question: IExtendedQuestion) => {
          return (
            <QuestionEl display={question.display} data-name={`${question.question.vraag}`} key={question.question.vraagId} question={question.question} />
          );
        })}
      </ExpandingList>
    </>
  ) : null;
};

export default AdminQuestions;
