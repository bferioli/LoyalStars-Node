import React from 'react';
import ValidatedForm from '../form/ValidatedForm';
import rightArrow from '../../images/right-arrow.svg';

class AccountForm extends ValidatedForm {

    constructor() {
        super();
        const token = localStorage.getItem('loyl-session');

        if (token) {

        }
    }

    state = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    validators = {
        // eslint-disable-next-line
        username: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        password: value => value.length >= 6,
        confirmPassword: value => value === this.state.password
    };

    submitAction = (data) => {
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => localStorage.setItem('loyl-session', json.token))
        .catch(function(err) {
            // Error :(
        });
    };

    render() {
        const errors = this.validate();
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = field => errors[field] && this.touched[field];

        return (
            <form className="AccountForm" onSubmit={this.handleSubmit}>
                <input
                    className={shouldMarkError('username') ? "error" : ""}
                    type="text"
                    name="username"
                    placeholder="Email"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <input
                    className={shouldMarkError('password') ? "error" : ""}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <input
                    className={shouldMarkError('confirmPassword') ? "error" : ""}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <button disabled={isDisabled}><img src={rightArrow} alt="Submit" /></button>
            </form>
        );
    }
}

export default AccountForm;