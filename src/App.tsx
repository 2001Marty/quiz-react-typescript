
import {Routes, Route, useNavigate} from 'react-router-dom'

import './App.css';
import Registration from './routes/Registration';
import Exam from './routes/Exam'
import Question from './routes/Question'
import Attempts from './routes/Attempts'
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [exam, setExam] = useState("-1");
  
  useEffect(() =>{
    if(localStorage.getItem(email) === null) {
      navigate('/')
    };
  },[email])
  
  return (
    <div className="App">
      <div className="Main">
        <Routes>
            <Route path="/" element={<Registration setCurrentEmail={setEmail}/>}/>
            <Route path="/exam/" element={<Exam email={email} setExam={setExam}/>}/>
            <Route path="/exam/question:id/" element={<Question email={email} examId={exam}/>}/>
            <Route path="/exam/attempts/" element={<Attempts email={email}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
