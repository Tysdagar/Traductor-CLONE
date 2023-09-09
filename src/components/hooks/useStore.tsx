import { useReducer } from "react";
import {
  type translateState,
  type translateActions,
  type FromLanguage,
  type ToLanguage,
} from "../types.d";

const initialState: translateState = {
  fromLanguage: "auto",
  toLanguage: "en",
  textToTranslate: "",
  resultTranslate: "",
  loading: false,
};

function translateReducer(
  state: translateState,
  action: translateActions
): translateState {
  const { type } = action;

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.textToTranslate !== "";
    return {
      ...state,
      loading,
      resultTranslate: "",
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.textToTranslate !== "";
    return {
      ...state,
      toLanguage: action.payload,
      loading,
      resultTranslate: "",
    };
  }

  if (type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLanguage === "auto") return state;
    const loading = state.textToTranslate !== "";

    return {
      ...state,
      loading,
      resultTranslate: "",
      toLanguage: state.fromLanguage,
      fromLanguage: state.toLanguage,
    };
  }

  if (type === "SET_TEXT_TO_TRANSLATE") {
    const loading = action.payload !== "";
    return {
      ...state,
      textToTranslate: action.payload,
      loading,
      resultTranslate: "",
    };
  }

  if (type === "SET_RESULT_TRANSLATE") {
    return {
      ...state,
      resultTranslate: action.payload,
      loading: false,
    };
  }

  return state;
}

export function useStore() {
  const [
    { fromLanguage, toLanguage, textToTranslate, resultTranslate, loading },
    dispatch,
  ] = useReducer(translateReducer, initialState);

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: ToLanguage) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const interChangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setTextToTranslate = (payload: string) => {
    dispatch({ type: "SET_TEXT_TO_TRANSLATE", payload });
  };

  const setResultTranslate = (payload: string) => {
    dispatch({ type: "SET_RESULT_TRANSLATE", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    textToTranslate,
    resultTranslate,
    loading,
    setFromLanguage,
    setToLanguage,
    interChangeLanguages,
    setTextToTranslate,
    setResultTranslate,
  };
}
