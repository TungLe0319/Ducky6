import{_ as g,b as f,d as r,A as a,E as k,T as E,c,a as t,F as _,r as l,e as x,P as u,f as T,o as n,g as p,p as C,h as M,i as v}from"./index.c17a56fa.js";const S={setup(){async function e(){try{await x.getMyTickets()}catch(s){u.error(s,"[getMyTickets]")}}async function i(){try{await T.getEventsForAccount()}catch(s){u.error(s,"[getMyEvents]")}}return f(()=>{e(),i()}),{events:r(()=>a.myEvents.filter(s=>s.creator.id==a.account.id)),account:r(()=>a.account),myTickets:r(()=>a.myTickets)}},components:{EventCard:k,TicketCard:E}},m=e=>(C("data-v-2357b915"),e=e(),M(),e),I={class:"text-center accountPage text-light container-fluid"},b={class:"container"},w=m(()=>t("div",{class:"col-md-5 text-start my-4"},[t("h4",{class:"text-success lighten-20"},"My Events")],-1)),A={class:"row horizontal-scrollable"},P={class:"col-md-3 animate__flipInY animate__animated p-4"},B={class:"row justify-content-center"},F=m(()=>t("div",{class:"col-md-5 text-start my-4"},[t("h4",{class:"text-success lighten-20"},"Upcoming Events")],-1)),N={class:"col-md-8 my-3 animate__animated animate__lightSpeedInRight"};function V(e,i,s,d,$,j){const h=v("EventCard"),y=v("TicketCard");return n(),c("div",I,[t("div",b,[w,t("div",A,[(n(!0),c(_,null,l(d.events,o=>(n(),c("div",P,[p(h,{event:o},null,8,["event"])]))),256))])]),t("div",B,[F,(n(!0),c(_,null,l(d.myTickets,o=>(n(),c("div",N,[p(y,{ticket:o},null,8,["ticket"])]))),256))])])}const L=g(S,[["render",V],["__scopeId","data-v-2357b915"]]);export{L as default};
