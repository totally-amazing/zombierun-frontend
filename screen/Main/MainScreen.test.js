import React from 'react';
import renderer from 'react-test-renderer';

import MainScreen from './MainScreen';

const navigation = {
  foo: jest.fn(),
};

describe('랜더링 테스트', () => {
  it('프롭스를 넘겨 받을 시에 스냅샷과 일치하게 랜더 되야한다.', () => {
    const tree = renderer
      .create(<MainScreen navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('랜더 시에 형성되는 트리는 두 개의 자식 만을 가져야 한다.', () => {
    const tree = renderer
      .create(<MainScreen navigation={navigation} />)
      .toJSON();
    expect(tree.children.length).toBe(2);
  });
});
