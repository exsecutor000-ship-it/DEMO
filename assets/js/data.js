/* ============================================================
   data.js — Catálogo de datasets de muestra
   ============================================================ */
const DATASETS = [
  { id: 1, title: "Producto Interno Bruto (PIB) Series Históricas 1990-2024", org: "CAF · Economía", category: "economia", formats: ["csv","api"], desc: "PIB nominal y real en dólares corrientes y constantes para 26 países miembros de CAF con desagregación sectorial.", date: "2024-08", views: 12847, downloads: 3421 },
  { id: 2, title: "Red Vial Latinoamérica — Infraestructura de Transporte 2023", org: "CAF · Infraestructura", category: "infraestructura", formats: ["json","shp"], desc: "Datos geoespaciales de la red vial con estado, tipo de superficie y año de construcción.", date: "2024-07", views: 8231, downloads: 2104 },
  { id: 3, title: "Acceso a Electricidad y Energías Renovables 2010-2023", org: "CAF · Energía", category: "energia", formats: ["csv","xlsx"], desc: "Cobertura eléctrica y generación por fuente solar, eólica, hídrica y térmica.", date: "2024-06", views: 7564, downloads: 1987 },
  { id: 4, title: "Índice de Pobreza Multidimensional LAC 2000-2023", org: "CAF · Social", category: "social", formats: ["api","json"], desc: "Medición multidimensional considerando educación, salud, vivienda y servicios básicos.", date: "2024-05", views: 6891, downloads: 1752 },
  { id: 5, title: "Emisiones de GEI por Sector — Inventario Nacional 1990-2022", org: "CAF · Medioambiente", category: "medioambiente", formats: ["csv","api"], desc: "Inventario de gases de efecto invernadero por sector con equivalencias en CO₂.", date: "2024-04", views: 5432, downloads: 1438 },
  { id: 6, title: "Indicadores Educativos: Matrícula y Aprendizajes LAC", org: "CAF · Educación", category: "educacion", formats: ["json","csv"], desc: "Tasas de matrícula, deserción y resultados de aprendizaje en lectura y matemáticas.", date: "2024-03", views: 4879, downloads: 1203 },
  { id: 7, title: "Gasto Público en Salud % PIB — 2000 a 2023", org: "CAF · Salud", category: "salud", formats: ["csv","xlsx"], desc: "Gasto público y privado en salud como porcentaje del PIB para los países de la región.", date: "2024-08", views: 4321, downloads: 1102 },
  { id: 8, title: "Inversión en Infraestructura de Transporte 2015-2023", org: "CAF · Infraestructura", category: "infraestructura", formats: ["csv","api"], desc: "Volúmenes de inversión pública y privada en carreteras, ferrocarriles, puertos y aeropuertos.", date: "2024-07", views: 3987, downloads: 987 },
  { id: 9, title: "Indicadores de Gobernanza y Transparencia LAC", org: "CAF · Gobernanza", category: "social", formats: ["json","csv"], desc: "Índices de percepción de corrupción, efectividad gubernamental y estado de derecho.", date: "2024-06", views: 3654, downloads: 876 },
  { id: 10, title: "Cobertura de Agua Potable y Saneamiento 2000-2023", org: "CAF · Medioambiente", category: "medioambiente", formats: ["csv","api"], desc: "Acceso a agua potable mejorada y saneamiento básico por país y área urbano/rural.", date: "2024-05", views: 3421, downloads: 812 },
  { id: 11, title: "Comercio Exterior: Exportaciones e Importaciones LAC", org: "CAF · Economía", category: "economia", formats: ["xlsx","csv","api"], desc: "Flujos comerciales por producto, destino y origen. Datos anuales y trimestrales.", date: "2024-04", views: 3218, downloads: 765 },
  { id: 12, title: "Tasas de Desempleo y Mercado Laboral — Serie Anual", org: "CAF · Economía", category: "economia", formats: ["csv","json"], desc: "Desempleo abierto, empleo informal, brecha de género y participación laboral.", date: "2024-03", views: 2987, downloads: 701 },
  { id: 13, title: "Mapas de Riesgo de Desastres Naturales — LATAM 2023", org: "CAF · Medioambiente", category: "medioambiente", formats: ["shp","json"], desc: "Zonificación geográfica de riesgo sísmico, volcánico, inundaciones y deslizamientos.", date: "2024-08", views: 2765, downloads: 654 },
  { id: 14, title: "Conectividad Digital: Internet y Banda Ancha por País", org: "CAF · Tecnología", category: "social", formats: ["csv","api"], desc: "Penetración de internet, velocidades de banda ancha y brecha digital en la región.", date: "2024-07", views: 2543, downloads: 598 },
  { id: 15, title: "Mortalidad Materna e Infantil — Indicadores de Salud", org: "CAF · Salud", category: "salud", formats: ["csv","xlsx"], desc: "Tasas de mortalidad materna, neonatal e infantil con desagregación geográfica.", date: "2024-06", views: 2321, downloads: 543 },
  { id: 16, title: "Reservas de Biodiversidad y Áreas Protegidas LAC", org: "CAF · Medioambiente", category: "medioambiente", formats: ["shp","json","csv"], desc: "Extensión, categoría y estado de conservación de áreas naturales protegidas.", date: "2024-05", views: 2109, downloads: 487 },
  { id: 17, title: "Inversión Extranjera Directa (IED) por País y Sector", org: "CAF · Economía", category: "economia", formats: ["csv","api"], desc: "Flujos de IED por país receptor, país origen y sector económico receptor.", date: "2024-04", views: 1987, downloads: 432 },
  { id: 18, title: "Indicadores de Género y Empoderamiento Femenino", org: "CAF · Social", category: "social", formats: ["csv","json"], desc: "Participación política, brechas salariales, acceso a educación y violencia de género.", date: "2024-03", views: 1876, downloads: 398 },
  { id: 19, title: "Producción Agropecuaria por Cultivo y País 2000-2023", org: "CAF · Economía", category: "economia", formats: ["csv","xlsx"], desc: "Producción, rendimiento y superficie cosechada por cultivo principal y país.", date: "2024-08", views: 1765, downloads: 367 },
  { id: 20, title: "Índice de Desarrollo Humano (IDH) — LAC 1990-2023", org: "CAF · Social", category: "social", formats: ["csv","api","json"], desc: "IDH y sus componentes: salud, educación e ingreso. Serie histórica para todos los países.", date: "2024-07", views: 1654, downloads: 341 },
  { id: 21, title: "Calidad del Aire: PM2.5 y Contaminantes Urbanos LAC", org: "CAF · Medioambiente", category: "medioambiente", formats: ["csv","api"], desc: "Mediciones de partículas PM2.5, PM10, NOx y CO₂ en las principales ciudades de LAC.", date: "2024-06", views: 1543, downloads: 312 },
  { id: 22, title: "Sistema de Transporte Público Urbano — 20 Ciudades", org: "CAF · Transporte", category: "transporte", formats: ["json","csv"], desc: "Rutas, frecuencias, capacidad y demanda del transporte público en ciudades capitales.", date: "2024-05", views: 1432, downloads: 287 },
  { id: 23, title: "Tasa de Cobertura de Vacunación Infantil LAC 2010-2023", org: "CAF · Salud", category: "salud", formats: ["csv","xlsx"], desc: "Cobertura de vacunas DTP, sarampión, polio y COVID-19 por país y grupo etario.", date: "2024-04", views: 1321, downloads: 265 },
  { id: 24, title: "Precios de Energía Eléctrica para Industria y Hogares", org: "CAF · Energía", category: "energia", formats: ["csv","api"], desc: "Tarifas eléctricas residenciales e industriales comparadas por país y categoría de consumo.", date: "2024-03", views: 1210, downloads: 243 },
  { id: 25, title: "Patentes e Innovación Tecnológica en Latinoamérica", org: "CAF · Tecnología", category: "social", formats: ["json","csv"], desc: "Registro de patentes, inversión en I+D, startups tecnológicas y ecosistemas de innovación.", date: "2024-08", views: 1109, downloads: 218 }
];

