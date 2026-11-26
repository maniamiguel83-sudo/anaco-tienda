window.PRODUCTOS = [
 {id:"ANA-001",nombre:"ANACO 360 Esencial",categoria:"Suscripción SaaS",precio:400000,unidad:"por mes",sigla:"360E",color:"#007382",
  descripcion:"Tablero de inteligencia comercial para exportadores que dan sus primeros pasos en nuevos mercados.",
  incluye:["Tablero de demanda por producto y país","Alertas mensuales de precios","1 usuario","Soporte por correo"],plazo:"Activación en 48 horas · renovación mensual",modalidad:"Remoto"},
 {id:"ANA-002",nombre:"ANACO 360 Profesional",categoria:"Suscripción SaaS",precio:900000,unidad:"por mes",sigla:"360P",color:"#0D5478",
  descripcion:"Predicciones de demanda y precios a 6 meses para equipos comerciales que exportan con regularidad.",
  incluye:["Todo lo de Esencial","Pronóstico de demanda a 6 meses","Hasta 5 usuarios","Reportes sectoriales trimestrales"],plazo:"Activación en 72 horas · renovación mensual",modalidad:"Remoto"},
 {id:"ANA-003",nombre:"ANACO 360 Empresarial",categoria:"Suscripción SaaS",precio:1800000,unidad:"por mes",sigla:"360X",color:"#0B2545",
  descripcion:"Plataforma completa de analítica predictiva con modelos a la medida para grandes exportadores.",
  incluye:["Todo lo de Profesional","Modelos predictivos personalizados","Usuarios ilimitados","Acompañamiento de un analista dedicado"],plazo:"Activación en 5 días hábiles · renovación mensual",modalidad:"Remoto"},
 {id:"ANA-004",nombre:"Diagnóstico e incorporación de datos",categoria:"Servicio profesional",precio:1200000,unidad:"por proyecto",sigla:"DI",color:"#007A4D",
  descripcion:"Revisamos las fuentes de datos de tu empresa y las dejamos listas para analizarlas en ANACO.",
  incluye:["Inventario de fuentes de datos","Limpieza y estandarización","Conexión con ANACO 360","Informe de hallazgos"],plazo:"2 a 3 semanas",modalidad:"Remoto"},
 {id:"ANA-005",nombre:"Estudio predictivo especializado de mercados",categoria:"Servicio profesional",precio:3000000,unidad:"por estudio",sigla:"EP",color:"#2D457A",
  descripcion:"Estudio a la medida que anticipa demanda, precios y riesgos en los mercados que quieres abordar.",
  incluye:["Modelo predictivo por mercado objetivo","Escenarios optimista, base y adverso","Informe ejecutivo y sesión de resultados"],plazo:"4 a 6 semanas",modalidad:"Remoto"}
];
window.buscarProducto = function(id){return window.PRODUCTOS.filter(function(p){return p.id===id})[0]};
