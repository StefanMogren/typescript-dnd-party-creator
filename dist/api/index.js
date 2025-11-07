// import type { DndClassShort, DndClassLong } from "./interfaces/index.ts";
const fetchDndClasses = async () => {
    console.log("Fetch function is running!");
    try {
        const response = await fetch("https://www.dnd5eapi.co/api/2014/classes/");
        if (response.ok) {
            const data = await response.json();
            return data.results;
        }
        else {
            throw new Error("Failed to fetch classes.");
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
export const fetchFullDndClassInfo = async () => {
    const dndClasses = await fetchDndClasses();
    console.log(dndClasses);
    if (dndClasses.length > 0) {
        const responses = await Promise.all(dndClasses.map((dndClass) => fetch(`https://www.dnd5eapi.co${dndClass.url}`)));
        const data = await Promise.all(responses.map((res) => res.json()));
        console.log(data);
        return data;
    }
    else {
        return null;
    }
};
