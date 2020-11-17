import { Slider, Typography } from "@material-ui/core";
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { CartesianGrid, Legend, LegendPayload, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getColorByName } from "../../services/color-service";
import { ChartData } from "../../services/tournament-service";


export interface PlayerSeries{
    playerName: string
    data: ChartData[][]
}

interface OwnProps{

    sliderMin:number
    sliderMax:number
    sliderRange: number[]
    onSliderChange:(newValue: number | number[]) => void
    
    references:string[]
    series: PlayerSeries[]


}

type Props = OwnProps


export class PlayersChart extends Component<Props, {}>{
    
    //public readonly player2Color: string = "#8884d8"
    public readonly mainPlayerColor: string = "#0004d8"

    
    
    getPayload(): LegendPayload[]{
        return this.props.series.map((playerSeries, index) =>
            ( {
                value: playerSeries.playerName,
                type: "line",
                id:"index",
                color: index===0 ? this.mainPlayerColor : getColorByName(playerSeries.playerName) 
            })
        )
    }

    check():boolean{
        if(this.props.series.length && this.props.series[0].data.length){
            console.log("true");
            return true
        }
        console.log("false")
        return false

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
                    value = {this.props.sliderRange}
                    onChange={(event:any, newValue: number | number[]) => this.props.onSliderChange(newValue)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    marks
                    step = {1}
                    min = {this.props.sliderMin}
                    max = {this.props.sliderMax}
                />
                </div>
                <MediaQuery maxWidth='599px'>{
                    (isMobile) =>
                <div style={{ width: '100%', height:isMobile ? 400:500, overflow:'hidden' }}>
                    <ResponsiveContainer>
                        {this.props.series.length && this.props.series[0].data.length ?

                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis width={40}/>
                            <XAxis dataKey="date"   allowDuplicatedCategory={false}/>
                            <Tooltip itemSorter={(item) => -item.payload.points} wrapperStyle={{maxWidth:'calc(100% - 50px)'}} contentStyle={{whiteSpace:'normal'}}/>
                            <Legend  payload = {this.getPayload()} />

                            {this.props.series.map((playerSeries, index) => playerSeries.data.map((chartData, index2) => 
                                <Line 
                                    isAnimationActive = {false}
                                    name={index2 === 1 ? playerSeries.playerName+ " (New Rules)" :
                                            playerSeries.playerName
                                        } 
                                    type="monotone" 
                                    dataKey="points" 
                                    data={chartData} 
                                    stroke={index===0 ? this.mainPlayerColor : getColorByName(playerSeries.playerName)} 
                                    dot={false} 
                                    strokeWidth = {index===0? 2.5 : 1.7}
                                    
                                />
                            )).reverse()}

                            {this.props.references.map(ref => <ReferenceLine x={ref} stroke="#f50057"/>)}
                        </LineChart>
                        :
                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis width={40}/>
                            <XAxis/>
                            <Legend/>
                        </LineChart>
                        }
                    </ResponsiveContainer>
                </div>}
                </MediaQuery>
            </>
        )
    }
    


}