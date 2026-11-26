(function(){
var L={item_list_id:"catalogo_principal",item_list_name:"Catálogo principal ANACO"};
var items=PRODUCTOS.map(function(p,i){return CART.item(p,1,i,false)});
document.getElementById("grid").innerHTML=PRODUCTOS.map(function(p,i){
 return'<a class="card" href="producto.html?id='+p.id+'" data-i="'+i+'"><div class="bloque" style="background:'+p.color+'">'+p.sigla+'</div><div class="cu"><div class="cat">'+p.categoria+'</div><h3>'+p.nombre+'</h3><p>'+p.descripcion+'</p><div class="precio">'+UI.fmt(p.precio)+' <small>'+p.unidad+'</small></div></div></a>'}).join("");
var promo={promotion_id:"ANUAL8",promotion_name:"Descuento del 8 % con cupón ANUAL8",creative_name:"banner_cupon_inicio",creative_slot:"inicio_superior",items:items};
var b=document.getElementById("banner");
b.innerHTML='<div class="banner" id="promo"><div><b>8 % de descuento con el cupón ANUAL8</b><div>Aplícalo ahora en tu carrito.</div></div><span class="btn">Aplicar cupón</span></div>';
document.getElementById("promo").onclick=function(){CART.aplicarCupon();ANACO.enviarYNavegar("select_promotion",promo,"carrito.html")};
document.getElementById("grid").onclick=function(e){
 var a=e.target.closest("a.card");if(!a)return;
 var datos=Object.assign({},L,{items:[items[+a.getAttribute("data-i")]]});
 if(e.ctrlKey||e.metaKey||e.shiftKey){ANACO.enviar("select_item",datos);return}
 e.preventDefault();ANACO.enviarYNavegar("select_item",datos,a.href)};
ANACO.enviar("view_item_list",Object.assign({},L,{items:items}));
ANACO.enviar("view_promotion",promo);
})();
