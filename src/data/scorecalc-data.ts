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

export interface PointsPercentage {
    appliedFrom: Date,
    appliedUntil: Date,
    tournamentAge: number,
    percentage: number
}

export const percentageList: PointsPercentage[] = [
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(3333,0)),
        tournamentAge: 0,
        percentage: 1
    },
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(2020, 9, 4)),
        tournamentAge: 2,
        percentage: 0.8
    },
    {
        appliedFrom: new Date(Date.UTC(2020, 9, 5)),
        appliedUntil: new Date(Date.UTC(2021, 5, 30)),
        tournamentAge: 2,
        percentage: 1
    },
    {
        appliedFrom: new Date(Date.UTC(2021, 6, 1)),
        appliedUntil: new Date(Date.UTC(3333, 0)),
        tournamentAge: 2,
        percentage: 0.8
    },
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(3333,0)),
        tournamentAge: 3,
        percentage: 0.6
    },
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(3333,0)),
        tournamentAge: 4,
        percentage: 0.4
    },
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(3333,0)),
        tournamentAge: 5,
        percentage: 0.2
    },
    {
        appliedFrom: new Date(Date.UTC(1111, 0)),
        appliedUntil: new Date(Date.UTC(3333,0)),
        tournamentAge: 6,
        percentage: 0
    },
]
export const ruleChangeDates: Date[] = [
    new Date(Date.UTC(2020, 9, 5)),
    new Date(Date.UTC(2021, 6, 1))
]