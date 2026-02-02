import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import Layout from '@/widgets/Layout'
import MoviesOpenPage from '@/pages/MoviesOpenPage/MoviesOpenPage'
import SupportPage from '@/pages/SupportPage/SupportPage.tsx'
import SubscriptionPage from '@/pages/SubscriptionPage/SubscriptionPage.tsx'
import MoviesAndShowsPage from '@/pages/MoviesAndShowsPage/MoviesAndShowsPage.tsx'
import AuthPage from '@/pages/AuthPage'
import { ToastContainer } from 'react-toastify'
import ForgetPasswordForm from '@/features/ForgetPasswordForm'
import ResetPasswordForm from '@/features/ResetPasswordForm'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordForm />} />
        <Route path="/resetPassword" element={<ResetPasswordForm />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviesOpenPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/MoviesAndShowsPage" element={<MoviesAndShowsPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default Router
