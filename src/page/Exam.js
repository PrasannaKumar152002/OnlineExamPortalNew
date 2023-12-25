import React, { useState, useEffect, useContext } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

import { AppContext } from '../components/user/UserPage';
import { useNavigate } from 'react-router-dom';
function Exam() {
  const nav=useNavigate();
  const {answers, setAnswers} =useContext(AppContext);
  const {questions, setQuestions} =useContext(AppContext);
  const examId = sessionStorage.getItem("exam");
  console.log("----------->examId"+examId);
  const noOfQuestions=sessionStorage.getItem("ques");
  console.log("ques---->",noOfQuestions);
 // const [questions, setQuestions] = useState([]);
  const [sequenceNumber, setsequenceNumber] = useState([]);
  // const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      const apiUrl = "https://localhost:8443/onlineExam/control/questionInfo";
      const requestBody = { examId: examId,noOfQuestions: noOfQuestions };

      fetch(apiUrl, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Data received from the API:', data);

          // Validate the structure of the received data
          if (Array.isArray(data.question.examquestion)) {
            setQuestions(data.question.examquestion);
            setsequenceNumber(data.questionSequence)
            console.log("sequenceNumber----->",sequenceNumber)
          } else {
            console.error('Invalid format for questions:', data.question.examquestion);
            console.log("---->")
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setLoading(false);
        });
    }
  }, [examId,noOfQuestions]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    
  };
  var seq=1;
  // Helper function to render a single question
  const renderQuestion = (re) => (
    <div key={re.questionId} className={`card mt-3 ${answers[re.questionId] ? 'border-success' : 'border-danger'}`}>
      <div className='card-body'>
        <h5 className='card-title'>{(seq++)+". "+re.questionDetail}</h5>
        <div className='form-check'>
          {['A', 'B', 'C', 'D', 'E'].filter(nu => (re[`option${nu}`]) !== "null").map((option) => {
            const optionKey = `option${option}`;
            const optionValue = re[optionKey];
            const que = re.QuestionType;

            switch (que) {
              case 'QT_SC':
                return optionValue && (
                  <div key={optionKey} className='form-check'>
                    <input
                      type='radio'
                      className='form-check-input'
                      id={`${optionKey}-${re.questionId}`}
                      name={`question${re.questionId}`}
                      value={optionKey}
                      onChange={() => handleOptionChange(re.questionId, optionKey)}
                      checked={answers[re.questionId] === optionKey}
                    />
                    <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                      {optionValue}
                    </label>
                  </div>
                );
              case 'QT_MC':
                return optionValue && (
                  <div key={optionKey} className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id={`${optionKey}-${re.questionId}`}
                    name={`question${re.questionId}`}
                    value={optionKey}
                    onChange={() => handleOptionChange(re.questionId + "@" + optionKey, optionKey)}
                    checked={answers[re.questionId] && answers[re.questionId].includes(optionValue)}
                  />
                  <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                    {optionValue}
                  </label>
                  </div>
                );
              case 'QT_TF':
                return optionValue && (
                  <div key={optionKey} className='form-check'>
                    <input
                      type='radio'
                      className='form-check-input'
                      id={`${optionKey}-${re.questionId}`}
                      name={`question${re.questionId}`}
                      value={optionKey}
                      onChange={() => handleOptionChange(re.questionId, optionKey)}
                      checked={answers[re.questionId] === optionKey}
                    />
                    <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                      {optionValue}
                    </label>
                  </div>
                );
              case 'QT_FIB':
                console.log("enter.....");
                return optionValue && (
                  <div key={optionKey} className='form-check'>
                    <input
                      type="text"
                      id={`${re.questionId}in`}
                      onChange={(e) => handleOptionChange(re.questionId, e.target.value)}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );

  // Helper function to render a group of questions
  const renderQuestionGroup = (quesGroup) => (
    <React.Fragment key={quesGroup[0].questionId}>
      {Array.isArray(quesGroup) ? (
        quesGroup.map((re) => renderQuestion(re))
      ) : (
        <p>Error: Invalid format for quesGroup</p>
      )}
      {Array.isArray(sequenceNumber,questions) ? (
      questions.map((ques1)=>{
       
           sequenceNumber.map((sequence)=>{ compareId(ques1,sequence)});
        
      })
      ) : (
        <p>Error: Invalid format for questions</p>
      )}  
        
    </React.Fragment>
  );
const compareId=(questions,sequenceId)=>{
   questions.map((q)=>{
    
    if(q.questionId===sequenceId.questionId){
      console.log("------>",sequenceId.sequenceNum,"----->",sequenceId.questionId);

    }
    
   
  })
  
};
  return (
    <div className='container mt-4'>
      {Array.isArray(questions) ? (
        questions.map((quesGroup) => renderQuestionGroup(quesGroup))
      ) : (
        <p>Error: Invalid format for questions</p>
      )}
    
     


      <div className='mt-4'>
        <button
          className='btn btn-primary'
          onClick={() => {
            // Handle submission logic here, e.g., sending answers to a server
              console.log('Submitted Answers:', answers);
              nav('/report');

          }}
        >
        submit
          
        </button>
      </div>
    </div>
  );
}

export default Exam;
