import React from 'react';
import styled from 'styled-components';
import useScore from '../../hooks/useScore';

interface IScoreProps {
  format: string;
  value: string;
  useAnimation?: boolean;
  duration?: number;
  className?: string;
}

function formatString(text: string, ...args: any[]) {
  return text.replace(/{(\d+)}/g, (_, val: string) => args[parseInt(val, 10)]);
}

const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Score: React.FC<IScoreProps> = ({
  format,
  value,
  useAnimation,
  duration,
  className,
}) => {
  const displayValue = useScore({
    givenScore: parseFloat(value),
    duration,
    useAnimation,
  });

  const formattedString = formatString(format, displayValue);

  return <Value className={className}>{formattedString}</Value>;
};

export default Score;
