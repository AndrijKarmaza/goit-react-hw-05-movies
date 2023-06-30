"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[888],{888:function(t,a,r){r.r(a),r.d(a,{default:function(){return x}});var W=r(861),e=r(439),s=r(757),n=r.n(s),l=r(243),i=r(689),o=r(87),d=r(791),v=r(826),u=r(223),p=r(264),V=r(742),L="MovieDetails_btn_back__FdQb-",c="MovieDetails_btn_addition__RNTov",h="MovieDetails_movie_card__nLdE0",m="MovieDetails_movie_card_descr__wm9ua",g="MovieDetails_movie_img__LJ51e",S="MovieDetails_btn_addition_list__OFZLk",F=r(184),x=function(){var t,a,r=(0,i.UO)().movieId,s=(0,d.useState)(),x=(0,e.Z)(s,2),C=x[0],f=x[1],Y=(0,d.useState)(!1),Z=(0,e.Z)(Y,2),B=Z[0],N=Z[1],z=(0,d.useState)(!1),K=(0,e.Z)(z,2),q=K[0],R=K[1],b=null!==(t=null===(a=(0,i.TH)().state)||void 0===a?void 0:a.from)&&void 0!==t?t:"/";if((0,d.useEffect)((function(){function t(){return(t=(0,W.Z)(n().mark((function t(){var a;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l.Z.get("".concat(v._n,"/movie/").concat(r,"?api_key=").concat(v.Fn));case 3:a=t.sent,f(a.data),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),N(!0);case 10:return t.prev=10,R(!1),V.Loading.remove(),t.finish(10);case 14:case"end":return t.stop()}}),t,null,[[0,7,10,14]])})))).apply(this,arguments)}R(!0),function(){t.apply(this,arguments)}()}),[r]),q&&V.Loading.standard("Loading..."),B&&p.Notify.failure("Oops! Something went wrong. Please try reloading the page"),!C||B)return(0,F.jsx)(o.rU,{to:b,children:"Back"});var k=C.poster_path,j=C.title,w=C.vote_average,Q=C.overview,G=C.genres.flatMap((function(t){return t.name})).join(", ");return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o.rU,{to:b,className:L,children:"Back"}),(0,F.jsxs)("div",{className:h,children:[(0,F.jsx)("img",{src:k?"".concat(v.YQ).concat(k):u,alt:j,className:g}),(0,F.jsxs)("div",{className:m,children:[(0,F.jsx)("h1",{children:j}),(0,F.jsxs)("p",{children:["User Score: ",(10*w).toFixed(0),"%"]}),(0,F.jsx)("h2",{children:"Genres:"}),(0,F.jsx)("p",{children:G}),(0,F.jsx)("h2",{children:"Overview:"}),(0,F.jsx)("p",{children:Q})]})]}),(0,F.jsxs)("div",{children:[(0,F.jsx)("h2",{children:"Additional information"}),(0,F.jsxs)("ul",{className:S,children:[(0,F.jsx)("li",{children:(0,F.jsx)(o.rU,{to:"cast",className:c,children:"Cast"})}),(0,F.jsx)("li",{children:(0,F.jsx)(o.rU,{to:"reviews",className:c,children:"Reviews"})})]})]}),(0,F.jsx)(d.Suspense,{children:(0,F.jsx)(i.j3,{})})]})}},826:function(t,a,r){r.d(a,{Fn:function(){return e},YQ:function(){return s},_n:function(){return W}});var W="https://api.themoviedb.org/3",e="24332f5bdb5cb6313d5fde27ff166678",s="https://image.tmdb.org/t/p/w300"},223:function(t){t.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=888.2f810c3e.chunk.js.map