import styled, { css } from 'styled-components';
import withContext from 'hoc/withContext';

const Button = styled.button`
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme, pageContext }) =>
    pageContext === undefined ? theme.notes : theme[pageContext]};
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 40px;

  ${({ secondary }) =>
    secondary &&
    css`
      font-size: ${({ theme }) => theme.fontSize.xxs};
      background-color: ${({ theme }) => theme.grey200};
      width: 110px;
      height: 30px;
      font-weight: ${({ theme }) => theme.bold};
    `}

  ${({ withBorder }) =>
    withBorder &&
    css`
      position: relative;
      z-index: 999;
      border: 2px solid #000;
    `}
`;

export default withContext(Button);
