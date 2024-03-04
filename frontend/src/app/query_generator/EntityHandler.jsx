'use client';
import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react'
import { Accordion } from 'react-bootstrap';

const EntityHandler = () => {

    const fieldNameRef = useRef(null);
    const fieldTypeRef = useRef(null);

    const [entityList, setEntityList] = useState([{
        name: 'Product',
        fields: [
            {
                name: 'id',
                type: 'ID'
            },
            {
                name: 'category',
                type: 'String'
            },
            {
                name: 'productName',
                type: 'String'
            },
            {
                name: 'price',
                type: 'Int'
            },
            {
                name: 'colors',
                type: '[String]'
            }
        ]
    }])

    const generateEntityCode = () => {
        return entityList.map((entity) => {
            return `\n\ntype ${entity.name} {
                ${entity.fields.map((field) => {
                    return `${field.name}: ${field.type}`
                })}
            }`
        })
    }

    const generateSchema = () => {
        return `const { gql } = require('apollo-server-express');
        const ProductModel = require("./models/productSchema");
        
        const mongoose = require('mongoose');
        
        exports.typeDefs = gql \`
        
        ${generateEntityCode()}
        
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

      const addEntity = () => {
        setEntityList([...entityList, {
            name: 'Untitled Entity',
            fields: [
                {
                    name: 'id',
                    type: 'ID'
                }
            ]
        }])
      }

      const addField = (index) => {
        if(fieldNameRef.current.value === '' || fieldTypeRef.current.value === '') return;
        const newEntityList = [...entityList];
        newEntityList[index].fields.push({
            name: fieldNameRef.current.value,
            type: fieldTypeRef.current.value
        })
        setEntityList(newEntityList);
        fieldNameRef.current.value = '';
        fieldTypeRef.current.value = '';
      }

    return (
        <div className="row p-4">
            <div className='col-md-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Operations</h4>
                        <Accordion defaultActiveKey="0">
                            {
                                entityList.map((entity, index) => {
                                    return <Accordion.Item eventKey={index}>
                                    <Accordion.Header>{entity.name}</Accordion.Header>
                                    <Accordion.Body>
                                      <ul className='list-group'>
                                        {
                                            entity.fields.map((field) => {
                                                return <li className='list-group-item d-flex justify-content-between'>
                                                    <p>{field.name} : {field.type}</p>
                                                    <button className='btn btn-danger'>Remove</button>
                                                </li>
                                            })
                                        }
                                      </ul>
                                      <div className="input-group">
                                        <input type="text" className="form-control" ref={fieldNameRef} />
                                        <input type="text" className="form-control" ref={fieldTypeRef} />
                                        <button className='btn btn-primary' onClick={e => addField(index)}>Add Field</button>
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                })
                            }
      
      </Accordion>
                        <button className='btn btn-primary' onClick={addEntity}>Add Entity</button>
                    </div>
                    <div className="card-body">

                        <div className='types-editor'>

                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h4>GraphQLSchema.js Code</h4>
                        <button onClick={handleCopyClick} className=''>
                            <i className="fa-regular fa-copy"></i>  Copy
                        </button>
                    </div>
                    <div className="card-body">
                        <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateSchema()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntityHandler