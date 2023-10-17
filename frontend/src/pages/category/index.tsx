import {
	Layout,
	Row,
	Col,
	Space,
	Table,
	Tag,
	Form,
	Input,
	Button,
	Modal,
	Upload,
	Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { createUseStyles } from "react-jss";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useAppSelector, useAppDispatch } from "#src/store";
import {
	categoryListThunk,
	postCategoryThunk,
	updateCategoryThunk,
} from "#src/store/slices/category";

const useStyles = createUseStyles({
	section: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
});

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

interface CategoryType {
	key: string;
	id: string;
	name: string;
	description: string;
	image: string;
	price: string;
	status: string;
}

export default function Category() {
	const classes = useStyles();
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [fileList, setFileList] = useState([]);

	const columns: ColumnsType<CategoryType> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (text) => <img src={`${text}`}></img>,
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
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
						Edit
					</Button>
				</Space>
			),
		},
	];
	useEffect(() => {
		dispatch(categoryListThunk());
	}, [dispatch]);

	const { category } = useAppSelector((state) => state);
	const members = category.map((x) => {
		return { ...x, key: x.id, status: x.status ? "Active" : "Inactive" };
	});
	const datas: CategoryType[] = members;

	const showModal = (record: any) => {
		// setIsModalVisible(true);
		// setmodaldata(record);
		setIsModalOpen(true);
		form.setFieldsValue({ id: record.id });
		form.setFieldsValue({ price: record.price });
		form.setFieldsValue({ name: record.name });
		form.setFieldsValue({ description: record.description });
		form.setFieldsValue({ image: record.image });
		form.setFieldsValue({ status: record.status === "Active" ? 1 : 0 });
		setIsUpdate(true);
	};
	const onClickBtn = () => {
		setIsModalOpen(true);
		setIsUpdate(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const onFinish = async (values) => {
		// values.borrowed_date = datePickerValue[0];
		// values.due_date = datePickerValue[1];
		// values.status = "BORROWED";
		// values.approved_by = "Fikry";
		values.image = values.image.fileList
			? values.image.fileList[0].base64
			: values.image;
		if (!isUpdate) await dispatch(postCategoryThunk(values));
		else await dispatch(updateCategoryThunk(values));
		handleCancel();
	};

	const props: UploadProps = {
		fileList,
		beforeUpload: (file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				console.log();
			};
			reader.readAsText(file);

			// Prevent upload
			return false;
		},
		onChange: (info) => {
			let fileList = [...info.fileList];
			// Accept 5 files only
			fileList = fileList.slice(-5);
			fileList.forEach(function (file, index) {
				let reader = new FileReader();
				reader.onload = (e) => {
					file.base64 = e.target.result;
				};
				reader.readAsDataURL(file.originFileObj);
			});
		},
	};
	return (
		<Layout className={classes.section}>
			<h1>Category List, {category?.length}</h1>
			<Row justify="space-between">
				<Button
					type="primary"
					id="btnTesting"
					disabled={
						JSON.parse(window.localStorage.getItem("user")).role === "user"
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
						subtotal: 1,
						quantity: 1,
					}}
					style={{
						maxWidth: 600,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item label="id" name="id" style={{ display: "none" }}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please select name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								required: true,
								message: "Please select description!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Image"
						name="image"
						rules={[
							{
								required: true,
								message: "Please select image!",
							},
						]}
					>
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>Click to Upload</Button>
						</Upload>
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
						<Input />
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
								{ value: 1, label: "Active" },
								{ value: 0, label: "Inactive" },
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
							Add
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Layout>
	);
}
