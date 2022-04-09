import { fireEvent, render, screen, describe, it, expect, jest } from '@testing-library/react';
import { Button } from '.';
import React from 'react'

describe('<button />', () => {
  const fn = jest.fn();
  it('should show text as passed text', () => {
    render(<Button text="hello world" onClick={fn} disabled={true} />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /hello world/i });

    expect(button).toBeInTheDocument();
  });
  it('should call on button click', () => {
    render(<Button text="hello world" onClick={fn} disabled={false} />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /hello world/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not call on button with disabled assigned as true', () => {
    render(<Button text="hello world" onClick={fn} disabled={true} />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /hello world/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(0);
  });
});
