export interface Level {
    name: string,
    coefficient: number,
    winnerpoints: number
}

export const levelList: Level[] = [
    {name: "Level 1 (World)", coefficient: 0.96, winnerpoints: 1000},
    {name: "Level 1 (Continental)", coefficient: 0.96, winnerpoints: 600},
    {name: "Level 2", coefficient: 0.92, winnerpoints: 500},
    {name: "Level 3", coefficient: 0.89, winnerpoints: 100},
    {name: "Level 4", coefficient: 0.83, winnerpoints: 70},
    {name: "Level 5", coefficient: 0.60, winnerpoints: 40},
    {name: "Level 6", coefficient: 0.40, winnerpoints: 20},
]