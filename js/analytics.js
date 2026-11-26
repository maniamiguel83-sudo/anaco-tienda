(function(){
var C=window.TIENDA_CONFIG||{},ID=String(C.GA_MEASUREMENT_ID||"").trim();
var OK=/^G-[A-Z0-9]{4,}$/i.test(ID)&&ID!=="G-XXXXXXXXXX";
var DEBUG=C.DEBUG_MODE===true;
window.dataLayer=window.dataLayer||[];
window.gtag=function(){window.dataLayer.push(arguments)};
if(OK){
 var s=document.createElement("script");s.async=true;
 s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(ID);
 document.head.appendChild(s);
 gtag("js",new Date());
 if(DEBUG)gtag("config",ID,{debug_mode:true});else gtag("config",ID);
}
function ss(k){try{return JSON.parse(sessionStorage.getItem(k))}catch(e){return null}}
function sset(k,v){try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var KE="anaco_eventos",KO="anaco_origen",KM="anaco_mon_oculto";

/* ---------- Monitor ---------- */
function resumen(p){var r=[];p=p||{};
 if(p.page_path)r.push(p.page_path);
 if(p.item_list_id)r.push("lista "+p.item_list_id);
 if(p.promotion_id)r.push("promo "+p.promotion_id);
 if(p.transaction_id)r.push(p.transaction_id);
 if(p.items)r.push(p.items.map(function(i){return i.item_id+"×"+i.quantity}).join(" "));
 if(p.value!=null)r.push(UI.fmt(p.value));
 if(p.coupon)r.push("cupón "+p.coupon);
 if(p.shipping_tier)r.push(p.shipping_tier);
 if(p.payment_type)r.push(p.payment_type);
 if(p.tipo_cliente)r.push(p.tipo_cliente);
 return r.join(" · ")}
function pintar(){var el=document.getElementById("mon-lista");if(!el)return;
 el.innerHTML=(ss(KE)||[]).map(function(e){return'<div class="ev"><i>'+UI.esc(e.t)+'</i> <b>'+UI.esc(e.n)+'</b><div>'+UI.esc(e.r)+'</div></div>'}).join("")||"<i>Sin eventos todavía</i>"}
function log(n,p){var l=ss(KE)||[];
 l.unshift({t:new Date().toLocaleTimeString("es-CO",{hour12:false}),n:n,r:resumen(p)});
 sset(KE,l.slice(0,12));pintar()}
function borrarCookies(){
 var h=location.hostname,pt=h.split("."),doms=[null,h,"."+h];
 for(var i=1;i<pt.length-1;i++)doms.push("."+pt.slice(i).join("."));
 document.cookie.split(";").forEach(function(c){var n=c.split("=")[0].trim();
  if(n.indexOf("_ga")===0)doms.forEach(function(d){document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"+(d?";domain="+d:"")})})}
function aplicarOculto(){var o=false;try{o=localStorage.getItem(KM)==="1"}catch(e){}
 document.body.classList.toggle("mon-oculto",o);
 var b=document.getElementById("mon-ocultar");if(b)b.textContent="Ocultar"}
function setOculto(v){try{localStorage.setItem(KM,v?"1":"0")}catch(e){}aplicarOculto()}
function crearMonitor(){
 var d=document.createElement("aside");d.id="mon";
 d.innerHTML='<div class="mon-h"><b>Monitor de eventos GA4</b><button id="mon-ocultar" type="button">Ocultar</button></div>'+
  '<div id="mon-estado" class="'+(OK?"ok":"no")+'"></div>'+
  '<div class="mon-o">Origen de la visita<br><span id="mon-origen"></span></div>'+
  '<div class="mon-t">Últimos 12 eventos</div><div id="mon-lista"></div>'+
  '<button id="mon-reset" type="button">Simular nuevo visitante</button>';
 document.body.appendChild(d);
 var a=document.createElement("button");a.id="mon-abrir";a.type="button";a.textContent="Mostrar monitor";document.body.appendChild(a);
 document.getElementById("mon-estado").textContent=OK?"Conectado a "+ID+(DEBUG?" · modo depuración":""):"Sin ID de medición: los eventos solo se muestran aquí. Edita js/config.js.";
 var o=ss(KO);
 document.getElementById("mon-origen").textContent=(o&&o.s)?o.s+" / "+o.m+" · "+o.c:"directo (sin UTM)";
 document.getElementById("mon-ocultar").onclick=function(){setOculto(true)};
 a.onclick=function(){setOculto(false)};
 document.getElementById("mon-reset").onclick=function(){
  borrarCookies();CART.vaciar();try{sessionStorage.clear()}catch(e){}
  location.href="index.html"};
 aplicarOculto();pintar()}

/* ---------- API pública ---------- */
function enviar(n,p){p=Object.assign({currency:"COP"},p||{});gtag("event",n,p);log(n,p)}
function enviarYNavegar(n,p,url){
 var hecho=false;function ir(){if(hecho)return;hecho=true;location.href=url}
 if(!OK){enviar(n,p);ir();return}
 enviar(n,Object.assign({},p,{event_callback:ir,event_timeout:1000}));
 setTimeout(ir,1200)}
window.ANACO={activo:OK,enviar:enviar,enviarYNavegar:enviarYNavegar,
 usuario:function(tipo){gtag("set","user_properties",{tipo_cliente:tipo})}};

/* ---------- Inicio ---------- */
if(!ss(KO)){var q=new URLSearchParams(location.search),a=q.get("utm_source"),m=q.get("utm_medium"),c=q.get("utm_campaign");
 sset(KO,(a||m||c)?{s:a||"(sin dato)",m:m||"(sin dato)",c:c||"(sin dato)"}:"directo")}
crearMonitor();
log("page_view",{page_path:location.pathname.split("/").pop()||"index.html"});
})();
