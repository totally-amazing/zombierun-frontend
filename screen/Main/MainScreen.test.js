import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import createTestStore from '../../common/utils/testStore';
import MainScreen from './MainScreen';

jest.mock('@react-native-async-storage/async-storage');

const navigation = {
  foo: jest.fn(),
};
let store;

describe('랜더링 테스트', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  it('프롭스를 넘겨 받을 시에 스냅샷과 일치하게 랜더 되야한다.', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MainScreen navigation={navigation} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('랜더 시에 형성되는 트리는 두 개의 자식 만을 가져야 한다.', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MainScreen navigation={navigation} />
        </Provider>,
      )
      .toJSON();
    expect(tree.children.length).toBe(2);
  });
});
