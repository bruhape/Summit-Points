export interface data {
	ID: string;
	name: string;
	item: string | null;
	amount: number;
	desc: string | null;
}

export interface transaction {
	amount: number;
	time: Date;
	otherParty: string;
	id: string;
}

export interface orderDetails {
	key: string;
	order_id: string;
	amount: string | number;
	currency: string;
	name: string;
	description: string;
	theme: { color: string };
}