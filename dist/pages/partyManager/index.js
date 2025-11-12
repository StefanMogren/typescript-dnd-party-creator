export const createPartyPage = () => {
    return `
    <section class="party-page">
      <h1 class="party-page__title">Create your party of adventurers</h1>

      <section class="party-page__flex-container">
        <form class="party-page__chooser" action="post" id="classFormId">
          <h2 class="party-page__sub-title">
            Choose the class for your new member
          </h2>
          <section class="party-page__all-classes" id="allClassesId">
          </section>

          <label class="party-page__flex-column" for="characterNameId">
            Name for the character:
            <input
              class="party-page__class-char-name"
              type="text"
              name="characterName"
              id="characterNameId" />
						</label>
          <button class="party-page__class-btn" type="submit">Add to party</button>
        </form>

        <!-- ----- Current Party ----- -->
        <article class="party-page__current-party">
          <h2>Current party</h2>
          <section class="party-page__party-container" id="currentPartyId">
          </section>
        </article>
      </section>
    </section>`;
};
export const createClassContainer = (className) => {
    return `
    <section class="party-page__class-container">
    <label class="party-page__class-label" for="${className}">
      <input
        class="party-page__class-radio"
        type="radio"
        name="className"
        value="${className}"
        id="${className}" />
      <img
        class="party-page__class-img"
        src="./assets/${className}.jpg"
        alt="${className} image" />
      ${className}
    </label>
    </section>`;
};
export const createPartyContainer = (className, characterName) => {
    return `
    <section class="party-page__party-class">
      <img
        class="party-page__class-img"
        src="./assets/${className}.jpg"
        alt="${className} image" />
      <p>${characterName}</p>
      <p>${className}</p>
    </section>`;
};
