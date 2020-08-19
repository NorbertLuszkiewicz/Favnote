import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import linkIcon from 'assets/icons/link.svg';
import { removeItem as removeItemAction } from 'actions';

const MainWrapper = styled.article`
  display: grid;
  grid-template-rows: auto 1fr 50px;
  border-radius: 10px;
  box-shadow: 3px 5px 10px -2px ${({ theme }) => theme.grey300};
  min-height: 400px;
`;

const SectorWrapper = styled.div`
  background: ${({ theme, color, pagecolor }) => (color ? theme[pagecolor] : ' #fff')};
  padding: 0 15px;
  border-radius: 10px 10px 0 0;
  position: relative;
  transition: 0.5s;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  margin: -12px 0 10px;
`;

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

const Avatar = styled.div`
  ${({ pagecolor }) =>
    pagecolor === 'twitters' &&
    css`
      display: block;
      width: 90px;
      height: 90px;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 9;
      border-radius: 50%;
      background-image: url('https://twitter-avatar.now.sh/${({ twitterName }) => twitterName}');
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: 100%;
      border: 6px solid ${({ theme }) => theme[pagecolor]};
    `}

  ${({ pagecolor }) =>
    pagecolor === 'articles' &&
    css`
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      border-radius: 50%;
      background-image: url(${linkIcon});
      background-repeat: no-repeat;
      background-size: 60%;
      background-position: 50% 50%;
      background-color: ${({ theme }) => theme.grey100};
    `}
`;

const StyledHeading = styled(Heading)`
  ${({ pagecolor }) =>
    pagecolor === 'twitters' &&
    css`
      width: calc(100% - 100px);
    `}

  ${({ pagecolor }) =>
    pagecolor === 'articles' &&
    css`
      width: calc(100% - 60px);
    `}
`;

class Card extends Component {
  state = {
    redirect: false,
  };

  handleCardClick = () => this.setState({ redirect: true });

  render() {
    const {
      pageContext,
      id,
      title,
      created,
      twitterName,
      articleUrl,
      content,
      removeItem,
    } = this.props;
    const { redirect } = this.state;
    const linkToArticleOrTwitter =
      pageContext === 'twitters' ? `https://twitter.com/${twitterName}` : articleUrl;

    if (redirect) {
      return <Redirect to={`${pageContext}/details/${id}`} />;
    }

    return (
      <MainWrapper>
        <SectorWrapper color="is" pagecolor={pageContext} onClick={this.handleCardClick}>
          <StyledHeading pagecolor={pageContext}>{title} </StyledHeading>
          <StyledParagraph>{created}</StyledParagraph>
          <Avatar
            pagecolor={pageContext}
            twitterName={twitterName}
            onClick={() => window.open(linkToArticleOrTwitter, '_blank')}
          />
        </SectorWrapper>
        <SectorWrapper>
          <Paragraph>{content}</Paragraph>
        </SectorWrapper>
        <StyledButton secondary onClick={() => removeItem(pageContext, id)}>
          REMOVE
        </StyledButton>
      </MainWrapper>
    );
  }
}

Card.propTypes = {
  pageContext: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  twitterName: '',
  articleUrl: '',
};

const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(Card));
