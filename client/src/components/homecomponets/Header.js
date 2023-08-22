import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";

 function Header(props) {
  const { sections, title } = props;
  const[user,setUser]=React.useState(window.localStorage.getItem("name"));
  const[cookie,setcookie]=useCookies("[access_token]");
  const handleLogout=()=>{
    window.localStorage.clear();
    setcookie('access_token',"");
  }
  

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">{user}</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        <Link  to={"/"}>
          <Button variant="outlined" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-evenly", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link key={section.title} to={section.url}>
            <Button variant="outlined" size="small" color="success">
              {section.title}
            </Button>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
