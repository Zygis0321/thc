import React, { Component } from "react";
import MediaQuery from "react-responsive";
import tournamentsService, { PlayerPoints } from "../../services/tournament-service";
import { PlayersChart } from "./players-chart";



interface OwnProps{
    playerPointsArray: PlayerPoints[]
}

type Props = OwnProps

interface State{
    yearRange?: number[]
}


export class PlayersCareerChart extends Component<Props, State>{
    
    private currentDate = new Date()
    public readonly state:State = {
    }
    componentDidMount(){
        this.componentDidUpdate({playerPointsArray:[]})
    }

    componentDidUpdate(prevProps: Props){
        if(this.props.playerPointsArray.length &&
            (!prevProps.playerPointsArray.length || prevProps.playerPointsArray !== this.props.playerPointsArray)){
            this.setState((prevState) => ({
                yearRange: [
                    Math.min(  this.getYearRange().end, Math.max(this.getYearRange().start, prevState.yearRange ? prevState.yearRange[0] : 0)),
                    Math.max(this.getYearRange().start, Math.min( this.getYearRange().end, prevState.yearRange ? prevState.yearRange[1] : 100000))
                ]
            }));
        }
    }

    getYearRange():  {start:number, end:number}{
        if(this.props.playerPointsArray.length===0 || this.props.playerPointsArray[0].pointsNormal.length === 0){
            return {start: 0, end: 10}
        }
        let maxYear = 0;
        for(let playerPoints of this.props.playerPointsArray){
            maxYear = Math.max(maxYear, 
                new Date(tournamentsService.getMinDate(this.currentDate, 
                    playerPoints.pointsNormal[playerPoints.pointsNormal.length-1].date).getTime()
                    - playerPoints.pointsNormal[0].date.getTime()).getFullYear() - 1970 + 1
            )
        }
        return {
            start: 0,
            end: maxYear,
        }
    }
    
    

    render(): React.ReactNode{
        return(
            <MediaQuery maxWidth='599px'>{
                (isMobile) =>
                <PlayersChart
                    sliderMin = {this.getYearRange().start}
                    sliderMax = {this.getYearRange().end}
                    sliderRange = {this.state.yearRange ? this.state.yearRange : [this.getYearRange().start, this.getYearRange().end]}
                    onSliderChange = {this.handleYearChange}
                    references = {[]}
                    series = {this.props.playerPointsArray.length && this.props.playerPointsArray[0].pointsNormal.length && this.state.yearRange ?
                        tournamentsService.getCareerChartDataArray(
                            this.state.yearRange,
                            isMobile ? 20 : 40,
                            this.props.playerPointsArray,
                        )
                        :
                        [] }
                />
            }
            </MediaQuery>
        )
    }
    
    private readonly handleYearChange = (newValue: number | number[]) => {
        this.setState({yearRange: newValue as number[]});
    };


}