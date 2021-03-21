import React from 'react';
import ExtraLogin from '../ExtraLogin/ExtraLogin';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="container">
      {/* Login with Email form */}
      <LoginForm></LoginForm>

      <div className="text-center"><h5>Or</h5></div>

      {/* Login with Twitter and Github */}
      <ExtraLogin></ExtraLogin>
    </div>
  );
};

export default Login;