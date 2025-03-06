import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('/api/vehicles')
    .then(res => {
      setVehicles(res.data)
    }).catch(err => {
      console.error(err);
    })
  })

  return (
    <>
      <h1>Chai aur Fullstack</h1>
      <p>Vehicles: {vehicles.length}</p>

      {
        vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.type}</p>
          </div>
        ))
      }
    </>
  )
}

export default App