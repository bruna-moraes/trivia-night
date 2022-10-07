import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: false,

  };

  validateForm = () => {
    const { email, name } = this.state;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minNameLength = 1;

    const isDisabled = name.length >= minNameLength
        && emailRegex.test(email);

    this.setState({
      isDisabled,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  render() {
    const { isDisabled, name, email } = this.state;

    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            value={ name }
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          Email:
          <input
            value={ email }
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ !isDisabled }
          type="button"
        >
          Play
        </button>
      </form>

    );
  }
}

export default connect()(Login);
