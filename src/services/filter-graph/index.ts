import { StateGraph, START, StateGraphArgs, END } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { FilterExecuteState } from "app/models";
import { dataExtractorStep } from "./nodes/data-extractor.node";
import { checkDataStep } from "./nodes/check-data.node";
import { humanFeedbackStep } from "./nodes/human-feedback.node";
import { generatorFilterLinkStep } from "./nodes/generator-filter-link.node";

export const filterState: StateGraphArgs<FilterExecuteState>["channels"] = {
  input: {
    value: (left?: string, right?: string) => right ?? left ?? "",
    default: () => "",
  },
  currentData: {
    value: (x?: object, y?: object) =>
      y ??
      x ?? {
        locations: [],
        specialities: [],
        timeOfDay: [],
        mode: [],
        sessionAmount: [],
      },
  },
  newData: {
    value: (x?: object, y?: object) => y ?? x ?? {},
    default: () => undefined,
  },
  ommittedData: {
    value: (x?: string[], y?: string[]) => y ?? x ?? [],
    default: () => [],
  },
  output: {
    value: (x: string, y: string) => y ?? x ?? "",
    default: () => "",
  },
  validatedData: {
    value: (x?: object, y?: object) => y ?? x ?? {},
    default: () => [],
  },
  mistakes: {
    value: (x?: string[], y?: string[]) => y ?? x ?? [],
    default: () => [],
  },
};

const shouldNextToAskHuman = (state: FilterExecuteState) => {
  console.log("is thinking....", state);

  if (
    (state.mistakes && state.mistakes.length > 0) ||
    (state.ommittedData && state.ommittedData.length > 0)
  )
    return "humanFeedback";
  else {
    return "generatorFilterLink";
  }
};

const workflowFilterChat = new StateGraph<FilterExecuteState>({
  channels: filterState,
})
  .addNode("dataExtractor", dataExtractorStep)
  .addNode("checkData", checkDataStep)
  .addNode("humanFeedback", humanFeedbackStep)
  .addNode("generatorFilterLink", generatorFilterLinkStep)
  .addEdge(START, "dataExtractor")
  .addEdge("dataExtractor", "checkData")
  .addConditionalEdges("checkData", shouldNextToAskHuman, {
    generatorFilterLink: "generatorFilterLink",
    humanFeedback: "humanFeedback",
  })
  .addEdge("humanFeedback", "dataExtractor")
  .addEdge("generatorFilterLink", END);

const memory = new MemorySaver();

class GraphFilterAgentSingleton {
  private static instance: ReturnType<typeof workflowFilterChat.compile>;

  private constructor() {}

  public static getInstance() {
    if (!GraphFilterAgentSingleton.instance) {
      GraphFilterAgentSingleton.instance = workflowFilterChat.compile({
        checkpointer: memory,
        interruptAfter: ["humanFeedback"],
      });
    }
    return GraphFilterAgentSingleton.instance;
  }
}

export default GraphFilterAgentSingleton;
