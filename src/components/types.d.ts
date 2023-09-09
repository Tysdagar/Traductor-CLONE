import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from "./constants";

export type FromLanguage =
  | keyof typeof SUPPORTED_LANGUAGES
  | typeof AUTO_LANGUAGE;

export type ToLanguage = keyof typeof SUPPORTED_LANGUAGES;

export interface translateState {
  fromLanguage: FromLanguage;
  toLanguage: ToLanguage;
  textToTranslate: string;
  resultTranslate: string;
  loading: boolean;
}

export type translateActions =
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: ToLanguage }
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_TEXT_TO_TRANSLATE"; payload: string }
  | { type: "SET_RESULT_TRANSLATE"; payload: string };


export enum SectionType{
    From = "from",
    To = "to"
}