import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedPagination } from '../enhanced-pagination';

describe('EnhancedPagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders correctly with current and total pages', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('3');
    expect(screen.getByText('of 10')).toBeInTheDocument();
  });

  it('calls onPageChange when clicking next button', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when clicking previous button', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking first page button', () => {
    render(
      <EnhancedPagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('First page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when clicking last page button', () => {
    render(
      <EnhancedPagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Last page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });

  it('disables previous and first buttons when on first page', () => {
    render(
      <EnhancedPagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('First page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
    expect(screen.getByLabelText('Last page')).not.toBeDisabled();
  });

  it('disables next and last buttons when on last page', () => {
    render(
      <EnhancedPagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('First page')).not.toBeDisabled();
  });

  it('calls onPageChange when typing in the input and pressing Enter', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '7' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnPageChange).toHaveBeenCalledWith(7);
  });

  it('calls onPageChange when input loses focus', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '7' } });
    fireEvent.blur(input);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(7);
  });

  it('clamps input value to valid page range', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    // Test too high value
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.blur(input);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(10); // Clamped to max
    mockOnPageChange.mockClear();

    // Test too low value
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.blur(input);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(1); // Clamped to min
  });

  it('only allows numeric input', () => {
    render(
      <EnhancedPagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    
    expect(input).toHaveValue('');
  });
});