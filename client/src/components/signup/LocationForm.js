import React from 'react';
import ValidatedForm from '../form/ValidatedForm';
import rightArrow from '../../images/right-arrow.svg';

class LocationForm extends ValidatedForm {

    state = {
        name: '',
        address: '',
        city: '',
        state: 'NY',
        zip: ''
    };

    validators = {
        name: this.nonEmptyValidator,
        address: this.nonEmptyValidator,
        city: this.nonEmptyValidator,
        zip: value => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
    };

    submitAction = (data) => {
        fetch('/api/locations', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            // Error :(
        });
    };

    render() {
        const errors = this.validate();
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = field => errors[field] && this.touched[field];

        return (
            <form className="LocationForm" onSubmit={this.handleSubmit}>
                <input
                    className={shouldMarkError('name') ? "error" : ""}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <input
                    className={shouldMarkError('address') ? "error" : ""}
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <input
                    className={shouldMarkError('city') ? "error" : ""}
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <select
                    className={shouldMarkError('state') ? "error" : ""}
                    type="text"
                    name="state"
                    value={this.state.state}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                <input
                    className={shouldMarkError('zip') ? "error" : ""}
                    type="text"
                    name="zip"
                    placeholder="zip"
                    value={this.state.zip}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <button disabled={isDisabled}><img src={rightArrow} alt="Submit" /></button>
            </form>
        );
    }
}

export default LocationForm;
