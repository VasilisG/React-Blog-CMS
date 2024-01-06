import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostByUrl } from '../api/posts';
import { updatePostViews } from '../api/stats';
import { CommentProvider } from '../context/comments';
import PostTitle from '../components/posts/post-item/PostTitle';
import PostImage from '../components/posts/post-item/PostImage';
import PostDate from '../components/posts/post-item/PostDate';
import PageNotFound from './PageNotFound';
import PostContent from '../components/posts/post-item/PostContent';
import Comments from '../components/comments/comment-item/Comments';
import PostTags from '../components/posts/post-item/PostTags';
import Loader from '../components/loader/Loader';
import HeadTags from '../components/head-tags/HeadTags';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';

const PostPage = () => {

  const [post, setPost] = useState(null);

  const [postError, setPostError] = useState(false);

  const [loading, setLoading] = useState(false);

  const { url } = useParams();

  const incrementPostViews = useCallback(async (postId) => {
    await updatePostViews(postId);
  }, []);

  const getPostData = useCallback(async () => {
    setLoading(true);
    getPostByUrl(url)
    .then(data => {
      setPost(data);
      incrementPostViews(data._id);
    })
    .catch((error) => {
      console.log(error);
      setPostError(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [url, incrementPostViews]);

  useEffect(() => {
    if(url) {
      getPostData();
    }
  }, [url, getPostData]);

  return !loading ? ( 
    postError ? <PageNotFound/> : post ? (
      <div className="post-page">
        <Breadcrumbs crumbs={[{name: post.title, url: post.url}]} prefix="post"/>
        <PostTitle type="view" title={post.title}/>
        <PostDate createdAt={post.date_created} updatedAt={post.date_updated}/>
        <PostImage type="image" image={post.image} altText={post.title}/>
        <PostContent content={post.content}/>
        <PostTags type="view" post={post}/>
        {
          post.enable_comments || true 
          ? <CommentProvider post={post}>
              <Comments/>
            </CommentProvider> 
          : null
        }
        <HeadTags description={post.title}/>
      </div>
  ) : null) : <Loader/>;
}

export default PostPage;