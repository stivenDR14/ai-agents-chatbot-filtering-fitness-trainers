import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PlanExecuteState } from "../main";
import { modelLargeMistral } from "app/services/ai/models";
import { linksToRedirect, organizationInformation } from "../database";

const redirectionFunction = {
  name: "redirection",
  description:
    "This tool is used to get the section or page where the user wants to go",
  parameters: {
    title: "getRedirectionSchema",
    type: "object",
    properties: {
      link: {
        title: "url",
        anyOf: [{ enum: Object.values(linksToRedirect) }],
        describe:
          "The url of the page or section the user wants to go in format https://www.example.com/page",
      },
    },
    required: ["link"],
  },
};

const redirectorPrompt = ChatPromptTemplate.fromTemplate(
  `You're part from agent ecosystem analyzing the input messages in stages. For this stage:\
  1. You will redirect the user from the current page to another page related with ${organizationInformation}.\
  2. There are the only pages where you can redirect,based on the topic of this object:\
  {links}

  request:
  {request}`
);

const redirector = redirectorPrompt.pipe(
  modelLargeMistral(0.1).withStructuredOutput!(redirectionFunction)
);

export async function redirectionStep(
  state: PlanExecuteState
): Promise<Partial<PlanExecuteState>> {
  const output: { link: string } = await redirector.invoke({
    request: state.input,
    links: JSON.stringify(linksToRedirect),
  });
  console.log("redirectionStep", output);
  //console the tokens used in the output

  return {
    ...state,
    redirection: output.link.toString(),
    output: `🔗 ${output.link.toString()} 🔗`,
  };
}
