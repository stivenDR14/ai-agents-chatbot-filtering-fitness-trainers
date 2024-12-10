import { StateGraph, START, StateGraphArgs, END } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import {
  IAnalizedData,
  IRecommendationObject,
  MainExecuteState,
} from "app/models";
import { doubtStep } from "./nodes/doubt.node";
import { inferingStep } from "./nodes/infering.node";

export const doubtsState: StateGraphArgs<MainExecuteState>["channels"] = {
  input: {
    value: (left?: string, right?: string) => right ?? left ?? "",
    default: () => "",
  },
  language: {
    value: (left?: string, right?: string) => right ?? left ?? "en",
    default: () => "en",
  },
  analizedData: {
    value: (x?: IAnalizedData, y?: IAnalizedData) =>
      y ??
      x ?? {
        containGreetings: false,
        doubts: [],
        requesting: "",
        containDoubtsRelatedWithSuggestions: false,
      },
    default: () => {
      return {
        containGreetings: false,
        doubts: [],
        requesting: "",
        containDoubtsRelatedWithSuggestions: false,
      };
    },
  },
  output: {
    value: (x: string, y: string) => y ?? x ?? "",
    default: () => "",
  },
  recommendedObject: {
    value: (x?: IRecommendationObject, y?: IRecommendationObject) =>
      y ??
      x ?? {
        name: "",
        description: "",
        items: [],
      },
    default: () => undefined,
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
  validatedData: {
    value: (x?: object, y?: object) => y ?? x ?? {},
    default: () => [],
  },
  mistakes: {
    value: (x?: string[], y?: string[]) => y ?? x ?? [],
    default: () => [],
  },
};

const workflowDoubtsSuggestions = new StateGraph<MainExecuteState>({
  channels: doubtsState,
})

  .addNode("infering", inferingStep)
  .addNode("doubt", doubtStep)

  .addEdge(START, "infering")
  .addEdge("infering", "doubt")
  .addEdge("doubt", END);

const memory = new MemorySaver();

class GraphSuggestionDoubtsAgentSingleton {
  private static instance: ReturnType<typeof workflowDoubtsSuggestions.compile>;

  private constructor() {}

  public static getInstance() {
    if (!GraphSuggestionDoubtsAgentSingleton.instance) {
      GraphSuggestionDoubtsAgentSingleton.instance =
        workflowDoubtsSuggestions.compile({
          checkpointer: memory,
        });
    }
    return GraphSuggestionDoubtsAgentSingleton.instance;
  }
}

export default GraphSuggestionDoubtsAgentSingleton;
