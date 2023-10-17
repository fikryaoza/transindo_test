import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
    {
        path: "/category",
        id: "category",
        Component: ContainerLayout,
        meta: {
            sort: 100,
            title: "category",
            icon: createElement(UserOutlined),
        },
        children: [
            {
                index: true,
                id: "category_index",
                lazy: async () => {
                    const mod = await import("#src/pages/category");
                    return {
                        ...mod,
                        Component: mod.default,
                    };
                },
                meta: {
                    title: "Category",
                    icon: createElement(UserOutlined),
                },
            },
        ],
    },
];

export default routes;
