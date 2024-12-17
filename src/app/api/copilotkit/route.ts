import { Action } from "@copilotkit/shared";
import { NextRequest, NextResponse } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangChainAdapter,
} from "@copilotkit/runtime";
import { modelLargeMistral } from "app/services/ai-models";
import { StructuredToolInterface } from "@langchain/core/tools";
import { younngerTarget } from "app/utils/database";
import { FilterExecuteState, MainExecuteState } from "app/models";
import GraphFilterAgentSingleton from "app/services/filter-graph";
import { getUserLocale } from "app/services/locale";
import { GenericLanguages } from "app/utils/constants";
import GraphSuggestionDoubtsAgentSingleton from "app/services/doubt-graph";

let mainState: MainExecuteState;

export const POST = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractDataForFilter: Action<any> = {
      name: "extractDataForFilter",
      description: `Call this function when the user is providing data or listing some items, could be with the objective of: ${younngerTarget}. Even if the user is just providing some data that you can extract from the user's input, call this function.
      Each time that user is asking for something related with training sessions, like giving a location, speciality, time of the day, mode of training (In-person or virtual) or amount of sessions
        some examples of this function are:
        - I want some training sessions between 4 and 6 pm on Monday and with boxing and running as specialities of the trainer.
        - I want to schedule a training session and get for me with the data that you have saved.
        - I'd prefer to have presencial training sessions.
        - well, let's filter by Zumba and Running.
        - Show me all the trainers that are in Chapinero and that have a speciality in Zumba.
        - Let's search trainers that that can help me with my weight loss.
        - I want to see the trainers that are available on weekends.
        - Sessions all the days at 8am, in functional training and with a nutritionist.
        - I wish a nutritionist that can help me with my diet.
        - I need training sessions 2 times a week and that includes a nutritionist.
        - Zumba and Functional traning sessions on weekends.
        - In-person way of training.
        - 4 sessions per week.
        - Between 6 and 8 pm.
        - boxing and running
        - presencial only
        - 4 sessions per week
        - between 6 and 8 pm
        - I need a nutritionist
        - I want to see the trainers that are available on weekends
      `,
      parameters: [
        {
          name: "input",
          type: "string",
          description: "the input that the user is sending to the app",
        },
      ],
      handler: async ({ input }) => {
        const language = await getUserLocale();
        const graphFilterAgent = GraphFilterAgentSingleton.getInstance();
        const config = {
          configurable: { thread_id: "1" },
          streamMode: "values" as const,
        };

        const currentState = await graphFilterAgent.getState(config);

        mainState = {
          ...currentState.values,
        };

        const initialInput = {
          input: input,
          language: GenericLanguages[language as keyof typeof GenericLanguages],
          currentData: {
            locations: [],
            specialities: [],
            timeOfDay: [],
            mode: [],
            sessionAmount: [],
          },
        };

        if (currentState.next[0] === "") {
          await graphFilterAgent.updateState(config, {
            output: "",
            currentData: {
              locations: [],
              specialities: [],
              timeOfDay: [],
              mode: [],
              sessionAmount: [],
            },
            newData: undefined,
            input: input,
            mistakes: undefined,
            validatedData: undefined,
            omittedData: undefined,
          });
        }

        if (currentState.values.output !== "")
          await graphFilterAgent.updateState(config, {
            ...currentState.values,
            input: input,
            mistakes: undefined,
            validatedData: undefined,
            omittedData: undefined,
          });

        let snapshot = {};
        // Run the graph until the first interruption
        for await (const event of await graphFilterAgent.stream(
          currentState.values.output && currentState.values.output !== ""
            ? null
            : initialInput,
          config
        )) {
          snapshot = event as FilterExecuteState;
        }

        mainState = {
          ...mainState,
          ...snapshot,
        };

        return (snapshot as FilterExecuteState).output;
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const otherStuff: Action<any> = {
      name: "otherStuff",
      description: `Call this function when the user is asking for fitness suggestions, if has a doubt about how the platform works or is asking for the different possibilities that are available in the app for locations, specialities, time of the day, etc.
      some examples of this function are:
      - Tell me what are the different locations that you have available.
      - What location can I choose?
      - What are the different specialities that you have?
      - about the specialities, what are the options?
      - What are the different modes of training that I can choose?
      - talking about ubications, what are the possibilities?
      - may I choose the specialities taking into account what types of them?
      - What specialities can I filter?
      - What specialities are there?
      - What are the different times of the day that I can choose?
      - What are the time of the day options?
      - Tell me the data that you have saved from me
      `,
      parameters: [
        {
          name: "input",
          type: "string",
          description: "the input that the user is sending to the app",
        },
      ],
      handler: async ({ input }) => {
        const language = await getUserLocale();
        const graphSuggestDoubtAgent =
          GraphSuggestionDoubtsAgentSingleton.getInstance();
        const config = {
          configurable: { thread_id: "1" },
          streamMode: "values" as const,
        };
        mainState = {
          ...mainState,
          input: input,
          language: GenericLanguages[language as keyof typeof GenericLanguages],
        };

        let snapshot = {};
        // Run the graph until the first interruption
        for await (const event of await graphSuggestDoubtAgent.stream(
          mainState,
          config
        )) {
          snapshot = event as MainExecuteState;
        }

        mainState = {
          ...mainState,
          ...snapshot,
        };

        return (snapshot as MainExecuteState).output;
      },
    };

    const actions: Action[] = [extractDataForFilter, otherStuff];

    const serviceAdapter = new LangChainAdapter({
      chainFn: async ({ messages, tools }) => {
        const modelWithTool = modelLargeMistral(0.2).bindTools([
          ...tools,
        ] as StructuredToolInterface[]);

        const final = await modelWithTool.invoke(messages, {
          tools: tools as StructuredToolInterface[],
        });

        return final;
      },
    });

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime: new CopilotRuntime({ actions }),
      serviceAdapter: serviceAdapter,
      endpoint: req.nextUrl.pathname,
    });
    return handleRequest(req);
  } catch (error) {
    console.log("Error in handleRequest", error);

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Errorsote",
      }),
      {
        headers: { "Content-Type": "json" },
      }
    );
  }
};
