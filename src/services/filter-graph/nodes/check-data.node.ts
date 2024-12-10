/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterExecuteState } from "app/models";
import {
  dataForExtraction,
  keyForFilterByItem,
  keyToReturnByItem,
  schemeData,
  utils,
  validations,
} from "app/utils/database";

type GenericObject = { [key: string]: any };

type SchemeToInterface<T> = {
  [K in keyof T]: T[K] extends "string[]"
    ? string[]
    : T[K] extends "string"
    ? string
    : never;
} & { [key: string]: string | string[] };

function isStringArray(obj: unknown): obj is string[] {
  return Array.isArray(obj) && obj.every((item) => typeof item === "string");
}

function findMissingItems(mergedData: any, dataExtracted: any): string[] {
  const missingItems: string[] = [];

  const pendingItems = Object.keys(schemeData).filter(
    (key) => !Object.keys(mergedData).includes(key)
  );

  if (pendingItems.length > 0) {
    const pendingItemsString = `'${pendingItems.join(
      "', '"
    )}' are pending items`;
    missingItems.push(pendingItemsString);
  }

  for (const key in dataExtracted) {
    if (dataExtracted.hasOwnProperty(key)) {
      const mergedItemsLowercase = isStringArray((mergedData as any)[key])
        ? mergedData[key].map((el: string) => el.toLowerCase())
        : [mergedData[key].toLowerCase()];
      const missing = isStringArray((mergedData as any)[key])
        ? dataExtracted[key].filter(
            (item: string) => !mergedItemsLowercase.includes(item.toLowerCase())
          )
        : [];
      if (missing.length > 0) {
        const missingItemsString = `'${missing.join(
          "', '"
        )}' are not valid objects`;
        missingItems.push(missingItemsString);
      }
    }
  }

  return missingItems;
}

export function checkDataStep(
  state: FilterExecuteState
): Partial<FilterExecuteState> {
  type SchemeDataInterface = SchemeToInterface<typeof schemeData>;

  const dataExtracted: SchemeDataInterface =
    state.newData as SchemeDataInterface;
  const itemsSchema = Object.keys(schemeData);
  const newData: GenericObject = {};

  try {
    itemsSchema.forEach((item) => {
      const keyForFilterByItemAux = keyForFilterByItem[item];
      if (typeof dataExtracted[item] === "string") {
        const valuesArray = (utils as GenericObject)[item].map(
          (value: { [x: string]: number | string }) => {
            return value[keyForFilterByItemAux].toString().toLowerCase();
          }
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        valuesArray.includes(dataExtracted[item].toString().toLowerCase()) &&
          (newData[item] = dataExtracted[item].toLowerCase());
      } else if (isStringArray(dataExtracted[item])) {
        const valuesArray: string[] = (utils as GenericObject)[item].map(
          (value: { [x: string]: number | string }) => {
            return value[keyForFilterByItemAux].toString().toLowerCase();
          }
        );

        const filteredArray = valuesArray.filter((value) => {
          if (dataExtracted[item].toString().toLowerCase().includes(value))
            return value.toLowerCase();
        });
        newData[item] = filteredArray;
      }
    });

    const mergedData = {
      locations: Array.from(
        new Set([...(state.currentData as any).locations, ...newData.locations])
      ),
      specialities: Array.from(
        new Set([
          ...(state.currentData as any).specialities,
          ...newData.specialities,
        ])
      ),
      timeOfDay: Array.from(
        new Set([...(state.currentData as any).timeOfDay, ...newData.timeOfDay])
      ),
      mode:
        newData.mode.length > 0
          ? newData.mode
          : (state.currentData as any).mode,
      sessionAmount: newData.sessionAmount
        ? newData.sessionAmount.length > 0
          ? newData.sessionAmount
          : (state.currentData as any).sessionAmount
        : undefined,
    };

    let mistakes: string[] = [];

    Object.keys(mergedData).forEach((key) => {
      validations[key].forEach((validation) => {
        if (
          dataForExtraction.parameters.required.includes(key) ||
          (!dataForExtraction.parameters.required.includes(key) &&
            (mergedData as any)[key].length > 0)
        ) {
          if (Object.keys(validation)[0] === "max") {
            if (
              Object.values(validation)[0] < (mergedData as any)[key].length
            ) {
              mistakes.push(Object.values(validation)[1]);
            }
            /* ${(mergedData as any)[key]
              .map((subItemMerged: any) => subItemMerged)
              .join(
                ","
              )} */
          }
          if (Object.keys(validation)[0] === "min") {
            if (
              Object.values(validation)[0] > (mergedData as any)[key].length
            ) {
              mistakes.push(Object.values(validation)[1]);
            }
            /* ${(
              mergedData as any
            )[key]
              .map((subItemMerged: any) => subItemMerged)
              .join(
                ","
              )}  */
          }
        }
      });
    });
    mistakes = [...mistakes, ...findMissingItems(mergedData, dataExtracted)];

    const validatedData = Object.keys(schemeData).reduce((acc: any, key) => {
      // (utils as any)[key] is an array of objects where each object has id and name, then get an array from mergedData[key] and map it to get the id of the object

      acc[key] = (mergedData as any)[key]
        ? isStringArray((mergedData as any)[key])
          ? (mergedData as any)[key].map((item: string) => {
              return (utils as any)[key].find(
                (value: { [x: string]: number | string }) =>
                  value[keyForFilterByItem[key]].toString().toLowerCase() ===
                  item
              )[keyToReturnByItem[key]];
            })
          : typeof dataExtracted[(mergedData as any)[key]] === "string"
          ? (utils as any)[key].find(
              (value: { [x: string]: number | string }) =>
                value[keyForFilterByItem[key]].toString().toLowerCase() ===
                (mergedData as any)[key].toString().toLowerCase()
            )[keyToReturnByItem[key]]
          : []
        : [];
      return acc;
    }, {} as Record<string, string>);

    return {
      ...state,
      newData: mergedData,
      mistakes: mistakes,
      validatedData: validatedData,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(error as any);
  }
}
