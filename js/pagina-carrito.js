(function(){
var app=document.getElementById("app"),msg="";
function pintar(){
 var c=CART.get(),its=CART.items();UI.badge();
 if(!its.length){app.innerHTML='<h1>Tu carrito</h1><div class="caja">Tu carrito está vacío. <a href="index.html">Elige un servicio</a> para comenzar tu simulación.</div>';return}
 var total=CART.valor(its),sub=its.reduce(function(s,i){return s+(i.price+(i.discount||0))*i.quantity},0);
 var ahorro=sub-total;
 var ahorroPot=Math.round(sub*0.08);
 app.innerHTML='<h1>Tu carrito</h1><div class="layout-dos"><div class="col-main"><div class="caja"><h2>Servicios seleccionados</h2>'+its.map(function(i){return'<div class="fila"><div><b>'+i.item_name+'</b><br><span class="cat">'+UI.fmt(i.price)+' c/u'+(i.discount?' · ahorro '+UI.fmt(i.discount*i.quantity):'')+'</span></div><div class="qty"><button data-a="menos" data-id="'+i.item_id+'" aria-label="Quitar una unidad">−</button><span>'+i.quantity+'</span><button data-a="mas" data-id="'+i.item_id+'" aria-label="Agregar una unidad">+</button><button data-a="del" data-id="'+i.item_id+'" aria-label="Eliminar">✕</button></div></div>'}).join("")+'</div>'+
 '<div class="caja"><label class="l" for="cup">Cupón de descuento</label>'+(c.cupon?'<p class="okm">Cupón '+c.cupon+' aplicado (8 %): estás ahorrando '+UI.fmt(ahorro)+'. <a href="#" id="qc">Quitar</a></p>':'<p class="cup-hint">Ingresa <b>ANUAL8</b> para obtener 8 % de descuento y ahorrar <b>'+UI.fmt(ahorroPot)+'</b> en este pedido.</p><div style="display:flex;gap:8px"><input type="text" id="cup" placeholder="ANUAL8"><button class="btn sec" id="ac" type="button">Aplicar</button></div>')+'<div class="msg">'+msg+'</div></div></div>'+
 '<aside class="col-side"><div class="caja resumen-fijo"><h2>Resumen del pedido</h2><div class="fila"><span>Subtotal</span><span>'+UI.fmt(sub)+'</span></div><div class="fila"><span>Descuento '+(c.cupon?'('+c.cupon+' · 8 %)':'')+'</span><span class="'+(ahorro>0?'okm':'')+'">−'+UI.fmt(ahorro)+'</span></div><div class="fila"><span>Envío</span><span>'+UI.fmt(0)+'</span></div><div class="fila resumen-total"><b>Total</b><b>'+UI.fmt(total)+'</b></div>'+(ahorro>0?'<div class="ahorro-resumen">Ahorro total con ANUAL8: <b>'+UI.fmt(ahorro)+'</b></div>':'')+'<p class="sim-nota">Sitio académico de simulación: no se realizan cobros reales.</p><a class="btn btn-full" href="checkout.html">Ir al checkout</a></div></aside></div>'}
function evento(nombre,id,q){
 var its=CART.items(),it=its.filter(function(x){return x.item_id===id})[0];if(!it)return;
 it=Object.assign({},it,{quantity:q});var d={value:it.price*q,items:[it]};if(CART.get().cupon)d.coupon=CART.CUPON;
 ANACO.enviar(nombre,d)}
app.onclick=function(e){var t=e.target;
 if(t.id==="ac"){var v=document.getElementById("cup").value.trim().toUpperCase();
  if(v===CART.CUPON){CART.aplicarCupon();msg=""}else msg="Cupón no válido. Prueba con ANUAL8.";pintar();return}
 if(t.id==="qc"){e.preventDefault();CART.quitarCupon();pintar();return}
 var a=t.getAttribute&&t.getAttribute("data-a");if(!a)return;var id=t.getAttribute("data-id");
 if(a==="mas"){CART.agregar(id,1);evento("add_to_cart",id,1)}
 else if(a==="menos"){evento("remove_from_cart",id,1);CART.quitar(id,1)}
 else{var q=CART.get().items[id]||0;evento("remove_from_cart",id,q);CART.quitar(id,q)}
 pintar()};
pintar();
var its=CART.items();
if(its.length){var d={value:CART.valor(its),items:its};if(CART.get().cupon)d.coupon=CART.CUPON;ANACO.enviar("view_cart",d)}
})();
