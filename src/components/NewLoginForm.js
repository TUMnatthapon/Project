import React, { useState } from 'react'
import * as firebase from 'firebase/app'
import "firebase/auth";
import '../App.css'

const NewLoginForm = (props) => {

    const { setLogin } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignUPFirebase = e => {
        e.preventDefault(); alert('Resgister Done !!!');
        firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
            console.log(data);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const Login = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            setLogin(true)
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    console.log(email, password);
    const SIGNUP = (
        <div className="top">
            <form>
                <div>
                    <label className="right3" >First name</label>
                    <input className="input" placeholder="Enter First name" />
                </div>
                <div>
                    <label className="right4" >Last name</label>
                    <input className="input" placeholder="Enter Last name " />
                </div>
                <label className="right">Email  </label>
                <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                    <label className="right2" >Password  </label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div >
                <div>
                    <button className="btm" onClick={SignUPFirebase}> REGISTER </button>
                </div>
            </form>
        </div>
    )
    const LOGIN = (
        <div className="top">
            <form>
                <label className="right">Email </label>
                <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                    <label className="right2">Password </label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div >

                <div>
                    <button className="btm" onClick={Login}> LOGIN </button>
                </div>
            </form>
        </div>
    )
    const [Display, setDisplay] = useState(false);

    
    return (
        <div className="frame">
            <h1>SMART CAMERA</h1>
            <button className="btr" onClick={() => setDisplay(false)}>SIGN-IN</button>
            <button className="btm" onClick={() => setDisplay(true)}> SIGN-UP</button>
            {Display === false ? LOGIN : SIGNUP}

        </div>
    )
}
export default NewLoginForm;
