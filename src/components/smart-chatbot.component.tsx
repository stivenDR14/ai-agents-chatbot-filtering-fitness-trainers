"use client";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { GenericConstants } from "../utils/constants";
import { useTranslations } from "next-intl";

export default function SmartChatbotComponent() {
  const t = useTranslations("ChatbotInbox");

  return (
    <CopilotPopup
      instructions={t(GenericConstants.mainInstruction)}
      labels={{
        title: t(GenericConstants.companyName),
        initial: t(GenericConstants.welcomeMessage),
      }}
    />
  );
}
