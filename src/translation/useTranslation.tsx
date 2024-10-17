import { atom, useAtomValue, useSetAtom } from 'jotai'
import { languages } from './languages'

const localeGlobal = atom({
  locale: 'vi',
})

export const useTranslation = () => {
  const state = useAtomValue(localeGlobal)
  const setLocal = useSetAtom(localeGlobal)

  const t = (key: string) => {
    const findLanguage = languages[state.locale as keyof typeof languages]
    if (!!findLanguage) {
      const translated = findLanguage[key as keyof typeof findLanguage]
      if (!!translated) return translated
      return key
    }
    return key
  }

  const { locale } = state
  return {
    setLocal,
    t,
    locale,
  }
}
