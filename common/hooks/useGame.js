import { BASE_URL } from '@env';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import GameService from '../../service/game';
import HttpClient from '../../network/http';
import Socket from '../../network/socket';

const httpClient = new HttpClient(BASE_URL);
const socket = new Socket(BASE_URL);
const gameService = new GameService(httpClient, socket);

export const useRecentGameRecord = (userId, onSuccess, onFailure) => {
  useEffect(() => {
    gameService.getRecentRecord(userId).then(onSuccess).catch(onFailure);
  }, [gameService]);
};

export const useTotalGameRecord = (userId, onSuccess, onFailure) => {
  useEffect(() => {
    gameService.getTotalRecord(userId).then(onSuccess).catch(onFailure);
  }, [gameService]);
};

export const useGameEnd = (result, onFailure) => {
  const userId = useSelector((state) => state.user.id);

  const { mode, isWinner, time, speed, distance } = result;
  const gameResult = {
    mode,
    player: {
      isWinner,
      time,
      speed,
      distance,
      id: userId,
    },
  };

  useEffect(() => {
    if (mode === 'solo') {
      gameService.create(gameResult).catch(onFailure);
    } else {
      gameService.emitDie(userId);
      gameService.update(gameResult.player).catch(onFailure);
    }
  }, [gameService]);
};
