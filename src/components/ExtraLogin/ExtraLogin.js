import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const ExtraLogin = () => {
  const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorMessage);
    });
  }
  const handleTwitterSignIn = () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();

    firebase
    .auth()
    .signInWithPopup(twitterProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      console.log(user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorMessage)
    });
  }

  return (
    <div>
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