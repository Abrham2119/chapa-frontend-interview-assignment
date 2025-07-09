
"use client";


import { useEffect, useState } from "react";

import { handleTranslate, LanguageTranslations } from "../application/handleTranslate";
import useStore from "../../state/useStore";

export const useTranslatedText   = () => {
  const { currentLang } = useStore();
    const [translations, setTranslations] = useState<LanguageTranslations | null>(
    null
  );

  useEffect(() => {
    const translatedText = handleTranslate(currentLang);
    setTranslations(translatedText);
  }, [currentLang]);


  return translations;
};
