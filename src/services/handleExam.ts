import { NavigateFunction } from "react-router-dom";
import { AnswerType, Question } from "../types/Question";


export const submitExam = (navigate: any, questionId: number, selectedAnswer: number[] | string, email: string | undefined, correct: number[] | string | undefined, examId: string | null) => {
    const updatedUser = JSON.parse(localStorage.getItem(email ? email : 'unknown') as string);
    const exam = require(`../data/exam${examId}.json`)
    const question = exam.questions.filter((q : Question) => {return q.id === questionId})[0]
    let correctAnswer: number[] | string = [];
    let yourAnswer: number[] | string = [];
    
    
    if (question.type === AnswerType.SELECT) {
        correctAnswer = (correct as number[])?.sort((a, b) => a - b);
        yourAnswer = (selectedAnswer as number[]).sort((a, b) => a - b);
        updatedUser.questions[questionId].answer = yourAnswer;

        if (JSON.stringify(correctAnswer) === JSON.stringify(yourAnswer)) {
            updatedUser.questions[questionId].isCorrect = true;
        }

    }

    if (question.type === AnswerType.TEXT) {
        yourAnswer = selectedAnswer as string;
        correctAnswer = correct as string;
        updatedUser.questions[questionId].answer = yourAnswer;
    
        if (correctAnswer?.toString() === yourAnswer.toString()) {
            updatedUser.questions[questionId].isCorrect = true;
        }
    }
    
    updatedUser.examId = examId;
    updatedUser.isDone = true;
    localStorage.setItem(email ? email : 'unknown', JSON.stringify(updatedUser));
    navigate(`/exam/attempts/`)
}

const initializeExam = (email: string | undefined, examId: string | undefined) => {
    const questions = (require(`../data/exam${examId}.json`))?.questions;
    const answers = new Array(questions?.length)
    localStorage.setItem(email ? email : 'unknown', JSON.stringify({
        "email": email,
        "questions": answers?.fill({ answer: [], isCorrect: false }),
        "isDone": false,
        "examId": examId
    }));
}

export const deleteExamData = (email: string | undefined,  navigate: NavigateFunction) => {
    localStorage.setItem(email ? email : 'unknown', JSON.stringify({email: email}))
    navigate(`/exam/`)
}

export const startExam = (email: string | undefined, navigate: NavigateFunction, examId: string | undefined) => {
    initializeExam(email, examId);
    navigate(`/exam/question0/`);
}