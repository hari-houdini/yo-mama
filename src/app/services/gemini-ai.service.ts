import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

import {
  DEFAULT_PLAYER,
  ERROR_MESSAGES,
  type TurnCompleteResponse,
  type JudgeResponse,
  type JudgeType,
  OFFENSIVE_TAG,
} from '../app.types';
import { ErrorHandler } from '../utils/error.handler';
import { isSuccessErrorResponse, isJudgeResponse } from '../utils/type.handler';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private genAIModel: GenerativeModel | null;
  private promptPrefix: string;
  private promptInstructions: string[];
  private judgeInstructions: string[];

  constructor() {
    if (process.env['GOOGLE_API_KEY']) {
      const genAI = new GoogleGenerativeAI(process.env['GOOGLE_API_KEY']);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      this.genAIModel = model;
    } else {
      this.genAIModel = null;
    }

    this.promptPrefix = 'Yo mama is';
    this.promptInstructions = [
      'Give an awesome "yo mama" roast reply for this "yo mama" message.',
      'If the message has grammatical errors, reply with a roast for that.',
      `If the message is very offensive or inappropriate, just reply with "${OFFENSIVE_TAG}"`,
    ];
    this.judgeInstructions = [
      'Judge the "yo mama" roasts and rate both individually on a scale of 0 to 10.',
      'Reply in the form of json with the following keys:',
      'ai: The rating of the ai roast.',
      'human: The rating of the human roast.',
      'rating: The overall rating of the roast.',
      'The roasts for ai and human are as follows:',
    ];
  }

  checkUserMessage(msg: string): string {
    let userMessage = msg.toLowerCase().trim();
    if (!msg.startsWith(this.promptPrefix)) {
      userMessage = `${this.promptPrefix} ${userMessage}`;
    }

    return userMessage;
  }

  createModelPrompt(msg: string): string {
    let prompt = this.promptInstructions.join(' ');
    prompt += `\n\n"${msg}"`;

    return prompt;
  }

  createJudgePrompt({ ai, human }: JudgeType): string {
    let prompt = this.judgeInstructions.join(' ');
    prompt += `\n\nAI: "${ai}"\nHuman: "${human}"`;

    return prompt;
  }

  isMessageInappropriate(msg: string): boolean {
    return msg.toUpperCase().trim() === OFFENSIVE_TAG;
  }

  async getAIResponse(msg: string): Promise<TurnCompleteResponse> {
    if (!this.genAIModel) {
      throw new ErrorHandler({
        winner: 'Human',
        message: ERROR_MESSAGES['NO_AI'],
      });
    }

    const userMessage = this.checkUserMessage(msg);
    const prompt = this.createModelPrompt(userMessage);

    try {
      const result = await this.genAIModel.generateContent(prompt);
      const response = result.response.text();

      if (this.isMessageInappropriate(response)) {
        throw new ErrorHandler({
          winner: 'AI',
          message: ERROR_MESSAGES['OFFENSIVE'],
        });
      }

      return {
        message: response,
      };
    } catch (err: any) {
      if (isSuccessErrorResponse(err)) {
        throw err;
      }
      throw new ErrorHandler({
        winner: DEFAULT_PLAYER,
        message: ERROR_MESSAGES['DEFAULT'],
      });
    }
  }

  async judgeRoasts({ ai, human }: JudgeType): Promise<JudgeResponse> {
    if (!this.genAIModel) {
      throw new ErrorHandler({
        winner: 'Human',
        message: ERROR_MESSAGES['NO_AI'],
      });
    }

    const userMessage = this.checkUserMessage(human);
    const aiMessage = this.checkUserMessage(ai);
    const prompt = this.createJudgePrompt({
      ai: aiMessage,
      human: userMessage,
    });

    try {
      const result = await this.genAIModel.generateContent(prompt);
      const response = result.response.text();

      if (isJudgeResponse(response)) {
        return response;
      }

      throw new ErrorHandler({
        winner: DEFAULT_PLAYER,
        message: ERROR_MESSAGES['DEFAULT'],
      });
    } catch (err: any) {
      if (isSuccessErrorResponse(err)) {
        throw err;
      }
      throw new ErrorHandler({
        winner: DEFAULT_PLAYER,
        message: ERROR_MESSAGES['DEFAULT'],
      });
    }
  }
}
