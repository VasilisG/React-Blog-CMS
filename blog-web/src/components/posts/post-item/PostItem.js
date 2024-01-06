import React from 'react';
import PostDate from './PostDate';
import PostImage from './PostImage';
import PostTitle from './PostTitle';
import { Link } from 'react-router-dom';
import PostTags from './PostTags';
import PostComments from './PostComments';
import PostViews from './PostViews';

const PostItem = ({ post, tagsInImage }) => {
  return (
    <li className="post-item">
      <article className="blog-article article">
        <div className="post-item-image-container">
          <Link 
            to={`/post/${post.url}`} 
            className="post-item-link"
          >
            <PostImage 
              type="thumbnail" 
              image={post.thumbnail} 
              altText={post.title}
            />
          </Link>
          {tagsInImage ? <PostTags type="item" post={post}/> : null}
        </div>
        <div className="post-item-title-container">
          <Link 
            to={`/post/${post.url}`} 
            className="post-item-link"
          >
            <PostTitle 
              type="list" 
              title={post.title}
            />
          </Link>
          <div className="date-comments-container">
            <PostDate 
              createdAt={post.date_created} 
              updatedAt={post.date_created}
            />
            <div className="views-comments-container">
              <PostViews post={post}/>
              <PostComments post={post}/>
            </div>
          </div>
          {!tagsInImage ? <PostTags type="item" post={post}/> : null}
        </div>
      </article>
    </li>
  )
}

export default PostItem;