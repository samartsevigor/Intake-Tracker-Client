import type { FC } from "react";
import { useCallback, useEffect } from "react";
import { Form, Input, InputNumber, Modal } from "antd";

import type { AddMedicationModalProps } from "#src/components/AddMedicationModal/types";
import type { Medication } from "#src/store/slices/medication/types";

const { useForm } = Form;

const AddMedicationModal: FC<AddMedicationModalProps> = ({
	visible,
	onCancel,
	onSubmit,
	title,
	medication,
}) => {
	const [form] = useForm();
	const handleSubmit = useCallback(
		(values: Partial<Medication>) => {
			onSubmit(values);
			form.resetFields();
		},
		[form, onSubmit],
	);
	const handleCancel = useCallback(() => {
		form.resetFields();
		onCancel();
	}, [form, onCancel]);

	useEffect(() => {
		if (visible) {
			const fields: { name: string; value: Partial<Medication> }[] = [];
			if (medication) {
				form.setFields([
					...fields,
					{
						name: "name",
						value: medication.name,
					},
					{
						name: "description",
						value: medication.description,
					},
					{
						name: "count",
						value: medication.count,
					},
					{
						name: "destination_count",
						value: medication.destination_count,
					},
				]);
			}
		}
	}, [form, medication, visible]);

	return (
		<Modal
			title={title}
			open={visible}
			centered
			width={640}
			onCancel={handleCancel}
			onOk={form.submit}
			destroyOnClose
		>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, min: 3 }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[{ required: true, min: 3 }]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item
					label="Count"
					name="count"
					rules={[
						{
							required: true,
							type: "number",
							min: 0,
							validator: async (_, value) => {
								if (
									value &&
									form.getFieldValue("destination_count") &&
									value > form.getFieldValue("destination_count")
								) {
									throw new Error("Count cannot be more than Destination");
								}
							},
						},
					]}
				>
					<InputNumber type="number" style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item
					label="Destination"
					name="destination_count"
					rules={[{ required: true, type: "number", min: 1 }]}
				>
					<InputNumber type="number" style={{ width: "100%" }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddMedicationModal;
