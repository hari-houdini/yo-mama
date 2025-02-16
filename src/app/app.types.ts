/** TYPES */
export const players = ['Human', 'AI'] as const;
export type Player = (typeof players)[number];

export const results = ['Human', 'AI', 'Draw'] as const;
export type Result = (typeof results)[number];

export type JudgeType = {
  ai: string;
  human: string;
};

export type JudgeResponse = {
  ai: number;
  human: number;
};

export type ErrorResponse = {
  winner: Result;
  message: (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
};

export type VictoryResponse = {
  winner: Player;
  message: (typeof SUCCESS_MESSAGES)[keyof typeof SUCCESS_MESSAGES];
};

export type TurnCompleteResponse = {
  message: string;
};

export type BattleTurnResponse = {
  results: Result;
  score: {
    ai: number;
    human: number;
  };
};

export type BattleLog = BattleTurnResponse & {
  message: JudgeType;
};

export type TurnResponse = TurnCompleteResponse | ErrorResponse;
export type BattleResponse = VictoryResponse | ErrorResponse;

/** CONSTANTS */

export const OFFENSIVE_TAG = 'OFFENSIVE';
export const DEFAULT_PLAYER: Player = 'Human';
export const MAX_TURNS = 10;

export const ERROR_MESSAGES = {
  NO_AI: 'AI model not initialized! Try again later.',
  OFFENSIVE: 'You went too far! You lost the battle.',
  EMPTY_RESPONSE: 'You must provide a response! Try again later.',
  DEFAULT: 'Something went wrong! Try again later.',
};

export const SUCCESS_MESSAGES = {
  AI_CONCEDE: 'AI concedes! You win!',
  HUMAN_CONCEDE: 'You conceded! AI wins!',
  DEFAULT: 'That was a close one! The better one won!',
};
