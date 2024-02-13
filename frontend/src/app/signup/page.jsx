"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

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
      <div className="col-md-4 mx-auto py-5">
        <div className="card">
          <div className="card-body">
            <h1>Signup Page</h1>
            <hr />
            <form onSubmit={signupForm.handleSubmit}>

              <label htmlFor="username">Username</label>
              <span className='error-label text-danger'>  { signupForm.touched.username && signupForm.errors.username}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="text"
                id='username'
                value={signupForm.values.username}
                onChange={signupForm.handleChange}
                placeholder='Username'
              />

              <label htmlFor="email">Email</label>
              <span className='error-label text-danger'>  { signupForm.touched.email && signupForm.errors.email}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="text"
                id='email'
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                placeholder='Email'
              />

              <label htmlFor="password">Password</label>
              <span className='error-label text-danger'>  { signupForm.touched.password && signupForm.errors.password}</span>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg'
                type="password"
                id='password'
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
                placeholder='Password'
              />

              <button
                type='submit'
                className="btn btn-primary mt-4 mb-2">Signup here</button>
            </form>

            <div>
              <span>
                Already have an account?{" "}
                <Link href="/login">Login here</Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup