/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { FilterExecuteState } from "app/models";
import { modelLargeMistral } from "app/services/ai-models";
import { dataForExtraction } from "app/utils/database";

const dataExtactorPrompt = ChatPromptTemplate.fromTemplate(
  `You're part from agent ecosystem analyzing the input messages in stages. For the first stage:\
  1. analize the request and set all the data in  the structured way based on the model.\
  2. if there is not data to extract, set the data to empty array.\
  request:
  {request}`
);

const dataExtractor = dataExtactorPrompt.pipe(
  modelLargeMistral(0.2).withStructuredOutput!(dataForExtraction)
);

export async function dataExtractorStep(
  state: FilterExecuteState
): Promise<Partial<FilterExecuteState>> {
  const output = await dataExtractor.invoke({
    request: state.input,
  });
  const finalData =
    "properties" in output ? (output as any).properties : output;

  const ommittedData = finalData["ommittedData"];
  delete finalData["ommittedData"];
  return {
    ...state,
    newData: finalData,
    ommittedData: ommittedData,
  };
}
