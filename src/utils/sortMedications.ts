import type { Medication } from "#src/store/slices/medication/types";

export const sortMedications = (data: Medication[]) => {
	const sortedData = [...data];

	sortedData.sort((a, b) => {
		const dateA = new Date(a.created_at).getTime();
		const dateB = new Date(b.created_at).getTime();

		if (a.count !== a.destination_count && b.count !== b.destination_count) {
			return dateB - dateA;
		} else if (
			a.count !== a.destination_count &&
			b.count === b.destination_count
		) {
			return -1;
		} else if (
			a.count === a.destination_count &&
			b.count !== b.destination_count
		) {
			return 1;
		}

		return dateB - dateA;
	});

	return sortedData;
};
