import Headers from "./Header";
import { render, screen } from '@testing-library/react';


describe('This is login page', () => {
    beforeEach(() => {
      render(<Headers />);
    })
  
    test('h2 Car Rental Service', () => {
      const linkElement = screen.getByText(/Car Rental Service/);
      expect(linkElement).toBeInTheDocument();
    });
  
    test('To check if data has changed', () => {
      const linkElement = screen.getByText(/Car Rental Service/);
      expect(linkElement).toMatchSnapshot();
    });
  })