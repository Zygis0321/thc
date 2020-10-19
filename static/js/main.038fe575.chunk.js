(this.webpackJsonpthc=this.webpackJsonpthc||[]).push([[0],{305:function(e,t,a){e.exports=a(526)},310:function(e,t,a){},311:function(e,t,a){},526:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(16),o=a.n(l),i=(a(310),a(28)),c=a(29),s=a(38),m=a(37),p=a(259),u=a(19),h=(a(311),a(260)),d=a(52),f=new(function(){function e(){var t=this;Object(i.a)(this,e),this.prefScores=[],this.rankPlayers=function(e){for(var a=0;a<e.length;a++)-1!==e[a].lowestScore&&(e[a].newPoints=e[a].points+Math.max(0,e[a].score-e[a].lowestScore));for(var n=0;n<e.length;n++)if(-1!==e[n].lowestScore){for(var r=t.prefScores[e[n].newPoints+1]+1,l=0;l<e.length;l++)-1!==e[l].lowestScore&&(e[l].points>e[n].newPoints&&r--,e[l].newPoints>e[n].newPoints&&r++);e[n].rank=t.prefScores[e[n].points+1]+1,e[n].newRank=r}return e},this.recalc=function(e,t){for(var a=0;a<e.length;a++)e[a].pos=a+1,e[a].score=0;if(e.length<4)return e;for(var n=e.map((function(e){return e.value})).sort((function(e,t){return t-e})),r=0;r+1<e.length;r++){for(var l=0,o=r;o<Math.min(r+4,e.length);o++)l+=n[o];e[r].score=Math.max(e[r].score,l/4*t.coefficient)}for(var i=0;i<e.length;i++){var c=69*(e.length-i-1)/(e.length-1)+1;e[i].score=Math.max(e[i].score,Math.min(c,e.length-i))}for(var s=t.winnerpoints,m=0;m+1<e.length;m++)e[m].score=Math.max(e[m].score,s),s/=2;for(var p=0;p<e.length;p++){var u=(t.winnerpoints-1)*(e.length-p-1)/(e.length-1)+1;e[p].score=Math.max(e[p].score,u)}for(var h=0;h<e.length;h++)e[h].score=Math.floor(e[h].score);return e[0].score+=10,e}}return Object(c.a)(e,[{key:"parseContent",value:function(e){for(var t=e.split("\n").map((function(e){return e.split("\t")})),a=[],n=2;n+1<t.length;n++){var r={rank:Number(t[n][0]),id:t[n][1],name:t[n][2],club:t[n][3],nation:t[n][4],points:Number(t[n][5]),value:Number(t[n][6])};a.push(r)}return a}},{key:"parsePlayerMinPoints",value:function(e){var t=document.createElement("html");t.innerHTML=e;for(var a=t.getElementsByClassName("normTour"),n=1e5,r=0,l=6;l<a.length;l+=7){var o=a[l].innerHTML.indexOf("(");-1===o&&(o=a[l].innerHTML.length);var i=a[l].innerHTML.substr(0,o);n=Math.min(n,Number(i)),r++}return r<5&&(n=0),n}},{key:"setPlayerScores",value:function(e){this.prefScores=new Array(6005).fill(0);for(var t=0;t<e.length;t++)this.prefScores[e[t].points]++;for(var a=6e3;a>=0;a--)this.prefScores[a]+=this.prefScores[a+1]}}]),e}()),g=a(561),y=a(560),v=a(530),E=a(563),b=a(564),w=a(581),C=a(585),D=a(582),x=a(562),k=a(567),j=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={searchText:""},e.handleSearchChange=function(t){e.setState({searchText:t.target.value})},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,{label:"Players",variant:"outlined",onChange:this.handleSearchChange,fullWidth:!0,InputProps:{endAdornment:r.a.createElement(g.a,{position:"end"},r.a.createElement(x.a,{color:"action"}))}}),r.a.createElement(y.a,{dense:!0},(this.props.players.length?this.props.players.filter((function(t){return t.name.toLowerCase().includes(e.state.searchText.toLowerCase())})).slice(0,10):Array.from(new Array(10))).map((function(t){return t?r.a.createElement(v.a,{key:t.id,button:!0,onClick:function(){return e.props.handlePlayerToggle(t)}},r.a.createElement(E.a,{id:t.id+t.name,primary:t.name,secondary:t.club}),r.a.createElement(b.a,null,r.a.createElement(w.a,{edge:"end",onChange:function(){return e.props.handlePlayerToggle(t)},checked:e.props.playersCompare.some((function(e){return e.id==t.id}))}))):r.a.createElement(C.a,{pt:2,pl:1,pr:1},r.a.createElement(k.a,null),r.a.createElement(k.a,{width:"60%"}))}))))}}]),a}(n.Component),O=a(80),P=a.n(O),S=a(570),T=a(568),R=a(557),U=a(584),L=a(579),A=a(571),M=a(572),W=a(574),F=a(575),Y=a(244),N=a.n(Y),I=[{name:"Level 1 (World)",coefficient:.96,winnerpoints:1e3},{name:"Level 1 (Continental)",coefficient:.96,winnerpoints:600},{name:"Level 2",coefficient:.92,winnerpoints:500},{name:"Level 3",coefficient:.89,winnerpoints:100},{name:"Level 4",coefficient:.83,winnerpoints:70},{name:"Level 5",coefficient:.6,winnerpoints:40},{name:"Level 6",coefficient:.4,winnerpoints:20}],B=[{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:0,percentage:1},{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(2020,9,4)),tournamentAge:2,percentage:.8},{appliedFrom:new Date(Date.UTC(2020,9,5)),appliedUntil:new Date(Date.UTC(2021,5,30)),tournamentAge:2,percentage:1},{appliedFrom:new Date(Date.UTC(2021,6,1)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:2,percentage:.8},{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:3,percentage:.6},{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:4,percentage:.4},{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:5,percentage:.2},{appliedFrom:new Date(Date.UTC(1111,0)),appliedUntil:new Date(Date.UTC(3333,0)),tournamentAge:6,percentage:0}],V=(new Date(Date.UTC(2020,9,5)),new Date(Date.UTC(2021,6,1)),a(573)),H=a(576),z=a(577),J=a(565),Q=a(174),K=a(569),_=a(64),$=a.n(_),q={boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.2)",backgroundColor:"rgb(255, 255, 255)",marginTop:"12px",marginBottom:"12px"},G=Object(d.a)(Object(d.a)({},q),{},{paddingRight:"5px",paddingLeft:"10px"}),X={fontWeight:600,color:"#5eb560"},Z={fontWeight:600,color:"#f97373"},ee={fontWeight:600,color:"#969696"},te=Object(Q.b)((function(e){var t=e.children,a=Object(_.useMediaQuery)({maxWidth:800});return r.a.createElement(v.a,{style:a?G:q},t)})),ae=Object(Q.a)((function(e){var t=e.children,a=Object(_.useMediaQuery)({maxWidth:800});return r.a.createElement(y.a,{dense:a},t)})),ne=function(e){var t=e.children,a=Object(_.useMediaQuery)({maxWidth:800});return r.a.createElement(v.a,{style:a?{paddingRight:"5px",paddingLeft:"10px"}:void 0},t)},re=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(ae,{onSortEnd:this.props.reorder,shouldCancelStart:function(e){if("buttonRemove"==e.target.id||void 0!==e.target.nearestViewportElement&&"buttonRemove"===e.target.nearestViewportElement.id)return!0},useWindowAsScrollContainer:!0},r.a.createElement(ne,null,r.a.createElement(T.a,{item:!0,xs:1},r.a.createElement(E.a,null,"#")),r.a.createElement(T.a,{item:!0,xs:3,sm:4},r.a.createElement(E.a,null,"Name")),r.a.createElement(T.a,{item:!0,xs:!0},r.a.createElement(E.a,null,"Rank")),r.a.createElement(T.a,{item:!0,xs:!0},r.a.createElement(E.a,null,"Points")),r.a.createElement(T.a,{item:!0,xs:2,sm:2,md:2,style:{minWidth:"60px"}},r.a.createElement(E.a,{style:{textAlign:"right",float:"right"}},"Tournament Points"))),this.props.playersCompare.map((function(t,a){return r.a.createElement(te,{key:a,index:a},r.a.createElement(T.a,{item:!0,xs:1},r.a.createElement(E.a,null,r.a.createElement("b",null,t.pos))),r.a.createElement(T.a,{item:!0,xs:3,sm:4},r.a.createElement(E.a,null,t.name)),r.a.createElement(T.a,{item:!0,xs:!0},-1===t.lowestScore?r.a.createElement(k.a,{width:65}):r.a.createElement(T.a,{container:!0,direction:"row"},r.a.createElement(C.a,{mr:.5},r.a.createElement(E.a,null,t.newRank)),t.rank>t.newRank?r.a.createElement(E.a,{style:X},r.a.createElement("b",null,"(+".concat(Math.abs(t.rank-t.newRank),")"))):t.rank===t.newRank?r.a.createElement(E.a,{style:ee},r.a.createElement("b",null,"(=".concat(t.rank-t.newRank,")"))):r.a.createElement(E.a,{style:Z},r.a.createElement("b",null,"(-".concat(Math.abs(t.rank-t.newRank),")"))))),r.a.createElement(T.a,{item:!0,xs:!0},-1===t.lowestScore?r.a.createElement(k.a,{width:65}):r.a.createElement(T.a,{container:!0,direction:"row"},r.a.createElement(C.a,{mr:.5},r.a.createElement(E.a,null,t.newPoints)),t.points<t.newPoints?r.a.createElement(E.a,{style:X},r.a.createElement("b",null,"(+".concat(Math.abs(t.points-t.newPoints),")"))):r.a.createElement(E.a,{style:ee},r.a.createElement("b",null," ","(=".concat(t.points-t.newPoints,")"))))),r.a.createElement(T.a,{item:!0,xs:2,sm:2,style:{minWidth:"60px"}},r.a.createElement(T.a,{container:!0,direction:"row",justify:"flex-end"},r.a.createElement($.a,{maxWidth:800},(function(a){return a?r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2px"},r.a.createElement(E.a,null,r.a.createElement("b",null,t.score))),r.a.createElement(J.a,{size:"small",onClick:function(){return e.props.playerRemoved(t.id)},id:"buttonRemove"},r.a.createElement(K.a,{fontSize:"small",id:"buttonRemove"}))):r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:2},r.a.createElement(E.a,null,r.a.createElement("b",null,t.score))),r.a.createElement(J.a,{size:"small",onClick:function(){return e.props.playerRemoved(t.id)},id:"buttonRemove"},r.a.createElement(K.a,{id:"buttonRemove"})))})))))})))}}]),a}(n.Component),le=a(61),oe=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={playersCompare:[],selectedLevel:I[0].name,bottomNavVal:0},e.recalc=function(e,t){var a=I.find((function(e){return e.name==t})),n=a||I[0];return f.rankPlayers(f.recalc(e,n))},e.reorder=function(t){var a=t.oldIndex,n=t.newIndex;e.setState((function(t){var r=t.playersCompare;return{playersCompare:e.recalc(N()(r,a,n),e.state.selectedLevel)}}))},e.handlePlayerToggle=function(t){e.state.playersCompare.some((function(e){return e.id==t.id}))?e.playerRemoved(t.id):e.playerAdded(t)},e.playerAdded=function(t){e.setState((function(a){return Object(d.a)(Object(d.a)({},a),{},{playersCompare:e.recalc(a.playersCompare.concat(Object(d.a)(Object(d.a)({},t),{},{pos:a.playersCompare.length+1,score:-1,lowestScore:-1,newRank:-1,newPoints:-1})),a.selectedLevel)})})),P.a.ajax("https://serene-crag-74633.herokuapp.com/single/"+t.id).then((function(a){for(var n=Number(a),r=Object(h.a)(e.state.playersCompare),l=0;l<r.length;l++)if(r[l].id===t.id&&-1===r[l].lowestScore){var o=Object(d.a)({},r[l]);o.lowestScore=n,r[l]=o,e.setState({playersCompare:e.recalc(r,e.state.selectedLevel)});break}})).catch((function(){console.log("error")}))},e.handleClearAllClick=function(){e.setState({playersCompare:[]})},e.playerRemoved=function(t){e.setState((function(a){var n=a.playersCompare,r=a.selectedLevel;return{playersCompare:e.recalc(n.filter((function(e){return e.id!==t})),r)}}))},e.handleLevelChange=function(t){e.setState((function(a){var n=a.playersCompare;return{selectedLevel:t.target.value,playersCompare:e.recalc(n,t.target.value)}}))},e}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(e){0===e.players.length&&this.props.players.length>0&&f.setPlayerScores(this.props.players)}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,null,r.a.createElement($.a,{maxWidth:599},(function(t){return r.a.createElement(C.a,{pt:2,pb:t?6:2},r.a.createElement(T.a,{container:!0,spacing:3},r.a.createElement(r.a.Fragment,null,(!t||0===e.state.bottomNavVal)&&r.a.createElement(T.a,{item:!0,xs:12,sm:3,style:{minWidth:"200px"}},r.a.createElement(j,{players:e.props.players,handlePlayerToggle:e.handlePlayerToggle,playersCompare:e.state.playersCompare})),(!t||1===e.state.bottomNavVal)&&r.a.createElement(T.a,{item:!0,xs:12,sm:!0},r.a.createElement(T.a,{container:!0,justify:"space-between",alignItems:"center"},r.a.createElement(T.a,{item:!0},r.a.createElement(R.a,null,r.a.createElement(U.a,null,"Level"),r.a.createElement(L.a,{value:e.state.selectedLevel,onChange:e.handleLevelChange},I.map((function(e){return r.a.createElement(A.a,{value:e.name},e.name)}))))),r.a.createElement(T.a,{item:!0},r.a.createElement(M.a,{variant:"contained",color:"secondary",startIcon:r.a.createElement(V.a,null),onClick:e.handleClearAllClick,style:{float:"right"}},"Clear"))),r.a.createElement(re,{playersCompare:e.state.playersCompare,reorder:e.reorder,playerRemoved:e.playerRemoved})))))}))),r.a.createElement($.a,{maxWidth:599},r.a.createElement(W.a,{value:this.state.bottomNavVal,onChange:function(t,a){e.setState({bottomNavVal:a})},style:{width:"100%",position:"fixed",bottom:"0",right:"0",left:"0"},showLabels:!0},r.a.createElement(F.a,{label:"Select Players",style:{maxWidth:"1000px"},icon:r.a.createElement(H.a,null)}),r.a.createElement(F.a,{label:"Standings",style:{maxWidth:"1000px"},icon:r.a.createElement(z.a,null)}))))}}]),a}(n.Component),ie=Object(le.b)((function(e){return{players:e.players}}))(oe);var ce=a(578),se=a(256),me=a.n(se),pe=a(255),ue=a.n(pe),he=a(257),de=a.n(he),fe=a(580),ge=a(587),ye=a(169),ve=new function e(){var t=this;Object(i.a)(this,e),this.addYears=function(e,t){var a=new Date(e);return new Date(a.setFullYear(a.getFullYear()+t))},this.getPointsByDate=function(e){for(var a=Date.now(),n=[],r=0;r<e.length;r++){var l,o=Object(ye.a)(B);try{for(o.s();!(l=o.n()).done;){var i=l.value,c=t.addYears(e[r].date,i.tournamentAge);c<i.appliedFrom||c>i.appliedUntil||n.push({date:c,points:Math.round(e[r].points*i.percentage),ind:r})}}catch(f){o.e(f)}finally{o.f()}}n=n.sort((function(e,t){return new Date(e.date).getTime()-new Date(t.date).getTime()}));var s,m=[],p=[],u=Object(ye.a)(n);try{var h=function(){var e=s.value;(m=m.filter((function(t){return t.ind!==e.ind}))).push(e),m=m.sort((function(e,t){return t.points-e.points}));for(var t=0,a=0;a<Math.min(m.length,5);a++)t+=m[a].points;p.push({date:e.date,points:t})};for(u.s();!(s=u.n()).done;)h()}catch(f){u.e(f)}finally{u.f()}var d=Date.now();return console.log("elapsed "+(d-a)),p},this.scalePointsByDate=function(e,t,a,n){for(var r=a.getTime(),l=n.getTime(),o=(l-r)/t,i=0,c=0,s=[],m=r;m<l;m+=o){for(;i<e.length&&e[i].date.getTime()<=m;)c=e[i].points,i++;s.push({date:new Date(m).toUTCString().slice(5,16),points:c})}return console.log(s),s}},Ee=a(53),be=a(100),we=a(586),Ce=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={yearRange:e.getYearRange(),density:20},e.handleYearChange=function(t,a){e.setState({yearRange:a})},e.handleDensityChange=function(t,a){e.setState({density:a})},e}return Object(c.a)(a,[{key:"getYearRange",value:function(){return[this.props.playerPoints[0].date.getUTCFullYear(),this.props.playerPoints[this.props.playerPoints.length-1].date.getUTCFullYear()]}},{key:"getMaxDate",value:function(e,t){return e>t?e:t}},{key:"componentDidUpdate",value:function(e){e.playerPoints!==this.props.playerPoints&&this.setState({yearRange:this.getYearRange()})}},{key:"render",value:function(){var e=this.state,t=e.yearRange,a=e.density;return r.a.createElement(r.a.Fragment,null,r.a.createElement(be.a,null,"Year Range"),r.a.createElement(we.a,{value:this.state.yearRange,onChange:this.handleYearChange,valueLabelDisplay:"auto","aria-labelledby":"range-slider",marks:!0,step:1,min:this.getYearRange()[0],max:this.getYearRange()[1]}),r.a.createElement(be.a,null,"Chart Density"),r.a.createElement(we.a,{value:this.state.density,onChange:this.handleDensityChange,valueLabelDisplay:"auto","aria-labelledby":"range-slider",min:5,max:50}),r.a.createElement("div",{style:{width:"100%",height:300}},r.a.createElement(Ee.e,null,r.a.createElement(Ee.d,{data:ve.scalePointsByDate(this.props.playerPoints,a,this.getMaxDate(new Date(Date.UTC(t[0],0)),this.props.playerPoints[0].date),new Date(Date.UTC(t[1],0)))},r.a.createElement(Ee.a,{stroke:"#eee",strokeDasharray:"3 3"}),r.a.createElement(Ee.g,{dataKey:"date",interval:0,angle:30,dx:20}),r.a.createElement(Ee.h,null),r.a.createElement(Ee.f,null),r.a.createElement(Ee.b,null),r.a.createElement(Ee.c,{type:"monotone",dataKey:"points",stroke:"#8884d8",dot:!1,strokeWidth:2})))))}}]),a}(n.Component),De=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={playerPoints:[]},e.handlePlayerChange=function(t,a){null===a?e.setState({playerPoints:[]}):P.a.getJSON("https://serene-crag-74633.herokuapp.com/tournaments/"+a.id).then((function(t){e.setState({playerPoints:ve.getPointsByDate(t)})})).catch((function(){console.log("error")}))},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement(ue.a,null,r.a.createElement(me.a,{pt:5},r.a.createElement(de.a,{container:!0,spacing:3},r.a.createElement(fe.a,{options:this.props.players,getOptionLabel:function(e){return e.name},renderInput:function(e){return r.a.createElement(D.a,Object.assign({},e,{label:"Choose a player"}))},filterOptions:Object(ge.a)({limit:100}),onChange:this.handlePlayerChange}),this.state.playerPoints.length?r.a.createElement(Ce,{playerPoints:this.state.playerPoints}):r.a.createElement(ce.a,null))))}}]),a}(n.Component),xe=Object(le.b)((function(e){return{players:e.players}}))(De),ke=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;P.a.ajax("https://serene-crag-74633.herokuapp.com/all").then((function(t){var a=f.parseContent(t);e.props.updatePlayers(a)})).catch((function(){console.log("error")}))}},{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(u.a,{exact:!0,path:"/",component:ie}),r.a.createElement(u.a,{exact:!0,path:"/progress",component:xe}))}}]),a}(n.Component);ke.displayName=ke.name;var je=Object(le.b)(null,(function(e){return{updatePlayers:function(t){return e({type:"UPDATE_PLAYERS",payload:t})}}}))(ke);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Oe=a(81),Pe=[];var Se=Object(Oe.b)({players:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PLAYERS":return t.payload;default:return e}}}),Te=Object(Oe.c)(Se);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(le.a,{store:Te},r.a.createElement(je,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[305,1,2]]]);
//# sourceMappingURL=main.038fe575.chunk.js.map