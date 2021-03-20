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
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [errors, setErrors] = useState({
    error: ''
  });
  const {error} = errors;

  const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    firebase
    .auth()
    .signInWithPopup(githubProvider)
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
  const handleTwitterSignIn = () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();

    firebase
    .auth()
    .signInWithPopup(twitterProvider)
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

  return (
    <div>
      <p className="text-center text-danger">{error}</p>
      <div className="d-flex justify-content-center my-3">
        <div className="rounded-pill twitter-box" onClick={handleTwitterSignIn}>
          <div className="p-2 d-flex align-items-center">
            <div className="d-inline-block rounded-circle icon-style twitter-icon">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </div>
            <div className="d-inline-block mx-3 px-3 text-size twitter-text">Continue with Twitter</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        <div className="rounded-pill github-box" onClick={handleGithubSignIn}>
          <div className="p-2 d-flex align-items-center">
            <div className="d-inline-block rounded-circle icon-style github-icon">
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </div>
            <div className="d-inline-block mx-3 px-3 text-size github-text">Continue with Github</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraLogin;