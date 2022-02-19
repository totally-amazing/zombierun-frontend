import reducer, { toggleEffect, toggleModal, toggleSound } from '../uiSlice';
import { getRecentRecord } from '../gameSlice';

describe('uiSlice', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      isModalVisible: false,
      canHearingEffect: true,
      canHearingBGMusic: true,
      isLoading: true,
    };
  });

  it('initial Status 체크', () => {
    expect(reducer(undefined, {})).toEqual({
      isModalVisible: false,
      canHearingEffect: true,
      canHearingBGMusic: true,
      isLoading: true,
    });
  });

  it('toggleEffect 액션이 실행되면 canHearingEffect 상태 값이 변화한다', () => {
    expect(reducer(initialState, toggleEffect())).toEqual({
      ...initialState,
      canHearingEffect: false,
    });
  });

  it('toggleSound 액션이 실행되면 canHearingBGMusic 상태 값이 변환한다', () => {
    expect(reducer(initialState, toggleSound())).toEqual({
      ...initialState,
      canHearingBGMusic: false,
    });
  });

  it('toogleModal 액션이 실행되면 isModalVisible의 상태 값이 변환한다', () => {
    expect(reducer(initialState, toggleModal())).toEqual({
      ...initialState,
      isModalVisible: true,
    });
  });

  it('getRecentRecord 액션이 FulFilled 되면 isLoading 상태가 false로 전환된다.', () => {
    const action = getRecentRecord.fulfilled();

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});
