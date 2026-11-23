const WA="5581979138919";
const $=s=>document.querySelector(s);
const brl=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const COL={sal:["Sálvia","#a3ae5b","#e8e6dc"],are:["Areia","#d9c7a0","#8a6d3b"],cel:["Céu","#9fc3ea","#ffffff"],bra:["Branco","#f1efe8","#14181e"],pre:["Preto","#1b1f24","#a3ae5b"],ver:["Vermelho","#c1272d","#f1efe8"],vin:["Vinho","#7a1f26","#e8e6dc"],azu:["Azul","#1f4fbf","#f2c230"],gra:["Grafite","#4b5058","#e8e6dc"]};
const P=[
{id:1,n:"Polo piquet clássica",c:"Polos",t:"polo",p:99.9,k:["sal","are","cel","bra","pre"]},
{id:2,n:"Polo com gola contraste",c:"Polos",t:"polo",p:109.9,k:["pre","bra","cel"]},
{id:3,n:"Polo listrada de manga",c:"Polos",t:"polo",p:119.9,k:["azu","vin","sal"]},
{id:4,n:"Camisa de time modelo jogador",c:"Times",t:"jersey",p:149.9,k:["ver","azu","pre","bra"]},
{id:5,n:"Camisa de time torcedor",c:"Times",t:"jersey",p:129.9,k:["vin","azu","ver"]},
{id:6,n:"Camisa dry fit treino",c:"Esporte",t:"jersey",p:89.9,k:["gra","pre","cel"]},
{id:7,n:"Short tactel listrado",c:"Shorts",t:"short",p:79.9,k:["pre","azu","gra","are"]},
{id:8,n:"Short dry fit lisinho",c:"Shorts",t:"short",p:69.9,k:["pre","sal","cel"]},
{id:9,n:"Short sarja casual",c:"Shorts",t:"short",p:99.9,k:["are","gra","sal"]},
{id:10,n:"Conjunto polo e short",c:"Conjuntos",t:"set",p:169.9,k:["sal","are","cel","pre"]},
{id:11,n:"Conjunto dry fit",c:"Conjuntos",t:"set",p:149.9,k:["gra","pre","bra"]},
{id:12,n:"Conjunto polo listrado",c:"Conjuntos",t:"set",p:179.9,k:["azu","vin","sal"]}];
const SZ=["P","M","G","GG"];
function art(t,k){const[,c,tr]=COL[k]||COL.pre;
 const shirt=`<path d="M30 14 42 10Q50 20 58 10L70 14 90 32 79 44 70 37V88H30V37L21 44 10 32Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>`;
 const polo=shirt+`<path d="M42 10 50 28 58 10 50 17Z" fill="${tr}"/><path d="M50 28V46" stroke="${tr}" stroke-width="2"/>`;
 const jer=shirt+`<path d="M42 10Q50 24 58 10" fill="none" stroke="${tr}" stroke-width="3"/><circle cx="58" cy="40" r="4" fill="${tr}"/><path d="M10 32 21 44M90 32 79 44" stroke="${tr}" stroke-width="3"/>`;
 const sh=`<path d="M28 22H72L79 80H54L50 52 46 80H21Z" fill="${c}" stroke="rgba(0,0,0,.25)"/><path d="M28 22H72V28H28Z" fill="${tr}"/><path d="M21 80 24 62M79 80 76 62" stroke="${tr}" stroke-width="2"/>`;
 let g=t=="polo"?polo:t=="jersey"?jer:t=="short"?sh:`<g transform="translate(-6 -4) scale(.78)">${polo}</g><g transform="translate(26 36) scale(.7)">${sh}</g>`;
 return `<svg viewBox="0 0 100 100" aria-hidden="true">${g}</svg>`}
