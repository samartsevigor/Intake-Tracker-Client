import { Routes, Route } from "react-router-dom";

import { ContainerLayout } from "#src/layout";

export default function Error404() {
	return (
		<Routes>
			<Route element={<ContainerLayout />} path="*">
				<Route path="*" element={<div>Not found</div>}></Route>
			</Route>
		</Routes>
	);
}
