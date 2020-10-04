import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Input from '../UI/Input/Input';
import classes from './auth.module.css';

class Auth extends Component {

     state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    case: true
                },
                touched: false,
                valid: false
            },
        },
        emptyError: false
    }

    checkVailidy(value, rules) {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid; 
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.case) {
            if(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/.test(value)){
                isValid = true
            }else {
                isValid = false
            }
        }
        if(rules.isEmail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                    isValid = true
            }else{
                isValid = false
            }
        }
        return isValid

    }

    inputChangedHandler = (event, controlName) => {
        this.setState({emptyError: false})
        console.log(controlName)
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkVailidy(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.controls.email.value && this.state.controls.password.value) {
            console.log("login successful")
            sessionStorage.setItem('email',this.state.controls.email.value);
            sessionStorage.setItem('password',this.state.controls.password.value);
            this.props.history.push('/weather');

        }else {
            this.setState({emptyError: true})
        }
    }



    render() {
        let formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map( formEle => (
            <Input
                key={formEle.id} 
                elementType={formEle.config.elementType} 
                elementConfig={formEle.config.elementConfig} 
                value={formEle.config.value}
                invalid={!formEle.config.valid}
                shouldValidate={formEle.config.validation}
                touched={formEle.config.touched}
                changed={(event) => this.inputChangedHandler(event,formEle.id)}/>
            )
                
        )
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            ) 
        }
        let emptyFieldsErrorMsg = this.state.emptyError ?  <p className={classes.colorRed}>Email and Password cannot be empty fields</p> : null;

        return (
            <div className={classes.Auth}>
                    {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <button  type="submit">SIGNUP</button>
                    {emptyFieldsErrorMsg}
                </form>
                <div className={classes.warningContainer}>
                <span className={classes.warningIcon}>&#9888;</span>
                    <ul>
                        <li>Password length should be between 6 to 20 character</li>
                        <li>Password should contain atleast one digit, one uppercase, one lowercase</li>
                    </ul>
                </div>
            </div>
        )
    }

}


export default withRouter(Auth); 