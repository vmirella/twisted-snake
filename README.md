# Twisted Snake

Un juego clásico de serpiente reinventado con un estilo más amigable y visualmente atractivo, donde la protagonista es una ardilla que recoge bellotas en un tablero de aventura.

## Descripción del proyecto

Twisted Snake es una versión moderna del clásico juego Snake construida con Vue 3 y Vite. El objetivo es recorrer el tablero, recolectar bellotas, aumentar la puntuación y evitar chocar con los bordes del escenario. La experiencia incluye una interfaz de inicio, una pantalla de juego y una sección de mejores puntajes para mantener la motivación del usuario.

## Características

- Tablero interactivo con movimiento por teclado
- Dificultad ajustable: fácil, normal y difícil
- Sistema de puntuación y ranking de mejores partidas
- Animación y diseño visual inspirado en un entorno forestal
- Navegación entre pantalla de inicio y pantalla de juego con Vue Router
- Experiencia responsiva y ligera

## Cómo se juega

- La ardilla aparece en una posición aleatoria del tablero.
- Empieza con un tamaño inicial de 3 cuadros.
- Cada bellota recolectada suma 1 punto.
- Cada bellota también hace crecer a la ardilla en un cuadro.
- La velocidad aumenta según el nivel de dificultad seleccionado.
- Si la ardilla choca contra la pared, la partida termina.
- Al finalizar, la puntuación queda registrada en el historial de resultados.
- Los puntajes se muestran ordenados de mayor a menor.

## Tecnologías utilizadas

- Vue 3
- Vite
- Vue Router
- JavaScript
- CSS moderno con variables y diseño responsivo

## Requisitos

- Node.js 18 o superior
- npm o yarn

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/vmirella/twisted-snake.git
cd twisted-snake
```

2. Instala las dependencias:

```bash
npm install
```

o si prefieres Yarn:

```bash
yarn install
```

## Ejecución local

Inicia el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en el puerto de desarrollo de Vite, normalmente en:

```text
http://localhost:5173
```

## Build de producción

```bash
npm run build
```

Este comando genera una versión optimizada para producción en la carpeta `dist/`.

## Demo

Puedes probar la versión publicada aquí:

[Twisted Snake Demo](https://twisted-snake.vercel.app/)

## Estructura del proyecto

```text
src/
├── components/
│   ├── Scores.vue
│   └── SnakeCanvas.vue
├── views/
│   ├── HomeView.vue
│   └── GameView.vue
├── router/
│   └── index.js
├── styles/
│   └── game-theme.css
├── App.vue
├── main.js
└── assets/
```

## Objetivo del proyecto

Este proyecto combina la lógica de un juego clásico con una interfaz moderna y una experiencia más visual, con el fin de explorar el desarrollo front-end con Vue, la organización por componentes y la creación de una experiencia de juego completa y accesible.

## Autor

Proyecto desarrollado por [vmirella](https://github.com/vmirella).
