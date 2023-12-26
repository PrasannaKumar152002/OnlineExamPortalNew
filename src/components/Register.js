import { timeline } from 'animejs';
import { data, error } from 'jquery';
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


function Register({ change, title }) {
    var element = null;
    var email=null;
    useEffect(() => {
        // element = document.getElementById("success");
        // console.log(element);
    });
    const nav = useNavigate();
    var loginandvalidation = () => {
        console.log("entered validation");
        var form = document.getElementById("accesspanel");
        const formData1 = new FormData(form);
        email = formData1.get("username");
        let password = formData1.get("password");
        let firstname = formData1.get("firstname");
        let lastname = formData1.get("lastname");
        let confirmpassword = formData1.get("confirmpassword");
        const map = {
            USERNAME: email,
            PASSWORD: password,
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            CONFIRMPASSWORD: confirmpassword

        }
        let errorpassword = "please enter the password";
        let erroremail = "please enter the email";
        let errorfirstname = "please enter the firstname";
        let errorlastname = "please enter the lastname";
        let errorcpass = "please enter the confirmpassword";
        console.log(email + " " + password);
        if (email === "") {
            // console.log("email is not null");
            console.log(erroremail);
            document.getElementById('error1').innerHTML = erroremail;
            document.getElementById('exampleInputEmail1').style.borderColor = 'red';
        }
        else {
            document.getElementById('error1').innerHTML = "";
            document.getElementById('exampleInputEmail1').style.borderColor = 'black';
        }
        if (firstname === "") {
            console.log(errorfirstname);
            document.getElementById('error2').innerHTML = errorfirstname;
            document.getElementById('exampleInputFirstName1').style.borderColor = 'red';
        }
        else {
            document.getElementById('error2').innerHTML = "";
            document.getElementById('exampleInputFirstName1').style.borderColor = 'black';
        }

        if (lastname === "") {
            console.log(errorlastname);
            document.getElementById('error3').innerHTML = errorlastname;
            document.getElementById('exampleInputLastName1').style.borderColor = 'red';
        }
        else {
            document.getElementById('error3').innerHTML = "";
            document.getElementById('exampleInputLastName1').style.borderColor = 'black';
        }

        if (password === "") {
            console.log(errorpassword);
            document.getElementById('error4').innerHTML = errorpassword;
            document.getElementById('exampleInputPassword1').style.borderColor = 'red';

        }
        else {
            document.getElementById('error4').innerHTML = "";
            document.getElementById('exampleInputPassword1').style.borderColor = 'black';
        }

        if (confirmpassword === "") {
            console.log(errorcpass);
            document.getElementById('error5').innerHTML = errorcpass;
            document.getElementById('exampleInputCPassword1').style.borderColor = 'red';
        }
        else {
            document.getElementById('error1').innerHTML = "";
            document.getElementById('error2').innerHTML = "";
            document.getElementById('error3').innerHTML = "";
            document.getElementById('error4').innerHTML = "";
            document.getElementById('error5').innerHTML = "";
            document.getElementById('exampleInputCPassword1').style.borderColor = 'black';
            if (password === confirmpassword) {
                document.getElementById('error5').innerHTML = "";
                document.getElementById('exampleInputCPassword1').style.borderColor = 'black';
                let mailregex = /^[A-Za-z0-9+_.-]+@(.+)$/;
                let passregex = /^.{5,}/;
                if (mailregex.test(email)) {
                    document.getElementById('error1').innerHTML = "";
                    document.getElementById('exampleInputEmail1').style.borderColor = 'black';
                    if (passregex.test(password)) {
                        document.getElementById('error4').innerHTML = "";
                        document.getElementById('exampleInputPassword1').style.borderColor = 'black';
                        login(map);
                    }
                    else {
                        document.getElementById('error4').innerHTML = "Invalid password type";
                        document.getElementById('exampleInputPassword1').style.borderColor = 'red';
                        // element.innerHTML = "Invalid password type";
                    }
                }
                else {
                    document.getElementById('error1').innerHTML = "Invalid Email type";
                    // element.innerHTML = "Invalid Email type";
                    document.getElementById('exampleInputEmail1').style.borderColor = 'red';
                }
            }
            else {
                document.getElementById('error5').innerHTML = "Password and Conformpassword field does't match";
                // element.innerHTML = "Password and Conformpassword field does't match";
                document.getElementById('exampleInputCPassword1').style.borderColor = 'red';
            }

        }

    }


    var login = (add) => {
        console.log("entered loginserver", add);
        fetch('https://localhost:8443/onlineExam/control/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(add)

        }).then(response => response.json()).then(data => {
            console.log(data.result);
            if (data.result === "error") {
                // element.innerHTML = "Incorrect Email or Password";
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: "Incorrect Email or Password",
                    footer: "Error from the backend"
                });
                // alert("Incorrect Email or Password");
            }
            else if (data.result === "HelperError") {

                if (data.username != undefined && data.password != undefined) {
                    Swal.fire({
                        icon: "error",
                        title: "Type Error",
                        text: "Invalid Email or Password type",
                        footer: "Error from the backend"
                    });
                    // element.innerHTML = "Invalid Email and Password type";
                    // alert("Invalid Email and Password type");
                }
                else if (data.username != undefined) {
                    // element.innerHTML = data.username;
                    Swal.fire({
                        icon: "error",
                        title: "Type Error",
                        text: "Invalid Email type",
                        footer: "Error from the backend"
                    });
                    // alert(data.username);
                }
                else if (data.password != undefined) {
                    // element.innerHTML = data.password;
                    Swal.fire({
                        icon: "error",
                        title: "Type Error",
                        text: "Invalid Password type",
                        footer: "Error from the backend"
                    });
                    // alert(data.password);
                }
            }
            else {
                console.log(data.RegisterError)
                if (data.RegisterError == "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Registration Failed",
                        text: "user with ID "+email+" already exists.",
                        footer: "Error from the backend"
                    });
                }
                else {
                    // document.getElementById("success").innerHTML = "Registration success";
                    // element.style.color = "green";
                    Swal.fire({
                        icon: "success",
                        title: "Registration Success",
                        text: "Thank You For Registering With Us",
                        footer: "You can login to your account now"
                    });
                }
                document.getElementById("exampleInputEmail1").value = "";
                document.getElementById("exampleInputmobile1").value = "";
                document.getElementById("exampleInputFirstName1").value = "";
                document.getElementById("exampleInputLastName1").value = "";
                document.getElementById("exampleInputPassword1").value = "";
                document.getElementById("exampleInputCPassword1").value = "";
                // element.style.color = "green";
                // alert("Login success");

            }
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: error
            });
        })
        //document.getElementById("sumbit").reset();
    }
    const [geteye, seteye] = useState(false);
    var eye = () => {
        seteye(!geteye);
        if (geteye) {
            document.getElementById("exampleInputPassword1").type = "text";
            document.getElementById("eyepic").src = "eyeslash.png";
            document.getElementById("eyepic").style.width = "20px";
        }
        else {
            document.getElementById("exampleInputPassword1").type = "password";
            document.getElementById("eyepic").src = "eye.png";
            document.getElementById("eyepic").style.width = "30px";
        }
    }
    const [getceye, setceye] = useState(false);
    var ceye = () => {
        setceye(!getceye);
        if (getceye) {
            document.getElementById("exampleInputCPassword1").type = "text";
            document.getElementById("ceyepic").src = "eyeslash.png";
            document.getElementById("ceyepic").style.width = "20px";
        }
        else {
            document.getElementById("exampleInputCPassword1").type = "password";
            document.getElementById("ceyepic").src = "eye.png";
            document.getElementById("ceyepic").style.width = "30px";
        }
    }
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // })
    return (
        <div className='container-fluid mt-4'>
            <form className='mx-auto row field' id='accesspanel' style={{ width: 600, marginTop: -2 }} onSubmit={loginandvalidation} >
                <h4 className='text-center mb-3'>{title}</h4>
                <div className="mb-3 mt-2 col-md-6">
                    <label for="exampleInputEmail1" className="form-label">Email address*</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' autoFocus />
                    <p id='error1' style={{ color: 'red' }}></p>
                </div>
                <div className="mb-3 mt-2 col-md-6">
                    <label for="exampleInputEmail1" className="form-label">Mobile No</label>
                    <input type="text" className="form-control" id="exampleInputmobile1" aria-describedby="emailHelp" name='mobile' />
                </div>
                <div className="mb-3 col-md-6">
                    <label for="exampleInputEmail1" className="form-label">First Name*</label>
                    <input type="text" className="form-control" id="exampleInputFirstName1" aria-describedby="emailHelp" name='firstname' />
                    <p id='error2' style={{ color: 'red' }}></p>
                </div>
                <div className="mb-3 col-md-6">
                    <label for="exampleInputEmail1" className="form-label">Last Name*</label>
                    <input type="text" className="form-control" id="exampleInputLastName1" aria-describedby="emailHelp" name='lastname' />
                    <p id='error3' style={{ color: 'red' }}></p>
                </div>
                <div className="col-md-6">
                    <label for="exampleInputEmail1" className="form-label">Password*</label>
                    {
                        <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Password must contain alteast <strong>5 letters</strong>
                                </Tooltip>
                            }
                        >
                            <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" name='password' /></OverlayTrigger>
                    }<span className='eye'><img id='eyepic' src='eye.png' style={{ width: 30, marginTop: -65, marginLeft: 190 }} onClick={eye} /></span>
                    <p id='error4' style={{ color: 'red', marginTop: -20 }}></p>
                </div>
                <div className="col-md-6">
                    <label for="exampleInputPassword1" className="form-label">Confirm Password*</label>
                    {
                        <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Password must contain alteast <strong>5 letters</strong>
                                </Tooltip>
                            }
                        >
                            <input type="password" className="form-control" id="exampleInputCPassword1" name='confirmpassword' />

                            {/* <img style={{ marginTop: -115, marginLeft: 230, width:30,height:30,cursor:"help"}} src='tooltip.png' /> */}
                        </OverlayTrigger>
                    }<span className='eye'><img id='ceyepic' src='eye.png' style={{ width: 30, marginTop: -65, marginLeft: 190 }} onClick={ceye} /></span>
                    <p id='error5' style={{ color: 'red', marginTop: -20 }}></p>
                </div>
                <div id="emailHelp" className="form-text" style={{ marginTop: -10 }}><Link onClick={change} style={{ color: 'blue' }}>Sign In</Link></div>
                <button type="submit" className="mt-3 btn btn-primary " style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "50px",
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(75,14,154,1) 35%, rgba(0,212,255,1) 100%)"
                }}>Register</button>
            </form>
        </div>
    )
}

export default Register
