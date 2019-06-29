import React from "react";
import styled from "@emotion/styled";
import addToMailchimp from "gatsby-plugin-mailchimp";

import * as colors from "../../styles/colors";

const Title = styled.div`
  font-size: 2.4rem;
`;

const Heading = styled.p`
  font-size: 1.5rem;
  line-height: 1.5em;
  color: ${colors.secondary};
  margin-bottom: 10px;
`;

const Input = styled.input`
  text-align: center;
  background-color: #f3f8fb;
  padding: 15px 20px;
  font-size: 1.5rem;
  width: 100%;

  ::placeholder {
    color: ${colors.secondary};
    font-size: 1.3rem;
  }

  @media screen and (min-width: 576px) {
    width: 70%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px ${colors.border};
  padding: 2rem;
  text-align: center;
`;

const Error = styled.div`
  color: ${colors.red};
  font-size: 0.7em;
  margin-top: 10px;
`;

const translateMsg = msg => {
  if (msg.includes(`is already subscribed to list`)) {
    return `This email address is already subscribed to this list.`;
  }

  return msg;
};

class SubscribeForm extends React.Component {
  state = {
    email: null,
    result: null,
    msg: null,
  };

  handleSubmit = e => {
    e.preventDefault();

    addToMailchimp(this.state.email).then(({ result, msg }) => {
      this.setState({
        result,
        msg,
      });
    });
  };

  render = () => {
    let render = null;

    if (this.state.result === `success`) {
      render = (
        <>
          <Title>Awesome!</Title>
          <Heading>
            Thanks for subscribing. Stay tuned for my next article :)
          </Heading>
        </>
      );
    } else {
      render = (
        <>
          <Title>Subscribe</Title>
          <Heading>Be the first to know when I publish new content</Heading>
          <Input
            placeholder="Enter Email Address"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          {this.state.msg && <Error>{translateMsg(this.state.msg)}</Error>}
        </>
      );
    }

    return <Form onSubmit={this.handleSubmit}>{render}</Form>;
  };
}

export default SubscribeForm;
