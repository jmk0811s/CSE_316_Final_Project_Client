import React, {useEffect, useState} from 'react'
import '../App.css';
import useWindowDimensions from "./UseWindowDimensions";
import SignUp from "./SignUp";
import {loginUserAPIMethod} from "../api/client";


function Login(props){

    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const [signT, setSignT] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setSignT(signT);
    },[signT])


    const GetWidth = () => {
        const {width, height} = useWindowDimensions();
        return width;
    };


    const testLogIn = (e) => {
        e.preventDefault();
        const user1 = {
            "password" : pw,
            "email": email
        }
        loginUserAPIMethod(user1).then((ret) =>{
            if(ret){
                props.setCurrUser(email);
                props.setLogin(true);
            }
            else{
                setError("Invalid email or password. Try Again");
            }
        });
    }

    let width = GetWidth();

    let handleChange = (prop) => (event) => {
        if (prop === "email"){
            setEmail(event.target.value);
        }
        else if (prop === "pw"){
            setPw(event.target.value);
        }
        else if (prop === 'signT'){
            setSignT(true);
        }
    }

    return (
        <div className='loginPage'>
            <h1 style={{textAlign: 'center'}}>
                Day Logger
            </h1>
            <h2 style={{textAlign: 'center'}}>
                Organize your daily records in one place.
            </h2>

            <div className='login-content'>
                <form style = {{textAlign: 'center'}}>
                    <li id="email">
                        <p style={{margin: 0, textAlign: 'left'}}>Email</p>
                        <input type="text"
                               id="iEmail"
                               name="Email"
                               value = {email}
                               style={{width: '100%' ,height: '20px', alignItems: 'center'}}
                               onChange={handleChange("email")}></input>
                    </li>
                    <li id="password">
                        <p style={{margin: 0, textAlign: 'left'}}>Password</p>
                        <input type="text"
                               id="iPw"
                               name="pw"
                               value = {pw}
                               style={{width: '100%', height: '20px'}}
                               onChange={handleChange("pw")}></input>
                    </li>
                    <li>
                        {error?<label style = {{color: 'red'}}>{error}</label>:<></>}
                    </li>
                    <li>
                        <button onClick={testLogIn} type="submit" style={{alignItems: 'center', width: '100%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'rgb(58, 99, 197)',color: '#ffffff'}}>Log in</button>
                    </li>
                    <hr></hr>

                </form>
                <li style ={{paddingTop:20, textAlign: 'center'}}>
                    <button onClick={handleChange('signT')} style={{alignItems: 'center', width: '30%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'green',color: '#ffffff'}}>Create New Account</button>
                </li>
            </div>
            <SignUp
                signT={signT}
                setSignT = {setSignT}
            ></SignUp>
        </div>

    );
}

export default Login;