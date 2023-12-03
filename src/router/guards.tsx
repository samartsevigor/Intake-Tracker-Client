import { useMatches, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import type { RootState } from "#src/store";
import { useAppDispatch, useAppSelector } from "#src/store";
import { whiteList } from "#src/router/index";
import { ParentLayout } from "#src/layout";
import { getUserInfoThunk } from "#src/store/slices/user/actions";

export function RouterGuards() {
	const { accessToken, isFetching } = useAppSelector(
		(state: RootState) => state.user,
	);
	const navigate = useNavigate();
	const matches = useMatches();
	const dispatch = useAppDispatch();
	const guardLogic = async () => {
		if (!accessToken) {
			const currentRoute = matches[matches.length - 1];
			if (!whiteList.includes(currentRoute.pathname) && !isFetching) {
				navigate("/login");
			} else {
				!whiteList.includes(currentRoute.pathname) &&
					(await dispatch(getUserInfoThunk()));
			}
		}
	};

	useEffect(() => {
		guardLogic();
	}, [isFetching]);

	return <ParentLayout />;
}
