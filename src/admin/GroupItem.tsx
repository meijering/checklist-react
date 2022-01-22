/* eslint-disable no-mixed-operators, space-infix-ops */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useOvermind } from '../overmind';

import { Group } from '../overmind/state';

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin: 0 0.5em;
`;

export const Nmbr = styled.span`
  color: #222;
`;
interface IAdminGroupItem {
  group: Group;
}

const AdminGroupItem: React.FC<IAdminGroupItem> = ({
  group,
}: IAdminGroupItem) => {
  const { actions }: any = useOvermind();
  const formik = useFormik({
    initialValues: group,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log(values);
      actions.saveGroup(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        multiline
        id="naam"
        name="naam"
        label="Vraag"
        value={formik.values.naam}
        onChange={formik.handleChange}
        error={formik.touched.naam && Boolean(formik.errors.naam)}
        helperText={formik.touched.naam && formik.errors.naam}
      />
      Aantal vragen: {group.questions.length}<br />
      Thema: {group.thema}<br />
      <Button color="primary" variant="contained" type="submit">
          opslaan
      </Button>
    </form>
  );
};

export default AdminGroupItem;