function artKit(a){const[,c1,t1]=COL[a[0]],[,c2,t2]=COL[a[1]];return `<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(-4 -6) scale(.84)">${art("polo",a[0]).replace(/<svg[^>]*>|<\/svg>/g,"")}</g><g transform="translate(30 42) scale(.62)">${art("short",a[1]).replace(/<svg[^>]*>|<\/svg>/g,"")}</g></svg>`}
let cart=[];try{cart=JSON.parse(localStorage.getItem("major-cart")||"[]")}catch(e){}
let step=0,cat="Todos",sel=null;
const save=()=>{try{localStorage.setItem("major-cart",JSON.stringify(cart))}catch(e){}};
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display="none",1800)}
// catalogo
function renderChips(){const cs=["Todos",...new Set(P.map(p=>p.c))];$("#chips").innerHTML=cs.map(c=>`<button class="chip" aria-pressed="${c==cat}" data-c="${c}">${c}</button>`).join(" ")}
function renderGrid(){const q=$("#q").value.toLowerCase(),s=+$("#sort").value;
 let l=P.filter(p=>(cat=="Todos"||p.c==cat)&&p.n.toLowerCase().includes(q));
 if(s==1)l.sort((a,b)=>a.p-b.p);if(s==2)l.sort((a,b)=>b.p-a.p);
 $("#grid").innerHTML=l.length?l.map(p=>`<button class="card" data-id="${p.id}"><div class="tile">${art(p.t,p.k[0])}</div><div class="info"><h3>${p.n}</h3><div class="tag">${p.k.length} cores · ${p.c}</div><div class="price">${brl(p.p)}</div></div></button>`).join(""):`<p>Nenhuma peça encontrada. Tente outra busca ou categoria.</p>`}
$("#chips").onclick=e=>{const b=e.target.closest("[data-c]");if(b){cat=b.dataset.c;renderChips();renderGrid()}};
$("#q").oninput=renderGrid;$("#sort").onchange=renderGrid;
$("#grid").onclick=e=>{const b=e.target.closest("[data-id]");if(b)openModal(+b.dataset.id)};
// modal
function openModal(id){const p=P.find(x=>x.id==id);sel={p,k:p.k[0],s:"M"};drawModal();$("#ov").classList.add("on")}
function drawModal(){const{p,k,s}=sel;$("#mt").textContent=p.n;$("#mp").textContent=brl(p.p)+" · Pix "+brl(p.p*.95);$("#mArt").innerHTML=art(p.t,k);$("#mcn").textContent=COL[k][0];
 $("#mc").innerHTML=p.k.map(x=>`<button style="background:${COL[x][1]}" aria-label="${COL[x][0]}" aria-pressed="${x==k}" data-k="${x}"></button>`).join("");
 $("#ms").innerHTML=SZ.map(z=>`<button aria-pressed="${z==s}" data-s="${z}">${z}</button>`).join("")}
$("#mc").onclick=e=>{const b=e.target.closest("[data-k]");if(b){sel.k=b.dataset.k;drawModal()}};
$("#ms").onclick=e=>{const b=e.target.closest("[data-s]");if(b){sel.s=b.dataset.s;drawModal()}};
$("#mAdd").onclick=()=>{const{p,k,s}=sel;add({key:p.id+k+s,n:p.n,d:COL[k][0]+" · "+s,p:p.p,art:art(p.t,k)});$("#ov").classList.remove("on")};
$("#mClose").onclick=()=>$("#ov").classList.remove("on");
$("#ov").onclick=e=>{if(e.target.id=="ov")$("#ov").classList.remove("on")};
// kit
const tops=P.filter(p=>p.t!="short"&&p.t!="set"),bots=P.filter(p=>p.t=="short");let kt={i:0,c:0},kb={i:0,c:0};
function fillK(){$("#kTop").innerHTML=tops.map((p,i)=>`<option value="${i}">${p.n}</option>`).join("");$("#kBot").innerHTML=bots.map((p,i)=>`<option value="${i}">${p.n}</option>`).join("");drawK()}
function drawK(){const a=tops[kt.i],b=bots[kb.i],ka=a.k[kt.c],kc=b.k[kb.c];
 $("#stage").innerHTML=artKit([ka,kc]);
 $("#kTopC").innerHTML=a.k.map((x,i)=>`<button style="background:${COL[x][1]}" aria-label="${COL[x][0]}" aria-pressed="${i==kt.c}" data-i="${i}"></button>`).join("");
 $("#kBotC").innerHTML=b.k.map((x,i)=>`<button style="background:${COL[x][1]}" aria-label="${COL[x][0]}" aria-pressed="${i==kb.c}" data-i="${i}"></button>`).join("");
 $("#kOld").textContent=brl(a.p+b.p);$("#kPrice").textContent=brl((a.p+b.p)*.9)}
