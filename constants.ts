import { TemplateLevel, TechnicalLevel } from './types';

const SHARED_RULES = `
**Reglas Estrictas de Generación:**
- **Entorno:** React 18+, TypeScript, ESM.
- **Estilo:** USA EXCLUSIVAMENTE Tailwind CSS cargado vía CDN en \`index.html\`. NO uses archivos .css, CSS-in-JS, o el atributo \`style\`.
- **Estructura de Archivos:** La respuesta COMPLETA debe ser un único bloque XML válido: \`<changes><change>...</change></changes>\`. Cada \`<change>\` debe contener \`<file>\` (ruta completa), \`<description>\` y \`<content>\` con el código completo dentro de un bloque CDATA.
- **Código React:** Usa componentes funcionales y hooks. Define componentes auxiliares fuera del componente padre para evitar re-renderizados. NO uses \`JSX.Element\`. Usa \`createRoot\` en \`index.tsx\`.
- **Calidad del Código:** El código debe ser limpio, legible, mantenible, y con buen rendimiento. Evita bucles infinitos en \`useEffect\` (usa dependencias correctas o el comentario para deshabilitar la regla si es a propósito para montaje).
- **API Key:** El API key de Gemini se obtiene de \`process.env.API_KEY\`. NO generes UI para pedirla.
`;

