import React from 'react';

const person = (props)=>{
    //class based would be this.props
    return <p>I'm a {props.name} person! {Math.random()}</p>
};

export default person;