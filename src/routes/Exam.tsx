import { Typography, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

import ExamItem from '../components/exam/ExamItem'

interface ExamProps{
  email: string;
  setExam: Function;
}

const Exam = (props: ExamProps) => {
  const navigate = useNavigate();
  const { email, setExam } = props;

  return (
    <>
      <Typography variant="h3" mt={5}>Exams</Typography>
      <Typography variant="h5" my={3}>{email}</Typography>
      {[...Array(3)].map((item,index) => {
        return(
          <ExamItem key={index}
          email={email}
          examId={index+1}
          setExam={setExam}
        />
        )
      })}
      <Button variant="text" onClick={() => navigate("/")}>
        Logout
      </Button>
    </>
  )
}

export default Exam