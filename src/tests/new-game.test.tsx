import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app';

describe('test new game section inputs and buttons', () => {
  it('should initialize "mark o" input checked', () => {
    render(<App />);
    const oRadio = screen.getByRole('radio', { name: 'choose mark o' });
    expect(oRadio).toBeChecked();
  });

  it('should initialize "mark x" radio input unchecked', () => {
    render(<App />);
    const xRadio = screen.getByRole('radio', { name: 'choose mark x' });
    expect(xRadio).not.toBeChecked();
  });

  it('should toggle between radio buttons when they are clicked', () => {
    render(<App />);
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
