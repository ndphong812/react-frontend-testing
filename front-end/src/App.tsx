import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/home-page';
import Articles from 'pages/articles';
import User from 'pages/user';
import ArticleDetail from 'pages/article-detail';
import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import UserProfile from 'components/user-profile';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/articles" element={< Articles />} />
          <Route path="/articles/:slug" element={< ArticleDetail />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:username" element={< UserProfile />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;