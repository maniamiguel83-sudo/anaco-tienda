(function(){
var K="anaco_carrito",CUPON="ANUAL8",DTO=0.08;
function leer(){try{var c=JSON.parse(localStorage.getItem(K));if(c&&c.items)return c}catch(e){}return{items:{},cupon:null}}
function guardar(c){try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}}
var CART=window.CART={
 CUPON:CUPON,
 get:leer,
 agregar:function(id,n){var c=leer();c.items[id]=(c.items[id]||0)+(n||1);guardar(c)},
 quitar:function(id,n){var c=leer(),q=(c.items[id]||0)-(n||1);if(q>0)c.items[id]=q;else delete c.items[id];guardar(c)},
 aplicarCupon:function(){var c=leer();c.cupon=CUPON;guardar(c)},
 quitarCupon:function(){var c=leer();c.cupon=null;guardar(c)},
 vaciar:function(){try{localStorage.removeItem(K)}catch(e){}},
 unidades:function(){var c=leer();return Object.keys(c.items).reduce(function(s,k){return s+c.items[k]},0)},
 item:function(p,q,idx,conCupon){
  var it={item_id:p.id,item_name:p.nombre,item_brand:"ANACO",item_category:p.categoria,price:p.precio,quantity:q,index:idx};
  if(conCupon){var d=Math.round(p.precio*DTO);it.price=p.precio-d;it.discount=d;it.coupon=CUPON}
  return it},
 items:function(){var c=leer(),i=0;return Object.keys(c.items).map(function(id){var p=window.buscarProducto(id);return p?CART.item(p,c.items[id],i++,!!c.cupon):null}).filter(Boolean)},
 valor:function(items){return items.reduce(function(s,i){return s+i.price*i.quantity},0)}
};
var LOGO='<svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 35 20 5l13 30" fill="none" stroke="#0B2545" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="11,27 17,22 22,25 30,12" fill="none" stroke="#008C9E" stroke-width="2.5"/><g fill="#00A86B"><circle cx="11" cy="27" r="2.5"/><circle cx="17" cy="22" r="2.5"/><circle cx="22" cy="25" r="2.5"/><circle cx="30" cy="12" r="2.5"/></g></svg>';
var UI=window.UI={
 fmt:function(n){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n)},
 esc:function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})},
 badge:function(){var b=document.getElementById("badge");if(!b)return;var u=CART.unidades();b.textContent=u;if(u>0){b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}},
 montar:function(){
  var h=document.getElementById("cab"),f=document.getElementById("pie");
  if(h)h.innerHTML='<a class="marca" href="index.html">'+LOGO+'<span>ANACO</span></a><nav><a href="index.html">Servicios</a><a href="carrito.html">Carrito<span class="badge" id="badge">0</span></a></nav>';
  if(f)f.innerHTML='<p><b>ANACO S.A.S. · Analítica de Comercio Colombiano</b></p><p>Sitio académico de simulación. Los servicios, precios y la plataforma son propuestas académicas.</p><p>No procesa pagos ni guarda datos personales. Usa Google Analytics 4 para medir la navegación.</p>';
  UI.badge()}
};
UI.montar();
})();
