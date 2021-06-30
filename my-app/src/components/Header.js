import React from "react";


const Header = (props) => {
  return (
    
    <header className='App'>
      <h6  >{props.logged_in
            ? `Hello, ${props.email}!`
            : '' } </h6>

    </header>
    
  );
};

export default Header;

Header.defaultProps = {
  title: 'Job World',
}



