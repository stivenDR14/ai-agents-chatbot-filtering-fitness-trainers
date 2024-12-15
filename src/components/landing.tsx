"use client";

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  Avatar,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { CalendarMonth, Code, Try } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const Landing: React.FC = () => {
  const t = useTranslations("Landing");
  const theme = useTheme();
  useEffect(() => {
    document.body.style.background = `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.background.default} 90%)`;
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "wave 10s ease-in-out infinite";
  }, []);
  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", paddingTop: "50px" }}
    >
      <Avatar
        alt="Younnger"
        src={"/general_image.png"}
        sx={{
          width: "100px",
          height: "100px",
          margin: "auto",
          marginBottom: "20px",
          /*  "&:hover": {
            boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
          }, */
        }}
      />
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t("subtitle")}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {t("bonus")}
      </Typography>
      <Box
        mt={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          sx={{
            borderRadius: "20px",
            "&:hover": {
              boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)",
            },
          }}
          variant="contained"
          color="primary"
          startIcon={<CalendarMonth />}
          style={{ margin: "10px" }}
          href="https://calendly.com/esdr14/30min"
          target="_blank"
        >
          {t("schedule")}
        </Button>
        <Button
          sx={{
            borderRadius: "20px",
            "&:hover": {
              boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)",
            },
          }}
          variant="contained"
          color="primary"
          startIcon={<LinkedInIcon />}
          style={{ margin: "10px" }}
          href="https://www.linkedin.com/in/stiven-diaz-63432a191/"
          target="_blank"
        >
          {t("contact")}
        </Button>
        <Box
          sx={{
            height: "4px",
            width: "100%",
            mt: 3,
            backgroundColor: (theme) => theme.palette.text.secondary,
          }}
        />
        <Button
          sx={{
            borderRadius: "20px",
            "&:hover": {
              boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)",
            },
          }}
          variant="contained"
          color="primary"
          startIcon={<Try />}
          style={{ margin: "10px" }}
          href="https://github.com/stivenDR14/ai-agents-chatbot-filtering-fitness-trainers"
          target="_blank"
        >
          {t("see demo")}
        </Button>
        <Button
          sx={{
            borderRadius: "20px",
            "&:hover": {
              boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)",
            },
          }}
          variant="contained"
          color="primary"
          startIcon={<Code />}
          style={{ margin: "10px" }}
          href="https://app.younnger.com/filter-trainers"
          target="_blank"
        >
          {t("see code")}
        </Button>
      </Box>
    </Container>
  );
};

export default Landing;
