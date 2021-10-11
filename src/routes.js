import React from "react";

const Dashboard = React.lazy(() => import("./views/admin/dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/admin/users/Users"));
const EditUser = React.lazy(() =>
  import("./views/admin/users/components/EditUser")
);
const Services = React.lazy(() => import("./views/admin/services/Services"));
const Funds = React.lazy(() => import("./views/admin/funds/Funds"));

const routes = [
  { path: "/user/", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/user/list", name: "Users", component: Users },
  { path: "/user/services", name: "Services", component: Services },
  { path: "/user/:userId/edit", name: "Edit", component: EditUser },
  { path: "/user/manage/funds", name: "Funds", component: Funds },
];

export default routes;