// Info de organismo/fuente y frecuencia por categoría — usado en la página de detalle de dataset
const AGENCY_INFO = {
  economia:        { name: "Dirección de Análisis Económico", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-ECON", freq: "Anual" },
  infraestructura: { name: "Vicepresidencia de Infraestructura", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-INFRA", freq: "Anual" },
  energia:         { name: "Programa de Energía y Clima", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-ENER", freq: "Anual" },
  salud:           { name: "Dirección Social", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-SALUD", freq: "Anual" },
  educacion:       { name: "Dirección Social", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-EDU", freq: "Anual" },
  medioambiente:   { name: "Dirección de Acción Climática", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-AMB", freq: "Anual" },
  transporte:      { name: "Vicepresidencia de Infraestructura", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-TRANS", freq: "Trimestral" },
  social:          { name: "Dirección Social", full: "CAF – Banco de Desarrollo de América Latina y el Caribe", code: "CAF-SOC", freq: "Anual" }
};

const CATEGORIES = {
  economia:        { name: "Economía y Finanzas", icon: "💹", color: "hsl(152,68%,40%)" },
  infraestructura: { name: "Infraestructura",      icon: "🏗️", color: "hsl(244,79%,55%)" },
  energia:         { name: "Energía y Clima",      icon: "⚡", color: "hsl(36,96%,50%)" },
  salud:           { name: "Salud",                icon: "🏥", color: "hsl(4,86%,58%)" },
  educacion:       { name: "Educación",            icon: "🎓", color: "hsl(221,67%,50%)" },
  medioambiente:   { name: "Medioambiente",        icon: "🌿", color: "hsl(152,68%,35%)" },
  transporte:      { name: "Transporte y Movilidad",icon:"🚌", color: "hsl(270,60%,55%)" },
  social:          { name: "Desarrollo Social",    icon: "🤝", color: "hsl(320,70%,50%)" }
};
