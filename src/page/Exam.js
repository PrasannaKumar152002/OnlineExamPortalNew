import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Exam() {
  const examId = sessionStorage.getItem("exam");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      const apiUrl = "https://localhost:8443/onlineexam/control/questionInfo";
      const requestBody = { examId: examId };

      fetch(apiUrl, {
        method: 'POST',
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
          } else {
            console.error('Invalid format for questions:', data.question.examquestion);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setLoading(false);
        });
    }
  }, [examId]);

  const handleOptionChange = (questionId, selectedOption, quotiontype) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    if (quotiontype != "QT_MC") {
      document.getElementById("button" + questionId).style.backgroundColor = "green";
    }
    else {
      var qid = questionId.split("@");
      console.log(qid);
      document.getElementById("button" + qid[0]).style.backgroundColor = "green";
    }
  };

  // Helper function to render a single question
  const renderQuestion = (re) => (
    <div key={re.questionId} className='card mt-3'>
      <div className='card-body ' id={re.questionId} style={{ border: "3px solid blue" }}>
        <h5 className='card-title'>{re.questionDetail}</h5>
        <div className='form-check'>
          {['A', 'B', 'C', 'D', 'E'].map((option) => {
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
                      onChange={() => handleOptionChange(re.questionId, optionKey, re.QuestionType)}
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
                      onChange={() => handleOptionChange(re.questionId + "@" + optionKey, optionKey, re.QuestionType)}
                      // checked={answers[re.questionId] && answers[re.questionId].includes(optionValue)}
                    />
                    <label className='form-check-label' htmlFor={`${optionKey}-${re.questionId}`}>
                      {optionValue}
                    </label>
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
  var seqno = 1;
  const handleButton = (qn) => {
    console.log("inside");
    return (<button id={"button" + qn.questionId} type="button" class="btn mb-5 mx-3" style={{ backgroundColor: "white", border: "3px solid black" }} onClick={(e) => {
      var elmntToView = document.getElementById(qn.questionId);
      elmntToView.scrollIntoView();
    }}><strong>{seqno++}</strong></button>)
  };

  const handleButtonDiv = () => (
    <div class="col-12 p-5" style={{ border: "3px solid black" }}>
      {
        questions.map((element) => element.map((qn) => handleButton(qn)))
      }
    </div>
  )

  // Helper function to render a group of questions
  const renderQuestionGroup = (quesGroup) => (
    <React.Fragment key={quesGroup[0].questionId}>
      {Array.isArray(quesGroup) ? (
        quesGroup.map((re) => renderQuestion(re))
      ) : (
        <p>Error: Invalid format for quesGroup</p>
      )}
    </React.Fragment>
  );

  return (
    <div className='container mt-4'>
      <div class="col g-0 justify-content-center align-items-center">
        {handleButtonDiv()}
      </div>
      {Array.isArray(questions) ? (
        questions.map((quesGroup) => renderQuestionGroup(quesGroup))
      ) : (
        <p>Error: Invalid format for questions</p>
      )}

      {(
        <div className='mt-4'>
          <button
            className='btn btn-primary'
            onClick={() => {

              // Handle submission logic here, e.g., sending answers to a server
              questions.forEach(element => {
                console.log("----->", element)
                element.forEach(elementin => {
                  console.log("-------------->", elementin);
                  if(elementin.QuestionType=="QT_MC")
                  {
                    var list=[];
                    console.log("InCheck-"+elementin.questionId);
                    ['optionA','optionB','optionC','optionD','optionE'].filter(optionKey=>document.getElementById(`${optionKey}-${elementin.questionId}`).checked).map((optionKey)=>{list.push(elementin[optionKey])});
                    handleOptionChange(elementin.questionId,list,"QT_MC");
                  }
                  if (answers[elementin.questionId] == null || elementin.questionId == undefined) {
                    console.log("General-"+elementin.questionId);
                    document.getElementById(elementin.questionId).style.border = "3px solid red"
                  }
                  else {
                    console.log("General-"+elementin.questionId);
                    document.getElementById(elementin.questionId).style.border = "3px solid green"
                    //pending fetch
                  }
                })
              });
              console.log('Submitted Answers:', answers);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Exam;