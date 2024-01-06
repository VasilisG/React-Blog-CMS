import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/main/Sidebar";
import Posts from "./components/posts/Posts";
import Categories from "./components/categories/Categories";
import Comments from "./components/comments/Comments";
import Tags from "./components/tags/Tags";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import PostPage from "./components/posts/post-page/PostPage";
import CommentPage from "./components/comments/comment-page/CommentPage";
import Profile from "./components/user/Profile";
import Login from "./components/login/Login";
import TagPage from "./components/tags/tag-page/TagPage";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {

  const { isLoggedIn } = useSelector((state) => {
    return state.auth;
  });

  return (
    <Router>
        <div className={ isLoggedIn ? "blog-admin-container" : "" }>
        { isLoggedIn ? <Sidebar /> : null }
        <div className={ isLoggedIn ? "blog-admin-page-container p-4 position-relative" : "w-100"}>
          { isLoggedIn ? <Header /> : null }
          <Routes>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/" element={<ProtectedRoute component={<Navigate replace={true} to="/dashboard"/>}/>}></Route>
            <Route exact path="/dashboard" element={<ProtectedRoute component={<Dashboard/>}/>}></Route>
            <Route exact path="/posts" element={<ProtectedRoute component={<Posts/>}/>}></Route>
            <Route exact path="/posts/create" element={<ProtectedRoute component={<PostPage/>}/>}></Route>
            <Route exact path="/posts/edit/:postId" element={<ProtectedRoute component={<PostPage/>}/>}></Route>
            <Route exact path="/categories" element={<ProtectedRoute component={<Categories/>}/>}></Route>
            <Route exact path="/comments" element={<ProtectedRoute component={<Comments/>}/>}></Route>
            <Route exact path="/comments/edit/:commentId" element={<ProtectedRoute component={<CommentPage/>}/>}></Route>
            <Route exact path="/tags" element={<ProtectedRoute component={<Tags/>}/>}></Route>
            <Route exact path="/tags/create" element={<ProtectedRoute component={<TagPage/>}/>}></Route>
            <Route exact path="/tags/edit/:tagId" element={<ProtectedRoute component={<TagPage/>}/>}></Route>
            <Route exact path="/profile" element={<ProtectedRoute component={<Profile/>}/>}></Route>
          </Routes>
          { isLoggedIn ? <Footer /> : null }
        </div>
      </div>
    </Router>
  );
};

export default App;
