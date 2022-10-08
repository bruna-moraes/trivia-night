import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página Login', () => {
  test('Se a rota é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Se tem os elementos da página(inputs e botões) e se o botão ativa', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const playerInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    expect(emailInput).toBeInTheDocument();
    expect(playerInput).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(playerInput, 'Lucas');

    expect(playBtn).toBeEnabled();
  });

  test('Se ao clicar no botão "Play" é feita uma chamada para a API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        response_message: 'Token Generated Successfully!',
        token:
          '5611ab2473d33515d8cbe1856ba6a10f776b46bfe7771a14ce8e3b25e7b8bec2',
      }),
    });
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const playerInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(playerInput, 'Lucas');
    userEvent.click(playBtn);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
  });

  test('Se ao clicar no botão "Settings" a rota é "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByTestId('btn-settings');

    userEvent.click(settingsBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/settings');
  });
});
