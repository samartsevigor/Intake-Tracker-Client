import { lazy } from "react";

import type { AppRouteRecordRaw } from "../types";

const Login = lazy(() => import("#src/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/login",
		id: "login",
		Component: Login,
		handle: {
			hideMenu: true,
			title: "Log In",
		},
	},
];

export default routes;
