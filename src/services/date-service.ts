export const currentDate = new Date()

export const toUTCDate = (year:number): Date => {
    return new Date(Date.UTC(year, 0))
}