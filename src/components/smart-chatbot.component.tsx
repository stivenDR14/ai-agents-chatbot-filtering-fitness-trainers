"use client";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { GenericConstants } from "../utils/constants";
import { useLocale, useTranslations } from "next-intl";
import Grid from "@mui/material/Grid2";
import {
  Box,
  CircularProgress,
  FormControl,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ForumIcon from "@mui/icons-material/Forum";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { setUserLocale } from "app/services/locale";
import { getDefaultLocale } from "app/helpers/locale";
import { useEffect, useTransition } from "react";
import { Locale } from "app/i18n/config";
import { useCopilotAction } from "@copilotkit/react-core";

export default function SmartChatbotComponent() {
  const t = useTranslations("ChatbotInbox");

  const locale = useLocale();

  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    setUserLocale(getDefaultLocale());
  }, []);

  function onChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  useCopilotAction({
    name: "changeLanguage",
    description:
      "Change the language of the chatbot, application and/or website",
    parameters: [
      {
        name: "language",
        someOf: ["en", "es", "pt"],
        description:
          "The language to change to, converted to a locale, e.g. if is english convert to 'en', if is spanish convert to 'es', if is portuguese convert to 'pt'",
      },
    ],
    handler: async ({ language }) => {
      console.log("Changing language to", language);

      onChange(language);
    },
  });

  return (
    <CopilotPopup
      instructions={t(GenericConstants.mainInstruction)}
      labels={{
        title: t(GenericConstants.companyName),
        initial: t(GenericConstants.welcomeMessage),
      }}
      clickOutsideToClose={false}
      Header={() =>
        isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "8px",
              }}
            >
              <Grid
                size={10}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  {t(GenericConstants.companyName)}
                </Typography>
              </Grid>
              <Grid size={2}>
                <IconButton
                  aria-label="close"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderRadius: "20%",
                  }}
                  onClick={() => {
                    //click the button with class 'copilotKitButton
                    const button = document.querySelector(".copilotKitButton");
                    if (button) {
                      (button as HTMLElement).click();
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid container spacing={2}>
                <Grid offset={1} size={5}>
                  <Typography variant="body1">
                    {t("select language")}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      displayEmpty
                      sx={{
                        height: "40px",
                        backgroundColor: (theme) => theme.palette.primary.light,
                      }}
                      value={locale}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    >
                      <MenuItem value="en">{t("language.english")}</MenuItem>
                      <MenuItem value="es">{t("language.spanish")}</MenuItem>
                      <MenuItem value="pt">{t("language.portuguese")}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )
      }
      icons={{
        openIcon: (
          <Icon
            aria-label="open chat"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ForumIcon color="error" />
            <FitnessCenterIcon color="error" />
          </Icon>
        ),
        closeIcon: (
          <Icon
            aria-label="close chat"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SmartToyIcon color="error" />
          </Icon>
        ),
      }}
    />
  );
}
