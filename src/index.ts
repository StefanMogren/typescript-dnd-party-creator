import type { DndClassShort } from "./interfaces/index.js";
import { fetchDndClasses } from "./api/index.js";
import {
	createPartyPage,
	createClassContainer,
	createPartyContainer,
} from "./pages/partyManager/index.js";
import { getLocalStorage, updateLocalStorage } from "./localStorage/index.js";
import type { CurrentParty } from "./interfaces/index.js";
console.log("I am logged!!");

const partyPageBtnRef = document.querySelector(
	"#partyPageId"
) as HTMLButtonElement;

const mainRef = document.querySelector("#mainId") as HTMLElement;

partyPageBtnRef.addEventListener("click", async (): Promise<void> => {
	console.log("I clicked the button!");
	mainRef.innerHTML = createPartyPage();

	const partyLocalStorage: CurrentParty[] | null = getLocalStorage();
	if (partyLocalStorage) {
		const currentPartyRef = document.querySelector(
			"#currentPartyId"
		) as HTMLElement;
		partyLocalStorage.forEach((member: CurrentParty) => {
			const { className, characterName } = member;
			console.log(member);

			currentPartyRef.innerHTML += createPartyContainer(
				className,
				characterName
			);
		});
	}

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

	const classFormRef = document.querySelector(
		"#classFormId"
	) as HTMLFormElement;

	// ----- Submit for when you add a new member to the party -----
	const onSubmitHandler = (event: SubmitEvent): void => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const formData: FormData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries()) as CurrentParty;
		console.log(formJson);

		const updatedParty: CurrentParty[] | null = updateLocalStorage(formJson);
		if (updatedParty) {
			console.log(updatedParty);

			const currentPartyRef = document.querySelector(
				"#currentPartyId"
			) as HTMLElement;

			currentPartyRef.innerHTML = "";

			// ----- Add the party members to the list  -----
			updatedParty.forEach((member) => {
				const { className, characterName } = member;
				currentPartyRef.innerHTML += createPartyContainer(
					className,
					characterName
				);
			});
		}
		form.reset();
		// console.log(form.isConnected);
	};
	classFormRef.addEventListener("submit", onSubmitHandler);
});
