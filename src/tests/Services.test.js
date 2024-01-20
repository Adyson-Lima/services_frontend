import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Services from '../pages/Services';

describe('Testes da tela Services', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Services/>
      </BrowserRouter>
    );
  });

  it('Existe card em Services?', () => {
    expect(screen.getByTestId('mycard')).toBeInTheDocument();
  });

  it('Existe link Novo em Services?', () => {
    expect(screen.getByTestId('mylink')).toBeInTheDocument();
  });

});