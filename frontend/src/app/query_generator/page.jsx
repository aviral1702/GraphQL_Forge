'use client';
import React from 'react'

const QueryGenerator = () => {
  const generateResponse = () => {
    const query = document.getElementById('query').value;
  }
  return (
    <div className='vh-100 bg-dark'>
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='form-group text-white'>
            <label htmlFor='document'>Query</label>
            <textarea className='form-control' id='document' rows='15'></textarea>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group text-white'>
            <label htmlFor='query'>Data Structure</label>
            <textarea className='form-control' id='query' rows='15'></textarea>
          </div>
          <div className='text-center'>
          <button
            className='btn btn-primary mt-3'
            id='generateResponse'
            onClick={generateResponse}
          >
            Generate Response
          </button>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group text-white'>
            <label htmlFor='response'>Response</label>
            <textarea className='form-control' id='response' rows='15'></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QueryGenerator;