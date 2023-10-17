import {
	Layout,
	Row,
	Col,
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
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "#src/store";
import { memberListThunk, postMemberThunk } from "#src/store/slices/member";

const useStyles = createUseStyles({
	section: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
});

interface MemberType {
	key: string;
	name: string;
	role: string;
	id: string;
	email: string;
}

const columns: ColumnsType<MemberType> = [
	{
		title: "Code",
		dataIndex: "id",
		key: "id",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
	},
];

export default function Member() {
	const classes = useStyles();

	const [form] = Form.useForm();
	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		dispatch(memberListThunk());
	}, [dispatch]);

	const { member } = useAppSelector((state) => state);
	const members = member.map((x) => {
		return { ...x, key: x.id };
	});
	const datas: MemberType[] = members;
	const onClickBtn = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = async (values) => {
		await dispatch(postMemberThunk(values));
		handleCancel();
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	return (
		<Layout className={classes.section}>
			<h1>Member List, {member?.length}</h1>
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
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please select email!",
								type: "email",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please select password!",
							},
						]}
					>
						<Input.Password
							placeholder="input password"
							iconRender={(visible) =>
								visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
							}
						/>
					</Form.Item>
					<Form.Item
						label="Role"
						name="role"
						rules={[
							{
								required: true,
								message: "Please select role!",
							},
						]}
					>
						<Select
							placeholder="Select a role"
							style={{ width: 120 }}
							onChange={handleChange}
							options={[
								{ value: "admin", label: "Admin" },
								{ value: "user", label: "User" },
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
