import { ConfigProvider, theme as antdTheme } from "antd";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import "./index.css";

import { router } from "./router";

import { Toaster } from "#node_modules/react-hot-toast";

export default function App() {
	return (
		<ConfigProvider
			theme={{
				algorithm: antdTheme.darkAlgorithm,
			}}
		>
			<Suspense fallback={null}>
				<RouterProvider router={router} />
			</Suspense>
			<Toaster position="top-right" reverseOrder={false} />
		</ConfigProvider>
	);
}
