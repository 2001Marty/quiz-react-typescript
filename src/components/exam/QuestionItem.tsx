import { useEffect, useState } from 'react'
import { Typography, Button, ButtonGroup, Grid, Box, ButtonBase, Card, TextField } from "@mui/material"

import { Question, AnswerType, AnswerSelect } from '../../types/Question'
import { useNavigate } from 'react-router-dom';
import { submitExam } from '../../services/handleExam';



interface QuestionItemProps {
    question: Question,
    examId: string | null,
    email: string | undefined,
    isLast: boolean,
}

const QuestionItem = (props: QuestionItemProps) => {
    const { question, examId, email, isLast } = props;
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState<number[] | string>([]);

    const handleInput = (e : any) => {
        setSelectedAnswer(e.target.value)
    }

    const changeQuestion = (next: boolean, questionId: number, correct: number[] | string) => {
        if (next) {
            let correctAnswer: number[] | string = [];
            let yourAnswer: number[] | string = [];

            if (question.type === AnswerType.SELECT) {
                yourAnswer = (selectedAnswer as number[]).sort((a, b) => a - b);
                correctAnswer = (correct as number[]).sort((a, b) => a - b);
            }
            if (question.type === AnswerType.TEXT) {
                yourAnswer = selectedAnswer as string;
                correctAnswer = correct as string;
            }



            const updatedUser = JSON.parse(localStorage.getItem(email ? email : 'unknown') as string);

            updatedUser.questions[questionId].answer = yourAnswer;

            if (correctAnswer.toString() === yourAnswer.toString()) {
                updatedUser.questions[questionId].isCorrect = true;
            }
            localStorage.setItem(email ? email : 'unknown', JSON.stringify(updatedUser));
            setSelectedAnswer([]);
            if (isLast) {
                navigate(`/exam/submit`)
            }
            navigate(`/exam/question${question.id + 1}/`)
        } else {
            setSelectedAnswer([]);
            navigate(`/exam/question${question.id - 1}/`)
        }
    }

    const addSelectedAnswer = (index: number) => {
        if (question.type === AnswerType.SELECT) {
            if (!(selectedAnswer as number[]).includes(index)) {
                setSelectedAnswer((prev) => [...prev as number[], index]);
            } else {
                const newSelectedAnswer = (selectedAnswer as number[]).filter(a => a !== index);
                setSelectedAnswer(newSelectedAnswer);
            }
        }
    }

    useEffect(() => {
        const isDone = JSON.parse(localStorage.getItem(email ? email : 'unknown') as string)?.isDone
        if (isDone === true) {
            navigate(`/exam/attempts/`)
        }
    }, [])

    const handleSubmit = () => submitExam(navigate, question.id, selectedAnswer, email, question.correct, examId)

    const renderAnswersSelect = (answers : AnswerSelect[]) => {
        
        return(
        answers.map((answer) => {
            return (
                <Grid item key={answer.id + "answer"} xs={5}>
                    <ButtonBase onClick={() => { addSelectedAnswer(answer.id) }}>
                        <Card sx={{ width: "40vw", height: 50, backgroundColor: (selectedAnswer as number[]).includes(answer.id) ? "#D3D3D3" : "white" }} variant="outlined">
                            <Typography textAlign="center" variant="h6">
                                {answer.answer}
                            </Typography>
                        </Card>
                    </ButtonBase>
                </Grid>
            )
        }))
    } 

    const renderQuestion = () => {
        if (question.type === AnswerType.SELECT) {
            const answers = question.answers as AnswerSelect[];
            return renderAnswersSelect(answers);
        }
        if (question.type === AnswerType.TEXT) {
            return <TextField id="answer" label="Your answer" variant="outlined" onChange={(e) => {handleInput(e)}} autoComplete="off"/>
        }
    }

    return (
        <Box key={question.id}>
            <Typography variant="h5">{question.text}</Typography>
            <Typography variant="caption">{question.multipleAnswers ? 'multiple answers' : 'single answer'} is correct</Typography>
            <Grid key={question.id} container gap={4} direction="row" justifyContent={"center"} mt={5} >
                {renderQuestion()}
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
