import {Routes, Route} from 'react-router-dom'

import './App.css';
import Registration from './routes/Registration';
import Exam from './routes/Exam'
import Question from './routes/Question'
import Attempts from './routes/Attempts'

function App() {
  return (
    <div className="App">
      <div className="Main">
        <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/exam/email=:email" element={<Exam/>}/>
            <Route path="/exam:examId/question:id/email=:email" element={<Question/>}/>
            <Route path="/exam:examId/attempts/email=:email" element={<Attempts/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