$("#kTop").onchange=e=>{kt={i:+e.target.value,c:0};drawK()};$("#kBot").onchange=e=>{kb={i:+e.target.value,c:0};drawK()};
$("#kTopC").onclick=e=>{const b=e.target.closest("[data-i]");if(b){kt.c=+b.dataset.i;drawK()}};
$("#kBotC").onclick=e=>{const b=e.target.closest("[data-i]");if(b){kb.c=+b.dataset.i;drawK()}};
$("#kAdd").onclick=()=>{const a=tops[kt.i],b=bots[kb.i],ka=a.k[kt.c],kc=b.k[kb.c];
 add({key:"kit"+a.id+ka+b.id+kc,n:"Kit: "+a.n+" + "+b.n,d:COL[ka][0]+" e "+COL[kc][0]+" · M",p:+((a.p+b.p)*.9).toFixed(2),art:artKit([ka,kc])})};
// carrinho
function add(it){const x=cart.find(c=>c.key==it.key);x?x.q++:cart.push({...it,q:1});save();draw();toast("Adicionado ao carrinho");}
function sub(){return cart.reduce((s,c)=>s+c.p*c.q,0)}
const S={ship:"loja",cep:"",mun:"",bai:"",end:"",nm:"",tel:"",pay:"pix",cp:false,cpv:"",id:""};
const PIX_KEY="",PIX_NOME="Major",PIX_CIDADE="Recife";
const Z={A:[8,"hoje"],B:[12,"hoje ou amanhã"],C:[14,"em até 24h"],D:[20,"em até 48h"],E:[25,"em até 48h"]};
const ZB={Recife:{A:"Ibura,Jordão,Imbiribeira,Pina,Boa Viagem,Ipsep,Setúbal,Brasília Teimosa",B:"Afogados,Areias,Barro,Cordeiro,Torre,Várzea,Madalena,Boa Vista,Centro,Santo Amaro",d:"C"},
"Jaboatão dos Guararapes":{A:"Prazeres,Piedade,Candeias,Barra de Jangada",B:"Centro,Cavaleiro,Muribeca,Socorro,Curado",d:"C"},
Olinda:{d:"D"},Paulista:{d:"D"},Camaragibe:{d:"D"},"Cabo de Santo Agostinho":{d:"E"},Moreno:{d:"E"}};
function cidade(c){const n=+c.slice(0,5);return n>=50000&&n<=52999?"Recife":n>=53000&&n<=53299?"Olinda":n>=53400&&n<=53499?"Paulista":n>=54000&&n<=54499?"Jaboatão dos Guararapes":n>=54500&&n<=54599?"Cabo de Santo Agostinho":n>=54700&&n<=54799?"Camaragibe":n>=54800&&n<=54899?"Moreno":""}
function zone(){const m=ZB[S.mun];if(!m)return null;for(const z of["A","B"])if((m[z]||"").split(",").includes(S.bai))return z;return m.d}
function fee(){if(S.ship=="loja")return 0;const z=zone();if(!z)return null;const f=Z[z][0];return sub()>=199&&f<=14?0:f}
function tot(){const s=sub(),d=S.cp?s*.1:0,f=fee()||0,p=S.pay=="pix"?(s-d)*.05:0;return{s,d,f,p,t:s-d-p+f}}
function sumHtml(){const{s,d,f,p,t}=tot(),z=zone(),fr=S.ship=="loja"?"Grátis (retirada)":fee()===null?"Informe o município":f?brl(f):"Grátis";
 return `<div><span>Subtotal</span><span>${brl(s)}</span></div>`+(d?`<div><span>Cupom</span><span>− ${brl(d)}</span></div>`:"")+(p?`<div><span>Pix 5%</span><span>− ${brl(p)}</span></div>`:"")+`<div><span>Frete${S.ship=="ent"&&z?" · entrega "+Z[z][1]:""}</span><span>${fr}</span></div><div class="t"><span>Total</span><span>${brl(t)}</span></div>`}
