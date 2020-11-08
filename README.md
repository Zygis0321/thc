# Table Hockey Ranker
<b>TH Ranker</b> is available at [thranker.com](https://thranker.com)
## About
<b>TH Ranker</b> expands table hockey world ranking features that are available at [ithf.info](https://ithf.info)

Implemented features:
* Predict world ranking changes by selected tournament standings
* Visualize player's score changes throughout his career
* Compare player's score changes to other players
## Development
<b>TH Ranker</b> is developed using `React` and `TypeScript` (frontend). It also uses `Node.js` for the backend to avoid CORS issues and reduce internet data usage while fetching players information from [ITHF](https://stiga.trefik.cz/ithf/ranking) website.

Ranking changes are predicted according to current rankings that are retrieved from [txt file](https://stiga.trefik.cz/ithf/ranking/ranking.txt) available at [ITHF](https://stiga.trefik.cz/ithf/ranking) website. To predict player's rank changes it is also necessary to have its current minimal points. This value is calculated from ITHF site's html in the backend.

Score changes that happened in the past are calculated from all player's [tournaments](https://stiga.trefik.cz/ithf/ranking/player.aspx?id=240037) that he has participated in. Tournament points are parsed from site's html in the backend.

All rank calculations are performed according to ITHF world ranking [rules](https://stiga.trefik.cz/ithf/ranking/docs/WR_2020_Rules_and_Algorithm.pdf)
