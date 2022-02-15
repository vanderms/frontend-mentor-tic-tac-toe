import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app';
import AppProvider from './../contexts/app-context';

describe('test new game menu section inputs and buttons', () => {
  it('should initialize "mark o" input checked', () => {
    render(<App />, { wrapper: AppProvider });
    const oRadio = screen.getByRole('radio', { name: 'choose mark o' });
    expect(oRadio).toBeChecked();
  });

  it('should initialize "mark x" radio input unchecked', () => {
    render(<App />, { wrapper: AppProvider });
    const xRadio = screen.getByRole('radio', { name: 'choose mark x' });
    expect(xRadio).not.toBeChecked();
  });

  it('should toggle between radio buttons when they are clicked', () => {
    render(<App />, { wrapper: AppProvider });
    const oRadio = screen.getByRole('radio', { name: 'choose mark o' });
    const xRadio = screen.getByRole('radio', { name: 'choose mark x' });

    fireEvent.click(xRadio);
    expect(oRadio).not.toBeChecked();
    expect(xRadio).toBeChecked();

    fireEvent.click(oRadio);
    expect(oRadio).toBeChecked();
    expect(xRadio).not.toBeChecked();
  });
});
