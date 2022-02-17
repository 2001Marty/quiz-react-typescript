import { Box, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'

import {Question} from '../../types/Question'

interface AnswerItemProps {
    Q: Question;
    index: number;
    data: { 
        email: string, 
        isDone: boolean, 
        questions: 
            { answer: number[], 
                isCorrect: boolean }[] 
            } | undefined
    }


const AnswerItem = (props: AnswerItemProps) => {
    const {Q, index, data} = props;
    const correct = Q.correct.sort((a, b) => a - b);
    const yourAnswer = data?.questions[index].answer.sort((a, b) => a - b);
    const correctText = Q.answers.map((a) => { if (Q.correct.includes(a.id)) return a.answer + " " })
    const yourAnswerText = data?.questions[index].answer.map(a => { return Q.answers[a].answer + " " })
    let isCorrect = true;

    if (yourAnswer?.toString() !== correct.toString()) {
        isCorrect = false;
    } 

    return (
        <Box key={index} sx={{ width: "70vw", mx: "auto", my: 1 }}>
            <Accordion id={'accord' + Q.text} sx={{ backgroundColor: isCorrect ? '#00a86b' : '#b21e35', color: 'white' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                    <Typography variant="h4">{Q.text}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography align='left' mx={5} variant="h6"> Your answers: {yourAnswerText} </Typography>
                    <Typography align='left' mx={5} variant="h6"> Correct answers: {correctText}  </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}



export default AnswerItem