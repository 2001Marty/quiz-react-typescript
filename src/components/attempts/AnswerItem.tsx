import { Box, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'

import {Question, AnswerSelect, AnswerType} from '../../types/Question'

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
    let correct : string | number[] = '';
    let correctText;
    let yourAnswer;
    let yourAnswerText;
    if(Q.type === AnswerType.SELECT){
        correct = (Q.correct as number[]).sort((a, b) => a - b);
        correctText = (Q.answers as AnswerSelect[]).map((a) => { if ((Q.correct as number[]).includes(a.id)) return a.answer + " " })
        yourAnswer = data?.questions[index].answer.sort((a, b) => a - b);
        yourAnswerText = data?.questions[index].answer.map(a => { return (Q.answers[a] as AnswerSelect).answer + " " })
    }
    if(Q.type === AnswerType.TEXT){
        yourAnswer = data?.questions[index].answer
        yourAnswerText = yourAnswer
        correct = Q.correct
        correctText = correct
    }
    
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