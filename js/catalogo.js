(function(){
var L={item_list_id:"catalogo_principal",item_list_name:"Catálogo principal ANACO"};
var items=PRODUCTOS.map(function(p,i){return CART.item(p,1,i,false)});
function renderCard(p,i){
 var pop=p.id==="ANA-002";
 var esSaas=p.categoria.indexOf("Suscripción")!==-1;
 var dto=CART.item(p,1,i,true);
 var lista=p.incluye.map(function(x,idx){
  var esBase=idx===0&&x.indexOf("Todo lo de ")===0;
  var esNuevo=(p.id==="ANA-002"||p.id==="ANA-003")&&idx>0;
  if(esBase)return'<li class="inc-base">'+x+'</li>';
  if(esNuevo)return'<li class="inc-nuevo"><span>Nuevo</span> '+x+'</li>';
  return'<li>'+x+'</li>';
 }).join("");
 return'<a class="card reveal'+(pop?' card-popular':'')+(esSaas?' card-saas':' card-proyecto')+'" href="producto.html?id='+p.id+'" data-i="'+i+'">'+
  '<div class="card-top" style="border-top-color:'+(pop?'#10B981':p.color)+'">'+
   '<div class="card-badges"><span class="plan-pill">'+p.categoria+'</span>'+(pop?'<span class="pop-tag">Más popular</span>':'')+'</div>'+
   '<div class="card-codigo">'+p.sigla+'</div>'+
  '</div>'+
  '<div class="cu">'+
   '<h3>'+p.nombre+'</h3>'+
   '<p class="desc">'+p.descripcion+'</p>'+
   '<ul class="inc">'+lista+'</ul>'+
   '<div class="card-foot">'+
    '<div class="precio-bloque">'+
     '<div class="precio">'+UI.fmt(p.precio)+' <small>'+p.unidad+'</small></div>'+
     '<div class="ahorro-pill">Con <b>ANUAL8</b>: '+UI.fmt(dto.price)+' · ahorras '+UI.fmt(dto.discount)+'</div>'+
    '</div>'+
    '<span class="ver-mas">Ver detalle →</span>'+
   '</div>'+
  '</div></a>'}
var saas=[],proy=[];
PRODUCTOS.forEach(function(p,i){
 if(p.categoria.indexOf("Suscripción")!==-1)saas.push(renderCard(p,i));
 else proy.push(renderCard(p,i));
});
document.getElementById("grid").innerHTML=
 '<div class="cat-grupo" data-grupo="saas">'+
  '<div class="cat-grupo-head reveal"><span class="cat-tipo cat-tipo-saas">Cobro mensual · Suscripción SaaS</span><h3>Plataforma ANACO 360</h3><p>Acceso continuo a tableros, alertas y pronósticos con activación desde 48 horas.</p></div>'+
  '<div class="cat-subgrid cat-subgrid-saas">'+saas.join("")+'</div>'+
 '</div>'+
 '<div class="cat-grupo cat-grupo-proy" data-grupo="proy">'+
  '<div class="cat-grupo-head reveal"><span class="cat-tipo cat-tipo-proy">Pago único por proyecto · Alcance definido</span><h3>Servicios y estudios especializados</h3><p>Intervenciones puntuales de diagnóstico de datos o estudios predictivos a la medida.</p></div>'+
  '<div class="cat-subgrid cat-subgrid-proy">'+proy.join("")+'</div>'+
 '</div>';

var promo={promotion_id:"ANUAL8",promotion_name:"Descuento del 8 % con cupón ANUAL8",creative_name:"banner_cupon_inicio",creative_slot:"inicio_superior",items:items};
var b=document.getElementById("banner");
b.innerHTML='<div class="banner reveal" id="promo"><div class="banner-info"><span class="banner-pill">Ahorro anual · Cupón ANUAL8</span><div><b>8 % de descuento en planes y estudios</b><div class="banner-sub">Actívalo en tu carrito y ahorra desde '+UI.fmt(Math.round(400000*0.08))+' hasta '+UI.fmt(Math.round(3000000*0.08))+'.</div></div></div><span class="btn">Aplicar cupón</span></div>';
document.getElementById("promo").onclick=function(){CART.aplicarCupon();ANACO.enviarYNavegar("select_promotion",promo,"carrito.html")};

document.getElementById("grid").onclick=function(e){
 var a=e.target.closest("a.card");if(!a)return;
 var datos=Object.assign({},L,{items:[items[+a.getAttribute("data-i")]]});
 if(e.ctrlKey||e.metaKey||e.shiftKey){ANACO.enviar("select_item",datos);return}
 e.preventDefault();ANACO.enviarYNavegar("select_item",datos,a.href)};

var catTabs=document.querySelectorAll(".cat-tab");
catTabs.forEach(function(tab){
 tab.onclick=function(){
  var f=tab.getAttribute("data-filtro");
  catTabs.forEach(function(t){t.classList.toggle("activo",t===tab);t.setAttribute("aria-selected",t===tab?"true":"false")});
  document.querySelectorAll(".cat-grupo").forEach(function(g){
   var tg=g.getAttribute("data-grupo");
   g.classList.toggle("oculto",f!=="todos"&&tg!==f);
  });
 };
});

var VISTAS={
 demanda:{
  badge:"ANACO 360 · Proyección de demanda",
  title:"Partida 0901 · Café sin tostar → EE. UU.",
  mape:"MAPE ±3,8 %",
  kpis:[["Crecimiento pronosticado","+14,2 %"],["Precio estimado","USD 4,86/kg"],["Confianza del modelo","96,2 %"]],
  polyHist:"18,86 64,78 108,72 154,65",
  polyPred:"154,65 202,54 252,42 302,28",
  band:"154,60 202,44 252,30 302,14 302,42 252,54 202,64 154,70",
  pts:[[154,65],[202,54],[252,42],[302,28]]
 },
 precios:{
  badge:"ANACO 360 · Índice de precios FOB",
  title:"Partida 0804 · Aguacate Hass → Países Bajos",
  mape:"MAPE ±3,1 %",
  kpis:[["Variación proyectada","+8,7 %"],["Precio estimado","USD 2,94/kg"],["Confianza del modelo","96,9 %"]],
  polyHist:"18,74 64,70 108,62 154,58",
  polyPred:"154,58 202,49 252,45 302,34",
  band:"154,53 202,41 252,35 302,22 302,46 252,55 202,58 154,64",
  pts:[[154,58],[202,49],[252,45],[302,34]]
 },
 paises:{
  badge:"ANACO 360 · Demanda por destino",
  title:"Partida 0603 · Flores frescas → Top 3 destinos",
  mape:"MAPE ±4,1 %",
  kpis:[["Demanda EE. UU.","+11,5 %"],["Demanda España","+9,3 %"],["Confianza del modelo","95,9 %"]],
  polyHist:"18,82 64,75 108,68 154,60",
  polyPred:"154,60 202,50 252,38 302,24",
  band:"154,55 202,42 252,27 302,12 302,36 252,49 202,58 154,66",
  pts:[[154,60],[202,50],[252,38],[302,24]]
 }
};
var ordenTabs=["demanda","precios","paises"];
function pintarMock(clave){
 var v=VISTAS[clave];if(!v)return;
 document.querySelectorAll(".mock-tab").forEach(function(t){
  var act=t.getAttribute("data-tab")===clave;
  t.classList.toggle("activo",act);t.setAttribute("aria-selected",act?"true":"false");
 });
 document.getElementById("mock-badge").textContent=v.badge;
 document.getElementById("mock-title").textContent=v.title;
 document.getElementById("mock-mape").textContent=v.mape;
 document.getElementById("mock-kpis").innerHTML=v.kpis.map(function(k){return'<div class="mock-kpi"><span>'+k[0]+'</span><b>'+k[1]+'</b></div>'}).join("");
 var chart=document.getElementById("mock-chart");
 var poly=chart.querySelectorAll("polyline"),gon=chart.querySelector("polygon"),circs=chart.querySelectorAll("circle");
 if(gon)gon.setAttribute("points",v.band);
 if(poly[0])poly[0].setAttribute("points",v.polyHist);
 if(poly[1])poly[1].setAttribute("points",v.polyPred);
 v.pts.forEach(function(pt,idx){if(circs[idx]){circs[idx].setAttribute("cx",pt[0]);circs[idx].setAttribute("cy",pt[1])}});
}
document.querySelectorAll(".mock-tab").forEach(function(t){
 t.onclick=function(){pintarMock(t.getAttribute("data-tab"))};
});
var btnDemo=document.getElementById("btn-demo");
if(btnDemo){
 btnDemo.onclick=function(){
  var act=document.querySelector(".mock-tab.activo");
  var cur=act?act.getAttribute("data-tab"):"demanda";
  var next=ordenTabs[(ordenTabs.indexOf(cur)+1)%ordenTabs.length];
  pintarMock(next);
  var mk=document.getElementById("hero-mockup");
  if(mk&&mk.scrollIntoView)mk.scrollIntoView({behavior:"smooth",block:"nearest"});
 };
}

if(UI.revelar)UI.revelar();
ANACO.enviar("view_item_list",Object.assign({},L,{items:items}));
ANACO.enviar("view_promotion",promo);
})();
