import React from 'react'
import { Typography, Button, AccordionSummary, Accordion, AccordionDetails, Box, AccordionActions } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { startExam } from '../../services/handleExam';
import { useNavigate } from 'react-router-dom';

interface ExamItemProps {
    examId: number;
    email: string | undefined;
}

const ExamItem = (props: ExamItemProps) => {
    const {examId, email} = props;
    const exam = require(`../../data/exam${examId}.json`)
    const navigate = useNavigate();
    
    return (
        <Box sx={{ width: "70vw", mx: "auto", my: 1 }}>
            <Accordion key={"exam1"} sx={{ backgroundColor: exam.background_color, color: 'white' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                    <Typography variant="h4">{exam.title}</Typography>
                </AccordionSummary>
                <Box sx={{ width: "70vw", display: "inline-flex", justifyContent: "space-between" }}>
                    <AccordionDetails>
                        <Typography align='left' mx={2} variant="h6">{exam.description}</Typography>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant="text" sx={{ backgroundColor: "white", color: '51B9F6', ':hover': { color: "white" } }} onClick={() => startExam(email, navigate, examId.toString())}>Start exam</Button>
                    </AccordionActions>
                </Box>
            </Accordion>
        </Box>
    )
}

export default ExamItem