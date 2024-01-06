import React from 'react';
import { Helmet } from 'react-helmet-async';

const HeadTags = (props) => {
  return (
    <Helmet>
      {
        Object.keys(props).map((key, index) => {
          if(key === 'title'){
            return <title key={index}>{props[key]}</title>
          }
          else {
            return <meta key={index} name={key} content={props[key]}/>
          }
        })
      }
    </Helmet>
  );
}

export default HeadTags;