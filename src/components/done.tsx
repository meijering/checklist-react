import React, { useState } from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { media } from '../utils/media';

const Content = styled.div`
  max-width: 1000px;
  margin: 5px auto;
  font-family: sans-serif;
`;

const Toolbar = styled.div`
  max-width: 1000px;
  margin: 5px auto;
  font-family: sans-serif;
  width: calc(100% - 5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const A = styled.a`
  cursor: pointer;
  display: block;
  text-align: right;
  max-width: 1000px;
  margin: 20px auto;
  font-family: sans-serif;
`;
const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom:0;
  background-color: rgba(255, 255, 255, 0.6);
  ${media.phone`
    width: calc(100% - 20px);
    padding-right: 20px;
  `}`;

const Title = styled.div`
  display: flex;
  margin-top: 2px;
  align-items: center;
  font-variant: small-caps;
  font-size: 25px;
  font-family: sans-serif;
  ${media.phone`
    font-size: 15px;
    padding-left: 20px;
  `}
`;

const List = styled.ol`
  margin-top: 100px;
  padding-left: 20px;
  margin-left: 0;
  & li {
    padding-top:20px;
  }
  ${media.phone`
    padding-left: 40px;
    padding-right: 40px;
  `}
`;
const Foot = styled.div`
  padding: 20px 0px 20px 20px;
  & a {
    margin-left: 0.5em;
  }
`;

const RegisterDone: React.FC = () => {
  return (
    <React.Fragment>
      <p>Dank!!!</p>
    </React.Fragment>
  );
};

export default RegisterDone;
