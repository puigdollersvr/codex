# Objetivos Inteligentes

PWA mobile-first con chatbot para definir objetivos SMART, OKR y KPI. Incluye
dashboard, guardado local y opción de persistencia en Supabase.

## Requisitos
- Node.js 18+
- npm

## Instalación
```bash
npm install
```

## Configuración
Este proyecto usa un archivo `.env` con valores de ejemplo. Debes reemplazar
los placeholders antes de ejecutar el chat IA o el guardado en Supabase:

```env
OPENAI_API_KEY=REEMPLAZA_CON_TU_OPENAI_API_KEY
NEXT_PUBLIC_AI_ENABLED=false

NEXT_PUBLIC_SUPABASE_URL=REEMPLAZA_CON_TU_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=REEMPLAZA_CON_TU_SUPABASE_ANON_KEY
```

### OpenAI
1. Coloca tu `OPENAI_API_KEY`.
2. Cambia `NEXT_PUBLIC_AI_ENABLED=true` para habilitar el chat.

Si no está configurado, el chat mostrará un aviso y el formulario quedará
deshabilitado.

### Supabase
1. Sustituye `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Ejecuta la migración SQL para crear las tablas:

```bash
supabase/migrations/0001_create_objectives.sql
```

Si no está configurado, los objetivos se guardan localmente en el navegador.

## Ejecutar en desarrollo
```bash
npm run dev
```

Abre `http://localhost:3000`.

## Pruebas manuales recomendadas
- Chat: `/chat`
- Guardar objetivo: `/objetivos/nuevo`
- Dashboard: `/dashboard`

## Notas
- El dashboard muestra un estado vacío si no hay objetivos guardados.
- El guardado remoto requiere la tabla `objectives` con RLS habilitado.
