import { Button, Card, Flex, Popconfirm, Space, Table } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	MinusOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddMedicationModal from "#src/components/AddMedicationModal";
import type { RootState } from "#src/store";
import { useAppDispatch } from "#src/store";
import {
	addNewMedication,
	deleteMedication,
	getMedications,
	updateMedication,
} from "#src/store/slices/medication/actions";
import type { Medication } from "#src/store/slices/medication/types";
import { clearMedications } from "#src/store/slices/medication/medication";
import { sortMedications } from "#src/utils";

export default function MedicationsList() {
	const { medications } = useSelector((store: RootState) => store.medication);
	const dispatch = useAppDispatch();
	const [editingRow, setEditRow] = useState<Medication | null>(null);
	const [visible, setVisible] = useState<boolean>(false);

	const handleUpdateCount = async (id: number, count: number) => {
		try {
			await dispatch(updateMedication({ id, medication: { count } }));
		} catch (error) {
			console.log("Failed");
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Performed",
			dataIndex: "count",
			key: "count",
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			render: (_, row: Medication) => (
				<Space>
					<Button
						type="primary"
						icon={<MinusOutlined />}
						size="small"
						onClick={() => handleUpdateCount(row.id, row.count - 1)}
					/>
					{row.count}
					{row.count < row.destination_count && (
						<Button
							type="primary"
							icon={<PlusOutlined />}
							size="small"
							onClick={() => handleUpdateCount(row.id, row.count + 1)}
						/>
					)}
				</Space>
			),
		},
		{
			title: "Destination",
			dataIndex: "destination_count",
			key: "destination_count",
		},
		{
			dataIndex: "",
			key: "edit",
			width: 90,
			render: (row: Medication) => {
				return (
					<Flex>
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => handleEdit(row)}
							style={{ justifySelf: "center", marginRight: "6px" }}
						/>
						<Popconfirm
							title="Delete the medication"
							description="Are you sure to delete this medication?"
							onConfirm={() => handleDelete(row.id)}
							okText="Yes"
							cancelText="No"
						>
							<Button
								type="primary"
								shape="circle"
								icon={<DeleteOutlined />}
								style={{ justifySelf: "center" }}
								danger
							/>
						</Popconfirm>
					</Flex>
				);
			},
		},
	];

	const handleEdit = useCallback((row: Medication) => {
		setEditRow(row);
		setVisible(true);
	}, []);

	const handleDelete = useCallback((id: number) => {
		dispatch(deleteMedication(id));
	}, []);

	const handleCancel = useCallback(() => {
		setEditRow(null);
		setVisible(false);
	}, []);

	const handleSubmit = useCallback(
		async (values: Partial<Medication>) => {
			try {
				if (editingRow) {
					await dispatch(
						updateMedication({ id: editingRow.id, medication: values }),
					);
				} else {
					await dispatch(addNewMedication(values));
				}
				setVisible(false);
				setEditRow(null);
			} catch (error) {
				console.log("Failed");
			}
		},
		[editingRow],
	);

	const sortedMedications = sortMedications(medications);

	useEffect(() => {
		dispatch(getMedications());
		return () => {
			dispatch(clearMedications());
		};
	}, []);

	return (
		<Card
			title={"Medications list"}
			extra={
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => setVisible(true)}
				>
					Add medication
				</Button>
			}
		>
			<Table dataSource={sortedMedications} columns={columns} />
			<AddMedicationModal
				visible={visible}
				onCancel={handleCancel}
				onSubmit={handleSubmit}
				title="New medication"
				medication={editingRow}
			/>
		</Card>
	);
}
