import { Layout, theme } from "antd";

import Logo from "../logo";
import Header from "../header";
import SiderMenu from "../sider-menu";
import ParentLayout from "../parent-layout";

const { Content, Sider } = Layout;

export default function ContainerLayout() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100%" }}>
			<Sider trigger={null}>
				<Logo />
				<SiderMenu />
			</Sider>
			<Layout>
				<Header />
				<Content
					style={{
						overflow: "auto",
						display: "flex",
						flexDirection: "column",
						padding: "0 1em 1em",
						marginTop: "2rem",
					}}
				>
					<div
						style={{
							flexGrow: 1,
							backgroundColor: colorBgContainer,
						}}
					>
						<ParentLayout />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}
