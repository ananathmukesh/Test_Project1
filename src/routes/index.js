import { Suspense, lazy } from "react";// use to loading , loading screen until full page is load
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
import SocketVideo from "../utils/socketvideo";
import Downloader from "../utils/downloadloader";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
//import Settings from "../pages/dashboard/Settings";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout/>,
      children:[
        {element: <LoginPage/>, path:'login'},
        {element: <RegisterPage/>, path:'register'},
        {element: <ResetPasswordPage/>, path:'reset-password'},
        {element: <NewPasswordPage/>, path:'new-password'},
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        
        { path: "settings", element: <Settings /> },
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
        { path: "start/chat", element: <StartChat /> },
        { path: "socketvideo", element: <SocketVideo /> },
     
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/socket/video", element: <VideoSocket /> },
    { path: "/socket/audio", element: <AudioSocket /> },
    { path: "/loader", element: <CssLoader /> },
    { path: "/dloader", element: <Downloader /> },
    { path: "/vloader", element: <VDownloadLoader /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const StartChat = Loadable(
  lazy(() => import("../components/StartChat")),
);
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const DownloadLoader = Loadable(
  lazy(() => import("../utils/downloadloader")),
);

const VDownloadLoader = Loadable(
  lazy(() => import("../utils/Videodownloadloader")),
);
const CssLoader = Loadable(
  lazy(() => import("../utils/loader")),
);

const AudioSocket = Loadable(
  lazy(() => import("../utils/socketaudio")),
);

const VideoSocket = Loadable(
  lazy(() => import("../utils/socketvideo")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);



const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);

const Signup = Loadable(
  lazy(()=> import('../components/Signup/Signup')),
);

const Signin = Loadable(
  lazy(()=> import('../components/Login/Login')),
);

const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
