(this.webpackJsonptodoapp=this.webpackJsonptodoapp||[]).push([[0],{13:function(e,t,n){e.exports={items:"items_items__2aY_b",item:"items_item__15uJF",text:"items_text__3aHDc",delete:"items_delete__zDu_4"}},21:function(e,t,n){e.exports={app:"App_app__1kX79",fieldWrite:"App_fieldWrite__XNmvM"}},31:function(e,t,n){e.exports={fieldWrite:"input_fieldWrite__198v2"}},37:function(e,t,n){},5:function(e,t,n){e.exports={btn:"buttons_btn__370Hx",button:"buttons_button__32SZR",active:"buttons_active__PaKR5"}},64:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(30),s=n.n(r),o=(n(37),n(7)),i=n.n(o),u=n(12),l=n(3),p=n(21),d=n.n(p),b=n(5),f=n.n(b),j=n(1),h=function(e){var t=e.setFiltredType,n=e.filtredType,a=e.orderType,c=e.setOrderType;return Object(j.jsxs)("div",{className:f.a.btn,children:[Object(j.jsx)("button",{onClick:function(){return t("")},className:"All"===n?f.a.active:f.a.button,children:"All"}),Object(j.jsx)("button",{onClick:function(){return t("undone")},className:"undone"===n?f.a.active:f.a.button,children:"Undone"}),Object(j.jsx)("button",{onClick:function(){return t("done")},className:"done"===n?f.a.active:f.a.button,children:"Done"}),Object(j.jsx)("p",{children:"Sort by Date:"}),Object(j.jsx)("button",{onClick:function(){return c("asc")},className:"asc"===a?f.a.active:f.a.button,children:"Old"}),Object(j.jsx)("button",{onClick:function(){return c("desc")},className:"desc"===a?f.a.active:f.a.button,children:"New"})]})},g=n(10),x=n.n(g),k=n(13),m=n.n(k),O=function(e){var t=e.showTasks,n=e.getTasks,a=e.setTriggerError,c=e.setAlert,r=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.delete("https://heroku-backend-app-for-todo.herokuapp.com/task/".concat(t));case 3:n(),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),c(e.t0.response.data.message),a(!0);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(u.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(t),e.next=4,x.a.patch("https://heroku-backend-app-for-todo.herokuapp.com/task/".concat(t.uuid),{name:t.name,done:!t.done});case 4:r=e.sent,t.done=r.data.item.done,n(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),c(e.t0.response.data.message),a(!0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),o=function(e){e.target.contentEditable=!0},l=function(){var e=Object(u.a)(i.a.mark((function e(t,r){var s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"Enter"!==t.key){e.next=11;break}if(""===t.target.textContent){e.next=9;break}return s=t.target.textContent,r.name=t.target.textContent,e.next=7,x.a.patch("https://heroku-backend-app-for-todo.herokuapp.com/task/".concat(r.uuid),{name:s,done:!1}).then((function(e){t.target.contentEditable=!1,n()}));case 7:e.next=11;break;case 9:t.target.textContent=r.name,t.target.contentEditable=!1;case 11:"Escape"===t.key&&(t.target.textContent=r.name,t.target.contentEditable=!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),c(e.t0.response.data.message),a(!0);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}();return Object(j.jsx)("ul",{className:m.a.items,children:t.map((function(e){return Object(j.jsxs)("li",{id:e.uuid,className:m.a.item,children:[Object(j.jsx)("input",{type:"checkbox",checked:e.done,onChange:function(){s(e)}}),Object(j.jsx)("span",{onDoubleClick:o,onKeyDown:function(t){return l(t,e)},onBlur:function(t){return function(e,t){e.target.contentEditable=!1,e.target.textContent=t.name}(t,e)},className:m.a.text,children:e.name}),Object(j.jsx)("span",{className:m.a.date,children:new Date(Date.parse(e.createdAt)).toLocaleString()}),Object(j.jsx)("span",{onClick:function(){r(e.uuid)},className:m.a.delete,children:Object(j.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/2602/2602735.png"})})]},e.uuid)}))})},v=n(9),_=n.n(v),C=function(e){var t=e.allPages,n=e.setCurrentPage;return Object(j.jsx)("li",{className:_.a.page,onClick:function(){return n(t[0])},children:"<<"})},y=function(e){var t=e.allPages,n=e.setCurrentPage,a=e.currentPage;return t.map((function(e){return Object(j.jsx)("li",{className:a===e?_.a.active:_.a.page,onClick:function(){n(e)},children:e+1},e)}))},T=function(e){var t=e.allPages,n=e.setCurrentPage;return Object(j.jsx)("li",{className:_.a.page,onClick:function(){return n(t.length-1)},children:">>"})},N=function(e){var t=e.allPages,n=e.setCurrentPage;return Object(j.jsxs)("ul",{className:_.a.pagination,children:[Object(j.jsx)(C,{allPages:t,setCurrentPage:n}),Object(j.jsx)(y,{allPages:t,setCurrentPage:n}),Object(j.jsx)(T,{allPages:t,setCurrentPage:n})]})},P=n(31),w=n.n(P),E=function(e){var t=e.sendTask,n=e.onNewTextTask,a=e.text;return Object(j.jsx)("input",{onKeyDown:t,onChange:n,value:a,className:w.a.fieldWrite,type:"text",placeholder:"I want to..."})},S=n(78);var D=function(){var e,t=Object(a.useState)(""),n=Object(l.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)("all"),o=Object(l.a)(s,2),p=o[0],b=o[1],f=Object(a.useState)("asc"),g=Object(l.a)(f,2),k=g[0],m=g[1],v=Object(a.useState)("0"),_=Object(l.a)(v,2),C=_[0],y=_[1],T=Object(a.useState)([]),P=Object(l.a)(T,2),w=P[0],D=P[1],A=Object(a.useState)(""),B=Object(l.a)(A,2),F=B[0],W=B[1],L=Object(a.useState)(!1),I=Object(l.a)(L,2),J=I[0],K=I[1],M=[];Object(a.useEffect)((function(){x.a.get("https://heroku-backend-app-for-todo.herokuapp.com/tasks?filterBy=".concat(p,"&sortBy=").concat(k)).then((function(e){D(e.data)}))}),[c,p,k]);for(var R=function(){x.a.get("https://heroku-backend-app-for-todo.herokuapp.com/tasks?filterBy=".concat(p,"&sortBy=").concat(k)).then((function(e){D(e.data)}))},H=Math.ceil(w.length/5),X=0;X<H;X++)M.push(X);e=w.slice(5*C,5*(C+1));var Z=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"Enter"!==t.key||""===t.target.value){e.next=6;break}return e.next=4,x.a.post("https://heroku-backend-app-for-todo.herokuapp.com/task",{name:c});case 4:r(""),R();case 6:e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.response,"123123123"),W(e.t0.response.data.message),K(!0);case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)("div",{className:d.a.app,children:[J&&Object(j.jsx)(S.a,{severity:"error",onClose:function(){return K(!1)},children:F}),Object(j.jsx)("h1",{className:d.a.title,children:"ToDo List"}),Object(j.jsx)(E,{sendTask:Z,onNewTextTask:function(e){r(e.target.value)},text:c}),Object(j.jsx)(h,{setFiltredType:b,filtredType:p,orderType:k,setOrderType:m}),Object(j.jsx)(O,{getTasks:R,state:w,setTodos:D,showTasks:e,setTriggerError:K,setAlert:W}),Object(j.jsx)(N,{allPages:M,setCurrentPage:y,currentPage:C})]})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,79)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(D,{})}),document.getElementById("root")),A()},9:function(e,t,n){e.exports={pagination:"pagination_pagination__3i9jO",page:"pagination_page__3go4Z",active:"pagination_active__1Rcnk"}}},[[64,1,2]]]);
//# sourceMappingURL=main.72190cbf.chunk.js.map