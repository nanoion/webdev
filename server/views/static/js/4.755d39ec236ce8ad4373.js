webpackJsonp([4],{rsjD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("vJKS"),l=a("HG31"),n=a("mtWM"),o=a.n(n),s={components:{Layout:r.a,PageHeader:l.a},data:function(){return{problem:"X,Y,5,9,15,23,Z",answer:"",title:"Find XYZ value"}},mounted:function(){localStorage.xyz&&(this.answer=localStorage.xyz)},watch:{answer:function(e){localStorage.xyz=e}},methods:{solve:function(){var e=this;o.a.get("http://localhost:9000/api/xyz?input="+this.problem).then(function(t){e.answer=t.data.value})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("PageHeader",{attrs:{title:e.title}}),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("b-form-group",{attrs:{id:"input-group-problem",label:"Problem:","label-for":"input-problem"}},[a("b-form-input",{attrs:{readonly:"",id:"input-problem",type:"text",required:"",placeholder:"Arithmetic Sequence"},model:{value:e.problem,callback:function(t){e.problem=t},expression:"problem"}})],1),e._v(" "),a("b-form-group",{attrs:{id:"input-group-answer",label:"Answer:","label-for":"input-answer"}},[a("b-form-input",{attrs:{readonly:"",id:"input-answer",type:"text",placeholder:"Answer"},model:{value:e.answer,callback:function(t){e.answer=t},expression:"answer"}})],1),e._v(" "),a("b-button",{on:{click:e.solve}},[e._v("Solve")])],1)])])])],1)},staticRenderFns:[]},u=a("VU/8")(s,i,!1,null,null,null);t.default=u.exports}});
//# sourceMappingURL=4.755d39ec236ce8ad4373.js.map