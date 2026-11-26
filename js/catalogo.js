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
  '<div class="card-top" style="border-top-color:'+p.color+'">'+
   '<div class="card-badges"><span class="plan-pill">'+p.categoria+'</span>'+(pop?'<span class="pop-tag">Más popular</span>':'')+'</div>'+
   '<div class="card-codigo" style="color:'+p.color+'">'+p.sigla+'</div>'+
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
 '<div class="cat-grupo">'+
  '<div class="cat-grupo-head reveal"><div><span class="cat-tipo cat-tipo-saas">Cobro mensual · Suscripción SaaS</span><h3>Plataforma ANACO 360</h3><p>Acceso continuo a tableros, alertas y pronósticos con activación desde 48 horas.</p></div></div>'+
  '<div class="cat-subgrid cat-subgrid-saas">'+saas.join("")+'</div>'+
 '</div>'+
 '<div class="cat-grupo cat-grupo-proy">'+
  '<div class="cat-grupo-head reveal"><div><span class="cat-tipo cat-tipo-proy">Pago único por proyecto · Alcance definido</span><h3>Servicios y estudios especializados</h3><p>Intervenciones puntuales de diagnóstico de datos o estudios predictivos a la medida (no comparables con planes mensuales).</p></div></div>'+
  '<div class="cat-subgrid cat-subgrid-proy">'+proy.join("")+'</div>'+
 '</div>';
var promo={promotion_id:"ANUAL8",promotion_name:"Descuento del 8 % con cupón ANUAL8",creative_name:"banner_cupon_inicio",creative_slot:"inicio_superior",items:items};
var b=document.getElementById("banner");
b.innerHTML='<div class="banner reveal" id="promo"><div><b>8 % de descuento con el cupón ANUAL8</b><div class="banner-sub">Aplícalo ahora en tu carrito y ahorra hasta '+UI.fmt(Math.round(3000000*0.08))+' según el servicio elegido.</div></div><span class="btn">Aplicar cupón</span></div>';
document.getElementById("promo").onclick=function(){CART.aplicarCupon();ANACO.enviarYNavegar("select_promotion",promo,"carrito.html")};
document.getElementById("grid").onclick=function(e){
 var a=e.target.closest("a.card");if(!a)return;
 var datos=Object.assign({},L,{items:[items[+a.getAttribute("data-i")]]});
 if(e.ctrlKey||e.metaKey||e.shiftKey){ANACO.enviar("select_item",datos);return}
 e.preventDefault();ANACO.enviarYNavegar("select_item",datos,a.href)};
if(UI.revelar)UI.revelar();
ANACO.enviar("view_item_list",Object.assign({},L,{items:items}));
ANACO.enviar("view_promotion",promo);
})();
