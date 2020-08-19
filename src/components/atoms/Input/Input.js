import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 40px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.grey100};
  padding-left: 15px;
  ::placeholder {
    text-transform: uppercase;
  }

  ${({ search }) =>
    search &&
    css`
      font-size: ${({ theme }) => theme.fontSize.xxs};
      width: 200px;
      height: 30px;
      background-image: url(${magnifierIcon});
      background-repeat: no-repeat;
      background-position: 8px 7px;
      padding-left: 30px;
    `};
`;

export default Input;
