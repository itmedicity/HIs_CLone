import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login page by default', async () => {
  render(<App />);
  expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();
});
