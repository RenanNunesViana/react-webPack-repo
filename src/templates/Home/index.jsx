import './styles.css';
import React from 'react'

import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextImput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (inicialValue, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(0, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPosts = allPosts.slice(postsPerPage, postsPerPage + 2);
    posts.push(...nextPosts);

    setPosts(posts);
    setPostPerPage(postsPerPage + 2);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <h2>{searchValue}</h2>

      <div className="input-conteiner">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>there are not any posts with those names :(</p>}

      <div className="button-container">
        {!searchValue && <Button text="Load More Posts" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};

/* export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { postsPerPage, posts, allPosts } = this.state;
    const nextPosts = allPosts.slice(postsPerPage, postsPerPage + 2);
    posts.push(...nextPosts);
    this.setState({
      posts,
      postsPerPage: postsPerPage + 2,
    });
  };

  handleChange = (e) =>{
    this.setState({searchValue: e.target.value})
  }

  render() {
    const { posts, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    })
    : posts;

    return (
      <section className="container">
        <h2>{searchValue}</h2>

        <div className="input-conteiner">
        <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>

        {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>there are not any posts with those names :(</p>}

        <div className="button-container">
          {!searchValue && (
          <Button
          text="Load More Posts"
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />
          )}
        </div>
      </section>
    );
  }
}*/
