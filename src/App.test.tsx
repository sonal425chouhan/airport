import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

test('renders script tag on load', () => {
  render(<App />);

  const handler = jest.fn();
  render(<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbVZ7BPXnVPFN42My50WoP4TQBJQV-z3E" async defer/>);
  const script = document.querySelector('script');
  expect(script).toBeInTheDocument();
});
