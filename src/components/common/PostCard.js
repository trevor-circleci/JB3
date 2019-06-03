import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import moment from "moment";

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const posted = moment(post.published_at, `YYYYMMDD`).fromNow();

  console.log(posted);
  return (
    <Link to={url} className="post-card">
      <header className="post-card-header">
        <h2 className="post-card-title">{post.title}</h2>
        {post.tags && (
          <div className="post-card-tags">
            Posted {posted} in {` `}
            <Tags
              post={post}
              visibility="public"
              autolink={false}
              classes="post-card-tags-link"
            />
          </div>
        )}
      </header>
      <section className="post-card-excerpt">{post.excerpt}</section>
      <footer className="post-card-footer">
        <div className="post-card-footer-left" />
        <div className="post-card-footer-right" />
      </footer>
    </Link>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
