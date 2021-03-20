import React, { useContext } from 'react';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {UserContext} from '../../App';
import firebaseConfig from '../Login/firebase.config';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    error: ''
  });
  const {displayName, email, password} = user;
  console.log(user);

  let passwordValue;
  let cPasswordValue;
  
  const handleChange = (e) => {
    const getValue = e.target.value;
    const getName = e.target.name;
    const getId = e.target.id;
    const nameChecker = getId === "displayName";
    const emailChecker = getId === "email";
    const passwordChecker = getId === "password";
    const cPasswordChecker = getId === "confirmPassword";

    let isFieldValid;
    
    if (nameChecker) {
      console.log(getValue);
      isFieldValid = true;
    }
    if (emailChecker) {
      const emailValidator = /\S+@\S+\.\S+/.test(getValue);
      emailValidator && console.log(getValue);
      isFieldValid = emailValidator;
    }
    if (passwordChecker || cPasswordChecker) {
      const passwordValidator = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(getValue);
      passwordValidator && console.log(getValue);
      
      if (!newUser && passwordChecker) {
        isFieldValid = true
      } else {
        if (passwordChecker) {
          passwordValue = getValue;
        }
        if (cPasswordChecker) {
          cPasswordValue = getValue;
        }
        let matchPassword = passwordValue === cPasswordValue;
        console.log(cPasswordValue, passwordValue, matchPassword);
        isFieldValid = passwordValidator && matchPassword;
      }
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[getName] = getValue;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    if (newUser && displayName && email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        setUser(newUserInfo);
        newUserInfo.isSignIn = true;
        setUser(newUserInfo);
        // Signed in
        const users = userCredential.user;
        updateUserInfo(displayName);
        console.log(users);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        const errorMessage = error.message;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
        console.log(errorMessage);
      });
    }

    if (!newUser && email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const {displayName} = user;
        const signedInUser = {name: displayName};
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
    event.preventDefault();
  }

  // Update User Name
  const updateUserInfo = (userInfo) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: displayName
    }).then(function() {
      console.log('Username Update successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  const handleLoginText = (newUser) ? "Register" : "Login";
  const newUserToggler = (newUser) ?
    <p>Already have an account? <span className="new-user-toggler" onClick={() => setNewUser(!newUser)}>Login</span></p> :
    <p>Don't have an account? <span className="new-user-toggler" onClick={() => setNewUser(!newUser)}>Create an account</span></p>;
  return (
    <div className="m-3 border rounded">
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="div-input"><h3>{handleLoginText}</h3></div>
        {
          newUser &&  <div className="div-input">
                        <input className="input" type="text" name="displayName" id="displayName" placeholder="Name" onChange={handleChange} required/>
                        <p>{displayName}</p>
                      </div>
        }
        <div className="div-input">
          <input className="input" type="text" name="email" id="email" placeholder="Email" onChange={handleChange} required/>
          <p>{email}</p>
        </div>
        <div className="div-input">
          <input className="input" type="password" name="password" id="password" placeholder="Password" onChange={handleChange} required/>
          <p>{password}</p>
        </div>
        {
          newUser &&  <>
                        <div className="text-right div-input">
                          <div className=""><small>Password must be 6 or more character in length</small></div>
                          <div><small>Password must contain 1 or more letter characters</small></div>
                          <div><small>Password must contain 1 or more digit characters</small></div>
                          <div><small>Password must contain 1 or more special characters</small></div>
                        </div>
                        <div className="div-input">
                          <input className="input" type="password" name="password" id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
                        </div>
                        <div className="div-input row">
                          <div className="col-md-6">
                            <input type="checkbox" name="remember" id="remember" className="form-checkbox"/>
                            <label className="form-checkbox" htmlFor="remember">Remember Me</label>
                          </div>
                          <div className="col-md-6 text-right">Forgot Password</div>
                        </div>
                      </>
        }
        <div className="div-input"><input type="submit" value="Submit" id="submit" className="btn btn-submit text-white rounded"/></div>
      </form>
      <div className="text-center">
        {newUserToggler}
      </div>
    </div>
  );
};

export default LoginForm;