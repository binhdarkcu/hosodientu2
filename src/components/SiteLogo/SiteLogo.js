import React from 'react'

const SiteLogo = () => {

  const handleClick = (e) => {
    e.preventDefault();
  }
  
  return(
    <div className="navbar nav_title" style={{border: 0}}>
      <a href="index.html" className="site_title" onClick={handleClick}><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
    </div>
  )
}
export default SiteLogo;
