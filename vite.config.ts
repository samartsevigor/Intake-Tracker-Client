/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dayjs from "dayjs";

import { dependencies, devDependencies, name, version } from "./package.json";

const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
};

export default defineConfig({
	base: process.env.NODE_ENV === "development" ? "" : "/react-antd-admin/",
	plugins: [react()],
	server: {
		port: 3000,
	},
	define: {
		__APP_INFO__: JSON.stringify(__APP_INFO__),
	},
	build: {
		outDir: "build",
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					antd: ["antd", "@ant-design/icons"],
				},
			},
		},
	},
});
