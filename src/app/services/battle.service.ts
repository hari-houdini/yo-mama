import { inject, Injectable } from '@angular/core';

import {
  DEFAULT_PLAYER,
  ERROR_MESSAGES,
  type Player,
  type BattleLog,
  type JudgeResponse,
  type Result,
} from '../app.types';
import { GeminiService } from './gemini-ai.service';
import { ErrorHandler } from '../utils/error.handler';
import { isSuccessErrorResponse } from '../utils/type.handler';
// import { logger } from '../utils/logger.decorator';

@Injectable({ providedIn: 'root' })
export class BattleService {
  private gService = inject(GeminiService);

  private winner: Result;
  private turns: number;
  private player: Player;
  private battleLogs: BattleLog[];

  constructor() {
    this.turns = 0;
    this.player = DEFAULT_PLAYER;
    this.battleLogs = [];
    this.winner = 'Draw';
  }

  // battleLogs$ = this.battleLogs.asObservable();

  getBattleLogs(): BattleLog[] {
    return this.battleLogs;
  }

  getTurns(): number {
    return this.turns;
  }

  getPlayer(): Player {
    return this.player;
  }

  getWinner(): Result {
    return this.winner;
  }

  addBattleLog(log: BattleLog): void {
    this.battleLogs.push(log);
  }

  increaseTurnCount(): void {
    this.turns += 1;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  setWinner(winner: Result): void {
    this.winner = winner;
  }

  reset(): void {
    this.turns = 0;
    this.player = DEFAULT_PLAYER;
    this.battleLogs = [];
    this.winner = 'Draw';
  }

  // @logger
  rateScores(scores: JudgeResponse): Result {
    const aiScore = scores?.ai ?? 0;
    const humanScore = scores?.human ?? 0;

    switch (true) {
      case aiScore > humanScore:
        return 'AI';
      case aiScore < humanScore:
        return 'Human';
      default:
        return 'Draw';
    }
  }

  // @logger
  async addResponse(message: string): Promise<BattleLog> {
    const roast = message.trim();
    if (roast.length === 0) {
      throw new ErrorHandler({
        winner: 'Draw',
        message: ERROR_MESSAGES['EMPTY_RESPONSE'],
      });
    }

    try {
      const reply = await this.gService.getAIResponse(roast);

      const judgeResponse = await this.gService.judgeRoasts({
        ai: reply.message,
        human: roast,
      });

      const winner = this.rateScores(judgeResponse);

      const log: BattleLog = {
        results: winner,
        message: {
          ai: reply.message,
          human: roast,
        },
        score: {
          ai: judgeResponse?.ai ?? 0,
          human: judgeResponse?.human ?? 0,
        },
      };

      this.addBattleLog(log);

      return log;
    } catch (err: any) {
      if (isSuccessErrorResponse(err)) {
        const log: BattleLog = {
          results: err.winner,
          message: {
            ai: err.message,
            human: roast,
          },
          score: {
            ai: 0,
            human: 0,
          },
        };

        this.setWinner(err.winner);
        this.addBattleLog(log);
        throw err;
      }
      throw new ErrorHandler({
        winner: DEFAULT_PLAYER,
        message: ERROR_MESSAGES['DEFAULT'],
      });
    }
  }
}