export const PROMPT_TEMPLATES: Record<TemplateLevel, Record<TechnicalLevel, string>> = {
  [TemplateLevel.Basica]: {
    [TechnicalLevel.Principiante]: `
Actúa como un tutor de programación amigable. Soy principiante. Ayúdame a crear mi primera aplicación web.

**Mi idea es:**
{problema}

{knowledge_base}

**Algunos detalles:**
- **Público:** {audiencia}
- **Quiero que sea para:** {plataforma}
- **Lenguaje a usar:** {lenguaje}
- **Notas adicionales:** {restricciones}

**Instrucciones para ti:**
1.  **Simpleza:** Mantén el código lo más simple posible. Usa un solo componente \`App.tsx\` para toda la lógica.
2.  **Explicaciones:** Añade muchos comentarios en el código para explicar qué hace cada parte.
3.  **Paso a paso:** Genera los archivos necesarios: \`metadata.json\`, \`index.html\`, \`index.tsx\`, y \`App.tsx\`.
4.  **Estilo:** Usa clases de Tailwind CSS para que se vea bonito y ordenado.

${SHARED_RULES}
`,
    [TechnicalLevel.Intermedio]: `
Actúa como un colega desarrollador. Quiero construir un prototipo rápido.

**Problema a resolver:**
{problema}

{knowledge_base}

**Contexto:**
- **Audiencia:** {audiencia}
- **Plataforma:** {plataforma}
- **Stack:** {lenguaje} y React.
- **Restricciones:** {restricciones}

**Requisitos técnicos:**
1.  **Componentes:** Separa la UI en componentes lógicos y reutilizables (ej: en una carpeta \`components/\`).
2.  **Estado:** Usa los hooks \`useState\` y \`useEffect\` de forma apropiada para manejar el estado y los efectos secundarios.
3.  **Funcionalidad:** Implementa la lógica central para resolver el problema descrito.

${SHARED_RULES}
`,
    [TechnicalLevel.Experto]: `
Actúa como un arquitecto de software. Dame una base de código sólida para el siguiente problema.

**Problema:** {problema}

{knowledge_base}

**Audiencia:** {audiencia}
**Plataforma:** {plataforma}
**Stack:** {lenguaje} / React / Tailwind
**Restricciones:** {restricciones}

**Directivas de implementación:**
1.  **Estructura:** Define una estructura de proyecto clara (e.g., \`components\`, \`services\`).
2.  **Manejo de estado:** Implementa un manejo de estado eficiente.
3.  **Código limpio:** El código debe ser conciso y seguir las mejores prácticas.

${SHARED_RULES}
`,
  },
  [TemplateLevel.Estandar]: {
    [TechnicalLevel.Principiante]: `
Actúa como un mentor de desarrollo web. Estoy aprendiendo a estructurar aplicaciones.

**Problema a resolver:**
{problema}

{knowledge_base}

**Contexto:**
- **Audiencia objetivo:** {audiencia}
- **Plataforma de despliegue:** {plataforma}
- **Lenguaje principal:** {lenguaje}
- **Limitaciones o ideas:** {restricciones}

**Guía de implementación (Nivel Principiante):**
1.  **Estructura de archivos:** Ayúdame a organizar el código. Crea una carpeta \`components\` para los componentes de UI.
2.  **Componentes:** Divide la aplicación en al menos 2 o 3 componentes pequeños. Por ejemplo, un componente para el formulario y otro para mostrar la lista de resultados. Explica con comentarios por qué se separan.
3.  **Paso de datos (Props):** Muestra cómo pasar datos de un componente padre a un hijo usando props.
4.  **Manejo de eventos:** Implementa funciones para manejar clics de botones o cambios en inputs y explica cómo actualizan el estado.
5.  **UI Clara:** Usa Tailwind CSS para crear una interfaz limpia con buena legibilidad.

${SHARED_RULES}
`,
    [TechnicalLevel.Intermedio]: `
Actúa como un ingeniero de frontend senior revisando mi plan de proyecto.

**Requerimiento:**
{problema}

{knowledge_base}

**Información del proyecto:**
- **Usuario final:** {audiencia}
- **Entorno:** {plataforma}
- **Stack tecnológico:** {lenguaje}, React, TailwindCSS.
- **Restricciones clave:** {restricciones}

**Especificaciones técnicas:**
1.  **Arquitectura:** Establece una estructura de proyecto con separación de responsabilidades: \`components/\`, \`hooks/\`, \`types.ts\`.
2.  **Componentes:** Crea un sistema de componentes bien definidos y reutilizables con props tipadas (interfaces de TypeScript).
3.  **Hooks personalizados:** Si la lógica de estado es compleja (ej. fetching de datos), encapsúlala en un hook personalizado (ej: \`useApiData\`).
4.  **Manejo de estado:** Usa \`useState\`, \`useEffect\`, y \`useCallback\` para un manejo de estado y renderizado eficiente.
5.  **Simulación de API:** Si se necesita data externa, crea un archivo en \`services/\` que simule la respuesta de una API con un retraso (\`setTimeout\`).
6.  **UI/UX:** El diseño debe ser funcional e intuitivo. Implementa estados de carga (loading spinners) y de error.

${SHARED_RULES}
`,
    [TechnicalLevel.Experto]: `
Actúa como un Lead Engineer. Vas a definir el boilerplate para una nueva feature.

**Feature a desarrollar:**
{problema}

{knowledge_base}

**Contexto:**
- **Audiencia:** {audiencia}
- **Plataforma:** {plataforma}
- **Stack:** {lenguaje}, React, TailwindCSS
- **Restricciones/Requisitos no funcionales:** {restricciones}

**Directivas de arquitectura:**
1.  **Estructura Robusta:** Define una estructura de proyecto escalable: \`components\`, \`services\`, \`hooks\`, \`types.ts\`, \`constants.ts\`.
2.  **Tipado Estricto:** Utiliza TypeScript de forma exhaustiva. Define todos los tipos e interfaces en \`types.ts\`.
3.  **Estado Avanzado:** Para lógica de estado compleja, utiliza \`useReducer\` para una gestión predecible y centralizada.
4.  **Performance:** Aplica optimizaciones de renderizado con \`useMemo\` y \`React.memo\` donde sea apropiado.
5.  **Manejo de Errores:** Implementa un sistema de manejo de errores robusto para las llamadas a servicios, mostrando feedback claro al usuario.
6.  **Código Asíncrono:** Usa \`async/await\` para todo el código asíncrono y gestiona los estados de promesa (pending, fulfilled, rejected).

${SHARED_RULES}
`,
  },
  [TemplateLevel.Avanzada]: {
    [TechnicalLevel.Principiante]: `
Actúa como un instructor de un bootcamp de programación. Mi proyecto final es crear una aplicación completa.

**Descripción del proyecto:**
{problema}

{knowledge_base}

**Detalles:**
- **Usuarios:** {audiencia}
- **Plataforma:** {plataforma}
- **Tecnologías:** {lenguaje}, React, Tailwind.
- **Otras ideas:** {restricciones}

**Requisitos del proyecto (explicados para un principiante):**
1.  **Estructura Completa:** Genera una estructura de proyecto completa: \`metadata.json\`, \`index.html\`, \`index.tsx\`, \`App.tsx\`, \`types.ts\`, y carpetas para \`components\` y \`services\`.
2.  **Tipos de Datos:** En \`types.ts\`, define las "formas" de los datos que usará la app (ej: un \`interface User\`). Comenta para qué sirve cada tipo.
3.  **Simulación de API:** En una carpeta \`services\`, crea un archivo que finja ser un servidor. Debe devolver datos de ejemplo después de un par de segundos.
4.  **Llamada a la API:** En \`App.tsx\`, usa \`useEffect\` para llamar a esa simulación de API cuando la página cargue por primera vez. Explica por qué el array de dependencias \`[]\` es importante.
5.  **Componentes y Props:** Crea varios componentes en su carpeta y muéstrame cómo se comunican con props.
6.  **UI Detallada:** Diseña una interfaz atractiva con Tailwind CSS, incluyendo botones, formularios y tarjetas para mostrar los datos.

${SHARED_RULES}
`,
    [TechnicalLevel.Intermedio]: `
Actúa como mi par en una sesión de pair programming. Vamos a montar la arquitectura de una nueva aplicación.

**Problema de negocio:**
{problema}

{knowledge_base}

**Requerimientos:**
- **Audiencia:** {audiencia}
- **Plataforma:** {plataforma}
- **Stack:** {lenguaje}, React, Tailwind.
- **Restricciones y NFRs:** {restricciones}

**Plan de implementación:**
1.  **Diseño de API de Componentes:** Crea componentes reutilizables con una API de props clara y bien tipada. Incluye componentes de UI genéricos (Button, Input, Card, Modal).
2.  **Gestión de Estado Centralizada:** Utiliza React Context junto con \`useReducer\` para gestionar el estado global de la aplicación (ej: autenticación, datos principales).
3.  **Routing:** Si la app tiene múltiples vistas, usa \`react-router-dom\` (con \`HashRouter\` para compatibilidad).
4.  **Interacción con Gemini API:** Si el problema lo requiere, crea un servicio en \`services/geminiService.ts\` para interactuar con la API de Gemini. Implementa el cliente \`new GoogleGenAI({ apiKey: process.env.API_KEY })\` y una función para generar contenido.
5.  **Formularios:** Gestiona formularios complejos con control de validación y estados de envío.
6.  **Accesibilidad (a11y):** Asegura que la aplicación sea accesible, utilizando atributos ARIA y semántica HTML correcta.

${SHARED_RULES}
`,
    [TechnicalLevel.Experto]: `
Actúa como un Ingeniero Principal de Frontend de React con profunda experiencia en la API de Gemini y diseño UI/UX. Tu objetivo es generar una arquitectura y código de producción para una aplicación web que resuelva un problema específico.

**Problema a resolver:**
{problema}

{knowledge_base}

**Contexto y Restricciones:**
- **Audiencia objetivo:** {audiencia}
- **Plataforma:** {plataforma}
- **Stack principal:** {lenguaje} (TypeScript), React 18+, Tailwind CSS.
- **Restricciones/Requisitos no funcionales:** {restricciones}

**Especificaciones de Arquitectura y Código (Nivel Experto):**
1.  **Arquitectura de Software:** Diseña una arquitectura limpia y escalable. Utiliza una estructura de directorios profesional: \`/components\` (con subdirectorios para UI y vistas), \`/services\`, \`/hooks\`, \`/utils\`, \`/contexts\`, \`/types.ts\`, \`/constants.ts\`.
2.  **Gestión de Estado Avanzada:** Implementa un patrón de gestión de estado robusto. Para estado global, usa React Context con \`useReducer\`. Para el estado del servidor y cacheo de datos, considera simular el comportamiento de una librería como React Query (hooks \`useQuery\`, \`useMutation\`) encapsulando \`fetch\` en hooks personalizados.
3.  **Rendimiento y Optimización:**
    -   Aplica técnicas de optimización: \`React.memo\`, \`useMemo\`, \`useCallback\`.
    -   Implementa "lazy loading" para componentes pesados si aplica.
    -   Virtualiza listas largas si se esperan muchos datos.
4.  **Integración con API Gemini:**
    -   Crea un servicio dedicado \`services/geminiService.ts\`.
    -   Inicializa el cliente: \`const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });\`.
    -   Implementa funciones de servicio para interactuar con los modelos de Gemini ('gemini-2.5-flash'), manejando la construcción de prompts, el envío de solicitudes (\`generateContent\`) y el parseo de respuestas.
    -   Incluye un manejo de errores exhaustivo para la API (timeouts, rate limits, etc.) con reintentos (exponential backoff).
5.  **Testing:** Aunque no puedes escribir los tests, estructura el código para que sea altamente testeable. Separa la lógica de la UI, usa inyección de dependencias para los servicios en los hooks.
6.  **Seguridad:** Si se manejan datos de usuario, demuestra prácticas seguras en el frontend (ej. no exponer claves, validar entradas).
7.  **UI/UX de Alta Fidelidad:** El diseño debe ser impecable, moderno y completamente responsive, con micro-interacciones y transiciones suaves.

${SHARED_RULES}
`,
  },
};
