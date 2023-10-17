import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
    {
        path: "/transaction",
        id: "transaction",
        Component: ContainerLayout,
        meta: {
            sort: 100,
            title: "transaction",
            icon: createElement(UserOutlined),
        },
        children: [
            {
                index: true,
                id: "transaction_index",
                lazy: async () => {
                    const mod = await import("#src/pages/transaction");
                    return {
                        ...mod,
                        Component: mod.default,
                    };
                },
                meta: {
                    title: "Transaction",
                    icon: createElement(UserOutlined),
                },
            },
        ],
    },
];

export default routes;
