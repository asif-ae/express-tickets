import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const ExtraLogin = () => {
  // Use History Hook
  const history = useHistory();
  // Use Location Hook
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // Update Error Message
  const [errors, setErrors] = useState({
    error: ''
  });
  // Destructuring UseState
  const {error} = errors;

  const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    // Fetching data
    firebaseAuth(githubProvider);
  }
  const handleTwitterSignIn = () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();

    // Created a function for simplicity
    firebaseAuth(twitterProvider);
  }

  // Firebase Authentication Function
  const firebaseAuth = (providers) => {
    firebase
    .auth()
    .signInWithPopup(providers)
    .then((result) => {
      const user = result.user;
      const {displayName} = user;
      const signedInUser = {name: displayName};
      setLoggedInUser(signedInUser);
      history.replace(from);
    }).catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {...errors};
      newUserInfo.error = errorMessage;
      setErrors(newUserInfo);
    });
  }


  // Display Authentication Button Function
  const displayAuthBoxes = (box, handleSignIn, icon, fontIcon, text, brands) => {
    return (
      <div className="d-flex justify-content-center my-3">
        <div className={`rounded-pill ${box}`} onClick={handleSignIn}>
          <div className="p-2 d-flex align-items-center">
            <div className={`d-inline-block rounded-circle icon-style ${icon}`}>
              <FontAwesomeIcon icon={fontIcon}></FontAwesomeIcon>
            </div>
            <div className={`d-inline-block mx-3 px-3 text-size ${text}`}>Continue with {brands}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-center text-danger">{error}</p>
      {/* For Twitter */}
      {
        displayAuthBoxes("twitter-box", handleTwitterSignIn, "twitter-icon", faTwitter, "twitter-text", "Twitter")
      }
      {/* For Github */}
      {
        displayAuthBoxes("github-box", handleGithubSignIn, "github-icon", faGithub, "github-text", "Github")
      }
    </div>
  );
};

export default ExtraLogin;