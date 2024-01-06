import React from 'react';

const Footer = () => {
  return (
    <footer className="blog-footer footer">
      <span className="copyright">
        <sup>©</sup>2023 by Mr Cyber. Powered by&nbsp;
        <a 
          className="react-link" 
          href="https://react.dev/" 
          rel="noreferrer" 
          target="_blank">
            React
        </a>.
      </span>
    </footer>
  );
}

export default Footer;