import React from 'react';
import renderer from 'react-test-renderer';

import ProfileButton from './ProfileButton';

const iconName = '';
const title = 'foo';
const onPress = jest.fn();
const renderButtonElement = jest.fn();

it('render test', () => {
  const tree = renderer
    .create(
      <ProfileButton
        iconName={iconName}
        title={title}
        onPress={onPress}
        renderButtonElement={renderButtonElement}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
