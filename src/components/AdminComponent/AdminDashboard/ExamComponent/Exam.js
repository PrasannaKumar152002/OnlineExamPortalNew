import { useState, useEffect } from "react";
// import axios from "axios";

import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";
import ExamForm from "../Dashboard/Form/ExamForm";
import ExamModalEditSample from "../../../Modal/Edit/ExamModalEditSample";

function Exam() {
  //  ---------------------- add Exam & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleAddExam() {
    setDisplay({ display: "block" });
  }

  function handleCloseExam(e) {
    e.preventDefault();
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all Exam from db.json file-------------------------

  const [exams, setExams] = useState([]);
  const option = [
    {
      id: 0,
      value: "Yes",
    },
    {
      id: 1,
      value: "No",
    },
  ];

  const [changedQuesRandoptions, setChangedQuesRandoptions] = useState();
  const [changedpassPercentage, setChangedpassPercentage] = useState();
  const [changedexamName, setChangedexamName] = useState();
  const [changednoOfQuestions, setChangednoOfQuestions] = useState();
  const [changeddurationMinutes, setChangeddurationMinutes] = useState();
  const [changedcreationDate, setChangedcreationDate] = useState();
  const [changedexpirationDate, setChangedexpirationDate] = useState();
  const [changedanswersMust, setChangedanswersMust] = useState();
  const [changedDesc, setChangedDesc] = useState();
  const [changedenableNegativeMark, setChangedenableNegativeMark] = useState();
  const [changednegativeMarkValue, setChangednegativeMarkValue] = useState();

  useEffect(() => {
    fetchExam();
  }, []);

  const changeQuesRandHandler = (e) => {
    setChangedQuesRandoptions(e.value);
    console.log(e.value);
  };

  const changeNegMarkHandler = (e) => {
    setChangednegativeMarkValue(e.target.value);
    console.log(e.target.value);
  };

  const changePassPercentHandler = (e) => {
    setChangedpassPercentage(e.target.value);
    console.log(e.target.value);
  };

  const changeEnableAnsMustHandler = (e) => {
    setChangedanswersMust(e.value);
    console.log(e.value);
  };

  const changeEnableNegMarkHandler = (e) => {
    setChangedenableNegativeMark(e.value);
    console.log(e.value);
  };

  const changeQuesHandler = (e) => {
    setChangednoOfQuestions(e.target.value);
    console.log(e.target.value);
  };

  const changeDurationHandler = (e) => {
    setChangeddurationMinutes(e.target.value);
    console.log(e.target.value);
  };

  const changeCreateDateHandler = (e) => {
    setChangedcreationDate(e.target.value);
    console.log(e.target.value);
  };

  const changeExpireDateHandler = (e) => {
    setChangedexpirationDate(e.target.value);
    console.log(e.target.value);
  };

  const changeDescHandler = (e) => {
    setChangedDesc(e.target.value);
    console.log(e.target.value);
  };

  const changeExamNameHandler = (e) => {
    setChangedexamName(e.target.value);
    console.log(e.target.value);
  };

  // --------------------Adding Exam And re-render Exam component-----------------

  const fetchExam = async () => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineExam/control/FetchExamMaster",
        {
          method: "POST",
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
  // var date = new Date();
  // var d =
  //   date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  // var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  // const [exam, setExam] = useState({
  //   exam_name: "",
  //   exam_desc: "",
  //   exam_level: "",
  //   exam_passMarks: "",
  //   exam_totalQuestion: "",
  //   exam_marks: "",
  //   exam_date: d + " " + t,
  // });

  // function handleInput(e) {
  //   setExam({
  //     ...exam,
  //     [e.target.name]: e.target.value,
  //   });
  //   //  console.log(exam);
  // }

  // async function handleAddNewExam() {
  //   await axios.post("http://localhost:3333/Exam", exam);
  //   setStatus(true);
  // }

  // const [status, setStatus] = useState();

  // ----------------------------Deleting Exam-----------------------------------------------

  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {}, []);

  // const [statusDeleteExam, setStatusDeleteExam] = useState();

  // async function deleteExam(id) {
  //    console.log(id);

  //   for (let i = 0; i < questions.length; i++) {
  //     if (parseInt(questions[i].exam_id) === parseInt(id)) {
  //       // console.log(questions[i].id);
  //       await axios.delete(`http://localhost:3333/question/${questions[i].id}`);
  //     }
  //   }
  //   await axios.delete(`http://localhost:3333/exam/${id}`);
  //   setStatusDeleteExam(true);
  // }

  // if (status) return <Exam total={exam.exam_totalQuestion} />;

  // if (statusDeleteExam) return <Exam />;

  const submitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("exam");
    const formData = new FormData(form);
    const data_map = {
      // examId: formData.get("examId"),
      examName: formData.get("examName"),
      description: formData.get("description"),
      creationDate: formData.get("creationDate"),
      expirationDate: formData.get("expirationDate"),
      noOfQuestions: formData.get("noOfQuestions"),
      durationMinutes: formData.get("durationMinutes"),
      passPercentage: formData.get("passPercentage"),
      questionsRandomized: formData.get("questionsRandomized"),
      answersMust: formData.get("answersMust"),
      enableNegativeMark: formData.get("enableNegativeMark"),
      negativeMarkValue: formData.get("negativeMarkValue"),
    };
    if (data_map.examName === "") {
      document.getElementById("examnameerr").style.display = "block";
    } else {
      document.getElementById("examnameerr").style.display = "none";
    }
    if (data_map.description === "") {
      document.getElementById("descriptionerr").style.display = "block";
    } else {
      document.getElementById("descriptionerr").style.display = "none";
    }
    if (data_map.creationDate === "") {
      document.getElementById("creationdateerr").style.display = "block";
    } else {
      document.getElementById("creationdateerr").style.display = "none";
    }
    if (data_map.expirationDate === "") {
      document.getElementById("expirationdateerr").style.display = "block";
    } else {
      document.getElementById("expirationdateerr").style.display = "none";
    }
    if (data_map.noOfQuestions === "") {
      document.getElementById("noofquestionserr").style.display = "block";
    } else {
      document.getElementById("noofquestionserr").style.display = "none";
    }
    if (data_map.passPercentage === "") {
      document.getElementById("passpercentageerr").style.display = "block";
    } else {
      document.getElementById("passpercentageerr").style.display = "none";
    }
    if (data_map.questionsRandomized === "") {
      document.getElementById("questionsrandomizederr").style.display = "block";
    } else {
      document.getElementById("questionsrandomizederr").style.display = "none";
    }
    if (data_map.answersMust === "") {
      document.getElementById("answersmusterr").style.display = "block";
    } else {
      document.getElementById("answersmusterr").style.display = "none";
    }
    if (data_map.durationMinutes === "") {
      document.getElementById("durationminuteserr").style.display = "block";
    } else {
      document.getElementById("durationminuteserr").style.display = "none";
    }
    if (data_map.negativeMarkValue === "") {
      document.getElementById("negativemarkvalueerr").style.display = "block";
    } else {
      document.getElementById("negativemarkvalueerr").style.display = "none";
    }
    if (data_map.enableNegativeMark === "") {
      document.getElementById("enablenegativemarkerr").style.display = "block";
    } else {
      document.getElementById("enablenegativemarkerr").style.display = "none";
    }
    if (
      !(
        data_map.examName === "" ||
        data_map.description === "" ||
        data_map.creationDate === "" ||
        data_map.expirationDate === "" ||
        data_map.noOfQuestions === "" ||
        data_map.passPercentage === "" ||
        data_map.questionsRandomized === "" ||
        data_map.answersMust === "" ||
        data_map.durationMinutes === "" ||
        data_map.negativeMarkValue === "" ||
        data_map.enableNegativeMark === ""
      )
    ) {
      // FETCH
      fetch("https://localhost:8443/onlineExam/control/CreateExamMaster", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data_map),
      })
        .then((response) => {
          return response.json(); //  converts the response object to JSON to info
        })
        .then((fetch_data) => {
          console.log(fetch_data);
          fetchExam();
        });
    }
  };

  return (
    <>
      <div>
        <h2 align="center">Exam List</h2>
      </div>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Exam Desc</th>
              <th>Exam Name</th>
              <th>No Of Questions</th>
              <th>Duration Mins</th>
              <th>Created Time</th>
              <th>Expired Time</th>
              <th>Answers Must</th>
              <th>Questions Randomized</th>
              <th>Pass Percentage</th>
              <th>Enable Negative Mark</th>
              <th>Negative Mark</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => {
              return (
                <tr key={i}>
                  <td>{exam.examId}</td>
                  <td>{exam.description}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.noOfQuestions}</td>
                  <td>{exam.durationMinutes}</td>
                  <td>{exam.creationDate}</td>
                  <td>{exam.expirationDate}</td>
                  <td>{exam.answersMust}</td>
                  <td>{exam.questionsRandomized}</td>
                  <td>{exam.passPercentage}</td>
                  <td>{exam.enableNegativeMark}</td>
                  <td>{exam.negativeMarkValue}</td>
                  <td className="border-none px-3 py-1 mt-4 mb-2 text-white rounded-0">
                    <ExamModalEditSample
                      fetchExam={fetchExam}
                      type="button"
                      fetchId={exam.examId}
                      buttonName="UPDATE"
                      option={option}
                      description={exam.description}
                      examName={exam.examName}
                      noOfQuestions={exam.noOfQuestions}
                      durationMinutes={exam.durationMinutes}
                      creationDate={exam.creationDate}
                      expirationDate={exam.expirationDate}
                      answersMust={exam.answersMust}
                      questionsRandomized={exam.questionsRandomized}
                      passPercentage={exam.passPercentage}
                      enableNegativeMark={exam.enableNegativeMark}
                      negativeMarkValue={exam.negativeMarkValue}
                      changedQuesRandoptions={changedQuesRandoptions}
                      changedpassPercentage={changedpassPercentage}
                      changedexamName={changedexamName}
                      changednoOfQuestions={changednoOfQuestions}
                      changeddurationMinutes={changeddurationMinutes}
                      changedcreationDate={changedcreationDate}
                      changedexpirationDate={changedexpirationDate}
                      changedanswersMust={changedanswersMust}
                      changedDesc={changedDesc}
                      changedenableNegativeMark={changedenableNegativeMark}
                      changednegativeMarkValue={changednegativeMarkValue}
                      changeQuesRandHandler={changeQuesRandHandler}
                      changeNegMarkHandler={changeNegMarkHandler}
                      changePassPercentHandler={changePassPercentHandler}
                      changeEnableAnsMustHandler={changeEnableAnsMustHandler}
                      changeEnableNegMarkHandler={changeEnableNegMarkHandler}
                      changeQuesHandler={changeQuesHandler}
                      changeDurationHandler={changeDurationHandler}
                      changeCreateDateHandler={changeCreateDateHandler}
                      changeExpireDateHandler={changeExpireDateHandler}
                      changeDescHandler={changeDescHandler}
                      changeExamNameHandler={changeExamNameHandler}
                      />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="text-center">
        <button
          onClick={handleAddExam}
          style={{
            fontWeight: "bolder",
            background:
              "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
          }}
          className="border-none p-2 mt-4 mb-2 text-white"
        >
          Add Exam
        </button>

        <Link
          exact
          to="/ExamComponent/ExamTopicMapping"
          style={{
            textDecoration: "none",
            fontWeight: "bolder",
            background:
              "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
            padding: "9px",
            border: "2px solid gray",
          }}
          className="ms-3 mt-4 mb-2 text-white"
        >
          Create QuestionPaper
        </Link>
      </div>
      <div style={display}>
        <div className="d-flex align-items-center justify-content-center min-vh-100 text-black">
          <ExamForm
          fetchExam={fetchExam}
          option={option}
          changedQuesRandoptions={changedQuesRandoptions}
          changedpassPercentage={changedpassPercentage}
          changedexamName={changedexamName}
          changednoOfQuestions={changednoOfQuestions}
          changeddurationMinutes={changeddurationMinutes}
          changedcreationDate={changedcreationDate}
          changedexpirationDate={changedexpirationDate}
          changedanswersMust={changedanswersMust}
          changedDesc={changedDesc}
          changedenableNegativeMark={changedenableNegativeMark}
          changednegativeMarkValue={changednegativeMarkValue}
          changeQuesRandHandler={changeQuesRandHandler}
          changeNegMarkHandler={changeNegMarkHandler}
          changePassPercentHandler={changePassPercentHandler}
          changeEnableAnsMustHandler={changeEnableAnsMustHandler}
          changeEnableNegMarkHandler={changeEnableNegMarkHandler}
          changeQuesHandler={changeQuesHandler}
          changeDurationHandler={changeDurationHandler}
          changeCreateDateHandler={changeCreateDateHandler}
          changeExpireDateHandler={changeExpireDateHandler}
          changeDescHandler={changeDescHandler}
          changeExamNameHandler={changeExamNameHandler}
            buttonName="CREATE"
            submitHandler={submitHandler}
            handleCloseExam={handleCloseExam}
          />
        </div>
      </div>
      <div className="hide-sm pt-3"></div>
    </>
  );
}
Exam.defaultProps = {
  total: 0,
};

export default Exam;
