import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PlanExecuteState } from "../main";
import { modelSmallMistral } from "app/services/ai/models";
import {
  exampleDataExtracted,
  organizationName,
  schemeData,
  utils,
  younngerTarget,
} from "../database";
import { z } from "zod";

const utilsGoals = [...utils.FITNESS_OBJECTIVES];

const classificationSchema = z.object({
  relatedGoals: z.enum(
    utilsGoals
      .map((values) => {
        return values.name;
      })
      .concat("None") as [string, ...string[]]
  ),
});

const recommendationPrompt = ChatPromptTemplate.fromTemplate(
  `You're part from agent ecosystem analyzing the input messages in stages. For the third stage:\
  You're the face of ${organizationName} that has the objective of ${younngerTarget}, and based on the request, you will extract only the properties mentioned in the 'Classification' function.\
  Take in account the meaning of each item:\
  ${utilsGoals
    .map((values) => {
      return `${values.name}: ${values.description}`;
    })
    .join(". ")}
  Note: if no one applies, set 'none' as the only value to return:

  request:
  {request}`
);

const recommender = recommendationPrompt.pipe(
  modelSmallMistral(0.2).withStructuredOutput!(classificationSchema, {
    name: "recommendedGoals",
  })
);

export async function recommendationStep(
  state: PlanExecuteState
): Promise<Partial<PlanExecuteState>> {
  const output = await recommender.invoke({
    request: state.input,
    example: exampleDataExtracted,
  });

  const objectRecommended =
    output.relatedGoals !== "None"
      ? //just take the specilities of the object that has in the name the output.relatedGoals
        utilsGoals.find((values) => values.name === output.relatedGoals)
      : undefined;

  console.log("recommendationStep", objectRecommended);
  //console the tokens used in the output

  return {
    ...state,
    recommendedObject: {
      name: objectRecommended?.name ?? "",
      description: objectRecommended?.description ?? "",
      items: objectRecommended?.specialities ?? [],
    },
  };
}
