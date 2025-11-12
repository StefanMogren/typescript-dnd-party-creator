// The only two interfaces/types actually used are CurrentParty and DndClassShort.
// Was intending to use the rest as well but realized I wouldn't have enough time to fully implement all features.
export type CurrentParty = {
	className: string;
	characterName: string;
};

export interface DndClassShort {
	name: string;
	url: string;
}
interface NameUrl {
	name: string;
	url: string;
}
export interface DndClassLong {
	name: string;
	hit_die: number;
	proficiency_choices: ProficiencyChoices[];
	proficiencies: NameUrl[];
	saving_throws: NameUrl[];
	starting_equipment: Equipment[];
	starting_equipment_options: StartingEquipmentOptions[];
}

interface ProficiencyChoices {
	desc: string;
	choose: number;
	from: {
		options: ProficiencyChoiceItem[];
	};
}

interface ProficiencyChoiceItem {
	item: NameUrl;
}

interface Equipment {
	equipment: NameUrl;
	quantity: number;
}

interface StartingEquipmentOptions {
	desc: string;
	choose: number;
	from: {
		// Svaret ChatGPT slutligen gav angående ifall en array har mer än en möjlighet i innehållet
		options: (
			| StartingEquipmentItem // "counted_reference: counted_reference"
			| StartingEquipmentItemAny // "counted_reference: choice"
			| StartingEquipmentItemMultiple
		)[]; // "counted_reference: multiple"
	};
}

interface StartingEquipmentItem {
	option_type: string;
	count: number;
	of: NameUrl;
}
interface StartingEquipmentItemAny {
	option_type: string;
	choice: {
		desc: string;
		choose: number;
		from: {
			equipment_category: NameUrl;
		};
	};
}
interface StartingEquipmentItemMultiple {
	option_type: string;
	items: StartingEquipmentItem[];
}
