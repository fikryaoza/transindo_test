import type { FormInitialValues } from "#src/pages/login";
import { request, requestBackend } from "#src/utils";

export interface FetchResponseType {
	code: number;
	message: string;
	type: string;
}

export interface LoginResponseType { access_token: string; user: any; }
export function fetchLogin(data: FormInitialValues) {
	return (requestBackend.url("/login").post(data)) as Promise<Record<"data", LoginResponseType>>;
	// return (request.url("/login").post(data)) as Promise<Record<"result", LoginResponseType>>;
}

export function fetchLogout() {
	return (requestBackend.url("/logout").post()) as Promise<FetchResponseType>;
}

export interface UserinfoType {
	userId: string;
	username: string;
	realName: string;
	avatar: string;
	desc: string;
	password: string;
	permissions?: {
		label: string;
		value: string;
	}[];
}

export function fetchUserInfo() {
	return (request.url("/userinfo").get()) as Promise<Record<"result", UserinfoType>>;
}

export interface MemberInfoType {
	code: string;
	username: string;
	email: string;
	borrows: string;
}

export function fetchMember() {
	return requestBackend.url("").get("/user") as Promise<Record<"data", MemberInfoType>>
}


export function postMember(payload) {
	return requestBackend.url("/register").post(payload) as Promise<Record<"data", MemberInfoType>>
}

export interface BookInfoType {
	code: string;
	title: string;
	author: string;
	stock: string;
}

export function fetchBook() {
	return requestBackend.url("").get("/books") as Promise<Record<"data", BookInfoType>>
}

export interface BookBorrowType {
	code: string;
	title: string;
	author: string;
	stock: string;
}

export function fetchBookBorrow() {
	return requestBackend.url("").get("/books") as Promise<Record<"data", BookBorrowType>>
}

export function updateBookBorrow(borrowPayload: any) {
	return requestBackend.url("/borrows/" + borrowPayload.code).put({ borrowPayload }) as Promise<Record<"data", BorrowInfoType>>
}

export interface BorrowInfoType {
	code: string;
	borrowed_date: string;
	due_date: string;
	status: string;
}

export function fetchBorrow() {
	return requestBackend.url("").get("/borrows") as Promise<Record<"data", BorrowInfoType>>
}

export function postBookBorrow(payload: any) {
	return requestBackend.url("/borrows").post(payload) as Promise<Record<"data", BorrowInfoType>>
}

export interface CategoryInfoType {
	id: number;
	name: string;
	description: string;
	image: string;
	price: string;
	status: string;
}

export function fetchCategory() {
	return requestBackend.url("").get("/category") as Promise<Record<"data", CategoryInfoType>>
}

export function postCategory(payload) {
	return requestBackend.url("/category").post(payload) as Promise<Record<"data", CategoryInfoType>>
}

export function updateCategory(payload) {
	return requestBackend.url("/category/" + payload.id).post(payload) as Promise<Record<"data", CategoryInfoType>>
}

export interface TransactionInfoType {
	category_id: string;
	quantity: string;
	price: string;
	subtotal: string;
	status: string;
	created_by: string;
}

export function fetchTransaction() {
	return requestBackend.url("").get("/transaction") as Promise<Record<"data", TransactionInfoType>>
}

export function updateTransaction(borrowPayload: any) {
	return requestBackend.url("/transaction/" + borrowPayload.id).post(borrowPayload) as Promise<Record<"data", BorrowInfoType>>
}

export function postTransaction(payload: any) {
	return requestBackend.url("/transaction").post(payload) as Promise<Record<"data", TransactionInfoType>>
}