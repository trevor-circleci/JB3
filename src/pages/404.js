import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import { Layout } from "../components/common";

const NotFoundPage = () => {
  const isServerRendering = !!window;

  if (!isServerRendering) {
    const path = window.location.pathname;

    // Redirect /open/* -> /*
    if (path.startsWith(`/open`)) {
      useEffect(() => {
        const newPath = window.location.pathname.replace(`/open`, ``);
        navigate(newPath);
      }, []);
    }
  }

  return (
    <Layout>
      <div className="container">
        <article className="content" style={{ textAlign: `center` }}>
          <h1 className="content-title">Error 404</h1>
          <section className="content-body">
            Page not found, <Link to="/">return home</Link> to start over
          </section>
        </article>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
