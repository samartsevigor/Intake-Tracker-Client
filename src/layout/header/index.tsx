import type { GlobalToken } from "antd";
import { Layout, theme } from "antd";
import { createUseStyles } from "react-jss";

import UserMenu from "./components/userMenu";

const { Header: AntdHeader } = Layout;

const useStyles = createUseStyles((theme: GlobalToken) => {
	return {
		layoutHeader: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "stretch",
		},
		layoutHeaderRight: {
			display: "flex",
			justifyContent: "center",
			marginRight: "1.8em",
			alignItems: "center",
			"&>div": {
				cursor: "pointer",
				padding: ["0", ".7em"],
			},
			"&>div:hover": {
				background: {
					color: theme.colorBgTextHover,
				},
			},
		},
	};
});

export default function Header() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();

	return (
		<AntdHeader style={{ padding: 0, background: colorBgContainer }}>
			<div className={classes.layoutHeader}>
				<div className={classes.layoutHeaderRight} role="menu" tabIndex={0}>
					<UserMenu />
				</div>
			</div>
		</AntdHeader>
	);
}
