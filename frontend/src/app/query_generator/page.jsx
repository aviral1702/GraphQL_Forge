'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const QueryGenerator = () => {
  const [text, setText] = useState("");
  const [mongoDBurl, setMongoDBurl] = useState('');

  const generateAppCode = () => {
    return `const express  = require('express');
    const cors = require('cors');
    const { ApolloServer } = require('apollo-server');
    const mongoose = require('mongoose');
    const schema = require('./graphQLSchema');
    const url = "${mongoDBurl}";
    mongoose.connect(url)
    .then((result) => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Error connecting to the database');
    });
    
    const server = new ApolloServer({
        typeDefs: schema.typeDefs,
        resolvers: schema.resolvers
    });
    
    server.listen({port: 9000}).then(({url}) => console.log("Server is running"));
    mongoose.exports = mongoose;
    
    `
  }

  const generateSchema = () => {
    return `const { gql } = require('apollo-server-express');
    const ProductModel = require("./models/productSchema");
    
    const mongoose = require('mongoose');
    
    exports.typeDefs = gql \`
    
    type Product {
        id: ID
        category: String
        productName: String
        price: Int!
        colors: [String!]
    }
    
    type Query {
        getProductsList: [Product]
        getProduct(id: ID!): Product
    }
    
    type Mutation {
        updateProduct(id: ID! ,category: String!, productName: String!, price: Int!, colors: [String!], imgPath: String!): Product
        addProduct(category: String, productName: String!, price: Int, colors: [String!], imgPath: String): Product
        deleteProduct(id: ID!): Boolean!
    } \`
    
    
    const db_url = 'mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/products';
    
    
    const connect = async () => {
        await mongoose.connect(db_url, { useNewUrlParser: true });
    }
    
    
    exports.resolvers = {
        Query: {
    
            getProductsList: async (parent, args) => {
                await connect();
                const result = ProductModel.find({}).then((res) => {
                    if (res) {
                        return res;
                    }
                })
                return result;
    
            },
            getProduct: async (parent, args) => {
                await connect();
                const result = ProductModel.findById(args.id).then((res) => {
                    if (res) {
                        return res;
                    }
                })
                return result;
    
            }
        },
    
        Mutation: {
            updateProduct: async (parent, args) => {
                await connect();
                const result = ProductModel.findByIdAndUpdate(args.id, 
                    {
                        productName: args.productName,
                        category: args.category,
                        price: args.price,
                        imgPath: args.imgPath,
                        colors: args.colors
                    }, {new: true}).then((res) => {
                        if (res) {
                            return res;
                        }
                    })
                return result;
            },
            addProduct :  async (parent, args) => {
                await connect();
                let product = new ProductModel({
                    productName: args.productName,
                    category: args.category,
                    price: args.price,
                    imgPath: args.imgPath,
                    colors: args.colors
                });
               const result = product.save().then((res) => {
                    return res;
                })
                return result;
                // const result = ProductModel.insertMany([
                //     {
                //         productName: args.productName,
                //         category: args.category,
                //         price: args.price,
                //         imgPath: args.imgPath,
                //         colors: args.colors
                //     }
                // ]).then((res) => {
                //     if (res) {
                //         return res;
                //     }
                // })
                // return result;
            },
            deleteProduct:  async (parent, args) => {
                try {
                    await connect();
                    await ProductModel.findOneAndRemove({_id: args.id});
                    return true;
                } catch (error) {
                    console.log('Error while delete:',error);
                    return false;
                }
                
            }
        }
    }
    
    
    `
  }

  const generateMongoDBSchema = () => {
    return `const mongoose = require('mongoose');

    const productsListSchema = new mongoose.Schema({
        category: String,
        productName: String,
        price: Number,
        colors: Object,
        imgPath: String,
    })
    
    module.exports = mongoose.model('productlists', productsListSchema);`
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      alert("Copy to clipboard failed.");
    }
  };

  const generateResponse = () => {
    const query = document.getElementById('query').value;
  }
  return (
    <div className='bg-dark'>
      <div className='container-fluid'>
        <div className='row p-4'>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4>Query</h4>
              </div>
              <div className="card-body">
              <p>To get started, provide the MongoDB URL for the database you want to connect to.</p>
                <label htmlFor="MongoDB URL">MongoDB URL :&nbsp;</label>
                <input type="text" id="MongoDB URL" value={mongoDBurl} onChange={(e) => setMongoDBurl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group text-white'>
              <label htmlFor='query'>Data Structure</label>
              <textarea className='form-control' id='query' rows='15'></textarea>
            </div>
            {/* <div className='text-center'>
              <button
                className='btn btn-primary mt-3'
                id='generateResponse'
                onClick={generateResponse}
              >
                Generate Response
              </button>
            </div> */}
          </div>
          <div className='col-md-4'>
            <div className='form-group text-white'>
              <label htmlFor='response'>Response</label>
              <textarea className='form-control' id='response' rows='15' value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>
          </div>
        </div>

        <div className="row p-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>App.js Code</h4>
                <button onClick={handleCopyClick} className=''>
                  <i className="fa-regular fa-copy"></i>  Copy
                </button>
              </div>
              <div className="card-body">
                <Editor height="50vh" defaultLanguage="javascript" defaultValue={generateAppCode()} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>GraphQLSchema.js Code</h4>
                <button onClick={handleCopyClick} className=''>
                  <i className="fa-regular fa-copy"></i>  Copy
                </button>
              </div>
              <div className="card-body">
                <Editor height="50vh" defaultLanguage="javascript" defaultValue={generateSchema()} />
              </div>
            </div>

          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>Schema.js Code</h4>
                <button onClick={handleCopyClick} className=''>
                  <i className="fa-regular fa-copy"></i>  Copy
                </button>
              </div>
              <div className="card-body">
                <Editor height="50vh" defaultLanguage="javascript" defaultValue={generateMongoDBSchema()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueryGenerator;