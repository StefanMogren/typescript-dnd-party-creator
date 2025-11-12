import type { DndClassShort, DndClassLong } from "../interfaces/index.ts";

// D&D 5th Edition API, acquired at
// https://www.dnd5eapi.co

export const fetchDndClasses = async (): Promise<DndClassShort[] | []> => {
	console.log("Fetch function is running!");

	interface DndClassesData {
		results: DndClassShort[];
	}
	try {
		const response: Response = await fetch(
			"https://www.dnd5eapi.co/api/2014/classes/"
		);
		if (response.ok) {
			const data: DndClassesData = await response.json();
			return data.results;
		} else {
			throw new Error("Failed to fetch classes.");
		}
	} catch (error) {
		console.log(error);
		return [];
	}
};

// This fetch is currently not used as it would take too much time to fully implement all features.
// It still works though.
export const fetchFullDndClassInfo = async (
	className: string
): Promise<DndClassLong | null> => {
	console.log("Fetch function is running!");

	/* 	interface DndClassesData {
		results: DndClassLong;
	} */
	try {
		const response: Response = await fetch(
			`https://www.dnd5eapi.co/api/2014/classes/${className}`
		);
		if (response.ok) {
			const data: DndClassLong = await response.json();
			console.log(data);

			return data;
		} else {
			throw new Error("Failed to fetch classes.");
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

/* export const fetchFullDndClassInfo = async (): Promise<
	DndClassLong[] | null
> => {
	const dndClasses: DndClassShort[] | [] = await fetchDndClasses();
	console.log(dndClasses);

	if (dndClasses.length > 0) {
		const responses: Response[] = await Promise.all(
			dndClasses.map((dndClass) =>
				fetch(`https://www.dnd5eapi.co${dndClass.url}`)
			)
		);

		const data: DndClassLong[] = await Promise.all(
			responses.map((res) => res.json())
		);
		console.log(data);
		return data;
	} else {
		return null;
	}
}; */
