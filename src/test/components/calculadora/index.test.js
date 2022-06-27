import { render, screen } from '@testing-library/react';
import {Calculadora} from '../../../components/calculadora/index';

test('Renderiza bien el componente Calculadora', () => {
  render(<Calculadora />);
  const linkElement = screen.getByText(/Calculadora de Grasa Corporal/i);
  expect(linkElement).toBeInTheDocument();
});