const updSum=()=>{const e=$("#sum");if(e)e.innerHTML=sumHtml()};
const tlv=(i,v)=>i+String(v.length).padStart(2,"0")+v;
function crc(s){let c=0xFFFF;for(let i=0;i<s.length;i++){c^=s.charCodeAt(i)<<8;for(let j=0;j<8;j++)c=c&0x8000?((c<<1)^0x1021)&0xFFFF:(c<<1)&0xFFFF}return c.toString(16).toUpperCase().padStart(4,"0")}
function pixCode(v,id){const n=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
 const b=tlv("00","01")+tlv("01","11")+tlv("26",tlv("00","br.gov.bcb.pix")+tlv("01",PIX_KEY))+tlv("52","0000")+tlv("53","986")+tlv("54",v.toFixed(2))+tlv("58","BR")+tlv("59",n(PIX_NOME).slice(0,25))+tlv("60",n(PIX_CIDADE).slice(0,15))+tlv("62",tlv("05",id))+"6304";return b+crc(b)}
function msg(){const{t,f}=tot(),z=zone();return `Olá, Major! Pedido ${S.id}:\n\n`+cart.map(c=>`• ${c.q}x ${c.n} (${c.d}) - ${brl(c.p*c.q)}`).join("\n")+`\n\n`+(S.ship=="loja"?"Retirada na loja":`Entrega: ${S.end}, ${S.bai||"bairro a confirmar"}, ${S.mun}, CEP ${S.cep}\nFrete: ${f?brl(f):"grátis"} (${z?Z[z][1]:""})`)+`\nPagamento: ${S.pay=="pix"?(PIX_KEY?"Pix (comprovante em anexo)":"Pix"):"Cartão (aguardo o link de pagamento)"}\nTotal: ${brl(t)}\n\nNome: ${S.nm}\nWhatsApp: ${S.tel}`}
function draw(){$("#cc").textContent=cart.reduce((s,c)=>s+c.q,0);
 if(step==3){$("#dl").innerHTML=`<div class="empty"><img src="logo.jpg" alt=""><p><b>Pedido ${S.id} enviado.</b><br>A gente confirma no WhatsApp e separa o seu kit.</p></div>`;$("#df").innerHTML=`<button class="btn" id="done">Voltar à loja</button>`;return}
 if(!cart.length){step=0;$("#dl").innerHTML=`<div class="empty"><img src="logo.jpg" alt=""><p>Carrinho vazio, jovem padawan. Monte um kit ou escolha uma peça.</p></div>`;$("#df").innerHTML="";return}
 if(step==0){$("#dl").innerHTML=cart.map((c,i)=>`<div class="it"><div class="tile">${c.art}</div><div><b>${c.n}</b><div class="tag">${c.d}</div><div class="qty"><button data-m="${i}" aria-label="Diminuir">−</button>${c.q}<button data-p="${i}" aria-label="Aumentar">+</button></div></div><b>${brl(c.p*c.q)}</b></div>`).join("");
  $("#df").innerHTML=`<div class="sum"><div><span>Subtotal</span><span>${brl(sub())}</span></div></div><button class="btn" id="go">Continuar</button>`;return}
 if(step==1){const m=ZB[S.mun],bs=m?((m.A||"")+","+(m.B||"")).split(",").filter(Boolean):[];
  $("#dl").innerHTML=`<div class="f" style="padding:6px 0 16px"><input id="nm" placeholder="Seu nome" autocomplete="name" value="${S.nm}"><input id="tel" placeholder="WhatsApp com DDD" inputmode="tel" autocomplete="tel" value="${S.tel}">
  <select id="ship"><option value="loja"${S.ship=="loja"?" selected":""}>Retirar na loja (grátis)</option><option value="ent"${S.ship=="ent"?" selected":""}>Receber em casa</option></select>`+
  (S.ship=="ent"?`<input id="cep" placeholder="CEP" inputmode="numeric" autocomplete="postal-code" value="${S.cep.length>5?S.cep.slice(0,5)+"-"+S.cep.slice(5):S.cep}">
  <select id="mun"><option value="">Município</option>${Object.keys(ZB).map(k=>`<option${k==S.mun?" selected":""}>${k}</option>`).join("")}</select>`+
  (bs.length?`<select id="bai"><option value="">Bairro</option>${bs.map(k=>`<option${k==S.bai?" selected":""}>${k}</option>`).join("")}<option${S.bai=="Outro"?" selected":""} value="Outro">Outro bairro</option></select>`:"")+
  `<input id="end" placeholder="Rua, número e complemento" autocomplete="street-address" value="${S.end}">`:"")+
  `<select id="pay"><option value="pix"${S.pay=="pix"?" selected":""}>Pix (5% off)</option><option value="cartao"${S.pay=="cartao"?" selected":""}>Cartão em até 3x (link no WhatsApp)</option></select>
  <input id="cp" placeholder="Cupom (ex.: MAJOR10)" value="${S.cpv}"></div>`;
  $("#df").innerHTML=`<div class="sum" id="sum">${sumHtml()}</div><button class="btn" id="topay">Ir para o pagamento</button><button class="btn alt" id="back">Voltar</button>`;return}
 const{t}=tot(),k=S.pay=="pix"&&PIX_KEY;
 $("#dl").innerHTML=`<div class="f" style="padding:10px 0;text-align:center"><b>Pedido ${S.id}</b><span class="price">${brl(t)}</span>`+(k?`<div><div class="qr" id="qr"></div></div><div class="code" id="pc">${pixCode(t,S.id)}</div><button class="btn alt" id="copy">Copiar Pix copia e cola</button><p class="tag">Pague no app do seu banco e envie o comprovante no WhatsApp.</p>`:S.pay=="pix"?`<p>Vamos te passar a chave Pix no WhatsApp para você pagar e confirmar.</p>`:`<p>Vamos te enviar o link de pagamento no WhatsApp para você pagar no cartão.</p>`)+`</div>`;
 if(k&&window.QRCode)new QRCode($("#qr"),{text:pixCode(t,S.id),width:200,height:200});
 $("#df").innerHTML=`<button class="btn" id="send">${k?"Já paguei, enviar comprovante":"Enviar pedido no WhatsApp"}</button><button class="btn alt" id="back">Voltar</button>`}
