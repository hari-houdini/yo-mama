import { type ErrorResponse, players, type JudgeResponse } from '../app.types';

export function isWithinRange(value: any): value is number {
  return typeof value === 'number' && value >= 0 && value <= 10;
}

export function isJudgeResponse(response: any): response is JudgeResponse {
  return isWithinRange(response?.ai) && isWithinRange(response?.human);
}

export function isSuccessErrorResponse(
  response: any
): response is ErrorResponse {
  return (
    players.includes(response?.winner) && typeof response.message === 'string'
  );
}
