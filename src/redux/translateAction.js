import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants";

// Bütün dilleri Alır
export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    // API isteği atma
    const res = await axios.request(options);
    // payload'ı return etme
    return res.data.data.languages;
  }
);

// çevirme
export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ sourceLang, targetLang, text }) => {
    // API isteği
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLang.value);
    encodedParams.set("target_language", targetLang.value);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "edaff5a258mshca423e8baca570ap14727cjsn8e82ea9fad31",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };
    // yukardaki ayarlara göre api isteği atar
    const res = await axios.request(options);

    // cevabı slice'a aktar
    return res.data.data.translatedText;
  }
);
