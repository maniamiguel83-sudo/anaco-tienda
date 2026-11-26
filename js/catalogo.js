(function(){
var L={item_list_id:"catalogo_principal",item_list_name:"Catálogo principal ANACO"};
var items=PRODUCTOS.map(function(p,i){return CART.item(p,1,i,false)});
document.getElementById("grid").innerHTML=PRODUCTOS.map(function(p,i){
 var pop=p.id==="ANA-002";
 return'<a class="card reveal'+(pop?' card-popular':'')+'" href="producto.html?id='+p.id+'" data-i="'+i+'"><div class="bloque" style="background:'+p.color+'">'+p.sigla+(pop?'<span class="pop-tag">Más popular</span>':'')+'</div><div class="cu"><span class="plan-pill">'+p.categoria+'</span><h3>'+p.nombre+'</h3><p class="desc">'+p.descripcion+'</p><ul class="inc">'+p.incluye.slice(0,3).map(function(x){return'<li>'+x+'</li>'}).join("")+'</ul><div class="card-foot"><div class="precio">'+UI.fmt(p.precio)+' <small>'+p.unidad+'</small></div><span class="ver-mas">Ver detalle →</span></div></div></a>'}).join("");
var promo={promotion_id:"ANUAL8",promotion_name:"Descuento del 8 % con cupón ANUAL8",creative_name:"banner_cupon_inicio",creative_slot:"inicio_superior",items:items};
var b=document.getElementById("banner");
b.innerHTML='<div class="banner reveal" id="promo"><div><b>8 % de descuento con el cupón ANUAL8</b><div class="banner-sub">Aplícalo ahora en tu carrito y ahorra en cualquier plan o estudio.</div></div><span class="btn">Aplicar cupón</span></div>';
function aplicarPromo(){CART.aplicarCupon();ANACO.enviarYNavegar("select_promotion",promo,"carrito.html")}
document.getElementById("promo").onclick=aplicarPromo;
var hc=document.getElementById("hero-cupon");
if(hc)hc.onclick=aplicarPromo;
document.getElementById("grid").onclick=function(e){
 var a=e.target.closest("a.card");if(!a)return;
 var datos=Object.assign({},L,{items:[items[+a.getAttribute("data-i")]]});
 if(e.ctrlKey||e.metaKey||e.shiftKey){ANACO.enviar("select_item",datos);return}
 e.preventDefault();ANACO.enviarYNavegar("select_item",datos,a.href)};
if(UI.revelar)UI.revelar();
ANACO.enviar("view_item_list",Object.assign({},L,{items:items}));
ANACO.enviar("view_promotion",promo);
})();
