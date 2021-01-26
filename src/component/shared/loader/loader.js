import "./loader.css";

export const Loader = () => {
  return (
    <div data-testid="loader" className="loader-container">
      <div className="container">
        <div className="banner">
          LOADING
          <div className="banner-left"></div>
          <div className="banner-right"></div>
        </div>
      </div>
    </div>
  );
};
