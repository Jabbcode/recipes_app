import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/add-recipe">Añadir Receta</Link>
        <Link to="/settings">Configuracion</Link>
      </div>
    </nav>
  )
}

export default Navbar
