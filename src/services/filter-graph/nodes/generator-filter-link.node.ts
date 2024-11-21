import { ChatPromptTemplate } from "@langchain/core/prompts";
import { FilterExecuteState } from "app/models";
import { modelLargeMistral } from "app/services/ai-models";
import {
  dataForExtraction,
  linkForProcess,
  organizationName,
  validations,
  younngerProcess,
  younngerTarget,
} from "app/utils/database";

export async function generatorFilterLinkStep(
  state: FilterExecuteState
): Promise<Partial<FilterExecuteState>> {
  const promptText = `You are going to respond the user message directly.\
  You have this user message:\
  {message}\

  the current process is: 
  {process}\

  The objective of the process related to ${organizationName} is:
  {target}\

  ${
    state.validatedData &&
    Object.values(state.validatedData).length !== 0 &&
    state.mistakes &&
    state.mistakes.length === 0
      ? `This is the link where that you must provide to user in order for getting the data that user is looking for based on ${younngerProcess}: ${linkForProcess}${Object.entries(
          state.validatedData
        )
          .map(([key, values]) => `${key}=${JSON.stringify(values)}`)
          .join("&")}\ 
`
      : `It was not possible to return a link to the user, please check the necessary data to continue.
      From the next schema, tell user the field that the user is asking about, if is in general, tell him about all the fields and options: ${JSON.stringify(
        dataForExtraction.parameters.properties
      )
        .replaceAll("{", `<`)
        .replaceAll(
          "}",
          `>`
        )}. Take into account which of them are required: ${JSON.stringify(
          dataForExtraction.parameters.required
        )
          .replaceAll("{", `<`)
          .replaceAll("}", `>`)} and its validations: ${JSON.stringify(
          validations
        )
          .replaceAll("{", `<`)
          .replaceAll("}", `>`)}
      `
  }

  `;

  console.log("generatorFilterLinkStep");

  try {
    const solverPrompt = ChatPromptTemplate.fromTemplate(promptText).pipe(
      modelLargeMistral(0.3)
    );

    const output = await solverPrompt.invoke({
      message: state.input,
      process: younngerProcess,
      target: younngerTarget,
    });
    return {
      ...state,
      output: output.content.toString(),
    };
  } catch (error) {
    console.log(`Failed in doubt node - ${error}`);
    return {
      ...state,
      output: "",
    };
  }
  //console the tokens used in the output
}
