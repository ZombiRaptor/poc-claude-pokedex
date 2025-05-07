import React from 'react';
import { render, screen } from '@testing-library/react';
import { PerPageSelector } from '../per-page-selector';

// Mock the Select component since it relies on Radix UI
jest.mock('../select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="mock-select" data-value={value}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div data-testid="mock-select-trigger">{children}</div>,
  SelectValue: ({ placeholder }: any) => <div data-testid="mock-select-value">{placeholder}</div>,
  SelectContent: ({ children }: any) => <div data-testid="mock-select-content">{children}</div>,
  SelectItem: ({ value, children }: any) => (
    <div data-testid={`mock-select-item-${value}`}>{children}</div>
  ),
}));

describe('PerPageSelector', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: 12,
    onChange: mockOnChange,
    options: [12, 24, 48, 96],
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with correct labels', () => {
    render(<PerPageSelector {...defaultProps} />);
    
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('per page')).toBeInTheDocument();
  });

  it('passes correct props to Select', () => {
    render(<PerPageSelector {...defaultProps} />);
    
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute('data-value', '12');
  });

  it('renders all options', () => {
    render(<PerPageSelector {...defaultProps} />);
    
    defaultProps.options.forEach(option => {
      expect(screen.getByTestId(`mock-select-item-${option}`)).toHaveTextContent(option.toString());
    });
  });

  it('displays the current value in SelectValue', () => {
    render(<PerPageSelector {...defaultProps} />);
    
    expect(screen.getByTestId('mock-select-value')).toHaveTextContent('12');
  });
});