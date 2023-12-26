import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ExamTopicMappingForm from "../../Dashboard/Form/ExamTopicMappingForm";
import ExamTopicMappingModalSample from "../../Modal/Edit/ExamTopicMappingModal";
export default function ExamTopicMapping() {
  const [topics, setTopics] = useState([]);
  const [exams, setExams] = useState([]);
  const [examTopic, setExamTopic] = useState([]);
  const [selectedQuestionsPerExam, setSelectedQuestionsPerExam] = useState("");
  const [topicChange, setTopicChange] = useState("");
  const [examChange, setExamChange] = useState("");
  const [count, setCountChange] = useState();

  useEffect(() => {
    fetchTopics();
    fetchExam();
    fetchExamTopicMapping();
  }, []);
  const handleSelectTopicChange = (e) => {
    setTopicChange(e.topicName);
    console.log(e.topicName);
  };

  const handleSelectExamChange = (e) => {
    setExamChange(e.ExamName);
    console.log(e.ExamName);
  };
  const handleSelectCountChange = (e) => {
    setCountChange(e);
    console.log(e);
  };
  const fetchTopics = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchTopicMaster",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.TopicMaster;
      setTopics(list);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''********************");
  console.log(topics);

  const fetchExam = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamMaster",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.ExamMaster;
      setExams(list);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(exams);

  const fetchExamTopicMapping = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/FetchExamTopicMapping",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.ExamTopicMapping;
      setExamTopic(list);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(exams);

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("examtopping");
    const formData = new FormData(form);
    const data_map = {
      examId: examChange,
      topicId: topicChange,
      percentage: formData.get("percentage"),
      topicPassPercentage: formData.get("topicPassPercentage"),
      questionsPerExam: selectedQuestionsPerExam,
    };
    console.log(data_map);

    if (data_map.examId === "") {
      document.getElementById("examIDerr").style.display = "block";
    } else {
      document.getElementById("examIDerr").style.display = "none";
    }
    if (data_map.topicId === "") {
      document.getElementById("topicIDerr").style.display = "block";
    } else {
      document.getElementById("topicIDerr").style.display = "none";
    }
    if (data_map.percentage === "") {
      document.getElementById("percentageerr").style.display = "block";
    } else {
      document.getElementById("percentageerr").style.display = "none";
    }
    if (data_map.topicPassPercentage === "") {
      document.getElementById("topicpasspercentageerr").style.display = "block";
    } else {
      document.getElementById("topicpasspercentageerr").style.display = "none";
    }
    if (data_map.questionsPerExam === "Choose Count") {
      document.getElementById("questionsperexamerr").style.display = "block";
    } else {
      document.getElementById("questionsperexamerr").style.display = "none";
    }
    if (
      !(
        data_map.examId === "" ||
        data_map.topicId === "" ||
        data_map.percentage === "" ||
        data_map.topicPassPercentage === "" ||
        data_map.questionsPerExam === "Choose Count"
      )
    ) {
      try {
        fetch(
          "https://localhost:8443/onlineexam/control/CreateExamTopicMapping",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data_map),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((fetch_data) => {
            console.log(fetch_data);
            fetchExamTopicMapping();
          });
      } catch (error) {
        console.log(error);
      }
    }
    // document.getElementById("examIDerr").style.display = "block";
    // document.getElementById("topicIDerr").style.display = "block";
    // document.getElementById("percentageerr").style.display = "block";
    // document.getElementById("topicpasspercentageerr").style.display = "block";
    // document.getElementById("questionsperexamerr").style.display = "block";
  };

  // const handleSelectQChange = (e) => {
  //   setSelectedQuestionsPerExam(e.target.value);
  // };
  // const handleSelectEChange = (e) => {
  //   setSelectedExamID(e.target.value);
  // };
  // const handleSelectTChange = (e) => {
  //   setSelectedTopicID(e.target.value);
  // };
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Exam ID</th>
            {/* <th>Exam Name</th> */}
            <th>Topic ID</th>
            {/* <th>Topic Name</th> */}
            <th>Percentage</th>
            <th>Topic Pass Percentage</th>
            <th>Questions Per Exam</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {examTopic.map((examtopic, index) => {
            // const exam_name = exams[examTopic.examId].examName;
            return (
              <tr key={index}>
                <td>{examtopic.examId}</td>
                {/* <td>{exam_name}</td> */}
                <td>{examtopic.topicId}</td>
                <td>{examtopic.percentage}</td>
                <td>{examtopic.topicPassPercentage}</td>
                <td>{examtopic.questionsPerExam}</td>
                <td className="border-none px-3 py-1 mt-4 mb-2 text-white rounded-0">
                  <ExamTopicMappingModalSample
                    examChange={examChange}
                    topics={topics}
                    topicId={examtopic.topicId}
                    exams={exams}
                    examId={examtopic.examId}
                    examName={examtopic.examName}
                    handleSelectTopicChange={handleSelectTopicChange}
                    handleSelectExamChange={handleSelectExamChange}
                    topicName={examtopic.topicName}
                    percentage={examtopic.percentage}
                    topicPassPercentage={examtopic.topicPassPercentage}
                    questionsPerExam={examtopic.questionsPerExam}
                    handleSelectCountChange={handleSelectCountChange}
                    count={count}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center min-vh-2 text-black">
        <ExamTopicMappingForm
          topics={topics}
          submitHandler={submitHandler}
          examChange={examChange}
          selectedQuestionsPerExam={selectedQuestionsPerExam}
          count={count}
          exams={exams}
          examId={examTopic.examId}
          handleSelectTopicChange={handleSelectTopicChange}
          handleSelectExamChange={handleSelectExamChange}
          handleSelectCountChange={handleSelectCountChange}
        />
      </div>
    </div>
  );
}
