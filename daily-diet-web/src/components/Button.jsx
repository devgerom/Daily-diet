import styled from 'styled-components';

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.$primary ? '#2ecc71' : '#ecf0f1')};
  color: ${(props) => (props.$primary ? '#fff' : '#333')};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;