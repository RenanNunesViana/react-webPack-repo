/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';
import React from 'react'

describe('<TextImput />', () => {
  it('should show type your search on place holder', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="" />);
    expect(screen.getByPlaceholderText(/type your search!/i)).toBeInTheDocument();
  });

  it('should call function when pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'this is a test';
    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toBeCalledTimes(14);

    const value2 = ' ';
    userEvent.clear(input);
    userEvent.type(value2);

    expect(fn).toBeCalledTimes(15);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="" />);
    expect(container).toMatchSnapshot();
  });
});
