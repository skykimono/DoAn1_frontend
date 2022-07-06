import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Post from "./Components/Post"
import Category from "./Components/Category";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserPost from "./Components/UserPost";
import AllCategories from "./Components/AllCategories";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="post/:_id" element={<Post />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/allcategories" element={<AllCategories />} />
        <Route path="/mypost" element={<UserPost />} />
      </Routes>
      </ThemeProvider>
    </div>

  );
}

export default App;
