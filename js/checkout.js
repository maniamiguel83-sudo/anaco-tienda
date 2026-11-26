(function(){
var app=document.getElementById("app"),its=CART.items(),cup=CART.get().cupon;
if(!its.length){location.replace("carrito.html");return}
var total=CART.valor(its);
function base(){var o={value:total,items:its};if(cup)o.coupon=CART.CUPON;return o}
var paises=["Colombia","México","Perú","Chile","Ecuador","Estados Unidos","España"];
var tipo="",modo="Mensual";
ANACO.enviar("begin_checkout",base());
var resumen='<div class="caja"><b>Resumen</b>'+its.map(function(i){return'<div class="fila"><span>'+i.item_name+' ×'+i.quantity+'</span><span>'+UI.fmt(i.price*i.quantity)+'</span></div>'}).join("")+'<div class="fila"><span>Envío</span><span>'+UI.fmt(0)+'</span></div><div class="fila"><b>Total</b><b>'+UI.fmt(total)+'</b></div></div>';
function paso1(){
 app.innerHTML='<h1>Checkout</h1><div class="caja"><b>Paso 1 de 2 · Facturación</b><p class="cat">Simulación: usa un nombre de empresa ficticio. No ingreses datos reales.</p><label class="l" for="emp">Nombre de la empresa (ficticio)</label><input type="text" id="emp" maxlength="60" placeholder="Exportadora Demo S.A.S."><label class="l" for="pais">País de la empresa</label><select id="pais">'+paises.map(function(x){return'<option>'+x+'</option>'}).join("")+'</select><label class="l">Modalidad de facturación</label><label class="op"><input type="radio" name="mod" value="Mensual" checked> Mensual</label><label class="op"><input type="radio" name="mod" value="Anual anticipado"> Anual anticipado</label><div class="msg" id="err"></div><button class="btn" id="sig" type="button">Continuar al pago</button></div>'+resumen;
 document.getElementById("sig").onclick=function(){
  if(!document.getElementById("emp").value.trim()){document.getElementById("err").textContent="Escribe un nombre de empresa ficticio.";return}
  tipo=document.getElementById("pais").value==="Colombia"?"Nacional":"Internacional";
  modo=document.querySelector("input[name=mod]:checked").value;
  ANACO.usuario(tipo);
  ANACO.enviar("add_shipping_info",Object.assign(base(),{shipping_tier:tipo+" - "+modo}));
  paso2()}}
function paso2(){
 var ms=["Tarjeta de crédito","PSE","Nequi","PayPal"];
 app.innerHTML='<h1>Checkout</h1><div class="caja"><b>Paso 2 de 2 · Pago simulado</b><p class="cat">No se pide ni se guarda ningún dato de pago.</p>'+ms.map(function(m,i){return'<label class="op"><input type="radio" name="pago" value="'+m+'"'+(i?'':' checked')+'> '+m+'</label>'}).join("")+'<button class="btn" id="pagar" type="button">Pagar (simulado)</button></div>'+resumen;
 document.getElementById("pagar").onclick=function(){
  var pt=document.querySelector("input[name=pago]:checked").value;
  var pedido={transaction_id:"ANACO-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase(),coupon:cup?CART.CUPON:null,tipo_cliente:tipo,items:its,enviado:false};
  try{sessionStorage.setItem("anaco_pedido",JSON.stringify(pedido))}catch(e){}
  CART.vaciar();
  ANACO.enviarYNavegar("add_payment_info",Object.assign(base(),{payment_type:pt}),"gracias.html")}}
paso1();
})();
