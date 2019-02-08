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
    groep_id: '1',
    navigatie_naam: 'Energie & water',
    naam: 'Energie & water',
    thema: '1',
    total: 16,
    percentage: 12.5,
  },
  {
    groep_id: '2',
    navigatie_naam: 'Afval',
    naam: 'Afval',
    thema: '1',
    total: 16,
    percentage: 50,
  },
  {
    groep_id: '3',
    navigatie_naam: 'Voeding, opvoeding & verzorging',
    naam: 'Voeding, opvoeding & verzorging',
    thema: '1',
    total: 16,
    percentage: 43,
  },
  {
    groep_id: '4',
    navigatie_naam: 'Inkoop',
    naam: 'Inkoop',
    thema: '1',
    total: 16,
    percentage: 12,
  },
  {
    groep_id: '5',
    navigatie_naam: 'Mobiliteit',
    naam: 'Mobiliteit',
    thema: '1',
    total: 12,
    percentage: 33,
  },
  {
    groep_id: '6',
    navigatie_naam: 'Communicatie  & verankering',
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
