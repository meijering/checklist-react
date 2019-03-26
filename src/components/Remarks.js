import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Item = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const Label = styled.div`
  width: 100px;
`;

const convertDate = (d) => {
  const date = d ? new Date(d) : new Date();
  // console.log(d.getDate());
  return (
    [
      `00${date.getDate()}`.slice(-2),
      `00${date.getMonth() + 1}`.slice(-2),
      date.getFullYear(),
    ].join('-'));
};

const Remarks = ({ remarks }) => (
  <React.Fragment>
    {remarks.map(remark => (
      <Item key={`remark-${remark.opmerking_id}`}>
        <Label>{convertDate(remark.ingevoerd_op)}</Label>
        {remark.opmerking}
      </Item>
    ))}
    <Item>
      <Label>{convertDate()}</Label>
      <TextField rows="4" multiline fullWidth value="" variant="outlined" />
    </Item>
  </React.Fragment>
);

Remarks.propTypes = {
  remarks: arrayOf(shape()).isRequired,
};

export default Remarks;
