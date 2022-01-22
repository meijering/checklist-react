import React from 'react';
// import fetchMock from 'fetch-mock';
// import sinon from 'sinon';
// import ReactTestUtils from 'react-dom/test-utils';

import { /* configure, */ mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

import Groups from '../Groups';
// import { promises } from 'fs';

// const evt = { preventDefault: () => { } }

// const inputData = {

// };
const groupData = [
  {
    groepId: '1',
    navigatieNaam: 'Energie & water',
    naam: 'Energie & water',
    thema: '1',
    total: 16,
    percentage: 12.5,
  },
  {
    groepId: '2',
    navigatieNaam: 'Afval',
    naam: 'Afval',
    thema: '1',
    total: 16,
    percentage: 50,
  },
  {
    groepId: '3',
    navigatieNaam: 'Voeding, opvoeding & verzorging',
    naam: 'Voeding, opvoeding & verzorging',
    thema: '1',
    total: 16,
    percentage: 43,
  },
  {
    groepId: '4',
    navigatieNaam: 'Inkoop',
    naam: 'Inkoop',
    thema: '1',
    total: 16,
    percentage: 12,
  },
  {
    groepId: '5',
    navigatieNaam: 'Mobiliteit',
    naam: 'Mobiliteit',
    thema: '1',
    total: 12,
    percentage: 33,
  },
  {
    groepId: '6',
    navigatieNaam: 'Communicatie  & verankering',
    naam: 'Communicatie  & verankering',
    thema: '1',
    total: 16,
    percentage: 50,
  },
];

describe('Groups', () => {
  beforeEach(() => {
  });

  it('should show a list with 6 groups', () => {
    const groupsElement = mount(<Groups groups={groupData} />);
    console.log(groupsElement);
  });
});
