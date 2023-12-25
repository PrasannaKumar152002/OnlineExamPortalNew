import { useState, useEffect } from "react";
import TopicForm from "../Dashboard/Form/TopicForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TopicModalEditSample from "../../../Modal/Edit/TopicModalEditSample";

function Topic() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });
  const [topics, setTopics] = useState([]);
  const [changedTopic, setChangedTopic] = useState("");

  const changeHandler = (e) => {
    setChangedTopic(e.target.value);
    console.log("***************************************************");
    console.log(e.target.value);
  };

  function handleAddSubject() {
    setDisplay({ display: "block" });
  }

  function handleCloseAdd() {
    setDisplay({ display: "none" });
  }
  const createSubmitHandler = (e) => {
    e.preventDefault();
    var form = document.getElementById("topic");
    const formData = new FormData(form);
    var data_map = {
      topicName: formData.get("topicName"),
    };
    // FETCH
    if (data_map.topicName === "") {
      document.getElementById("topicnameerr").style.display = "block";
    } else {
      try {
        document.getElementById("topicnameerr").style.display = "none";
        fetch("https://localhost:8443/onlineexam/control/CreateTopicMaster", {
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
            // console.log(
            //   "-------------------------------------------------------------------"
            // );
            // console.log(fetch_data.topicName);
            // var addTopic = fetch_data.topicName;
            // setTopics([...topics,addTopic]);
            fetchTopics();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // --------------- Fetching all subjects from db.json file-------------------------
  // const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

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
  console.log("''''''''''''''''''''''''''''''''''''''");
  console.log(topics);

  const handleDeleteTopic = async (id) => {
    try {
      const response = await fetch(
        "https://localhost:8443/onlineexam/control/DeleteTopicMaster",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      var list = data.TopicMaster;
      setTopics((prevList) => [prevList, ...list]);
    } catch (error) {
      console.log(error);
    }
  };

  if (topics.length === 0)
    return (
      <>
        <div>
          <div className="d-flex justify-content-center min-vh-2 text-black">
            <TopicForm
              buttonName="CREATE"
              type="submit"
              submitHandler={createSubmitHandler}
              handleCloseAdd={handleCloseAdd}
            />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div>
        <div>
          <h2 align="center">Topic List</h2>
        </div>

        <div className="table-responsive-sm">
          <table className="table table-responsive-sm table-borderless">
            <thead>
              <tr>
                <th scope="col">Topic ID</th>
                <th scope="col">Topic Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {topics &&
                topics.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.topicId}</td>
                      <td>{data.topicName}</td>
                      {/*  style={{background:"none", backgroundColor:"none"}} */}
                      <td
                      // onClick={() => handleEditTopic(data)}

                      // onClick={handleShow}
                      // style={{ fontWeight: "bolder",background: "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)" }}
                      // className="border-none px-3 py-1 mt-4 mb-2 text-white rounded-0"
                      >
                        <TopicModalEditSample
                          type="button"
                          buttonName="UPDATE"
                          topicName={data.topicName}
                          fetchId={data.topicId}
                          changedTopic={changedTopic}
                          fetchTopics={fetchTopics}
                          changeHandler={changeHandler}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={()=>handleDeleteTopic(data.topicId)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            onClick={handleAddSubject}
            className="border  px-3 py-1 mt-4 mb-2 text-white"
            style={{
              fontWeight: "bolder",
              background:
                "radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)",
            }}
          >
            Add Topic
          </button>
        </div>

        {/* Add Subject */}

        <div style={display}>
          <div className="d-flex justify-content-center min-vh-2 text-black">
            <TopicForm
              type="submit"
              buttonName="CREATE"
              submitHandler={createSubmitHandler}
              handleCloseAdd={handleCloseAdd}
              changedTopic={changedTopic}
              changeHandler={changeHandler}
            />
          </div>
        </div>
        {/* <div>{updateTopics && <TopicForm />} </div> */}
      </div>
    </>
  );
}

export default Topic;
