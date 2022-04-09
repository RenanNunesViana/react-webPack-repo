import { render, screen, describe, it, expect } from '@testing-library/react';
import { PostCard } from '.';
import React from 'react'

const props = {
  title: 'just a test',
  cover: 'just a fake url',
  body: 'just a litle test',
  id: 1,
};

describe('< PostCard />', () => {
  it('should have a title', () => {
    render(<PostCard {...props} />);

    const postCard = screen.getByRole('heading', { name: /just a test/i });

    expect(postCard).toBeInTheDocument();
  });

  it('should have a cover', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: /just a test/i })).toBeInTheDocument();
  });

  it('should have a body', () => {
    render(<PostCard {...props} />);

    expect(screen.getByText('just a litle test')).toBeInTheDocument();
  });

  it('should match a snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
