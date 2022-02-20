import { FC, useState } from "react";
// import SignInModalC from "../auth/signinModal";
import { Grid, Menu, MenuItem, ListItemIcon } from '@mui/material';

// interface IModalState {
//   open: boolean,
//   onClose: boolean,
//   show: boolean,
//   onHide: () => void,
//   email: string,
//   password: string,
// }

const AdminMainNav: FC = () => {

  const [, setDisplaySignInModal] = useState<boolean>(false);
  const [signedIn,] = useState<boolean>(true);
  // const [email, ] = useState<string>("");
  // const [password, ] = useState<string>("");

  const handleOpen = () => setDisplaySignInModal(true);
  // const handleClose = () => setDisplaySignInModal(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  if(signedIn){
    return (
      <header>  
        <nav>
          <Grid container>
            <Grid container xs={11} sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1>logo</h1>
            </Grid>
            <Grid container xs={1} sx={{alignContent: "center"}}>
              <Grid container sx={{justifyContent: "center"}}>
                <h1><i className="fas fa-user-circle account-menu-icon" onClick={handleClick}></i></h1>
              </Grid>
            </Grid>
          </Grid>
          <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleAccountMenuClose}
          onClick={handleAccountMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <ListItemIcon>
              <i className="fas fa-sign-out-alt account-menu-icon"></i>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </nav>
        <hr/>
      </header>
    );
  }else{
    return(
      <header>
  
        {/* Signin */}
        {/* <SignInModalC 
          open={displaySigninModal}
          onClose={handleClose}
          email={email}
          password={password}
        /> */}
  
        <nav>
          <Grid container>
            <Grid xs={1} sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1>logo</h1>
            </Grid>
            <Grid xs={9} container sx={{alignContent: "center"}}>
              <Grid xs={1} sx={{ textAlign: 'center', alignSelf: "center"}}>
                <h1>search</h1>
              </Grid>
              <Grid xs={11} container sx={{pt: "10px", pb: "10px"}}>
                <input type="text" placeholder="test" className="search-field"/>
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{alignContent: "center"}}>
              <Grid xs={2}container sx={{justifyContent: "center", alignSelf: "center" }}>
                <a href="/cart"><i className="fas fa-shopping-cart account-menu-icon"></i></a>
              </Grid>
              <Grid xs={5} container sx={{justifyContent: "center"}}>
                <h2 className="pointer" onClick={() => handleOpen}>sign up</h2>
              </Grid>
              <Grid xs={5} container sx={{justifyContent: "center"}}>
                  <h2 className="pointer" onClick={() => handleOpen}>sign in</h2>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr/>
      </header>
    );
  }

};

export default AdminMainNav;
