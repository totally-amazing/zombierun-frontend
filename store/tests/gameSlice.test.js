import reducer, { startGame, switchRole } from '../gameSlice';

jest.mock('../../service/game');

describe('gameReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      id: '',
      mode: '',
      role: 'human',
      totalRecord: {},
      recentRecord: {},
      result: {},
      speed: 0,
      time: 0,
    };
  });

  it('initialState를 반환한다', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('switchRole 액션을 보내면 role 상태를 업데이트한다', () => {
    expect(reducer(initialState, switchRole('zombie'))).toEqual({
      ...initialState,
      role: 'zombie',
    });
  });

  it('startGame 액션을 보내면 id, mode, speed, time 상태를 업데이트한다', () => {
    const gameInfo = {
      id: 'gameId',
      mode: 'survival',
      speed: 10,
      time: 30,
    };
    expect(reducer(initialState, startGame(gameInfo))).toEqual({
      ...initialState,
      ...gameInfo,
    });
  });
});
