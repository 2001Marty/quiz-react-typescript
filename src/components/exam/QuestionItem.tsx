import { useEffect, useState } from 'react'
import { Typography, Button, ButtonGroup, Grid, Box, ButtonBase, Card } from "@mui/material"

import { Question } from '../../types/Question'
import { useNavigate } from 'react-router-dom';
import { submitExam } from '../../services/handleExam'


interface QuestionItemProps {
    question: Question,
    examId: string | undefined,
    email: string | undefined,
    isLast: boolean,
}

const QuestionItem = (props: QuestionItemProps) => {
    const { question, examId, email, isLast } = props;
    const navigate = useNavigate();
    const correctAnswer = question.correct;
    const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]);

    const changeQuestion = (next: boolean, questionId: number, correct: number[]) => {
        if (next) {
            const correctAnswer = correct.sort((a, b) => a - b);
            const updatedUser = JSON.parse(localStorage.getItem(email ? email : 'unknown') as string);
            const yourAnswer = selectedAnswer.sort((a, b) => a - b);
            updatedUser.questions[questionId].answer = yourAnswer;

            if (correctAnswer.toString() === yourAnswer.toString()) {
                updatedUser.questions[questionId].isCorrect = true;
            }
            localStorage.setItem(email ? email : 'unknown', JSON.stringify(updatedUser));
            setSelectedAnswer([]);
            if (isLast) {
                navigate(`/exam${examId}/submit`)
            }
            navigate(`/exam${examId}/question${question.id + 1}/email=${email}`)
        } else {
            setSelectedAnswer([]);
            navigate(`/exam${examId}/question${question.id - 1}/email=${email}`)
        }
    }

    const addSelectedAnswer = (index: number) => {
        if (!selectedAnswer.includes(index)) {
            setSelectedAnswer((prev) => [...prev, index]);
        } else {
            const newSelectedAnswer = selectedAnswer.filter(a => a !== index);
            setSelectedAnswer(newSelectedAnswer);
        }
    }

    useEffect(() => {
        if ((JSON.parse(localStorage.getItem(email ? email : 'unknown') as string).isDone) === true) {
            navigate(`/exam${examId}/attempts/email=${email}`)
        }
    })

    const handleSubmit = () => submitExam(navigate, question.id, selectedAnswer, email, correctAnswer, examId)

    return (
        <Box key={question.id}>
            <Typography variant="h5">{question.text}</Typography>
            <Typography variant="caption">{question.multipleAnswers ? 'multiple answers' : 'single answer'} is correct</Typography>
            <Grid key={question.id} container gap={4} direction="row" justifyContent={"center"} mt={5} >
                {question.answers.map((answer) => {
                    return (
                        <Grid key={answer.id + "answer"} item xs={5}>
                            <ButtonBase onClick={() => { addSelectedAnswer(answer.id) }}>
                                <Card sx={{ width: "40vw", height: 50, backgroundColor: selectedAnswer.includes(answer.id) ? "#D3D3D3" : "white" }} variant="outlined">
                                    <Typography textAlign="center" variant="h6">
                                        {answer.answer}
                                    </Typography>
                                </Card>
                            </ButtonBase>
                        </Grid>
                    )
                })}
            </Grid>
            <ButtonGroup key={question.id + "button"}>
                {question.id !== 0 && (
                    <Button onClick={() => changeQuestion(false, question.id, question.correct)} sx={{ mt: 5 }} variant="outlined">Previous</Button>
                )}
                {isLast
                    ? <Button sx={{ mt: 5 }} variant="contained" onClick={(e) => handleSubmit()}>Submit</Button>
                    : <Button onClick={() => changeQuestion(true, question.id, question.correct)} sx={{ mt: 5 }} variant="outlined">Next</Button>}
            </ButtonGroup>
        </Box>
    )
}


export default QuestionItem
