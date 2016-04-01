var React = require('react');
var UserUtil = require('../../util/userUtil');

var SignUp = React.createClass({
  getInitialState: function () {
    return({ errors: [] });
  },

	_handleSubmit: function (event) {
		event.preventDefault();
    var form = event.currentTarget;
    var result = this.validateForm;
    if (result.valid){
  		var data = new FormData(form);
      UserUtil.trySignUp(data);
    } else {
      this.setState({errors: result.errors});
    }
	},

  validateForm: function (form) {
    var result = { valid: true };
    // validate entries haha
    // if (form.)
    return result;
  },

  clearInput: function (e) {
    var input = e.currentTarget;
    if (input.value === input.defaultValue){
      input.value = "";
    }
  },

  resetInput: function (e) {
    var input = e.currentTarget;
    if (input.value === ""){
      input.value = input.defaultValue;
    }
  },

	render: function () {
    var months = [
      "Month",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var dates = ["Day"];
    for (var i = 1; i < 32; i++) { dates.push(i); }

    var years = ["Year"];
    for (i = 2016; i > 1904; i--) { years.push(i); }


    var selector = function (thing, i) {
      return (<option key={ i } value={ thing }>{ thing }</option>);
    };

		return (
			<form ref="signUpForm" className="sign-up-form" onSubmit={ this._handleSubmit} >
				<input className="first-name-input" type="text"
          name="bio[first_name]" defaultValue="First name"
          onFocus={ this.clearInput } onBlur={ this.resetInput }/>

				<input className="last-name-input" type="text"
          name="bio[last_name]" defaultValue="Last name"
          onFocus={ this.clearInput } onBlur={ this.resetInput }/>

				<input className="email-input" type="text"
          name="user[email]" defaultValue="Email"
          onFocus={ this.clearInput } onBlur={ this.resetInput }/>

				<input className="email-verify-input" type="text"
          name="user[email_verify]" defaultValue="Re-enter email"
          onFocus={ this.clearInput } onBlur={ this.resetInput }/>

        <input className="password-input" type="password"
          name="user[password]" defaultValue="New password"
          onFocus={ this.clearInput } onBlur={ this.resetInput }/>


        <select name="birthday[month]">
          { months.map(selector) }
        </select>
        <select name="birthday[date]">
          { dates.map(selector) }
        </select>
        <select name="birthday[year]">
          { years.map(selector) }
        </select>

				<input className="sign-up-button" type="submit" value="Sign Up"/>
			</form>
		);
	}
});

module.exports = SignUp;
