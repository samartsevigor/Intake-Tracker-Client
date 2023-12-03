import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { logout } from "#src/store/slices/user/user";
import type { RootState } from "#src/store";
import { useAppDispatch, useAppSelector } from "#src/store";

const items: MenuProps["items"] = [
	{
		label: "Logout",
		key: "logout",
	},
];

export default function UserMenu() {
	const dispatch = useAppDispatch();
	const { email } = useAppSelector((store: RootState) => store.user);
	const onClick: MenuProps["onClick"] = ({ key }) => {
		if (key === "logout") {
			dispatch(logout());
		}
	};

	return (
		<Dropdown menu={{ items, onClick }} arrow placement="bottom">
			<div role="menuitem" tabIndex={-1}>
				{email}
			</div>
		</Dropdown>
	);
}
