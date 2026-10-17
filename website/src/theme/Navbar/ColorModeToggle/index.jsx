import React from 'react';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';

export default function PersistentNavbarColorModeToggle({className, ...props}) {
  return (
    <NavbarColorModeToggle
      {...props}
      className={[className, 'navbar-theme-toggle'].filter(Boolean).join(' ')}
    />
  );
}
