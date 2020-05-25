import React, { useEffect, useState } from 'react';
import { getInputs, getInputs2, getResult, getDia } from '../../../../redux/Seloctors/Calculator';
import { setInputThunk, setInputThunk2, setResultThunk } from '../../../../redux/vitaliy'
import Add from './Add';
import { createField } from '../../../Common/Field/Field';
import { Input } from '../../../Common/FormInput/Input';
import s from './Add.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';


const AddContainer = props => {
    let [count, setCount] = useState(2);
    let arr1 = [];
    let arr2 = [];
    useEffect(() => {
        pushInputInState('a')
        pushInputInState('b')
    }, [count])
    let CreateInput = (name, cx) => {
        let res = createField('', name, "number", Input, [], cx, null)
        return res;
    }
    let pushInputInState = (type) => {
        if (type === 'a') {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    arr1.push(CreateInput(`${type}${i}${j}`, s.item))
                }
            }
            props.setInputThunk(arr1)
        }
        else {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    arr2.push(CreateInput(`${type}${i}${j}`, s.item))
                }
            }
            props.setInputThunk2(arr2)
        }

    }
    let onSubmit = (form) => {
        setResultThunk("+", form)
    }
    return (
        <Add {...props} onSubmit={onSubmit} setCount={setCount} />
    );
};

const mapStateToProps = (state) => {
    return {
        inputs: getInputs(state),
        inputs2: getInputs2(state),
        result: getResult(state),
        dia: getDia(state)
    }
}

export default compose(
    connect(mapStateToProps, { setInputThunk, setInputThunk2, setResultThunk })
)(AddContainer)
