import React from 'react';
import styled, { css } from 'styled-components';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { routes } from 'routes';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';

const AuthCardWrapper = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  border-radius: 10px;

  ${({ textCenter }) =>
    textCenter &&
    css`
      justify-content: center;
      text-align: center;
    `}
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin: 10px 0;
`;

const StyledButton = styled(Button)`
  font-weight: ${({ theme }) => theme.bold};
  margin: 15px 0;
`;

const StyledLink = styled(Link)`
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledErrorMsg = styled.div`
  margin: 5px 0;
  font-weight: ${({ theme }) => theme.bold};
  color: red;
  text-align: center;
`;

const AuthCard = ({ auth, userID, authenticate, addNewUser, userRegistered }) => {
  let isWrongData = false;
  const changeIsWrongData = () => {
    isWrongData = true;
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={({ username, password }) => {
        if (addNewUser) addNewUser(username, password);

        if (authenticate) authenticate(username, password);
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        if (userID) {
          return <Redirect to={routes.notes} />;
        }
        if (auth === 'register' && userRegistered)
          return (
            <AuthCardWrapper textCenter>
              <Heading>Registered successfully!</Heading>
              <Heading small>
                Now you can <StyledLink to={routes.login}>sing in.</StyledLink>
              </Heading>
            </AuthCardWrapper>
          );

        return (
          <AuthCardWrapper>
            <Heading>{auth === 'login' ? 'Sign in' : 'Sign up'}</Heading>
            <StyledForm>
              {isWrongData && (
                <StyledErrorMsg>
                  {auth === 'login'
                    ? 'Wrong Login or Password'
                    : 'User at this username already exists'}
                </StyledErrorMsg>
              )}
              <StyledInput
                required
                type="text"
                name="username"
                placeholder="Login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledInput
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledButton type="submit" onClick={() => changeIsWrongData()}>
                {auth === 'login' ? 'ENTER FAVNOTE' : 'REGISTER'}
              </StyledButton>
            </StyledForm>
            {auth === 'login' ? (
              <StyledLink to={routes.register}>I want my account!</StyledLink>
            ) : (
              <StyledLink to={routes.login}> I want to log in</StyledLink>
            )}
          </AuthCardWrapper>
        );
      }}
    </Formik>
  );
};

AuthCard.propTypes = {
  auth: PropTypes.oneOf(['login', 'register']).isRequired,
  userID: PropTypes.string,
  userRegistered: PropTypes.bool,
  authenticate: PropTypes.func,
  addNewUser: PropTypes.func,
};

AuthCard.defaultProps = {
  addNewUser: () => {},
  userID: null,
  authenticate: null,
  userRegistered: false,
};

export default AuthCard;
