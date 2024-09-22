import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style/Data.module.css'; 

const Datos = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('/api/blog')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  const handleSearch = () => {
    setSearchTerm('');
    setFilteredData(data); // Restaurar la lista completa
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Consulta de API</h1>
      <div className={styles.formGroup}>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleSearch} className={styles.button}>Consultar</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(dato => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.title}</td>
              <td>{dato.author}</td>
              <td>{dato.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datos;