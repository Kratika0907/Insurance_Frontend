import "./error.css";

export const ErrorFallBack = ({ error, resetErrorBoundary }) =>{
  return (
    <div className="error-container">
      <h1>4xx</h1>
      <p>Oops! Something is wrong.</p>
      <pre>{error.message}</pre>
      <button className="error-button" onClick={resetErrorBoundary}>Take me to home page</button>
    </div>
  );
}

