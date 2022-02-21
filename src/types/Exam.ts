import {Question} from './Question'

export interface Exam {
    title: string;
    description: string;
    background_color: string;
    question: Question[];
}
