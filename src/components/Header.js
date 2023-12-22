import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './style2.module.css';

function Header({ title }) {
    var link = "/login";
    if (title == "Home") {
        link = "/"
    }
    const [navCollapse, setNavCollapse] = useState(false);
    // var nav=useNavigate();
    return (
        <div className={styles.navbar}>
            <nav className="navbar navbar-light ">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="exam3.png" alt="" width="140"/>
                    </a>
                    <Link to={link} className={styles.hello} style={{fontFamily:'monospace',paddingLeft:25}}>{title}</Link>
                </div>

            </nav>


            {/* <p className="mt-5 text-center">Get a step-by-step written explanation here: <a href="https://codingyaar.com/bootstrap-navbar-button-right/" target="_blank">Bootstrap Navbar Button Right</a> </p>

            <p className="mt-5 text-center">Get a step-by-step video explanation here: <a href="https://youtu.be/O-_VQicPOS4" target="_blank">Bootstrap Navbar Button Right</a> </p> */}
            {/* // <div className="navbar"> 
        //     <img className="logo" src="./exam3.png" />
        //     <ul>
        //         <li><Link className='link' to={link}>{title}</Link></li>
        //     </ul>
        // </div> */}
        </div >
    )
}
Header.defaultProps = {
    title: "Login"
};

export default Header
