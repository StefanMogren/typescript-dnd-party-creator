import type { DndClassLong } from "./interfaces/index.js";
import { fetchFullDndClassInfo } from "./api/index.js";
import {
	createPartyPage,
	createClassContainer,
} from "./pages/partyManager/index.js";
console.log("I am logged!!");

const partyPageBtnRef = document.querySelector(
	"#partyPageId"
) as HTMLButtonElement;

const mainRef = document.querySelector("#mainId") as HTMLElement;

partyPageBtnRef.addEventListener("click", async (): Promise<void> => {
	console.log("I clicked the button!");
	mainRef.innerHTML = createPartyPage();

	const dndClassesData = await fetchFullDndClassInfo();
	console.log(dndClassesData);

	if (dndClassesData) {
		const classesContainerRef = document.querySelector(
			"#allClassesId"
		) as HTMLElement;
		dndClassesData.forEach((classData: DndClassLong) => {
			classesContainerRef.innerHTML += createClassContainer(classData.name);
		});
	}

	// ----- Submit -----
	const classFormRef = document.querySelector(
		"#classFormId"
	) as HTMLFormElement;

	const onSubmitHandler = (event: SubmitEvent): void => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const formData: FormData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries()) as FormFields;
		console.log(formJson);
	};
	classFormRef.addEventListener("submit", onSubmitHandler);
});
