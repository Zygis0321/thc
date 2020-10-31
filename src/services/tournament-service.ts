import {  exceptionInterval, PointsPercentage } from "../data/scorecalc-data";
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

export interface ChartData {
    date: string,
    points01?: number,
    points02?: number,
    points03?: number,
    points11?: number,
    points12?: number,
    points13?: number,
}

class TournamentsService {

    private readonly addYears = (dt: Date, n: number): Date => {
        let dtt = new Date(dt)
        return new Date(dtt.setFullYear(dtt.getFullYear() + n))
    }

    getPointsByDate = (tournaments: Tournament[], percentageList: PointsPercentage[]): PointsByDate[] => {
        
        let datesToCheck: PointsByDatePrecalc[] = []
        for(let i=0; i<tournaments.length; i++) {
            for(let percentage of percentageList){
                let newDate: Date = this.addYears(tournaments[i].date, percentage.tournamentAge)

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


        return ret
    }

    convertDateToString = (date: Date): string  => {
        return date.toUTCString().slice(5, 16);
    }

    getChartData = (date: number, score: number, type: number): ChartData => {
        if(type==0){
            return{
                date: this.convertDateToString(new Date(date)),
                points01: score
            }
        }
        else if(type==1){
            return{
                date: this.convertDateToString(new Date(date)),
                points02: score
            }
        }
        else {
            return{
                date: this.convertDateToString(new Date(date)),
                points03: score
            }
        }

    }

    scalePointsByDate = (points: PointsByDate[], step: number, startRange: Date, endRange: Date, type: number): ChartData[] => {
        let startTime = startRange.getTime();
        let endTime = endRange.getTime();

        let ind = 0
        let score = 0
        let ret:ChartData[] = []
        for(let i=startTime; i<endTime; i+=step){
            while(ind < points.length && points[ind].date.getTime() <= i){
                score = points[ind].points
                ind++
            }
            ret.push(this.getChartData(i, score, type))
        }
        while(ind < points.length && points[ind].date.getTime() <= endTime){
            score = points[ind].points
            ind++
        }
        ret.push(this.getChartData(endTime, score, type))
        return ret
    }


    getMaxDate = (a: Date, b:Date): Date=>{
        if(a>b)return a
        return b
    }
    getMinDate = (a: Date, b:Date): Date => {
        if(a<b)return a
        return b
    }

    getChartDataArray = (
        yearRange: number[], 
        density: number, 
        playerPoints:PointsByDate[], 
        playerPointsException: PointsByDate[],
        playerPoints1:PointsByDate[]
    ): ChartData[] => {


        let startDate: Date = this.getMaxDate(
            new Date(Date.UTC(yearRange[0], 0)), 
            playerPoints1[0].date
        )
        let endDate: Date = this.getMinDate(
            new Date(Date.UTC(yearRange[1], 0)), 
            playerPoints1[playerPoints1.length - 1].date
        )
        let step: number = (endDate.getTime() - startDate.getTime()) / density

        let res1: ChartData[] = startDate < exceptionInterval[0] ? 
        this.scalePointsByDate(
            playerPoints,
            step, 
            startDate, 
            this.getMinDate( exceptionInterval[0], endDate),
            0
        ) : []
        let res2: ChartData[] = endDate > exceptionInterval[0] && startDate < exceptionInterval[1]  ? 
        this.scalePointsByDate(
            playerPointsException,
            step, 
            this.getMaxDate(exceptionInterval[0], startDate), 
            this.getMinDate(exceptionInterval[1], endDate),
            1
        ) : []
        let res3: ChartData[] = endDate > exceptionInterval[1] ? 
        this.scalePointsByDate(
            playerPoints,
            step, 
            this.getMaxDate(startDate, exceptionInterval[1]),
            endDate,
            2
        ) : []

        if(res1.length && res2.length && res1[res1.length - 1].date === res2[0].date){
            let newEl: ChartData = {
                date: res2[0].date,
                points01: res1[res1.length - 1].points01,
                points02: res2[0].points02
            }
            
            res1.pop()
            res2[0] = newEl
        }
        if(res2.length && res3.length && res2[res2.length - 1].date === res3[0].date){
            let newEl: ChartData = {
                date: res3[0].date,
                points02: res2[res2.length - 1].points02,
                points03: res3[0].points03
            }
            
            res2.pop()
            res3[0] = newEl
        }
        return res1.concat(res2.concat(res3));
    }
    getChartDataArrayCompare = (
        yearRange: number[], 
        density: number, 
        playerPoints1:PointsByDate[], 
        playerPointsException1: PointsByDate[],
        playerPoints2:PointsByDate[], 
        playerPointsException2: PointsByDate[]
    ): ChartData[] => {
        let res1: ChartData[] = this.getChartDataArray(
            yearRange,
            density, 
            playerPoints1, 
            playerPointsException1,
            playerPoints1
        )
        let res2: ChartData[] = this.getChartDataArray(
            yearRange,
            density, 
            playerPoints2, 
            playerPointsException2,
            playerPoints1
        )
        let ind = 0
        for(let i=0; i<res1.length; i++){
            if(ind < res2.length && res1[i].date === res2[ind].date){
                res1[i].points11 = res2[ind].points01 
                res1[i].points12 = res2[ind].points02 
                res1[i].points13 = res2[ind].points03
                
                ind++            
            }

        }
        return res1

    }
}

const tournamentsService = new TournamentsService();
export default tournamentsService