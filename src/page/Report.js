// Report.js
import React, { useContext } from 'react';
import { AppContext } from '../components/user/UserPage';

const Report = () => {
  
  const { answers } = useContext(AppContext);
  const { questions } = useContext(AppContext);

  console.log("--->", answers);
  console.log("--->report", questions);

  var curretmark = 0;
  var total=0;
  var wrongmark=0;
  questions.forEach(ele => {
    ele.forEach((element) => {
      total+=element.answerValue;
      console.log("totalmark",total)
      
      var selectedOption=element.answer;
      var answer=element[answers[element.questionId]];
      console.log("----->answer",answer)
      //selectedOption.trim() ==  answer.trim()? curretmark += element.answerValue: wrongmark+= element.answerValue
    
    });
  });

  console.log("mark----->",curretmark);
  console.log("wrongmark----->",wrongmark);
  console.log("total----->",total);

  useEffect(() => {
    fetchInfo();
  }, []);

  const requestBody = {curretmark,wrongmark,total};
  const url = "https://localhost:8443/onlineExam/control/examInfo";

  const fetchInfo = () => {
    console.log("inside fetch...");

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log("fetched...date",fetchedData);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      });
  };
  return (
    <div>
      {/* You can display the mark or any other information here */}
    </div>
  );
};

export default Report;
