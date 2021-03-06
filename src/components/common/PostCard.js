import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Tags } from '@tryghost/helpers-gatsby';
import moment from 'moment';
import { CommentCount } from 'disqus-react';

import getDisqusId from '../../utils/getDisqusId';

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const posted = moment(post.published_at, `YYYYMMDD`).fromNow();
  const disqusID = getDisqusId(post);
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: disqusID, title: post.title },
  };

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
            {disqusID && (
              <>
                {` `}|{` `}
                <span className="post-card-comment-count">
                  <CommentCount {...disqusConfig} />
                </span>
              </>
            )}
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
      }),
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
