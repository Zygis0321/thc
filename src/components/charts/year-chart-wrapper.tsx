import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { exceptionInterval } from "../../data/scorecalc-data";
import { currentDate } from "../../services/date-service";
import tournamentsService, { PlayerPoints } from "../../services/tournament-service";
import { PlayersChart } from "./players-chart";



interface OwnProps{
    playerPointsArray: PlayerPoints[]
}

type Props = OwnProps

interface State{
    yearRange?: number[]
}


export class PlayersYearChart extends Component<Props, State>{
    
    public readonly state:State = {
    }

    private currentYear = Math.max(currentDate.getFullYear(), 2020)
    componentDidMount(){
        this.componentDidUpdate({playerPointsArray:[]})
    }

    componentDidUpdate(prevProps: Props){

        if(this.props.playerPointsArray.length &&
            (!prevProps.playerPointsArray.length || prevProps.playerPointsArray[0].pointsNormal !== this.props.playerPointsArray[0].pointsNormal)){
            this.setState((prevState) => ({
                yearRange: [
                    Math.min(  Math.min(this.getYearRange().end, this.currentYear + 1), Math.max(this.getYearRange().start, prevState.yearRange === undefined ? 0 : prevState.yearRange[0])),
                    Math.max(this.getYearRange().start, Math.min( Math.min(this.getYearRange().end, this.currentYear + 1), prevState.yearRange === undefined ? 1000000 : prevState.yearRange[1]))
                ]
            }));
        }
    }

    getYearRange():  {start:number, end:number}{
        if(this.props.playerPointsArray.length===0 || this.props.playerPointsArray[0].pointsNormal.length === 0){
            return {start: 2000, end: this.currentYear + 7}
        }
        return {
            start: this.props.playerPointsArray[0].pointsNormal[0].date.getUTCFullYear(),
            end: this.props.playerPointsArray[0].pointsNormal[this.props.playerPointsArray[0].pointsNormal.length-1].date.getUTCFullYear() + 1,
        }
    }
    
    

    render(): React.ReactNode{

        return(
            <MediaQuery maxWidth='599px'>{
                (isMobile) =>
                <PlayersChart
                    includeNow
                    sliderMin = {this.getYearRange().start}
                    sliderMax = {this.getYearRange().end}
                    sliderRange = {this.state.yearRange === undefined ? [2000, this.currentYear] : this.state.yearRange}
                    onSliderChange = {this.handleYearChange}
                    references = {exceptionInterval.map(interval => tournamentsService.convertDateToYearString(interval))}
                    series = {this.props.playerPointsArray.map(playerPoints => ({
                        playerName:playerPoints.playerName, 
                        data: this.props.playerPointsArray[0].pointsNormal.length && this.state.yearRange ?
                        tournamentsService.getYearChartDataArray(
                            this.state.yearRange,
                            isMobile ? 20 : 40,
                            playerPoints,
                            this.props.playerPointsArray[0].pointsNormal[0].date,
                            this.props.playerPointsArray[0].pointsNormal[this.props.playerPointsArray[0].pointsNormal.length - 1].date
                        )
                        :
                        []
                    })) }
                />
            }
            </MediaQuery>
        )
    }
    
    private readonly handleYearChange = (newValue: number | number[]) => {
        this.setState({yearRange: newValue as number[]});
    };


}