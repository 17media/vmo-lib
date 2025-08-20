import React from 'react';
import styled from 'styled-components';

interface IOpenIDProps {
  value: string;
  className?: string;
}

const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OpenID: React.FC<IOpenIDProps> = ({ value, className }) => (
  <Value className={className}>{value}</Value>
);

export default OpenID;
