import { Typography, Button, AccordionSummary, Accordion, AccordionDetails, Box, AccordionActions } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { startExam } from '../../services/handleExam';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

import {Exam} from '../../types/Exam'

interface ExamItemProps {
    examId: number;
    email: string | undefined;
    setExam: Function;
}   

const ExamItem = (props: ExamItemProps) => {
    const {examId, email, setExam} = props;
    const exam : Exam | undefined = require(`../../data/exam${examId?? 1}.json`)
    const navigate = useNavigate();
    const setOnStartExam = () =>{
        setExam(examId);
        startExam(email, navigate, examId.toString());
    }

    return (
        <Box sx={{ width: "70vw", mx: "auto", my: 1 }}>
            {exam && (
            <Accordion key={"exam1"} sx={{ backgroundColor: exam.background_color, color: 'white' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                    <Typography variant="h4">{exam.title}</Typography>
                </AccordionSummary>
                <Box sx={{ width: "70vw", display: "inline-flex", justifyContent: "space-between" }}>
                    <AccordionDetails>
                        <Typography align='left' mx={2} variant="h6">{exam.description}</Typography>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant="text" sx={{ backgroundColor: "white", color: '51B9F6', ':hover': { color: "white" } }} onClick={() => setOnStartExam()}>Start exam</Button>
                    </AccordionActions>
                </Box>
            </Accordion>
            )}
        </Box>
    )
}

export default ExamItem