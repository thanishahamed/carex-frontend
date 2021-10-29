import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "src/store/actions/user";
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

//Page imports
const Posts = React.lazy(() => import("../pages/posts/Posts"));
const EditPost = React.lazy(() => import("../pages/posts/components/EditPost"));
const Donate = React.lazy(() => import("../pages/donate/Donate"));
const Scholarships = React.lazy(() =>
  import("../pages/scholarship/Scholarships")
);
const Profile = React.lazy(() => import("../pages/profile/Profile"));
const DonateBlood = React.lazy(() =>
  import("../pages/donateBlood/DonateBlood")
);
const DonateOrgan = React.lazy(() =>
  import("../pages/donateOrgan/DonateOrgan")
);
const DonateBody = React.lazy(() => import("../pages/donateBody/DonateBody"));
const DonateStudentFund = React.lazy(() =>
  import("../pages/donateStudentFund/DonateStudentFund")
);
const RequestService = React.lazy(() =>
  import("../pages/requestService/RequestService")
);
const ChatRoom = React.lazy(() => import("../pages/chatRoom/ChatRoom"));
const PostsHeader = React.lazy(() => import("src/containers/PostsHeader"));
const ThePostsSideBar = React.lazy(() =>
  import("src/containers/ThePostsSideBar")
);

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  return (
    <div>
      <div className="c-app c-default-layout">
        <ThePostsSideBar />
        <div className="c-wrapper">
          <PostsHeader />
          <div className="c-body">
            <div className="c-app c-default-layout">
              <div className="c-wrapper">
                <div className="c-body px-2">
                  <React.Suspense fallback={loading}>
                    <Switch>
                      <Route
                        path={"/services/chat-room"}
                        render={(props) => <ChatRoom {...props} />}
                      />
                      <Route
                        path={"/services/request-service"}
                        render={(props) => <RequestService {...props} />}
                      />
                      <Route
                        path={"/services/donate/student-fund-donation"}
                        render={(props) => <DonateStudentFund {...props} />}
                      />
                      <Route
                        path={"/services/donate/body-donation"}
                        render={(props) => <DonateBody {...props} />}
                      />
                      <Route
                        path={"/services/donate/organ-donation"}
                        render={(props) => <DonateOrgan {...props} />}
                      />
                      <Route
                        path={"/services/donate/blood-donation"}
                        render={(props) => <DonateBlood {...props} />}
                      />
                      <Route
                        path={"/services/donate"}
                        render={(props) => <Donate {...props} />}
                      />
                      <Route
                        path={"/services/scholarships"}
                        render={(props) => <Scholarships {...props} />}
                      />
                      <Route
                        path={"/services/profile"}
                        render={(props) => <Profile {...props} />}
                      />
                      <Route
                        path={"/services/edit/:id/post"}
                        render={(props) => <EditPost {...props} />}
                      />
                      <Route
                        path={"/"}
                        render={(props) => <Posts {...props} />}
                      />
                    </Switch>
                  </React.Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
