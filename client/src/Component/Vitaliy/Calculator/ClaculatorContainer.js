import React from 'react'
import { compose } from 'redux'
import Calculator from './Calculator'
import { getCount, getInputs ,getInputs2, getResult , getDia} from '../../../redux/Seloctors/Calculator'
import { setCountFieldThunk , setInputThunk , setInputThunk2, setDiaThunk, setResultThunk} from '../../../redux/vitaliy'
import { CreateInput } from '../../Common/Helpeers/CreateInput/CreateInput'
import { connect } from 'react-redux'
import s from './Calculator.module.css'
import { Input } from '../../Common/FormInput/Input'
import { require } from '../../../Validators/Validate'
import { createField } from '../../Common/Field/Field'
import { FromObjectToArrays } from '../../Common/Helpeers/ObjectToArry/ObjectToArry'
import { SumMatrix, RezMatrix } from '../../Common/Helpeers/Helper'

class CalculatorContainer extends React.Component {
    componentDidMount(){
        this.pushInputInState('a')
        this.pushInputInState('b')
    }
    arr1=[];
    arr2=[];
    componentDidUpdate(prevCount){
        if(prevCount.count !== this.props.count){
            this.arr1=[]
            this.arr2=[]
            this.pushInputInState('a')
            this.pushInputInState('b')
        }
    }
    CreateInput = (name,cx)=>{
        return createField('',name,"number",Input,[],cx,0)
    }
    onChangeOnRadio=(e)=>{
        if(e.target){            
            this.props.setDiaThunk(e.target.value)
        }
        
    }
    pushInputInState(type){
        if(type==='a'){
            for(let i=0;i<this.props.count;i++){
                for(let j=0;j<this.props.count;j++){
                    this.arr1.push(this.CreateInput(`${type}${i+1}${j+1}`,s.item))
                }
            }
            this.props.setInputThunk(this.arr1)
        }
        else{
            for(let i=0;i<this.props.count;i++){
                for(let j=0;j<this.props.count;j++){
                    this.arr2.push(this.CreateInput(`${type}${i+1}${j+1}`,s.item))
                }
            }
            this.props.setInputThunk2(this.arr2)
        }
        
    }
    onSubmit=(form)=>{
        let toArr = FromObjectToArrays(form)
        
        let res; 
        
        if(this.props.dia==="+"){res = SumMatrix(toArr.first,toArr.second); }
        else{res = RezMatrix(toArr.first,toArr.second)}
        this.props.setResultThunk(res)
    }
    render(){
        return(
            <div><Calculator {...this.props} onChange={this.onChangeOnRadio} onSubmit={this.onSubmit}/></div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        count:getCount(state),
        inputs:getInputs(state),
        inputs2:getInputs2(state),
        result:getResult(state),
        dia:getDia(state)
    }
}

export default compose(
    connect(mapStateToProps,{setCountFieldThunk,CreateInput,setInputThunk,setInputThunk2,setDiaThunk,setResultThunk,SumMatrix,RezMatrix})
)(CalculatorContainer)