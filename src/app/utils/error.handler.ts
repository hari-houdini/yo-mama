import type { ErrorResponse, Result } from '../app.types';

export class ErrorHandler extends Error {
  private winner: Result;
  private desc: string;

  constructor(err: ErrorResponse) {
    super(err.message);
    this.winner = err.winner;
    this.desc = err.message;
  }
}
