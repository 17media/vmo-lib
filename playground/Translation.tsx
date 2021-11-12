import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTranslation from '../lib/hooks/useTranslation';
import { RegionLanguage } from '../lib/utils';

const StyledInput = styled.input`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
  width: 500px;
`;

const Checkbox = styled.input`
  margin-right: 20px;
  padding: 5px 10px 5px 0;
`;

const Translation = () => {
  const [eventoryType, setEventoryType] = useState<string>(
    '12822-golden-feather-5',
  );
  const [useTranslationProps, setUseTranslationProps] = useState<{
    eventType: string;
    supportLangs: RegionLanguage[];
  }>({
    eventType: '',
    supportLangs: [],
  });

  const [supportLangs, setSupportLangs] = useState<RegionLanguage[]>([
    RegionLanguage.JAPAN,
  ]);

  const allSupportLanguages = [
    RegionLanguage.TAIWAN,
    RegionLanguage.CHINA,
    RegionLanguage.HONGKONG,
    RegionLanguage.JAPAN,
    RegionLanguage.EUROPE,
    RegionLanguage.ARAB,
  ];

  const [selectedTranslationKey, setSelectedTranslationKey] =
    useState<string>();
  const [targetTranslation, setTargetTranslation] = useState<string>();

  const translations = useTranslation(
    useTranslationProps.eventType,
    useTranslationProps.supportLangs,
  );

  const eventoryTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEventoryType(e.target.value);

  const translationSelectHandler = e => {
    const translationKey = e.target.value;
    setSelectedTranslationKey(translationKey);
    setTargetTranslation(translations.get(translationKey));
  };

  const onChangeHandler = e => {
    const { value: selectedLang, checked: isChecked } = e.target;
    if (isChecked) {
      setSupportLangs(preValue => [selectedLang, ...preValue]);
    } else {
      if (supportLangs.length <= 1) {
        // eslint-disable-next-line no-alert
        alert('should be keep at least one support language');
        return;
      }
      setSupportLangs(preValue => preValue.filter(v => v !== selectedLang));
    }
  };

  const submitHandler = () => {
    const eventType = eventoryType;
    setUseTranslationProps({
      eventType,
      supportLangs,
    });
    setTargetTranslation('');
    setSelectedTranslationKey('chooseTranslate');
  };

  return (
    <div>
      <span>請輸入eventType：</span>
      <StyledInput
        type="text"
        value={eventoryType}
        placeholder="請輸入 Eventory Container ID"
        onChange={eventoryTypeHandler}
      />
      <br />
      <span>eventory 支援語系: </span>
      {allSupportLanguages.map(langCode => (
        <>
          <span>{langCode}</span>
          <Checkbox
            type="checkbox"
            value={langCode}
            onChange={onChangeHandler}
            checked={supportLangs.includes(langCode)}
          />
        </>
      ))}
      <br />
      <button type="button" onClick={submitHandler}>
        送出
      </button>
      <br />
      <br />
      <span>請選擇要翻譯的key: </span>
      <select
        name="translation"
        id="translation"
        value={selectedTranslationKey}
        onChange={translationSelectHandler}
      >
        <option value="chooseTranslate">請選擇</option>
        {[...translations].map(translation => (
          <option key={translation[0]} value={translation[0]}>
            {translation[0]}
          </option>
        ))}
      </select>
      <br />
      <span>翻譯: </span>
      <span>{targetTranslation}</span>
    </div>
  );
};

export default React.memo(Translation);
