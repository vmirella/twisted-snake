# Squirloop

Juego web de la serpiente en el que una ardilla recoge bellotas en un tablero de bosque. Está hecho con Vue 3 y Vite. Empezó como Twisted Snake, un proyecto en Vue 2, y hoy corre en Vue 3.

[Jugar la demo](https://twisted-snake.vercel.app/)

Agrega aquí una captura o un GIF de la partida, por ejemplo:
![Partida en Squirloop](docs/screenshots/gameplay.png)

## Cómo se juega

- La ardilla empieza en una posición aleatoria del tablero.
- Cada bellota suma puntos y hace crecer a la ardilla.
- La velocidad depende de la dificultad elegida: fácil, normal o difícil.
- La partida termina si la ardilla choca contra la pared o contra su propio cuerpo.
- Al terminar, la puntuación entra en la tabla de récords, ordenada de mayor a menor.

Se juega con el teclado en escritorio y con botones direccionales en pantallas táctiles.

## Características

- Tablero dibujado con canvas.
- Marcador en tiempo real y mejor puntuación guardada en `localStorage`.
- Ranking local de las mejores partidas.
- Pantalla de inicio con instrucciones, y navegación hacia la partida con Vue Router.
- Diseño responsivo con tema de bosque.

## Tecnologías

Vue 3, Vite, Vue Router, JavaScript, canvas, CSS y `localStorage`.

## Ejecutarlo localmente

Requiere Node.js 18 o superior y Yarn (también funciona con npm).

```bash
git clone https://github.com/vmirella/twisted-snake.git
cd twisted-snake
yarn install
yarn dev
```

La app queda disponible en `http://localhost:5173`.

| Comando        | Qué hace                                            |
| -------------- | --------------------------------------------------- |
| `yarn dev`     | Servidor de desarrollo                              |
| `yarn build`   | Build de producción en la carpeta `dist/`           |
| `yarn preview` | Sirve el build de producción para probarlo en local |

Con npm, usa `npm install` y `npm run dev`, `npm run build` o `npm run preview`.

## Estructura

```text
src/
├── assets/
├── components/
│   ├── Scores.vue        Ranking de puntuaciones
│   └── SnakeCanvas.vue   Tablero del juego (canvas)
├── views/
│   ├── HomeView.vue      Inicio e instrucciones
│   └── GameView.vue      Partida
├── router/index.js
├── styles/
├── App.vue
└── main.js
```

## Historia del proyecto

Empecé este juego en Vue 2 y lo migré a Vue 3 y a Vite. En la misma etapa rediseñé la interfaz con un tema de bosque, agregué los controles táctiles, el marcador y el mejor récord, y separé el código en vistas y componentes.

## Decisiones técnicas

### Cómo funciona el bucle del juego y por qué elegiste ese enfoque

El bucle principal del juego se ejecuta dentro de `SnakeCanvas` con una llamada recursiva a `move()`. Cuando la partida se activa, el watcher de `isPlaying` ejecuta `resetSnake()`, dibuja el estado inicial y llama a `move()`. En cada iteración, el código calcula la nueva cabeza, comprueba si hay colisión con los bordes o con el cuerpo, actualiza la serpiente y vuelve a programar el siguiente paso con `setTimeout(() => this.move(), this.getMoveDelay())`.

Elegí este enfoque porque mantiene el movimiento controlado y predecible: el juego solo avanza cuando la partida está activa y se puede pausar o reiniciar fácilmente. Además, el flujo resulta más fácil de depurar y adaptar que una lógica basada en varios eventos del navegador o en múltiples timbres desordenados.

### Por qué el tablero usa canvas y no elementos del DOM

Se eligió `canvas` para renderizar el tablero porque es más eficiente que crear cientos de elementos del DOM para cada celda del juego. El tablero es pequeño y fijo, pero necesita repintarse en cada tick con la serpiente, la bellota y el fondo. `canvas` permite actualizar toda la escena en un solo contexto gráfico, sin generar nodos innecesarios ni re-renderizar la interfaz completa.

Esto también encaja mejor con la estética pixelada del proyecto, ya que facilita dibujar sprites y mantener un aspecto visual homogéneo con menos complejidad de DOM.

### Cómo se calcula la velocidad en cada dificultad

La velocidad depende del valor de `speed` en `GameView`:

- Fácil: `4`
- Normal: `8`
- Difícil: `12`

En `SnakeCanvas`, el retraso entre movimientos se calcula con:

```js
return (2 / this.speed) * 1000;
```

Eso significa que a mayor valor de `speed`, menor es el intervalo de tiempo entre cada avance. Por ejemplo, en dificultad fácil el movimiento es más lento y en difícil es más rápido, manteniendo una sensación progresiva y consistente en la dificultad.

### Qué guardas en localStorage y con qué estructura

La aplicación guarda el historial de puntajes y el mejor resultado en dos claves de `localStorage`:

- `ardilla-bellota-records`: un array numérico como `[15, 11, 8]`, donde cada número representa una puntuación de partida.
- `ardilla-bellota-best-score`: un número único con la mayor puntuación conseguida.

La lógica de `GameView` valida que cada puntaje sea válido antes de guardarlo, ordena el historial de mayor a menor y limita el listado a 10 resultados. Así, la información persiste entre sesiones del navegador y el usuario puede seguir mejorando su récord sin perder la progresión.

## Despliegue

La demo se publica en Vercel (configuración en `vercel.json`).

## Licencia

MIT. Consulta el archivo `LICENSE`.

## Autor

Proyecto de [vmirella](https://github.com/vmirella).
