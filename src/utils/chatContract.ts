export const MAX_QUESTION_LENGTH = 600;
export const MAX_REPLY_LENGTH = 6000;
export const MAX_HISTORY = 4;

export interface ChatTurn {
  role: 'user' | 'model';
  content: string;
}
