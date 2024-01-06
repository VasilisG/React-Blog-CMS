import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Pager from '../pager/Pager';
import PostList from '../posts/post-list/PostList';
import usePostsContext from '../../hooks/use-posts-context';
import HeadTags from '../head-tags/HeadTags';
import { getTagByUrl } from '../../api/tags';
import TagInfo from './TagInfo';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

const Tag = () => {

  const params = useParams();

  const [searchParams] = useSearchParams();

  const [tag, setTag] = useState(null);

  const { posts, fetchPosts, currentPage, totalPages, loading } = usePostsContext();

  useEffect(() => {
    const tagUrl = params['url'];
    const page = searchParams.get('p') !== null ? searchParams.get('p') : 1;
    if(tagUrl){
      fetchPosts(tagUrl, page);

      getTagByUrl(tagUrl)
      .then(tagData => {
        setTag(tagData);
      })
      .catch(error => {
        console.log(error);
      });
    } 
  }, [fetchPosts, params, searchParams]);

  return tag ? (
    <>
      <Breadcrumbs crumbs={[{name: tag.name, url: tag.url}]} prefix="tag"/>
      <TagInfo tag={tag}/>
      <PostList posts={posts} loading={loading} type="main"/>
      <Pager currentPage={currentPage} totalPages={totalPages}/>
      <HeadTags description={tag.name}/>
    </>
  ) : null;
}

export default Tag;