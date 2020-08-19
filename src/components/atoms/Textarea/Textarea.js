import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 300px;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.grey100};
  padding: 10px 15px;
  resize: none;
  ::placeholder {
    text-transform: uppercase;
  }
`;

export default Textarea;
