import { fetchDndClasses, fetchFullDndClassInfo } from "./api/index.js";
import { createPartyPage, createClassContainer, createClassDataForm, } from "./pages/partyManager/index.js";
console.log("I am logged!!");
const partyPageBtnRef = document.querySelector("#partyPageId");
const mainRef = document.querySelector("#mainId");
partyPageBtnRef.addEventListener("click", async () => {
    console.log("I clicked the button!");
    mainRef.innerHTML = createPartyPage();
    // ----- Hämtar listan med kortfattad klassinformation -----
    const dndClassesData = await fetchDndClasses();
    console.log(dndClassesData);
    // ----- Skapar en ruta för varje klass -----
    if (dndClassesData) {
        const classesContainerRef = document.querySelector("#allClassesId");
        dndClassesData.forEach((classData) => {
            classesContainerRef.innerHTML += createClassContainer(classData.name);
        });
    }
    // ----- Submit för vilken klass man valt -----
    const classFormRef = document.querySelector("#classFormId");
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    };
    //sss
    classFormRef.addEventListener("submit", onSubmitHandler);
});
const showClassInfo = async (className) => {
    const fullClassData = await fetchFullDndClassInfo(className);
    if (fullClassData) {
        mainRef.innerHTML = createClassDataForm(fullClassData);
    }
};
showClassInfo("barbarian");
