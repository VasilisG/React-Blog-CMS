import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, 
  Route 
} from 'react-router-dom';
import './App.css';
import Aside from './components/layout/aside/Aside';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import TagPage from './pages/TagPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import { getCategoryTree } from './api/categories';
import PageNotFound from './pages/PageNotFound';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenuData = () => {
      getCategoryTree()
      .then(result => {
        setMenu(result)
      })
      .catch(error => console.log(error));
    }
    getMenuData();
  }, []);

  return (
    <HelmetProvider>
      <div className="blog-wrapper">
        <Router>
          <Header menu={menu}/>
          <div className="blog-main-content">
            <div className="blog-main-content-inner">
              <main className="blog-main">
                <Routes>
                  <Route exact path='/' element={<MainPage/>}></Route>
                  <Route exact path='/category/*' element={<CategoryPage/>}></Route>
                  <Route exact path='/tag/:url' element={<TagPage/>}></Route>
                  <Route exact path='/post/:url' element={<PostPage/>}></Route>
                  <Route exact path='*' element={<PageNotFound/>}></Route>
                </Routes>
              </main>
              <Aside/>
            </div>
          </div>
          <ProfilePage/>
          <Footer/>
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
