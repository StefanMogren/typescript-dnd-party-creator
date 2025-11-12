import type { DndClassShort, DndClassLong } from "./interfaces/index.js";
import { fetchDndClasses, fetchFullDndClassInfo } from "./api/index.js";
import {
	createPartyPage,
	createClassContainer,
	createClassDataForm,
} from "./pages/partyManager/index.js";
console.log("I am logged!!");

const partyPageBtnRef = document.querySelector(
	"#partyPageId"
) as HTMLButtonElement;

const mainRef = document.querySelector("#mainId") as HTMLElement;

partyPageBtnRef.addEventListener("click", async (): Promise<void> => {
	console.log("I clicked the button!");
	mainRef.innerHTML = createPartyPage();

	// ----- Hämtar listan med kortfattad klassinformation -----
	const dndClassesData = await fetchDndClasses();
	console.log(dndClassesData);

	// ----- Skapar en ruta för varje klass -----
	if (dndClassesData) {
		const classesContainerRef = document.querySelector(
			"#allClassesId"
		) as HTMLElement;
		dndClassesData.forEach((classData: DndClassShort) => {
			classesContainerRef.innerHTML += createClassContainer(classData.name);
		});
	}

	// ----- Submit för vilken klass man valt -----
	const classFormRef = document.querySelector(
		"#classFormId"
	) as HTMLFormElement;

	const onSubmitHandler = (event: SubmitEvent): void => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const formData: FormData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries()) as FormFields;
		console.log(formJson);
		type FormFields = {
			classChoice: string;
		};
	};
	//sss
	classFormRef.addEventListener("submit", onSubmitHandler);
});

const showClassInfo = async (className: string): Promise<void> => {
	const fullClassData = await fetchFullDndClassInfo(className);
	if (fullClassData) {
		mainRef.innerHTML = createClassDataForm(fullClassData);
	}
};

showClassInfo("barbarian");
