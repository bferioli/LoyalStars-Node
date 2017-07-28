import React from 'react';
import ValidatedForm from '../form/ValidatedForm';
import rightArrow from '../../images/right-arrow.svg';

class RewardForm extends ValidatedForm {

    state = {
        name: '',
        checkinsRequired: '0'
    };

    validators = {
        name: this.nonEmptyValidator,
        checkinsRequired: value => parseInt(value, 10) > 2
    };

    submitAction = (data) => {
        console.log(data);
    };

    render() {
        const errors = this.validate();
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = field => errors[field] && this.touched[field];

        return (
            <form className="RewardForm" onSubmit={this.handleSubmit}>
                <input
                    className={shouldMarkError('name') ? "error" : ""}
                    type="text"
                    name="name"
                    placeholder="Reward"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <input
                    className={shouldMarkError('checkinsRequired') ? "error" : ""}
                    type="number"
                    name="checkinsRequired"
                    placeholder="Checkins required to earn"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <button disabled={isDisabled}><img src={rightArrow} alt="Submit" /></button>
            </form>
        );
    }
}

export default RewardForm;