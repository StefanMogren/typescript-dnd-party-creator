import type { DndClassShort, DndClassLong } from "../interfaces/index.ts";
// import type { DndClassShort, DndClassLong } from "./interfaces/index.ts";

const fetchDndClasses = async (): Promise<DndClassShort[] | []> => {
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

export const fetchFullDndClassInfo = async (): Promise<
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
};
