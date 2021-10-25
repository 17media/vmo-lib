import React from 'react';
import styled from 'styled-components';
import useScrollToLoadingContainer from '../lib/hooks/useScrollToLoadingContainer';

const StyledSpace = styled.div`
  padding-top: 800px;
  background-color: #8585de;
`;

const ScrollToLoading = () => {
  useScrollToLoadingContainer(true);

  return (
    <div>
      <StyledSpace>
        <div id="loading-container">
          <h3>移動到這裡</h3>
        </div>
      </StyledSpace>
    </div>
  );
};

export default React.memo(ScrollToLoading);
