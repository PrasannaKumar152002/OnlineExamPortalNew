import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ExamForm from "../../AdminComponent/AdminDashboard/Dashboard/Form/ExamForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function ExamModalEditSample(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e) => {
    
    // const inputDateString = "2023-12-28 04:04:00.0";

    // // Split the input string into date and time components
    // const [datePart, timePart] = inputDateString.split(" ");

    // // Concatenate the date and adjusted time components
    // const adjustedTimeString = `${datePart}T${timePart.slice(0, 5)}`;

    // console.log(adjustedTimeString); // Output: "2023-12-28T04:04"

    e.preventDefault();
    const data_map = {
      examId: props.fetchId,
      examName: props.changedexamName ? props.changedexamName : props.examName,
      description: props.changedDesc ? props.changedDesc : props.description,
      creationDate: props.changedcreationDate
        ? props.changedcreationDate
        : props.creationDate,
      expirationDate: props.changedexpirationDate
        ? props.changedexpirationDate
        : props.expirationDate,
      noOfQuestions: props.changednoOfQuestions
        ? props.changednoOfQuestions
        : props.noOfQuestions.toString(),
      durationMinutes: props.changeddurationMinutes
        ? props.changeddurationMinutes
        : props.durationMinutes.toString(),
      passPercentage: props.changedpassPercentage
        ? props.changedpassPercentage
        : props.passPercentage.toString(),
      questionsRandomized: props.changedQuesRandoptions
        ? props.changedQuesRandoptions
        : props.questionsRandomized,
      answersMust: props.changedanswersMust
        ? props.changedanswersMust
        : props.answersMust,
      enableNegativeMark: props.changedenableNegativeMark
        ? props.changedenableNegativeMark
        : props.enableNegativeMark,
      negativeMarkValue: props.changednegativeMarkValue
        ? props.changednegativeMarkValue
        : props.negativeMarkValue.toString(),
    };
    console.log(data_map);
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
      fetch("https://localhost:8443/OnlineExamPortal/control/UpdateExamMaster", {
        method: "PUT",
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
          props.fetchExam();
        });
    }
    setShow(!show)
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <FontAwesomeIcon icon={faFileEdit} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
        // className='w-100'
      >
        {/*  */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Exam Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExamForm
            submitHandler={submitHandler}
            buttonName={props.buttonName}
            handleQuestionsRandomizedChange={
              props.handleQuestionsRandomizedChange
            }
            option={props.option}
            changeQuesRandHandler={props.changeQuesRandHandler}
            changeNegMarkHandler={props.changeNegMarkHandler}
            changePassPercentHandler={props.changePassPercentHandler}
            changeEnableAnsMustHandler={props.changeEnableAnsMustHandler}
            changeEnableNegMarkHandler={props.changeEnableNegMarkHandler}
            changeQuesHandler={props.changeQuesHandler}
            changeDurationHandler={props.changeDurationHandler}
            changeCreateDateHandler={props.changeCreateDateHandler}
            changeExpireDateHandler={props.changeExpireDateHandler}
            changeDescHandler={props.changeDescHandler}
            changeExamNameHandler={props.changeExamNameHandler}
            handleCloseExam={handleClose}
            NegMarkoptions={props.NegMarkoptions}
            AnswerMustoptions={props.AnswerMustoptions}
            handleenableNegativeMarkChange={
              props.handleenableNegativeMarkChange
            }
            handleAnswersMustChange={props.handleAnswersMustChange}
            description={props.description}
            examName={props.examName}
            noOfQuestions={props.noOfQuestions}
            durationMinutes={props.durationMinutes}
            creationDate={props.creationDate}
            expirationDate={props.expirationDate}
            answersMust={props.answersMust}
            questionsRandomized={props.questionsRandomized}
            passPercentage={props.passPercentage}
            enableNegativeMark={props.enableNegativeMark}
            negativeMarkValue={props.negativeMarkValue}
          />
        </Modal.Body>
        {/* <Modal.Footer className='text-center'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ExamModalEditSample;