$("#dl").onclick=e=>{const m=e.target.dataset.m,p=e.target.dataset.p;if(m!=null){cart[m].q--;if(!cart[m].q)cart.splice(m,1)}else if(p!=null)cart[p].q++;else return;save();draw()};
$("#dl").oninput=e=>{const i=e.target.id,v=e.target.value;if(i=="nm")S.nm=v;else if(i=="tel")S.tel=v;else if(i=="end")S.end=v;else if(i=="cp"){S.cpv=v;S.cp=v.trim().toUpperCase()=="MAJOR10";updSum()}
 else if(i=="cep"){const d=v.replace(/\D/g,"").slice(0,8);S.cep=d;e.target.value=d.length>5?d.slice(0,5)+"-"+d.slice(5):d;const c=cidade(d);if(d.length==8&&c&&c!=S.mun){S.mun=c;S.bai="";draw();const x=$("#cep");x.focus();x.setSelectionRange(9,9)}}};
$("#dl").onchange=e=>{const i=e.target.id,v=e.target.value;if(i=="ship"){S.ship=v;draw()}else if(i=="mun"){S.mun=v;S.bai="";draw()}else if(i=="bai"){S.bai=v;updSum()}else if(i=="pay"){S.pay=v;updSum()}};
$("#df").onclick=e=>{const i=e.target.id;if(i=="go"){step=1;draw()}else if(i=="back"){step--;draw()}else if(i=="done"){step=0;dr.classList.remove("on");draw()}
 else if(i=="topay"){if(!S.nm.trim()||S.tel.replace(/\D/g,"").length<10){toast("Informe nome e WhatsApp com DDD");return}
  if(S.ship=="ent"&&(S.cep.length<8||!S.mun||!S.end.trim())){toast("Informe CEP, município e endereço");return}
  S.id="MJ"+Date.now().toString(36).toUpperCase();step=2;draw()}
 else if(i=="copy"){navigator.clipboard?.writeText($("#pc").textContent).then(()=>toast("Código Pix copiado"),()=>toast("Copie o código manualmente"))}
 else if(i=="send"){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg()),"_blank");cart=[];save();step=3;draw()}};
const dr=$("#drawer");$("#openCart").onclick=()=>{step=0;draw();dr.classList.add("on")};$("#dClose").onclick=()=>dr.classList.remove("on");
document.onkeydown=e=>{if(e.key=="Escape"){dr.classList.remove("on");$("#ov").classList.remove("on")}};
renderChips();renderGrid();fillK();draw();
