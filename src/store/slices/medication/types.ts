export type InitialStateTypes = {
	medications: Medication[];
};

export type Medication = {
	id: number;
	name: string;
	description: string;
	count: number;
	destination_count: number;
	created_at: string;
};
