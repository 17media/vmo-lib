import React, { useState } from 'react';
import ScratchOffCard from '../lib/components/ScratchOffCard';

const ScratchOff = () => {
  const defaultConfig = {
    coverImgSrc:
      'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg',
    width: 737,
    height: 480,
    revealPercentage: 50,
  };
  const {
    coverImgSrc: defaultCoverImgSrc,
    width: defaultWidth,
    height: defaultHeight,
    revealPercentage: defaultRevealPercentage,
  } = defaultConfig;

  const [key, setKey] = useState<number>(0);
  const [inputCoverImgSrc, setInputCoverImgSrc] =
    useState<string>(defaultCoverImgSrc);
  const [inputWidth, setInputWdith] = useState<number>(defaultWidth);
  const [inputHeight, setInputHeight] = useState<number>(defaultHeight);
  const [inputRevealPercentage, setInputRevealPercentage] = useState<number>(
    defaultRevealPercentage,
  );
  const [coverImgSrc, setCoverImgSrc] = useState<string>(defaultCoverImgSrc);
  const [width, setWdith] = useState<number>(defaultWidth);
  const [height, setHeight] = useState<number>(defaultHeight);
  const [revealPercentage, setRevealPercentage] = useState<number>(
    defaultRevealPercentage,
  );

  const handleReveal = () => {
    console.log('handle function after reveal.');
  };

  const handleResetDefault = () => {
    setInputCoverImgSrc(defaultCoverImgSrc);
    setInputWdith(defaultWidth);
    setInputHeight(defaultHeight);
    setInputRevealPercentage(defaultRevealPercentage);
  };

  const handleGenerate = () => {
    setCoverImgSrc(inputCoverImgSrc);
    setWdith(inputWidth);
    setHeight(inputHeight);
    setRevealPercentage(inputRevealPercentage);
    generateNewKey();
  };

  const generateNewKey = () => {
    const newRandomKey = generateRandomKey();
    if (key === newRandomKey) {
      generateNewKey();
      return;
    }

    setKey(newRandomKey);
  };
  const generateRandomKey = () => Math.floor(Math.random() * 100);

  const getDisabledState = () =>
    !inputCoverImgSrc || !inputWidth || !inputHeight || !inputRevealPercentage;

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
      <div>
        image url:{' '}
        <input
          type="text"
          value={inputCoverImgSrc}
          size={50}
          onChange={e => setInputCoverImgSrc(e.target.value)}
        />{' '}
        width:{' '}
        <input
          type="text"
          value={inputWidth}
          onChange={e => setInputWdith(+e.target.value)}
        />{' '}
        height:{' '}
        <input
          type="text"
          value={inputHeight}
          onChange={e => setInputHeight(+e.target.value)}
        />
      </div>
      <p>
        reveal percentage:{' '}
        <input
          type="number"
          min={1}
          value={inputRevealPercentage}
          onChange={e => setInputRevealPercentage(+e.target.value)}
        />{' '}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={getDisabledState()}
        >
          generate
        </button>{' '}
      </p>
      <p>
        <button type="button" onClick={handleResetDefault}>
          reset default setting
        </button>
      </p>
      {revealPercentage ? (
        <ScratchOffCard
          key={key}
          width={width}
          height={height}
          coverImgSrc={coverImgSrc}
          handleReveal={handleReveal}
          revealPercentage={revealPercentage}
        >
          <div>
            <h2>Congratulations!</h2>
            <h1>
              <code>Coupon code : 1651613335</code>
            </h1>
            <div>
              <button type="button" onClick={handleGenerate}>
                replay again
              </button>
              <p>
                same as generate behavior outside(using changing key to replay.)
              </p>
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
