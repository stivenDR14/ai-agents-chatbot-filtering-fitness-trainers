"use client";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { GenericConstants } from "../utils/constants";
import { useLocale, useTranslations } from "next-intl";
import Grid from "@mui/material/Grid2";
import {
  Box,
  FormControl,
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

export default function SmartChatbotComponent() {
  const t = useTranslations("ChatbotInbox");

  const locale = useLocale();

  const [, startTransition] = useTransition();

  useEffect(() => {
    setUserLocale(getDefaultLocale());
  }, []);

  function onChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  return (
    <CopilotPopup
      instructions={t(GenericConstants.mainInstruction)}
      labels={{
        title: t(GenericConstants.companyName),
        initial: t(GenericConstants.welcomeMessage),
      }}
      clickOutsideToClose={false}
      Header={() => (
        <Box>
          <Grid container spacing={2}>
            <Grid
              size={10}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
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
                <Typography variant="body1">{t("select language")}</Typography>
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
      )}
      icons={{
        openIcon: (
          <IconButton
            aria-label="open chat"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: "50%",
              height: "60px",
            }}
          >
            <ForumIcon color="secondary" />
            <FitnessCenterIcon color="primary" />
          </IconButton>
        ),
        closeIcon: (
          <IconButton
            aria-label="close chat"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: "50%",
              height: "60px",
              width: "60px",
            }}
          >
            <SmartToyIcon color="secondary" />
          </IconButton>
        ),
      }}
    />
  );
}
