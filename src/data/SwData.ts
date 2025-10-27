// src/data/SwData.ts

// 1. Core Characteristic (Stat) Definitions
export type Characteristic = 'STR' | 'DEX' | 'AGI' | 'INT' | 'MEN' | 'VIT';

// 2. Interface for the Race Data Structure
export interface SwRace {
    id: string;
    name: string;
    statAdjustments: Record<Characteristic, number>; // e.g., { STR: -1, DEX: 1 }
    racialAbility: string;
    description: string;
}

// 3. Interface for the Character State
// This is the object that will be managed by React's state hooks
export interface SwCharacter {
    name: string;
    race: SwRace | null;
    level: number;
    stats: Record<Characteristic, number>; // The assigned base roll (e.g., { STR: 10, ...})
    classes: { name: string, level: number }[];
    currentLP: number;
    maxLP: number;
    currentMP: number;
    maxMP: number;
}

// 4. Initial Game Data (SW 2.5 Races)
export const RACES: SwRace[] = [
    {
        id: 'human',
        name: 'Human',
        statAdjustments: { STR: 0, DEX: 0, AGI: 0, INT: 0, MEN: 0, VIT: 0 },
        racialAbility: 'Adaptability (1 extra skill point at creation)',
        description: 'The standard people of Aletia.',
    },
    {
        id: 'elf',
        name: 'Elf',
        statAdjustments: { STR: -1, DEX: 1, AGI: 1, INT: 0, MEN: 0, VIT: -1 },
        racialAbility: 'Infravision (Can see in the dark)',
        description: 'Fey-blooded beings with an affinity for magic.',
    },
    {
        id: 'dwarf',
        name: 'Dwarf',
        statAdjustments: { STR: 1, DEX: 0, AGI: -1, INT: 0, MEN: 1, VIT: 0 },
        racialAbility: 'Sturdy (Increased LP)',
        description: 'Stout, strong people who live underground.',
    }
];