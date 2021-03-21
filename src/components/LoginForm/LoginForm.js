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
  // Use History Hook
  const history = useHistory();
  // Use Location Hook
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // Getting data from parent component
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // This state is define is the person a new user or not
  const [newUser, setNewUser] = useState(false);

  // This useState stored users data
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    error: '',
    success: false
  });
  // Destructuring from user useState
  const {displayName, email, password, error, success} = user;

  // Get the Main Password value
  let passwordValue;
  // Get the Confirm Password value
  let confirmPasswordValue;
  
  // This function is created for checking form value on change
  const handleChange = (e) => {
    // Collecting form information
    const getValue = e.target.value;
    const getName = e.target.name;
    const getId = e.target.id;

    // Check the information collected from the form
    const nameChecker = getId === "displayName";
    const emailChecker = getId === "email";
    const passwordChecker = getId === "password";
    const confirmPasswordChecker = getId === "confirmPassword";

    // Created a variable for checking the field is valid or not
    let isFieldValid;
    
    // Check the name is valid or not
    if (nameChecker) {
      isFieldValid = true;
    }

    // Check the email is valid or not
    if (emailChecker) {
      const emailValidator = /\S+@\S+\.\S+/.test(getValue);
      isFieldValid = emailValidator;
    }

    // Check the password and the confirm password is valid or not
    if (passwordChecker || confirmPasswordChecker) {
      const passwordValidator = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(getValue);
      
      if (!newUser && passwordChecker) {
        isFieldValid = true
      } else {
        if (passwordChecker) {
          passwordValue = getValue;
        }
        if (confirmPasswordChecker) {
          confirmPasswordValue = getValue;
        }
        let matchPassword = passwordValue === confirmPasswordValue;
        isFieldValid = passwordValidator && matchPassword;
      }
    }

    // Created a condition for checking the field is valid or not
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[getName] = getValue;
      setUser(newUserInfo);
    }
  }

  // This function is created for the form submit button
  const handleSubmit = (event) => {
    // This condition is created for register a new user
    if (newUser && displayName && email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.isSignIn = true;
        newUserInfo.success = true;
        setUser(newUserInfo);
        // This will update user information
        updateUserInfo();
      })
      .catch((error) => {
        const newUserInfo = {...user};
        const errorMessage = error.message;
        newUserInfo.success = false;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
    }

    // This condition is created for login a user
    if (!newUser && email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const {displayName} = user;
        const signedInUser = {name: displayName};
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        const errorMessage = error.message;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
    }
    // This event is block auto reload on submit
    event.preventDefault();
  }

  // This function will update the name of a user when the user creating a new account
  const updateUserInfo = () => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: displayName
    }).catch(function(error) {
      console.log(error)
    });
  }

  // Handle login text
  const handleLoginText = (newUser) ? "Register" : "Login";
  // Handle toggler
  const newUserToggler = (newUser) ?
    <p>Already have an account? <span className="new-user-toggler" onClick={() => setNewUser(!newUser)}>Login</span></p> :
    <p>Don't have an account? <span className="new-user-toggler" onClick={() => setNewUser(!newUser)}>Create an account</span></p>;

  // Output Codes
  return (
    <div className="m-3 border rounded">
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="div-input"><h3>{handleLoginText}</h3></div>
        <p className="text-center text-danger">{error}</p>
        { success && <p className="text-center text-success">User created successfully!</p> }
        {
          newUser &&  <div className="div-input">
                        <input className="input" type="text" name="displayName" id="displayName" placeholder="Name" onChange={handleChange} required/>
                      </div>
        }
        <div className="div-input">
          <input className="input" type="text" name="email" id="email" placeholder="Email" onChange={handleChange} required/>
          <p className="text-success">Your Email is valid</p>
        </div>
        <div className="div-input">
          <input className="input" type="password" name="password" id="password" placeholder="Password" onChange={handleChange} required/>
          <p className="text-success">Your Password is valid</p>
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