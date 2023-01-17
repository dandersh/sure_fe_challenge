import { Link, Box } from '@mui/material';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import "./index.css";
type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

function NavBar({ links }: TNavBar) {

  let activeStyle = {
    borderRadius: '3px',
    backgroundColor: 'slategrey',
    border: '2px dashed'
  };

  return (
    <Box
      component="aside"
      sx={{
        background: '#0c2975',
        padding: '16px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </Link>
      {links.map(({ text, href, 'data-testid': dataTestId }) => (
        <NavLink
          key={href}
          to={href}
          color="#fff"
          style={
            ({ isActive }) => isActive ? activeStyle : {}
          }
          className={'default'}
          data-testid={dataTestId}
        >
          {text}
        </NavLink>
      ))}
    </Box>
  );
}

export default NavBar;
