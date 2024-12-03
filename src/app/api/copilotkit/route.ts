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

let mainState: MainExecuteState;

export const POST = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractDataForFilter: Action<any> = {
      name: "extractDataForFilter",
      description: `Call this function when the user is providing data or listing some items with the objective of: ${younngerTarget}.
      Each time that user is asking for something related with training sessions, like giving a location, speciality, time of the day, mode of training (In-person or virtual) or amount of sessions
        some examples of this function are:
        - I want some training sessions between 4 and 6 pm on Monday and with boxing and running as specialities of the trainer.
        - Show me all the trainers that are in Chapinero and that have a speciality in Zumba.
        - Let's search trainers that that can help me with my weight loss.
        - I want to see the trainers that are available on weekends.
        - Sessions all the days at 8am, in functional training and with a nutritionist.
        - I wish a nutritionist that can help me with my diet.
        - I need training sessions 2 times a week and that includes a nutritionist.
        - Boxing and running sessions on weekends.
        - In-person way of training.
        - 4 sessions per week.
        - Between 6 and 8 pm.
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

        console.log("pre currentState", currentState);

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

        console.log("post currentState", currentState);

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

        return (snapshot as FilterExecuteState).output;
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const otherStuff: Action<any> = {
      name: "otherStuff",
      description: `Call this function when the user is asking for fitness suggestions, if has a doubt about how the platform works or is asking for the different possibilities that are available in the app for locations, specialities, time of the day, etc.`,
      parameters: [
        {
          name: "input",
          type: "string",
          description: "the input that the user is sending to the app",
        },
      ],
      handler: async ({ input }) => {
        console.log("input other stuff", input, mainState);

        return "you are in the graph of otherStuff";
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

        console.log("tools used", final.tool_calls);

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
