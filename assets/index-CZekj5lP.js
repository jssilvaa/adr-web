(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function Sl(i,t){const e={mass:35.11,height:.79,xFront:.12,xBack:.05,yHalf:.1,kDcm:1.6,ffMode:2,lambda:1,alpha:70,sigmaF:2,stepping:1,stepThresh:.1,pushN:160},n=new t.Sim,s=()=>n.setParams(e.mass,e.height,e.xFront,e.xBack,e.yHalf,e.kDcm,e.ffMode,e.lambda,e.alpha,e.sigmaF,e.stepping,e.stepThresh);s(),n.reset(),i.innerHTML=`
    <div class="panel stage">
      <div class="stage__hint">drag the torso to push · ${d(e.ffMode)}</div>
      <canvas></canvas>
    </div>
    <div class="panel controls">
      <div class="ctrl-row">
        <label>feedforward</label>
        <div class="seg" data-seg="ff">
          <button data-v="0">none</button><button data-v="1">oracle</button><button data-v="2">observer</button>
        </div>
      </div>
      <label class="toggle"><input type="checkbox" data-k="stepping" checked /> reactive stepping (capture-point + RHACV gate)</label>
      <div class="ctrl-row">
        <label>push strength · <span data-out="pushN"></span> N</label>
        <input type="range" data-k="pushN" min="40" max="320" step="10" />
      </div>
      <div class="ctrl-row">
        <label>contact-force noise &sigma; · <span data-out="sigmaF"></span> N</label>
        <input type="range" data-k="sigmaF" min="0" max="12" step="0.5" />
      </div>
      <div class="row">
        <button class="btn btn--push" data-act="pushL">push &larr;</button>
        <button class="btn btn--push" data-act="pushR">push &rarr;</button>
        <button class="btn" data-act="reset">reset</button>
      </div>
      <div class="readouts">
        <div><div class="ro__lab">capture point</div><div class="ro__val" data-ro="cap">0.00 m</div></div>
        <div><div class="ro__lab">CoP</div><div class="ro__val" data-ro="cop">0.00 m</div></div>
        <div><div class="ro__lab">observer |Ŵ|</div><div class="ro__val" data-ro="fhat">0 N</div></div>
        <div><div class="ro__lab">status</div><div class="ro__val" data-ro="stat">balancing</div></div>
      </div>
    </div>`;const r=i.querySelector("canvas"),a=r.getContext("2d"),o=i.querySelector(".stage__hint"),l=A=>i.querySelector(`[data-ro="${A}"]`);u("ff",e.ffMode),i.querySelector('[data-k="stepping"]').checked=!!e.stepping;for(const A of["pushN","sigmaF"]){const I=i.querySelector(`[data-k="${A}"]`);I.value=e[A],i.querySelector(`[data-out="${A}"]`).textContent=e[A]}function u(A,I){i.querySelectorAll(`[data-seg="${A}"] button`).forEach(q=>q.classList.toggle("on",+q.dataset.v===I))}function d(A){return A===0?"no feedforward":A===1?"oracle feedforward":"observer feedforward"}i.querySelector('[data-seg="ff"]').addEventListener("click",A=>{const I=A.target.closest("button");I&&(e.ffMode=+I.dataset.v,u("ff",e.ffMode),s(),o.innerHTML=`drag the torso to push · ${d(e.ffMode)}`)}),i.querySelector('[data-k="stepping"]').addEventListener("change",A=>{e.stepping=A.target.checked?1:0,s()});for(const A of["pushN","sigmaF"])i.querySelector(`[data-k="${A}"]`).addEventListener("input",I=>{e[A]=+I.target.value,i.querySelector(`[data-out="${A}"]`).textContent=e[A],s()});i.querySelector('[data-act="pushL"]').addEventListener("click",()=>n.applyPush(-e.pushN,0,.12)),i.querySelector('[data-act="pushR"]').addEventListener("click",()=>n.applyPush(e.pushN,0,.12)),i.querySelector('[data-act="reset"]').addEventListener("click",()=>{n.reset()});const f=920,p=540,m=Math.min(2,window.devicePixelRatio||1);r.width=f*m,r.height=p*m,r.style.aspectRatio=`${f}/${p}`,a.scale(m,m);const _=2.6,M=f/_,c=f/2,h=p-96,E=A=>c+A*M,x=A=>h-A*M;let b=null;r.addEventListener("pointerdown",A=>{const I=r.getBoundingClientRect();b={x:(A.clientX-I.left)/I.width*f,t:performance.now()},r.setPointerCapture(A.pointerId)}),r.addEventListener("pointerup",A=>{if(!b)return;const I=r.getBoundingClientRect(),O=(A.clientX-I.left)/I.width*f-b.x,K=Math.max(-320,Math.min(320,O*1.6));Math.abs(K)>12&&n.applyPush(K,0,.12),b=null});const D=[];let C=0,R=performance.now(),T=0;const W=.004;function g(A){for(C+=Math.min(.05,(A-R)/1e3),R=A;C>=W;)n.step(W),C-=W;const I=n.getState();I.fell?(T+=1,T>80&&(n.reset(),T=0,D.length=0)):T=0,D.push(I.capX),D.length>90&&D.shift(),v(I),requestAnimationFrame(g)}requestAnimationFrame(g);function v(A){a.clearRect(0,0,f,p),a.strokeStyle="#1e2a3e",a.lineWidth=1,a.beginPath(),a.moveTo(0,h),a.lineTo(f,h),a.stroke(),a.strokeStyle="#141c2b";for(let et=-1.2;et<=1.2;et+=.25)a.beginPath(),a.moveTo(E(et),40),a.lineTo(E(et),h),a.stroke();const I=E(A.supX-e.xBack),q=E(A.supX+e.xFront);a.fillStyle="rgba(94,234,212,0.08)",a.fillRect(I,40,q-I,h-40),a.fillStyle=A.stepping?"#3b4a63":"#2b6e63",_a(a,I,h-5,q-I,11,4),a.fill(),a.strokeStyle="rgba(251,191,36,0.25)",a.lineWidth=1.5,a.beginPath(),D.forEach((et,vt)=>{const Pt=E(et),j=h-2-vt*.15;vt?a.lineTo(Pt,j):a.moveTo(Pt,j)}),a.stroke();const O=A.copSat>.5;a.fillStyle=O?"#f87171":"#7fb6ff",a.beginPath(),a.moveTo(E(A.copX),h-1),a.lineTo(E(A.copX)-7,h+12),a.lineTo(E(A.copX)+7,h+12),a.closePath(),a.fill();const K=E(A.comX),z=x(e.height);a.strokeStyle="#46556e",a.lineWidth=6,a.lineCap="round",a.beginPath(),a.moveTo(E(A.copX),h),a.lineTo(K,z),a.stroke(),a.fillStyle="#cdd9ea",_a(a,K-13,z-30,26,44,8),a.fill(),a.fillStyle="#5eead4",a.beginPath(),a.arc(K,z,7,0,7),a.fill();const nt=A.capX<=A.supX+e.xFront&&A.capX>=A.supX-e.xBack;if(a.setLineDash([4,4]),a.strokeStyle=nt?"rgba(251,191,36,0.5)":"rgba(248,113,113,0.6)",a.lineWidth=1,a.beginPath(),a.moveTo(E(A.capX),z),a.lineTo(E(A.capX),h),a.stroke(),a.setLineDash([]),a.fillStyle=nt?"#fbbf24":"#f87171",yl(a,E(A.capX),h-2,6),a.fill(),Math.abs(A.fExtX)>1&&L(a,K,z-6,A.fExtX,"#f87171","push"),e.ffMode>0&&Math.abs(A.fHatX)>4){const et=e.ffMode===1?"#60a5fa":"#5eead4";L(a,K,z+8,A.fHatX,et,e.ffMode===1?"oracle":"Ŵ")}l("cap").textContent=A.capX.toFixed(3)+" m",l("cap").className="ro__val"+(nt?"":" bad"),l("cop").textContent=A.copX.toFixed(3)+" m"+(O?"  ⛒":""),l("cop").className="ro__val"+(O?" warn":""),l("fhat").textContent=Math.round(Math.hypot(A.fHatX,A.fHatY))+" N";const J=A.fell?"FELL":A.stepping?"stepping":"balancing";l("stat").textContent=J+(A.steps?`  (${A.steps})`:""),l("stat").className="ro__val"+(A.fell?" bad":A.stepping?" warn":" good")}function L(A,I,q,O,K,z){const nt=Math.max(-90,Math.min(90,O*.45));A.strokeStyle=K,A.fillStyle=K,A.lineWidth=3,A.lineCap="round",A.beginPath(),A.moveTo(I,q),A.lineTo(I+nt,q),A.stroke();const J=Math.sign(nt)||1;A.beginPath(),A.moveTo(I+nt,q),A.lineTo(I+nt-9*J,q-5),A.lineTo(I+nt-9*J,q+5),A.closePath(),A.fill(),A.font="11px JetBrains Mono",A.fillText(z,I+nt+4*J-(J<0?26:0),q-7)}}function _a(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function yl(i,t,e,n){i.beginPath(),i.moveTo(t,e-n),i.lineTo(t+n,e),i.lineTo(t,e+n),i.lineTo(t-n,e),i.closePath()}const ut={grid:"#141c2b",axis:"#2a3a52",dim:"#9fb0c6",faint:"#6b7c95",teal:"#5eead4",blue:"#60a5fa",red:"#f87171",amber:"#fbbf24"};function bi(i,t,e){const n=document.createElement("canvas"),s=Math.min(2,window.devicePixelRatio||1);n.width=t*s,n.height=e*s,n.style.width="100%",n.style.height="auto",n.style.aspectRatio=`${t}/${e}`,n.style.display="block",i.appendChild(n);const r=n.getContext("2d");return r.scale(s,s),{cv:n,ctx:r,W:t,H:e}}function jt(i,t,e,n,s,r,a=1,o=null){i.save(),o&&i.setLineDash(o),i.strokeStyle=r,i.lineWidth=a,i.beginPath(),i.moveTo(t,e),i.lineTo(n,s),i.stroke(),i.restore()}function Dn(i,t,e,n,s){i.fillStyle=s,i.beginPath(),i.arc(t,e,n,0,7),i.fill()}function Wt(i,t,e,n,s,r="12px JetBrains Mono",a="left"){i.fillStyle=s,i.font=r,i.textAlign=a,i.fillText(t,e,n),i.textAlign="left"}function To(i,t,e,n=null,s=1){i.beginPath(),t.forEach(([r,a],o)=>o?i.lineTo(r,a):i.moveTo(r,a)),i.closePath(),e&&(i.fillStyle=e,i.fill()),n&&(i.strokeStyle=n,i.lineWidth=s,i.stroke())}function El(i,t,e,n,s,r,a=2.5){const o=Math.hypot(n,s);if(o<.5)return;const l=n/o,u=s/o;i.strokeStyle=r,i.fillStyle=r,i.lineWidth=a,i.lineCap="round",i.beginPath(),i.moveTo(t,e),i.lineTo(t+n,e+s),i.stroke();const d=7;i.beginPath(),i.moveTo(t+n,e+s),i.lineTo(t+n-d*l-d*.6*u,e+s-d*u+d*.6*l),i.lineTo(t+n-d*l+d*.6*u,e+s-d*u-d*.6*l),i.closePath(),i.fill()}const bl=9.81;function Tl(i){const t={height:.79,xFront:.1,xBack:.05,kDcm:.4,xi0:.1,seed:.004,n:60},e=()=>Math.sqrt(bl/t.height);i.innerHTML=`
    <div class="panel stage">
      <div class="stage__hint">phase plane (c, ċ) · divergent mode ξ̇ = ω·ξ</div>
      <div data-cv></div>
    </div>
    <div class="panel controls">
      <div class="ctrl-row">
        <label>initial DCM ξ₀ vs the boundary ξ = x_front · <span data-out="xi0"></span> m</label>
        <input type="range" data-k="xi0" min="0.0" max="0.20" step="0.005" />
      </div>
      <div class="ctrl-row">
        <label>seed dispersion σ (jitter, finite precision…) · <span data-out="seed"></span> m</label>
        <input type="range" data-k="seed" min="0.0001" max="0.02" step="0.0001" />
      </div>
      <div class="row">
        <button class="btn" data-act="launch">launch ${t.n} seeded runs</button>
        <button class="btn" data-act="clear">clear</button>
      </div>
      <div class="readouts">
        <div><div class="ro__lab">Lyapunov exponent</div><div class="ro__val good" data-ro="lyap">+3.52 /s</div></div>
        <div><div class="ro__lab">doubling time ln2/ω</div><div class="ro__val" data-ro="dbl">0.197 s</div></div>
        <div><div class="ro__lab">seed spread @ 0.8 s</div><div class="ro__val warn" data-ro="spread">—</div></div>
        <div><div class="ro__lab">outcome</div><div class="ro__val" data-ro="out">—</div></div>
      </div>
      <p class="thm__note">Deep inside the boundary every seed recovers — runs reproduce. On the line, the +ω
      mode amplifies any seed past the foot edge and the split becomes a coin-flip: <em>non-determinism in
      a deterministic simulator</em>.</p>
    </div>`;const n=i.querySelector("[data-cv]"),{ctx:s,W:r,H:a}=bi(n,920,540),o=T=>i.querySelector(`[data-ro="${T}"]`);for(const T of["xi0","seed"]){const W=i.querySelector(`[data-k="${T}"]`);W.value=t[T],i.querySelector(`[data-out="${T}"]`).textContent=l(t[T],T),W.addEventListener("input",g=>{t[T]=+g.target.value,i.querySelector(`[data-out="${T}"]`).textContent=l(t[T],T),C()})}function l(T,W){return W==="seed"?T.toFixed(4):T.toFixed(3)}const u=r*.5,d=a*.5,f=(r-120)/1.1,p=(a-80)/5.2,m=T=>u+T*f,_=T=>d-T*p;function M(T,W,g){const v=e(),L=T+W/v;let A=(1+t.kDcm)*L;A=Math.min(Math.max(A,-t.xBack),t.xFront);const I=v*v*(T-A);return W+=I*g,T+=W*g,[T,W,A]}function c(T,W){let g=T,v=W;const L=.004,A=[];let I=!1;for(let O=0;O<750;O++)if(A.push([g,v]),[g,v]=M(g,v,L),Math.abs(g)>.95){I=!0;break}const q=g+v/e();return!I&&Math.abs(q)>.5&&(I=!0),{pts:A,fell:I}}let h=[],E=0;function x(){const T=e(),W=T*t.xi0;h=[];for(let v=0;v<t.n;v++){const L=D()*t.seed;h.push(c(0,W+T*L))}E=0;const g=h.filter(v=>v.fell).length;o("out").textContent=`${t.n-g} recover · ${g} fall`,o("out").className="ro__val"+(g===0?" good":g===t.n?" bad":" warn"),o("spread").textContent=(t.seed*Math.exp(T*.8)*1e3).toFixed(0)+" mm"}let b=12345;function D(){const T=v=>(b=1103515245*v+12345&2147483647,b/2147483647),W=Math.max(1e-9,T(b)),g=T(b);return Math.sqrt(-2*Math.log(W))*Math.cos(6.283185*g)}i.querySelector('[data-act="launch"]').addEventListener("click",x),i.querySelector('[data-act="clear"]').addEventListener("click",()=>{h=[],C()});function C(){s.clearRect(0,0,r,a);const T=e();jt(s,0,_(0),r,_(0),ut.axis,1),jt(s,m(0),0,m(0),a,ut.axis,1);for(let v=-.5;v<=.5;v+=.1)Math.abs(v)>1e-6&&jt(s,m(v),0,m(v),a,ut.grid,1);for(let v=-2;v<=2;v+=1)v&&jt(s,0,_(v),r,_(v),ut.grid,1);Wt(s,"c  [m]",r-56,_(0)-8,ut.faint,"12px JetBrains Mono"),Wt(s,"ċ  [m/s]",m(0)+8,18,ut.faint,"12px JetBrains Mono"),jt(s,m(-t.xBack),_(0),m(t.xFront),_(0),ut.teal,5),Wt(s,"foot",m(t.xFront)+6,_(0)+16,ut.teal,"11px JetBrains Mono"),jt(s,m(-.5),_(.5*T),m(.5),_(-.5*T),ut.teal,1.5,[6,5]),Wt(s,"stable manifold  ξ = 0",m(-.5)+6,_(.5*T)-6,ut.teal,"11px JetBrains Mono");const W=-.5,g=.5;jt(s,m(W),_(T*(t.xFront-W)),m(g),_(T*(t.xFront-g)),ut.red,1.8),Wt(s,"recovery boundary  ξ = x_front",m(.16),_(T*(t.xFront-.16))-8,ut.red,"11px JetBrains Mono"),To(s,[[m(W),_(T*(t.xFront-W))],[m(g),_(T*(t.xFront-g))],[m(g),0],[m(W),0]],"rgba(248,113,113,0.05)"),Dn(s,m(0),_(T*t.xi0),4,ut.amber),Wt(s,"ξ₀",m(0)+8,_(T*t.xi0)-6,ut.amber,"11px JetBrains Mono"),o("lyap").textContent="+"+T.toFixed(2)+" /s",o("dbl").textContent=(Math.log(2)/T).toFixed(3)+" s"}function R(){if(C(),h.length){E=Math.min(E+6,750);for(const T of h){s.strokeStyle=T.fell?"rgba(248,113,113,0.6)":"rgba(94,234,212,0.6)",s.lineWidth=1.5,s.beginPath();const W=Math.min(E,T.pts.length);for(let g=0;g<W;g++){const[v,L]=T.pts[g];g?s.lineTo(m(v),_(L)):s.moveTo(m(v),_(L))}if(s.stroke(),W>0&&W<T.pts.length){const[g,v]=T.pts[W-1];Dn(s,m(g),_(v),2,T.fell?ut.red:ut.teal)}}}requestAnimationFrame(R)}C(),requestAnimationFrame(R),x()}const Al=9.81,wl=35.11,Ao=.79,ga=Math.sqrt(Al/Ao),Rl=ga*ga*.1;function Cl(i,t){const e={pushN:180,dur:.04},n=new t.Sim;i.innerHTML=`
    <div class="panel stage">
      <div class="stage__hint">left: the real observer band-limits the impulse · right: where each peak lands in the mpQP partition</div>
      <div data-cv></div>
    </div>
    <div class="panel controls">
      <div class="ctrl-row">
        <label>push magnitude · <span data-out="pushN"></span> N</label>
        <input type="range" data-k="pushN" min="60" max="320" step="10" />
      </div>
      <div class="ctrl-row">
        <label>impulse sharpness · <span data-out="dur"></span> s contact</label>
        <input type="range" data-k="dur" min="0.03" max="0.16" step="0.005" />
      </div>
      <div class="readouts">
        <div><div class="ro__lab">oracle peak |θ|</div><div class="ro__val" data-ro="orc" style="color:var(--blue)">— N</div></div>
        <div><div class="ro__lab">observer peak |θ̂|</div><div class="ro__val good" data-ro="obs">— N</div></div>
        <div><div class="ro__lab">peak attenuation</div><div class="ro__val" data-ro="att">—</div></div>
        <div><div class="ro__lab">saturation ω²·x_front</div><div class="ro__val" data-ro="sat">1.24 m/s²</div></div>
      </div>
      <p class="thm__note">The oracle dumps the full, sharp peak; the cascaded observer (triple pole at −α)
      <em>band-limits</em> it into a lower, smoother peak. A smaller peak stays inside the productive
      critical region instead of over-committing past the foot facet — the sharper the push, the larger
      that gap. The measured recovery envelope (Results) is where this pays off.</p>
    </div>`;const s=i.querySelector("[data-cv]"),{ctx:r,W:a,H:o}=bi(s,920,540),l=_=>i.querySelector(`[data-ro="${_}"]`);for(const _ of["pushN","dur"]){const M=i.querySelector(`[data-k="${_}"]`);M.value=e[_],i.querySelector(`[data-out="${_}"]`).textContent=_==="dur"?e[_].toFixed(3):e[_],M.addEventListener("input",c=>{e[_]=+c.target.value,i.querySelector(`[data-out="${_}"]`).textContent=_==="dur"?e[_].toFixed(3):e[_],d()})}let u={t:[],fTrue:[],fObs:[],orc:0,obs:0};function d(){n.setParams(wl,Ao,.12,.05,.1,1.6,2,1,70,0,0,.1),n.reset();const _=.004;for(let b=0;b<40;b++)n.step(_);n.applyPush(e.pushN,0,e.dur);const M=[],c=[],h=[];let E=0,x=0;for(let b=0;b<170;b++){n.step(_);const D=n.getState();M.push(b*_),c.push(D.fExtX),h.push(D.fHatX),E=Math.max(E,Math.abs(D.fExtX)),x=Math.max(x,Math.abs(D.fHatX))}u={t:M,fTrue:c,fObs:h,orc:E,obs:x,dt:_},l("orc").textContent=Math.round(E)+" N",l("obs").textContent=Math.round(x)+" N",l("att").textContent=E>0?(100*(1-x/E)).toFixed(0)+" % lower peak":"—",f()}function f(){r.clearRect(0,0,a,o);const _={x:70,y:56,w:470,h:o-130};p(_,"band-limiting · external force seen by the feedforward");const M=u.t[u.t.length-1]||.6,c=Math.max(u.orc,1)*1.15,h=L=>_.x+L/M*_.w,E=L=>_.y+_.h-L/c*_.h;jt(r,_.x,E(0),_.x+_.w,E(0),ut.axis,1);for(let L=50;L<=c;L+=50)jt(r,_.x,E(L),_.x+_.w,E(L),ut.grid,1),Wt(r,L+"",_.x-8,E(L)+4,ut.faint,"10px JetBrains Mono","right");Wt(r,"force [N]",_.x-8,_.y-8,ut.faint,"11px JetBrains Mono","right"),Wt(r,"time [s]",_.x+_.w,E(0)+18,ut.faint,"11px JetBrains Mono","right");for(let L=.2;L<M;L+=.2)Wt(r,L.toFixed(1),h(L),E(0)+16,ut.faint,"10px JetBrains Mono","center");m(u.t,u.fTrue,h,E,ut.blue,2),m(u.t,u.fObs,h,E,ut.teal,2.5),jt(r,_.x,E(u.orc),_.x+_.w,E(u.orc),"rgba(96,165,250,0.35)",1,[4,4]),jt(r,_.x,E(u.obs),_.x+_.w,E(u.obs),"rgba(94,234,212,0.45)",1,[4,4]),Wt(r,"oracle θ (true)",_.x+_.w-6,E(u.orc)-6,ut.blue,"11px JetBrains Mono","right"),Wt(r,"observer θ̂",_.x+_.w-6,E(u.obs)+16,ut.teal,"11px JetBrains Mono","right");const x={x:600,y:56,w:270,h:o-130};p(x,"mpQP partition  u₀*(θ) = Kᵤθ + k");const b=.58,D=x.y+x.h,C=x.y+22,R=x.y+x.h*.3,T=x.x+x.w*b;To(r,[[T,C],[x.x+x.w,C],[x.x+x.w,D],[T,D]],"rgba(248,113,113,0.06)"),jt(r,x.x,D,x.x+x.w,D,ut.axis,1),jt(r,x.x,D,T,R,ut.teal,2.5),jt(r,T,R,x.x+x.w,R,ut.red,2.5),jt(r,x.x,R,x.x+x.w,R,"rgba(248,113,113,0.25)",1,[4,4]),jt(r,T,C,T,D,"rgba(231,237,245,0.18)",1,[3,4]),Wt(r,"facet active",T+5,C+12,ut.dim,"10px JetBrains Mono"),Wt(r,"(CoP at toe)",T+5,C+26,ut.faint,"10px JetBrains Mono"),Wt(r,"a_restore",x.x-6,x.y+8,ut.faint,"10px JetBrains Mono","right"),Wt(r,Rl.toFixed(2),x.x-6,R+4,ut.red,"10px JetBrains Mono","right"),Wt(r,"|θ| →",x.x+x.w,D+16,ut.faint,"11px JetBrains Mono","right"),Wt(r,"productive",x.x+8,D-10,ut.teal,"10px JetBrains Mono"),Wt(r,"saturated",T+6,D-10,ut.red,"10px JetBrains Mono");const W=Math.max(u.orc,1)*1.25,g=L=>x.x+Math.min(L/W,1)*x.w,v=(L,A,I,q)=>{const O=g(L),z=O<T?D+(R-D)*((O-x.x)/(T-x.x)):R;jt(r,O,D,O,z,A,1.4,[3,3]),Dn(r,O,z,4,A),Wt(r,I,O+6,z+(q?-8:18),A,"10px JetBrains Mono")};v(u.orc,ut.blue,"oracle",!0),v(u.obs,ut.teal,"obs",!1)}function p(_,M){r.strokeStyle=ut.grid,r.lineWidth=1,r.strokeRect(_.x,_.y,_.w,_.h),Wt(r,M,_.x,_.y-12,ut.dim,"11px JetBrains Mono")}function m(_,M,c,h,E,x){r.strokeStyle=E,r.lineWidth=x,r.beginPath();for(let b=0;b<_.length;b++){const D=c(_[b]),C=h(Math.abs(M[b]));b?r.lineTo(D,C):r.moveTo(D,C)}r.stroke()}d()}function Pl(i,t){const e={omegaR:18,sigma:.05,margin:.06,gate:!1,gateAdd:.09};i.innerHTML=`
    <div class="panel stage">
      <div class="stage__hint">noisy trigger signal · ✕ = false up-crossing of the level</div>
      <div data-cv></div>
    </div>
    <div class="panel controls">
      <div class="ctrl-row">
        <label>noise σ · <span data-out="sigma"></span> m</label>
        <input type="range" data-k="sigma" min="0.02" max="0.12" step="0.005" />
      </div>
      <div class="ctrl-row">
        <label>trigger margin u · <span data-out="margin"></span> m</label>
        <input type="range" data-k="margin" min="0.02" max="0.20" step="0.005" />
      </div>
      <div class="ctrl-row">
        <label>spectral width Ω_R · <span data-out="omegaR"></span> rad/s</label>
        <input type="range" data-k="omegaR" min="8" max="28" step="1" />
      </div>
      <label class="toggle"><input type="checkbox" data-k="gate" /> RHACV gate (raises the effective margin)</label>
      <div class="readouts">
        <div><div class="ro__lab">margin z = u/σ</div><div class="ro__val" data-ro="z">—</div></div>
        <div><div class="ro__lab">predicted ν⁺ (Rice)</div><div class="ro__val" data-ro="nu">—</div></div>
        <div><div class="ro__lab">mean time between</div><div class="ro__val" data-ro="mtbf">—</div></div>
        <div><div class="ro__lab">counted (live)</div><div class="ro__val" data-ro="emp">—</div></div>
      </div>
      <p class="thm__note">Push z past ≈3 and the exponential <em>floor</em> falls off a cliff: a 2× rise in
      margin can cut false triggers a thousand-fold. That is why the deployable gate adds a filtered-velocity
      condition — it raises z, not ω.</p>
    </div>`;const n=i.querySelector("[data-cv]"),{ctx:s,W:r,H:a}=bi(n,920,540),o=v=>i.querySelector(`[data-ro="${v}"]`);for(const v of["sigma","margin","omegaR"]){const L=i.querySelector(`[data-k="${v}"]`);L.value=e[v],i.querySelector(`[data-out="${v}"]`).textContent=v==="omegaR"?e[v]:e[v].toFixed(3),L.addEventListener("input",A=>{e[v]=+A.target.value,i.querySelector(`[data-out="${v}"]`).textContent=v==="omegaR"?e[v]:e[v].toFixed(3),b()})}i.querySelector('[data-k="gate"]').addEventListener("change",v=>{e.gate=v.target.checked,D()});const l=56,u=60,d=.004,f=Math.floor(u/d);let p=[],m=[],_=[],M=[],c=0;function h(){p=[],m=[];let v=20260615;const L=()=>(v=1103515245*v+12345&2147483647,v/2147483647);let A=0;for(let q=0;q<l;q++){const O=e.omegaR*(.65+.7*(q/(l-1)));p.push(O),m.push(6.283185*L()),A+=O*O}c=Math.sqrt(A/l);const I=e.sigma*Math.sqrt(2/l);_=new Float32Array(f),M=new Float32Array(f);for(let q=0;q<f;q++){const O=q*d;let K=0,z=0;for(let nt=0;nt<l;nt++){const J=p[nt]*O+m[nt];K+=Math.cos(J),z+=-p[nt]*Math.sin(J)}_[q]=I*K,M[q]=I*z}}function E(){return e.margin+(e.gate?e.gateAdd:0)}function x(){const v=E();let L=0;for(let A=1;A<f;A++)_[A-1]<v&&_[A]>=v&&L++;return L/u}function b(){h(),D()}function D(){const v=E(),L=t.riceRate(c,v,e.sigma);o("z").textContent=(v/e.sigma).toFixed(2),o("z").className="ro__val"+(v/e.sigma>3?" good":v/e.sigma<1.5?" bad":" warn"),o("nu").textContent=L>=.01?L.toFixed(2)+" /s":L.toExponential(1)+" /s",o("mtbf").textContent=L>1e-9?C(1/L):"∞",o("emp").textContent=x().toFixed(2)+" /s"}function C(v){return v<90?v.toFixed(1)+" s":v<5400?(v/60).toFixed(1)+" min":v<13e4?(v/3600).toFixed(1)+" h":(v/86400).toFixed(1)+" d"}const R=5,T={x:60,y:40,w:r-90,h:a-110};let W=0;function g(){W+=.9*d*6,W>u-R&&(W=0);const v=E();s.clearRect(0,0,r,a),s.strokeStyle=ut.grid,s.strokeRect(T.x,T.y,T.w,T.h);const L=.26,A=K=>T.y+T.h/2-K/L*(T.h/2),I=K=>T.x+(K-W)/R*T.w;s.fillStyle="rgba(96,165,250,0.06)",s.fillRect(T.x,A(e.sigma),T.w,A(-e.sigma)-A(e.sigma)),jt(s,T.x,A(0),T.x+T.w,A(0),ut.axis,1),Wt(s,"+σ",T.x+4,A(e.sigma)-4,ut.faint,"10px JetBrains Mono"),jt(s,T.x,A(v),T.x+T.w,A(v),e.gate?ut.teal:ut.amber,1.8,[6,4]),Wt(s,e.gate?"level u + gate":"level u",T.x+T.w-6,A(v)-6,e.gate?ut.teal:ut.amber,"11px JetBrains Mono","right"),e.gate&&(jt(s,T.x,A(e.margin),T.x+T.w,A(e.margin),"rgba(251,191,36,0.3)",1,[3,4]),Wt(s,"u (ungated)",T.x+6,A(e.margin)-4,"rgba(251,191,36,0.5)","10px JetBrains Mono"));const q=Math.max(1,Math.floor(W/d)),O=Math.min(f-1,Math.floor((W+R)/d));s.strokeStyle=ut.dim,s.lineWidth=1.6,s.beginPath();for(let K=q;K<=O;K++){const z=I(K*d),nt=A(_[K]);K===q?s.moveTo(z,nt):s.lineTo(z,nt)}s.stroke();for(let K=q;K<=O;K++)if(_[K-1]<v&&_[K]>=v){const z=I(K*d),nt=A(v);s.strokeStyle=ut.red,s.lineWidth=1.6,s.beginPath(),s.moveTo(z-5,nt-5),s.lineTo(z+5,nt+5),s.moveTo(z+5,nt-5),s.lineTo(z-5,nt+5),s.stroke()}Wt(s,"trigger signal [m]",T.x,T.y-12,ut.dim,"11px JetBrains Mono"),Wt(s,"time →",T.x+T.w,T.y+T.h+18,ut.faint,"11px JetBrains Mono","right"),requestAnimationFrame(g)}b(),requestAnimationFrame(g)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $r="169",ni={ROTATE:0,DOLLY:1,PAN:2},Qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ll=0,va=1,Dl=2,wo=1,Ul=2,Qe=3,gn=0,be=1,tn=2,mn=0,ii=1,xa=2,Ma=3,Sa=4,Il=5,Rn=100,Nl=101,Fl=102,Ol=103,Bl=104,zl=200,kl=201,Hl=202,Gl=203,or=204,lr=205,Vl=206,Wl=207,Xl=208,ql=209,Yl=210,Kl=211,jl=212,$l=213,Zl=214,cr=0,hr=1,ur=2,ai=3,dr=4,fr=5,pr=6,mr=7,Ro=0,Jl=1,Ql=2,_n=0,tc=1,ec=2,nc=3,ic=4,sc=5,rc=6,ac=7,Co=300,oi=301,li=302,_r=303,gr=304,_s=306,vr=1e3,Pn=1001,xr=1002,Ie=1003,oc=1004,Pi=1005,ze=1006,Rs=1007,Ln=1008,sn=1009,Po=1010,Lo=1011,Ei=1012,Zr=1013,Un=1014,en=1015,Ti=1016,Jr=1017,Qr=1018,ci=1020,Do=35902,Uo=1021,Io=1022,He=1023,No=1024,Fo=1025,si=1026,hi=1027,Oo=1028,ta=1029,Bo=1030,ea=1031,na=1033,es=33776,ns=33777,is=33778,ss=33779,Mr=35840,Sr=35841,yr=35842,Er=35843,br=36196,Tr=37492,Ar=37496,wr=37808,Rr=37809,Cr=37810,Pr=37811,Lr=37812,Dr=37813,Ur=37814,Ir=37815,Nr=37816,Fr=37817,Or=37818,Br=37819,zr=37820,kr=37821,rs=36492,Hr=36494,Gr=36495,zo=36283,Vr=36284,Wr=36285,Xr=36286,lc=3200,cc=3201,ko=0,hc=1,fn="",Ve="srgb",xn="srgb-linear",ia="display-p3",gs="display-p3-linear",cs="linear",ee="srgb",hs="rec709",us="p3",zn=7680,ya=519,uc=512,dc=513,fc=514,Ho=515,pc=516,mc=517,_c=518,gc=519,Ea=35044,ba="300 es",nn=2e3,ds=2001;class Fn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],as=Math.PI/180,qr=180/Math.PI;function Ai(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function xe(i,t,e){return Math.max(t,Math.min(e,i))}function vc(i,t){return(i%t+t)%t}function Cs(i,t,e){return(1-e)*i+e*t}function mi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ye(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const xc={DEG2RAD:as};class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(t,e,n,s,r,a,o,l,u){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,u)}set(t,e,n,s,r,a,o,l,u){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],u=n[1],d=n[4],f=n[7],p=n[2],m=n[5],_=n[8],M=s[0],c=s[3],h=s[6],E=s[1],x=s[4],b=s[7],D=s[2],C=s[5],R=s[8];return r[0]=a*M+o*E+l*D,r[3]=a*c+o*x+l*C,r[6]=a*h+o*b+l*R,r[1]=u*M+d*E+f*D,r[4]=u*c+d*x+f*C,r[7]=u*h+d*b+f*R,r[2]=p*M+m*E+_*D,r[5]=p*c+m*x+_*C,r[8]=p*h+m*b+_*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],u=t[7],d=t[8];return e*a*d-e*o*u-n*r*d+n*o*l+s*r*u-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],u=t[7],d=t[8],f=d*a-o*u,p=o*l-d*r,m=u*r-a*l,_=e*f+n*p+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return t[0]=f*M,t[1]=(s*u-d*n)*M,t[2]=(o*n-s*a)*M,t[3]=p*M,t[4]=(d*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=m*M,t[7]=(n*l-u*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),u=Math.sin(r);return this.set(n*l,n*u,-n*(l*a+u*o)+a+t,-s*u,s*l,-s*(-u*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ps.makeScale(t,e)),this}rotate(t){return this.premultiply(Ps.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ps.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ps=new It;function Go(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mc(){const i=fs("canvas");return i.style.display="block",i}const Ta={};function os(i){i in Ta||(Ta[i]=!0,console.warn(i))}function Sc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function yc(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ec(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Aa=new It().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wa=new It().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_i={[xn]:{transfer:cs,primaries:hs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ve]:{transfer:ee,primaries:hs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[gs]:{transfer:cs,primaries:us,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(wa),fromReference:i=>i.applyMatrix3(Aa)},[ia]:{transfer:ee,primaries:us,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(wa),fromReference:i=>i.applyMatrix3(Aa).convertLinearToSRGB()}},bc=new Set([xn,gs]),Yt={enabled:!0,_workingColorSpace:xn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!bc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=_i[t].toReference,s=_i[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return _i[i].primaries},getTransfer:function(i){return i===fn?cs:_i[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(_i[t].luminanceCoefficients)}};function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let kn;class Tc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{kn===void 0&&(kn=fs("canvas")),kn.width=t.width,kn.height=t.height;const n=kn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=kn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ri(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ri(e[n]/255)*255):e[n]=ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ac=0;class Vo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ac++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ds(s[a].image)):r.push(Ds(s[a]))}else r=Ds(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ds(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wc=0;class Te extends Fn{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,n=Pn,s=Pn,r=ze,a=Ln,o=He,l=sn,u=Te.DEFAULT_ANISOTROPY,d=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wc++}),this.uuid=Ai(),this.name="",this.source=new Vo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Co)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vr:t.x=t.x-Math.floor(t.x);break;case Pn:t.x=t.x<0?0:1;break;case xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vr:t.y=t.y-Math.floor(t.y);break;case Pn:t.y=t.y<0?0:1;break;case xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=Co;Te.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,s=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,u=l[0],d=l[4],f=l[8],p=l[1],m=l[5],_=l[9],M=l[2],c=l[6],h=l[10];if(Math.abs(d-p)<.01&&Math.abs(f-M)<.01&&Math.abs(_-c)<.01){if(Math.abs(d+p)<.1&&Math.abs(f+M)<.1&&Math.abs(_+c)<.1&&Math.abs(u+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(u+1)/2,b=(m+1)/2,D=(h+1)/2,C=(d+p)/4,R=(f+M)/4,T=(_+c)/4;return x>b&&x>D?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=C/n,r=R/n):b>D?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=C/s,r=T/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=R/r,s=T/r),this.set(n,s,r,e),this}let E=Math.sqrt((c-_)*(c-_)+(f-M)*(f-M)+(p-d)*(p-d));return Math.abs(E)<.001&&(E=1),this.x=(c-_)/E,this.y=(f-M)/E,this.z=(p-d)/E,this.w=Math.acos((u+m+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rc extends Fn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Te(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Vo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends Rc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Wo extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cc extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],u=n[s+1],d=n[s+2],f=n[s+3];const p=r[a+0],m=r[a+1],_=r[a+2],M=r[a+3];if(o===0){t[e+0]=l,t[e+1]=u,t[e+2]=d,t[e+3]=f;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=M;return}if(f!==M||l!==p||u!==m||d!==_){let c=1-o;const h=l*p+u*m+d*_+f*M,E=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const D=Math.sqrt(x),C=Math.atan2(D,h*E);c=Math.sin(c*C)/D,o=Math.sin(o*C)/D}const b=o*E;if(l=l*c+p*b,u=u*c+m*b,d=d*c+_*b,f=f*c+M*b,c===1-o){const D=1/Math.sqrt(l*l+u*u+d*d+f*f);l*=D,u*=D,d*=D,f*=D}}t[e]=l,t[e+1]=u,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],u=n[s+2],d=n[s+3],f=r[a],p=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+d*f+l*m-u*p,t[e+1]=l*_+d*p+u*f-o*m,t[e+2]=u*_+d*m+o*p-l*f,t[e+3]=d*_-o*f-l*p-u*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,u=o(n/2),d=o(s/2),f=o(r/2),p=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=p*d*f+u*m*_,this._y=u*m*f-p*d*_,this._z=u*d*_+p*m*f,this._w=u*d*f-p*m*_;break;case"YXZ":this._x=p*d*f+u*m*_,this._y=u*m*f-p*d*_,this._z=u*d*_-p*m*f,this._w=u*d*f+p*m*_;break;case"ZXY":this._x=p*d*f-u*m*_,this._y=u*m*f+p*d*_,this._z=u*d*_+p*m*f,this._w=u*d*f-p*m*_;break;case"ZYX":this._x=p*d*f-u*m*_,this._y=u*m*f+p*d*_,this._z=u*d*_-p*m*f,this._w=u*d*f+p*m*_;break;case"YZX":this._x=p*d*f+u*m*_,this._y=u*m*f+p*d*_,this._z=u*d*_-p*m*f,this._w=u*d*f-p*m*_;break;case"XZY":this._x=p*d*f-u*m*_,this._y=u*m*f-p*d*_,this._z=u*d*_+p*m*f,this._w=u*d*f+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],u=e[2],d=e[6],f=e[10],p=n+o+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-u)*m,this._z=(a-s)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(d-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+u)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(r-u)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-s)/m,this._x=(r+u)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,u=e._z,d=e._w;return this._x=n*d+a*o+s*u-r*l,this._y=s*d+a*l+r*o-n*u,this._z=r*d+a*u+n*l-s*o,this._w=a*d-n*o-s*l-r*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const u=Math.sqrt(l),d=Math.atan2(u,o),f=Math.sin((1-e)*d)/u,p=Math.sin(e*d)/u;return this._w=a*f+this._w*p,this._x=n*f+this._x*p,this._y=s*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ra.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ra.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,u=2*(a*s-o*n),d=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*u+a*f-o*d,this.y=n+l*d+o*u-r*f,this.z=s+l*f+r*d-a*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Us.copy(this).projectOnVector(t),this.sub(Us)}reflect(t){return this.sub(Us.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Us=new B,Ra=new Nn;class wi{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Fe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Fe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Fe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Fe):Fe.fromBufferAttribute(r,a),Fe.applyMatrix4(t.matrixWorld),this.expandByPoint(Fe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Li.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Li.copy(n.boundingBox)),Li.applyMatrix4(t.matrixWorld),this.union(Li)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fe),Fe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gi),Di.subVectors(this.max,gi),Hn.subVectors(t.a,gi),Gn.subVectors(t.b,gi),Vn.subVectors(t.c,gi),an.subVectors(Gn,Hn),on.subVectors(Vn,Gn),Sn.subVectors(Hn,Vn);let e=[0,-an.z,an.y,0,-on.z,on.y,0,-Sn.z,Sn.y,an.z,0,-an.x,on.z,0,-on.x,Sn.z,0,-Sn.x,-an.y,an.x,0,-on.y,on.x,0,-Sn.y,Sn.x,0];return!Is(e,Hn,Gn,Vn,Di)||(e=[1,0,0,0,1,0,0,0,1],!Is(e,Hn,Gn,Vn,Di))?!1:(Ui.crossVectors(an,on),e=[Ui.x,Ui.y,Ui.z],Is(e,Hn,Gn,Vn,Di))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ke[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ke[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ke[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ke[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ke[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ke[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ke[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ke[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ke),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ke=[new B,new B,new B,new B,new B,new B,new B,new B],Fe=new B,Li=new wi,Hn=new B,Gn=new B,Vn=new B,an=new B,on=new B,Sn=new B,gi=new B,Di=new B,Ui=new B,yn=new B;function Is(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){yn.fromArray(i,r);const o=s.x*Math.abs(yn.x)+s.y*Math.abs(yn.y)+s.z*Math.abs(yn.z),l=t.dot(yn),u=e.dot(yn),d=n.dot(yn);if(Math.max(-Math.max(l,u,d),Math.min(l,u,d))>o)return!1}return!0}const Pc=new wi,vi=new B,Ns=new B;class vs{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Pc.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vi.subVectors(t,this.center);const e=vi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(vi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ns.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vi.copy(t.center).add(Ns)),this.expandByPoint(vi.copy(t.center).sub(Ns))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const je=new B,Fs=new B,Ii=new B,ln=new B,Os=new B,Ni=new B,Bs=new B;class sa{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,je)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=je.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(je.copy(this.origin).addScaledVector(this.direction,e),je.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fs.copy(t).add(e).multiplyScalar(.5),Ii.copy(e).sub(t).normalize(),ln.copy(this.origin).sub(Fs);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ii),o=ln.dot(this.direction),l=-ln.dot(Ii),u=ln.lengthSq(),d=Math.abs(1-a*a);let f,p,m,_;if(d>0)if(f=a*l-o,p=a*o-l,_=r*d,f>=0)if(p>=-_)if(p<=_){const M=1/d;f*=M,p*=M,m=f*(f+a*p+2*o)+p*(a*f+p+2*l)+u}else p=r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+u;else p=-r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+u;else p<=-_?(f=Math.max(0,-(-a*r+o)),p=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+p*(p+2*l)+u):p<=_?(f=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+u):(f=Math.max(0,-(a*r+o)),p=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+p*(p+2*l)+u);else p=a>0?-r:r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Fs).addScaledVector(Ii,p),m}intersectSphere(t,e){je.subVectors(t.center,this.origin);const n=je.dot(this.direction),s=je.dot(je)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const u=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,p=this.origin;return u>=0?(n=(t.min.x-p.x)*u,s=(t.max.x-p.x)*u):(n=(t.max.x-p.x)*u,s=(t.min.x-p.x)*u),d>=0?(r=(t.min.y-p.y)*d,a=(t.max.y-p.y)*d):(r=(t.max.y-p.y)*d,a=(t.min.y-p.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-p.z)*f,l=(t.max.z-p.z)*f):(o=(t.max.z-p.z)*f,l=(t.min.z-p.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,je)!==null}intersectTriangle(t,e,n,s,r){Os.subVectors(e,t),Ni.subVectors(n,t),Bs.crossVectors(Os,Ni);let a=this.direction.dot(Bs),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ln.subVectors(this.origin,t);const l=o*this.direction.dot(Ni.crossVectors(ln,Ni));if(l<0)return null;const u=o*this.direction.dot(Os.cross(ln));if(u<0||l+u>a)return null;const d=-o*ln.dot(Bs);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,s,r,a,o,l,u,d,f,p,m,_,M,c){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,u,d,f,p,m,_,M,c)}set(t,e,n,s,r,a,o,l,u,d,f,p,m,_,M,c){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=u,h[6]=d,h[10]=f,h[14]=p,h[3]=m,h[7]=_,h[11]=M,h[15]=c,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Wn.setFromMatrixColumn(t,0).length(),r=1/Wn.setFromMatrixColumn(t,1).length(),a=1/Wn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),u=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=a*d,m=a*f,_=o*d,M=o*f;e[0]=l*d,e[4]=-l*f,e[8]=u,e[1]=m+_*u,e[5]=p-M*u,e[9]=-o*l,e[2]=M-p*u,e[6]=_+m*u,e[10]=a*l}else if(t.order==="YXZ"){const p=l*d,m=l*f,_=u*d,M=u*f;e[0]=p+M*o,e[4]=_*o-m,e[8]=a*u,e[1]=a*f,e[5]=a*d,e[9]=-o,e[2]=m*o-_,e[6]=M+p*o,e[10]=a*l}else if(t.order==="ZXY"){const p=l*d,m=l*f,_=u*d,M=u*f;e[0]=p-M*o,e[4]=-a*f,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*d,e[9]=M-p*o,e[2]=-a*u,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const p=a*d,m=a*f,_=o*d,M=o*f;e[0]=l*d,e[4]=_*u-m,e[8]=p*u+M,e[1]=l*f,e[5]=M*u+p,e[9]=m*u-_,e[2]=-u,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const p=a*l,m=a*u,_=o*l,M=o*u;e[0]=l*d,e[4]=M-p*f,e[8]=_*f+m,e[1]=f,e[5]=a*d,e[9]=-o*d,e[2]=-u*d,e[6]=m*f+_,e[10]=p-M*f}else if(t.order==="XZY"){const p=a*l,m=a*u,_=o*l,M=o*u;e[0]=l*d,e[4]=-f,e[8]=u*d,e[1]=p*f+M,e[5]=a*d,e[9]=m*f-_,e[2]=_*f-m,e[6]=o*d,e[10]=M*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lc,t,Dc)}lookAt(t,e,n){const s=this.elements;return Ce.subVectors(t,e),Ce.lengthSq()===0&&(Ce.z=1),Ce.normalize(),cn.crossVectors(n,Ce),cn.lengthSq()===0&&(Math.abs(n.z)===1?Ce.x+=1e-4:Ce.z+=1e-4,Ce.normalize(),cn.crossVectors(n,Ce)),cn.normalize(),Fi.crossVectors(Ce,cn),s[0]=cn.x,s[4]=Fi.x,s[8]=Ce.x,s[1]=cn.y,s[5]=Fi.y,s[9]=Ce.y,s[2]=cn.z,s[6]=Fi.z,s[10]=Ce.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],u=n[12],d=n[1],f=n[5],p=n[9],m=n[13],_=n[2],M=n[6],c=n[10],h=n[14],E=n[3],x=n[7],b=n[11],D=n[15],C=s[0],R=s[4],T=s[8],W=s[12],g=s[1],v=s[5],L=s[9],A=s[13],I=s[2],q=s[6],O=s[10],K=s[14],z=s[3],nt=s[7],J=s[11],et=s[15];return r[0]=a*C+o*g+l*I+u*z,r[4]=a*R+o*v+l*q+u*nt,r[8]=a*T+o*L+l*O+u*J,r[12]=a*W+o*A+l*K+u*et,r[1]=d*C+f*g+p*I+m*z,r[5]=d*R+f*v+p*q+m*nt,r[9]=d*T+f*L+p*O+m*J,r[13]=d*W+f*A+p*K+m*et,r[2]=_*C+M*g+c*I+h*z,r[6]=_*R+M*v+c*q+h*nt,r[10]=_*T+M*L+c*O+h*J,r[14]=_*W+M*A+c*K+h*et,r[3]=E*C+x*g+b*I+D*z,r[7]=E*R+x*v+b*q+D*nt,r[11]=E*T+x*L+b*O+D*J,r[15]=E*W+x*A+b*K+D*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],u=t[13],d=t[2],f=t[6],p=t[10],m=t[14],_=t[3],M=t[7],c=t[11],h=t[15];return _*(+r*l*f-s*u*f-r*o*p+n*u*p+s*o*m-n*l*m)+M*(+e*l*m-e*u*p+r*a*p-s*a*m+s*u*d-r*l*d)+c*(+e*u*f-e*o*m-r*a*f+n*a*m+r*o*d-n*u*d)+h*(-s*o*d-e*l*f+e*o*p+s*a*f-n*a*p+n*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],u=t[7],d=t[8],f=t[9],p=t[10],m=t[11],_=t[12],M=t[13],c=t[14],h=t[15],E=f*c*u-M*p*u+M*l*m-o*c*m-f*l*h+o*p*h,x=_*p*u-d*c*u-_*l*m+a*c*m+d*l*h-a*p*h,b=d*M*u-_*f*u+_*o*m-a*M*m-d*o*h+a*f*h,D=_*f*l-d*M*l-_*o*p+a*M*p+d*o*c-a*f*c,C=e*E+n*x+s*b+r*D;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=E*R,t[1]=(M*p*r-f*c*r-M*s*m+n*c*m+f*s*h-n*p*h)*R,t[2]=(o*c*r-M*l*r+M*s*u-n*c*u-o*s*h+n*l*h)*R,t[3]=(f*l*r-o*p*r-f*s*u+n*p*u+o*s*m-n*l*m)*R,t[4]=x*R,t[5]=(d*c*r-_*p*r+_*s*m-e*c*m-d*s*h+e*p*h)*R,t[6]=(_*l*r-a*c*r-_*s*u+e*c*u+a*s*h-e*l*h)*R,t[7]=(a*p*r-d*l*r+d*s*u-e*p*u-a*s*m+e*l*m)*R,t[8]=b*R,t[9]=(_*f*r-d*M*r-_*n*m+e*M*m+d*n*h-e*f*h)*R,t[10]=(a*M*r-_*o*r+_*n*u-e*M*u-a*n*h+e*o*h)*R,t[11]=(d*o*r-a*f*r-d*n*u+e*f*u+a*n*m-e*o*m)*R,t[12]=D*R,t[13]=(d*M*s-_*f*s+_*n*p-e*M*p-d*n*c+e*f*c)*R,t[14]=(_*o*s-a*M*s-_*n*l+e*M*l+a*n*c-e*o*c)*R,t[15]=(a*f*s-d*o*s+d*n*l-e*f*l-a*n*p+e*o*p)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,u=r*a,d=r*o;return this.set(u*a+n,u*o-s*l,u*l+s*o,0,u*o+s*l,d*o+n,d*l-s*a,0,u*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,u=r+r,d=a+a,f=o+o,p=r*u,m=r*d,_=r*f,M=a*d,c=a*f,h=o*f,E=l*u,x=l*d,b=l*f,D=n.x,C=n.y,R=n.z;return s[0]=(1-(M+h))*D,s[1]=(m+b)*D,s[2]=(_-x)*D,s[3]=0,s[4]=(m-b)*C,s[5]=(1-(p+h))*C,s[6]=(c+E)*C,s[7]=0,s[8]=(_+x)*R,s[9]=(c-E)*R,s[10]=(1-(p+M))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Wn.set(s[0],s[1],s[2]).length();const a=Wn.set(s[4],s[5],s[6]).length(),o=Wn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Oe.copy(this);const u=1/r,d=1/a,f=1/o;return Oe.elements[0]*=u,Oe.elements[1]*=u,Oe.elements[2]*=u,Oe.elements[4]*=d,Oe.elements[5]*=d,Oe.elements[6]*=d,Oe.elements[8]*=f,Oe.elements[9]*=f,Oe.elements[10]*=f,e.setFromRotationMatrix(Oe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=nn){const l=this.elements,u=2*r/(e-t),d=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let m,_;if(o===nn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ds)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=nn){const l=this.elements,u=1/(e-t),d=1/(n-s),f=1/(a-r),p=(e+t)*u,m=(n+s)*d;let _,M;if(o===nn)_=(a+r)*f,M=-2*f;else if(o===ds)_=r*f,M=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=M,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wn=new B,Oe=new ne,Lc=new B(0,0,0),Dc=new B(1,1,1),cn=new B,Fi=new B,Ce=new B,Ca=new ne,Pa=new Nn;class qe{constructor(t=0,e=0,n=0,s=qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],u=s[5],d=s[9],f=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,u),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ca.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ca,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Pa.setFromEuler(this),this.setFromQuaternion(Pa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qe.DEFAULT_ORDER="XYZ";class Xo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uc=0;const La=new B,Xn=new Nn,$e=new ne,Oi=new B,xi=new B,Ic=new B,Nc=new Nn,Da=new B(1,0,0),Ua=new B(0,1,0),Ia=new B(0,0,1),Na={type:"added"},Fc={type:"removed"},qn={type:"childadded",child:null},zs={type:"childremoved",child:null};class de extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uc++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new B,e=new qe,n=new Nn,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new It}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xn.setFromAxisAngle(t,e),this.quaternion.multiply(Xn),this}rotateOnWorldAxis(t,e){return Xn.setFromAxisAngle(t,e),this.quaternion.premultiply(Xn),this}rotateX(t){return this.rotateOnAxis(Da,t)}rotateY(t){return this.rotateOnAxis(Ua,t)}rotateZ(t){return this.rotateOnAxis(Ia,t)}translateOnAxis(t,e){return La.copy(t).applyQuaternion(this.quaternion),this.position.add(La.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Da,t)}translateY(t){return this.translateOnAxis(Ua,t)}translateZ(t){return this.translateOnAxis(Ia,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($e.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oi.copy(t):Oi.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),xi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$e.lookAt(xi,Oi,this.up):$e.lookAt(Oi,xi,this.up),this.quaternion.setFromRotationMatrix($e),s&&($e.extractRotation(s.matrixWorld),Xn.setFromRotationMatrix($e),this.quaternion.premultiply(Xn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Na),qn.child=t,this.dispatchEvent(qn),qn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fc),zs.child=t,this.dispatchEvent(zs),zs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$e.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$e.multiply(t.parent.matrixWorld)),t.applyMatrix4($e),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Na),qn.child=t,this.dispatchEvent(qn),qn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xi,t,Ic),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xi,Nc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){const f=l[u];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),p=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const u in o){const d=o[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}de.DEFAULT_UP=new B(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Be=new B,Ze=new B,ks=new B,Je=new B,Yn=new B,Kn=new B,Fa=new B,Hs=new B,Gs=new B,Vs=new B,Ws=new se,Xs=new se,qs=new se;class ke{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Be.subVectors(t,e),s.cross(Be);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Be.subVectors(s,e),Ze.subVectors(n,e),ks.subVectors(t,e);const a=Be.dot(Be),o=Be.dot(Ze),l=Be.dot(ks),u=Ze.dot(Ze),d=Ze.dot(ks),f=a*u-o*o;if(f===0)return r.set(0,0,0),null;const p=1/f,m=(u*l-o*d)*p,_=(a*d-o*l)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Je)===null?!1:Je.x>=0&&Je.y>=0&&Je.x+Je.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Je)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Je.x),l.addScaledVector(a,Je.y),l.addScaledVector(o,Je.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ws.setScalar(0),Xs.setScalar(0),qs.setScalar(0),Ws.fromBufferAttribute(t,e),Xs.fromBufferAttribute(t,n),qs.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ws,r.x),a.addScaledVector(Xs,r.y),a.addScaledVector(qs,r.z),a}static isFrontFacing(t,e,n,s){return Be.subVectors(n,e),Ze.subVectors(t,e),Be.cross(Ze).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Be.subVectors(this.c,this.b),Ze.subVectors(this.a,this.b),Be.cross(Ze).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ke.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Yn.subVectors(s,n),Kn.subVectors(r,n),Hs.subVectors(t,n);const l=Yn.dot(Hs),u=Kn.dot(Hs);if(l<=0&&u<=0)return e.copy(n);Gs.subVectors(t,s);const d=Yn.dot(Gs),f=Kn.dot(Gs);if(d>=0&&f<=d)return e.copy(s);const p=l*f-d*u;if(p<=0&&l>=0&&d<=0)return a=l/(l-d),e.copy(n).addScaledVector(Yn,a);Vs.subVectors(t,r);const m=Yn.dot(Vs),_=Kn.dot(Vs);if(_>=0&&m<=_)return e.copy(r);const M=m*u-l*_;if(M<=0&&u>=0&&_<=0)return o=u/(u-_),e.copy(n).addScaledVector(Kn,o);const c=d*_-m*f;if(c<=0&&f-d>=0&&m-_>=0)return Fa.subVectors(r,s),o=(f-d)/(f-d+(m-_)),e.copy(s).addScaledVector(Fa,o);const h=1/(c+M+p);return a=M*h,o=p*h,e.copy(n).addScaledVector(Yn,a).addScaledVector(Kn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const qo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hn={h:0,s:0,l:0},Bi={h:0,s:0,l:0};function Ys(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=vc(t,1),e=xe(e,0,1),n=xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ys(a,r,t+1/3),this.g=Ys(a,r,t),this.b=Ys(a,r,t-1/3)}return Yt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=qo[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ri(t.r),this.g=ri(t.g),this.b=ri(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return Yt.fromWorkingColorSpace(ge.copy(this),t),Math.round(xe(ge.r*255,0,255))*65536+Math.round(xe(ge.g*255,0,255))*256+Math.round(xe(ge.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(ge.copy(this),e);const n=ge.r,s=ge.g,r=ge.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,u;const d=(o+a)/2;if(o===a)l=0,u=0;else{const f=a-o;switch(u=d<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=u,t.l=d,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(ge.copy(this),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=Ve){Yt.fromWorkingColorSpace(ge.copy(this),t);const e=ge.r,n=ge.g,s=ge.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(hn),this.setHSL(hn.h+t,hn.s+e,hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(hn),t.getHSL(Bi);const n=Cs(hn.h,Bi.h,e),s=Cs(hn.s,Bi.s,e),r=Cs(hn.l,Bi.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ge=new Nt;Nt.NAMES=qo;let Oc=0;class di extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Oc++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=ii,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=or,this.blendDst=lr,this.blendEquation=Rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ya,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zn,this.stencilZFail=zn,this.stencilZPass=zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ii&&(n.blending=this.blending),this.side!==gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==or&&(n.blendSrc=this.blendSrc),this.blendDst!==lr&&(n.blendDst=this.blendDst),this.blendEquation!==Rn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ai&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ya&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yo extends di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const oe=new B,zi=new Dt;class Xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ea,this.updateRanges=[],this.gpuType=en,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zi.fromBufferAttribute(this,e),zi.applyMatrix3(t),this.setXY(e,zi.x,zi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix3(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix4(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyNormalMatrix(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.transformDirection(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ye(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array),s=ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array),s=ye(s,this.array),r=ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ea&&(t.usage=this.usage),t}}class Ko extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jo extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class me extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Bc=0;const Ue=new ne,Ks=new de,jn=new B,Pe=new wi,Mi=new wi,ue=new B;class Ge extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Go(t)?jo:Ko)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new It().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ue.makeRotationFromQuaternion(t),this.applyMatrix4(Ue),this}rotateX(t){return Ue.makeRotationX(t),this.applyMatrix4(Ue),this}rotateY(t){return Ue.makeRotationY(t),this.applyMatrix4(Ue),this}rotateZ(t){return Ue.makeRotationZ(t),this.applyMatrix4(Ue),this}translate(t,e,n){return Ue.makeTranslation(t,e,n),this.applyMatrix4(Ue),this}scale(t,e,n){return Ue.makeScale(t,e,n),this.applyMatrix4(Ue),this}lookAt(t){return Ks.lookAt(t),Ks.updateMatrix(),this.applyMatrix4(Ks.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(jn).negate(),this.translate(jn.x,jn.y,jn.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Pe.setFromBufferAttribute(r),this.morphTargetsRelative?(ue.addVectors(this.boundingBox.min,Pe.min),this.boundingBox.expandByPoint(ue),ue.addVectors(this.boundingBox.max,Pe.max),this.boundingBox.expandByPoint(ue)):(this.boundingBox.expandByPoint(Pe.min),this.boundingBox.expandByPoint(Pe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(Pe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Mi.setFromBufferAttribute(o),this.morphTargetsRelative?(ue.addVectors(Pe.min,Mi.min),Pe.expandByPoint(ue),ue.addVectors(Pe.max,Mi.max),Pe.expandByPoint(ue)):(Pe.expandByPoint(Mi.min),Pe.expandByPoint(Mi.max))}Pe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ue));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let u=0,d=o.count;u<d;u++)ue.fromBufferAttribute(o,u),l&&(jn.fromBufferAttribute(t,u),ue.add(jn)),s=Math.max(s,n.distanceToSquared(ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new B,l[T]=new B;const u=new B,d=new B,f=new B,p=new Dt,m=new Dt,_=new Dt,M=new B,c=new B;function h(T,W,g){u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,W),f.fromBufferAttribute(n,g),p.fromBufferAttribute(r,T),m.fromBufferAttribute(r,W),_.fromBufferAttribute(r,g),d.sub(u),f.sub(u),m.sub(p),_.sub(p);const v=1/(m.x*_.y-_.x*m.y);isFinite(v)&&(M.copy(d).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(v),c.copy(f).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(v),o[T].add(M),o[W].add(M),o[g].add(M),l[T].add(c),l[W].add(c),l[g].add(c))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let T=0,W=E.length;T<W;++T){const g=E[T],v=g.start,L=g.count;for(let A=v,I=v+L;A<I;A+=3)h(t.getX(A+0),t.getX(A+1),t.getX(A+2))}const x=new B,b=new B,D=new B,C=new B;function R(T){D.fromBufferAttribute(s,T),C.copy(D);const W=o[T];x.copy(W),x.sub(D.multiplyScalar(D.dot(W))).normalize(),b.crossVectors(C,W);const v=b.dot(l[T])<0?-1:1;a.setXYZW(T,x.x,x.y,x.z,v)}for(let T=0,W=E.length;T<W;++T){const g=E[T],v=g.start,L=g.count;for(let A=v,I=v+L;A<I;A+=3)R(t.getX(A+0)),R(t.getX(A+1)),R(t.getX(A+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new B,r=new B,a=new B,o=new B,l=new B,u=new B,d=new B,f=new B;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),M=t.getX(p+1),c=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,c),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,M),u.fromBufferAttribute(n,c),o.add(d),l.add(d),u.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(c,u.x,u.y,u.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ue.fromBufferAttribute(t,e),ue.normalize(),t.setXYZ(e,ue.x,ue.y,ue.z)}toNonIndexed(){function t(o,l){const u=o.array,d=o.itemSize,f=o.normalized,p=new u.constructor(l.length*d);let m=0,_=0;for(let M=0,c=l.length;M<c;M++){o.isInterleavedBufferAttribute?m=l[M]*o.data.stride+o.offset:m=l[M]*d;for(let h=0;h<d;h++)p[_++]=u[m++]}return new Xe(p,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],u=t(l,n);e.setAttribute(o,u)}const r=this.morphAttributes;for(const o in r){const l=[],u=r[o];for(let d=0,f=u.length;d<f;d++){const p=u[d],m=t(p,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(t[u]=l[u]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const u=n[l];t.data.attributes[l]=u.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],d=[];for(let f=0,p=u.length;f<p;f++){const m=u[f];d.push(m.toJSON(t.data))}d.length>0&&(s[l]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const u in s){const d=s[u];this.setAttribute(u,d.clone(e))}const r=t.morphAttributes;for(const u in r){const d=[],f=r[u];for(let p=0,m=f.length;p<m;p++)d.push(f[p].clone(e));this.morphAttributes[u]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let u=0,d=a.length;u<d;u++){const f=a[u];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oa=new ne,En=new sa,ki=new vs,Ba=new B,Hi=new B,Gi=new B,Vi=new B,js=new B,Wi=new B,za=new B,Xi=new B;class pe extends de{constructor(t=new Ge,e=new Yo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Wi.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const d=o[l],f=r[l];d!==0&&(js.fromBufferAttribute(f,t),a?Wi.addScaledVector(js,d):Wi.addScaledVector(js.sub(e),d))}e.add(Wi)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(r),En.copy(t.ray).recast(t.near),!(ki.containsPoint(En.origin)===!1&&(En.intersectSphere(ki,Ba)===null||En.origin.distanceToSquared(Ba)>(t.far-t.near)**2))&&(Oa.copy(r).invert(),En.copy(t.ray).applyMatrix4(Oa),!(n.boundingBox!==null&&En.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,En)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,u=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=p.length;_<M;_++){const c=p[_],h=a[c.materialIndex],E=Math.max(c.start,m.start),x=Math.min(o.count,Math.min(c.start+c.count,m.start+m.count));for(let b=E,D=x;b<D;b+=3){const C=o.getX(b),R=o.getX(b+1),T=o.getX(b+2);s=qi(this,h,t,n,u,d,f,C,R,T),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=c.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let c=_,h=M;c<h;c+=3){const E=o.getX(c),x=o.getX(c+1),b=o.getX(c+2);s=qi(this,a,t,n,u,d,f,E,x,b),s&&(s.faceIndex=Math.floor(c/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=p.length;_<M;_++){const c=p[_],h=a[c.materialIndex],E=Math.max(c.start,m.start),x=Math.min(l.count,Math.min(c.start+c.count,m.start+m.count));for(let b=E,D=x;b<D;b+=3){const C=b,R=b+1,T=b+2;s=qi(this,h,t,n,u,d,f,C,R,T),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=c.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let c=_,h=M;c<h;c+=3){const E=c,x=c+1,b=c+2;s=qi(this,a,t,n,u,d,f,E,x,b),s&&(s.faceIndex=Math.floor(c/3),e.push(s))}}}}function zc(i,t,e,n,s,r,a,o){let l;if(t.side===be?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===gn,o),l===null)return null;Xi.copy(o),Xi.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(Xi);return u<e.near||u>e.far?null:{distance:u,point:Xi.clone(),object:i}}function qi(i,t,e,n,s,r,a,o,l,u){i.getVertexPosition(o,Hi),i.getVertexPosition(l,Gi),i.getVertexPosition(u,Vi);const d=zc(i,t,e,n,Hi,Gi,Vi,za);if(d){const f=new B;ke.getBarycoord(za,Hi,Gi,Vi,f),s&&(d.uv=ke.getInterpolatedAttribute(s,o,l,u,f,new Dt)),r&&(d.uv1=ke.getInterpolatedAttribute(r,o,l,u,f,new Dt)),a&&(d.normal=ke.getInterpolatedAttribute(a,o,l,u,f,new B),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:l,c:u,normal:new B,materialIndex:0};ke.getNormal(Hi,Gi,Vi,p.normal),d.face=p,d.barycoord=f}return d}class On extends Ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],u=[],d=[],f=[];let p=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new me(u,3)),this.setAttribute("normal",new me(d,3)),this.setAttribute("uv",new me(f,2));function _(M,c,h,E,x,b,D,C,R,T,W){const g=b/R,v=D/T,L=b/2,A=D/2,I=C/2,q=R+1,O=T+1;let K=0,z=0;const nt=new B;for(let J=0;J<O;J++){const et=J*v-A;for(let vt=0;vt<q;vt++){const Pt=vt*g-L;nt[M]=Pt*E,nt[c]=et*x,nt[h]=I,u.push(nt.x,nt.y,nt.z),nt[M]=0,nt[c]=0,nt[h]=C>0?1:-1,d.push(nt.x,nt.y,nt.z),f.push(vt/R),f.push(1-J/T),K+=1}}for(let J=0;J<T;J++)for(let et=0;et<R;et++){const vt=p+et+q*J,Pt=p+et+q*(J+1),j=p+(et+1)+q*(J+1),Q=p+(et+1)+q*J;l.push(vt,Pt,Q),l.push(Pt,j,Q),z+=6}o.addGroup(m,z,W),m+=z,p+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new On(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ui(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ve(i){const t={};for(let e=0;e<i.length;e++){const n=ui(i[e]);for(const s in n)t[s]=n[s]}return t}function kc(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function $o(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const Hc={clone:ui,merge:ve};var Gc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gc,this.fragmentShader=Vc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ui(t.uniforms),this.uniformsGroups=kc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Zo extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=nn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const un=new B,ka=new Dt,Ha=new Dt;class Le extends Zo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(un.x,un.y).multiplyScalar(-t/un.z),un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(un.x,un.y).multiplyScalar(-t/un.z)}getViewSize(t,e){return this.getViewBounds(t,ka,Ha),e.subVectors(Ha,ka)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(as*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/u,s*=a.width/l,n*=a.height/u}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $n=-90,Zn=1;class Wc extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Le($n,Zn,t,e);s.layers=this.layers,this.add(s);const r=new Le($n,Zn,t,e);r.layers=this.layers,this.add(r);const a=new Le($n,Zn,t,e);a.layers=this.layers,this.add(a);const o=new Le($n,Zn,t,e);o.layers=this.layers,this.add(o);const l=new Le($n,Zn,t,e);l.layers=this.layers,this.add(l);const u=new Le($n,Zn,t,e);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const u of e)this.remove(u);if(t===nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const u of e)this.add(u),u.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,u,d]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,u),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(f,p,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Jo extends Te{constructor(t,e,n,s,r,a,o,l,u,d){t=t!==void 0?t:[],e=e!==void 0?e:oi,super(t,e,n,s,r,a,o,l,u,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xc extends In{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Jo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new On(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:be,blending:mn});r.uniforms.tEquirect.value=e;const a=new pe(s,r),o=e.minFilter;return e.minFilter===Ln&&(e.minFilter=ze),new Wc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const $s=new B,qc=new B,Yc=new It;class dn{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=$s.subVectors(n,e).cross(qc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta($s),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Yc.getNormalMatrix(t),s=this.coplanarPoint($s).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bn=new vs,Yi=new B;class ra{constructor(t=new dn,e=new dn,n=new dn,s=new dn,r=new dn,a=new dn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=nn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],u=s[4],d=s[5],f=s[6],p=s[7],m=s[8],_=s[9],M=s[10],c=s[11],h=s[12],E=s[13],x=s[14],b=s[15];if(n[0].setComponents(l-r,p-u,c-m,b-h).normalize(),n[1].setComponents(l+r,p+u,c+m,b+h).normalize(),n[2].setComponents(l+a,p+d,c+_,b+E).normalize(),n[3].setComponents(l-a,p-d,c-_,b-E).normalize(),n[4].setComponents(l-o,p-f,c-M,b-x).normalize(),e===nn)n[5].setComponents(l+o,p+f,c+M,b+x).normalize();else if(e===ds)n[5].setComponents(o,f,M,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bn)}intersectsSprite(t){return bn.center.set(0,0,0),bn.radius=.7071067811865476,bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(bn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Yi.x=s.normal.x>0?t.max.x:t.min.x,Yi.y=s.normal.y>0?t.max.y:t.min.y,Yi.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yi)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qo(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kc(i){const t=new WeakMap;function e(o,l){const u=o.array,d=o.usage,f=u.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,u,d),o.onUploadCallback();let m;if(u instanceof Float32Array)m=i.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=i.SHORT;else if(u instanceof Uint32Array)m=i.UNSIGNED_INT;else if(u instanceof Int32Array)m=i.INT;else if(u instanceof Int8Array)m=i.BYTE;else if(u instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,u){const d=l.array,f=l.updateRanges;if(i.bindBuffer(u,o),f.length===0)i.bufferSubData(u,0,d);else{f.sort((m,_)=>m.start-_.start);let p=0;for(let m=1;m<f.length;m++){const _=f[p],M=f[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++p,f[p]=M)}f.length=p+1;for(let m=0,_=f.length;m<_;m++){const M=f[m];i.bufferSubData(u,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=t.get(o);if(u===void 0)t.set(o,e(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,l),u.version=o.version}}return{get:s,remove:r,update:a}}class fi extends Ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),u=o+1,d=l+1,f=t/o,p=e/l,m=[],_=[],M=[],c=[];for(let h=0;h<d;h++){const E=h*p-a;for(let x=0;x<u;x++){const b=x*f-r;_.push(b,-E,0),M.push(0,0,1),c.push(x/o),c.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<o;E++){const x=E+u*h,b=E+u*(h+1),D=E+1+u*(h+1),C=E+1+u*h;m.push(x,b,C),m.push(b,D,C)}this.setIndex(m),this.setAttribute("position",new me(_,3)),this.setAttribute("normal",new me(M,3)),this.setAttribute("uv",new me(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fi(t.width,t.height,t.widthSegments,t.heightSegments)}}var jc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$c=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ih=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ah=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ch=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Th="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ah=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ih=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Oh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,su=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ru=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,au=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ou=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,du=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_u=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Su=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Eu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Au=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ru=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Du=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Iu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ou=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ku=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ku=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ju=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ju=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,td=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ed=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,id=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,sd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ad=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,od=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ld=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ud=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,md=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_d=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Md=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ed=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Td=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ad=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:jc,alphahash_pars_fragment:$c,alphamap_fragment:Zc,alphamap_pars_fragment:Jc,alphatest_fragment:Qc,alphatest_pars_fragment:th,aomap_fragment:eh,aomap_pars_fragment:nh,batching_pars_vertex:ih,batching_vertex:sh,begin_vertex:rh,beginnormal_vertex:ah,bsdfs:oh,iridescence_fragment:lh,bumpmap_pars_fragment:ch,clipping_planes_fragment:hh,clipping_planes_pars_fragment:uh,clipping_planes_pars_vertex:dh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:_h,color_vertex:gh,common:vh,cube_uv_reflection_fragment:xh,defaultnormal_vertex:Mh,displacementmap_pars_vertex:Sh,displacementmap_vertex:yh,emissivemap_fragment:Eh,emissivemap_pars_fragment:bh,colorspace_fragment:Th,colorspace_pars_fragment:Ah,envmap_fragment:wh,envmap_common_pars_fragment:Rh,envmap_pars_fragment:Ch,envmap_pars_vertex:Ph,envmap_physical_pars_fragment:Hh,envmap_vertex:Lh,fog_vertex:Dh,fog_pars_vertex:Uh,fog_fragment:Ih,fog_pars_fragment:Nh,gradientmap_pars_fragment:Fh,lightmap_pars_fragment:Oh,lights_lambert_fragment:Bh,lights_lambert_pars_fragment:zh,lights_pars_begin:kh,lights_toon_fragment:Gh,lights_toon_pars_fragment:Vh,lights_phong_fragment:Wh,lights_phong_pars_fragment:Xh,lights_physical_fragment:qh,lights_physical_pars_fragment:Yh,lights_fragment_begin:Kh,lights_fragment_maps:jh,lights_fragment_end:$h,logdepthbuf_fragment:Zh,logdepthbuf_pars_fragment:Jh,logdepthbuf_pars_vertex:Qh,logdepthbuf_vertex:tu,map_fragment:eu,map_pars_fragment:nu,map_particle_fragment:iu,map_particle_pars_fragment:su,metalnessmap_fragment:ru,metalnessmap_pars_fragment:au,morphinstance_vertex:ou,morphcolor_vertex:lu,morphnormal_vertex:cu,morphtarget_pars_vertex:hu,morphtarget_vertex:uu,normal_fragment_begin:du,normal_fragment_maps:fu,normal_pars_fragment:pu,normal_pars_vertex:mu,normal_vertex:_u,normalmap_pars_fragment:gu,clearcoat_normal_fragment_begin:vu,clearcoat_normal_fragment_maps:xu,clearcoat_pars_fragment:Mu,iridescence_pars_fragment:Su,opaque_fragment:yu,packing:Eu,premultiplied_alpha_fragment:bu,project_vertex:Tu,dithering_fragment:Au,dithering_pars_fragment:wu,roughnessmap_fragment:Ru,roughnessmap_pars_fragment:Cu,shadowmap_pars_fragment:Pu,shadowmap_pars_vertex:Lu,shadowmap_vertex:Du,shadowmask_pars_fragment:Uu,skinbase_vertex:Iu,skinning_pars_vertex:Nu,skinning_vertex:Fu,skinnormal_vertex:Ou,specularmap_fragment:Bu,specularmap_pars_fragment:zu,tonemapping_fragment:ku,tonemapping_pars_fragment:Hu,transmission_fragment:Gu,transmission_pars_fragment:Vu,uv_pars_fragment:Wu,uv_pars_vertex:Xu,uv_vertex:qu,worldpos_vertex:Yu,background_vert:Ku,background_frag:ju,backgroundCube_vert:$u,backgroundCube_frag:Zu,cube_vert:Ju,cube_frag:Qu,depth_vert:td,depth_frag:ed,distanceRGBA_vert:nd,distanceRGBA_frag:id,equirect_vert:sd,equirect_frag:rd,linedashed_vert:ad,linedashed_frag:od,meshbasic_vert:ld,meshbasic_frag:cd,meshlambert_vert:hd,meshlambert_frag:ud,meshmatcap_vert:dd,meshmatcap_frag:fd,meshnormal_vert:pd,meshnormal_frag:md,meshphong_vert:_d,meshphong_frag:gd,meshphysical_vert:vd,meshphysical_frag:xd,meshtoon_vert:Md,meshtoon_frag:Sd,points_vert:yd,points_frag:Ed,shadow_vert:bd,shadow_frag:Td,sprite_vert:Ad,sprite_frag:wd},at={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},We={basic:{uniforms:ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:ve([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:ve([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:ve([at.points,at.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:ve([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:ve([at.common,at.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:ve([at.sprite,at.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:ve([at.common,at.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:ve([at.lights,at.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};We.physical={uniforms:ve([We.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const Ki={r:0,b:0,g:0},Tn=new qe,Rd=new ne;function Cd(i,t,e,n,s,r,a){const o=new Nt(0);let l=r===!0?0:1,u,d,f=null,p=0,m=null;function _(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?e:t).get(x)),x}function M(E){let x=!1;const b=_(E);b===null?h(o,l):b&&b.isColor&&(h(b,1),x=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function c(E,x){const b=_(x);b&&(b.isCubeTexture||b.mapping===_s)?(d===void 0&&(d=new pe(new On(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:ui(We.backgroundCube.uniforms),vertexShader:We.backgroundCube.vertexShader,fragmentShader:We.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Tn.copy(x.backgroundRotation),Tn.x*=-1,Tn.y*=-1,Tn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Tn.y*=-1,Tn.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Rd.makeRotationFromEuler(Tn)),d.material.toneMapped=Yt.getTransfer(b.colorSpace)!==ee,(f!==b||p!==b.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,f=b,p=b.version,m=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new pe(new fi(2,2),new vn({name:"BackgroundMaterial",uniforms:ui(We.background.uniforms),vertexShader:We.background.vertexShader,fragmentShader:We.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=Yt.getTransfer(b.colorSpace)!==ee,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||p!==b.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,f=b,p=b.version,m=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null))}function h(E,x){E.getRGB(Ki,$o(i)),n.buffers.color.setClear(Ki.r,Ki.g,Ki.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(E,x=1){o.set(E),l=x,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,h(o,l)},render:M,addToRenderList:c}}function Pd(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(g,v,L,A,I){let q=!1;const O=f(A,L,v);r!==O&&(r=O,u(r.object)),q=m(g,A,L,I),q&&_(g,A,L,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(g,v,L,A),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function l(){return i.createVertexArray()}function u(g){return i.bindVertexArray(g)}function d(g){return i.deleteVertexArray(g)}function f(g,v,L){const A=L.wireframe===!0;let I=n[g.id];I===void 0&&(I={},n[g.id]=I);let q=I[v.id];q===void 0&&(q={},I[v.id]=q);let O=q[A];return O===void 0&&(O=p(l()),q[A]=O),O}function p(g){const v=[],L=[],A=[];for(let I=0;I<e;I++)v[I]=0,L[I]=0,A[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:L,attributeDivisors:A,object:g,attributes:{},index:null}}function m(g,v,L,A){const I=r.attributes,q=v.attributes;let O=0;const K=L.getAttributes();for(const z in K)if(K[z].location>=0){const J=I[z];let et=q[z];if(et===void 0&&(z==="instanceMatrix"&&g.instanceMatrix&&(et=g.instanceMatrix),z==="instanceColor"&&g.instanceColor&&(et=g.instanceColor)),J===void 0||J.attribute!==et||et&&J.data!==et.data)return!0;O++}return r.attributesNum!==O||r.index!==A}function _(g,v,L,A){const I={},q=v.attributes;let O=0;const K=L.getAttributes();for(const z in K)if(K[z].location>=0){let J=q[z];J===void 0&&(z==="instanceMatrix"&&g.instanceMatrix&&(J=g.instanceMatrix),z==="instanceColor"&&g.instanceColor&&(J=g.instanceColor));const et={};et.attribute=J,J&&J.data&&(et.data=J.data),I[z]=et,O++}r.attributes=I,r.attributesNum=O,r.index=A}function M(){const g=r.newAttributes;for(let v=0,L=g.length;v<L;v++)g[v]=0}function c(g){h(g,0)}function h(g,v){const L=r.newAttributes,A=r.enabledAttributes,I=r.attributeDivisors;L[g]=1,A[g]===0&&(i.enableVertexAttribArray(g),A[g]=1),I[g]!==v&&(i.vertexAttribDivisor(g,v),I[g]=v)}function E(){const g=r.newAttributes,v=r.enabledAttributes;for(let L=0,A=v.length;L<A;L++)v[L]!==g[L]&&(i.disableVertexAttribArray(L),v[L]=0)}function x(g,v,L,A,I,q,O){O===!0?i.vertexAttribIPointer(g,v,L,I,q):i.vertexAttribPointer(g,v,L,A,I,q)}function b(g,v,L,A){M();const I=A.attributes,q=L.getAttributes(),O=v.defaultAttributeValues;for(const K in q){const z=q[K];if(z.location>=0){let nt=I[K];if(nt===void 0&&(K==="instanceMatrix"&&g.instanceMatrix&&(nt=g.instanceMatrix),K==="instanceColor"&&g.instanceColor&&(nt=g.instanceColor)),nt!==void 0){const J=nt.normalized,et=nt.itemSize,vt=t.get(nt);if(vt===void 0)continue;const Pt=vt.buffer,j=vt.type,Q=vt.bytesPerElement,X=j===i.INT||j===i.UNSIGNED_INT||nt.gpuType===Zr;if(nt.isInterleavedBufferAttribute){const k=nt.data,ot=k.stride,Et=nt.offset;if(k.isInstancedInterleavedBuffer){for(let Bt=0;Bt<z.locationSize;Bt++)h(z.location+Bt,k.meshPerAttribute);g.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let Bt=0;Bt<z.locationSize;Bt++)c(z.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let Bt=0;Bt<z.locationSize;Bt++)x(z.location+Bt,et/z.locationSize,j,J,ot*Q,(Et+et/z.locationSize*Bt)*Q,X)}else{if(nt.isInstancedBufferAttribute){for(let k=0;k<z.locationSize;k++)h(z.location+k,nt.meshPerAttribute);g.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let k=0;k<z.locationSize;k++)c(z.location+k);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let k=0;k<z.locationSize;k++)x(z.location+k,et/z.locationSize,j,J,et*Q,et/z.locationSize*k*Q,X)}}else if(O!==void 0){const J=O[K];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(z.location,J);break;case 3:i.vertexAttrib3fv(z.location,J);break;case 4:i.vertexAttrib4fv(z.location,J);break;default:i.vertexAttrib1fv(z.location,J)}}}}E()}function D(){T();for(const g in n){const v=n[g];for(const L in v){const A=v[L];for(const I in A)d(A[I].object),delete A[I];delete v[L]}delete n[g]}}function C(g){if(n[g.id]===void 0)return;const v=n[g.id];for(const L in v){const A=v[L];for(const I in A)d(A[I].object),delete A[I];delete v[L]}delete n[g.id]}function R(g){for(const v in n){const L=n[v];if(L[g.id]===void 0)continue;const A=L[g.id];for(const I in A)d(A[I].object),delete A[I];delete L[g.id]}}function T(){W(),a=!0,r!==s&&(r=s,u(r.object))}function W(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:W,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:c,disableUnusedAttributes:E}}function Ld(i,t,e){let n;function s(u){n=u}function r(u,d){i.drawArrays(n,u,d),e.update(d,n,1)}function a(u,d,f){f!==0&&(i.drawArraysInstanced(n,u,d,f),e.update(d,n,f))}function o(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=d[_];e.update(m,n,1)}function l(u,d,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<u.length;_++)a(u[_],d[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,u,0,d,0,p,0,f);let _=0;for(let M=0;M<f;M++)_+=d[M];for(let M=0;M<p.length;M++)e.update(_,n,p[M])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Dd(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==He&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const T=R===Ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==en&&!T)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=e.precision!==void 0?e.precision:"highp";const d=l(u);d!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){const R=t.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),c=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=_>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:c,maxAttributes:h,maxVertexUniforms:E,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:D,maxSamples:C}}function Ud(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new dn,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||n!==0||s;return s=p,n=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=d(f,p,0)},this.setState=function(f,p,m){const _=f.clippingPlanes,M=f.clipIntersection,c=f.clipShadows,h=i.get(f);if(!s||_===null||_.length===0||r&&!c)r?d(null):u();else{const E=r?0:n,x=E*4;let b=h.clippingState||null;l.value=b,b=d(_,p,x,m);for(let D=0;D!==x;++D)b[D]=e[D];h.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=E}};function u(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(f,p,m,_){const M=f!==null?f.length:0;let c=null;if(M!==0){if(c=l.value,_!==!0||c===null){const h=m+M*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(c===null||c.length<h)&&(c=new Float32Array(h));for(let x=0,b=m;x!==M;++x,b+=4)a.copy(f[x]).applyMatrix4(E,o),a.normal.toArray(c,b),c[b+3]=a.constant}l.value=c,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,c}}function Id(i){let t=new WeakMap;function e(a,o){return o===_r?a.mapping=oi:o===gr&&(a.mapping=li),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===_r||o===gr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new Xc(l.height);return u.fromEquirectangularTexture(i,a),t.set(a,u),a.addEventListener("dispose",s),e(u.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class tl extends Zo{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ti=4,Ga=[.125,.215,.35,.446,.526,.582],Cn=20,Zs=new tl,Va=new Nt;let Js=null,Qs=0,tr=0,er=!1;const wn=(1+Math.sqrt(5))/2,Jn=1/wn,Wa=[new B(-wn,Jn,0),new B(wn,Jn,0),new B(-Jn,0,wn),new B(Jn,0,wn),new B(0,wn,-Jn),new B(0,wn,Jn),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Xa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Js=this._renderer.getRenderTarget(),Qs=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),er=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ka(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ya(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Js,Qs,tr),this._renderer.xr.enabled=er,t.scissorTest=!1,ji(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===oi||t.mapping===li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Js=this._renderer.getRenderTarget(),Qs=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),er=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:Ti,format:He,colorSpace:xn,depthBuffer:!1},s=qa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qa(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nd(r)),this._blurMaterial=Fd(r,t,e)}return s}_compileMaterial(t){const e=new pe(this._lodPlanes[0],t);this._renderer.compile(e,Zs)}_sceneToCubeUV(t,e,n,s){const o=new Le(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Va),d.toneMapping=_n,d.autoClear=!1;const m=new Yo({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1}),_=new pe(new On,m);let M=!1;const c=t.background;c?c.isColor&&(m.color.copy(c),t.background=null,M=!0):(m.color.copy(Va),M=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,l[h],0),o.lookAt(u[h],0,0)):E===1?(o.up.set(0,0,l[h]),o.lookAt(0,u[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,u[h]));const x=this._cubeSize;ji(s,E*x,h>2?x:0,x,x),d.setRenderTarget(s),M&&d.render(_,o),d.render(t,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=p,d.autoClear=f,t.background=c}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===oi||t.mapping===li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ka()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ya());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new pe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ji(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Zs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Wa[(s-r-1)%Wa.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new pe(this._lodPlanes[s],u),p=u.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Cn-1),M=r/_,c=isFinite(r)?1+Math.floor(d*M):Cn;c>Cn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Cn}`);const h=[];let E=0;for(let R=0;R<Cn;++R){const T=R/M,W=Math.exp(-T*T/2);h.push(W),R===0?E+=W:R<c&&(E+=2*W)}for(let R=0;R<h.length;R++)h[R]=h[R]/E;p.envMap.value=t.texture,p.samples.value=c,p.weights.value=h,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:x}=this;p.dTheta.value=_,p.mipInt.value=x-n;const b=this._sizeLods[s],D=3*b*(s>x-ti?s-x+ti:0),C=4*(this._cubeSize-b);ji(e,D,C,3*b,2*b),l.setRenderTarget(e),l.render(f,Zs)}}function Nd(i){const t=[],e=[],n=[];let s=i;const r=i-ti+1+Ga.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ti?l=Ga[a-i+ti-1]:a===0&&(l=0),n.push(l);const u=1/(o-2),d=-u,f=1+u,p=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,_=6,M=3,c=2,h=1,E=new Float32Array(M*_*m),x=new Float32Array(c*_*m),b=new Float32Array(h*_*m);for(let C=0;C<m;C++){const R=C%3*2/3-1,T=C>2?0:-1,W=[R,T,0,R+2/3,T,0,R+2/3,T+1,0,R,T,0,R+2/3,T+1,0,R,T+1,0];E.set(W,M*_*C),x.set(p,c*_*C);const g=[C,C,C,C,C,C];b.set(g,h*_*C)}const D=new Ge;D.setAttribute("position",new Xe(E,M)),D.setAttribute("uv",new Xe(x,c)),D.setAttribute("faceIndex",new Xe(b,h)),t.push(D),s>ti&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function qa(i,t,e){const n=new In(i,t,e);return n.texture.mapping=_s,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ji(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Fd(i,t,e){const n=new Float32Array(Cn),s=new B(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Cn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ya(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ka(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function aa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Od(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,u=l===_r||l===gr,d=l===oi||l===li;if(u||d){let f=t.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new Xa(i)),f=u?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const m=o.image;return u&&m&&m.height>0||d&&m&&s(m)?(e===null&&(e=new Xa(i)),f=u?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let l=0;const u=6;for(let d=0;d<u;d++)o[d]!==void 0&&l++;return l===u}function r(o){const l=o.target;l.removeEventListener("dispose",r);const u=t.get(l);u!==void 0&&(t.delete(l),u.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Bd(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&os("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zd(i,t,e,n){const s={},r=new WeakMap;function a(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const M=p.morphAttributes[_];for(let c=0,h=M.length;c<h;c++)t.remove(M[c])}p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(f,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(f){const p=f.attributes;for(const _ in p)t.update(p[_],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const M=m[_];for(let c=0,h=M.length;c<h;c++)t.update(M[c],i.ARRAY_BUFFER)}}function u(f){const p=[],m=f.index,_=f.attributes.position;let M=0;if(m!==null){const E=m.array;M=m.version;for(let x=0,b=E.length;x<b;x+=3){const D=E[x+0],C=E[x+1],R=E[x+2];p.push(D,C,C,R,R,D)}}else if(_!==void 0){const E=_.array;M=_.version;for(let x=0,b=E.length/3-1;x<b;x+=3){const D=x+0,C=x+1,R=x+2;p.push(D,C,C,R,R,D)}}else return;const c=new(Go(p)?jo:Ko)(p,1);c.version=M;const h=r.get(f);h&&t.remove(h),r.set(f,c)}function d(f){const p=r.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&u(f)}else u(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function kd(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,m){i.drawElements(n,m,r,p*a),e.update(m,n,1)}function u(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,r,p*a,_),e.update(m,n,_))}function d(p,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,_);let c=0;for(let h=0;h<_;h++)c+=m[h];e.update(c,n,1)}function f(p,m,_,M){if(_===0)return;const c=t.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<p.length;h++)u(p[h]/a,m[h],M[h]);else{c.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,M,0,_);let h=0;for(let E=0;E<_;E++)h+=m[E];for(let E=0;E<M.length;E++)e.update(h,n,M[E])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function Hd(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Gd(i,t,e){const n=new WeakMap,s=new se;function r(a,o,l){const u=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let p=n.get(o);if(p===void 0||p.count!==f){let W=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",W)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,c=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),M===!0&&(x=3);let b=o.attributes.position.count*x,D=1;b>t.maxTextureSize&&(D=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const C=new Float32Array(b*D*4*f),R=new Wo(C,b,D,f);R.type=en,R.needsUpdate=!0;const T=x*4;for(let g=0;g<f;g++){const v=c[g],L=h[g],A=E[g],I=b*D*4*g;for(let q=0;q<v.count;q++){const O=q*T;m===!0&&(s.fromBufferAttribute(v,q),C[I+O+0]=s.x,C[I+O+1]=s.y,C[I+O+2]=s.z,C[I+O+3]=0),_===!0&&(s.fromBufferAttribute(L,q),C[I+O+4]=s.x,C[I+O+5]=s.y,C[I+O+6]=s.z,C[I+O+7]=0),M===!0&&(s.fromBufferAttribute(A,q),C[I+O+8]=s.x,C[I+O+9]=s.y,C[I+O+10]=s.z,C[I+O+11]=A.itemSize===4?s.w:1)}}p={count:f,texture:R,size:new Dt(b,D)},n.set(o,p),o.addEventListener("dispose",W)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let M=0;M<u.length;M++)m+=u[M];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",u)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Vd(i,t,e,n){let s=new WeakMap;function r(l){const u=n.render.frame,d=l.geometry,f=t.get(l,d);if(s.get(f)!==u&&(t.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return f}function a(){s=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:r,dispose:a}}class el extends Te{constructor(t,e,n,s,r,a,o,l,u,d=si){if(d!==si&&d!==hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===si&&(n=Un),n===void 0&&d===hi&&(n=ci),super(null,s,r,a,o,l,d,n,u),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ie,this.minFilter=l!==void 0?l:Ie,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const nl=new Te,ja=new el(1,1),il=new Wo,sl=new Cc,rl=new Jo,$a=[],Za=[],Ja=new Float32Array(16),Qa=new Float32Array(9),to=new Float32Array(4);function pi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=$a[s];if(r===void 0&&(r=new Float32Array(s),$a[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function he(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xs(i,t){let e=Za[t];e===void 0&&(e=new Int32Array(t),Za[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Wd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2fv(this.addr,t),he(e,t)}}function qd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ce(e,t))return;i.uniform3fv(this.addr,t),he(e,t)}}function Yd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4fv(this.addr,t),he(e,t)}}function Kd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;to.set(n),i.uniformMatrix2fv(this.addr,!1,to),he(e,n)}}function jd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;Qa.set(n),i.uniformMatrix3fv(this.addr,!1,Qa),he(e,n)}}function $d(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;Ja.set(n),i.uniformMatrix4fv(this.addr,!1,Ja),he(e,n)}}function Zd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2iv(this.addr,t),he(e,t)}}function Qd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ce(e,t))return;i.uniform3iv(this.addr,t),he(e,t)}}function tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4iv(this.addr,t),he(e,t)}}function ef(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function nf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2uiv(this.addr,t),he(e,t)}}function sf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ce(e,t))return;i.uniform3uiv(this.addr,t),he(e,t)}}function rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4uiv(this.addr,t),he(e,t)}}function af(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ja.compareFunction=Ho,r=ja):r=nl,e.setTexture2D(t||r,s)}function of(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||sl,s)}function lf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||rl,s)}function cf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||il,s)}function hf(i){switch(i){case 5126:return Wd;case 35664:return Xd;case 35665:return qd;case 35666:return Yd;case 35674:return Kd;case 35675:return jd;case 35676:return $d;case 5124:case 35670:return Zd;case 35667:case 35671:return Jd;case 35668:case 35672:return Qd;case 35669:case 35673:return tf;case 5125:return ef;case 36294:return nf;case 36295:return sf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return lf;case 36289:case 36303:case 36311:case 36292:return cf}}function uf(i,t){i.uniform1fv(this.addr,t)}function df(i,t){const e=pi(t,this.size,2);i.uniform2fv(this.addr,e)}function ff(i,t){const e=pi(t,this.size,3);i.uniform3fv(this.addr,e)}function pf(i,t){const e=pi(t,this.size,4);i.uniform4fv(this.addr,e)}function mf(i,t){const e=pi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _f(i,t){const e=pi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function gf(i,t){const e=pi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vf(i,t){i.uniform1iv(this.addr,t)}function xf(i,t){i.uniform2iv(this.addr,t)}function Mf(i,t){i.uniform3iv(this.addr,t)}function Sf(i,t){i.uniform4iv(this.addr,t)}function yf(i,t){i.uniform1uiv(this.addr,t)}function Ef(i,t){i.uniform2uiv(this.addr,t)}function bf(i,t){i.uniform3uiv(this.addr,t)}function Tf(i,t){i.uniform4uiv(this.addr,t)}function Af(i,t,e){const n=this.cache,s=t.length,r=xs(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||nl,r[a])}function wf(i,t,e){const n=this.cache,s=t.length,r=xs(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||sl,r[a])}function Rf(i,t,e){const n=this.cache,s=t.length,r=xs(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||rl,r[a])}function Cf(i,t,e){const n=this.cache,s=t.length,r=xs(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||il,r[a])}function Pf(i){switch(i){case 5126:return uf;case 35664:return df;case 35665:return ff;case 35666:return pf;case 35674:return mf;case 35675:return _f;case 35676:return gf;case 5124:case 35670:return vf;case 35667:case 35671:return xf;case 35668:case 35672:return Mf;case 35669:case 35673:return Sf;case 5125:return yf;case 36294:return Ef;case 36295:return bf;case 36296:return Tf;case 35678:case 36198:case 36298:case 36306:case 35682:return Af;case 35679:case 36299:case 36307:return wf;case 35680:case 36300:case 36308:case 36293:return Rf;case 36289:case 36303:case 36311:case 36292:return Cf}}class Lf{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=hf(e.type)}}class Df{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pf(e.type)}}class Uf{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const nr=/(\w+)(\])?(\[|\.)?/g;function eo(i,t){i.seq.push(t),i.map[t.id]=t}function If(i,t,e){const n=i.name,s=n.length;for(nr.lastIndex=0;;){const r=nr.exec(n),a=nr.lastIndex;let o=r[1];const l=r[2]==="]",u=r[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===s){eo(e,u===void 0?new Lf(o,i,t):new Df(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Uf(o),eo(e,f)),e=f}}}class ls{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);If(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function no(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Nf=37297;let Ff=0;function Of(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Bf(i){const t=Yt.getPrimaries(Yt.workingColorSpace),e=Yt.getPrimaries(i);let n;switch(t===e?n="":t===us&&e===hs?n="LinearDisplayP3ToLinearSRGB":t===hs&&e===us&&(n="LinearSRGBToLinearDisplayP3"),i){case xn:case gs:return[n,"LinearTransferOETF"];case Ve:case ia:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function io(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Of(i.getShaderSource(t),a)}else return s}function zf(i,t){const e=Bf(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function kf(i,t){let e;switch(t){case tc:e="Linear";break;case ec:e="Reinhard";break;case nc:e="Cineon";break;case ic:e="ACESFilmic";break;case rc:e="AgX";break;case ac:e="Neutral";break;case sc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const $i=new B;function Hf(){Yt.getLuminanceCoefficients($i);const i=$i.x.toFixed(4),t=$i.y.toFixed(4),e=$i.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yi).join(`
`)}function Vf(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wf(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function yi(i){return i!==""}function so(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ro(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Xf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yr(i){return i.replace(Xf,Yf)}const qf=new Map;function Yf(i,t){let e=Ut[t];if(e===void 0){const n=qf.get(t);if(n!==void 0)e=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Yr(e)}const Kf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ao(i){return i.replace(Kf,jf)}function jf(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $f(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wo?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ul?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qe&&(t="SHADOWMAP_TYPE_VSM"),t}function Zf(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case oi:case li:t="ENVMAP_TYPE_CUBE";break;case _s:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Jf(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case li:t="ENVMAP_MODE_REFRACTION";break}return t}function Qf(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ro:t="ENVMAP_BLENDING_MULTIPLY";break;case Jl:t="ENVMAP_BLENDING_MIX";break;case Ql:t="ENVMAP_BLENDING_ADD";break}return t}function tp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ep(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=$f(e),u=Zf(e),d=Jf(e),f=Qf(e),p=tp(e),m=Gf(e),_=Vf(r),M=s.createProgram();let c,h,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(c=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(yi).join(`
`),c.length>0&&(c+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(yi).join(`
`),h.length>0&&(h+=`
`)):(c=[oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yi).join(`
`),h=[oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_n?"#define TONE_MAPPING":"",e.toneMapping!==_n?Ut.tonemapping_pars_fragment:"",e.toneMapping!==_n?kf("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,zf("linearToOutputTexel",e.outputColorSpace),Hf(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(yi).join(`
`)),a=Yr(a),a=so(a,e),a=ro(a,e),o=Yr(o),o=so(o,e),o=ro(o,e),a=ao(a),o=ao(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,c=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,h=["#define varying in",e.glslVersion===ba?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ba?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=E+c+a,b=E+h+o,D=no(s,s.VERTEX_SHADER,x),C=no(s,s.FRAGMENT_SHADER,b);s.attachShader(M,D),s.attachShader(M,C),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(v){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(M).trim(),A=s.getShaderInfoLog(D).trim(),I=s.getShaderInfoLog(C).trim();let q=!0,O=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,D,C);else{const K=io(s,D,"vertex"),z=io(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+L+`
`+K+`
`+z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(A===""||I==="")&&(O=!1);O&&(v.diagnostics={runnable:q,programLog:L,vertexShader:{log:A,prefix:c},fragmentShader:{log:I,prefix:h}})}s.deleteShader(D),s.deleteShader(C),T=new ls(s,M),W=Wf(s,M)}let T;this.getUniforms=function(){return T===void 0&&R(this),T};let W;this.getAttributes=function(){return W===void 0&&R(this),W};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(M,Nf)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ff++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=D,this.fragmentShader=C,this}let np=0;class ip{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new sp(t),e.set(t,n)),n}}class sp{constructor(t){this.id=np++,this.code=t,this.usedTimes=0}}function rp(i,t,e,n,s,r,a){const o=new Xo,l=new ip,u=new Set,d=[],f=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures;let _=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function c(g){return u.add(g),g===0?"uv":`uv${g}`}function h(g,v,L,A,I){const q=A.fog,O=I.geometry,K=g.isMeshStandardMaterial?A.environment:null,z=(g.isMeshStandardMaterial?e:t).get(g.envMap||K),nt=z&&z.mapping===_s?z.image.height:null,J=M[g.type];g.precision!==null&&(_=s.getMaxPrecision(g.precision),_!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",_,"instead."));const et=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,vt=et!==void 0?et.length:0;let Pt=0;O.morphAttributes.position!==void 0&&(Pt=1),O.morphAttributes.normal!==void 0&&(Pt=2),O.morphAttributes.color!==void 0&&(Pt=3);let j,Q,X,k;if(J){const Se=We[J];j=Se.vertexShader,Q=Se.fragmentShader}else j=g.vertexShader,Q=g.fragmentShader,l.update(g),X=l.getVertexShaderID(g),k=l.getFragmentShaderID(g);const ot=i.getRenderTarget(),Et=I.isInstancedMesh===!0,Bt=I.isBatchedMesh===!0,$t=!!g.map,zt=!!g.matcap,P=!!z,Ae=!!g.aoMap,Ft=!!g.lightMap,Ht=!!g.bumpMap,At=!!g.normalMap,Qt=!!g.displacementMap,Ct=!!g.emissiveMap,w=!!g.metalnessMap,S=!!g.roughnessMap,H=g.anisotropy>0,Z=g.clearcoat>0,it=g.dispersion>0,$=g.iridescence>0,Mt=g.sheen>0,lt=g.transmission>0,pt=H&&!!g.anisotropyMap,Gt=Z&&!!g.clearcoatMap,st=Z&&!!g.clearcoatNormalMap,mt=Z&&!!g.clearcoatRoughnessMap,wt=$&&!!g.iridescenceMap,Rt=$&&!!g.iridescenceThicknessMap,_t=Mt&&!!g.sheenColorMap,Ot=Mt&&!!g.sheenRoughnessMap,Lt=!!g.specularMap,Jt=!!g.specularColorMap,U=!!g.specularIntensityMap,dt=lt&&!!g.transmissionMap,Y=lt&&!!g.thicknessMap,tt=!!g.gradientMap,ct=!!g.alphaMap,ft=g.alphaTest>0,kt=!!g.alphaHash,ae=!!g.extensions;let Me=_n;g.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Me=i.toneMapping);const Vt={shaderID:J,shaderType:g.type,shaderName:g.name,vertexShader:j,fragmentShader:Q,defines:g.defines,customVertexShaderID:X,customFragmentShaderID:k,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:_,batching:Bt,batchingColor:Bt&&I._colorsTexture!==null,instancing:Et,instancingColor:Et&&I.instanceColor!==null,instancingMorph:Et&&I.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:xn,alphaToCoverage:!!g.alphaToCoverage,map:$t,matcap:zt,envMap:P,envMapMode:P&&z.mapping,envMapCubeUVHeight:nt,aoMap:Ae,lightMap:Ft,bumpMap:Ht,normalMap:At,displacementMap:m&&Qt,emissiveMap:Ct,normalMapObjectSpace:At&&g.normalMapType===hc,normalMapTangentSpace:At&&g.normalMapType===ko,metalnessMap:w,roughnessMap:S,anisotropy:H,anisotropyMap:pt,clearcoat:Z,clearcoatMap:Gt,clearcoatNormalMap:st,clearcoatRoughnessMap:mt,dispersion:it,iridescence:$,iridescenceMap:wt,iridescenceThicknessMap:Rt,sheen:Mt,sheenColorMap:_t,sheenRoughnessMap:Ot,specularMap:Lt,specularColorMap:Jt,specularIntensityMap:U,transmission:lt,transmissionMap:dt,thicknessMap:Y,gradientMap:tt,opaque:g.transparent===!1&&g.blending===ii&&g.alphaToCoverage===!1,alphaMap:ct,alphaTest:ft,alphaHash:kt,combine:g.combine,mapUv:$t&&c(g.map.channel),aoMapUv:Ae&&c(g.aoMap.channel),lightMapUv:Ft&&c(g.lightMap.channel),bumpMapUv:Ht&&c(g.bumpMap.channel),normalMapUv:At&&c(g.normalMap.channel),displacementMapUv:Qt&&c(g.displacementMap.channel),emissiveMapUv:Ct&&c(g.emissiveMap.channel),metalnessMapUv:w&&c(g.metalnessMap.channel),roughnessMapUv:S&&c(g.roughnessMap.channel),anisotropyMapUv:pt&&c(g.anisotropyMap.channel),clearcoatMapUv:Gt&&c(g.clearcoatMap.channel),clearcoatNormalMapUv:st&&c(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&c(g.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&c(g.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&c(g.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&c(g.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&c(g.sheenRoughnessMap.channel),specularMapUv:Lt&&c(g.specularMap.channel),specularColorMapUv:Jt&&c(g.specularColorMap.channel),specularIntensityMapUv:U&&c(g.specularIntensityMap.channel),transmissionMapUv:dt&&c(g.transmissionMap.channel),thicknessMapUv:Y&&c(g.thicknessMap.channel),alphaMapUv:ct&&c(g.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(At||H),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&($t||ct),fog:!!q,useFog:g.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:p,skinning:I.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Pt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Me,decodeVideoTexture:$t&&g.map.isVideoTexture===!0&&Yt.getTransfer(g.map.colorSpace)===ee,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===tn,flipSided:g.side===be,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ae&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&g.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Vt.vertexUv1s=u.has(1),Vt.vertexUv2s=u.has(2),Vt.vertexUv3s=u.has(3),u.clear(),Vt}function E(g){const v=[];if(g.shaderID?v.push(g.shaderID):(v.push(g.customVertexShaderID),v.push(g.customFragmentShaderID)),g.defines!==void 0)for(const L in g.defines)v.push(L),v.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(x(v,g),b(v,g),v.push(i.outputColorSpace)),v.push(g.customProgramCacheKey),v.join()}function x(g,v){g.push(v.precision),g.push(v.outputColorSpace),g.push(v.envMapMode),g.push(v.envMapCubeUVHeight),g.push(v.mapUv),g.push(v.alphaMapUv),g.push(v.lightMapUv),g.push(v.aoMapUv),g.push(v.bumpMapUv),g.push(v.normalMapUv),g.push(v.displacementMapUv),g.push(v.emissiveMapUv),g.push(v.metalnessMapUv),g.push(v.roughnessMapUv),g.push(v.anisotropyMapUv),g.push(v.clearcoatMapUv),g.push(v.clearcoatNormalMapUv),g.push(v.clearcoatRoughnessMapUv),g.push(v.iridescenceMapUv),g.push(v.iridescenceThicknessMapUv),g.push(v.sheenColorMapUv),g.push(v.sheenRoughnessMapUv),g.push(v.specularMapUv),g.push(v.specularColorMapUv),g.push(v.specularIntensityMapUv),g.push(v.transmissionMapUv),g.push(v.thicknessMapUv),g.push(v.combine),g.push(v.fogExp2),g.push(v.sizeAttenuation),g.push(v.morphTargetsCount),g.push(v.morphAttributeCount),g.push(v.numDirLights),g.push(v.numPointLights),g.push(v.numSpotLights),g.push(v.numSpotLightMaps),g.push(v.numHemiLights),g.push(v.numRectAreaLights),g.push(v.numDirLightShadows),g.push(v.numPointLightShadows),g.push(v.numSpotLightShadows),g.push(v.numSpotLightShadowsWithMaps),g.push(v.numLightProbes),g.push(v.shadowMapType),g.push(v.toneMapping),g.push(v.numClippingPlanes),g.push(v.numClipIntersection),g.push(v.depthPacking)}function b(g,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),g.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.alphaToCoverage&&o.enable(20),g.push(o.mask)}function D(g){const v=M[g.type];let L;if(v){const A=We[v];L=Hc.clone(A.uniforms)}else L=g.uniforms;return L}function C(g,v){let L;for(let A=0,I=d.length;A<I;A++){const q=d[A];if(q.cacheKey===v){L=q,++L.usedTimes;break}}return L===void 0&&(L=new ep(i,v,g,r),d.push(L)),L}function R(g){if(--g.usedTimes===0){const v=d.indexOf(g);d[v]=d[d.length-1],d.pop(),g.destroy()}}function T(g){l.remove(g)}function W(){l.dispose()}return{getParameters:h,getProgramCacheKey:E,getUniforms:D,acquireProgram:C,releaseProgram:R,releaseShaderCache:T,programs:d,dispose:W}}function ap(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function op(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function lo(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function co(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f,p,m,_,M,c){let h=i[t];return h===void 0?(h={id:f.id,object:f,geometry:p,material:m,groupOrder:_,renderOrder:f.renderOrder,z:M,group:c},i[t]=h):(h.id=f.id,h.object=f,h.geometry=p,h.material=m,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=M,h.group=c),t++,h}function o(f,p,m,_,M,c){const h=a(f,p,m,_,M,c);m.transmission>0?n.push(h):m.transparent===!0?s.push(h):e.push(h)}function l(f,p,m,_,M,c){const h=a(f,p,m,_,M,c);m.transmission>0?n.unshift(h):m.transparent===!0?s.unshift(h):e.unshift(h)}function u(f,p){e.length>1&&e.sort(f||op),n.length>1&&n.sort(p||lo),s.length>1&&s.sort(p||lo)}function d(){for(let f=t,p=i.length;f<p;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:u}}function lp(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new co,i.set(n,[a])):s>=r.length?(a=new co,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function cp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Nt};break;case"SpotLight":e={position:new B,direction:new B,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function hp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let up=0;function dp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fp(i){const t=new cp,e=hp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new B);const s=new B,r=new ne,a=new ne;function o(u){let d=0,f=0,p=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let m=0,_=0,M=0,c=0,h=0,E=0,x=0,b=0,D=0,C=0,R=0;u.sort(dp);for(let W=0,g=u.length;W<g;W++){const v=u[W],L=v.color,A=v.intensity,I=v.distance,q=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)d+=L.r*A,f+=L.g*A,p+=L.b*A;else if(v.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(v.sh.coefficients[O],A);R++}else if(v.isDirectionalLight){const O=t.get(v);if(O.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){const K=v.shadow,z=e.get(v);z.shadowIntensity=K.intensity,z.shadowBias=K.bias,z.shadowNormalBias=K.normalBias,z.shadowRadius=K.radius,z.shadowMapSize=K.mapSize,n.directionalShadow[m]=z,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=v.shadow.matrix,E++}n.directional[m]=O,m++}else if(v.isSpotLight){const O=t.get(v);O.position.setFromMatrixPosition(v.matrixWorld),O.color.copy(L).multiplyScalar(A),O.distance=I,O.coneCos=Math.cos(v.angle),O.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),O.decay=v.decay,n.spot[M]=O;const K=v.shadow;if(v.map&&(n.spotLightMap[D]=v.map,D++,K.updateMatrices(v),v.castShadow&&C++),n.spotLightMatrix[M]=K.matrix,v.castShadow){const z=e.get(v);z.shadowIntensity=K.intensity,z.shadowBias=K.bias,z.shadowNormalBias=K.normalBias,z.shadowRadius=K.radius,z.shadowMapSize=K.mapSize,n.spotShadow[M]=z,n.spotShadowMap[M]=q,b++}M++}else if(v.isRectAreaLight){const O=t.get(v);O.color.copy(L).multiplyScalar(A),O.halfWidth.set(v.width*.5,0,0),O.halfHeight.set(0,v.height*.5,0),n.rectArea[c]=O,c++}else if(v.isPointLight){const O=t.get(v);if(O.color.copy(v.color).multiplyScalar(v.intensity),O.distance=v.distance,O.decay=v.decay,v.castShadow){const K=v.shadow,z=e.get(v);z.shadowIntensity=K.intensity,z.shadowBias=K.bias,z.shadowNormalBias=K.normalBias,z.shadowRadius=K.radius,z.shadowMapSize=K.mapSize,z.shadowCameraNear=K.camera.near,z.shadowCameraFar=K.camera.far,n.pointShadow[_]=z,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=v.shadow.matrix,x++}n.point[_]=O,_++}else if(v.isHemisphereLight){const O=t.get(v);O.skyColor.copy(v.color).multiplyScalar(A),O.groundColor.copy(v.groundColor).multiplyScalar(A),n.hemi[h]=O,h++}}c>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=p;const T=n.hash;(T.directionalLength!==m||T.pointLength!==_||T.spotLength!==M||T.rectAreaLength!==c||T.hemiLength!==h||T.numDirectionalShadows!==E||T.numPointShadows!==x||T.numSpotShadows!==b||T.numSpotMaps!==D||T.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=M,n.rectArea.length=c,n.point.length=_,n.hemi.length=h,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=b+D-C,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,T.directionalLength=m,T.pointLength=_,T.spotLength=M,T.rectAreaLength=c,T.hemiLength=h,T.numDirectionalShadows=E,T.numPointShadows=x,T.numSpotShadows=b,T.numSpotMaps=D,T.numLightProbes=R,n.version=up++)}function l(u,d){let f=0,p=0,m=0,_=0,M=0;const c=d.matrixWorldInverse;for(let h=0,E=u.length;h<E;h++){const x=u[h];if(x.isDirectionalLight){const b=n.directional[f];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(c),f++}else if(x.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(c),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(c),m++}else if(x.isRectAreaLight){const b=n.rectArea[_];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(c),a.identity(),r.copy(x.matrixWorld),r.premultiply(c),a.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const b=n.point[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(c),p++}else if(x.isHemisphereLight){const b=n.hemi[M];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(c),M++}}}return{setup:o,setupView:l,state:n}}function ho(i){const t=new fp(i),e=[],n=[];function s(d){u.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function a(d){n.push(d)}function o(){t.setup(e)}function l(d){t.setupView(e,d)}const u={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function pp(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new ho(i),t.set(s,[o])):r>=a.length?(o=new ho(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class mp extends di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _p extends di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const gp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xp(i,t,e){let n=new ra;const s=new Dt,r=new Dt,a=new se,o=new mp({depthPacking:cc}),l=new _p,u={},d=e.maxTextureSize,f={[gn]:be,[be]:gn,[tn]:tn},p=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:gp,fragmentShader:vp}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new Ge;_.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new pe(_,p),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wo;let h=this.type;this.render=function(C,R,T){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||C.length===0)return;const W=i.getRenderTarget(),g=i.getActiveCubeFace(),v=i.getActiveMipmapLevel(),L=i.state;L.setBlending(mn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const A=h!==Qe&&this.type===Qe,I=h===Qe&&this.type!==Qe;for(let q=0,O=C.length;q<O;q++){const K=C[q],z=K.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const nt=z.getFrameExtents();if(s.multiply(nt),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/nt.x),s.x=r.x*nt.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/nt.y),s.y=r.y*nt.y,z.mapSize.y=r.y)),z.map===null||A===!0||I===!0){const et=this.type!==Qe?{minFilter:Ie,magFilter:Ie}:{};z.map!==null&&z.map.dispose(),z.map=new In(s.x,s.y,et),z.map.texture.name=K.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const J=z.getViewportCount();for(let et=0;et<J;et++){const vt=z.getViewport(et);a.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),L.viewport(a),z.updateMatrices(K,et),n=z.getFrustum(),b(R,T,z.camera,K,this.type)}z.isPointLightShadow!==!0&&this.type===Qe&&E(z,T),z.needsUpdate=!1}h=this.type,c.needsUpdate=!1,i.setRenderTarget(W,g,v)};function E(C,R){const T=t.update(M);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new In(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(R,null,T,p,M,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(R,null,T,m,M,null)}function x(C,R,T,W){let g=null;const v=T.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(v!==void 0)g=v;else if(g=T.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const L=g.uuid,A=R.uuid;let I=u[L];I===void 0&&(I={},u[L]=I);let q=I[A];q===void 0&&(q=g.clone(),I[A]=q,R.addEventListener("dispose",D)),g=q}if(g.visible=R.visible,g.wireframe=R.wireframe,W===Qe?g.side=R.shadowSide!==null?R.shadowSide:R.side:g.side=R.shadowSide!==null?R.shadowSide:f[R.side],g.alphaMap=R.alphaMap,g.alphaTest=R.alphaTest,g.map=R.map,g.clipShadows=R.clipShadows,g.clippingPlanes=R.clippingPlanes,g.clipIntersection=R.clipIntersection,g.displacementMap=R.displacementMap,g.displacementScale=R.displacementScale,g.displacementBias=R.displacementBias,g.wireframeLinewidth=R.wireframeLinewidth,g.linewidth=R.linewidth,T.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const L=i.properties.get(g);L.light=T}return g}function b(C,R,T,W,g){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&g===Qe)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,C.matrixWorld);const A=t.update(C),I=C.material;if(Array.isArray(I)){const q=A.groups;for(let O=0,K=q.length;O<K;O++){const z=q[O],nt=I[z.materialIndex];if(nt&&nt.visible){const J=x(C,nt,W,g);C.onBeforeShadow(i,C,R,T,A,J,z),i.renderBufferDirect(T,null,A,J,C,z),C.onAfterShadow(i,C,R,T,A,J,z)}}}else if(I.visible){const q=x(C,I,W,g);C.onBeforeShadow(i,C,R,T,A,q,null),i.renderBufferDirect(T,null,A,q,C,null),C.onAfterShadow(i,C,R,T,A,q,null)}}const L=C.children;for(let A=0,I=L.length;A<I;A++)b(L[A],R,T,W,g)}function D(C){C.target.removeEventListener("dispose",D);for(const T in u){const W=u[T],g=C.target.uuid;g in W&&(W[g].dispose(),delete W[g])}}}const Mp={[cr]:hr,[ur]:pr,[dr]:mr,[ai]:fr,[hr]:cr,[pr]:ur,[mr]:dr,[fr]:ai};function Sp(i){function t(){let U=!1;const dt=new se;let Y=null;const tt=new se(0,0,0,0);return{setMask:function(ct){Y!==ct&&!U&&(i.colorMask(ct,ct,ct,ct),Y=ct)},setLocked:function(ct){U=ct},setClear:function(ct,ft,kt,ae,Me){Me===!0&&(ct*=ae,ft*=ae,kt*=ae),dt.set(ct,ft,kt,ae),tt.equals(dt)===!1&&(i.clearColor(ct,ft,kt,ae),tt.copy(dt))},reset:function(){U=!1,Y=null,tt.set(-1,0,0,0)}}}function e(){let U=!1,dt=!1,Y=null,tt=null,ct=null;return{setReversed:function(ft){dt=ft},setTest:function(ft){ft?X(i.DEPTH_TEST):k(i.DEPTH_TEST)},setMask:function(ft){Y!==ft&&!U&&(i.depthMask(ft),Y=ft)},setFunc:function(ft){if(dt&&(ft=Mp[ft]),tt!==ft){switch(ft){case cr:i.depthFunc(i.NEVER);break;case hr:i.depthFunc(i.ALWAYS);break;case ur:i.depthFunc(i.LESS);break;case ai:i.depthFunc(i.LEQUAL);break;case dr:i.depthFunc(i.EQUAL);break;case fr:i.depthFunc(i.GEQUAL);break;case pr:i.depthFunc(i.GREATER);break;case mr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=ft}},setLocked:function(ft){U=ft},setClear:function(ft){ct!==ft&&(i.clearDepth(ft),ct=ft)},reset:function(){U=!1,Y=null,tt=null,ct=null}}}function n(){let U=!1,dt=null,Y=null,tt=null,ct=null,ft=null,kt=null,ae=null,Me=null;return{setTest:function(Vt){U||(Vt?X(i.STENCIL_TEST):k(i.STENCIL_TEST))},setMask:function(Vt){dt!==Vt&&!U&&(i.stencilMask(Vt),dt=Vt)},setFunc:function(Vt,Se,Ye){(Y!==Vt||tt!==Se||ct!==Ye)&&(i.stencilFunc(Vt,Se,Ye),Y=Vt,tt=Se,ct=Ye)},setOp:function(Vt,Se,Ye){(ft!==Vt||kt!==Se||ae!==Ye)&&(i.stencilOp(Vt,Se,Ye),ft=Vt,kt=Se,ae=Ye)},setLocked:function(Vt){U=Vt},setClear:function(Vt){Me!==Vt&&(i.clearStencil(Vt),Me=Vt)},reset:function(){U=!1,dt=null,Y=null,tt=null,ct=null,ft=null,kt=null,ae=null,Me=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],m=null,_=!1,M=null,c=null,h=null,E=null,x=null,b=null,D=null,C=new Nt(0,0,0),R=0,T=!1,W=null,g=null,v=null,L=null,A=null;const I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,O=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=O>=1):K.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=O>=2);let z=null,nt={};const J=i.getParameter(i.SCISSOR_BOX),et=i.getParameter(i.VIEWPORT),vt=new se().fromArray(J),Pt=new se().fromArray(et);function j(U,dt,Y,tt){const ct=new Uint8Array(4),ft=i.createTexture();i.bindTexture(U,ft),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<Y;kt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(dt+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return ft}const Q={};Q[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),X(i.DEPTH_TEST),r.setFunc(ai),Ft(!1),Ht(va),X(i.CULL_FACE),P(mn);function X(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function k(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function ot(U,dt){return d[U]!==dt?(i.bindFramebuffer(U,dt),d[U]=dt,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=dt),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Et(U,dt){let Y=p,tt=!1;if(U){Y=f.get(dt),Y===void 0&&(Y=[],f.set(dt,Y));const ct=U.textures;if(Y.length!==ct.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,kt=ct.length;ft<kt;ft++)Y[ft]=i.COLOR_ATTACHMENT0+ft;Y.length=ct.length,tt=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,tt=!0);tt&&i.drawBuffers(Y)}function Bt(U){return m!==U?(i.useProgram(U),m=U,!0):!1}const $t={[Rn]:i.FUNC_ADD,[Nl]:i.FUNC_SUBTRACT,[Fl]:i.FUNC_REVERSE_SUBTRACT};$t[Ol]=i.MIN,$t[Bl]=i.MAX;const zt={[zl]:i.ZERO,[kl]:i.ONE,[Hl]:i.SRC_COLOR,[or]:i.SRC_ALPHA,[Yl]:i.SRC_ALPHA_SATURATE,[Xl]:i.DST_COLOR,[Vl]:i.DST_ALPHA,[Gl]:i.ONE_MINUS_SRC_COLOR,[lr]:i.ONE_MINUS_SRC_ALPHA,[ql]:i.ONE_MINUS_DST_COLOR,[Wl]:i.ONE_MINUS_DST_ALPHA,[Kl]:i.CONSTANT_COLOR,[jl]:i.ONE_MINUS_CONSTANT_COLOR,[$l]:i.CONSTANT_ALPHA,[Zl]:i.ONE_MINUS_CONSTANT_ALPHA};function P(U,dt,Y,tt,ct,ft,kt,ae,Me,Vt){if(U===mn){_===!0&&(k(i.BLEND),_=!1);return}if(_===!1&&(X(i.BLEND),_=!0),U!==Il){if(U!==M||Vt!==T){if((c!==Rn||x!==Rn)&&(i.blendEquation(i.FUNC_ADD),c=Rn,x=Rn),Vt)switch(U){case ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xa:i.blendFunc(i.ONE,i.ONE);break;case Ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}h=null,E=null,b=null,D=null,C.set(0,0,0),R=0,M=U,T=Vt}return}ct=ct||dt,ft=ft||Y,kt=kt||tt,(dt!==c||ct!==x)&&(i.blendEquationSeparate($t[dt],$t[ct]),c=dt,x=ct),(Y!==h||tt!==E||ft!==b||kt!==D)&&(i.blendFuncSeparate(zt[Y],zt[tt],zt[ft],zt[kt]),h=Y,E=tt,b=ft,D=kt),(ae.equals(C)===!1||Me!==R)&&(i.blendColor(ae.r,ae.g,ae.b,Me),C.copy(ae),R=Me),M=U,T=!1}function Ae(U,dt){U.side===tn?k(i.CULL_FACE):X(i.CULL_FACE);let Y=U.side===be;dt&&(Y=!Y),Ft(Y),U.blending===ii&&U.transparent===!1?P(mn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),s.setMask(U.colorWrite);const tt=U.stencilWrite;a.setTest(tt),tt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Qt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):k(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(U){W!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),W=U)}function Ht(U){U!==Ll?(X(i.CULL_FACE),U!==g&&(U===va?i.cullFace(i.BACK):U===Dl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):k(i.CULL_FACE),g=U}function At(U){U!==v&&(q&&i.lineWidth(U),v=U)}function Qt(U,dt,Y){U?(X(i.POLYGON_OFFSET_FILL),(L!==dt||A!==Y)&&(i.polygonOffset(dt,Y),L=dt,A=Y)):k(i.POLYGON_OFFSET_FILL)}function Ct(U){U?X(i.SCISSOR_TEST):k(i.SCISSOR_TEST)}function w(U){U===void 0&&(U=i.TEXTURE0+I-1),z!==U&&(i.activeTexture(U),z=U)}function S(U,dt,Y){Y===void 0&&(z===null?Y=i.TEXTURE0+I-1:Y=z);let tt=nt[Y];tt===void 0&&(tt={type:void 0,texture:void 0},nt[Y]=tt),(tt.type!==U||tt.texture!==dt)&&(z!==Y&&(i.activeTexture(Y),z=Y),i.bindTexture(U,dt||Q[U]),tt.type=U,tt.texture=dt)}function H(){const U=nt[z];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function wt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Rt(U){vt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),vt.copy(U))}function _t(U){Pt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Pt.copy(U))}function Ot(U,dt){let Y=l.get(dt);Y===void 0&&(Y=new WeakMap,l.set(dt,Y));let tt=Y.get(U);tt===void 0&&(tt=i.getUniformBlockIndex(dt,U.name),Y.set(U,tt))}function Lt(U,dt){const tt=l.get(dt).get(U);o.get(dt)!==tt&&(i.uniformBlockBinding(dt,tt,U.__bindingPointIndex),o.set(dt,tt))}function Jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},z=null,nt={},d={},f=new WeakMap,p=[],m=null,_=!1,M=null,c=null,h=null,E=null,x=null,b=null,D=null,C=new Nt(0,0,0),R=0,T=!1,W=null,g=null,v=null,L=null,A=null,vt.set(0,0,i.canvas.width,i.canvas.height),Pt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:X,disable:k,bindFramebuffer:ot,drawBuffers:Et,useProgram:Bt,setBlending:P,setMaterial:Ae,setFlipSided:Ft,setCullFace:Ht,setLineWidth:At,setPolygonOffset:Qt,setScissorTest:Ct,activeTexture:w,bindTexture:S,unbindTexture:H,compressedTexImage2D:Z,compressedTexImage3D:it,texImage2D:mt,texImage3D:wt,updateUBOMapping:Ot,uniformBlockBinding:Lt,texStorage2D:Gt,texStorage3D:st,texSubImage2D:$,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:pt,scissor:Rt,viewport:_t,reset:Jt}}function uo(i,t,e,n){const s=yp(n);switch(e){case Uo:return i*t;case No:return i*t;case Fo:return i*t*2;case Oo:return i*t/s.components*s.byteLength;case ta:return i*t/s.components*s.byteLength;case Bo:return i*t*2/s.components*s.byteLength;case ea:return i*t*2/s.components*s.byteLength;case Io:return i*t*3/s.components*s.byteLength;case He:return i*t*4/s.components*s.byteLength;case na:return i*t*4/s.components*s.byteLength;case es:case ns:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case is:case ss:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sr:case Er:return Math.max(i,16)*Math.max(t,8)/4;case Mr:case yr:return Math.max(i,8)*Math.max(t,8)/2;case br:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Rr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Cr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Pr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Lr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Dr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ur:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ir:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Nr:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fr:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Or:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Br:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case zr:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case kr:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case rs:case Hr:case Gr:return Math.ceil(i/4)*Math.ceil(t/4)*16;case zo:case Vr:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Wr:case Xr:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function yp(i){switch(i){case sn:case Po:return{byteLength:1,components:1};case Ei:case Lo:case Ti:return{byteLength:2,components:1};case Jr:case Qr:return{byteLength:2,components:4};case Un:case Zr:case en:return{byteLength:4,components:1};case Do:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ep(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Dt,d=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,S){return m?new OffscreenCanvas(w,S):fs("canvas")}function M(w,S,H){let Z=1;const it=Ct(w);if((it.width>H||it.height>H)&&(Z=H/Math.max(it.width,it.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const $=Math.floor(Z*it.width),Mt=Math.floor(Z*it.height);f===void 0&&(f=_($,Mt));const lt=S?_($,Mt):f;return lt.width=$,lt.height=Mt,lt.getContext("2d").drawImage(w,0,0,$,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+$+"x"+Mt+")."),lt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),w;return w}function c(w){return w.generateMipmaps&&w.minFilter!==Ie&&w.minFilter!==ze}function h(w){i.generateMipmap(w)}function E(w,S,H,Z,it=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=S;if(S===i.RED&&(H===i.FLOAT&&($=i.R32F),H===i.HALF_FLOAT&&($=i.R16F),H===i.UNSIGNED_BYTE&&($=i.R8)),S===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.R8UI),H===i.UNSIGNED_SHORT&&($=i.R16UI),H===i.UNSIGNED_INT&&($=i.R32UI),H===i.BYTE&&($=i.R8I),H===i.SHORT&&($=i.R16I),H===i.INT&&($=i.R32I)),S===i.RG&&(H===i.FLOAT&&($=i.RG32F),H===i.HALF_FLOAT&&($=i.RG16F),H===i.UNSIGNED_BYTE&&($=i.RG8)),S===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RG8UI),H===i.UNSIGNED_SHORT&&($=i.RG16UI),H===i.UNSIGNED_INT&&($=i.RG32UI),H===i.BYTE&&($=i.RG8I),H===i.SHORT&&($=i.RG16I),H===i.INT&&($=i.RG32I)),S===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGB8UI),H===i.UNSIGNED_SHORT&&($=i.RGB16UI),H===i.UNSIGNED_INT&&($=i.RGB32UI),H===i.BYTE&&($=i.RGB8I),H===i.SHORT&&($=i.RGB16I),H===i.INT&&($=i.RGB32I)),S===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGBA8UI),H===i.UNSIGNED_SHORT&&($=i.RGBA16UI),H===i.UNSIGNED_INT&&($=i.RGBA32UI),H===i.BYTE&&($=i.RGBA8I),H===i.SHORT&&($=i.RGBA16I),H===i.INT&&($=i.RGBA32I)),S===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),S===i.RGBA){const Mt=it?cs:Yt.getTransfer(Z);H===i.FLOAT&&($=i.RGBA32F),H===i.HALF_FLOAT&&($=i.RGBA16F),H===i.UNSIGNED_BYTE&&($=Mt===ee?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(w,S){let H;return w?S===null||S===Un||S===ci?H=i.DEPTH24_STENCIL8:S===en?H=i.DEPTH32F_STENCIL8:S===Ei&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Un||S===ci?H=i.DEPTH_COMPONENT24:S===en?H=i.DEPTH_COMPONENT32F:S===Ei&&(H=i.DEPTH_COMPONENT16),H}function b(w,S){return c(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ie&&w.minFilter!==ze?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function D(w){const S=w.target;S.removeEventListener("dispose",D),R(S),S.isVideoTexture&&d.delete(S)}function C(w){const S=w.target;S.removeEventListener("dispose",C),W(S)}function R(w){const S=n.get(w);if(S.__webglInit===void 0)return;const H=w.source,Z=p.get(H);if(Z){const it=Z[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&T(w),Object.keys(Z).length===0&&p.delete(H)}n.remove(w)}function T(w){const S=n.get(w);i.deleteTexture(S.__webglTexture);const H=w.source,Z=p.get(H);delete Z[S.__cacheKey],a.memory.textures--}function W(w){const S=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let it=0;it<S.__webglFramebuffer[Z].length;it++)i.deleteFramebuffer(S.__webglFramebuffer[Z][it]);else i.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)i.deleteFramebuffer(S.__webglFramebuffer[Z]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const H=w.textures;for(let Z=0,it=H.length;Z<it;Z++){const $=n.get(H[Z]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(H[Z])}n.remove(w)}let g=0;function v(){g=0}function L(){const w=g;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),g+=1,w}function A(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function I(w,S){const H=n.get(w);if(w.isVideoTexture&&At(w),w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){const Z=w.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Pt(H,w,S);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+S)}function q(w,S){const H=n.get(w);if(w.version>0&&H.__version!==w.version){Pt(H,w,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+S)}function O(w,S){const H=n.get(w);if(w.version>0&&H.__version!==w.version){Pt(H,w,S);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+S)}function K(w,S){const H=n.get(w);if(w.version>0&&H.__version!==w.version){j(H,w,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+S)}const z={[vr]:i.REPEAT,[Pn]:i.CLAMP_TO_EDGE,[xr]:i.MIRRORED_REPEAT},nt={[Ie]:i.NEAREST,[oc]:i.NEAREST_MIPMAP_NEAREST,[Pi]:i.NEAREST_MIPMAP_LINEAR,[ze]:i.LINEAR,[Rs]:i.LINEAR_MIPMAP_NEAREST,[Ln]:i.LINEAR_MIPMAP_LINEAR},J={[uc]:i.NEVER,[gc]:i.ALWAYS,[dc]:i.LESS,[Ho]:i.LEQUAL,[fc]:i.EQUAL,[_c]:i.GEQUAL,[pc]:i.GREATER,[mc]:i.NOTEQUAL};function et(w,S){if(S.type===en&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ze||S.magFilter===Rs||S.magFilter===Pi||S.magFilter===Ln||S.minFilter===ze||S.minFilter===Rs||S.minFilter===Pi||S.minFilter===Ln)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,z[S.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,z[S.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,z[S.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,nt[S.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,nt[S.minFilter]),S.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,J[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ie||S.minFilter!==Pi&&S.minFilter!==Ln||S.type===en&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function vt(w,S){let H=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",D));const Z=S.source;let it=p.get(Z);it===void 0&&(it={},p.set(Z,it));const $=A(S);if($!==w.__cacheKey){it[$]===void 0&&(it[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),it[$].usedTimes++;const Mt=it[w.__cacheKey];Mt!==void 0&&(it[w.__cacheKey].usedTimes--,Mt.usedTimes===0&&T(S)),w.__cacheKey=$,w.__webglTexture=it[$].texture}return H}function Pt(w,S,H){let Z=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=i.TEXTURE_3D);const it=vt(w,S),$=S.source;e.bindTexture(Z,w.__webglTexture,i.TEXTURE0+H);const Mt=n.get($);if($.version!==Mt.__version||it===!0){e.activeTexture(i.TEXTURE0+H);const lt=Yt.getPrimaries(Yt.workingColorSpace),pt=S.colorSpace===fn?null:Yt.getPrimaries(S.colorSpace),Gt=S.colorSpace===fn||lt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let st=M(S.image,!1,s.maxTextureSize);st=Qt(S,st);const mt=r.convert(S.format,S.colorSpace),wt=r.convert(S.type);let Rt=E(S.internalFormat,mt,wt,S.colorSpace,S.isVideoTexture);et(Z,S);let _t;const Ot=S.mipmaps,Lt=S.isVideoTexture!==!0,Jt=Mt.__version===void 0||it===!0,U=$.dataReady,dt=b(S,st);if(S.isDepthTexture)Rt=x(S.format===hi,S.type),Jt&&(Lt?e.texStorage2D(i.TEXTURE_2D,1,Rt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Rt,st.width,st.height,0,mt,wt,null));else if(S.isDataTexture)if(Ot.length>0){Lt&&Jt&&e.texStorage2D(i.TEXTURE_2D,dt,Rt,Ot[0].width,Ot[0].height);for(let Y=0,tt=Ot.length;Y<tt;Y++)_t=Ot[Y],Lt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,mt,wt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Rt,_t.width,_t.height,0,mt,wt,_t.data);S.generateMipmaps=!1}else Lt?(Jt&&e.texStorage2D(i.TEXTURE_2D,dt,Rt,st.width,st.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,mt,wt,st.data)):e.texImage2D(i.TEXTURE_2D,0,Rt,st.width,st.height,0,mt,wt,st.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Lt&&Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Rt,Ot[0].width,Ot[0].height,st.depth);for(let Y=0,tt=Ot.length;Y<tt;Y++)if(_t=Ot[Y],S.format!==He)if(mt!==null)if(Lt){if(U)if(S.layerUpdates.size>0){const ct=uo(_t.width,_t.height,S.format,S.type);for(const ft of S.layerUpdates){const kt=_t.data.subarray(ft*ct/_t.data.BYTES_PER_ELEMENT,(ft+1)*ct/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,ft,_t.width,_t.height,1,mt,kt,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,st.depth,mt,_t.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Rt,_t.width,_t.height,st.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,st.depth,mt,wt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Rt,_t.width,_t.height,st.depth,0,mt,wt,_t.data)}else{Lt&&Jt&&e.texStorage2D(i.TEXTURE_2D,dt,Rt,Ot[0].width,Ot[0].height);for(let Y=0,tt=Ot.length;Y<tt;Y++)_t=Ot[Y],S.format!==He?mt!==null?Lt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,mt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Rt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,mt,wt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Rt,_t.width,_t.height,0,mt,wt,_t.data)}else if(S.isDataArrayTexture)if(Lt){if(Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Rt,st.width,st.height,st.depth),U)if(S.layerUpdates.size>0){const Y=uo(st.width,st.height,S.format,S.type);for(const tt of S.layerUpdates){const ct=st.data.subarray(tt*Y/st.data.BYTES_PER_ELEMENT,(tt+1)*Y/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,st.width,st.height,1,mt,wt,ct)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,mt,wt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,st.width,st.height,st.depth,0,mt,wt,st.data);else if(S.isData3DTexture)Lt?(Jt&&e.texStorage3D(i.TEXTURE_3D,dt,Rt,st.width,st.height,st.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,mt,wt,st.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,st.width,st.height,st.depth,0,mt,wt,st.data);else if(S.isFramebufferTexture){if(Jt)if(Lt)e.texStorage2D(i.TEXTURE_2D,dt,Rt,st.width,st.height);else{let Y=st.width,tt=st.height;for(let ct=0;ct<dt;ct++)e.texImage2D(i.TEXTURE_2D,ct,Rt,Y,tt,0,mt,wt,null),Y>>=1,tt>>=1}}else if(Ot.length>0){if(Lt&&Jt){const Y=Ct(Ot[0]);e.texStorage2D(i.TEXTURE_2D,dt,Rt,Y.width,Y.height)}for(let Y=0,tt=Ot.length;Y<tt;Y++)_t=Ot[Y],Lt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,mt,wt,_t):e.texImage2D(i.TEXTURE_2D,Y,Rt,mt,wt,_t);S.generateMipmaps=!1}else if(Lt){if(Jt){const Y=Ct(st);e.texStorage2D(i.TEXTURE_2D,dt,Rt,Y.width,Y.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,wt,st)}else e.texImage2D(i.TEXTURE_2D,0,Rt,mt,wt,st);c(S)&&h(Z),Mt.__version=$.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function j(w,S,H){if(S.image.length!==6)return;const Z=vt(w,S),it=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+H);const $=n.get(it);if(it.version!==$.__version||Z===!0){e.activeTexture(i.TEXTURE0+H);const Mt=Yt.getPrimaries(Yt.workingColorSpace),lt=S.colorSpace===fn?null:Yt.getPrimaries(S.colorSpace),pt=S.colorSpace===fn||Mt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Gt=S.isCompressedTexture||S.image[0].isCompressedTexture,st=S.image[0]&&S.image[0].isDataTexture,mt=[];for(let tt=0;tt<6;tt++)!Gt&&!st?mt[tt]=M(S.image[tt],!0,s.maxCubemapSize):mt[tt]=st?S.image[tt].image:S.image[tt],mt[tt]=Qt(S,mt[tt]);const wt=mt[0],Rt=r.convert(S.format,S.colorSpace),_t=r.convert(S.type),Ot=E(S.internalFormat,Rt,_t,S.colorSpace),Lt=S.isVideoTexture!==!0,Jt=$.__version===void 0||Z===!0,U=it.dataReady;let dt=b(S,wt);et(i.TEXTURE_CUBE_MAP,S);let Y;if(Gt){Lt&&Jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ot,wt.width,wt.height);for(let tt=0;tt<6;tt++){Y=mt[tt].mipmaps;for(let ct=0;ct<Y.length;ct++){const ft=Y[ct];S.format!==He?Rt!==null?Lt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,0,0,ft.width,ft.height,Rt,ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,Ot,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,0,0,ft.width,ft.height,Rt,_t,ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,Ot,ft.width,ft.height,0,Rt,_t,ft.data)}}}else{if(Y=S.mipmaps,Lt&&Jt){Y.length>0&&dt++;const tt=Ct(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ot,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(st){Lt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,mt[tt].width,mt[tt].height,Rt,_t,mt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,mt[tt].width,mt[tt].height,0,Rt,_t,mt[tt].data);for(let ct=0;ct<Y.length;ct++){const kt=Y[ct].image[tt].image;Lt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,0,0,kt.width,kt.height,Rt,_t,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,Ot,kt.width,kt.height,0,Rt,_t,kt.data)}}else{Lt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Rt,_t,mt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,Rt,_t,mt[tt]);for(let ct=0;ct<Y.length;ct++){const ft=Y[ct];Lt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,0,0,Rt,_t,ft.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,Ot,Rt,_t,ft.image[tt])}}}c(S)&&h(i.TEXTURE_CUBE_MAP),$.__version=it.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Q(w,S,H,Z,it,$){const Mt=r.convert(H.format,H.colorSpace),lt=r.convert(H.type),pt=E(H.internalFormat,Mt,lt,H.colorSpace);if(!n.get(S).__hasExternalTextures){const st=Math.max(1,S.width>>$),mt=Math.max(1,S.height>>$);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,$,pt,st,mt,S.depth,0,Mt,lt,null):e.texImage2D(it,$,pt,st,mt,0,Mt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,it,n.get(H).__webglTexture,0,Ft(S)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,it,n.get(H).__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function X(w,S,H){if(i.bindRenderbuffer(i.RENDERBUFFER,w),S.depthBuffer){const Z=S.depthTexture,it=Z&&Z.isDepthTexture?Z.type:null,$=x(S.stencilBuffer,it),Mt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Ft(S);Ht(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,$,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,$,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,$,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,w)}else{const Z=S.textures;for(let it=0;it<Z.length;it++){const $=Z[it],Mt=r.convert($.format,$.colorSpace),lt=r.convert($.type),pt=E($.internalFormat,Mt,lt,$.colorSpace),Gt=Ft(S);H&&Ht(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,pt,S.width,S.height):Ht(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,pt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function k(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),I(S.depthTexture,0);const Z=n.get(S.depthTexture).__webglTexture,it=Ft(S);if(S.depthTexture.format===si)Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(S.depthTexture.format===hi)Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ot(w){const S=n.get(w),H=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",it)};Z.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=Z}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");k(S.__webglFramebuffer,w)}else if(H){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=i.createRenderbuffer(),X(S.__webglDepthbuffer[Z],w,!1);else{const it=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),X(S.__webglDepthbuffer,w,!1);else{const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,it)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Et(w,S,H){const Z=n.get(w);S!==void 0&&Q(Z.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&ot(w)}function Bt(w){const S=w.texture,H=n.get(w),Z=n.get(S);w.addEventListener("dispose",C);const it=w.textures,$=w.isWebGLCubeRenderTarget===!0,Mt=it.length>1;if(Mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=S.version,a.memory.textures++),$){H.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[lt]=[];for(let pt=0;pt<S.mipmaps.length;pt++)H.__webglFramebuffer[lt][pt]=i.createFramebuffer()}else H.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let lt=0;lt<S.mipmaps.length;lt++)H.__webglFramebuffer[lt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let lt=0,pt=it.length;lt<pt;lt++){const Gt=n.get(it[lt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Ht(w)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let lt=0;lt<it.length;lt++){const pt=it[lt];H.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[lt]);const Gt=r.convert(pt.format,pt.colorSpace),st=r.convert(pt.type),mt=E(pt.internalFormat,Gt,st,pt.colorSpace,w.isXRRenderTarget===!0),wt=Ft(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,wt,mt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,H.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),X(H.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),et(i.TEXTURE_CUBE_MAP,S);for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)Q(H.__webglFramebuffer[lt][pt],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else Q(H.__webglFramebuffer[lt],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);c(S)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let lt=0,pt=it.length;lt<pt;lt++){const Gt=it[lt],st=n.get(Gt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),et(i.TEXTURE_2D,Gt),Q(H.__webglFramebuffer,w,Gt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),c(Gt)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(lt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),et(lt,S),S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)Q(H.__webglFramebuffer[pt],w,S,i.COLOR_ATTACHMENT0,lt,pt);else Q(H.__webglFramebuffer,w,S,i.COLOR_ATTACHMENT0,lt,0);c(S)&&h(lt),e.unbindTexture()}w.depthBuffer&&ot(w)}function $t(w){const S=w.textures;for(let H=0,Z=S.length;H<Z;H++){const it=S[H];if(c(it)){const $=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Mt=n.get(it).__webglTexture;e.bindTexture($,Mt),h($),e.unbindTexture()}}}const zt=[],P=[];function Ae(w){if(w.samples>0){if(Ht(w)===!1){const S=w.textures,H=w.width,Z=w.height;let it=i.COLOR_BUFFER_BIT;const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(w),lt=S.length>1;if(lt)for(let pt=0;pt<S.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let pt=0;pt<S.length;pt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[pt]);const Gt=n.get(S[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,H,Z,0,0,H,Z,it,i.NEAREST),l===!0&&(zt.length=0,P.length=0,zt.push(i.COLOR_ATTACHMENT0+pt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(zt.push($),P.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let pt=0;pt<S.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[pt]);const Gt=n.get(S[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const S=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ft(w){return Math.min(s.maxSamples,w.samples)}function Ht(w){const S=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function At(w){const S=a.render.frame;d.get(w)!==S&&(d.set(w,S),w.update())}function Qt(w,S){const H=w.colorSpace,Z=w.format,it=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||H!==xn&&H!==fn&&(Yt.getTransfer(H)===ee?(Z!==He||it!==sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),S}function Ct(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(u.width=w.naturalWidth||w.width,u.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(u.width=w.displayWidth,u.height=w.displayHeight):(u.width=w.width,u.height=w.height),u}this.allocateTextureUnit=L,this.resetTextureUnits=v,this.setTexture2D=I,this.setTexture2DArray=q,this.setTexture3D=O,this.setTextureCube=K,this.rebindTextures=Et,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=Ht}function bp(i,t){function e(n,s=fn){let r;const a=Yt.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===Jr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Do)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Po)return i.BYTE;if(n===Lo)return i.SHORT;if(n===Ei)return i.UNSIGNED_SHORT;if(n===Zr)return i.INT;if(n===Un)return i.UNSIGNED_INT;if(n===en)return i.FLOAT;if(n===Ti)return i.HALF_FLOAT;if(n===Uo)return i.ALPHA;if(n===Io)return i.RGB;if(n===He)return i.RGBA;if(n===No)return i.LUMINANCE;if(n===Fo)return i.LUMINANCE_ALPHA;if(n===si)return i.DEPTH_COMPONENT;if(n===hi)return i.DEPTH_STENCIL;if(n===Oo)return i.RED;if(n===ta)return i.RED_INTEGER;if(n===Bo)return i.RG;if(n===ea)return i.RG_INTEGER;if(n===na)return i.RGBA_INTEGER;if(n===es||n===ns||n===is||n===ss)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===es)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ss)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===es)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ns)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===is)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ss)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mr||n===Sr||n===yr||n===Er)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Er)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===br||n===Tr||n===Ar)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===br||n===Tr)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ar)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wr||n===Rr||n===Cr||n===Pr||n===Lr||n===Dr||n===Ur||n===Ir||n===Nr||n===Fr||n===Or||n===Br||n===zr||n===kr)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Cr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Dr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ur)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ir)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Or)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Br)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===kr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rs||n===Hr||n===Gr)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===rs)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Hr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zo||n===Vr||n===Wr||n===Xr)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===rs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ci?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Tp extends Le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ei extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ap={type:"move"};class ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(u&&t.hand){a=!0;for(const M of t.hand.values()){const c=e.getJointPose(M,n),h=this._getHandJoint(u,M);c!==null&&(h.matrix.fromArray(c.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=c.radius),h.visible=c!==null}const d=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],p=d.position.distanceTo(f.position),m=.02,_=.005;u.inputState.pinching&&p>m+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&p<=m-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ap)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ei;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const wp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Cp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Te,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vn({vertexShader:wp,fragmentShader:Rp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pe(new fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pp extends Fn{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,u=null,d=null,f=null,p=null,m=null,_=null;const M=new Cp,c=e.getContextAttributes();let h=null,E=null;const x=[],b=[],D=new Dt;let C=null;const R=new Le;R.layers.enable(1),R.viewport=new se;const T=new Le;T.layers.enable(2),T.viewport=new se;const W=[R,T],g=new Tp;g.layers.enable(1),g.layers.enable(2);let v=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Q=x[j];return Q===void 0&&(Q=new ir,x[j]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(j){let Q=x[j];return Q===void 0&&(Q=new ir,x[j]=Q),Q.getGripSpace()},this.getHand=function(j){let Q=x[j];return Q===void 0&&(Q=new ir,x[j]=Q),Q.getHandSpace()};function A(j){const Q=b.indexOf(j.inputSource);if(Q===-1)return;const X=x[Q];X!==void 0&&(X.update(j.inputSource,j.frame,u||a),X.dispatchEvent({type:j.type,data:j.inputSource}))}function I(){s.removeEventListener("select",A),s.removeEventListener("selectstart",A),s.removeEventListener("selectend",A),s.removeEventListener("squeeze",A),s.removeEventListener("squeezestart",A),s.removeEventListener("squeezeend",A),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",q);for(let j=0;j<x.length;j++){const Q=b[j];Q!==null&&(b[j]=null,x[j].disconnect(Q))}v=null,L=null,M.reset(),t.setRenderTarget(h),m=null,p=null,f=null,s=null,E=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(j){u=j},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",A),s.addEventListener("selectstart",A),s.addEventListener("selectend",A),s.addEventListener("squeeze",A),s.addEventListener("squeezestart",A),s.addEventListener("squeezeend",A),s.addEventListener("end",I),s.addEventListener("inputsourceschange",q),c.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const Q={antialias:c.antialias,alpha:!0,depth:c.depth,stencil:c.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new In(m.framebufferWidth,m.framebufferHeight,{format:He,type:sn,colorSpace:t.outputColorSpace,stencilBuffer:c.stencil})}else{let Q=null,X=null,k=null;c.depth&&(k=c.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=c.stencil?hi:si,X=c.stencil?ci:Un);const ot={colorFormat:e.RGBA8,depthFormat:k,scaleFactor:r};f=new XRWebGLBinding(s,e),p=f.createProjectionLayer(ot),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),E=new In(p.textureWidth,p.textureHeight,{format:He,type:sn,depthTexture:new el(p.textureWidth,p.textureHeight,X,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:c.stencil,colorSpace:t.outputColorSpace,samples:c.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await s.requestReferenceSpace(o),Pt.setContext(s),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function q(j){for(let Q=0;Q<j.removed.length;Q++){const X=j.removed[Q],k=b.indexOf(X);k>=0&&(b[k]=null,x[k].disconnect(X))}for(let Q=0;Q<j.added.length;Q++){const X=j.added[Q];let k=b.indexOf(X);if(k===-1){for(let Et=0;Et<x.length;Et++)if(Et>=b.length){b.push(X),k=Et;break}else if(b[Et]===null){b[Et]=X,k=Et;break}if(k===-1)break}const ot=x[k];ot&&ot.connect(X)}}const O=new B,K=new B;function z(j,Q,X){O.setFromMatrixPosition(Q.matrixWorld),K.setFromMatrixPosition(X.matrixWorld);const k=O.distanceTo(K),ot=Q.projectionMatrix.elements,Et=X.projectionMatrix.elements,Bt=ot[14]/(ot[10]-1),$t=ot[14]/(ot[10]+1),zt=(ot[9]+1)/ot[5],P=(ot[9]-1)/ot[5],Ae=(ot[8]-1)/ot[0],Ft=(Et[8]+1)/Et[0],Ht=Bt*Ae,At=Bt*Ft,Qt=k/(-Ae+Ft),Ct=Qt*-Ae;if(Q.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ct),j.translateZ(Qt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ot[10]===-1)j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const w=Bt+Qt,S=$t+Qt,H=Ht-Ct,Z=At+(k-Ct),it=zt*$t/S*w,$=P*$t/S*w;j.projectionMatrix.makePerspective(H,Z,it,$,w,S),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function nt(j,Q){Q===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Q.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Q=j.near,X=j.far;M.texture!==null&&(M.depthNear>0&&(Q=M.depthNear),M.depthFar>0&&(X=M.depthFar)),g.near=T.near=R.near=Q,g.far=T.far=R.far=X,(v!==g.near||L!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),v=g.near,L=g.far);const k=j.parent,ot=g.cameras;nt(g,k);for(let Et=0;Et<ot.length;Et++)nt(ot[Et],k);ot.length===2?z(g,R,T):g.projectionMatrix.copy(R.projectionMatrix),J(j,g,k)};function J(j,Q,X){X===null?j.matrix.copy(Q.matrixWorld):(j.matrix.copy(X.matrixWorld),j.matrix.invert(),j.matrix.multiply(Q.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=qr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(j){l=j,p!==null&&(p.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(g)};let et=null;function vt(j,Q){if(d=Q.getViewerPose(u||a),_=Q,d!==null){const X=d.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let k=!1;X.length!==g.cameras.length&&(g.cameras.length=0,k=!0);for(let Et=0;Et<X.length;Et++){const Bt=X[Et];let $t=null;if(m!==null)$t=m.getViewport(Bt);else{const P=f.getViewSubImage(p,Bt);$t=P.viewport,Et===0&&(t.setRenderTargetTextures(E,P.colorTexture,p.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(E))}let zt=W[Et];zt===void 0&&(zt=new Le,zt.layers.enable(Et),zt.viewport=new se,W[Et]=zt),zt.matrix.fromArray(Bt.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(Bt.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set($t.x,$t.y,$t.width,$t.height),Et===0&&(g.matrix.copy(zt.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),k===!0&&g.cameras.push(zt)}const ot=s.enabledFeatures;if(ot&&ot.includes("depth-sensing")){const Et=f.getDepthInformation(X[0]);Et&&Et.isValid&&Et.texture&&M.init(t,Et,s.renderState)}}for(let X=0;X<x.length;X++){const k=b[X],ot=x[X];k!==null&&ot!==void 0&&ot.update(k,Q,u||a)}et&&et(j,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),_=null}const Pt=new Qo;Pt.setAnimationLoop(vt),this.setAnimationLoop=function(j){et=j},this.dispose=function(){}}}const An=new qe,Lp=new ne;function Dp(i,t){function e(c,h){c.matrixAutoUpdate===!0&&c.updateMatrix(),h.value.copy(c.matrix)}function n(c,h){h.color.getRGB(c.fogColor.value,$o(i)),h.isFog?(c.fogNear.value=h.near,c.fogFar.value=h.far):h.isFogExp2&&(c.fogDensity.value=h.density)}function s(c,h,E,x,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(c,h):h.isMeshToonMaterial?(r(c,h),f(c,h)):h.isMeshPhongMaterial?(r(c,h),d(c,h)):h.isMeshStandardMaterial?(r(c,h),p(c,h),h.isMeshPhysicalMaterial&&m(c,h,b)):h.isMeshMatcapMaterial?(r(c,h),_(c,h)):h.isMeshDepthMaterial?r(c,h):h.isMeshDistanceMaterial?(r(c,h),M(c,h)):h.isMeshNormalMaterial?r(c,h):h.isLineBasicMaterial?(a(c,h),h.isLineDashedMaterial&&o(c,h)):h.isPointsMaterial?l(c,h,E,x):h.isSpriteMaterial?u(c,h):h.isShadowMaterial?(c.color.value.copy(h.color),c.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(c,h){c.opacity.value=h.opacity,h.color&&c.diffuse.value.copy(h.color),h.emissive&&c.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(c.map.value=h.map,e(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,e(h.alphaMap,c.alphaMapTransform)),h.bumpMap&&(c.bumpMap.value=h.bumpMap,e(h.bumpMap,c.bumpMapTransform),c.bumpScale.value=h.bumpScale,h.side===be&&(c.bumpScale.value*=-1)),h.normalMap&&(c.normalMap.value=h.normalMap,e(h.normalMap,c.normalMapTransform),c.normalScale.value.copy(h.normalScale),h.side===be&&c.normalScale.value.negate()),h.displacementMap&&(c.displacementMap.value=h.displacementMap,e(h.displacementMap,c.displacementMapTransform),c.displacementScale.value=h.displacementScale,c.displacementBias.value=h.displacementBias),h.emissiveMap&&(c.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,c.emissiveMapTransform)),h.specularMap&&(c.specularMap.value=h.specularMap,e(h.specularMap,c.specularMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest);const E=t.get(h),x=E.envMap,b=E.envMapRotation;x&&(c.envMap.value=x,An.copy(b),An.x*=-1,An.y*=-1,An.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(An.y*=-1,An.z*=-1),c.envMapRotation.value.setFromMatrix4(Lp.makeRotationFromEuler(An)),c.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.reflectivity.value=h.reflectivity,c.ior.value=h.ior,c.refractionRatio.value=h.refractionRatio),h.lightMap&&(c.lightMap.value=h.lightMap,c.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,c.lightMapTransform)),h.aoMap&&(c.aoMap.value=h.aoMap,c.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,c.aoMapTransform))}function a(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,e(h.map,c.mapTransform))}function o(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale}function l(c,h,E,x){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*E,c.scale.value=x*.5,h.map&&(c.map.value=h.map,e(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,e(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}function u(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,e(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,e(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}function d(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)}function f(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)}function p(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)}function m(c,h,E){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===be&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=E.texture,c.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,c.specularIntensityMapTransform))}function _(c,h){h.matcap&&(c.matcap.value=h.matcap)}function M(c,h){const E=t.get(h).light;c.referencePosition.value.setFromMatrixPosition(E.matrixWorld),c.nearDistance.value=E.shadow.camera.near,c.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Up(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,x){const b=x.program;n.uniformBlockBinding(E,b)}function u(E,x){let b=s[E.id];b===void 0&&(_(E),b=d(E),s[E.id]=b,E.addEventListener("dispose",c));const D=x.program;n.updateUBOMapping(E,D);const C=t.render.frame;r[E.id]!==C&&(p(E),r[E.id]=C)}function d(E){const x=f();E.__bindingPointIndex=x;const b=i.createBuffer(),D=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,D,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const x=s[E.id],b=E.uniforms,D=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let C=0,R=b.length;C<R;C++){const T=Array.isArray(b[C])?b[C]:[b[C]];for(let W=0,g=T.length;W<g;W++){const v=T[W];if(m(v,C,W,D)===!0){const L=v.__offset,A=Array.isArray(v.value)?v.value:[v.value];let I=0;for(let q=0;q<A.length;q++){const O=A[q],K=M(O);typeof O=="number"||typeof O=="boolean"?(v.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,L+I,v.__data)):O.isMatrix3?(v.__data[0]=O.elements[0],v.__data[1]=O.elements[1],v.__data[2]=O.elements[2],v.__data[3]=0,v.__data[4]=O.elements[3],v.__data[5]=O.elements[4],v.__data[6]=O.elements[5],v.__data[7]=0,v.__data[8]=O.elements[6],v.__data[9]=O.elements[7],v.__data[10]=O.elements[8],v.__data[11]=0):(O.toArray(v.__data,I),I+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,v.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,x,b,D){const C=E.value,R=x+"_"+b;if(D[R]===void 0)return typeof C=="number"||typeof C=="boolean"?D[R]=C:D[R]=C.clone(),!0;{const T=D[R];if(typeof C=="number"||typeof C=="boolean"){if(T!==C)return D[R]=C,!0}else if(T.equals(C)===!1)return T.copy(C),!0}return!1}function _(E){const x=E.uniforms;let b=0;const D=16;for(let R=0,T=x.length;R<T;R++){const W=Array.isArray(x[R])?x[R]:[x[R]];for(let g=0,v=W.length;g<v;g++){const L=W[g],A=Array.isArray(L.value)?L.value:[L.value];for(let I=0,q=A.length;I<q;I++){const O=A[I],K=M(O),z=b%D,nt=z%K.boundary,J=z+nt;b+=nt,J!==0&&D-J<K.storage&&(b+=D-J),L.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=K.storage}}}const C=b%D;return C>0&&(b+=D-C),E.__size=b,E.__cache={},this}function M(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function c(E){const x=E.target;x.removeEventListener("dispose",c);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function h(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:u,dispose:h}}class al{constructor(t={}){const{canvas:e=Mc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),_=new Int32Array(4);let M=null,c=null;const h=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=_n,this.toneMappingExposure=1;const x=this;let b=!1,D=0,C=0,R=null,T=-1,W=null;const g=new se,v=new se;let L=null;const A=new Nt(0);let I=0,q=e.width,O=e.height,K=1,z=null,nt=null;const J=new se(0,0,q,O),et=new se(0,0,q,O);let vt=!1;const Pt=new ra;let j=!1,Q=!1;const X=new ne,k=new ne,ot=new B,Et=new se,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $t=!1;function zt(){return R===null?K:1}let P=n;function Ae(y,N){return e.getContext(y,N)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$r}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",ft,!1),P===null){const N="webgl2";if(P=Ae(N,y),P===null)throw Ae(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ft,Ht,At,Qt,Ct,w,S,H,Z,it,$,Mt,lt,pt,Gt,st,mt,wt,Rt,_t,Ot,Lt,Jt,U;function dt(){Ft=new Bd(P),Ft.init(),Lt=new bp(P,Ft),Ht=new Dd(P,Ft,t,Lt),At=new Sp(P),Ht.reverseDepthBuffer&&At.buffers.depth.setReversed(!0),Qt=new Hd(P),Ct=new ap,w=new Ep(P,Ft,At,Ct,Ht,Lt,Qt),S=new Id(x),H=new Od(x),Z=new Kc(P),Jt=new Pd(P,Z),it=new zd(P,Z,Qt,Jt),$=new Vd(P,it,Z,Qt),Rt=new Gd(P,Ht,w),st=new Ud(Ct),Mt=new rp(x,S,H,Ft,Ht,Jt,st),lt=new Dp(x,Ct),pt=new lp,Gt=new pp(Ft),wt=new Cd(x,S,H,At,$,p,l),mt=new xp(x,$,Ht),U=new Up(P,Qt,Ht,At),_t=new Ld(P,Ft,Qt),Ot=new kd(P,Ft,Qt),Qt.programs=Mt.programs,x.capabilities=Ht,x.extensions=Ft,x.properties=Ct,x.renderLists=pt,x.shadowMap=mt,x.state=At,x.info=Qt}dt();const Y=new Pp(x,P);this.xr=Y,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const y=Ft.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ft.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(y){y!==void 0&&(K=y,this.setSize(q,O,!1))},this.getSize=function(y){return y.set(q,O)},this.setSize=function(y,N,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=y,O=N,e.width=Math.floor(y*K),e.height=Math.floor(N*K),G===!0&&(e.style.width=y+"px",e.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(q*K,O*K).floor()},this.setDrawingBufferSize=function(y,N,G){q=y,O=N,K=G,e.width=Math.floor(y*G),e.height=Math.floor(N*G),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(g)},this.getViewport=function(y){return y.copy(J)},this.setViewport=function(y,N,G,V){y.isVector4?J.set(y.x,y.y,y.z,y.w):J.set(y,N,G,V),At.viewport(g.copy(J).multiplyScalar(K).round())},this.getScissor=function(y){return y.copy(et)},this.setScissor=function(y,N,G,V){y.isVector4?et.set(y.x,y.y,y.z,y.w):et.set(y,N,G,V),At.scissor(v.copy(et).multiplyScalar(K).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(y){At.setScissorTest(vt=y)},this.setOpaqueSort=function(y){z=y},this.setTransparentSort=function(y){nt=y},this.getClearColor=function(y){return y.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(y=!0,N=!0,G=!0){let V=0;if(y){let F=!1;if(R!==null){const rt=R.texture.format;F=rt===na||rt===ea||rt===ta}if(F){const rt=R.texture.type,ht=rt===sn||rt===Un||rt===Ei||rt===ci||rt===Jr||rt===Qr,gt=wt.getClearColor(),xt=wt.getClearAlpha(),bt=gt.r,Tt=gt.g,St=gt.b;ht?(m[0]=bt,m[1]=Tt,m[2]=St,m[3]=xt,P.clearBufferuiv(P.COLOR,0,m)):(_[0]=bt,_[1]=Tt,_[2]=St,_[3]=xt,P.clearBufferiv(P.COLOR,0,_))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),pt.dispose(),Gt.dispose(),Ct.dispose(),S.dispose(),H.dispose(),$.dispose(),Jt.dispose(),U.dispose(),Mt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",la),Y.removeEventListener("sessionend",ca),Mn.stop()};function tt(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const y=Qt.autoReset,N=mt.enabled,G=mt.autoUpdate,V=mt.needsUpdate,F=mt.type;dt(),Qt.autoReset=y,mt.enabled=N,mt.autoUpdate=G,mt.needsUpdate=V,mt.type=F}function ft(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function kt(y){const N=y.target;N.removeEventListener("dispose",kt),ae(N)}function ae(y){Me(y),Ct.remove(y)}function Me(y){const N=Ct.get(y).programs;N!==void 0&&(N.forEach(function(G){Mt.releaseProgram(G)}),y.isShaderMaterial&&Mt.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,G,V,F,rt){N===null&&(N=Bt);const ht=F.isMesh&&F.matrixWorld.determinant()<0,gt=gl(y,N,G,V,F);At.setMaterial(V,ht);let xt=G.index,bt=1;if(V.wireframe===!0){if(xt=it.getWireframeAttribute(G),xt===void 0)return;bt=2}const Tt=G.drawRange,St=G.attributes.position;let Kt=Tt.start*bt,te=(Tt.start+Tt.count)*bt;rt!==null&&(Kt=Math.max(Kt,rt.start*bt),te=Math.min(te,(rt.start+rt.count)*bt)),xt!==null?(Kt=Math.max(Kt,0),te=Math.min(te,xt.count)):St!=null&&(Kt=Math.max(Kt,0),te=Math.min(te,St.count));const ie=te-Kt;if(ie<0||ie===1/0)return;Jt.setup(F,V,gt,G,xt);let we,Xt=_t;if(xt!==null&&(we=Z.get(xt),Xt=Ot,Xt.setIndex(we)),F.isMesh)V.wireframe===!0?(At.setLineWidth(V.wireframeLinewidth*zt()),Xt.setMode(P.LINES)):Xt.setMode(P.TRIANGLES);else if(F.isLine){let yt=V.linewidth;yt===void 0&&(yt=1),At.setLineWidth(yt*zt()),F.isLineSegments?Xt.setMode(P.LINES):F.isLineLoop?Xt.setMode(P.LINE_LOOP):Xt.setMode(P.LINE_STRIP)}else F.isPoints?Xt.setMode(P.POINTS):F.isSprite&&Xt.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Xt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))Xt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const yt=F._multiDrawStarts,fe=F._multiDrawCounts,qt=F._multiDrawCount,Ne=xt?Z.get(xt).bytesPerElement:1,Bn=Ct.get(V).currentProgram.getUniforms();for(let Re=0;Re<qt;Re++)Bn.setValue(P,"_gl_DrawID",Re),Xt.render(yt[Re]/Ne,fe[Re])}else if(F.isInstancedMesh)Xt.renderInstances(Kt,ie,F.count);else if(G.isInstancedBufferGeometry){const yt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,fe=Math.min(G.instanceCount,yt);Xt.renderInstances(Kt,ie,fe)}else Xt.render(Kt,ie)};function Vt(y,N,G){y.transparent===!0&&y.side===tn&&y.forceSinglePass===!1?(y.side=be,y.needsUpdate=!0,Ci(y,N,G),y.side=gn,y.needsUpdate=!0,Ci(y,N,G),y.side=tn):Ci(y,N,G)}this.compile=function(y,N,G=null){G===null&&(G=y),c=Gt.get(G),c.init(N),E.push(c),G.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(c.pushLight(F),F.castShadow&&c.pushShadow(F))}),y!==G&&y.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(c.pushLight(F),F.castShadow&&c.pushShadow(F))}),c.setupLights();const V=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const rt=F.material;if(rt)if(Array.isArray(rt))for(let ht=0;ht<rt.length;ht++){const gt=rt[ht];Vt(gt,G,F),V.add(gt)}else Vt(rt,G,F),V.add(rt)}),E.pop(),c=null,V},this.compileAsync=function(y,N,G=null){const V=this.compile(y,N,G);return new Promise(F=>{function rt(){if(V.forEach(function(ht){Ct.get(ht).currentProgram.isReady()&&V.delete(ht)}),V.size===0){F(y);return}setTimeout(rt,10)}Ft.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Se=null;function Ye(y){Se&&Se(y)}function la(){Mn.stop()}function ca(){Mn.start()}const Mn=new Qo;Mn.setAnimationLoop(Ye),typeof self<"u"&&Mn.setContext(self),this.setAnimationLoop=function(y){Se=y,Y.setAnimationLoop(y),y===null?Mn.stop():Mn.start()},Y.addEventListener("sessionstart",la),Y.addEventListener("sessionend",ca),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(N),N=Y.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,N,R),c=Gt.get(y,E.length),c.init(N),E.push(c),k.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Pt.setFromProjectionMatrix(k),Q=this.localClippingEnabled,j=st.init(this.clippingPlanes,Q),M=pt.get(y,h.length),M.init(),h.push(M),Y.enabled===!0&&Y.isPresenting===!0){const rt=x.xr.getDepthSensingMesh();rt!==null&&bs(rt,N,-1/0,x.sortObjects)}bs(y,N,0,x.sortObjects),M.finish(),x.sortObjects===!0&&M.sort(z,nt),$t=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,$t&&wt.addToRenderList(M,y),this.info.render.frame++,j===!0&&st.beginShadows();const G=c.state.shadowsArray;mt.render(G,y,N),j===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=M.opaque,F=M.transmissive;if(c.setupLights(),N.isArrayCamera){const rt=N.cameras;if(F.length>0)for(let ht=0,gt=rt.length;ht<gt;ht++){const xt=rt[ht];ua(V,F,y,xt)}$t&&wt.render(y);for(let ht=0,gt=rt.length;ht<gt;ht++){const xt=rt[ht];ha(M,y,xt,xt.viewport)}}else F.length>0&&ua(V,F,y,N),$t&&wt.render(y),ha(M,y,N);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),y.isScene===!0&&y.onAfterRender(x,y,N),Jt.resetDefaultState(),T=-1,W=null,E.pop(),E.length>0?(c=E[E.length-1],j===!0&&st.setGlobalState(x.clippingPlanes,c.state.camera)):c=null,h.pop(),h.length>0?M=h[h.length-1]:M=null};function bs(y,N,G,V){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)c.pushLight(y),y.castShadow&&c.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Pt.intersectsSprite(y)){V&&Et.setFromMatrixPosition(y.matrixWorld).applyMatrix4(k);const ht=$.update(y),gt=y.material;gt.visible&&M.push(y,ht,gt,G,Et.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Pt.intersectsObject(y))){const ht=$.update(y),gt=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Et.copy(y.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Et.copy(ht.boundingSphere.center)),Et.applyMatrix4(y.matrixWorld).applyMatrix4(k)),Array.isArray(gt)){const xt=ht.groups;for(let bt=0,Tt=xt.length;bt<Tt;bt++){const St=xt[bt],Kt=gt[St.materialIndex];Kt&&Kt.visible&&M.push(y,ht,Kt,G,Et.z,St)}}else gt.visible&&M.push(y,ht,gt,G,Et.z,null)}}const rt=y.children;for(let ht=0,gt=rt.length;ht<gt;ht++)bs(rt[ht],N,G,V)}function ha(y,N,G,V){const F=y.opaque,rt=y.transmissive,ht=y.transparent;c.setupLightsView(G),j===!0&&st.setGlobalState(x.clippingPlanes,G),V&&At.viewport(g.copy(V)),F.length>0&&Ri(F,N,G),rt.length>0&&Ri(rt,N,G),ht.length>0&&Ri(ht,N,G),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function ua(y,N,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;c.state.transmissionRenderTarget[V.id]===void 0&&(c.state.transmissionRenderTarget[V.id]=new In(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Ti:sn,minFilter:Ln,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const rt=c.state.transmissionRenderTarget[V.id],ht=V.viewport||g;rt.setSize(ht.z,ht.w);const gt=x.getRenderTarget();x.setRenderTarget(rt),x.getClearColor(A),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear(),$t&&wt.render(G);const xt=x.toneMapping;x.toneMapping=_n;const bt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),c.setupLightsView(V),j===!0&&st.setGlobalState(x.clippingPlanes,V),Ri(y,G,V),w.updateMultisampleRenderTarget(rt),w.updateRenderTargetMipmap(rt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let St=0,Kt=N.length;St<Kt;St++){const te=N[St],ie=te.object,we=te.geometry,Xt=te.material,yt=te.group;if(Xt.side===tn&&ie.layers.test(V.layers)){const fe=Xt.side;Xt.side=be,Xt.needsUpdate=!0,da(ie,G,V,we,Xt,yt),Xt.side=fe,Xt.needsUpdate=!0,Tt=!0}}Tt===!0&&(w.updateMultisampleRenderTarget(rt),w.updateRenderTargetMipmap(rt))}x.setRenderTarget(gt),x.setClearColor(A,I),bt!==void 0&&(V.viewport=bt),x.toneMapping=xt}function Ri(y,N,G){const V=N.isScene===!0?N.overrideMaterial:null;for(let F=0,rt=y.length;F<rt;F++){const ht=y[F],gt=ht.object,xt=ht.geometry,bt=V===null?ht.material:V,Tt=ht.group;gt.layers.test(G.layers)&&da(gt,N,G,xt,bt,Tt)}}function da(y,N,G,V,F,rt){y.onBeforeRender(x,N,G,V,F,rt),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(x,N,G,V,y,rt),F.transparent===!0&&F.side===tn&&F.forceSinglePass===!1?(F.side=be,F.needsUpdate=!0,x.renderBufferDirect(G,N,V,F,y,rt),F.side=gn,F.needsUpdate=!0,x.renderBufferDirect(G,N,V,F,y,rt),F.side=tn):x.renderBufferDirect(G,N,V,F,y,rt),y.onAfterRender(x,N,G,V,F,rt)}function Ci(y,N,G){N.isScene!==!0&&(N=Bt);const V=Ct.get(y),F=c.state.lights,rt=c.state.shadowsArray,ht=F.state.version,gt=Mt.getParameters(y,F.state,rt,N,G),xt=Mt.getProgramCacheKey(gt);let bt=V.programs;V.environment=y.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(y.isMeshStandardMaterial?H:S).get(y.envMap||V.environment),V.envMapRotation=V.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,bt===void 0&&(y.addEventListener("dispose",kt),bt=new Map,V.programs=bt);let Tt=bt.get(xt);if(Tt!==void 0){if(V.currentProgram===Tt&&V.lightsStateVersion===ht)return pa(y,gt),Tt}else gt.uniforms=Mt.getUniforms(y),y.onBeforeCompile(gt,x),Tt=Mt.acquireProgram(gt,xt),bt.set(xt,Tt),V.uniforms=gt.uniforms;const St=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(St.clippingPlanes=st.uniform),pa(y,gt),V.needsLights=xl(y),V.lightsStateVersion=ht,V.needsLights&&(St.ambientLightColor.value=F.state.ambient,St.lightProbe.value=F.state.probe,St.directionalLights.value=F.state.directional,St.directionalLightShadows.value=F.state.directionalShadow,St.spotLights.value=F.state.spot,St.spotLightShadows.value=F.state.spotShadow,St.rectAreaLights.value=F.state.rectArea,St.ltc_1.value=F.state.rectAreaLTC1,St.ltc_2.value=F.state.rectAreaLTC2,St.pointLights.value=F.state.point,St.pointLightShadows.value=F.state.pointShadow,St.hemisphereLights.value=F.state.hemi,St.directionalShadowMap.value=F.state.directionalShadowMap,St.directionalShadowMatrix.value=F.state.directionalShadowMatrix,St.spotShadowMap.value=F.state.spotShadowMap,St.spotLightMatrix.value=F.state.spotLightMatrix,St.spotLightMap.value=F.state.spotLightMap,St.pointShadowMap.value=F.state.pointShadowMap,St.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Tt,V.uniformsList=null,Tt}function fa(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=ls.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function pa(y,N){const G=Ct.get(y);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function gl(y,N,G,V,F){N.isScene!==!0&&(N=Bt),w.resetTextureUnits();const rt=N.fog,ht=V.isMeshStandardMaterial?N.environment:null,gt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:xn,xt=(V.isMeshStandardMaterial?H:S).get(V.envMap||ht),bt=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Tt=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),St=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,te=!!G.morphAttributes.color;let ie=_n;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ie=x.toneMapping);const we=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Xt=we!==void 0?we.length:0,yt=Ct.get(V),fe=c.state.lights;if(j===!0&&(Q===!0||y!==W)){const De=y===W&&V.id===T;st.setState(V,y,De)}let qt=!1;V.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==fe.state.version||yt.outputColorSpace!==gt||F.isBatchedMesh&&yt.batching===!1||!F.isBatchedMesh&&yt.batching===!0||F.isBatchedMesh&&yt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&yt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&yt.instancing===!1||!F.isInstancedMesh&&yt.instancing===!0||F.isSkinnedMesh&&yt.skinning===!1||!F.isSkinnedMesh&&yt.skinning===!0||F.isInstancedMesh&&yt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&yt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&yt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&yt.instancingMorph===!1&&F.morphTexture!==null||yt.envMap!==xt||V.fog===!0&&yt.fog!==rt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==st.numPlanes||yt.numIntersection!==st.numIntersection)||yt.vertexAlphas!==bt||yt.vertexTangents!==Tt||yt.morphTargets!==St||yt.morphNormals!==Kt||yt.morphColors!==te||yt.toneMapping!==ie||yt.morphTargetsCount!==Xt)&&(qt=!0):(qt=!0,yt.__version=V.version);let Ne=yt.currentProgram;qt===!0&&(Ne=Ci(V,N,F));let Bn=!1,Re=!1,Ts=!1;const re=Ne.getUniforms(),rn=yt.uniforms;if(At.useProgram(Ne.program)&&(Bn=!0,Re=!0,Ts=!0),V.id!==T&&(T=V.id,Re=!0),Bn||W!==y){Ht.reverseDepthBuffer?(X.copy(y.projectionMatrix),yc(X),Ec(X),re.setValue(P,"projectionMatrix",X)):re.setValue(P,"projectionMatrix",y.projectionMatrix),re.setValue(P,"viewMatrix",y.matrixWorldInverse);const De=re.map.cameraPosition;De!==void 0&&De.setValue(P,ot.setFromMatrixPosition(y.matrixWorld)),Ht.logarithmicDepthBuffer&&re.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&re.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),W!==y&&(W=y,Re=!0,Ts=!0)}if(F.isSkinnedMesh){re.setOptional(P,F,"bindMatrix"),re.setOptional(P,F,"bindMatrixInverse");const De=F.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),re.setValue(P,"boneTexture",De.boneTexture,w))}F.isBatchedMesh&&(re.setOptional(P,F,"batchingTexture"),re.setValue(P,"batchingTexture",F._matricesTexture,w),re.setOptional(P,F,"batchingIdTexture"),re.setValue(P,"batchingIdTexture",F._indirectTexture,w),re.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&re.setValue(P,"batchingColorTexture",F._colorsTexture,w));const As=G.morphAttributes;if((As.position!==void 0||As.normal!==void 0||As.color!==void 0)&&Rt.update(F,G,Ne),(Re||yt.receiveShadow!==F.receiveShadow)&&(yt.receiveShadow=F.receiveShadow,re.setValue(P,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(rn.envMap.value=xt,rn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(rn.envMapIntensity.value=N.environmentIntensity),Re&&(re.setValue(P,"toneMappingExposure",x.toneMappingExposure),yt.needsLights&&vl(rn,Ts),rt&&V.fog===!0&&lt.refreshFogUniforms(rn,rt),lt.refreshMaterialUniforms(rn,V,K,O,c.state.transmissionRenderTarget[y.id]),ls.upload(P,fa(yt),rn,w)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ls.upload(P,fa(yt),rn,w),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&re.setValue(P,"center",F.center),re.setValue(P,"modelViewMatrix",F.modelViewMatrix),re.setValue(P,"normalMatrix",F.normalMatrix),re.setValue(P,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const De=V.uniformsGroups;for(let ws=0,Ml=De.length;ws<Ml;ws++){const ma=De[ws];U.update(ma,Ne),U.bind(ma,Ne)}}return Ne}function vl(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function xl(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(y,N,G){Ct.get(y.texture).__webglTexture=N,Ct.get(y.depthTexture).__webglTexture=G;const V=Ct.get(y);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,N){const G=Ct.get(y);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,G=0){R=y,D=N,C=G;let V=!0,F=null,rt=!1,ht=!1;if(y){const xt=Ct.get(y);if(xt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(xt.__webglFramebuffer===void 0)w.setupRenderTarget(y);else if(xt.__hasExternalTextures)w.rebindTextures(y,Ct.get(y.texture).__webglTexture,Ct.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const St=y.depthTexture;if(xt.__boundDepthTexture!==St){if(St!==null&&Ct.has(St)&&(y.width!==St.image.width||y.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(y)}}const bt=y.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(ht=!0);const Tt=Ct.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Tt[N])?F=Tt[N][G]:F=Tt[N],rt=!0):y.samples>0&&w.useMultisampledRTT(y)===!1?F=Ct.get(y).__webglMultisampledFramebuffer:Array.isArray(Tt)?F=Tt[G]:F=Tt,g.copy(y.viewport),v.copy(y.scissor),L=y.scissorTest}else g.copy(J).multiplyScalar(K).floor(),v.copy(et).multiplyScalar(K).floor(),L=vt;if(At.bindFramebuffer(P.FRAMEBUFFER,F)&&V&&At.drawBuffers(y,F),At.viewport(g),At.scissor(v),At.setScissorTest(L),rt){const xt=Ct.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,xt.__webglTexture,G)}else if(ht){const xt=Ct.get(y.texture),bt=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.__webglTexture,G||0,bt)}T=-1},this.readRenderTargetPixels=function(y,N,G,V,F,rt,ht){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Ct.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){At.bindFramebuffer(P.FRAMEBUFFER,gt);try{const xt=y.texture,bt=xt.format,Tt=xt.type;if(!Ht.textureFormatReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-V&&G>=0&&G<=y.height-F&&P.readPixels(N,G,V,F,Lt.convert(bt),Lt.convert(Tt),rt)}finally{const xt=R!==null?Ct.get(R).__webglFramebuffer:null;At.bindFramebuffer(P.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(y,N,G,V,F,rt,ht){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Ct.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){const xt=y.texture,bt=xt.format,Tt=xt.type;if(!Ht.textureFormatReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=y.width-V&&G>=0&&G<=y.height-F){At.bindFramebuffer(P.FRAMEBUFFER,gt);const St=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,St),P.bufferData(P.PIXEL_PACK_BUFFER,rt.byteLength,P.STREAM_READ),P.readPixels(N,G,V,F,Lt.convert(bt),Lt.convert(Tt),0);const Kt=R!==null?Ct.get(R).__webglFramebuffer:null;At.bindFramebuffer(P.FRAMEBUFFER,Kt);const te=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Sc(P,te,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,St),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,rt),P.deleteBuffer(St),P.deleteSync(te),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,N=null,G=0){y.isTexture!==!0&&(os("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,y=arguments[1]);const V=Math.pow(2,-G),F=Math.floor(y.image.width*V),rt=Math.floor(y.image.height*V),ht=N!==null?N.x:0,gt=N!==null?N.y:0;w.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,ht,gt,F,rt),At.unbindTexture()},this.copyTextureToTexture=function(y,N,G=null,V=null,F=0){y.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,y=arguments[1],N=arguments[2],F=arguments[3]||0,G=null);let rt,ht,gt,xt,bt,Tt;G!==null?(rt=G.max.x-G.min.x,ht=G.max.y-G.min.y,gt=G.min.x,xt=G.min.y):(rt=y.image.width,ht=y.image.height,gt=0,xt=0),V!==null?(bt=V.x,Tt=V.y):(bt=0,Tt=0);const St=Lt.convert(N.format),Kt=Lt.convert(N.type);w.setTexture2D(N,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const te=P.getParameter(P.UNPACK_ROW_LENGTH),ie=P.getParameter(P.UNPACK_IMAGE_HEIGHT),we=P.getParameter(P.UNPACK_SKIP_PIXELS),Xt=P.getParameter(P.UNPACK_SKIP_ROWS),yt=P.getParameter(P.UNPACK_SKIP_IMAGES),fe=y.isCompressedTexture?y.mipmaps[F]:y.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,gt),P.pixelStorei(P.UNPACK_SKIP_ROWS,xt),y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,bt,Tt,rt,ht,St,Kt,fe.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,bt,Tt,fe.width,fe.height,St,fe.data):P.texSubImage2D(P.TEXTURE_2D,F,bt,Tt,rt,ht,St,Kt,fe),P.pixelStorei(P.UNPACK_ROW_LENGTH,te),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ie),P.pixelStorei(P.UNPACK_SKIP_PIXELS,we),P.pixelStorei(P.UNPACK_SKIP_ROWS,Xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,yt),F===0&&N.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(y,N,G=null,V=null,F=0){y.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,V=arguments[1]||null,y=arguments[2],N=arguments[3],F=arguments[4]||0);let rt,ht,gt,xt,bt,Tt,St,Kt,te;const ie=y.isCompressedTexture?y.mipmaps[F]:y.image;G!==null?(rt=G.max.x-G.min.x,ht=G.max.y-G.min.y,gt=G.max.z-G.min.z,xt=G.min.x,bt=G.min.y,Tt=G.min.z):(rt=ie.width,ht=ie.height,gt=ie.depth,xt=0,bt=0,Tt=0),V!==null?(St=V.x,Kt=V.y,te=V.z):(St=0,Kt=0,te=0);const we=Lt.convert(N.format),Xt=Lt.convert(N.type);let yt;if(N.isData3DTexture)w.setTexture3D(N,0),yt=P.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)w.setTexture2DArray(N,0),yt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const fe=P.getParameter(P.UNPACK_ROW_LENGTH),qt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ne=P.getParameter(P.UNPACK_SKIP_PIXELS),Bn=P.getParameter(P.UNPACK_SKIP_ROWS),Re=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ie.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ie.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,xt),P.pixelStorei(P.UNPACK_SKIP_ROWS,bt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Tt),y.isDataTexture||y.isData3DTexture?P.texSubImage3D(yt,F,St,Kt,te,rt,ht,gt,we,Xt,ie.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(yt,F,St,Kt,te,rt,ht,gt,we,ie.data):P.texSubImage3D(yt,F,St,Kt,te,rt,ht,gt,we,Xt,ie),P.pixelStorei(P.UNPACK_ROW_LENGTH,fe),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,qt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ne),P.pixelStorei(P.UNPACK_SKIP_ROWS,Bn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Re),F===0&&N.generateMipmaps&&P.generateMipmap(yt),At.unbindTexture()},this.initRenderTarget=function(y){Ct.get(y).__webglFramebuffer===void 0&&w.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?w.setTextureCube(y,0):y.isData3DTexture?w.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?w.setTexture2DArray(y,0):w.setTexture2D(y,0),At.unbindTexture()},this.resetState=function(){D=0,C=0,R=null,At.reset(),Jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ia?"display-p3":"srgb",e.unpackColorSpace=Yt.workingColorSpace===gs?"display-p3":"srgb"}}class Ms{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new Ms(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ol extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qe,this.environmentIntensity=1,this.environmentRotation=new qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ll extends di{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ps=new B,ms=new B,fo=new ne,Si=new sa,Zi=new vs,sr=new B,po=new B;class Ip extends de{constructor(t=new Ge,e=new ll){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ps.fromBufferAttribute(e,s-1),ms.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ps.distanceTo(ms);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zi.copy(n.boundingSphere),Zi.applyMatrix4(s),Zi.radius+=r,t.ray.intersectsSphere(Zi)===!1)return;fo.copy(s).invert(),Si.copy(t.ray).applyMatrix4(fo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=this.isLineSegments?2:1,d=n.index,p=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let M=m,c=_-1;M<c;M+=u){const h=d.getX(M),E=d.getX(M+1),x=Ji(this,t,Si,l,h,E);x&&e.push(x)}if(this.isLineLoop){const M=d.getX(_-1),c=d.getX(m),h=Ji(this,t,Si,l,M,c);h&&e.push(h)}}else{const m=Math.max(0,a.start),_=Math.min(p.count,a.start+a.count);for(let M=m,c=_-1;M<c;M+=u){const h=Ji(this,t,Si,l,M,M+1);h&&e.push(h)}if(this.isLineLoop){const M=Ji(this,t,Si,l,_-1,m);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ji(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(ps.fromBufferAttribute(a,s),ms.fromBufferAttribute(a,r),e.distanceSqToSegment(ps,ms,sr,po)>n)return;sr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(sr);if(!(l<t.near||l>t.far))return{distance:l,point:po.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const mo=new B,_o=new B;class Np extends Ip{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)mo.fromBufferAttribute(e,s),_o.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+mo.distanceTo(_o);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ss extends Ge{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],p=[],m=[];let _=0;const M=[],c=n/2;let h=0;E(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new me(f,3)),this.setAttribute("normal",new me(p,3)),this.setAttribute("uv",new me(m,2));function E(){const b=new B,D=new B;let C=0;const R=(e-t)/n;for(let T=0;T<=r;T++){const W=[],g=T/r,v=g*(e-t)+t;for(let L=0;L<=s;L++){const A=L/s,I=A*l+o,q=Math.sin(I),O=Math.cos(I);D.x=v*q,D.y=-g*n+c,D.z=v*O,f.push(D.x,D.y,D.z),b.set(q,R,O).normalize(),p.push(b.x,b.y,b.z),m.push(A,1-g),W.push(_++)}M.push(W)}for(let T=0;T<s;T++)for(let W=0;W<r;W++){const g=M[W][T],v=M[W+1][T],L=M[W+1][T+1],A=M[W][T+1];t>0&&(d.push(g,v,A),C+=3),e>0&&(d.push(v,L,A),C+=3)}u.addGroup(h,C,0),h+=C}function x(b){const D=_,C=new Dt,R=new B;let T=0;const W=b===!0?t:e,g=b===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,c*g,0),p.push(0,g,0),m.push(.5,.5),_++;const v=_;for(let L=0;L<=s;L++){const I=L/s*l+o,q=Math.cos(I),O=Math.sin(I);R.x=W*O,R.y=c*g,R.z=W*q,f.push(R.x,R.y,R.z),p.push(0,g,0),C.x=q*.5+.5,C.y=O*.5*g+.5,m.push(C.x,C.y),_++}for(let L=0;L<s;L++){const A=D+L,I=v+L;b===!0?d.push(I,I+1,A):d.push(I+1,I,A),T+=3}u.addGroup(h,T,b===!0?1:2),h+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ys extends Ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let u=0;const d=[],f=new B,p=new B,m=[],_=[],M=[],c=[];for(let h=0;h<=n;h++){const E=[],x=h/n;let b=0;h===0&&a===0?b=.5/e:h===n&&l===Math.PI&&(b=-.5/e);for(let D=0;D<=e;D++){const C=D/e;f.x=-t*Math.cos(s+C*r)*Math.sin(a+x*o),f.y=t*Math.cos(a+x*o),f.z=t*Math.sin(s+C*r)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),p.copy(f).normalize(),M.push(p.x,p.y,p.z),c.push(C+b,1-x),E.push(u++)}d.push(E)}for(let h=0;h<n;h++)for(let E=0;E<e;E++){const x=d[h][E+1],b=d[h][E],D=d[h+1][E],C=d[h+1][E+1];(h!==0||a>0)&&m.push(x,b,C),(h!==n-1||l<Math.PI)&&m.push(b,D,C)}this.setIndex(m),this.setAttribute("position",new me(_,3)),this.setAttribute("normal",new me(M,3)),this.setAttribute("uv",new me(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ys(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class pn extends di{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ko,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class cl extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class hl extends cl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const rr=new ne,go=new B,vo=new B;class Fp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ra,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;go.setFromMatrixPosition(t.matrixWorld),e.position.copy(go),vo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vo),e.updateMatrixWorld(),rr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Op extends Fp{constructor(){super(new tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ul extends cl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new Op}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class xo{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dl extends Np{constructor(t=10,e=10,n=4473924,s=8947848){n=new Nt(n),s=new Nt(s);const r=e/2,a=t/e,o=t/2,l=[],u=[];for(let p=0,m=0,_=-o;p<=e;p++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const M=p===r?n:s;M.toArray(u,m),m+=3,M.toArray(u,m),m+=3,M.toArray(u,m),m+=3,M.toArray(u,m),m+=3}const d=new Ge;d.setAttribute("position",new me(l,3)),d.setAttribute("color",new me(u,3));const f=new ll({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Bp extends Fn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$r}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$r);const Mo={type:"change"},oa={type:"start"},fl={type:"end"},Qi=new sa,So=new dn,zp=Math.cos(70*xc.DEG2RAD),le=new B,Ee=2*Math.PI,Zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ar=1e-6;class pl extends Bp{constructor(t,e=null){super(t,e),this.state=Zt.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ni.ROTATE,MIDDLE:ni.DOLLY,RIGHT:ni.PAN},this.touches={ONE:Qn.ROTATE,TWO:Qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Nn,this._lastTargetPosition=new B,this._quat=new Nn().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xo,this._sphericalDelta=new xo,this._scale=1,this._panOffset=new B,this._rotateStart=new Dt,this._rotateEnd=new Dt,this._rotateDelta=new Dt,this._panStart=new Dt,this._panEnd=new Dt,this._panDelta=new Dt,this._dollyStart=new Dt,this._dollyEnd=new Dt,this._dollyDelta=new Dt,this._dollyDirection=new B,this._mouse=new Dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Hp.bind(this),this._onPointerDown=kp.bind(this),this._onPointerUp=Gp.bind(this),this._onContextMenu=jp.bind(this),this._onMouseWheel=Xp.bind(this),this._onKeyDown=qp.bind(this),this._onTouchStart=Yp.bind(this),this._onTouchMove=Kp.bind(this),this._onMouseDown=Vp.bind(this),this._onMouseMove=Wp.bind(this),this._interceptControlDown=$p.bind(this),this._interceptControlUp=Zp.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mo),this.update(),this.state=Zt.NONE}update(t=null){const e=this.object.position;le.copy(e).sub(this.target),le.applyQuaternion(this._quat),this._spherical.setFromVector3(le),this.autoRotate&&this.state===Zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ee:n>Math.PI&&(n-=Ee),s<-Math.PI?s+=Ee:s>Math.PI&&(s-=Ee),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(le.setFromSpherical(this._spherical),le.applyQuaternion(this._quatInverse),e.copy(this.target).add(le),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=le.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const u=new B(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(o),this.object.updateMatrixWorld(),a=le.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Qi.origin.copy(this.object.position),Qi.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qi.direction))<zp?this.object.lookAt(this.target):(So.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qi.intersectPlane(So,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ar||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ar||this._lastTargetPosition.distanceToSquared(this.target)>ar?(this.dispatchEvent(Mo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ee/60*this.autoRotateSpeed*t:Ee/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){le.setFromMatrixColumn(e,0),le.multiplyScalar(-t),this._panOffset.add(le)}_panUp(t,e){this.screenSpacePanning===!0?le.setFromMatrixColumn(e,1):(le.setFromMatrixColumn(e,0),le.crossVectors(this.object.up,le)),le.multiplyScalar(t),this._panOffset.add(le)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;le.copy(s).sub(this.target);let r=le.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ee*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ee*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ee*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ee*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ee*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ee*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ee*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ee*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function kp(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Hp(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Gp(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fl),this.state=Zt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Vp(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ni.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Zt.DOLLY;break;case ni.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}break;case ni.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(oa)}function Wp(i){switch(this.state){case Zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Xp(i){this.enabled===!1||this.enableZoom===!1||this.state!==Zt.NONE||(i.preventDefault(),this.dispatchEvent(oa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fl))}function qp(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Yp(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Zt.TOUCH_ROTATE;break;case Qn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Zt.TOUCH_PAN;break;default:this.state=Zt.NONE}break;case 2:switch(this.touches.TWO){case Qn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Zt.TOUCH_DOLLY_PAN;break;case Qn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Zt.TOUCH_DOLLY_ROTATE;break;default:this.state=Zt.NONE}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(oa)}function Kp(i){switch(this._trackPointer(i),this.state){case Zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Zt.NONE}}function jp(i){this.enabled!==!1&&i.preventDefault()}function $p(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zp(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ts=[{key:"a_baseline",label:"baseline · 110 N",tone:16281969},{key:"a_observer",label:"observer · 110 N",tone:6220500},{key:"step200",label:"stepping · 200 N",tone:6333946}];async function Jp(i){i.innerHTML=`
    <div class="panel stage" data-stage style="aspect-ratio:16/10;min-height:380px"></div>
    <div class="panel controls">
      <div class="ctrl-row">
        <label>sequence</label>
        <div class="seg" data-seg="seq">
          ${ts.map((J,et)=>`<button data-v="${et}"${et===1?' class="on"':""}>${J.label.split(" · ")[0]}</button>`).join("")}
        </div>
      </div>
      <div class="row">
        <button class="btn" data-act="play">⏸ pause</button>
        <button class="btn" data-act="restart">↻ restart</button>
      </div>
      <div class="ctrl-row">
        <label>scrub · <span data-out="time">0.00</span> s</label>
        <input type="range" data-k="scrub" min="0" max="1000" step="1" value="0" />
      </div>
      <div class="ctrl-row">
        <label>speed · <span data-out="speed">1.0</span>×</label>
        <input type="range" data-k="speed" min="0.25" max="2" step="0.25" value="1" />
      </div>
      <div class="readouts">
        <div><div class="ro__lab">disturbance</div><div class="ro__val" data-ro="push">— N</div></div>
        <div><div class="ro__lab">outcome</div><div class="ro__val" data-ro="out">—</div></div>
        <div><div class="ro__lab">base height</div><div class="ro__val" data-ro="bz">— m</div></div>
        <div><div class="ro__lab">phase</div><div class="ro__val" data-ro="ph">—</div></div>
      </div>
      <p class="thm__note">The same body poses MuJoCo computed for the recovery — replayed in the browser.
      Drag to orbit, scrub the timeline, or switch the disturbance. Red highlight marks the push window.</p>
    </div>`;const t=i.querySelector("[data-stage]"),e=J=>i.querySelector(`[data-ro="${J}"]`),n=J=>i.querySelector(`[data-out="${J}"]`),s=new ol;s.background=new Nt(658965),s.fog=new Ms(658965,4,10);const r=new Le(45,16/10,.1,100);r.up.set(0,0,1),r.position.set(2.6,-2.4,1.5);const a=new al({antialias:!0});a.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),a.shadowMap.enabled=!0,t.appendChild(a.domElement),a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.style.display="block";const o=new pl(r,a.domElement);o.target.set(0,0,.75),o.enableDamping=!0,o.dampingFactor=.08,o.minDistance=1.5,o.maxDistance=8,s.add(new hl(10466518,658965,.85));const l=new ul(16777215,1.4);l.position.set(3,-2,5),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.near=1,l.shadow.camera.far=12,l.shadow.camera.left=-3,l.shadow.camera.right=3,l.shadow.camera.top=3,l.shadow.camera.bottom=-3,s.add(l);const u=new pe(new fi(20,20),new pn({color:922656,roughness:.95,metalness:0}));u.receiveShadow=!0,s.add(u);const d=new dl(20,80,1976894,1450031);d.rotation.x=Math.PI/2,s.add(d);const f=new ei;s.add(f);let p=[],m=[],_=[],M=[],c=null;const h=new ys(.022,12,12),E=new B,x=new B,b=new B,D=new B(0,1,0);function C(){for(const J of[...m,..._,...M])f.remove(J),J.geometry?.dispose?.();m=[],_=[],M=[]}function R(J,et){C(),p=J.bodies,c=J;const vt=new pn({color:13490666,roughness:.5,metalness:.1}),Pt=new pn({color:et,roughness:.4,metalness:.15});for(let Q=0;Q<p.length;Q++){const X=new pe(h,vt);if(X.castShadow=!0,f.add(X),m.push(X),p[Q].parent>=0){const k=new pe(new Ss(.018,.018,1,10),Pt);k.castShadow=!0,f.add(k),_.push({mesh:k,child:Q,parent:p[Q].parent})}}const j=new pn({color:3820131,roughness:.6});for(let Q=0;Q<p.length;Q++)if(/ankle_roll/.test(p[Q].name)){const X=new pe(new On(.18,.09,.04),j);X.castShadow=!0,f.add(X),M.push({mesh:X,idx:Q})}}function T(J){const et=c.frames[J];if(!et)return;const vt=et.p,Pt=et.q;for(let k=0;k<p.length;k++)m[k].position.set(vt[k*3],vt[k*3+1],vt[k*3+2]);for(const k of _){E.set(vt[k.parent*3],vt[k.parent*3+1],vt[k.parent*3+2]),x.set(vt[k.child*3],vt[k.child*3+1],vt[k.child*3+2]);const ot=E.distanceTo(x);if(ot<.001){k.mesh.visible=!1;continue}k.mesh.visible=!0,k.mesh.position.copy(E).add(x).multiplyScalar(.5),b.copy(x).sub(E).normalize(),k.mesh.quaternion.setFromUnitVectors(D,b),k.mesh.scale.set(1,ot,1)}for(const k of M){const ot=k.idx;k.mesh.position.set(vt[ot*3],vt[ot*3+1],vt[ot*3+2]-.02),k.mesh.quaternion.set(Pt[ot*4+1],Pt[ot*4+2],Pt[ot*4+3],Pt[ot*4])}const j=vt[2];n("time").textContent=et.t.toFixed(2),e("bz").textContent=j.toFixed(2)+" m";const Q=c.fell&&j<.5;e("ph").textContent=et.push?"PUSH":Q?"fallen":"balancing",e("ph").className="ro__val"+(et.push||Q?" bad":" good");const X=et.push?16281969:ts[W].tone;for(const k of _)k.mesh.material.color.setHex(X)}let W=1,g=0,v=!0,L=1,A=performance.now();const I=i.querySelector('[data-k="scrub"]');async function q(J){W=J,g=0;const et=await fetch(`/adr-web/replay/${ts[J].key}.json`).then(vt=>vt.json());R(et,ts[J].tone),I.max=et.frames.length-1,e("push").textContent=et.pushN+" N ("+et.axis+")",e("out").textContent=et.fell?"falls":"recovers",e("out").className="ro__val"+(et.fell?" bad":" good"),T(0)}i.querySelector('[data-seg="seq"]').addEventListener("click",J=>{const et=J.target.closest("button");et&&(i.querySelectorAll('[data-seg="seq"] button').forEach(vt=>vt.classList.toggle("on",vt===et)),q(+et.dataset.v),v=!0,K())});const O=i.querySelector('[data-act="play"]'),K=()=>{O.textContent=v?"⏸ pause":"▶ play"};O.addEventListener("click",()=>{v=!v,K()}),i.querySelector('[data-act="restart"]').addEventListener("click",()=>{g=0,v=!0,K()}),I.addEventListener("input",J=>{g=+J.target.value,v=!1,K(),T(g|0)}),i.querySelector('[data-k="speed"]').addEventListener("input",J=>{L=+J.target.value,n("speed").textContent=L.toFixed(2)});function z(){const J=t.clientWidth,et=t.clientHeight||J*.625;a.setSize(J,et,!1),r.aspect=J/et,r.updateProjectionMatrix()}new ResizeObserver(z).observe(t);function nt(J){const et=Math.min(.05,(J-A)/1e3);A=J,c&&v&&(g+=et*c.fps*L,g>=c.frames.length&&(g=0),I.value=Math.floor(g),T(Math.floor(g))),o.update(),a.render(s,r),requestAnimationFrame(nt)}await q(1),z(),requestAnimationFrame(nt)}function Qp(i){const t=[];i.querySelectorAll("[data-mini]").forEach(s=>{const r=s.dataset.mini,{ctx:a,W:o,H:l}=bi(s,320,96),u=tm(r,a,o,l);u&&t.push(u)});let e=performance.now();function n(s){const r=Math.min(.05,(s-e)/1e3);e=s;for(const a of t)a.step(r);requestAnimationFrame(n)}requestAnimationFrame(n)}function tm(i,t,e,n){return i==="saddle"?em(t,e,n):i==="critical"?nm(t,e,n):i==="rice"?im(t,e,n):null}function em(i,t,e){const n=t/2,s=e/2,r=t*.42,a=e*.4,o=.70711,l=1.6,u=22,d=[];let f=7;const p=()=>(f=1103515245*f+12345&2147483647,f/2147483647),m=c=>{c.u=(p()-.5)*.22,c.s=(p()*2-1)*1.15,c.trail=[]};for(let c=0;c<u;c++){const h={};m(h),h.s*=p(),d.push(h)}const _=(c,h)=>n+(c+h)*o*r,M=(c,h)=>s-(c-h)*o*a;return{step(c){i.clearRect(0,0,t,e),jt(i,_(-1.4,1.4),M(-1.4,1.4),_(1.4,-1.4),M(1.4,-1.4),"rgba(94,234,212,0.16)",1),jt(i,_(-1.4,-1.4),M(-1.4,-1.4),_(1.4,1.4),M(1.4,1.4),"rgba(248,113,113,0.16)",1);const h=Math.exp(l*c),E=Math.exp(-l*c);for(const x of d){x.u*=h,x.s*=E;const b=_(x.u,x.s),D=M(x.u,x.s);if(x.trail.push([b,D]),x.trail.length>7&&x.trail.shift(),Math.abs(x.u)>1.4||b<-4||b>t+4||D<-4||D>e+4){m(x);continue}const C=Math.min(1,Math.abs(x.u)/1.2),R=`rgba(${251-C*3},${191-C*78},${36+C*36},`;i.strokeStyle=R+"0.5)",i.lineWidth=1.2,i.beginPath(),x.trail.forEach(([T,W],g)=>g?i.lineTo(T,W):i.moveTo(T,W)),i.stroke(),Dn(i,b,D,1.6,R+"0.95)")}Dn(i,n,s,2,"rgba(231,237,245,0.5)")}}}function nm(i,t,e){const l=t-14,u=e-18,d=16,f=.52,p=16+(l-16)*f,m=d+(u-d)*.18;let _=0;const M=c=>c<f?u+(m-u)*(c/f):m;return{step(c){_+=c*.7,i.clearRect(0,0,t,e),jt(i,16,u,l,u,ut.axis,1),i.fillStyle="rgba(248,113,113,0.06)",i.fillRect(p,d,l-p,u-d),jt(i,16,u,p,m,ut.teal,2),jt(i,p,m,l,m,ut.red,2),jt(i,p,d,p,u,"rgba(231,237,245,0.14)",1,[3,4]),jt(i,16,m,l,m,"rgba(248,113,113,0.18)",1,[4,4]);const h=.5+.5*Math.sin(_),E=16+(l-16)*h,x=M(h),b=h>=f;jt(i,E,u,E,x,b?"rgba(248,113,113,0.4)":"rgba(94,234,212,0.4)",1.2,[2,3]),Dn(i,E,x,3.2,b?ut.red:ut.teal)}}}function im(i,t,e){const n=e*.52,s=e*.3,r=n-e*.16,a=2.2,o=Math.ceil(t/a)+2,l=[],u=[.9,1.7,2.6,3.7],d=[0,1.3,2.7,.6];let f=0;const p=M=>{let c=0;for(let h=0;h<u.length;h++)c+=Math.cos(u[h]*M+d[h]);return c/u.length};let m=0;for(let M=0;M<o;M++)l.push(p(m)),m+=.5;const _=[];return{step(M){if(f+=M,f>.028){f=0,l.push(p(m)),m+=.5,l.shift();for(const c of _)c.x-=a}i.clearRect(0,0,t,e),i.fillStyle="rgba(96,165,250,0.05)",i.fillRect(0,n-s*.55,t,s*1.1),jt(i,0,r,t,r,ut.amber,1.4,[5,4]),i.strokeStyle=ut.dim,i.lineWidth=1.5,i.beginPath();for(let c=0;c<l.length;c++){const h=c*a,E=n-l[c]*s;c?i.lineTo(h,E):i.moveTo(h,E)}i.stroke();for(let c=1;c<l.length;c++){const h=n-l[c-1]*s,E=n-l[c]*s;if(h>=r&&E<r){const x=c*a;_.some(b=>Math.abs(b.x-x)<a*1.5)||_.push({x,life:1})}}for(let c=_.length-1;c>=0;c--){const h=_[c];if(h.life-=M*1.6,h.life<=0||h.x<-6){_.splice(c,1);continue}i.strokeStyle=`rgba(248,113,113,${.5+.5*h.life})`,i.lineWidth=1.6,i.beginPath(),i.moveTo(h.x-4,r-4),i.lineTo(h.x+4,r+4),i.moveTo(h.x+4,r-4),i.lineTo(h.x-4,r+4),i.stroke()}}}}function sm(i){const{ctx:t,W:e,H:n}=bi(i,640,384),s=224,r=70,a={obs:{x:24,y:30,accent:ut.amber,title:"6-D WRENCH OBSERVER",sub:"triple pole · ~24 ms"},plan:{x:e-24-s,y:30,accent:ut.teal,title:"CENTROIDAL NMPC",sub:"SQP/HPIPM · 80 Hz · 4.9 ms"},robot:{x:24,y:n-30-r,accent:ut.faint,title:"MUJOCO · UNITREE G1",sub:"29 DoF · contact forces"},ctrl:{x:e-24-s,y:n-30-r,accent:ut.blue,title:"MRT CONTROL LOOP",sub:"500 Hz · eval + step trigger"}};for(const c in a){const h=a[c];h.w=s,h.h=r,h.cx=h.x+s/2,h.cy=h.y+r/2}const o=[{a:"plan",b:"ctrl",side:"rv",label:"policy  u*(·)",col:ut.teal},{a:"ctrl",b:"robot",side:"bh",label:"joint torques  τ",col:ut.blue},{a:"robot",b:"obs",side:"lv",label:"state x · contacts",col:ut.dim},{a:"obs",b:"plan",side:"th",label:"Ŵ  feedforward",col:ut.amber}],l=10;for(const c of o){const h=a[c.a],E=a[c.b];c.side==="rv"&&(c.x1=h.cx,c.y1=h.y+h.h+l,c.x2=c.x1,c.y2=E.y-l,c.lx=c.x1+10,c.ly=(c.y1+c.y2)/2,c.align="left"),c.side==="bh"&&(c.x1=h.x-l,c.y1=h.cy+12,c.x2=E.x+E.w+l,c.y2=c.y1,c.lx=(c.x1+c.x2)/2,c.ly=c.y1+18,c.align="center"),c.side==="lv"&&(c.x1=h.cx,c.y1=h.y-l,c.x2=c.x1,c.y2=E.y+E.h+l,c.lx=c.x1-10,c.ly=(c.y1+c.y2)/2,c.align="right"),c.side==="th"&&(c.x1=h.x+h.w+l,c.y1=h.cy-12,c.x2=E.x-l,c.y2=c.y1,c.lx=(c.x1+c.x2)/2,c.ly=c.y1-9,c.align="center"),c.len=Math.hypot(c.x2-c.x1,c.y2-c.y1)}const u=o.reduce((c,h)=>c+h.len,0);function d(c,h,E,x,b){t.beginPath(),t.moveTo(c+b,h),t.arcTo(c+E,h,c+E,h+x,b),t.arcTo(c+E,h+x,c,h+x,b),t.arcTo(c,h+x,c,h,b),t.arcTo(c,h,c+E,h,b),t.closePath()}function f(c){d(c.x,c.y,c.w,c.h,11),t.fillStyle="#121927",t.fill(),t.strokeStyle=ut.line||"#233046",t.lineWidth=1,t.stroke(),t.save(),d(c.x,c.y,c.w,c.h,11),t.clip(),t.fillStyle=c.accent,t.fillRect(c.x,c.y,c.w,3),t.restore(),Wt(t,c.title,c.cx,c.y+30,c.accent,"600 12px JetBrains Mono","center"),Wt(t,c.sub,c.cx,c.y+50,ut.dim,"12px JetBrains Mono","center")}let p=0;function m(c,h){t.clearRect(0,0,e,n);for(const x of o)t.strokeStyle="rgba(120,140,170,0.35)",t.lineWidth=1.6,El(t,x.x1,x.y1,x.x2-x.x1,x.y2-x.y1,"rgba(150,170,200,0.45)",1.6),Wt(t,x.label,x.lx,x.ly,x.col,"11px JetBrains Mono",x.align);for(const x in a)f(a[x]);Wt(t,"real-time loop",e/2,n/2-6,ut.faint,"11px JetBrains Mono","center"),Wt(t,"⟳",e/2,n/2+16,"rgba(94,234,212,0.5)","18px JetBrains Mono","center"),p+=h*.16,p>=1&&(p-=1);let E=p*u;for(const x of o){if(E<=x.len){const b=E/x.len,D=x.x1+(x.x2-x.x1)*b,C=x.y1+(x.y2-x.y1)*b;t.shadowColor=x.col,t.shadowBlur=10,Dn(t,D,C,4,x.col),t.shadowBlur=0;break}E-=x.len}}let _=performance.now();function M(c){const h=Math.min(.05,(c-_)/1e3);_=c,m(c,h),requestAnimationFrame(M)}requestAnimationFrame(M)}const rm="modulepreload",am=function(i){return"/adr-web/"+i},yo={},om=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(e.map(l=>{if(l=am(l),l in yo)return;yo[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":rm,u||(f.as="script"),f.crossOrigin="",f.href=l,o&&f.setAttribute("nonce",o),document.head.appendChild(f),u)return new Promise((p,m)=>{f.addEventListener("load",p),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},Kr=[0,0,1,2,3,4,5,6,1,8,9,10,11,12,1,14,15,16,17,18,19,20,21,22,16,24,25,26,27,28,29],Eo=Kr.length,lm=[7,13],cm=16,ml=[-.05,0,0,.1,-.05,0,-.05,0,0,.1,-.05,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],jr=ml.map((i,t)=>t<12?260:t<15?60:35),bo=jr.map(i=>1.2*Math.sqrt(i));function hm(i){i.innerHTML=`
    <div class="panel stage" data-stage style="aspect-ratio:16/11;min-height:380px">
      <div class="mj-overlay" data-overlay>
        <button class="hero__cta" data-load>Load the live robot &middot; ≈18 MB &darr;</button>
        <p class="mj-note" data-status>real MuJoCo physics · the actual G1 · runs in your browser</p>
      </div>
    </div>
    <div class="panel controls">
      <div class="row">
        <button class="btn btn--push" data-act="pushL" disabled>push &larr;</button>
        <button class="btn btn--push" data-act="pushR" disabled>push &rarr;</button>
        <button class="btn" data-act="reset" disabled>reset</button>
      </div>
      <div class="readouts">
        <div><div class="ro__lab">engine</div><div class="ro__val" data-ro="eng">MuJoCo · WASM</div></div>
        <div><div class="ro__lab">model</div><div class="ro__val" data-ro="mdl">G1 · 29 DoF</div></div>
        <div><div class="ro__lab">step rate</div><div class="ro__val" data-ro="rate">—</div></div>
        <div><div class="ro__lab">upper-body sway</div><div class="ro__val" data-ro="sway">—</div></div>
      </div>
      <p class="thm__note">Drag the robot or use the buttons to apply a real force (<em>xfrc</em>) to the
      torso. The base is mounted and the joints are PD-held — this shows the real engine and robot, not
      the balance controller. The actual push-recovery is in the 3D replay and the figures.</p>
    </div>`;const t=i.querySelector("[data-stage]"),e=i.querySelector("[data-overlay]"),n=a=>i.querySelector(`[data-ro="${a}"]`),s=i.querySelector("[data-status]");i.querySelector("[data-load]").addEventListener("click",r,{once:!0});async function r(){e.querySelector("[data-load]").disabled=!0,s.textContent="loading engine + model…";let a;try{a=await(await om(async()=>{const{default:X}=await import("./mujoco_wasm-BLm5-gtR.js");return{default:X}},[])).default()}catch(X){s.textContent="failed to load engine: "+(X?.message||X);return}try{a.FS.mkdir("/w"),a.FS.mkdir("/w/urdf"),a.FS.mkdir("/w/meshes");const X=await(await fetch("/adr-web/g1/urdf/g1_fixed.xml")).text();a.FS.writeFile("/w/urdf/g1_fixed.xml",X);const k=[...new Set([...X.matchAll(/file="([^"]+\.STL)"/g)].map(ot=>ot[1]))];await Promise.all(k.map(async ot=>{const Et=new Uint8Array(await(await fetch("/adr-web/g1/meshes/"+ot)).arrayBuffer());a.FS.writeFile("/w/meshes/"+ot,Et)}))}catch(X){s.textContent="failed to stage assets: "+(X?.message||X);return}let o,l;try{o=a.MjModel.loadFromXML("/w/urdf/g1_fixed.xml"),l=new a.MjData(o)}catch(X){s.textContent="failed to load model: "+(X?.message||X);return}for(let X=0;X<o.nq;X++)l.qpos[X]=ml[X]||0;a.mj_forward(o,l);const u=Array.from(l.qpos),d=o.opt.timestep;for(let X=0;X<600;X++){for(let k=0;k<o.nu;k++)l.ctrl[k]=jr[k]*(u[k]-l.qpos[k])-bo[k]*l.qvel[k];a.mj_step(o,l)}e.style.display="none",i.querySelectorAll(".controls [disabled]").forEach(X=>X.disabled=!1),n("rate").textContent=(1/d).toFixed(0)+" Hz";const f=new ol;f.background=new Nt(658965),f.fog=new Ms(658965,3.5,9);const p=new Le(45,16/11,.1,100);p.up.set(0,0,1),p.position.set(2.4,-2.2,1.4);const m=new al({antialias:!0});m.setPixelRatio(Math.min(2,devicePixelRatio||1)),m.shadowMap.enabled=!0,t.appendChild(m.domElement),Object.assign(m.domElement.style,{width:"100%",height:"100%",display:"block",cursor:"grab",touchAction:"none"});const _=new pl(p,m.domElement);_.target.set(0,0,.8),_.enableDamping=!0,_.minDistance=1.4,_.maxDistance=7,f.add(new hl(10466518,658965,.9));const M=new ul(16777215,1.4);M.position.set(3,-2,5),M.castShadow=!0,M.shadow.mapSize.set(1024,1024),Object.assign(M.shadow.camera,{near:1,far:12,left:-3,right:3,top:3,bottom:-3}),f.add(M);const c=new pe(new fi(20,20),new pn({color:922656,roughness:.95}));c.receiveShadow=!0,f.add(c);const h=new dl(20,80,1976894,1450031);h.rotation.x=Math.PI/2,f.add(h);const E=new ei;f.add(E);const x=new pn({color:13490666,roughness:.5}),b=new pn({color:6220500,roughness:.4}),D=new pn({color:3820131,roughness:.6}),C=[],R=[],T=[],W=new ys(.024,12,12);for(let X=0;X<Eo;X++){const k=new pe(W,x);if(k.castShadow=!0,E.add(k),C.push(k),Kr[X]>0){const ot=new pe(new Ss(.02,.02,1,10),b);ot.castShadow=!0,E.add(ot),R.push({mesh:ot,c:X,p:Kr[X]})}}for(const X of lm){const k=new pe(new On(.18,.09,.04),D);k.castShadow=!0,E.add(k),T.push({mesh:k,i:X})}const g=new B,v=new B,L=new B,A=new B(0,1,0);function I(){const X=l.xpos;for(let k=0;k<Eo;k++)C[k].position.set(X[3*k],X[3*k+1],X[3*k+2]);for(const k of R){g.set(X[3*k.p],X[3*k.p+1],X[3*k.p+2]),v.set(X[3*k.c],X[3*k.c+1],X[3*k.c+2]);const ot=g.distanceTo(v);if(ot<.001){k.mesh.visible=!1;continue}k.mesh.visible=!0,k.mesh.position.copy(g).add(v).multiplyScalar(.5),L.copy(v).sub(g).normalize(),k.mesh.quaternion.setFromUnitVectors(A,L),k.mesh.scale.set(1,ot,1)}for(const k of T){const ot=k.i;k.mesh.position.set(X[3*ot],X[3*ot+1],X[3*ot+2]-.02)}}let q=0,O=0;const K=X=>{q=X,O=.12};i.querySelector('[data-act="pushL"]').addEventListener("click",()=>K(-300)),i.querySelector('[data-act="pushR"]').addEventListener("click",()=>K(300)),i.querySelector('[data-act="reset"]').addEventListener("click",()=>{for(let X=0;X<o.nq;X++)l.qpos[X]=u[X];for(let X=0;X<o.nv;X++)l.qvel[X]=0;a.mj_forward(o,l)});let z=null;m.domElement.addEventListener("pointerdown",X=>{z=X.clientX,m.domElement.setPointerCapture(X.pointerId),_.enabled=!1}),m.domElement.addEventListener("pointermove",X=>{z!=null&&(q=Math.max(-450,Math.min(450,(X.clientX-z)*6)))});const nt=()=>{z=null,q=0,_.enabled=!0};m.domElement.addEventListener("pointerup",nt),m.domElement.addEventListener("pointercancel",nt);const J=l.xpos[3*17];function et(){for(let k=0;k<o.nu;k++)l.ctrl[k]=jr[k]*(u[k]-l.qpos[k])-bo[k]*l.qvel[k];const X=6*cm;O>0?(l.xfrc_applied[X]=q,O-=d):l.xfrc_applied[X]=z!=null?q:0,a.mj_step(o,l)}let vt=0,Pt=performance.now();function j(X){vt+=Math.min(.05,(X-Pt)/1e3),Pt=X;let k=0;for(;vt>=d&&k<30;)et(),vt-=d,k++;I();const ot=Math.abs(l.xpos[3*17]-J);n("sway").textContent=(ot*100).toFixed(1)+" cm",n("sway").className="ro__val"+(ot>.04?" warn":" good"),_.update(),m.render(f,p),requestAnimationFrame(j)}function Q(){const X=t.clientWidth,k=t.clientHeight||X*.7;m.setSize(X,k,!1),p.aspect=X/k,p.updateProjectionMatrix()}new ResizeObserver(Q).observe(t),Q(),requestAnimationFrame(j),s.textContent=""}}const Es=await window.ADRCore();window.__ADR=Es;Sl(document.getElementById("sandbox-mount"),Es);Tl(document.getElementById("w-saddle"));Cl(document.getElementById("w-critical"),Es);Pl(document.getElementById("w-rice"),Es);Jp(document.getElementById("replay-mount"));Qp(document.querySelector("#elegance .cards3"));sm(document.getElementById("arch-mount"));hm(document.getElementById("robot-mount"));const _l=[...document.querySelectorAll(".nav__links a")],um=Object.fromEntries(_l.map(i=>[i.getAttribute("href").slice(1),i])),dm=new IntersectionObserver(i=>i.forEach(t=>{t.isIntersecting&&(_l.forEach(e=>e.classList.remove("is-active")),um[t.target.id]?.classList.add("is-active"))}),{rootMargin:"-45% 0px -50% 0px"});["problem","system","elegance","results","replay","read"].forEach(i=>{const t=document.getElementById(i);t&&dm.observe(t)});export{om as _};
