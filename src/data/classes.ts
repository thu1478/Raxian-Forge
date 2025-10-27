// Define the structure of a Class (interface)
export interface SwClass {
    id: string;
    name: string;
    type: 'base' | 'master'; // Base classes vs. Master classes
    requiredStat: 'STR' | 'DEX' | 'AGI' | 'INT' | 'MEN' | 'VIT'; // Stat used for level-up rolls
    description: string;
}

// Define the actual data
export const ALL_SW_CLASSES: SwClass[] = [
    {
        id: 'fighter',
        name: 'Fighter',
        type: 'base',
        requiredStat: 'STR',
        description: 'The front-line combatant.',
    },
    {
        id: 'magician',
        name: 'Magician',
        type: 'base',
        requiredStat: 'INT',
        description: 'The wielder of elemental power.',
    }
];