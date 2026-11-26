(function(){
var app=document.getElementById("app"),its=CART.items(),cup=CART.get().cupon;
if(!its.length){location.replace("carrito.html");return}
var total=CART.valor(its);
function base(){var o={value:total,items:its};if(cup)o.coupon=CART.CUPON;return o}
var paises=["Colombia","México","Perú","Chile","Ecuador","Estados Unidos","España"];
var tipo="",modo="Mensual";
ANACO.enviar("begin_checkout",base());
var resumen='<aside class="col-side"><div class="caja resumen-fijo"><h2>Resumen del pedido</h2>'+its.map(function(i){return'<div class="fila"><span>'+i.item_name+' ×'+i.quantity+'</span><span>'+UI.fmt(i.price*i.quantity)+'</span></div>'}).join("")+(cup?'<div class="fila"><span>Cupón</span><span class="okm">'+cup+' (−8 %)</span></div>':'')+'<div class="fila"><span>Envío</span><span>'+UI.fmt(0)+'</span></div><div class="fila"><b>Total</b><b>'+UI.fmt(total)+'</b></div><p class="sim-nota">Simulación académica: los datos ingresados no se guardan ni se cobran.</p></div></aside>';
function pasos(activo){
 return'<ol class="pasos" aria-label="Pasos del checkout"><li class="paso '+(activo===1?'activo':'hecho')+'"><span class="paso-num">'+(activo===1?'1':'✓')+'</span><span>Facturación</span></li><li class="paso '+(activo===2?'activo':'')+'"><span class="paso-num">2</span><span>Pago</span></li></ol>'}
function paso1(){
 app.innerHTML='<h1>Checkout</h1>'+pasos(1)+'<div class="layout-dos"><div class="col-main"><div class="caja"><h2>Paso 1 de 2 · Facturación</h2><p class="cat">Simulación: usa un nombre de empresa ficticio. No ingreses datos reales.</p><label class="l" for="emp">Nombre de la empresa (ficticio)</label><input type="text" id="emp" maxlength="60" placeholder="Exportadora Demo S.A.S."><label class="l" for="pais">País de la empresa</label><select id="pais">'+paises.map(function(x){return'<option>'+x+'</option>'}).join("")+'</select><label class="l">Modalidad de facturación</label><label class="op"><input type="radio" name="mod" value="Mensual" checked> Mensual</label><label class="op"><input type="radio" name="mod" value="Anual anticipado"> Anual anticipado</label><div class="msg" id="err"></div><button class="btn" id="sig" type="button">Continuar al pago</button></div></div>'+resumen+'</div>';
 document.getElementById("sig").onclick=function(){
  if(!document.getElementById("emp").value.trim()){document.getElementById("err").textContent="Escribe un nombre de empresa ficticio.";return}
  tipo=document.getElementById("pais").value==="Colombia"?"Nacional":"Internacional";
  modo=document.querySelector("input[name=mod]:checked").value;
  ANACO.usuario(tipo);
  ANACO.enviar("add_shipping_info",Object.assign(base(),{shipping_tier:tipo+" - "+modo}));
  paso2()}}
function paso2(){
 var ms=["Tarjeta de crédito","PSE","Nequi","PayPal"];
 app.innerHTML='<h1>Checkout</h1>'+pasos(2)+'<div class="layout-dos"><div class="col-main"><div class="caja"><h2>Paso 2 de 2 · Pago simulado</h2><p class="cat">No se pide ni se guarda ningún dato de pago.</p>'+ms.map(function(m,i){return'<label class="op"><input type="radio" name="pago" value="'+m+'"'+(i?'':' checked')+'> '+m+'</label>'}).join("")+'<p class="sim-nota">Al confirmar se registrará el pedido ficticio y pasarás a la confirmación.</p><button class="btn" id="pagar" type="button">Pagar (simulado)</button></div></div>'+resumen+'</div>';
 document.getElementById("pagar").onclick=function(){
  var pt=document.querySelector("input[name=pago]:checked").value;
  var pedido={transaction_id:"ANACO-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase(),coupon:cup?CART.CUPON:null,tipo_cliente:tipo,items:its,enviado:false};
  try{sessionStorage.setItem("anaco_pedido",JSON.stringify(pedido))}catch(e){}
  CART.vaciar();
  ANACO.enviarYNavegar("add_payment_info",Object.assign(base(),{payment_type:pt}),"gracias.html")}}
paso1();
})();
