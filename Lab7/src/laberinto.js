/* eslint-disable no-alert */
import React, { useEffect } from 'react'

const width = prompt('Ingrese el ancho del laberinto (de 3-5 para mejores resultados)')
const height = prompt('Ingrese la altura del laberinto (de 3-5 para mejores resultados)')

const Game = () => {
  const [laberinto, setLaberinto] = React.useState([])

  useEffect(() => {
    fetch(`http://quetzaluno.space:3001/?w=${width}&h=${height}&type=json`)
      .then((result) => result.json())
      .then((result) => setLaberinto(result))
  }, [])

  const mover = (event) => {
    let posicion = {}
    laberinto.forEach((row, y) => {
      row.forEach((column, x) => {
        if (column === 'p' || column === 'q' || column === 'd' || column === 'b') {
          posicion = { x, y }
        }
      })
    })

    const newLaberinto = JSON.parse(JSON.stringify(laberinto))

    if (event.key === 'ArrowDown') {
      if (
        laberinto[posicion.y][posicion.x + 1] === ' '
        || laberinto[posicion.y][posicion.x + 1] === 'g'
      ) {
        newLaberinto[posicion.y][posicion.x + 1] = 'd'
        newLaberinto[posicion.y][posicion.x] = ' '
        setLaberinto(newLaberinto)
        posicion = {
          x: posicion.x + 1,
          y: posicion.y,
        }
      }
    }

    if (event.key === 'ArrowRight') {
      if (
        laberinto[posicion.y + 1][posicion.x] === ' '
        || laberinto[posicion.y + 1][posicion.x] === 'g'
      ) {
        newLaberinto[posicion.y + 1][posicion.x] = 'b'
        newLaberinto[posicion.y][posicion.x] = ' '
        setLaberinto(newLaberinto)
        posicion = {
          x: posicion.x,
          y: posicion.y + 1,
        }
      }
    }
    if (event.key === 'ArrowLeft') {
      if (
        laberinto[posicion.y - 1][posicion.x] === ' '
        || laberinto[posicion.y - 1][posicion.x] === 'g'
      ) {
        newLaberinto[posicion.y - 1][posicion.x] = 'q'
        newLaberinto[posicion.y][posicion.x] = ' '
        setLaberinto(newLaberinto)
        posicion = {
          x: posicion.x,
          y: posicion.y - 1,
        }
      }
    }
    if (event.key === 'ArrowUp') {
      if (
        laberinto[posicion.y][posicion.x - 1] === ' '
        || laberinto[posicion.y][posicion.x - 1] === 'g'
      ) {
        newLaberinto[posicion.y][posicion.x - 1] = 'p'
        newLaberinto[posicion.y][posicion.x] = ' '
        setLaberinto(newLaberinto)
        posicion = {
          x: posicion.x - 1,
          y: posicion.y,
        }
      }
    }

    if (posicion.x === laberinto[0].length - 2 && posicion.y === laberinto.length - 2) {
      setTimeout(() => {
        alert('¡Has ganado!')
        window.location.reload()
      }, 5)
    }
  }

  const style = {
    width: 'fit-content', height: 'fit-content', display: 'grid', gridAutoFlow: 'column',
  }

  return (
    /* eslint-disable */
    <div className="gridContainer" role="form" onKeyDown={mover} tabIndex="0" style={style}>
      {laberinto.map((value, index) => (
        <pre key={index}>
          {/* eslint-enable */}
          {value.map((value2, index2) => {
            let sprite = ''

            if (value2 === '|') {
              sprite = './imgs/arbol.png'
            } else if (value2 === '+') {
              sprite = './imgs/arbolitoseco.png'
            } else if (value2 === '-') {
              sprite = './imgs/arbol.png'
            } else if (value2 === ' ') {
              sprite = './imgs/road.png'
            } else if (value2 === 'p') {
              sprite = './imgs/GarconBack.png'
            } else if (value2 === 'd') {
              sprite = './imgs/Garcon.png'
            } else if (value2 === 'q') {
              sprite = './imgs/Garcon2.png'
            } else if (value2 === 'b') {
              sprite = './imgs/Garcon.png'
            } else if (value2 === 'g') {
              sprite = './imgs/Well.png'
            }
            return (
              /* eslint-disable */
              <div key={index2}>
                {/* eslint-enable */}
                <img alt="element" style={{ width: '60px', height: '60px' }} src={sprite} />
              </div>
            )
          })}
        </pre>
      ))}
    </div>
  )
}

export default Game
