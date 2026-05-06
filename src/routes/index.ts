import { createBrowserRouter } from 'react-router';
import { AppLayout } from '@/layouts/AppLayout';
import { Landing } from '@/pages/Landing';
import { RootError } from '@/pages/error/Root';
import { ZeroboxError } from '@/pages/error/Zerobox';
import { Home } from '@/pages/zerobox/Home';
import { MyBox } from '@/pages/zerobox/MyBox';
import { RecentFiles } from '@/pages/zerobox/RecentFiles';
import { FolderPreview } from '@/pages/zerobox/FolderPreview';
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup,';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { loginAction } from '@/routes/actions/login';
import { signupAction } from '@/routes/actions/signup';
import { forgotPasswordAction } from '@/routes/actions/forgotPassword';
import { resetPasswordAction } from '@/routes/actions/resetPassword';
import { zeroboxActions } from '@/routes/actions/zeroboxActions';
import { landingLoader } from '@/routes/loaders/landing';
import { zeroboxLoader } from '@/routes/loaders/zerobox';
import { zeroboxFileLoader } from '@/routes/loaders/fileLoader';
import { zeroboxFolderLoader } from '@/routes/loaders/folderLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
    loader: landingLoader,
    ErrorBoundary: RootError,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        Component: Login,
        action: loginAction,
      },
      {
        path: 'signup',
        Component: Signup,
        action: signupAction,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
        action: forgotPasswordAction,
      },
      {
        path: 'reset-password',
        Component: ResetPassword,
        action: resetPasswordAction,
      },
    ],
  },
  {
    path: '/zerobox',
    Component: AppLayout,
    loader: zeroboxLoader,
    action: zeroboxActions,
    ErrorBoundary: ZeroboxError,
    children: [
      {
        path: 'home',
        Component: Home,
        loader: zeroboxFileLoader,
      },
      {
        path: 'my-box',
        Component: MyBox,
        loader: zeroboxFileLoader,
      },
      {
        path: 'recent',
        Component: RecentFiles,
        loader: zeroboxFileLoader,
      },
      {
        path: 'folders/:folderName',
        Component: FolderPreview,
        loader: zeroboxFolderLoader,
      },
    ],
  },
]);
