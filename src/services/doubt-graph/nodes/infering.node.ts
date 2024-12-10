import { ChatPromptTemplate } from "@langchain/core/prompts";
import { SuggestionsExecuteState } from "app/models";
import { modelLargeMistral } from "app/services/ai-models";
import {
  objectiveOrRecommendation,
  organizationName,
  schemeData,
  topicRelatedForCallToAction,
  younngerProcess,
} from "app/utils/database";
const doubtsOptions: [string, ...string[]] = [
  "DoubtAboutField",
  "DoubtAboutProcess",
  "DoubtAboutStorageData",
  "DoubtAboutOrganization",
  "DoubtAboutTopicForCallToAction",
  "DoubtAboutAnotherTopic",
];

const greetingFunction = {
  name: "doubts",
  description:
    "This tool is used to get the properties of the user message, if the user has dobts, if the user is requesting, if it is possible to give him a recommendation and if the user is greeting the assistant",
  parameters: {
    title: "getDoubtsSchema",
    type: "object",
    properties: {
      containDoubtsRelatedWithSuggestions: {
        title:
          "Contain doubts related with suggestions or is asking for suggestions or even the user message allows to give a suggestion based on the content",
        anyOf: [true, false],
      },
      doubts: {
        title: "Doubts or question",
        someAndOnlyOf: [{ enum: doubtsOptions }],
        describe:
          "possible doubt or question that the user could have, just attach the doubts or question, request and order with data that the process can extract doesn't applies here",
      },
    },
    required: ["doubts", "containGreetings"],
  },
};

const greeterPrompt = ChatPromptTemplate.fromTemplate(
  `First of all important to know, what the process means: {process}\
  You're part from agent ecosystem analyzing the input messages in stages. For the first stage:\
  1. analize the message and get if it is appropriate to provide to the user a recommendation or suggestion, or even if the user is telling something as a goal or is asking for: {goalOrSuggestion}. \
  2. analize the content of the message and get whitch one or some of these items are related with the question or doubt that the user has, even if is asking for suggestions or recommendations:\
  'DoubtAboutField': the user has a question or doubt about what data or information that the process requires or what data he should give to the process and/or what is the correct way for tell to the procces specific data, even the limitations of the data, how many data the user could provide by field and these types of things. The items that the process requires and manage are: ${JSON.stringify(
    Object.keys(schemeData)
  )}\
  'DoubtAboutProcess':  the user has a question or doubt about what the process does and/or the goal of the process.\
  'DoubtAboutStorageData': the user has a question or doubt about the user's data that is currently get by the process, could be now or in another past message.\
  'DoubtAboutOrganization':  the user has a question or doubt about the company, organization or similar concepts that applies to the name of current organization that is managing the process: '${organizationName}', that is involved in the process, where the data will be sent or redirect at the finish of the process.\
  'DoubtAboutAnotherTopic': the user has a question, request or doubt about another thing that was not mentioned in the previous options, and the process will not be able to answer, things link historic facts, events, general knowledge questions and etcetera, or any request non related with the process. \
  'DoubtAboutTopicForCallToAction': {topicRelatedForCallToAction} \
  Set doubts to empty array if none apply or the user is ordering. \
  Note: The process is a conversational form chatbot that collects data, analyzes it, and provides links with sorted params or information from an endpoint. \
  {message}
  `
);

const greeter = greeterPrompt.pipe(
  modelLargeMistral(0.2).withStructuredOutput!(greetingFunction)
);

export async function inferingStep(
  state: SuggestionsExecuteState
): Promise<Partial<SuggestionsExecuteState>> {
  const output = await greeter.invoke({
    process: younngerProcess,
    message: state.input,
    topicRelatedForCallToAction: topicRelatedForCallToAction,
    goalOrSuggestion: objectiveOrRecommendation,
  });
  //console the tokens used in the output

  return { ...state, analizedData: output };
}
