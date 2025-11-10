import { fetchFullDndClassInfo } from "./api/index.js";
import { createPartyPage, createClassContainer, } from "./pages/partyManager/index.js";
console.log("I am logged!!");
const partyPageBtnRef = document.querySelector("#partyPageId");
const mainRef = document.querySelector("#mainId");
partyPageBtnRef.addEventListener("click", async () => {
    console.log("I clicked the button!");
    mainRef.innerHTML = createPartyPage();
    const dndClassesData = await fetchFullDndClassInfo();
    console.log(dndClassesData);
    if (dndClassesData) {
        const classesContainerRef = document.querySelector("#allClassesId");
        dndClassesData.forEach((classData) => {
            classesContainerRef.innerHTML += createClassContainer(classData.name);
        });
    }
    // ----- Submit -----
    const classFormRef = document.querySelector("#classFormId");
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    };
    classFormRef.addEventListener("submit", onSubmitHandler);
});
