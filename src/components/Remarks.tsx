import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { Remark } from '../overmind/state';

const Item = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const Label = styled.div`
  width: 100px;
`;

const convertDate = (d?: Date | null) => {
  const date = d ? new Date(d) : new Date();
  return (
    [
      `00${date.getDate()}`.slice(-2),
      `00${date.getMonth() + 1}`.slice(-2),
      date.getFullYear(),
    ].join('-'));
};

interface RemarkProps {
  remarks: Remark[];
}

const Remarks: React.FC<RemarkProps> = ({ remarks }: RemarkProps) => (
  <React.Fragment>
    {remarks.map(remark => (
      <Item key={`remark-${remark.opmerkingId}`}>
        <Label>{convertDate(remark.ingevoerdOp)}</Label>
        {remark.opmerking}
      </Item>
    ))}
    <Item>
      <Label>{convertDate()}</Label>
      <TextField rows="4" multiline fullWidth value="" variant="outlined" />
    </Item>
  </React.Fragment>
);

export default Remarks;
