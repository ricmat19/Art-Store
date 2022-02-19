import { useRef, useState } from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import Head from "next/head";
import { Grid } from '@mui/material';

const AdminLoginC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/login", {
        email: email,
        password: password,
      });

      const loginResponse = await IndexAPI.get(`/login`);
      if (loginResponse.data.data.loggedIn) {
        router.push("/admin/products/print");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-About</title>
      </Head>
      <Grid className="grid admin-login-main">
        <Grid className="admin-login-div title-div">
          <p>login</p>
          <Grid className="admin-login-inputs">
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
