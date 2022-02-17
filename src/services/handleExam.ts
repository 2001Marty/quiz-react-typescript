import { NavigateFunction } from "react-router-dom";

export const submitExam = (navigate: any, questionId: number, selectedAnswer: number[], email: string | undefined, correct: number[] | undefined, examId: string | undefined) => {
    const updatedUser = JSON.parse(localStorage.getItem(email ? email : 'unknown') as string);
    const correctAnswer = correct?.sort((a, b) => a - b);
    const yourAnswer = selectedAnswer.sort((a, b) => a - b);
    updatedUser.questions[questionId].answer = yourAnswer;
    if (correctAnswer?.toString() === yourAnswer.toString()) {
        updatedUser.questions[questionId].isCorrect = true;
    }
    updatedUser.examId = examId;
    updatedUser.isDone = true;
    localStorage.setItem(email ? email : 'unknown', JSON.stringify(updatedUser));
    navigate(`/exam${examId}/attempts/email=${email}`)
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
    localStorage.removeItem(email ? email : 'unknown')
    navigate(`/exam/email=${email}`)
}

export const startExam = (email: string | undefined, navigate: NavigateFunction, examId: string | undefined) => {
    initializeExam(email, examId);
    navigate(`/exam${examId}/question0/email=${email}`);
}