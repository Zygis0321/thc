(this.webpackJsonpthc=this.webpackJsonpthc||[]).push([[0],{106:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),o=a.n(l),c=(a(91),a(23)),i=a(24),s=a(32),m=a(31),u=a(72),p=a(12),h=(a(92),a(73)),f=a(44),d=new(function(){function e(){var t=this;Object(c.a)(this,e),this.prefScores=new Array(6005).fill(0),this.rankPlayers=function(e){for(var a=0;a<e.length;a++)-1!==e[a].lowestScore&&(e[a].newPoints=e[a].points+Math.max(0,e[a].score-e[a].lowestScore));for(var n=0;n<e.length;n++)if(-1!==e[n].lowestScore){for(var r=t.prefScores[e[n].newPoints+1]+1,l=0;l<e.length;l++)-1!==e[l].lowestScore&&(e[l].points>e[n].newPoints&&r--,e[l].newPoints>e[n].newPoints&&r++);e[n].rank=t.prefScores[e[n].points+1]+1,e[n].newRank=r}return e},this.recalc=function(e,t){for(var a=0;a<e.length;a++)e[a].pos=a+1,e[a].score=0;if(e.length<4)return e;for(var n=e.map((function(e){return e.value})).sort((function(e,t){return t-e})),r=0;r+1<e.length;r++){for(var l=0,o=r;o<Math.min(r+4,e.length);o++)l+=n[o];e[r].score=Math.max(e[r].score,l/4*t.coefficient)}for(var c=0;c<e.length;c++){var i=69*(e.length-c-1)/(e.length-1)+1;e[c].score=Math.max(e[c].score,Math.min(i,e.length-c))}for(var s=t.winnerpoints,m=0;m+1<e.length;m++)e[m].score=Math.max(e[m].score,s),s/=2;for(var u=0;u<e.length;u++){var p=(t.winnerpoints-1)*(e.length-u-1)/(e.length-1)+1;e[u].score=Math.max(e[u].score,p)}for(var h=0;h<e.length;h++)e[h].score=Math.floor(e[h].score);return e[0].score+=10,e}}return Object(i.a)(e,[{key:"parseContent",value:function(e){for(var t=e.split("\n").map((function(e){return e.split("\t")})),a=[],n=2;n+1<t.length;n++){var r={rank:Number(t[n][0]),id:t[n][1],name:t[n][2],club:t[n][3],nation:t[n][4],points:Number(t[n][5]),value:Number(t[n][6])};a.push(r)}return a}},{key:"parsePlayerMinPoints",value:function(e){var t=document.createElement("html");t.innerHTML=e;for(var a=t.getElementsByClassName("normTour"),n=1e5,r=0,l=6;l<a.length;l+=7){var o=a[l].innerHTML.indexOf("(");-1===o&&(o=a[l].innerHTML.length);var c=a[l].innerHTML.substr(0,o);n=Math.min(n,Number(c)),r++}return r<5&&(n=0),n}},{key:"setPlayerScores",value:function(e){for(var t=0;t<e.length;t++)this.prefScores[e[t].points]++;for(var a=6e3;a>=0;a--)this.prefScores[a]+=this.prefScores[a+1]}}]),e}()),v=a(142),y=a(141),E=a(108),g=a(144),w=a(145),b=a(157),C=a(156),k=a(158),x=a(143),j=a(147),S=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={searchText:""},e.handleSearchChange=function(t){e.setState({searchText:t.target.value})},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{label:"Players",variant:"outlined",onChange:this.handleSearchChange,fullWidth:!0,InputProps:{endAdornment:r.a.createElement(v.a,{position:"end"},r.a.createElement(x.a,{color:"action"}))}}),r.a.createElement(y.a,{dense:!0},(this.props.players.length?this.props.players.filter((function(t){return t.name.toLowerCase().includes(e.state.searchText.toLowerCase())})).slice(0,10):Array.from(new Array(10))).map((function(t){return t?r.a.createElement(E.a,{key:t.id,button:!0,onClick:function(){return e.props.handlePlayerToggle(t)}},r.a.createElement(g.a,{id:t.id+t.name,primary:t.name,secondary:t.club}),r.a.createElement(w.a,null,r.a.createElement(b.a,{edge:"end",onChange:function(){return e.props.handlePlayerToggle(t)},checked:e.props.playersCompare.some((function(e){return e.id==t.id}))}))):r.a.createElement(C.a,{pt:2,pl:1,pr:1},r.a.createElement(j.a,null),r.a.createElement(j.a,{width:"60%"}))}))))}}]),a}(n.Component),O=a(55),P=a.n(O),L=a(150),M=a(148),R=a(140),T=a(160),A=a(154),I=a(151),N=a(152),W=a(71),B=a.n(W),H=[{name:"Level 1 (World)",coefficient:.96,winnerpoints:1e3},{name:"Level 1 (Continental)",coefficient:.96,winnerpoints:600},{name:"Level 2",coefficient:.92,winnerpoints:500},{name:"Level 3",coefficient:.89,winnerpoints:100},{name:"Level 4",coefficient:.83,winnerpoints:70},{name:"Level 5",coefficient:.6,winnerpoints:40},{name:"Level 6",coefficient:.4,winnerpoints:20}],J=a(153),z=a(47),D=a(146),F=a(58),$=a(149),q={boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.2)",backgroundColor:"rgb(255, 255, 255)",marginTop:"12px",marginBottom:"12px"},G={fontWeight:600,color:"#5eb560"},K={fontWeight:600,color:"#f97373"},Q={fontWeight:600,color:"#969696"},U=Object(F.b)((function(e){var t=e.children;return r.a.createElement(E.a,{style:q},t)})),V=Object(F.a)((function(e){var t=e.children;return r.a.createElement(y.a,null,t)})),X=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(V,{onSortEnd:this.props.reorder,distance:1},r.a.createElement(E.a,null,r.a.createElement(M.a,{item:!0,xs:1},r.a.createElement(z.a,null,"#")),r.a.createElement(M.a,{item:!0,xs:4},r.a.createElement(z.a,null,"Name")),r.a.createElement(M.a,{item:!0,xs:!0},r.a.createElement(z.a,null,"Rank")),r.a.createElement(M.a,{item:!0,xs:!0},r.a.createElement(z.a,null,"Points")),r.a.createElement(M.a,{item:!0,xs:2},r.a.createElement(z.a,{align:"justify"},"Tournament Points"))),this.props.playersCompare.map((function(t,a){return r.a.createElement(U,{key:a,index:a},r.a.createElement(M.a,{item:!0,xs:1},r.a.createElement(z.a,null,r.a.createElement("b",null,t.pos))),r.a.createElement(M.a,{item:!0,xs:4},r.a.createElement(z.a,null,t.name)),r.a.createElement(M.a,{item:!0,xs:!0},-1===t.lowestScore?r.a.createElement(j.a,{width:70}):r.a.createElement(M.a,{container:!0,direction:"row"},r.a.createElement(C.a,{mr:.5},r.a.createElement(z.a,null,t.newRank)),t.rank>t.newRank?r.a.createElement(z.a,{style:G},"(+".concat(Math.abs(t.rank-t.newRank),")")):t.rank===t.newRank?r.a.createElement(z.a,{style:Q},"(=".concat(t.rank-t.newRank,")")):r.a.createElement(z.a,{style:K},"(-".concat(Math.abs(t.rank-t.newRank),")")))),r.a.createElement(M.a,{item:!0,xs:!0},-1===t.lowestScore?r.a.createElement(j.a,{width:70}):r.a.createElement(M.a,{container:!0,direction:"row"},r.a.createElement(C.a,{mr:.5},r.a.createElement(z.a,null,t.newPoints)),t.points<t.newPoints?r.a.createElement(z.a,{style:G},"(+".concat(Math.abs(t.points-t.newPoints),")")):r.a.createElement(z.a,{style:Q},"(=".concat(t.points-t.newPoints,")")))),r.a.createElement(M.a,{item:!0,xs:2},r.a.createElement(M.a,{container:!0,direction:"row",justify:"flex-end"},r.a.createElement(C.a,{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:2},r.a.createElement(z.a,{align:"right"},r.a.createElement("b",null,t.score))),r.a.createElement(C.a,{display:"flex",alignItems:"center",justifyContent:"flex-end"},r.a.createElement(D.a,{size:"small",onClick:function(){return e.props.playerRemoved(t.id)}},r.a.createElement($.a,null))))))})))}}]),a}(n.Component),Y=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={players:[],playersCompare:[],selectedLevel:H[0].name},e.recalc=function(e,t){var a=H.find((function(e){return e.name==t})),n=a||H[0];return d.rankPlayers(d.recalc(e,n))},e.reorder=function(t){var a=t.oldIndex,n=t.newIndex;e.setState((function(t){var r=t.playersCompare;return{playersCompare:e.recalc(B()(r,a,n),e.state.selectedLevel)}}))},e.handlePlayerToggle=function(t){e.state.playersCompare.some((function(e){return e.id==t.id}))?e.playerRemoved(t.id):e.playerAdded(t)},e.playerAdded=function(t){e.setState((function(a){return Object(f.a)(Object(f.a)({},a),{},{playersCompare:e.recalc(a.playersCompare.concat(Object(f.a)(Object(f.a)({},t),{},{pos:a.playersCompare.length+1,score:-1,lowestScore:-1,newRank:-1,newPoints:-1})),a.selectedLevel)})})),P.a.ajax("https://thcserver.herokuapp.com/single/"+t.id).then((function(a){for(var n=Number(a),r=Object(h.a)(e.state.playersCompare),l=0;l<r.length;l++)if(r[l].id===t.id&&-1===r[l].lowestScore){var o=Object(f.a)({},r[l]);o.lowestScore=n,r[l]=o,e.setState({playersCompare:e.recalc(r,e.state.selectedLevel)});break}})).catch((function(){console.log("error")}))},e.handleClearAllClick=function(){e.setState({playersCompare:[]})},e.playerRemoved=function(t){e.setState((function(a){var n=a.playersCompare,r=a.selectedLevel;return{playersCompare:e.recalc(n.filter((function(e){return e.id!==t})),r)}}))},e.handleLevelChange=function(t){e.setState((function(a){var n=a.playersCompare;return{selectedLevel:t.target.value,playersCompare:e.recalc(n,t.target.value)}}))},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;P.a.ajax("https://thcserver.herokuapp.com/all").then((function(t){var a=d.parseContent(t);d.setPlayerScores(a),e.setState({players:a})})).catch((function(){console.log("error")}))}},{key:"render",value:function(){return r.a.createElement(L.a,null,r.a.createElement(C.a,{pt:5},r.a.createElement(M.a,{container:!0,spacing:3},r.a.createElement(M.a,{item:!0,xs:3},r.a.createElement(S,{players:this.state.players,handlePlayerToggle:this.handlePlayerToggle,playersCompare:this.state.playersCompare})),r.a.createElement(M.a,{item:!0,xs:!0},r.a.createElement(M.a,{container:!0,justify:"space-between",alignItems:"center"},r.a.createElement(M.a,{item:!0},r.a.createElement(R.a,null,r.a.createElement(T.a,null,"Level"),r.a.createElement(A.a,{value:this.state.selectedLevel,onChange:this.handleLevelChange},H.map((function(e){return r.a.createElement(I.a,{value:e.name},e.name)}))))),r.a.createElement(M.a,{item:!0},r.a.createElement(N.a,{variant:"contained",color:"secondary",startIcon:r.a.createElement(J.a,null),onClick:this.handleClearAllClick,style:{float:"right"}},"Clear"))),r.a.createElement(X,{playersCompare:this.state.playersCompare,reorder:this.reorder,playerRemoved:this.playerRemoved})))))}}]),a}(n.Component),Z=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement(p.a,{exact:!0,path:"/",component:Y}))}}]),a}(n.Component);Z.displayName=Z.name;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,a){e.exports=a(106)},91:function(e,t,a){},92:function(e,t,a){}},[[86,1,2]]]);
//# sourceMappingURL=main.2248fc86.chunk.js.map