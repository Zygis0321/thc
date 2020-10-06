import { Level } from "../data/scorecalc-data";


export interface Player{
    name: string,
    id: string,
    rank: number,
    nation: string,
    points: number,
    value: number
}

export interface PlayerRanked extends Player{
    pos: number
    lowestScore: number
    score: number
    newRank: number
    newPoints: number
}

class PlayersService {

    private prefScores:number[] = new Array(6005).fill(0)

    rankPlayers = (players: PlayerRanked[]): PlayerRanked[] => {
        for(let i=0; i<players.length; i++){
            if(players[i].lowestScore === -1){
                continue
            }
            players[i].newPoints = players[i].points + Math.max(0, players[i].score - players[i].lowestScore)
        }
        for(let i=0; i<players.length; i++){
            if(players[i].lowestScore === -1){
                continue
            }

            let rank: number = this.prefScores[players[i].newPoints + 1] + 1
            for(let j=0; j<players.length; j++){
                if(players[j].lowestScore === -1)continue
                if(players[j].points>players[i].newPoints)rank--
                if(players[j].newPoints>players[i].newPoints)rank++
            }
            players[i].rank = this.prefScores[players[i].points + 1] + 1
            players[i].newRank = rank
        }

        return players
    }

    recalc = (players: PlayerRanked[], level: Level): PlayerRanked[] => {
        
        
        //set player pos
        for(var i=0; i<players.length; i++){
            players[i].pos=i+1
            players[i].score=0;
        }
        
        
        if(players.length<4){
            return players;
        }
        
        
        //which player beaten
        var value:number[] = players.map(p => p.value).sort((a,b) => b-a)
        for(let i=0; i+1<players.length; i++){
            let valueSum: number = 0;
            for(var j=i; j<Math.min(i+4, players.length); j++){
                valueSum+=value[j]
            }
            players[i].score = Math.max(players[i].score, (valueSum/4)*level.coefficient);
        }
        //number of beaten
        for(let i=0; i<players.length; i++){
            let maxScore: number = (((70-1)*(players.length - i - 1))/(players.length-1))+1
            players[i].score = Math.max(players[i].score, Math.min(maxScore,players.length-i))
        }

        //scalar
        let points:number = level.winnerpoints
        for(let i=0; i+1<players.length; i++){
            players[i].score = Math.max(players[i].score, points)
            points/=2
        }

        //linear
        for(let i=0; i<players.length; i++){
            let score: number = (((level.winnerpoints-1)*(players.length-i-1))/(players.length-1))+1
            players[i].score = Math.max(players[i].score, score)
        }

        //sum up
        for(let i=0; i<players.length; i++){
            players[i].score = Math.floor(players[i].score)
        }
        players[0].score+=10

        return players
    }

    parseContent(content: string): Player[]{
        const stringArray = content.split('\n').map((ln) => {
            return ln.split('\t');
        });
        let ret: Player[] = []
        for(var i=2; i+1<stringArray.length; i++){
            const player:Player = {
                rank: Number(stringArray[i][0]),
                id: stringArray[i][1],
                name: stringArray[i][2],
                nation: stringArray[i][4],
                points: Number(stringArray[i][5]),
                value: Number(stringArray[i][6]),
            }
            ret.push(player)
        }
        return ret
    }

    parsePlayerMinPoints(content: string): number{
        var el = document.createElement('html');
        el.innerHTML = content
        var list = el.getElementsByClassName("normTour");
        
        var ret:number = 100000;
        var cnt:number = 0;
        for(var i=6; i<list.length; i+=7){
            let ind:number = list[i].innerHTML.indexOf('(')
            if(ind===-1)ind=list[i].innerHTML.length
            let score:string = list[i].innerHTML.substr(0, ind);
            ret = Math.min(ret, Number(score));
            cnt++
        }
        if(cnt<5)ret=0
        return ret
    }

    setPlayerScores(players: Player[]): void{
        for(let i=0; i<players.length; i++){
            this.prefScores[players[i].points]++;
        }
        
        for(let i=6000; i>=0; i--){
            this.prefScores[i]+=this.prefScores[i+1]
        }

    }

}

const playersService = new PlayersService();
export default playersService