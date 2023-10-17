import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/member",
		id: "member",
		Component: ContainerLayout,
		meta: {
			sort: 100,
			title: "member",
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				id: "member_index",
				lazy: async () => {
					const mod = await import("#src/pages/member");
					return {
						...mod,
						Component: mod.default,
					};
				},
				meta: {
					title: "Member",
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
