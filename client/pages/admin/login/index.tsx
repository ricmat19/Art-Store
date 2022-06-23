import { useRef, useState } from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import Head from "next/head";
import { Grid } from '@mui/material';

//Admin login functional component
const AdminLoginC = () => {
  // Admin login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //?
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  //Next router function
  const router = useRouter();

  //Function to login admin
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      //Login admin
      await IndexAPI.post("/login", {
        email: email,
        password: password,
      });

      //Get admin login status
      const loginResponse = await IndexAPI.get(`/login`);
      //Route store print page if admin is logged in
      if (loginResponse.data.data.loggedIn) {
        await router.push("/admin/products/print");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Login page component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Login</title>
      </Head>
      <Grid className="grid admin-login-main">
        <Grid className="admin-login-div title-div">
          <p>login</p>
          <Grid className="admin-login-inputs">
            {/* Email login input field */}
            <Grid className="grid modal-input-div">
              <input
                type="email"
                ref={emailInput}
                value={email}
                name="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid className="grid modal-input-div">
              {/* Password login input field */}
              <input
                type="password"
                ref={passwordInput}
                value={password}
                name="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* Admin login submit button */}
          <Grid className="align-right">
            <button className="form-button" onClick={handleLogin}>
              Login
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminLoginC;
