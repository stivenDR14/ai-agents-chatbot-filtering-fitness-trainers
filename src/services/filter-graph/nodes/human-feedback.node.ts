import { ChatPromptTemplate } from "@langchain/core/prompts";
import { FilterExecuteState } from "app/models";
import { modelLargeMistral } from "app/services/ai-models";
import {
  dataForExtraction,
  linkForProcess,
  organizationName,
  younngerProcess,
  younngerTarget,
} from "app/utils/database";

export async function humanFeedbackStep(
  state: FilterExecuteState
): Promise<Partial<FilterExecuteState>> {
  const promptText = `You are an agent that is going to answer the user message.\
  You have this user message:\
  {message}\

  the current process is: 
  {process}\

  The objective of the process related to ${organizationName} is:
  {target}\

  There are some notations that you must take into account in order to answer the user message:\

  ${
    state.ommittedData && state.ommittedData.length !== 0
      ? `-There are some data that was ommited because is not matching with the options of the model in the proccess, then these are the parameters related and the options that must be used and has to be communicated to the user: ${state.ommittedData.map(
          (ommitted) => `
        parameter ${ommitted}, with the options: ${JSON.stringify(
            dataForExtraction.parameters.properties[ommitted]?.someOf?.[0]?.enum
          )}`
        )}`
      : ""
  }

  ${
    state.validatedData &&
    Object.values(state.validatedData).length !== 0 &&
    state.mistakes &&
    state.mistakes.length === 0
      ? `- Now the user might be redirected to the page where ${organizationName} is going to: ${younngerTarget}. 
    Then the user could click on the next link for achieve the objective of "{process}" as well: ${linkForProcess}${Object.entries(
          state.validatedData
        )
          .map(
            ([key, values]) =>
              `${key}=${JSON.stringify(values)
                .replace("[", "")
                .replace("]", "")}`
          )
          .join("&")}\ 

          The link must be added in a different paragraph.\
    `
      : ""
  }\


  ${
    state.mistakes && state.mistakes.length !== 0
      ? //&& state.analizedData.doubts.length === 0
        `-Is mandatory to tell the user about the mistakes that he has made with a closest similar description: ${state.mistakes.join(
          " - "
        )}.\
    Then try to hook him up to the process, and if the user hasn't provided the neccessary data to the proccess, ask him for the missing data and/or if the user want another items for setting in the process. In the case of the user has exceeded the limit of one item, remmeber that the proccess is not allowed to adjust anything that user asks.\
    `
      : ""
  }\


  -Answer with not more than 5 phares, so try to summarize the more you can all the information that you will present. Tell to supervisor the message to the user with a family way and with emojis related to training and nutrition depending on the context between the message that is to supervisor\

  -Those are the required items in the proccess: ${dataForExtraction.parameters.required.join(
    ","
  )}\

  ${`-This is the data that process has collected from the user: ${(state.newData &&
  Object.keys(state.newData).length !== 0
    ? JSON.stringify(state.newData)
    : JSON.stringify(state.currentData)
  )
    .replaceAll("{", `<`)
    .replaceAll("}", `>`)}, and it ${
    state.newData
      ? " is extracted now by the process"
      : " was extracted before by the process"
  }`}

  *Remember:\
  -Don't question user preferences as long as they are not related to mistakes descrived before.\
  -Don't tell or ask to the user about limitations on the data or items that he had provided.\
  -Do not give opinions about the user's data or items.\
  -Do not answer a large response, it could be not more than 5 sentences.\
  -Don't answer him at the end with question like 'seem to you?' or 'do you want to continue?' or 'do you want to know more?', the proccess doesn't have memory of the previous messages.\
  -Do not answer the user with something like 'Could you confirm if you want to change any of the items or data provided?' because the agents of the procces are not allowed to change that.\
  -If there is any mistake in the data provided by the user, end the conversation saying that for continue is neccessary the respective suggestions that you did.\
 
  `;

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
      currentData: state.newData,
      newData: {},
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
