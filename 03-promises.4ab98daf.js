function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequired7c6=i),i("fbklV");var r=i("7Y9D8");function u(e,t){return new Promise(((o,n)=>{const i=Math.random()>.3;setTimeout((()=>{i?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();const o=document.querySelector('[name="delay"]'),n=document.querySelector('[name="step"]'),i=document.querySelector('[name="amount"]'),l=Number(o.value),a=Number(n.value),d=Number(i.value);if(a<=0||l<=0||d<=0)return void e(r).Notify.failure("Step, initial delay, and amount must be positive values");for(let t=1;t<=d;t++){u(t,l+(t-1)*a).then((({position:t,delay:o})=>{e(r).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`)})).catch((({position:t,delay:o})=>{e(r).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`)}))}}));
//# sourceMappingURL=03-promises.4ab98daf.js.map
