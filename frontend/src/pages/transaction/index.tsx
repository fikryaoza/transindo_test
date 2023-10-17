import {
	Layout,
	Row,
	InputNumber,
	Space,
	Table,
	Select,
	Form,
	Input,
	Button,
	Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { createUseStyles } from "react-jss";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "#src/store";
import {
	transactionListThunk,
	updateTransactionThunk,
	postTransactionThunk,
} from "#src/store/slices/transaction";
import { categoryListThunk } from "#src/store/slices/category";

const useStyles = createUseStyles({
	section: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
});

export default function Transaction() {
	const classes = useStyles();
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [totalPrice, setPrice] = useState(false);
	const [totalQty, setQuantity] = useState(false);
	const [modaldata, setmodaldata] = useState([]);
	const dispatch = useAppDispatch();

	const getDateInFormat = (date?: Date): string => {
		const toString = (date: number, padLength: number) => {
			return date.toString().padStart(padLength, "0");
		};
		const dateFormat = new Date(date);
		const dateTimeNow =
			toString(dateFormat.getFullYear(), 4) +
			"-" +
			toString(dateFormat.getMonth() + 1, 2) +
			"-" +
			toString(dateFormat.getDate(), 2);
		return dateTimeNow;
	};

	interface MemberType {
		key: string;
		category_id: string;
		quantity: string;
		id: string;
		subtotal: string;
		status: string;
		category: string;
		created_by: string;
		user: string;
	}
	interface CategoryType {
		key: string;
		id: number;
		name: string;
	}

	const columns: ColumnsType<MemberType> = [
		{
			title: "Code",
			dataIndex: "id",
			key: "id",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "email",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Subtotal",
			dataIndex: "subtotal",
			key: "subtotal",
		},
		{
			title: "Created By",
			dataIndex: "user",
			key: "user",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Date",
			dataIndex: "created_at",
			key: "created_at",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="primary"
						disabled={
							JSON.parse(window.localStorage.getItem("user")).role === "user"
						}
						onClick={() => showModal(record)}
					>
						Update
					</Button>
				</Space>
			),
		},
	];
	useEffect(() => {
		dispatch(transactionListThunk());
	}, [dispatch]);
	const { transaction, category } = useAppSelector((state) => state);
	const categories: any[] = [];
	category.forEach((x: any) => {
		if (x.status) {
			categories.push({ ...x, value: x.id, label: x.name });
		}
	});
	const members = transaction.map((x) => {
		const createdDate = getDateInFormat(x.created_at);
		return {
			...x,
			key: x.id,
			category: x.categories.name,
			created_at: createdDate,
			user: x.users.name,
		};
	});
	const datas: MemberType[] = members;
	const dataCategory: CategoryType[] = categories;
	const showModal = (record: any) => {
		setIsModalVisible(true);
		setmodaldata(record);
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsModalVisible(false);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const filterOption = (input, option) =>
		(option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	const onChangeCategory = (value) => {
		const selectedCategory = category.find((x) => x.id === value);
		setPrice(selectedCategory.price);
		form.setFieldsValue({ price: selectedCategory.price });
		form.setFieldsValue({ subtotal: selectedCategory.price });
	};
	const onFinishStatus = async (values) => {
		console.log("valuwed", values);
		await dispatch(updateTransactionThunk(values));
		handleCancel();
	};
	const onClickBtn = () => {
		setIsModalOpen(true);
		setTimeout(() => {
			// dispatch(memberListThunk());
			dispatch(categoryListThunk());
		}, 100);
	};
	const onFinish = async (values) => {
		// values.borrowed_date = datePickerValue[0];
		// values.due_date = datePickerValue[1];
		// values.status = "BORROWED";
		// values.approved_by = "Fikry";
		values.category_id = values.category;
		await dispatch(postTransactionThunk(values));
		handleCancel();
	};

	const onChangeQty = (value) => {
		form.setFieldsValue({ subtotal: Math.floor(value * totalPrice) });
	};

	return (
		<Layout className={classes.section}>
			<h1>Transaction List, {transaction?.length}</h1>
			<Row justify="space-between">
				<Button
					type="primary"
					id="btnTesting"
					disabled={
						JSON.parse(window.localStorage.getItem("user")).role === "admin"
					}
					onClick={onClickBtn}
				>
					+ Add Data
				</Button>
			</Row>
			<Table columns={columns} dataSource={datas} />
			<Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
				<Form
					name="basic"
					form={form}
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					initialValues={{
						created_by: JSON.parse(window.localStorage.getItem("user")).id,
						subtotal: 1 * totalPrice,
						quantity: 1,
					}}
					style={{
						maxWidth: 600,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="User"
						name="created_by"
						rules={[
							{
								required: true,
								message: "Please select quantity!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Category"
						name="category"
						rules={[
							{
								required: true,
								message: "Please select category!",
							},
						]}
					>
						<Select
							placeholder="Select a category"
							optionFilterProp="children"
							onChange={onChangeCategory}
							filterOption={filterOption}
							options={(dataCategory || []).map((d) => ({
								value: d.value,
								label: d.label,
							}))}
						/>
					</Form.Item>
					<Form.Item
						label="Price"
						name="price"
						rules={[
							{
								required: true,
								message: "Please select price!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>

					<Form.Item
						label="Quantity"
						name="quantity"
						rules={[
							{
								required: true,
								message: "Please select quantity!",
							},
						]}
					>
						<InputNumber<string>
							min="0"
							max="1000"
							step="0.1"
							onChange={onChangeQty}
						/>
					</Form.Item>
					<Form.Item
						label="Subtotal"
						name="subtotal"
						rules={[
							{
								required: true,
								message: "Please select subtotal!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Add
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Basic Modal"
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					name="updateStatus"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						id: modaldata.id,
						category_id: modaldata.category_id,
						quantity: modaldata.quantity,
						price: modaldata.price,
						subtotal: modaldata.subtotal,
						created_by: modaldata.created_by,
					}}
					onFinish={onFinishStatus}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Trx ID"
						name="id"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Category"
						name="category_id"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Quantity"
						name="quantity"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Price"
						name="price"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Subtotal"
						name="subtotal"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Created By"
						name="created_by"
						rules={[
							{
								required: true,
								message: "Please select Trx ID!",
							},
						]}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Status"
						name="status"
						rules={[
							{
								required: true,
								message: "Please select status!",
							},
						]}
					>
						<Select
							placeholder="Select a status"
							style={{ width: 120 }}
							onChange={handleChange}
							options={[
								{ value: "Cancel", label: "Cancel" },
								{ value: "Paid", label: "Paid" },
							]}
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Layout>
	);
}
