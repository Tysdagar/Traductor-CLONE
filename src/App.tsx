import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useStore } from "./components/hooks/useStore";
import SelectLanguage from "./components/SelectLanguage";
import TextArea from "./components/TextArea";
import { FromLanguage, SectionType } from "./components/types.d";
import { AUTO_LANGUAGE } from "./components/constants";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TranslateIcon from "@mui/icons-material/Translate";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { translate } from "./components/services/translate";
import { setAutoLanguage } from "./components/services/AutoLanguage";
import { useDebounce } from "./components/hooks/useDebounce";
import { useEffect } from "react";

function App() {
  const {
    fromLanguage,
    toLanguage,
    loading,
    resultTranslate,
    textToTranslate,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setTextToTranslate,
    setResultTranslate,
  } = useStore();

  const debouncedValue = useDebounce(textToTranslate, 800);

  async function translateText(fromLanguage: FromLanguage) {
    const textTranslated = await translate({
      toLanguage,
      fromLanguage,
      textToTranslate,
    });
    console.log(textTranslated)
    setResultTranslate(textTranslated);
  }

  async function detectLanguageAndTranslateText() {
    let targetLanguage = fromLanguage;

    if (fromLanguage === AUTO_LANGUAGE) {
      const detectedLanguage = await setAutoLanguage(debouncedValue);
      setFromLanguage(detectedLanguage);
      targetLanguage = detectedLanguage;
    }

    await translateText(targetLanguage);
  }

  function speakerTranslatedText() {
    // Verificar si el navegador admite la síntesis de voz
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance();

      utterance.volume = 1;
      utterance.rate = 0.8;
      utterance.text = resultTranslate;
      utterance.lang = toLanguage;

      // Obtener la instancia de síntesis de voz y agregar el discurso
      const synthesis = window.speechSynthesis;
      synthesis.speak(utterance);
    } else {
      console.error("El navegador no admite la síntesis de voz.");
    }
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(resultTranslate).catch(() => {});
  };

  useEffect(() => {
    if (textToTranslate === "") return;
    detectLanguageAndTranslateText();
  }, [debouncedValue, toLanguage, fromLanguage]);

  return (
    <div style={{ background: "#003366" }}>
      <Container
        maxWidth={"lg"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            Traductor Tysdagar{" "}
            <TranslateIcon sx={{ marginLeft: "12px", fontSize: "56px " }} />
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "30px",
              my: "30px",
            }}
          >
            {/*SET TEXT TO TRANSLATE ZONE*/}

            <Stack width={"100%"} direction="column" gap="10px">
              <SelectLanguage
                onChange={setFromLanguage}
                value={fromLanguage}
                type={SectionType.From}
              />
              <TextArea
                type={SectionType.From}
                onChange={setTextToTranslate}
                value={textToTranslate}
              />
            </Stack>

            {/*INTERCHANGE LANGUAGES ZONE*/}

            <Button
              variant="contained"
              onClick={interChangeLanguages}
              sx={{ height: "50px", marginTop: "45px" }}
              disabled={
                fromLanguage === AUTO_LANGUAGE || fromLanguage === toLanguage
              }
            >
              <SyncAltIcon sx={{ fontSize: "40px" }} />
            </Button>

            {/*TRADUCTION ZONE*/}

            <Stack width={"100%"} direction="column" gap="10px">
              <SelectLanguage
                onChange={setToLanguage}
                value={toLanguage}
                type={SectionType.To}
              />
              <Box style={{ position: "relative" }}>
                <TextArea
                  type={SectionType.To}
                  value={resultTranslate}
                  onChange={setResultTranslate}
                  loading={loading}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: "grey",
                      transition: "all 550ms ease",

                      ":hover": {
                        color: "black",
                      },
                    }}
                    onClick={speakerTranslatedText}
                  >
                    <VolumeUpIcon sx={{ fontSize: "35px" }} />
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "grey",
                      transition: "all 550ms ease",

                      ":hover": {
                        color: "black",
                      },
                    }}
                    onClick={handleClipboard}
                  >
                    <ContentPasteIcon sx={{ fontSize: "35px" }} />
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
