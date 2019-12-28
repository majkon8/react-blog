import React from "react";
import styled from "styled-components";
import Author from "../Author/Author";

const Authors = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
  color: rgb(51, 51, 51);
  font-weight: 800;
  margin-top: 30px;

  @media (max-width: 850px) {
    font-size: 30px;
  }
`;

const Contact = () => {
  return (
    <>
      <Title>Our content creators:</Title>
      <Authors>
        <Author
          image="https://previews.123rf.com/images/alphaspirit/alphaspirit1504/alphaspirit150400118/38665682-simple-young-man-face-smiling-and-optimistic.jpg"
          nickname="majkon8"
          email="majkon@mail.com"
          about="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante vitae ipsum tempus volutpat eget ut odio. Ut ultrices, nulla at cursus pharetra."
        />
        <Author
          image="https://thumbs.dreamstime.com/z/closeup-beautiful-face-woman-clean-skin-young-fresh-isolated-white-45129409.jpg"
          nickname="lady"
          email="lady@mail.com"
          about="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante vitae ipsum tempus volutpat eget ut odio. Ut ultrices, nulla at cursus pharetra."
        />
        <Author
          image="https://previews.123rf.com/images/tommasolizzul/tommasolizzul1610/tommasolizzul161000118/64989603-portrait-of-a-young-beautiful-man-smiling-face-expression.jpg"
          nickname="guru"
          email="guru@mail.com"
          about="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante vitae ipsum tempus volutpat eget ut odio. Ut ultrices, nulla at cursus pharetra."
        />
      </Authors>
    </>
  );
};

export default Contact;
