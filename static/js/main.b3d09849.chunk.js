(this.webpackJsonpdash=this.webpackJsonpdash||[]).push([[0],{52:function(e,t,a){},53:function(e,t,a){},59:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(36),i=a.n(c),s=(a(52),a(53),a(2)),u=a(93),o=a(3),l=function(e){var t=e.className,a=e.children;return Object(o.jsx)(u.a,{className:"card",children:Object(o.jsx)("div",{className:"card--holder ".concat(t||""),children:a})})},h=(a(59),a(95)),b=a(98),f=a(96),j=a(97),d=a(44),O=Object(d.a)({palette:{primary:{main:"#4527a0"}}}),v=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],g=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],m=a(43),p=function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,"-").concat(e.getDate()<9?"0"+(e.getDate()+1):e.getDate()+1,"T23%3A59%3A59%2B07%3A00")},x=864e5,y=function(){for(var e=m.a.now().weekNumber,t=[],a=0;a<4;a++)t.push(e-a);return t=t.reverse()},_=function(e){return e-1===-1?6:e-1},N=a(42),D=a.n(N).a.create({baseURL:"https://api.habitify.me/",timeout:1e4,headers:{Authorization:localStorage.getItem("habitify_token")?JSON.parse(localStorage.getItem("habitify_token")):""}});var S=function(){var e=Object(n.useState)([0,0,0,0,0,0,0]),t=Object(s.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)([0,0,0,0]),i=Object(s.a)(c,2),u=i[0],d=i[1],m=Object(n.useState)(0),N=Object(s.a)(m,2),S=N[0],w=N[1],k=function(e,t){var a=JSON.parse(localStorage.getItem(e)),r=Object(n.useState)(null!==a&&void 0!==a?a:t),c=Object(s.a)(r,2),i=c[0],u=c[1];return[i,function(t){localStorage.setItem(e,JSON.stringify(t)),u(t)}]}("habitify_token",""),F=Object(s.a)(k,2),J=F[0],M=F[1],A=Object(n.useState)(!1),C=Object(s.a)(A,2),I=C[0],E=C[1],L=new Date,T=Object(n.useCallback)((function(){var e=[0,0,0,0,0,0,0];Promise.allSettled(function(){for(var e=new Date(Date.now()),t=e.getDay()-1===-1?6:e.getDay()-1,a=[],n=new Date(e.valueOf()-t*x),r=0;r<7;r++)a.push(p(n)),n=new Date(n.valueOf()+x);return a}().map((function(e){return D.get(q(e))}))).then((function(t){t.forEach((function(t){if("fulfilled"===t.status.toString()){var a=B(t.value,"daily"),n=t.value.request.responseURL;e[_(new Date(n.substring(44,54)).getDay())]=a}else E(!0)})),r(e)})).catch((function(e){return console.error(e)}))}),[]),z=Object(n.useCallback)((function(){var e=[0,0,0,0];Promise.allSettled(function(){for(var e=new Date(Date.now()),t=[],a=0;a<4;a++)t.push(p(new Date(e.valueOf()-6048e5*a)));return t}().map((function(e){return D.get(q(e))}))).then((function(t){t.forEach((function(t){if("fulfilled"===t.status.toString()){var a=B(t.value,"weekly"),n=t.value.request.responseURL;e[_(new Date(n.substring(44,54)).getDay())]=a}else E(!0)})),d(e)})).catch((function(e){return console.error(e)}))}),[]),P=Object(n.useCallback)((function(){D.get(q(function(){var e=new Date(Date.now());return p(e)}())).then((function(e){var t=B(e,"monthly");w(t)})).catch((function(e){return console.error(e)}))}),[]);Object(n.useEffect)((function(){!function(e){D.interceptors.request.use((function(t){t.headers.Authorization=e}))}(J),T(),z(),P()}),[J,T,z,P]);var q=function(e){return"journal?target_date=".concat(e)},B=function(e,t){if("Success"===e.data.message){var a=0,n=0;return e.data.data.forEach((function(e){var r=e.goal.periodicity,c=Number.parseFloat(e.progress.current_value),i=Number.parseFloat(e.progress.target_value);if(r===t)a+=c>i?i:c,n+=i})),a/n*100}return 0};return Object(o.jsxs)(f.a,{theme:O,children:[Object(o.jsx)("h1",{className:"habitify__title",children:"Habitify Habit Visualizer"}),Object(o.jsx)("div",{className:"habitify__token",children:Object(o.jsxs)(l,{children:[I?Object(o.jsx)("p",{children:"failure"}):null,Object(o.jsx)(j.a,{onChange:function(e){return M(e.target.value)},value:J})]})}),Object(o.jsxs)("div",{className:"habitify",children:[Object(o.jsx)("div",{className:"habitify__row",children:v.map((function(e,t){return function(e,t){return Object(o.jsxs)(l,{className:_(L.getDay())===e?"current":"",children:[Object(o.jsx)("h3",{className:"habitify__label",children:v[e]}),Object(o.jsxs)("span",{className:"habitify__day",children:[Object(o.jsxs)("p",{className:"habitify__day--progress",children:[t.toFixed(1),"%"]}),Object(o.jsx)("span",{className:"habitify__day--wheel",children:Object(o.jsx)(h.a,{variant:"determinate",value:t,thickness:6,size:"100px"})})]})]})}(t,a[t])}))}),Object(o.jsx)("div",{className:"habitify__row",children:u.map((function(e,t){return function(e,t){return Object(o.jsxs)(l,{className:3===e?"current":"",children:[Object(o.jsxs)("h3",{className:"habitify__label",children:["W",y()[e]]}),Object(o.jsxs)("span",{children:[t.toFixed(1),"%"]}),Object(o.jsx)(b.a,{variant:"determinate",value:t})]})}(t,e)}))}),Object(o.jsx)("div",{className:"habitify__row",children:Object(o.jsxs)(l,{className:"current",children:[Object(o.jsx)("h3",{className:"habitify__label",children:g[L.getMonth()]}),Object(o.jsxs)("span",{children:[S.toFixed(1),"%"]}),Object(o.jsx)(b.a,{variant:"determinate",value:S})]})})]})]})};var w=function(){return Object(o.jsx)("div",{className:"dash",children:Object(o.jsx)(S,{})})},k=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,99)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(w,{})}),document.getElementById("root")),k()}},[[78,1,2]]]);
//# sourceMappingURL=main.b3d09849.chunk.js.map