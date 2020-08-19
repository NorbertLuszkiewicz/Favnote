import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthTemplate from 'templates/AuthTemplate';
import AuthCard from 'components/molecules/AuthCard/AuthCard';
import { addNewUser as addNewUserAction } from 'actions';

const RegisterPage = ({ userRegistered, addNewUser }) => {
  return (
    <AuthTemplate>
      <AuthCard userRegistered={userRegistered} addNewUser={addNewUser} auth="register" />
    </AuthTemplate>
  );
};

const mapStateToProps = state => ({
  userRegistered: state.userRegistered,
});

const mapDispatchToProps = dispatch => ({
  addNewUser: (username, password) => dispatch(addNewUserAction(username, password)),
});

RegisterPage.propTypes = {
  userRegistered: PropTypes.bool,
  addNewUser: PropTypes.func.isRequired,
};

RegisterPage.defaultProps = {
  userRegistered: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage);
