import { render, screen, describe, it, expect } from '@testing-library/react';
import { Posts } from '.';
import React from 'react'

const props = {
  posts: [
    { title: 'test 1', cover: 'http//:test/1', body: 'little test 1', id: 1 },

    { title: 'test 2', cover: 'http//:test/2', body: 'little test 2', id: 2 },
    { title: 'test 3', cover: 'http//:test/3', body: 'little test 3', id: 3 },
  ],
};

describe('<Posts/>', () => {
  it('should has all posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /test/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /test/i })).toHaveLength(3);
    expect(screen.getAllByText(/little/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: /test 3/i })).toHaveAttribute('src', 'http//:test/3');
  });

  it('should not have any posts', () => {
    const { container } = render(<Posts />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should match snap shot', () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
