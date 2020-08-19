import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Input from 'components/atoms/Input/Input';

const PageInformationWrapper = styled.div`
  width: 90%;
  margin: 90px auto 30px auto;
  display: block;
  @media (min-width: 800px) {
    padding-left: 150px;
    margin: 30px auto;
  }
`;

const StyledHeding = styled(Heading)`
  margin: 25px 0 -30px;
  padding: 0;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.grey300};
`;

const PageInformation = ({ pageContext, numberOfItems }) => {
  return (
    <PageInformationWrapper>
      <Input search placeholder="search" />
      <StyledHeding big>{pageContext}</StyledHeding>
      <StyledParagraph>
        {numberOfItems} {pageContext}
      </StyledParagraph>
    </PageInformationWrapper>
  );
};

PageInformation.propTypes = {
  pageContext: PropTypes.string.isRequired,
  numberOfItems: PropTypes.number.isRequired,
};

export default withContext(PageInformation);
