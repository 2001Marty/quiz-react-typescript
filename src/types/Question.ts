export interface Question {
    id: number;
    type: AnswerType;
    multipleAnswers: boolean;
    text: string;
    answers: AnswerSelect[] | string;
    correct: number[] | string;
}

export interface AnswerSelect {
    id: number;
    answer: string;

}


export enum AnswerType{
    SELECT = 'select',
    TEXT = 'text'
}
