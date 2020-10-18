import { percentageList, ruleChangeDates } from "../data/scorecalc-data";
import { Player } from "./player-service";

export interface Tournament{
    date: Date,
    name: string,
    series: string[],
    city: string,
    pos: number,
    points: number
}

export interface PlayerWithTournaments extends Player{
    tournaments: PointsByDate[]
}

export interface PointsByDate {
    date: Date,
    points: number
}

interface PointsByDatePrecalc extends PointsByDate {
    ind: number
}

interface ChartData {
    date: string,
    points: number
}

class TournamentsService {

    private readonly addYears = (dt: Date, n: number): Date => {
        let dtt = new Date(dt)
        return new Date(dtt.setFullYear(dtt.getFullYear() + n))
    }

    getPointsByDate = (tournaments: Tournament[]): PointsByDate[] => {
        var start = Date.now()
        
        let datesToCheck: PointsByDatePrecalc[] = []
        for(let i=0; i<tournaments.length; i++) {
            for(let percentage of percentageList){
                let newDate: Date = this.addYears(tournaments[i].date, percentage.tournamentAge)
                if(newDate < percentage.appliedFrom || newDate > percentage.appliedUntil){
                    continue
                }

                datesToCheck.push({
                    date: newDate,
                    points: Math.round(tournaments[i].points * percentage.percentage),
                    ind: i
                })

            }
        }

        datesToCheck = datesToCheck.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        
        let best5: PointsByDatePrecalc[] = []
        let ret:PointsByDate[] = []

        for(let date of datesToCheck){
            best5 = best5.filter((best) => best.ind !== date.ind)
            best5.push(date)
            best5 = best5.sort((a, b) => b.points - a.points)
            let sum = 0

            for(let i=0; i< Math.min(best5.length, 5); i++){
                sum += best5[i].points;
            }
            ret.push({
                date: date.date,
                points: sum
            })
        }
        var end = Date.now()
        console.log("elapsed "+(end-start))


        return ret
    }
    scalePointsByDate = (points: PointsByDate[], density: number, startRange: Date, endRange: Date): ChartData[] => {
        let startTime = startRange.getTime();
        let endTime = endRange.getTime();
        let step = (endTime - startTime) / density
        let ind = 0
        let score = 0
        let ret:ChartData[] = []
        for(let i=startTime; i<endTime; i+=step){
            while(ind < points.length && points[ind].date.getTime() <= i){
                score = points[ind].points
                ind++
            }
            ret.push({
                date: new Date(i).toUTCString().slice(5, 16),
                points: score
            })
        }
        console.log(ret)
        return ret
    }
}

const tournamentsService = new TournamentsService();
export default tournamentsService