import React, { useCallback, useEffect, useState } from 'react';
import { getPopularPosts } from '../../../api/posts';
import PostList from '../../posts/post-list/PostList';

const Aside = () => {

  const [popularPosts, setPopularPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPopularPosts = useCallback(async () => {
    setLoading(true);
    getPopularPosts()
    .then(posts => {
      setPopularPosts(posts);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <aside className="blog-aside">
      <div className="recent-posts-container">
        <h2 className="recent-posts-header">Popular Posts</h2>
        <PostList posts={popularPosts} loading={loading} type="aside"/>
      </div>
    </aside>
  );
}

export default Aside;