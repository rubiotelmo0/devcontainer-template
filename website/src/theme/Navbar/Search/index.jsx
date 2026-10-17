import React from 'react';
import NavbarSearch from '@theme-original/Navbar/Search';

export default function InlineNavbarSearch({className, ...props}) {
  return (
    <NavbarSearch
      {...props}
      className={[className, 'navbar-header-search'].filter(Boolean).join(' ')}
    />
  );
}
