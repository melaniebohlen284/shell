# Cloudflare Page Rule - Redirección HTTP 301

## Para crear la redirección en Cloudflare:

### Opción 1: Page Rules (Dashboard)

1. Inicia sesión en Cloudflare dashboard
2. Selecciona tu dominio: deutschebank-netherlands.com
3. Ve a "Rules" → "Page Rules"
4. Crea una nueva Page Rule:

   **URL pattern:**
   ```
   deutschebank-netherlands.com/
   ```

   **Settings (配置):**
   - Always Use HTTPS: ON (opcional, si usas SSL)
   - Forward URL: 301 - Permanent Redirect
   - Destination URL:
   ```
   https://deutschebank-netherlands.com/?lang=de
   ```

5. Guarda y despliega

---

### Opción 2: Workers (más flexible)

Si prefieres usar Cloudflare Workers:

1. Ve a "Workers & Pages" → "Create" → "Create Worker"
2. Configura el worker:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Redirección de la raíz a /?lang=de
    if (url.pathname === "/" && !url.searchParams.has("lang")) {
      return Response.redirect(
        "https://deutschebank-netherlands.com/?lang=de",
        301
      );
    }
    
    // Otras rutas sin parámetro de idioma
    if (!url.searchParams.has("lang")) {
      url.searchParams.set("lang", "de");
      return Response.redirect(url.toString(), 301);
    }
    
    return fetch(request);
  }
};
```

3. Asigna el worker a tu dominio
4. Configura una Route: `deutschebank-netherlands.com/*`

---

### Verificación de la redirección

Para verificar que la redirección HTTP 301 funciona correctamente:

```bash
# Usando curl (Linux/Mac)
curl -I https://deutschebank-netherlands.com/

# Deberías ver:
# HTTP/2 301
# Location: https://deutschebank-netherlands.com/?lang=de
```
