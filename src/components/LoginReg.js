import React, { useState, useEffect } from 'react';
import { Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';



function Login() {

    //const [newId, setNewId] = useState("");
    const [nameReg, setNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [nameLog, setNameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;


    // checking user login status
    /*
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            //console.log(response);
            if (response.data.isLogin == true)
            {
                console.log(response.data.user);
                console.log(response.data.user[0].username);
                // TODO: check authentication too...
                
            }
        });
    }, []);
    */

    const handleRegister = () => {
        Axios.post("http://localhost:3001/register", {
            name: nameReg,
            password: passwordReg
        }).then((response) => {
            console.log(response);
        });
    };



    const handleLogin = (e) => {
        Axios.post("http://localhost:3001/login", {
            name: nameLog,
            password: passwordLog
        }).then((response) => {
            if (!response.data.auth)
            {
                setLoginStatus(false);
                console.log("user is not auth...");
                console.log(response.data);
            }
            else            // send header to check token
            {
                localStorage.setItem("token", response.data.token);
            }
        }).then(() => {
            Axios.get("http://localhost:3001/login", {
            headers: {
                "user-access-token": localStorage.getItem("token")
            }}).then((response) => {
                //console.log(response);
                if (response.data.isLogin)
                {
                    console.log("You are autheticated!");
                    console.log(response);
                    setLoginStatus(true);
                }
                    // TODO: check authentication too...
            });
        });
    };




    return (
        <div>
            <div className="box">
                <label>Registration</label>
                <br></br>
                    <input placeholder='username' onChange={(e) => { setNameReg(e.target.value) }}/>
                    <br></br>
                    <input type="password" placeholder="password" onChange={(e) => { setPasswordReg(e.target.value) }}/>
                    <br></br>
                    <button className="float-center" onClick={handleRegister}>Register</button>
            </div>
            <br></br>
            <div className="box">
                <label>Login</label>
                <br></br>
                    <input placeholder='your username' onChange={(e) => { setNameLog(e.target.value) }}/>
                    <br></br>
                    <input type="password" placeholder='your password' onChange={(e) => { setPasswordLog(e.target.value) }}/>
                    <br></br>
                    <button className="float-center" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
            <div>
                { loginStatus ? (<Navigate to="/homepage" replace={true}/>) : <p></p> }
            </div>
        </div>
    );
};

export default Login;