import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  getUserLangs,
  getCurrentTranslateLang,
  RegionLanguage,
} from '../lib/utils';

const DisplayResult = styled.span`
  &:before {
    content: 'return value:';
    display: block;
  }
  display: inline-block;
  background-color: #cccccc;
  padding: 5px 10px;
`;

const Checkbox = styled.input`
  margin-right: 20px;
  padding: 5px 10px 5px 0;
`;

const Utils = () => {
  const [supportLangs, setSupportLangs] = useState<RegionLanguage[]>([
    RegionLanguage.JAPAN,
  ]);

  const onChangeHandler = e => {
    const { value: selectedLang, checked: isChecked } = e.target;
    if (isChecked) {
      setSupportLangs(preValue => [selectedLang, ...preValue]);
    } else {
      if (supportLangs.length <= 1) {
        alert('should be keep at least one support language');
        return;
      }
      setSupportLangs(preValue => preValue.filter(v => v !== selectedLang));
    }
  };

  const allSupportLanguages = [
    RegionLanguage.TAIWAN,
    RegionLanguage.CHINA,
    RegionLanguage.HONGKONG,
    RegionLanguage.JAPAN,
    RegionLanguage.EUROPE,
    RegionLanguage.ARAB,
  ];

  const currentTransLateLang = getCurrentTranslateLang(supportLangs);

  return (
    <div>
      <h1>Utils</h1>
      <h2>i18n</h2>
      <h3>getUserLangs</h3>
      <p>Get browser languages or manually queryString. e.g. ?lang=ja</p>
      <br />
      <DisplayResult>{JSON.stringify(getUserLangs())}</DisplayResult>
      <h3>getCurrentTranslateLang</h3>
      <p>這個方法可以拿到前端要顯示的語系</p>
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
      <DisplayResult>{currentTransLateLang}</DisplayResult>
    </div>
  );
};

export default React.memo(Utils);
