import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import QuestionItem from '../components/exam/QuestionItem'
import Countdown from '../components/exam/Countdown'
import { startExam } from '../services/handleExam'



const Question = () => {
    const navigate = useNavigate();
    const { id, email, examId } = useParams();
    const questions = require(`../data/exam${Number(examId)}.json`).questions;

    const timeOver = () => {
        navigate(`/exam${examId}/attempts/email=${email}`)
    }

    useEffect(() => {
        startExam(email, navigate, examId)
    }, [])

    window.onbeforeunload = () => {

        return "YOU CANT DO THAT!"
    }

    return (
        <div key={email}>
            Question {id}
            <Box mx={5} >
                <Countdown submitExam={timeOver} />
            </Box>
            {(
                <QuestionItem
                    question={questions[Number(id)]}
                    email={email} examId={examId}
                    isLast={Number(id) + 1 === questions.length}
                />
            )}
        </div>
    )
}
export default Question

