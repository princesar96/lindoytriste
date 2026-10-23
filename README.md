# Lindoytriste: dossier web

Landing page estática del dossier de presentación de Lindoytriste (proyecto solista de canción romántica y antibalada, Santiago de Chile).

Sin framework ni paso de build: HTML, CSS y un script mínimo.

## Estructura

```
index.html      contenido de la página
styles.css      estilos
script.js       enciende las luces de la línea de tiempo al hacer scroll
vercel.json     configuración de Vercel (cache de imágenes)
assets/         fotografías optimizadas
```

## Editar el contenido

- Los textos y enlaces están en `index.html`, en el mismo orden del documento original.
- El correo de contacto está al final de `index.html`, en el bloque `cierre__correo`.
- Paleta y tipografías están como variables al inicio de `styles.css`.

## Probar en local

```
python3 -m http.server 8000
```

y abrir http://localhost:8000.

## Despliegue

Se despliega en Vercel como sitio estático (sin comando de build, el directorio raíz es la carpeta del proyecto). Cada push a la rama principal publica una nueva versión.
