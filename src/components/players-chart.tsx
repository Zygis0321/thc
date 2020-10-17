import React, { Component } from "react";
import tournamentsService, { PlayerWithTournaments, PointsByDate } from "../services/tournament-service";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import playersService from "../services/player-service";
import { PlayersAutoComplete } from "./players-autocomplete";
import { Slider, Typography } from "@material-ui/core";

interface OwnProps{
    playerPoints: PointsByDate[]
}

type Props = OwnProps

interface State{
    yearRange: number[],
    density: number
}


export class PlayersChart extends Component<Props, State>{

    public readonly state:State = {
        yearRange: this.getYearRange(),
        density: 20
    }

    getYearRange(): number[]{
        return [
            this.props.playerPoints[0].date.getUTCFullYear(),
            this.props.playerPoints[this.props.playerPoints.length-1].date.getUTCFullYear(),
        ]
    }

    getMaxDate(a: Date, b:Date): Date{
        if(a>b)return a
        return b
    }

    componentDidUpdate(prevProps: Props): void{
        if(prevProps.playerPoints !== this.props.playerPoints){
            this.setState({yearRange: this.getYearRange()})
        }
    }

    render(): React.ReactNode{
        const {
            yearRange,
            density
        } = this.state

        return(
            <>
                <Typography>
                    Year Range
                </Typography>
                <Slider
                    value = {this.state.yearRange}
                    onChange={this.handleYearChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    marks
                    step = {1}
                    min = {this.getYearRange()[0]}
                    max = {this.getYearRange()[1]}
                />
                <Typography>
                    Chart Density
                </Typography>
                <Slider
                    value = {this.state.density}
                    onChange={this.handleDensityChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min = {5}
                    max = {50}
                />
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={tournamentsService.scalePointsByDate(
                                this.props.playerPoints,
                                density, 
                                this.getMaxDate(new Date(Date.UTC(yearRange[0], 0)), this.props.playerPoints[0].date), 
                                new Date(Date.UTC(yearRange[1], 0))
                            )}
                        >
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <XAxis dataKey="date" interval={0} angle={30} dx={20} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="points" stroke="#8884d8" dot={false} strokeWidth = {2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </>
        )
    }
    private readonly handleYearChange = (event: any, newValue: number | number[]) => {
        this.setState({yearRange: newValue as number[]});
    };
    private readonly handleDensityChange = (event: any, newValue: number | number[]) => {
        this.setState({density: newValue as number});
    };

}