import { Component } from 'react';

/*
    Generic validated form component
    Must be extended with:
        state: { 'fieldName': 'fieldVal' }
        validators: { 'fieldName': Function }
        submitAction: Function
        render: Function
 */
class ValidatedForm extends Component {

    touched = {};

    componentWillMount() {
        Object.keys(this.state)
            .forEach(name => this.touched[name] = false);
    }

    nonEmptyValidator = value => value.length > 0;

    validate = () => {
        // true means invalid, so our conditions got reversed
        const errors = {};
        Object.keys(this.state)
            .forEach((name) => {
                if (this.validators[name]) {
                    errors[name] = this.validators[name](this.state[name]) !== true;
                }
            });
        return errors;
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleBlur = (e) => {
        const name = e.target.name;
        this.touched[name] = true;
        e.target.className = this.validators[name](this.state[name]) ? "" : "error";
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.canBeSubmitted()) {
            this.submitAction({...this.state});
        }
    };

    canBeSubmitted = () => {
        const errors = this.validate();
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    };
}

export default ValidatedForm;