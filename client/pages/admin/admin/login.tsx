import { useRef, useState } from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import Head from "next/head";

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
    <div>
      <Head>
        <title>artHouse19-About</title>
      </Head>
      <div className="grid admin-login-main">
        <div className="admin-login-div title-div">
          <p>login</p>
          <div className="admin-login-inputs">
            <div className="grid modal-input-div">
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
            </div>
            <div className="grid modal-input-div">
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
            </div>
          </div>
          <div className="align-right">
            <button className="form-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginC;
