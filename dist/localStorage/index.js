export const getLocalStorage = () => {
    const fromLocalStorage = localStorage.getItem("currentParty");
    if (fromLocalStorage) {
        const currentParty = JSON.parse(fromLocalStorage);
        return currentParty;
    }
    else {
        return null;
    }
};
export const updateLocalStorage = (newCharacter) => {
    const fromLocalStorage = localStorage.getItem("currentParty");
    if (fromLocalStorage) {
        const currentParty = JSON.parse(fromLocalStorage);
        if (currentParty.length < 6) {
            const updatedParty = [...currentParty, newCharacter];
            localStorage.setItem("currentParty", JSON.stringify(updatedParty));
            return updatedParty;
        }
        else {
            return null;
        }
    }
    else {
        localStorage.setItem("currentParty", JSON.stringify([newCharacter]));
        return [newCharacter];
    }
};
