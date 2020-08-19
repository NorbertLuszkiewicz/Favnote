import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthTemplate from 'templates/AuthTemplate';
import AuthCard from 'components/molecules/AuthCard/AuthCard';
import { authenticate as authenticateAction } from 'actions';
import { initialState } from 'reducers';

const LoginPage = ({ userID, authenticate }) => {
  initialState.userID = userID;
  return (
    <AuthTemplate>
      <AuthCard userID={userID} authenticate={authenticate} auth="login" />
    </AuthTemplate>
  );
};

const mapStateToProps = ({ userID = null }) => ({
  userID,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

LoginPage.propTypes = {
  userID: PropTypes.string,
  authenticate: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  userID: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
