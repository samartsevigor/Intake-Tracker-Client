import { Layout, Row, Col, Space, Form, Input, Button, Typography } from "antd";
import { createUseStyles } from "react-jss";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import type { RootState } from "#src/store";
import { useAppDispatch, useAppSelector } from "#src/store";
import { authRegisterThunk } from "#src/store/slices/user/actions";
import { Footer } from "#src/layout";

const { Title } = Typography;

const useStyles = createUseStyles(() => {
	return {
		logoText: {
			fontSize: "1.8em !important",
		},
		content: {
			marginTop: "100px",
		},
		template: {
			width: "30em",
		},
		section: {
			height: "100%",
			display: "flex",
			flexDirection: "column",
		},
		footer: {
			backgroundColor: "transparent",
			display: "flex",
			justifyContent: "center",
		},
	};
});

const { Content } = Layout;
const FORM_INITIAL_VALUES = {
	email: "",
	password: "",
};
export type FormInitialValues = typeof FORM_INITIAL_VALUES;

export default function Register() {
	const classes = useStyles();
	const [registerForm] = Form.useForm();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { accessToken } = useAppSelector((store: RootState) => store.user);

	const handleFinish = async (values: FormInitialValues) => {
		await dispatch(authRegisterThunk(values));
	};

	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [navigate, accessToken]);

	return (
		<Layout className={classes.section}>
			<Content className={classes.content}>
				<Row justify="center">
					<Col xs={23} sm={23} lg={8}>
						<Space direction="vertical" style={{ minWidth: "100%" }}>
							<Space direction="vertical">
								<Title style={{ marginTop: 0 }} level={5}>
									Medication Intake Tracker
								</Title>
							</Space>
							<Form
								name="registerForm"
								form={registerForm}
								layout="vertical"
								onFinish={handleFinish}
							>
								<Form.Item
									label="Email"
									name="email"
									rules={[
										{
											required: true,
											type: "email",
											message: "Please enter a valid email",
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label={"Password"}
									name="password"
									rules={[
										{
											required: true,
											min: 8,
											message: "Password must be at least 8 characters",
										},
									]}
								>
									<Input.Password />
								</Form.Item>
								<Form.Item>
									<Button block type="primary" htmlType="submit">
										Sign up
									</Button>
								</Form.Item>
							</Form>
							<Link to="/login">Login</Link>
						</Space>
					</Col>
				</Row>
			</Content>
			<Footer />
		</Layout>
	);
}
