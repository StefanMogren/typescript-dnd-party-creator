import type { CurrentParty } from "../interfaces";
export const getLocalStorage = (): CurrentParty[] | null => {
	const fromLocalStorage: string | null = localStorage.getItem("currentParty");
	if (fromLocalStorage) {
		const currentParty: CurrentParty[] = JSON.parse(fromLocalStorage);
		return currentParty;
	} else {
		return null;
	}
};
export const updateLocalStorage = (
	newCharacter: CurrentParty
): CurrentParty[] | null => {
	const fromLocalStorage: string | null = localStorage.getItem("currentParty");

	if (fromLocalStorage) {
		const currentParty: CurrentParty[] = JSON.parse(fromLocalStorage);

		if (currentParty.length < 6) {
			const updatedParty: CurrentParty[] = [...currentParty, newCharacter];
			localStorage.setItem("currentParty", JSON.stringify(updatedParty));
			return updatedParty;
		} else {
			return null;
		}
	} else {
		localStorage.setItem("currentParty", JSON.stringify([newCharacter]));
		return [newCharacter];
	}
};
