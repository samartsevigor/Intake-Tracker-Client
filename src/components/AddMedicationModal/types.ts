import type { Medication } from "#src/store/slices/medication/types";

export interface AddMedicationModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: Partial<Medication>) => void;
	title: string;
	medication: Medication | null;
}
