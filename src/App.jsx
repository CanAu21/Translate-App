import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/translateAction";
import Select from "react-select";
import { setTranslated } from "./redux/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translate);
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // UseMemo kullanılarak selectler her seçildiğinde render etmez, state yormaz
  const refinedData = useMemo(
    () =>
      // Select kısmında value ve label değerini optionslar içinde bulundan name ve code aktarma
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  // Dilleri değişme
  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);
    // alt inputtaki veriyi üsttekine aktar
    setText(state.translatedText);
    // üst inputtaki veriyi alttakine aktar
    dispatch(setTranslated(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri +</h1>
        {/* Upside */}
        <div className="upper">
          <Select
            className="select"
            onChange={setSourceLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={sourceLang}
          />
          <button onClick={handleSwap}>Değiş</button>
          <Select
            className="select"
            onChange={setTargetLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={targetLang}
          />
        </div>
        {/* Mid Side */}
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            {state.isTranslateLoading && (
              <ul className="wave-menu">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            )}
            <textarea value={state.translatedText} disabled />
          </div>
        </div>
        {/* Down Side */}
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
