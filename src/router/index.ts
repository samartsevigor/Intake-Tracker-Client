import { createBrowserRouter } from "react-router-dom";

import type { AppRouteRecordRaw } from "./types";
import { RouterGuards } from "./guards";

import Error404 from "#src/pages/404";

const modules = import.meta.glob<
	Record<string, { default: AppRouteRecordRaw[] }>
>("./modules/**/*.ts", { eager: true });

export const routeModuleList = Object.keys(modules).reduce<AppRouteRecordRaw[]>(
	(list, key) => {
		const mod = modules[key].default ?? {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		return [...list, ...modList];
	},
	[],
);

export const whiteList = ["/login", "/register"];

export const router = createBrowserRouter(
	[
		{
			path: "/",
			id: "root-route",
			Component: RouterGuards,
			children: routeModuleList,
		},
		{
			path: "*",
			id: "errorBoundary-route",
			Component: Error404,
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
);

export default router;
