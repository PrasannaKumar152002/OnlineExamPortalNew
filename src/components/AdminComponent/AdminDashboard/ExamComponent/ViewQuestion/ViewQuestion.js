import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Table from "react-bootstrap/Table";

function ViewQuestion() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------

  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleEditQuestion(questionId) {
    setDisplay({ display: "block" });
    setDataInInputField(questionId);
  }

  function handleClose() {
    setDisplay({ display: "none" });
  }

  const { id } = useParams();

  //  ---------------------- Fetching All Questions -------------------------------------

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      let value = await axios.get("http://localhost:3333/question");
      setQuestions(value.data);
    }
    getAllQuestions();
  }, []);

  //  ---------------------- handling text field -------------------------------------

  const [updatedQ, setUpdatedQ] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id,
    subject_name: "",
  });

  function onTextFieldChange(e) {
    setUpdatedQ({
      ...updatedQ,
      [e.target.name]: e.target.value,
    });
  }

  //  ---------------------- Showing data in text field -------------------------------------

  // Id of current question clicked
  const [qId, setQId] = useState();

  function setDataInInputField(questionId) {
    setQId(questionId);

    for (let i = 0; i < questions.length; i++) {
      if (parseInt(questions[i].id) === parseInt(questionId)) {
        setUpdatedQ(questions[i]);
      }
    }
  }
  // -----------------------------------------------------------------------------------------

  const [check, setCheck] = useState();

  async function updateQuestion() {
    await axios.put(`http://localhost:3333/question/${qId}`, updatedQ);
    setCheck(true);
  }

  // ----------------------------------------------------------------------------------------

  let history = useNavigate();

  function handleGoBack() {
    history("/AdminDashboard/Exam");
  }

  function handleAdd() {
    history(`/AdminDashboard/Exam/AddQuestion/${id}`);
  }
  // ----------------------------------------------------------------------------------------

  const [d, setD] = useState();

  async function deleteQuestion(id) {
    await axios.delete(`http://localhost:3333/question/${id}`);
    setD(true);
  }

  if (check) return <ViewQuestion />;

  if (d) return <ViewQuestion />;

  return (
    <>
      <div>
        <h2>Question List</h2>
      </div>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Question Name</th>
              <th>Option one</th>
              <th>Option two</th>
              <th>Option three</th>
              <th>Option four</th>
              <th>Question Answer</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((data, i) => {
              if (parseInt(data.exam_id) === parseInt(id)) {
                return (
                  <tr key={i}>
                    <td>{data.question_name}</td>
                    <td>{data.option_one}</td>
                    <td>{data.option_two}</td>
                    <td>{data.option_three}</td>
                    <td>{data.option_four}</td>
                    <td>{data.question_answer}</td>
                    <td>
                      <button onClick={() => handleEditQuestion(data.id)}>
                        Edit
                      </button>
                      <button onClick={() => deleteQuestion(data.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }

              return <React.Fragment key={i}></React.Fragment>;
            })}
          </tbody>
        </Table>
      </div>

      <div>
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={display}>
        <label>Enter Question </label>
        <input
          value={updatedQ.question_name}
          onChange={(e) => onTextFieldChange(e)}
          name="question_name"
          type="text"
          placeholder="Enter Question "
        />

        <label>Enter Option A </label>
        <input
          value={updatedQ.option_one}
          onChange={(e) => onTextFieldChange(e)}
          name="option_one"
          type="text"
          placeholder="Enter Option A"
        />

        <label>Enter Option B </label>
        <input
          value={updatedQ.option_two}
          onChange={(e) => onTextFieldChange(e)}
          name="option_two"
          type="text"
          placeholder="Enter Option B"
        />

        <label>Enter Option C </label>
        <input
          value={updatedQ.option_three}
          onChange={(e) => onTextFieldChange(e)}
          name="option_three"
          type="text"
          placeholder="Enter Option C"
        />

        <label>Enter Option D </label>
        <input
          value={updatedQ.option_four}
          onChange={(e) => onTextFieldChange(e)}
          name="option_four"
          type="text"
          placeholder="Enter Option D"
        />

        <label>Enter Question Answer </label>
        <input
          value={updatedQ.question_answer}
          onChange={(e) => onTextFieldChange(e)}
          name="question_answer"
          type="text"
          placeholder="Enter Answer"
        />

        <label>Enter Subject </label>
        <input
          value={updatedQ.subject_name}
          onChange={(e) => onTextFieldChange(e)}
          name="subject_name"
          type="text"
          placeholder="Enter Subject"
        />

        <div>
          <button onClick={updateQuestion}>Update Question</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default ViewQuestion;
