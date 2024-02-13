'use client';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
const GraphQLClient = () => {

    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const makeQuery = async () => {
        const query = document.getElementById('query').value;
        const response = await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {
                    "productName": "abcde",
                    "category": "aklsjee",
                    "price": 563455
                }
            })
        });
        const res = await response.json();
        document.getElementById('response').value = JSON.stringify(res, null, 2);
    }

    return (
        <div className='vh-100 bg-dark'>
            <h1 className='text-center text-white'>GraphQL Client</h1>
            <Nav className='bg-primary-subtle' justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="document">Documentation</label>
                            <textarea className="form-control" id="document" rows="15"></textarea>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="query">Query</label>
                            <textarea className="form-control" id="query" rows="15" onChange={
                                (e) => setQuery(e.target.value)
                            } value={
                                query
                            }></textarea>
                        </div>
                        <div className="text-center">
                            <button onClick={makeQuery} className="btn btn-primary mt-3  ">Make Query</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="response">Response</label>
                            <textarea onChange={e => setResponse(e.target.value)} value={response} className="form-control" id="response" rows="15"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphQLClient;