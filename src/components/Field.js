import { data, error } from 'jquery';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
// import './style2.module.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import FontAwesomeIcon from 'react-fontawesome';

function Field({ change, title, rolestate }) {
    var element = null;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        element = document.getElementById("error1");
        console.log(element);
    });
    const nav = useNavigate();
    var loginandvalidation = (e) => {
        // e.preventdefault();
        console.log("entered validation");
        var form = document.getElementById("accesspanel");
        const formData1 = new FormData(form);
        let email = formData1.get("username");
        let password = formData1.get("password");
        const map = {
            USERNAME: email,
            PASSWORD: password
        }
        let errorpassword = "Please enter the password";
        let erroremail = "Please enter the email";
        console.log(email + " " + password);
        if (email === "") {
            console.log("email is not null");
            // document.getElementById('error2').innerHTML = "";
            document.getElementById('error1').innerHTML = erroremail;
            document.getElementById('exampleInputEmail1').style.borderColor = 'red';
        }
        else {
            document.getElementById('error1').innerHTML = "";
            document.getElementById('exampleInputEmail1').style.borderColor = 'black';
        }
        if (password === "") {
            console.log(errorpassword);
            document.getElementById('error2').innerHTML = errorpassword;
            document.getElementById('exampleInputPassword1').style.borderColor = 'red';
            // document.getElementById('error1').innerHTML = "";
        }
        else {
            document.getElementById('error2').innerHTML = "";
            document.getElementById('error1').innerHTML = "";
            document.getElementById('exampleInputPassword1').style.borderColor = 'black';
            let mailregex = /^[A-Za-z0-9+_.-]+@(.+)$/;
            let passregex = /^.{5,}/;
            if (mailregex.test(email)) {
                document.getElementById('error1').innerHTML = '';
                document.getElementById('exampleInputEmail1').style.borderColor = 'black';
                if (passregex.test(password)) {
                    document.getElementById('error2').innerHTML = '';
                    document.getElementById('exampleInputPassword1').style.borderColor = 'black';
                    login(map);
                }
                else {
                    document.getElementById('error2').innerHTML = 'Invalid Password type';
                    document.getElementById('exampleInputPassword1').style.borderColor = 'red';
                    // element.innerHTML = "Invalid password type";
                }
            }
            else {
                document.getElementById('error1').innerHTML = 'Invalid Email type';
                document.getElementById('exampleInputEmail1').style.borderColor = 'red';
                // element.innerHTML = "Invalid Email type";
            }

        }

    }


    var login = (add) => {
        setLoading(true);
        console.log("entered loginserver", add);
        fetch('https://localhost:8443/OnlineExamPortal/control/Validate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(add)

        }).then(response => response.json()).then(data => {
            setLoading(false);
            console.log(data.result);
            if (data.result == "error") {
                // element.innerHTML = "Incorrect Email or Password";
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: "Incorrect Email or Password",
                    footer: "Error from the backend"
                });
                // alert("Incorrect Email or Password");
            }
            else if (data.result == "HelperError") {

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
                // element.innerHTML="Login success";
                // alert("Login success");
                Swal.fire({
                    icon: "success",
                    title: "Welcome",
                    text: "You Have Logged In",
                    footer: "Powerful People Make Places Powerful"
                });
                if (data.Role == "ADMIN") {
                    rolestate("admin");
                    nav("/AdminDashboard");
                }
                else if (data.Role == "user") {
                    rolestate("user");
                    nav("/dashboard");
                }
            }
        }).catch(error => {
            setLoading(false);
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
    return (
        <div className='container-fluid'>
            {loading ? <img style={{ marginLeft: 280 }} src='loading.gif' /> : (
                <form className='mx-auto field' id='accesspanel' onSubmit={loginandvalidation} >
                    <h4 className='text-center'>{title}</h4>
                    <div className="mb-3 mt-5">
                        <label className="form-label lable">Email address*</label>
                        <input type="text" className="form-control control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' autoFocus />
                        <p id='error1' style={{ color: 'red' }}></p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label lable">Password*</label>
                        <input type="password" className="form-control control" id="exampleInputPassword1" name='password' /><span className='eye'><img id='eyepic' src='eye.png' style={{ width: 30, marginTop: -65, marginLeft: 210 }} onClick={eye} /></span>
                        <p id='error2' style={{ color: 'red', marginTop: -20 }}></p>
                        <div id="emailHelp" className="form-text" style={{ marginTop: -20 }}><Link onClick={change} style={{ color: 'blue' }}>Sign Up</Link></div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2" style={{
                        width: "100%",
                        border: "none",
                        borderRadius: "50px",
                        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(75,14,154,1) 35%, rgba(0,212,255,1) 100%)"
                    }}>Login</button>
                </form>)
            }
        </div >
    )
}

export default Field
