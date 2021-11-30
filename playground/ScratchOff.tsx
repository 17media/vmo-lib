import React, { useState } from 'react';
import ScratchOffCard from '../lib/components/ScratchOffCard';

const ScratchOff = () => {
  const [percentage, setPercentage] = useState<number>(50);
  const [showResultPercentage, setShowResultPercentage] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const coverImgSrc =
    'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg';

  const handleReveal = () => {
    console.log('handle function after reveal.');
  };

  const rePlay = () => {
    const randomKey = Math.floor(Math.random() * 100);
    setKey(randomKey);
  };

  return (
    <div>
      <h4>ScratchOff Card</h4>
      <p>
        Given the scratch card container&apos;s width and height and the cover
        img url(relative or absolute url), the scratch off card will fit the
        container automatically. Also, custom the result section you want(HTML
        dom or just image..etc.).
      </p>
      <p>Setting the fill percentage to reveal(default 50).</p>
      <input
        type="number"
        value={percentage}
        onChange={e => setPercentage(+e.target.value)}
      />
      <button type="button" onClick={() => setShowResultPercentage(percentage)}>
        regenerate
      </button>

      {showResultPercentage ? (
        <ScratchOffCard
          key={key}
          width={737}
          height={480}
          coverImgSrc={coverImgSrc}
          handleReveal={handleReveal}
          showResultPercentage={showResultPercentage}
        >
          <div>
            <h2>Congratulations!</h2>
            <h1>
              <code>Coupon code : 1651613335</code>
            </h1>
            <div>
              <button type="button" onClick={rePlay}>
                replay again
              </button>
              <p>using chaning key outside to replay.</p>
            </div>
          </div>
        </ScratchOffCard>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(ScratchOff);
