import { Slider, Typography } from "@material-ui/core";
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { CartesianGrid, Legend, LegendPayload, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { exceptionInterval } from "../data/scorecalc-data";
import tournamentsService, { PointsByDate } from "../services/tournament-service";

interface OwnProps{
    playerPointsNormal1: PointsByDate[]
    playerPointsException1: PointsByDate[]
    playerPointsNormal2: PointsByDate[]
    playerPointsException2: PointsByDate[]
    playerName1?: string
    playerName2?: string
}

type Props = OwnProps

interface State{
    yearRange: number[]
}


export class PlayersChart extends Component<Props, State>{

    public readonly state:State = {
        yearRange: [2000, 2027],
    }

    public readonly player2Color: string = "#8884d8"
    public readonly player1Color: string = "#0004d8"

    componentDidUpdate(prevProps: Props){
        if(prevProps.playerPointsNormal1 !== this.props.playerPointsNormal1){
            this.setState((prevState) => ({
                yearRange: [
                    Math.min(this.getYearRange()[1], Math.max(this.getYearRange()[0], prevState.yearRange[0])),
                    Math.max(this.getYearRange()[0], Math.min(this.getYearRange()[1], prevState.yearRange[1]))
                ]
            }));
        }
    }

    getYearRange(): number[]{
        if(this.props.playerPointsNormal1.length === 0){
            return [2000, 2027]
        }
        return [
            this.props.playerPointsNormal1[0].date.getUTCFullYear(),
            this.props.playerPointsNormal1[this.props.playerPointsNormal1.length-1].date.getUTCFullYear() + 1,
        ]
    }
    
    
    getPayload(): LegendPayload[]{
        let ret:LegendPayload[] = []
        if(this.props.playerName1 !== undefined){
            ret.push({
                value: this.props.playerName1,
                type: "line",
                id:"points01",
                color: this.player1Color
            })
        }
        if(this.props.playerName2 !== undefined){
            ret.push({
                value: this.props.playerName2,
                type: "line",
                id:"points02",
                color: this.player2Color
            })
        }
        return ret
    }

    render(): React.ReactNode{

        return(
            <>
                <div style={{paddingLeft:'10px', paddingRight:'10px'}}>
                <Typography>
                    Year Range
                </Typography>
                <Slider
                    color = "secondary"
                    value = {this.state.yearRange}
                    onChange={this.handleYearChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    marks
                    step = {1}
                    min = {this.getYearRange()[0]}
                    max = {this.getYearRange()[1]}
                />
                </div>
                <MediaQuery maxWidth='599px'>{
                    (isMobile) =>
                <div style={{ width: '100%', height: isMobile ? 350:500, overflow:'hidden' }}>
                    <ResponsiveContainer>
                        {this.props.playerPointsNormal1.length ?

                        <LineChart
                            data={ this.props.playerPointsNormal2.length === 0 ? 
                                tournamentsService.getChartDataArray(
                                    this.state.yearRange, 
                                    isMobile ? 20 : 40, 
                                    this.props.playerPointsNormal1, 
                                    this.props.playerPointsException1,
                                    this.props.playerPointsNormal1) :
                                tournamentsService.getChartDataArrayCompare(
                                    this.state.yearRange, 
                                    isMobile ? 20 : 40,
                                    this.props.playerPointsNormal1, 
                                    this.props.playerPointsException1, 
                                    this.props.playerPointsNormal2, 
                                    this.props.playerPointsException2)
                            }
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis width={40}/>
                            <XAxis dataKey="date"  />
                            <Tooltip />
                            <Legend  payload = {this.getPayload()} />
                            <Line name={this.props.playerName1} type="monotone" dataKey="points01" stroke={this.player1Color} dot={false} strokeWidth = {2}/>
                            <Line name={`${this.props.playerName1} (New Rules)`} type="monotone" dataKey="points02" stroke={this.player1Color} dot={false} strokeWidth = {2}/>
                            <Line name={this.props.playerName1} type="monotone" dataKey="points03" stroke={this.player1Color} dot={false} strokeWidth = {2}/>
                            {this.props.playerPointsNormal2.length > 0 && 
                                <Line name={this.props.playerName2} type="monotone" dataKey="points11" stroke={this.player2Color} dot={false} strokeWidth={2} />}
                            {this.props.playerPointsNormal2.length > 0 && 
                                <Line name={`${this.props.playerName2} (New Rules)`} type="monotone" dataKey="points12" stroke={this.player2Color} dot={false} strokeWidth={2} />}
                            {this.props.playerPointsNormal2.length > 0 && 
                                <Line name={this.props.playerName2} type="monotone" dataKey="points13" stroke={this.player2Color} dot={false} strokeWidth={2} />}
                            <ReferenceLine x={tournamentsService.convertDateToString(exceptionInterval[0])} stroke="#f50057"/>
                            <ReferenceLine x={tournamentsService.convertDateToString(exceptionInterval[1])} stroke="#f50057"/>
                        </LineChart>
                        :
                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis width={40}/>
                            <XAxis/>
                        </LineChart>
                        }
                    </ResponsiveContainer>
                </div>}
                </MediaQuery>
            </>
        )
    }
    
    private readonly handleYearChange = (event: any, newValue: number | number[]) => {
        this.setState({yearRange: newValue as number[]});
    };


}