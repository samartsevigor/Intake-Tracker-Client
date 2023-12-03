import { theme, Row, Col } from "antd";

import MedicationsList from "./components/medications-list";

export default function Dashboard() {
	const {
		token: { colorBgLayout },
	} = theme.useToken();

	return (
		<div style={{ height: "100%", backgroundColor: colorBgLayout }}>
			<Row gutter={[20, 20]}>
				<Col span={24}>
					<MedicationsList />
				</Col>
			</Row>
		</div>
	);
}
