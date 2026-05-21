# CosmoWiki: Interacciones y Fusiones de Galaxias 🌌

¡Bienvenido a **CosmoWiki**! Este es un proyecto de página web de divulgación científica con estilo de wiki moderna, estructurado como una aplicación limpia y fluida de una sola página (SPA). Su temática se enfoca en las **interacciones y fusiones de galaxias**, un pilar fundamental de la astrofísica y la evolución cósmica.

Este proyecto ha sido diseñado específicamente para ser de fácil lectura y comprensión, lo que lo hace ideal para estudiantes de diversas disciplinas en un **Diplomado de Astronomía**.

---

## 🎨 Características de Diseño
*   **Aparición Responsiva**: Optimizado al 100% para dispositivos móviles, tablets y ordenadores portátiles mediante CSS Grid y Flexbox.
*   **Estilo Premium**: Modo oscuro espacial profundo con paletas de acento estelares (azul eléctrico y morado nebulosa) de alto contraste, reduciendo la fatiga visual.
*   **Buscador Inteligente**: Barra de búsqueda en la barra lateral que filtra instantáneamente los artículos en tiempo real a medida que escribes.
*   **Navegación Autoresaltable**: Menú lateral dinámico que resalta automáticamente la sección que estás leyendo mientras te desplazas por la página (mediante la tecnología `Intersection Observer` de JavaScript).
*   **Acordeones Interactivos**: Información organizada en colapsables elegantes para detallar los mecanismos físicos de la gravedad sin saturar visualmente al lector.

---

## 📂 Estructura del Proyecto
*   `index.html`: Estructura semántica HTML5 con todo el contenido redactado detalladamente.
*   `styles.css`: Estilizaciones modernas, variables globales de CSS y animaciones fluidas.
*   `script.js`: Toda la lógica interactiva ligera (buscador, menú móvil, acordeones y resaltado de navegación).
*   `.gitignore`: Excluye archivos basura del sistema operativo del control de versiones.

---

## 🚀 Cómo Desplegar tu Wiki en GitHub Pages

Dado que esta wiki está construida puramente con tecnologías de frontend estático (HTML, CSS y JS sin frameworks pesados), **es perfecta y gratuita de alojar en GitHub Pages**. Sigue estos sencillos pasos desde tu terminal para subirla a tu propio perfil:

### Paso 1: Crea tu Repositorio en GitHub
1. Entra a tu cuenta en [GitHub](https://github.com).
2. Haz clic en el botón **New** (Nuevo repositorio).
3. Nómbralo como desees (por ejemplo: `wiki-astronomia`).
4. Déjalo como **Público** y **NO** le agregues archivos iniciales (como README o `.gitignore`, ya que estos ya los hemos creado localmente).
5. Copia la URL de tu repositorio (será algo como `https://github.com/tu-usuario/wiki-astronomia.git`).

### Paso 2: Conecta y Sube tus Archivos Locales
Desde la terminal en tu computadora (en la carpeta del proyecto `wikiAstronomia`), ejecuta los siguientes comandos ordenadamente:

```bash
# 1. Ya hemos inicializado git en tu carpeta local. 
# Añadimos todos los archivos creados al área de preparación:
git add .

# 2. Creamos tu primer commit (guardado formal de los archivos):
git commit -m "Commit inicial: Wiki de astronomía completa y optimizada"

# 3. Nombramos la rama principal como "main":
git branch -M main

# 4. Conectamos tu carpeta local con tu repositorio remoto de GitHub 
# (Reemplaza la URL con la tuya copiada en el Paso 1):
git remote add origin https://github.com/tu-usuario/wiki-astronomia.git

# 5. Subimos tu código a GitHub:
git push -u origin main
```

### Paso 3: Activa GitHub Pages
1. Una vez subido tu código, entra a tu repositorio en el sitio web de GitHub.
2. Ve a la pestaña **Settings** (Configuración) en la barra superior del repositorio.
3. En la barra lateral izquierda de configuraciones, busca la sección **Pages**.
4. En el apartado **Build and deployment**, bajo **Source**, asegúrate de tener seleccionado **Deploy from a branch**.
5. Debajo, en **Branch**, selecciona la rama **main** y la carpeta **/ (root)**, luego haz clic en **Save** (Guardar).
6. ¡Listo! En un par de minutos, GitHub te dará un enlace público arriba de esa misma sección para que cualquiera pueda visitar tu CosmoWiki desde internet (por ejemplo: `https://tu-usuario.github.io/wiki-astronomia/`).

---

## 📚 Ampliar Contenido (Sugerencias para el Curso)
En la sección final de **Recursos Recomendados**, hemos integrado enlaces y descripciones a excelentes materiales de apoyo. Puedes utilizarlos para estudiar más y escribir tus propios resúmenes para agregarlos a las secciones existentes de la wiki:
1.  **Vídeo de Astrobitácora**: Para describir de manera inmersiva la futura unión espacial de Lactómeda.
2.  **Vídeo de Doctor K**: Excelente para comprender por qué la enorme distancia interestelar impide choques de estrellas físicas.
3.  **Charla/Artículo de la Dra. Almudena Alonso**: Material riguroso para entender cómo los agujeros negros se alimentan tras una fusión (procesos AGN).
