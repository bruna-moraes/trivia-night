import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addLogin } from '../../redux/actions';
import './index.css';

import logo from '../../images/logo.svg';

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

    const isDisabled = name.length >= minNameLength && emailRegex.test(email);

    this.setState({
      isDisabled,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateForm);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchApi.json();
    localStorage.setItem('token', response.token);
    dispatch(addLogin(this.state));
    await history.push('/game');
  };

  clickSettingsPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled, name, email } = this.state;

    return (
      <main className="login-page">
        <img
          className="logo"
          src={ logo }
          alt="logotipo"
        />
        <form className="form-login">
          <input
            aria-label="name"
            value={ name }
            placeholder="Name"
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
          <input
            aria-label="email"
            value={ email }
            placeholder="Email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
          />
          <button
            className="pink-button"
            data-testid="btn-play"
            disabled={ !isDisabled }
            onClick={ this.handleClick }
            type="button"
          >
            Play
          </button>
        </form>

        <hr className="divider" />

        <button
          className="blue-button"
          data-testid="btn-settings"
          type="button"
          onClick={ this.clickSettingsPage }
        >
          Settings
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.array,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
