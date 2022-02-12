import HeaderC from "../components/header";
import FooterC from "../components/footer";

const PageNotFoundC = () => {
  return (
    <div>
      <HeaderC />
      <div className="main-body">
        <h1>Page Not Found (404)</h1>
        <FooterC />
      </div>
    </div>
  );
};

export default PageNotFoundC;
