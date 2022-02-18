import React from 'react'

const Pagination = ({ driversPerPage, totalDrivers, paginate, currentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pager'>
      <ul className='pager__items'>
        {pageNumbers.map(number => (
          <li key={number} className={`pager__item ${currentPage === number ? "pager-item--active" : ""}`}>
            <a onClick={() => paginate(number)} href='#!' className='pager__link'>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
