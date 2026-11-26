(function(){
var app=document.getElementById("app"),o=null;
try{o=JSON.parse(sessionStorage.getItem("anaco_pedido"))}catch(e){}
if(!o){app.innerHTML='<h1>Gracias</h1><div class="caja">No hay un pedido reciente. <a href="index.html">Volver al catálogo</a></div>';return}
var valor=CART.valor(o.items);
ANACO.usuario(o.tipo_cliente);
if(!o.enviado){
 var p={transaction_id:o.transaction_id,affiliation:"ANACO",value:valor,shipping:0,tipo_cliente:o.tipo_cliente,items:o.items};
 if(o.coupon)p.coupon=o.coupon;
 ANACO.enviar("purchase",p);
 o.enviado=true;try{sessionStorage.setItem("anaco_pedido",JSON.stringify(o))}catch(e){}
}
app.innerHTML='<h1>¡Gracias por tu compra simulada!</h1><div class="caja"><p>Pedido <b>'+UI.esc(o.transaction_id)+'</b> · Cliente '+UI.esc(o.tipo_cliente)+(o.coupon?' · Cupón '+o.coupon:'')+'</p>'+o.items.map(function(i){return'<div class="fila"><span>'+UI.esc(i.item_name)+' ×'+i.quantity+'</span><span>'+UI.fmt(i.price*i.quantity)+'</span></div>'}).join("")+'<div class="fila"><span>Envío</span><span>'+UI.fmt(0)+'</span></div><div class="fila"><b>Total</b><b>'+UI.fmt(valor)+'</b></div><p class="cat">Simulación académica: no se realizó ningún cobro.</p><a class="btn" href="index.html">Volver al catálogo</a></div>';
})();
