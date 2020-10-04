import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;

    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationErrorMsg}>Please enter the valid value!</p>
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementConfig}
                onChange={props.changed}/>;
            break;
        default :
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig}
                onChange={props.changed}/>;
    }   
    return(
        <div className={classes.Input}>
            <label className={classes.Lable}>{props.lable}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input