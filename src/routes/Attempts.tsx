import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

import ResetDialog from '../components/attempts/ResetDialog'
import AnswerItem from '../components/attempts/AnswerItem'

const Attempts = () => {
  const navigate = useNavigate();
  const { examId, email } = useParams();
  const questions = require(`../data/exam${examId}.json`).questions;
  const [data, setData] = useState<{ email: string, isDone: boolean, questions: { answer: number[], isCorrect: boolean }[] } | undefined>(undefined);
  const score = data?.questions.filter(q => (q.isCorrect)).length;

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(email ? email : 'unknown') as string));
  },[email])

  return (
    <>
      <h2>Your Attempts <i>{email}</i></h2>
      <Box sx={{ mt: 10 }}>
        {questions.map((Q: any, index: number) => {
          return <AnswerItem key={index} Q={Q} index={index} data={data} />
        })}
        <Box sx={{ width: "70vw", display: 'flex', justifyContent: 'space-between', mx: "auto", mt: 2 }}>
          <Typography variant="h5">Your percentage: {Math.round(Number(score) / questions.length * 100)}%</Typography>
          <ResetDialog email={email} navigate={navigate}/>
        </Box>
      </Box>
    </>
  )
}


export default Attempts