import { BASE_URL } from '@env';
import { useEffect } from 'react';

import GameService from '../../service/game';
import HttpClient from '../../network/http';

const httpClient = new HttpClient(BASE_URL);
const gameService = new GameService(httpClient);

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
