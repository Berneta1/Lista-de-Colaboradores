import './App.css'
import { useState, useRef } from 'react'
import data from './data/data.js'

import Header from './components/Header.jsx'
import Add from './components/Add.jsx'
import List from './components/List.jsx'

function App() {
  //Todos los colaboradores
  const [colaboradores, setColaboradores] = useState(data)

  // lista filtrable
  const [mostrarColaboradores, setMostrarColaboradores] = useState(data)
  const buscador = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    //si los inputs estan vacios, retornamos
    if (!e.target[0].value || !e.target[1].value) return

    //Generar el objeto que representa al nuevo colaborador
    const nuevoColaborador = {
      id: colaboradores.length + 1,
      nombre: e.target[0].value,
      correo: e.target[1].value
    }
    //Creamos el array de colaboradores actualizado
    const colaboradoresActualizado = [...colaboradores, nuevoColaborador]

    // Actualizamos lista de colaboradores
    setColaboradores(colaboradoresActualizado)
    setMostrarColaboradores(colaboradoresActualizado)

    // Reset de inputs
    e.target[0].value = ""
    e.target[1].value = ""

  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return

    const valor = buscador.current.value.toLowerCase()

    const filtrado = colaboradores.filter((colaborador) => {
      return colaborador.nombre.toLowerCase().includes(valor) ||
        colaborador.correo.toLocaleLowerCase().includes(valor)
    })

    setMostrarColaboradores(filtrado)
  }

  const reset = () => {
    if (!buscador.current.value) {
      setMostrarColaboradores(colaboradores)
    }
  }


  return (
    <div className="App">
      <Header
        reset={reset}
        referencia={buscador}
        buscar={handleKeyDown}></Header>

      <main>
        <Add submit={handleSubmit}></Add>

        <div className='Listado-colaboradores'>
          <h3>Listado de colaboradores</h3>
          {
            mostrarColaboradores.length > 0 ?
              <List listado={mostrarColaboradores}></List>
              : <p className='sin-resultados'>No hay resultados</p>
          }


        </div>


      </main>
    </div>
  )
}

export default App
