import React from "react";
import Prism from "prismjs";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import _ from "lodash";
import styled from "@emotion/styled";
import { DiscussionEmbed, CommentCount } from "disqus-react";
import reframe from "reframe.js";

import * as colors from "../styles/colors";
import { Layout, PostNavigation, SubscribeForm } from "../components/common";
import { MetaData } from "../components/common/meta";

// Prism: Syntax Highlighting
import "../styles/prism-atom-dark.css";
import "../styles/prism-overides.css";

// Add all the tranforms we need
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-json.min.js";

// Plugins
import "prismjs/plugins/line-highlight/prism-line-highlight.min.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

const LoadCommentsButton = styled.span`
  display: block;
  max-width: 170px;
  text-align: center;
  margin: 50px auto;
  color: ${colors.secondary};
  border: 1px solid #c7d5d86e;
  padding: 0px 15px;
  font-size: 12px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    background-color: #c7d5d814;
  }
`;

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      disqusID: null,
      showComments: false,
    };
  }

  applyLineHighlights(node) {
    const regex = /^\/\/\sLineHighlight:\s.*$/gm;
    let lineCode = ``;
    node.innerHTML = node.innerHTML
      .split(`\n`)
      .filter(line => (line.match(regex) ? !(lineCode = line) : true))
      .join(`\n`);

    // Parse line - extract param value
    lineCode = lineCode.match(/(?<=\/\/\sLineHighlight:\s)(.*)(?=;)/);

    // Add data-line attribute
    if (lineCode) {
      node.closest(`pre`).dataset.line = lineCode[0];
    }
  }

  parseLineHighlight() {
    // Select all pre/code
    document
      .querySelectorAll(`code[class*="language-"]`)
      // see if there's '// LineHighlight: 1;'
      .forEach(node => this.applyLineHighlights(node));
  }

  componentDidMount() {
    this.parseLineHighlight();
    Prism.highlightAll();

    // Try here to catch exception thrown when navigating to/from post page
    try {
      reframe(`iframe`);
    } catch (e) {
      return;
    }

    // Wait for window.disqusID set in script tag in <head>
    setTimeout(() => {
      this.setState({
        disqusID: window.disqusID || this.props.data.ghostPost.slug,
      });
    }, 1000);
  }

  handleShowComments = () => {
    this.setState({ showComments: true });
  };

  render() {
    const { data, location } = this.props;
    const { showComments, disqusID } = this.state;
    const post = data.ghostPost;
    const posts = data.allGhostPost.edges;
    const { next, previous } = _.find(posts, p => p.node.id === post.id);
    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: disqusID, title: post.title },
    };

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
                <SubscribeForm />

                {disqusID && !showComments && (
                  <LoadCommentsButton onClick={this.handleShowComments}>
                    <CommentCount {...disqusConfig}>Load Comments</CommentCount>
                  </LoadCommentsButton>
                )}

                {showComments && <DiscussionEmbed {...disqusConfig} />}
              </section>
            </article>
          </div>
          <PostNavigation nextPost={next} prevPost={previous} />
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
      slug: PropTypes.string.isRequired,
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
    allGhostPost(sort: { order: DESC, fields: [published_at] }) {
      edges {
        node {
          ...GhostPostFields
        }
        previous {
          ...GhostPostFields
        }
        next {
          ...GhostPostFields
        }
      }
    }
  }
`;
