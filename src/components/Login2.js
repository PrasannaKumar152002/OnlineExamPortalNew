import React, { useState } from 'react'
import anime from "animejs/lib/anime.es.js"
import $ from 'jquery';
import Field from './Field';
import Header from './Header';
import Footer from './Footer';
// import Admin from './components/admin';
import AdminDashboard from './AdminComponent/AdminDashboard/AdminDashboard';
import Register from './Register';

function Login2({onclk,title,rolestate}) {
    $(document).ready(function () {

        var state = false;

        //$("input:text:visible:first").focus();

        $('#accesspanel').on('submit', function (e) {

            e.preventDefault();

            // state = true;

            // if (state) {
            //     // document.getElementById("litheader").className = "";
            //     // document.getElementById("go").className = "";
            //     document.getElementById("go").value = "Initializing...";
            //     setTimeout(()=>{document.getElementById("go").value = "Authorize";}, 1000)
            // }

            // var state2=true
            // if (state2) {
            //     // document.getElementById("litheader").className = "";
            //     // document.getElementById("go2").className = "";
            //     document.getElementById("go2").value = "Processing...";
            //     setTimeout(()=>{document.getElementById("go").value = "Register";}, 1000)
            // }

        });

    });
    const[form,setform]=useState(true);
    var pagestate=()=>{
        setform(!form);
    }
    return (
        <div>
            <Header onclk={onclk} title={title}/>
            <div className="background-wrap">
                <div className="background"></div>
            </div>
            {form?<Field change={pagestate} title="Log In to Your Account" rolestate={rolestate}/>:<Register change={pagestate} title="Register With Us"/>}
            {/* <AdminDashboard /> */}
        </div>
    )
}

export default Login2
