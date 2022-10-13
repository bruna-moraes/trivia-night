import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

describe(("Teste tela feedback"), () => {
    it(("testando se existe os botões de ranking e Play Again"), () => {
        renderWithRouterAndRedux(<Feedback />)
        const buttonRanking = screen.getByRole('button', { name: 'Ranking' });
        expect(buttonRanking).toBeInTheDocument();
        
        const buttonPlayAgain = screen.getByRole('button', { name: 'Jogar Novamente' });
        expect(buttonPlayAgain).toBeInTheDocument();
    });
    it(("testando os elementos da página de feedback"), () => {
        renderWithRouterAndRedux(<Feedback />);
        const scoreElement = screen.getByTestId('feedback-total-score');
        expect(scoreElement).toBeInTheDocument();
        
        const assertionsElement = screen.getByTestId('feedback-total-question');
        expect(assertionsElement).toBeInTheDocument();
        
        const messageElement = screen.getByTestId('feedback-text');
        expect(messageElement).toBeInTheDocument();
    });
    it(("testando se existe o titulo FeedBack na página"), () => {
        renderWithRouterAndRedux(<Feedback />);
        const titlePage = screen.getByText('Feedback');
        
        expect(titlePage).toBeInTheDocument();
    });
    it(("testando o header no feedback"), () => {
        renderWithRouterAndRedux(<Feedback />);
        const playerNameHeader = screen.getByTestId('header-player-name');
        const scoreHeader = screen.getByTestId('header-score');
        
        expect(playerNameHeader).toBeInTheDocument();
        expect(scoreHeader).toBeInTheDocument();
    });
    it('testa se o butão ranking funciona', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const buttonRanking = screen.getByTestId('btn-ranking');

    userEvent.click(buttonRanking);
    const { pathname } = history.location;

    expect(pathname).toBe('/ranking');

    const titlePage = screen.getByTestId('ranking-title');
    expect(titlePage).toBeInTheDocument();
    });
    it('testa se o butão jogar novamente funciona', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const buttonPlayAgain = screen.getByTestId('btn-play-again');

    userEvent.click(buttonPlayAgain);
    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const titlePage = screen.getByTestId('btn-play-again');
    expect(titlePage).toBeInTheDocument();
    });
    it(("testando a mensagem de feedback"), () => {
        renderWithRouterAndRedux(<Feedback />);
    });
});