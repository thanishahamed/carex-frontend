import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/user/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Profile"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/user/list",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Services",
    to: "/user/services",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Funds",
    to: "/user/manage/funds",
    icon: "cil-dollar",
  },
];

export default _nav;
