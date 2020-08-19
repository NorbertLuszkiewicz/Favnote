import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Textarea from 'components/atoms/Textarea/Textarea';
import { addItem as addItemAction } from 'actions';

const NewItemBarWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: white;
  height: 100vh;
  width: 100%;
  margin: auto;
  padding: 70px 10% 0;
  border-left: 5px solid ${({ theme, pagecolor }) => theme[pagecolor]};
  transform: translateX(100%);
  transition: transform 0.4s;

  @media (min-width: 800px) {
    width: 500px;
    padding: 70px 50px;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      transform: translateX(0%);
    `}
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 25px;
`;

const StyledTextarea = styled(Textarea)`
  height: 100px;
  width: 100%;
`;

const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) => {
  const isNote = pageContext === 'notes';
  const isTwitter = pageContext === 'twitters';
  const isArticle = pageContext === 'articles';
  const pageContextSingular = pageContext && pageContext.substr(0, pageContext.length - 1);

  return (
    <NewItemBarWrapper isVisible={isVisible} pagecolor={pageContext}>
      <Heading>Add a new {pageContextSingular}</Heading>
      <Formik
        initialValues={{ title: '', content: '', articleUrl: '', twitterName: '', created: '' }}
        onSubmit={(values, { resetForm }) => {
          addItem(pageContext, values);
          handleClose();
          resetForm({ values: '' });
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Paragraph>
              {isNote && 'A note requires title and description'}
              {isTwitter && 'A twitter requires account name and description'}
              {isArticle && 'An article requires title, description and a link'}
            </Paragraph>
            <StyledInput
              required
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title || ''}
            />
            {isTwitter && (
              <StyledInput
                required
                placeholder="Twitter Name"
                type="text"
                name="twitterName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.twitterName || ''}
              />
            )}
            {isArticle && (
              <StyledInput
                required
                placeholder="link"
                type="text"
                name="articleUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.articleUrl || ''}
              />
            )}
            <StyledTextarea
              required
              placeholder="description"
              as="textarea"
              name="content"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content || ''}
            />
            <Button type="submit">Add Note</Button>
          </Form>
        )}
      </Formik>
    </NewItemBarWrapper>
  );
};

NewItemBar.propTypes = {
  pageContext: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

NewItemBar.defaultProps = {
  isVisible: false,
};

const mapDispatchToProps = disptach => ({
  addItem: (itemType, itemContent) => disptach(addItemAction(itemType, itemContent)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(NewItemBar));
