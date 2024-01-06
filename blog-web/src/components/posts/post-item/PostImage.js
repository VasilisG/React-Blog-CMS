import React from 'react';
import placeholder from '../../../assets/react-logo.png';
import { BASE_MEDIA_URL } from '../../../config/env';

const PostImage = ({ type, image, altText }) => {

  const renderImage = () => {
    return image ? (
      <img 
        className='post-image' 
        src={image ? `${BASE_MEDIA_URL}${image}` : placeholder} 
        alt={altText}
      />
    ) : null;
  }

  const renderThumbnail = () => {
    return <img 
      className='post-thumbnail'
      src={image ? `${BASE_MEDIA_URL}${image}` : placeholder} 
      alt={altText}
    />;
  }

  return type === 'image' ? <>{renderImage()}</> : <>{renderThumbnail()}</>;
}

export default PostImage;