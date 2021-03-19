import React from 'react';

const LoginForm = () => {
  return (
    <div className="m-3 border rounded">
      <form className="p-5">
        <div className="div-input"><h3>Login</h3></div>
        <div className="div-input"><input className="input" type="text" name="name" placeholder="Name"/></div>
        <div className="div-input"><input className="input" type="text" name="email" placeholder="Email"/></div>
        <div className="div-input"><input className="input" type="password" name="password" placeholder="Password"/></div>
        <div className="div-input"><input className="input" type="password" name="confirmPassword" placeholder="Confirm Password"/></div>
        <div className="div-input row">
          <div className="col-md-6">
            <input type="checkbox" name="remember" id="remember" className="form-checkbox"/>
            <label className="form-checkbox" htmlFor="remember">Remember Me</label>
          </div>
          <div className="col-md-6 text-right">Forgot Password</div>
        </div>
        <div className="div-input"><input type="submit" value="Submit" id="submit" className="btn btn-submit text-white rounded"/></div>
      </form>
      <div className="text-center">
        <p>Don't have an account? <span>Create an account</span></p>
      </div>
    </div>
  );
};

export default LoginForm;