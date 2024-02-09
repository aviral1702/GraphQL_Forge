"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
  };

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className="col-md-4 mx-auto py-5">
        <div className="card">
          <div className="card-body">
            <h1>Login Page</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
              className='form-control p-2 border border-gray-300 rounded-lg'
              type="text"
              id='email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder='Email'
            />

            <label htmlFor="password">Password</label>
            <input
              className='form-control p-2 border border-gray-300 rounded-lg'
              type="text"
              id='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='Password'
            />

            <button
              onClick={onLogin}
              className="btn btn-primary mt-4 mb-2">Login here</button>

            <div>
              <span>
                Don't have an account?{" "}
                <Link href="/signup">Signup here</Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;