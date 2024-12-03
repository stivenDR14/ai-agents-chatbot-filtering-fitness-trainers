import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MainExecuteState } from "app/models";
import { modelLargeMistral } from "app/services/ai-models";
import {
  callToActionQuestion,
  dataForExtraction,
  organizationInformation,
  organizationName,
  processInformation,
  recommendedKey,
  topicRelatedForCallToAction,
  validations,
  younngerProcess,
  younngerTarget,
} from "app/utils/database";

const doubtsOptions: [string, ...string[]] = [
  "DoubtAboutField",
  "DoubtAboutProcess",
  "DoubtAboutStorageData",
  "DoubtAboutOrganization",
  "DoubtAboutTopicForCallToAction",
  "DoubtAboutAnotherTopic",
];

const doubtsDescription = (
  state: MainExecuteState
): { [key: string]: string } => {
  return {
    DoubtAboutField: `From the next schema, tell user the field that the user is asking about, if is in general, tell him about all the fields and options: ${JSON.stringify(
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
      .replaceAll("}", `>`)} and its validations: ${JSON.stringify(validations)
      .replaceAll("{", `<`)
      .replaceAll("}", `>`)}`,
    DoubtAboutProcess: processInformation,
    DoubtAboutStorageData: `the user has this information collected through the procces ${(state.newData &&
    Object.keys(state.newData).length !== 0
      ? JSON.stringify(state.newData)
      : JSON.stringify(state.currentData)
    )
      .replaceAll("{", `<`)
      .replaceAll("}", `>`)}`,
    DoubtAboutOrganization: organizationInformation,
    DoubtAboutAnotherTopic: `You're not going to answer the user message, because is not related with the topic of the process. and either is not related with: ${topicRelatedForCallToAction}, ask him questions like: ${callToActionQuestion}, with the objective of ${younngerTarget} `,
    DoubtAboutTopicForCallToAction: `${topicRelatedForCallToAction}${
      state.recommendedObject && state.recommendedObject.name !== ""
        ? `. take into account those ${recommendedKey} (${JSON.stringify(
            state.recommendedObject.items
          )}) that you will recommend him, based on the description (${
            state.recommendedObject.description
          }), and ask if does the user want any other more`
        : ""
    }`,
  };
};

export async function doubtStep(
  state: MainExecuteState
): Promise<Partial<MainExecuteState>> {
  const doubtsObjectDescription = doubtsDescription(state);

  const promptText = `You are going to respond the user message directly.\
  You have this user message:\
  {message}\

  the current process is: 
  {process}\

  The objective of the process related to ${organizationName} is:
  {target}\

  There are some notations that you must take into account in order to answer the user message:\
  ${
    state.doubts.length !== 0
      ? `
  - Answer each one of the next doubts based on its description and the user message: \
  ${state.doubts
    .map((doubt) => {
      return `${doubt}: ${doubtsObjectDescription[doubt]} \
    `;
    })
    .join(". ")}
  Do not extend the answer more than in the previous description is indicated.\
  Note: Always that you are refering about the ${recommendedKey}, bear in mind the options that the user can choose some of: ${JSON.stringify(
          dataForExtraction.parameters.properties[recommendedKey]?.someOf?.[0]
            ?.enum
        )}
    `
      : ""
  }\


  ${
    state.containDoubtsRelatedWithSuggestions &&
    state.recommendedObject &&
    state.recommendedObject.name !== ""
      ? `-You took some suggesions for him based on the topic of ${
          state.recommendedObject?.name
        }, based on the description: ${
          state.recommendedObject?.description
        }, and based on the items: ${JSON.stringify(
          state.recommendedObject?.items
        )}.\
    explain the user the different items that you choose based on this data that is the data introduced by the user in the process.\
    ${(state.newData && Object.keys(state.newData).length !== 0
      ? JSON.stringify(state.newData)
      : JSON.stringify(state.currentData)
    )
      .replaceAll("{", `<`)
      .replaceAll("}", `>`)}
      `
      : ""
  }\

  *Remember:\
  -Do not give opinions about the user's data or items.\
  -Don't answer him at the end with question like 'seem to you?' or 'do you want to continue?' or 'do you want to know more?', the proccess doesn't have memory of the previous messages.\
 
  `;

  try {
    const solverPrompt = ChatPromptTemplate.fromTemplate(promptText).pipe(
      modelLargeMistral(0.3)
    );

    console.log("solverPrompt", promptText);

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
