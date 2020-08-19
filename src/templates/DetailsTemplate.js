import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';

const DetailsWrapper = styled.div`
  margin: 100px auto 0;
  width: 90%;
  @media (min-width: 800px) {
    padding-left: 150px;
    max-width: 800px;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0;
  width: 100%;

  ${({ isTwitter }) =>
    isTwitter &&
    css`
      display: grid;
      grid-template-columns: 1fr 100px;
      grid-template-rows: 1fr;
    `}
`;

const StyledHeading = styled(Heading)`
  ::first-letter {
    text-transform: uppercase;
  }
  margin-bottom: 5px;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

const StyledButton = styled(Button)`
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: ${({ theme, pagecolor }) => theme[pagecolor]};
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
`;

const DetailsTemplate = ({ pageContext, title, created, content, articleUrl, twitterName }) => (
  <>
    <Sidebar />
    <DetailsWrapper>
      <StyledPageHeader isTwitter={pageContext === 'twitters' && true}>
        <div>
          <StyledHeading as="h1">{title}</StyledHeading>
          <StyledParagraph>{created}</StyledParagraph>
        </div>
        {pageContext === 'twitters' && (
          <StyledImage alt={title} src={`https://twitter-avatar.now.sh/${twitterName}`} />
        )}
      </StyledPageHeader>
      <Paragraph>{content}</Paragraph>
      {pageContext === 'articles' && <StyledLink href={articleUrl}>Open article</StyledLink>}

      <StyledButton as={Link} to={`/${pageContext}`} pagecolor={pageContext}>
        save / close
      </StyledButton>
    </DetailsWrapper>
  </>
);

DetailsTemplate.propTypes = {
  pageContext: PropTypes.string.isRequired,
  title: PropTypes.string,
  created: PropTypes.string,
  content: PropTypes.string,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default withContext(DetailsTemplate);
