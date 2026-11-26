(function(){
var app=document.getElementById("app"),id=new URLSearchParams(location.search).get("id"),p=buscarProducto(id);
if(!p){app.innerHTML='<div class="caja">Servicio no encontrado. <a href="index.html">Volver al catálogo</a></div>';return}
document.title=p.nombre+" · ANACO";
app.innerHTML='<div class="det"><div><div class="bloque" style="background:'+p.color+'">'+p.sigla+'</div></div><div><div class="cat">'+p.categoria+'</div><h1 style="color:var(--n);margin:4px 0">'+p.nombre+'</h1><p>'+p.descripcion+'</p><div class="precio" style="font-size:24px">'+UI.fmt(p.precio)+' <small>'+p.unidad+'</small></div><h3>Qué incluye</h3><ul>'+p.incluye.map(function(x){return'<li>'+x+'</li>'}).join("")+'</ul><p><b>Plazo:</b> '+p.plazo+'<br><b>Modalidad:</b> '+p.modalidad+'</p><button class="btn" id="add" type="button">Agregar al carrito</button> <a class="btn sec" href="carrito.html">Ver carrito</a><p class="okm" id="ok"></p></div></div>';
ANACO.enviar("view_item",{value:p.precio,items:[CART.item(p,1,0,false)]});
document.getElementById("add").onclick=function(){
 CART.agregar(p.id,1);var c=CART.get(),it=CART.item(p,1,0,!!c.cupon);
 var d={value:it.price*it.quantity,items:[it]};if(c.cupon)d.coupon=CART.CUPON;
 ANACO.enviar("add_to_cart",d);UI.badge();
 document.getElementById("ok").textContent="Agregado al carrito."};
})();
