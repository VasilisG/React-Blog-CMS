import React from 'react';
import {
  BrowserRouter as Router,
  Routes, 
  Route 
} from 'react-router-dom';
import MainPage from '../../../pages/MainPage';
import PostListPage from '../../../pages/PostListPage';
import PostPage from '../../../pages/PostPage';
import ProfilePage from '../../../pages/ProfilePage';
import CategoryPage from '../../../pages/CategoryPage';
import TagPage from '../../../pages/TagPage';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<MainPage/>}></Route>
        <Route exact path='/posts/:type' element={<PostListPage/>}></Route>
        <Route exact path='/category/*' element={<CategoryPage/>}></Route>
        <Route exact path='/tag/:name' element={<TagPage/>}></Route>
        <Route exact path='/post/:url' element={<PostPage/>}></Route>
        <Route exact path='/about' element={<ProfilePage/>}></Route>
      </Routes>
    </Router>
  );
}

export default Main;