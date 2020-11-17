import { PlayerSeries } from "../components/charts/players-chart";
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
    points: number,
}

export interface PlayerPoints {
    pointsNormal: PointsByDate[]
    pointsException: PointsByDate[]
    playerName: string
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

    convertDateToYearString = (date: Date): string  => {
        return date.toUTCString().slice(5, 16);
    }
    convertDateToCareerString = (date: Date, interval: number): string  => {
        let year = date.getUTCFullYear()-1970
        let month = date.getUTCMonth()
        let day = date.getUTCDate()
        return `${year} yr${year===1?'':'s'}. ${month} mo${month===1?'':'s'}.${interval < 4 ? ` ${day} d.`:''}`
    }

    getYearChartData = (date: number, score: number): ChartData => {
        return{
            date: this.convertDateToYearString(new Date(date)),
            points: score
        }

    }
    getCareerChartData = (date: number, score: number, interval:number): ChartData => {
        return{
            date: this.convertDateToCareerString(new Date(date), interval),
            points: score
        }

    }

    scalePointsByDate = (points: PointsByDate[], step: number, startRange: Date, endRange: Date, includeEnd?: boolean): {date:number, score:number}[] => {
        let startTime = startRange.getTime();
        let endTime = endRange.getTime();

        let ind = 0
        let score = 0
        let ret:{date:number, score:number}[] = []
        for(let i=startTime; i<endTime; i+=step){
            while(ind < points.length && points[ind].date.getTime() <= i){
                score = points[ind].points
                ind++
            }
            ret.push({date:i, score})
        }
        if(includeEnd===true){
            while(ind < points.length && points[ind].date.getTime() <= endTime){
                score = points[ind].points
                ind++
            }
            ret.push({date:endTime, score})
        }

        return ret
    }

    scalePointsByDateYear = (
        points: PointsByDate[], 
        step: number, 
        startRange: Date, 
        endRange: Date
    ): ChartData[] => {
        let ret = this.scalePointsByDate(points, step, startRange, endRange, true);
        return ret.map(value => this.getYearChartData(value.date, value.score))
    }

    scalePointsByDateCareer = (
        points: PointsByDate[], 
        step: number, 
        startRange: Date, 
        endRange: Date, 
        offset:number, 
        interval: number
    ): ChartData[] => {
        let ret = this.scalePointsByDate(points, step, startRange, endRange);
        return ret.map(value => this.getCareerChartData(value.date-offset, value.score, interval))
    }



    getMaxDate = (a: Date, b:Date): Date=>{
        if(a>b)return a
        return b
    }
    getMinDate = (a: Date, b:Date): Date => {
        if(a<b)return a
        return b
    }

    getCareerChartDataArray = (
        careerRange: number[],
        density: number,
        
        playerPoints:PlayerPoints[]
    ): PlayerSeries[] => {

        let startDate:Date = new Date(Date.UTC(careerRange[0], 0))
        let endDate:Date = new Date(Date.UTC(careerRange[1], 0))
        let dateOffset = startDate.getTime() - new Date(Date.UTC(0,0)).getTime()

        let ret:PlayerSeries[] = []
        let dateInterval = endDate.getTime() - startDate.getTime()
        let step: number = dateInterval / density

        let currentDate = new Date()

        for(let player of playerPoints){
             
            ret.push({
                playerName: player.playerName,
                data: [this.scalePointsByDateCareer(
                    player.pointsNormal,
                    step,
                    new Date(player.pointsNormal[0].date.getTime()+dateOffset),
                    new Date(Math.min(currentDate.getTime(), player.pointsNormal[0].date.getTime()+dateInterval+dateOffset)),
                    player.pointsNormal[0].date.getTime(),
                    careerRange[1]-careerRange[0]
                )]
            })
        }
        return ret
    }

    getYearChartDataArray = (
        yearRange: number[], 
        density: number, 

        playerPoints:PlayerPoints,
        mainPlayerStartDate: Date,
        mainPlayerEndDate: Date
    ): ChartData[][] => {

        //Year might start earlier than first tournament
        let startDate: Date = this.getMaxDate(
            new Date(Date.UTC(yearRange[0], 0)), 
            mainPlayerStartDate
        )
        let endDate: Date = this.getMinDate(
            new Date(Date.UTC(yearRange[1], 0)), 
            mainPlayerEndDate
        )
        let step: number = (endDate.getTime() - startDate.getTime()) / density

        let res1: ChartData[] = startDate < exceptionInterval[0] ? 
        this.scalePointsByDateYear(
            playerPoints.pointsNormal,
            step, 
            startDate, 
            this.getMinDate( exceptionInterval[0], endDate)
        ) : []
        let res2: ChartData[] = endDate > exceptionInterval[0] && startDate < exceptionInterval[1]  ? 
        this.scalePointsByDateYear(
            playerPoints.pointsException,
            step, 
            this.getMaxDate(exceptionInterval[0], startDate), 
            this.getMinDate(exceptionInterval[1], endDate)
        ) : []
        let res3: ChartData[] = endDate > exceptionInterval[1] ? 
        this.scalePointsByDateYear(
            playerPoints.pointsNormal,
            step, 
            this.getMaxDate(startDate, exceptionInterval[1]),
            endDate
        ) : []
        return [res1, res2, res3];
    }
}

const tournamentsService = new TournamentsService();
export default tournamentsService