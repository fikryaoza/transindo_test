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
const { Header, Content, Sider } = Layout;
import type { ColumnsType } from "antd/es/table";
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

import { createUseStyles } from "react-jss";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "#src/store";
import {
	transactionListThunk,
	updateTransactionThunk,
	postTransactionThunk,
} from "#src/store/slices/transaction";
import { categoryListThunk } from "#src/store/slices/category";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);
const useStyles = createUseStyles({
	section: {
		height: "60%",
		display: "flex",
		flexDirection: "column",
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
});

export default function Dashboard() {
	const classes = useStyles();
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [totalPrice, setPrice] = useState(false);
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
	useEffect(() => {
		dispatch(transactionListThunk());
		// dispatch(categoryListThunk());
	}, [dispatch]);
	const { transaction, category } = useAppSelector((state) => state);
	const categories: any[] = [];
	category.forEach((x: any) => {
		if (x.status) {
			categories.push({ ...x, value: x.id, label: x.name });
		}
	});
	const categ = [];
	const members = transaction.forEach((x) => {
		const match = categ.find((cat) => cat === x.categories.name);
		if (!match) categ.push(x.categories.name);
	});
	const totalQty = [];
	const totalReveneu = [];
	categ.forEach((x) => {
		const check = transaction.filter((trx) => trx.categories.name === x);
		if (check.length > 0) {
			let qtys = 0;
			let rvn = 0;
			check.forEach((y) => {
				qtys += parseFloat(y.quantity);
				rvn += parseInt(y.subtotal);
			});
			totalQty.push(qtys);
			totalReveneu.push(rvn);
		}
	});
	const datas: MemberType[] = members;
	const dataCategory: CategoryType[] = categories;

	const data = {
		labels: categ,
		datasets: [
			{
				label: "# Qty (Kg)",
				data: totalQty,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const dataPie = {
		labels: categ,
		datasets: [
			{
				label: "# of Revenue (Rp)",
				data: totalReveneu,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<Layout className={classes.section}>
			<h1>Transaction Report</h1>
			<Row justify="space-between">
				<Content
					style={{ background: "#fff", padding: 24, margin: 0, minHeight: 500 }}
				>
					<div style={{ width: 200, height: 200 }}>
						<Doughnut data={data} />;
					</div>
					<div style={{ width: 200, height: 400 }}>
						<Pie data={dataPie} />;
					</div>
				</Content>
			</Row>
		</Layout>
	);
}
