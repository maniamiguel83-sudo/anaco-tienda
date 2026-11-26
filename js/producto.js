(function(){
var app=document.getElementById("app"),id=new URLSearchParams(location.search).get("id"),p=buscarProducto(id);
if(!p){app.innerHTML='<div class="caja">Servicio no encontrado. <a href="index.html">Volver al catálogo</a></div>';return}
document.title=p.nombre+" · ANACO";
var PREVIEWS={
 "ANA-001":{
  etiqueta:"Tablero Esencial · Demanda y precios",
  error:"Error histórico visible: ±5,2 %",
  paraQuien:"Empresas que inician exportaciones o exploran sus primeros 2 a 3 mercados destino.",
  cuando:"Cuando necesitas validar demanda real por partida arancelaria antes de cotizar o viajar.",
  svg:'<svg viewBox="0 0 280 105" width="100%" height="105" role="img" aria-label="Miniatura tablero demanda por país"><rect x="10" y="14" width="76" height="76" rx="8" fill="#E6F6F8"/><rect x="20" y="54" width="14" height="24" rx="3" fill="#007382"/><rect x="40" y="40" width="14" height="38" rx="3" fill="#007382"/><rect x="60" y="28" width="14" height="50" rx="3" fill="#007A4D"/><path d="M104 72 L148 58 L194 48 L244 30" fill="none" stroke="#0B2545" stroke-width="2.5" stroke-linecap="round"/><circle cx="148" cy="58" r="3.5" fill="#007382"/><circle cx="194" cy="48" r="3.5" fill="#007382"/><circle cx="244" cy="30" r="4" fill="#007A4D"/><rect x="104" y="80" width="150" height="8" rx="4" fill="#EBF0F7"/></svg>',
  chips:["1 usuario","Alertas mensuales","Activación 48 h"]
 },
 "ANA-002":{
  etiqueta:"Pronóstico 6 meses · Banda de confianza",
  error:"MAPE promedio: ±3,8 %",
  paraQuien:"Equipos comerciales que ya exportan con regularidad y planifican inventario o cupos.",
  cuando:"Cuando requieres anticipar precios y demanda a 6 meses y compartir reportes con hasta 5 personas.",
  svg:'<svg viewBox="0 0 280 105" width="100%" height="105" role="img" aria-label="Miniatura pronóstico a 6 meses"><polygon points="122,56 174,40 222,28 266,14 266,42 222,52 174,60 122,66" fill="#D6F5E8"/><polyline points="16,80 68,70 122,61" fill="none" stroke="#0B2545" stroke-width="2.5" stroke-linecap="round"/><polyline points="122,61 174,50 222,40 266,28" fill="none" stroke="#007A4D" stroke-width="2.5" stroke-dasharray="5 4" stroke-linecap="round"/><circle cx="122" cy="61" r="3.5" fill="#0B2545"/><circle cx="266" cy="28" r="4" fill="#007A4D"/></svg>',
  chips:["Hasta 5 usuarios","Pronóstico 6 meses","Reportes trimestrales"]
 },
 "ANA-003":{
  etiqueta:"Arquitectura dedicada · Modelos a la medida",
  error:"Calibración continua: ±2,4 %",
  paraQuien:"Grandes exportadores con múltiples líneas arancelarias, filiales o alto volumen operativo.",
  cuando:"Cuando los tableros estándar no bastan y necesitas modelos propios con analista asignado.",
  svg:'<svg viewBox="0 0 280 105" width="100%" height="105" role="img" aria-label="Miniatura modelos predictivos personalizados"><rect x="14" y="18" width="68" height="28" rx="6" fill="#E6EEF7"/><rect x="14" y="58" width="68" height="28" rx="6" fill="#E6F6F8"/><path d="M82 32 L118 52 M82 72 L118 52" stroke="#0B2545" stroke-width="2"/><rect x="118" y="34" width="64" height="36" rx="8" fill="#0B2545"/><path d="M182 52 L212 34 M182 52 L212 70" stroke="#007A4D" stroke-width="2"/><circle cx="236" cy="34" r="14" fill="#D6F5E8"/><circle cx="236" cy="70" r="14" fill="#E6F6F8"/></svg>',
  chips:["Usuarios ilimitados","Modelos propios","Analista dedicado"]
 },
 "ANA-004":{
  etiqueta:"Pipeline de entregables · 2 a 3 semanas",
  error:"Auditoría de calidad: 100 % trazable",
  paraQuien:"Empresas con archivos dispersos en Excel, ERP o facturación sin estandarización arancelaria.",
  cuando:"Antes de activar una suscripción ANACO 360 o cuando tus reportes internos no cuadran entre áreas.",
  svg:'<svg viewBox="0 0 280 105" width="100%" height="105" role="img" aria-label="Miniatura flujo de diagnóstico e incorporación de datos"><rect x="12" y="32" width="54" height="40" rx="8" fill="#EBF0F7"/><rect x="80" y="32" width="54" height="40" rx="8" fill="#E6F6F8"/><rect x="148" y="32" width="54" height="40" rx="8" fill="#D6F5E8"/><rect x="216" y="32" width="52" height="40" rx="8" fill="#007A4D"/><path d="M66 52 H80 M134 52 H148 M202 52 H216" stroke="#0B2545" stroke-width="2" stroke-linecap="round"/></svg>',
  chips:["Inventario de fuentes","Limpieza y cruce","Informe de hallazgos"]
 },
 "ANA-005":{
  etiqueta:"Escenarios por mercado · 4 a 6 semanas",
  error:"Sensibilidad: optimista / base / adverso",
  paraQuien:"Gerencias comerciales o juntas directivas que evalúan abrir un país o invertir en capacidad.",
  cuando:"Cuando necesitas un estudio puntual de viabilidad, precios y riesgos sin adquirir software mensual.",
  svg:'<svg viewBox="0 0 280 105" width="100%" height="105" role="img" aria-label="Miniatura estudio con tres escenarios"><polyline points="20,76 92,68 176,46 258,20" fill="none" stroke="#007A4D" stroke-width="2.5" stroke-linecap="round"/><polyline points="20,76 92,68 176,56 258,44" fill="none" stroke="#2D457A" stroke-width="2.5" stroke-linecap="round"/><polyline points="20,76 92,68 176,72 258,82" fill="none" stroke="#B42318" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/><circle cx="258" cy="20" r="3.5" fill="#007A4D"/><circle cx="258" cy="44" r="3.5" fill="#2D457A"/><circle cx="258" cy="82" r="3.5" fill="#B42318"/></svg>',
  chips:["3 escenarios","Riesgos por destino","Sesión ejecutiva"]
 }
};
var pv=PREVIEWS[p.id]||{etiqueta:p.categoria,error:"Error visible",paraQuien:p.descripcion,cuando:p.plazo,svg:"",chips:p.incluye.slice(0,3)};
var dto=CART.item(p,1,0,true);
app.innerHTML='<div class="det"><div><div class="bloque det-preview" style="border-top:5px solid '+p.color+'"><div class="det-pv-head"><span class="det-pv-sigla" style="background:'+p.color+'">'+p.sigla+'</span><div><b>'+pv.etiqueta+'</b><span>'+pv.error+'</span></div></div><div class="det-pv-svg">'+pv.svg+'</div><div class="det-pv-chips">'+pv.chips.map(function(c){return'<span>'+c+'</span>'}).join("")+'</div></div><div class="guia-box"><h3>¿Para quién es y cuándo elegirlo?</h3><p><b>¿Para quién es?</b> '+pv.paraQuien+'</p><p><b>¿Cuándo elegirlo?</b> '+pv.cuando+'</p></div></div><div><div class="cat">'+p.categoria+'</div><h1 style="color:var(--n);margin:6px 0 10px">'+p.nombre+'</h1><p>'+p.descripcion+'</p><div class="precio" style="font-size:26px">'+UI.fmt(p.precio)+' <small>'+p.unidad+'</small></div><div class="ahorro-pill det-ahorro">Con cupón <b>ANUAL8</b>: '+UI.fmt(dto.price)+' (ahorras '+UI.fmt(dto.discount)+')</div><h3>Qué incluye</h3><ul>'+p.incluye.map(function(x){return'<li>'+x+'</li>'}).join("")+'</ul><p><b>Plazo:</b> '+p.plazo+'<br><b>Modalidad:</b> '+p.modalidad+'</p><div class="det-btns"><button class="btn" id="add" type="button">Agregar al carrito</button> <a class="btn sec" href="carrito.html">Ver carrito</a></div><p class="okm" id="ok"></p></div></div>';
ANACO.enviar("view_item",{value:p.precio,items:[CART.item(p,1,0,false)]});
document.getElementById("add").onclick=function(){
 CART.agregar(p.id,1);var c=CART.get(),it=CART.item(p,1,0,!!c.cupon);
 var d={value:it.price*it.quantity,items:[it]};if(c.cupon)d.coupon=CART.CUPON;
 ANACO.enviar("add_to_cart",d);UI.badge();
 document.getElementById("ok").textContent="Agregado al carrito."};
})();
