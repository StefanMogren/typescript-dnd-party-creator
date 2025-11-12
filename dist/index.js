import { fetchDndClasses } from "./api/index.js";
import { createPartyPage, createClassContainer, createPartyContainer, } from "./pages/partyManager/index.js";
import { getLocalStorage, updateLocalStorage } from "./localStorage/index.js";
console.log("I am logged!!");
const partyPageBtnRef = document.querySelector("#partyPageId");
const mainRef = document.querySelector("#mainId");
partyPageBtnRef.addEventListener("click", async () => {
    console.log("I clicked the button!");
    mainRef.innerHTML = createPartyPage();
    const partyLocalStorage = getLocalStorage();
    if (partyLocalStorage) {
        const currentPartyRef = document.querySelector("#currentPartyId");
        partyLocalStorage.forEach((member) => {
            const { className, characterName } = member;
            console.log(member);
            currentPartyRef.innerHTML += createPartyContainer(className, characterName);
        });
    }
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
    const classFormRef = document.querySelector("#classFormId");
    // ----- Submit for when you add a new member to the party -----
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const updatedParty = updateLocalStorage(formJson);
        if (updatedParty) {
            console.log(updatedParty);
            const currentPartyRef = document.querySelector("#currentPartyId");
            currentPartyRef.innerHTML = "";
            // ----- Add the party members to the list  -----
            updatedParty.forEach((member) => {
                const { className, characterName } = member;
                currentPartyRef.innerHTML += createPartyContainer(className, characterName);
            });
        }
        form.reset();
        // console.log(form.isConnected);
    };
    classFormRef.addEventListener("submit", onSubmitHandler);
});
