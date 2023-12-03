import { lazy } from "react";

import type { AppRouteRecordRaw } from "../types";

const Register = lazy(() => import("#src/pages/register"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/register",
		id: "register",
		Component: Register,
		handle: {
			hideMenu: true,
			title: "Sign up",
		},
	},
];

export default routes;
