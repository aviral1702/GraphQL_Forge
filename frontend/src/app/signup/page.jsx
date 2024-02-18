"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import * as css from './signup.css';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.')
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {
        resetForm();
        // enqueueSnackbar('Signup successful', {
        //   variant: 'success',
        //   anchorOrigin: {
        //     vertical: 'top',
        //     horizontal: 'right'
        //   }
        // });
        toast.success('Signup successful');
        router.push('/login');
      } else {
        // enqueueSnackbar('Something went wrong', {
        //   variant: 'error',
        //   anchorOrigin: {
        //     vertical: 'top',
        //     horizontal: 'right'
        //   }
        // })
        toast.error('Something went wrong');
      }

    },

    validationSchema: SignupSchema

  });

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className="py-5" id='signup-page'>
        <div className="card" id='card'>
          <div className="card-body">
            <h1 className='title'>Register Yourself !!!</h1>
            <hr />
            <div className='image'>
              <img src="https://www.vhv.rs/dpng/f/509-5097256_new-svg-image-login-logo-user-icon-hd.png" alt="" />
            </div>
            <form onSubmit={signupForm.handleSubmit}>
              <i class="fa-solid fa-user"></i>
              <label htmlFor="username">Username</label>
              <span className='error-label text-danger'>  {signupForm.touched.username && signupForm.errors.username}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="text"
                id='username'
                value={signupForm.values.username}
                onChange={signupForm.handleChange}
                placeholder='Enter Your Username'
              />

              <i class="fa-solid fa-envelope"></i>
              <label htmlFor="email">Email</label>
              <span className='error-label text-danger'>  {signupForm.touched.email && signupForm.errors.email}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="text"
                id='email'
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                placeholder='Enter Your Email'
              />

              <i class="fa-solid fa-key"></i>
              <label htmlFor="password">Password</label>
              <span className='error-label text-danger'>  {signupForm.touched.password && signupForm.errors.password}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="password"
                id='password'
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
                placeholder='Enter Your Password'
              />

              <button
                type='submit'
                className="btn btn-danger mt-4 mb-2" id='button'>Signup</button>
            </form>

            <div>
              <span>
                Already have an account?{" "}
                <Link href="/login" id='login'>Login here</Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup