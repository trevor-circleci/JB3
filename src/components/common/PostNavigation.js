/**
 * Post Navigation component
 *
 * Receives an ordered list of all posts and current posts
 * Show prev/next buttons to make navigating between components easy
 *
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Outer = styled.div`
  box-shadow: 0 -0.5px 0 var(--color-border);
  padding-top: 35px;
  margin-top: 35px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -1em;
  padding-left: 1em;
  padding-right: 1em;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const SubTitle = styled.div`
  color: #a4b0be;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Navigation = ({ data, nextPost, prevPost }) => (
  <Outer>
    <div className="container">
      <Container>
        <Left>
          {prevPost && (
            <Link to={`/${prevPost.slug}/`} className="post-navigation-links">
              <Img
                fixed={data.leftImage.childImageSharp.fixed}
                alt="Previous Article"
                className="left-icon"
              />
              <div>
                <SubTitle>Previous</SubTitle>
                <Title>{prevPost.title}</Title>
              </div>
            </Link>
          )}
        </Left>
        <Right>
          {nextPost && (
            <Link to={`/${nextPost.slug}/`} className="post-navigation-links">
              <div>
                <SubTitle>Next</SubTitle>
                <Title>{nextPost.title}</Title>
              </div>
              <Img
                fixed={data.leftImage.childImageSharp.fixed}
                alt="Next Article"
                className="right-icon"
              />
            </Link>
          )}
        </Right>
      </Container>
    </div>
  </Outer>
);

Navigation.propTypes = {
  nextPost: PropTypes.object,
  prevPost: PropTypes.object,
  data: PropTypes.object.isRequired,
};

const PostNavigationQuery = props => (
  <StaticQuery
    query={graphql`
      query PostNavigation {
        leftImage: file(relativePath: { eq: "icon-left.png" }) {
          childImageSharp {
            fixed(width: 10) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Navigation data={data} {...props} />}
  />
);

export default PostNavigationQuery;
