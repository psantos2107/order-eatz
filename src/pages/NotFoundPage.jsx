import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 className="text-6xl">404 - PAGE NOT FOUND</h1>
      <p className="mt-4 text-2xl text-slate-500">Oops! The page you are looking for does not exist.</p>
      <a className="mt-4 text-2xl text-blue-500 hover:text-red-600" href="/home">Go Back to Home</a>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "700px",
  },
};

export default NotFoundPage;

