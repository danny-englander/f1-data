import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './components/Paginate';

const App = () => {

  const [drivers, getDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(3);


  useEffect(() => {
    async function fetchDrivers() {
      const URL = 'https://ergast.com/api/f1/drivers.json?limit=10&offset=0';
      try {
        const response = await axios.get(URL);
        console.log(response.data.MRData.DriverTable.Drivers)
        getDrivers(response.data.MRData.DriverTable.Drivers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDrivers();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * driversPerPage;
  const indexOfFirstItem = indexOfLastItem - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstItem, indexOfLastItem);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!getDrivers.length) return <h3>Loading...</h3>;

  return (
    <>
    <ul className='driver'>
      {currentDrivers.map((driver) => (
        <li key={driver.driverId} id={driver.driverId} className="driver__item">
          <div>Name: {driver.givenName} {driver.familyName}</div>
          <div>Link: <a href={driver.url}>{driver.url}</a></div>
          <div>Nationality: {driver.nationality}</div>
        </li>
      ))}
    </ul>

    <Pagination
          currentPage={currentPage}
          driversPerPage={driversPerPage}
          totalDrivers={drivers.length}
          paginate={paginate} />
    </>
  );
}

export default App
