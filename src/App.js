import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TheSidebar } from "./containers";
import ProtectedRoot from "./ProtectedRoute";
import "./scss/style.scss";

import { useDispatch, useSelector } from "react-redux";
import { GET_USER_INFO, loadUserData, testLoader } from "./store/actions/user";
import OfficerView from "./views/officerView/OfficerView";
import VoiceAssitant from "./views/pages/voiceRecognition/VoiceAssitant";
import PublicProfile from "./views/pages/publicUserView/PublicProfile";

const loading = (
  <div
    style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const InformerView = React.lazy(() => import("./views/informer/InformerView"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Posts = React.lazy(() => import("./views/pages/posts/Posts"));
const Layout = React.lazy(() => import("./views/subscriber/Layout"));
const Landing = React.lazy(() => import("./views/pages/landing/Landing"));
const OurServices = React.lazy(() =>
  import("./views/pages/ourservices/OurServices")
);
const LoggedOutPostView = React.lazy(() =>
  import("./views/pages/loggedOutPostView/LoggedOutPostView")
);
const PostView = React.lazy(() => import("./views/pages/postView/PostView"));
const LoggedOutPostsList = React.lazy(() =>
  import("./views/pages/loggedOutPostView/LoggedOutPostsList")
);
const Feedbacks = React.lazy(() => import("./views/pages/feedbacks/Feedbacks"));
const VerifyEmail = React.lazy(() =>
  import("./views/pages/verifyEmail/VerifyEmail")
);

//Admin side
const Users = React.lazy(() => import("./views/admin/users/Users"));

const App = (props) => {
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPageLoading(true);
    dispatch(loadUserData());
    setPageLoading(false);
  }, []);
  // console.log(user);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            path={"/verify-email/:id"}
            render={(props) => <VerifyEmail {...props} />}
          />
          <Route
            path={"/approve-donation-for-public/:id/:userId"}
            render={(props) => <OfficerView {...props} />}
          />
          <Route
            exact
            path="/login/informer"
            name="Informer Login"
            render={(props) => <InformerView {...props} />}
          />
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/care-x/services"
            name="Care-x Services"
            render={(props) => <OurServices {...props} />}
          />
          <Route
            exact
            path="/feedback"
            name="Feedbacks"
            render={(props) => <Feedbacks {...props} />}
          />
          <Route
            exact
            path="/community/services"
            name="Community Services"
            render={(props) => <LoggedOutPostsList {...props} />}
          />
          <Route
            exact
            path="/care-x/explore/services/:id"
            name="Care-x Services"
            render={(props) => <LoggedOutPostView {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            path={"/services/explore/service/:id"}
            render={(props) => <PostView {...props} />}
          />

          <ProtectedRoot exact path="/sidebar" component={TheSidebar} />
          <ProtectedRoot exact path="/posts" component={Posts} />
          <ProtectedRoot path="/services" component={Layout} />

          <ProtectedRoot path="/user" component={TheLayout} />

          <Route exact path="/" component={Landing} />
          <Route path="*" component={Page404} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
