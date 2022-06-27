import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renderiza bien el componente App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Health Overview/i);
  expect(linkElement).toBeInTheDocument();
});
