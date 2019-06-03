import React from "react";
import Prism from "prismjs";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

import "../styles/prism-tomorrow.css";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

class Post extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { data, location } = this.props;
    const post = data.ghostPost;

    return (
      <>
        <MetaData data={data} location={location} type="article" />
        <Layout>
          <div className="container">
            <article className="content">
              {post.feature_image ? (
                <figure className="post-feature-image">
                  <img src={post.feature_image} alt={post.title} />
                </figure>
              ) : null}
              <section className="post-full-content">
                <h1 className="content-title">{post.title}</h1>

                {/* The main post content */}
                <section
                  className="content-body load-external-scripts"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </section>
            </article>
          </div>
        </Layout>
      </>
    );
  }
}

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
