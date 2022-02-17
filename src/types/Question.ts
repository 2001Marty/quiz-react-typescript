export interface Question {
    id: number;
    multipleAnswers: boolean;
    text: string;
    answers: Answer[];
    correct: number[];
}

interface Answer {
    id: number;
    answer: string;

}