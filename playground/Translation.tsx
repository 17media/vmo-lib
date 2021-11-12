import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTranslation from '../lib/hooks/useTranslation';
import { RegionLanguage } from '../lib/utils';

const StyledInput = styled.input`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
  width: 500px;
`;

const StyledCheckbox = styled.input`
  margin-right: 20px;
  padding: 5px 10px 5px 0;
`;

const Translation = () => {
  const [eventType, setEventoryType] = useState<string>(
    '12822-golden-feather-5',
  );

  const allSupportLanguages = [
    RegionLanguage.TAIWAN,
    RegionLanguage.CHINA,
    RegionLanguage.HONGKONG,
    RegionLanguage.JAPAN,
    RegionLanguage.EUROPE,
    RegionLanguage.ARAB,
  ];
  const [supportLangs, setSupportLangs] = useState<RegionLanguage[]>([
    RegionLanguage.JAPAN,
  ]);

  const [useTranslationProps, setUseTranslationProps] = useState<{
    eventType: string;
    supportLangs: RegionLanguage[];
  }>({
    eventType: '',
    supportLangs: [],
  });
  const translations = useTranslation(
    useTranslationProps.eventType,
    useTranslationProps.supportLangs,
  );

  const [selectedTranslationKey, setSelectedTranslationKey] =
    useState<string>();

  const [targetTranslation, setTargetTranslation] = useState<string>();

  const eventTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
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
    setUseTranslationProps({
      eventType,
      supportLangs,
    });
    setTargetTranslation('');
    setSelectedTranslationKey('chooseTranslate');
  };

  return (
    <div>
      <span>支援語系: </span>
      {allSupportLanguages.map(langCode => (
        <>
          <span>{langCode}</span>
          <StyledCheckbox
            type="checkbox"
            value={langCode}
            onChange={onChangeHandler}
            checked={supportLangs.includes(langCode)}
          />
        </>
      ))}
      <br />
      <span>eventType：</span>
      <StyledInput
        type="text"
        value={eventType}
        placeholder="請輸入 eventType"
        onChange={eventTypeHandler}
      />
      <br />
      <button type="button" onClick={submitHandler}>
        送出
      </button>
      <br />
      <span>
        注意：
        <br />
        1.
        此功能必須在取得eventType的翻譯前先設定好支援語系，取得翻譯後，再去設定支援語系重新送出將不會重新翻譯，除非再次取得其他eventType的翻譯
        <br />
        2.
        如果URL帶有翻譯參數，則會以URL參數為主，例如URL有帶&lang=zh_TW，即便是支援語系只設定支援ja，還是會以zh_TW做翻譯
        <br />
        3. 如果設定多個支援語系，則會以瀏覽器設定的最優先的偏好語言作翻譯
        <br />
        4.
        如果設定的支援語系不再瀏覽器設定的偏好語言，則會以中文作為翻譯。例如僅設定支援日文(ja)，但回傳翻譯有中文，且瀏覽器裡沒有把日文設定成偏好語言，則會以中文作為翻譯
      </span>
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
