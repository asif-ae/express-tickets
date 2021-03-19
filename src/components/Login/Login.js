import React from 'react';
import ExtraLogin from '../ExtraLogin/ExtraLogin';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="container">
      <LoginForm></LoginForm>
      <div className="text-center"><h5>Or</h5></div>
      <ExtraLogin></ExtraLogin>
    </div>
  );
};

export default Login;