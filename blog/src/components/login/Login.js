import React, { useState } from 'react';
import logo from '../../assets/react-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/thunks/auth';
import { Navigate, useLocation } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, isLoading, error } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const location = useLocation();

  const handleChange = type => (event) => {
    if(type === 'email') setEmail(event.target.value);
    else setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(login({
      email,
      password
    }));
  }

  const showError = () => {
    return error ? (
      <div className="mt-2 text-center alert alert-danger" role="alert">
        {error}
      </div>
    ) : null;
  }

  return !isLoggedIn ? (
    <div className="login-container d-flex">
      <form className="login-form col-3" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo"/>
        </div>
        <div className="login-welcome-container mt-4">
          <h3 className="login-welcome">Welcome back!</h3>
          <p className="login-prompt">Enter your credentials to login.</p>
        </div>
        <div className="mt-4 form-item">
          <label htmlFor="email" className="form-label login-label">Email</label>
          <input id="email" name="email" value={email} onChange={handleChange('email')} className="form-control login-field" type="text" required/>
        </div>
        <div className="mt-4 form-item">
          <label htmlFor="password" className="form-label login-label">Password</label>
          <input id="password" name="password" value={password} onChange={handleChange('password')} className="form-control login-field" type="password" required/>
        </div>
        <div className="mt-4">
          <a className="forgot-password-link" href="#">Forgot password?</a>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn login-button" disabled={isLoading}>Login</button>
        </div>
        {showError()}
      </form>
    </div>
  ) : (
    <Navigate to="/dashboard" state={{from: location}} replace/>
  );
}

export default Login;