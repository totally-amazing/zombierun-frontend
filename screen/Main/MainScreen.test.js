import React from 'react';
import renderer from 'react-test-renderer';

import MainScreen from './MainScreen';

const navigation = {
  foo: jest.fn(),
};

it('renders correcntly', () => {
  const tree = renderer.create(<MainScreen navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('has 2 child', () => {
  const tree = renderer.create(<MainScreen navigation={navigation} />).toJSON();
  expect(tree.children.length).toBe(2);
});
