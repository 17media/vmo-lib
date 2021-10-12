import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  getUserLangs,
  getCurrentTranslateLang,
  RegionLanguage,
  getStringDateByLocalFormat,
  getStringDateCountdownByLocalFormat,
  convertDateToTime,
  isSameDate,
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

const InputText = styled.input`
  margin-right: 20px;
  padding: 5px 10px 5px 0;
  width: 180px;
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

  // getStringDateByLocalFormat
  const [dateString, setDateString] = useState('2021-09-25T18:00:00+08:00');
  const [format, setFormat] = useState('MM/DD(WN)hh:mm:ss');

  const dateStringHandler = e => setDateString(e.target.value);

  const formatHandler = e => setFormat(e.target.value);

  const resultGetStringDateByLocalFormat = getStringDateByLocalFormat(
    dateString,
    format,
    currentTransLateLang,
  );

  // getStringDateCountdownByLocalFormat
  const [formatText, setFormatText] = useState('剩餘 D 天 hh:mm:ss');
  const mockTime = { d: 1, h: 0, m: 10, s: 0, ms: 0 };

  const formatTextHandler = e => setFormatText(e.target.value);

  const resultGetStringDateCountdownByLocalFormat =
    getStringDateCountdownByLocalFormat(mockTime, formatText);

  // convertDateToTime
  const resultConvertDateToTime = convertDateToTime(dateString);

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
      <h3>getStringDateByLocalFormat</h3>
      <p>
        Get datetime text which shown on countdown date range, its language
        depends on RegionLanguage
      </p>
      dateString: &nbsp;
      <InputText type="text" onChange={dateStringHandler} value={dateString} />
      <br />
      format: &nbsp;
      <InputText type="text" onChange={formatHandler} value={format} />
      <br />
      <DisplayResult>{resultGetStringDateByLocalFormat}</DisplayResult>
      <h3>getStringDateCountdownByLocalFormat</h3>
      <p>Get datetime text which shown on countdown remaining time</p>
      formatText: &nbsp;
      <InputText type="text" onChange={formatTextHandler} value={formatText} />
      <br />
      <DisplayResult>{resultGetStringDateCountdownByLocalFormat}</DisplayResult>
      <h3>convertDateToTime</h3>
      <p>
        Get time text which shown on countdown remaining time. * if remaining
        time is less than one day.
      </p>
      dateString: &nbsp;
      <InputText type="text" onChange={dateStringHandler} value={dateString} />
      <br />
      <DisplayResult>{resultConvertDateToTime}</DisplayResult>
    </div>
  );
};

export default React.memo(Utils);
