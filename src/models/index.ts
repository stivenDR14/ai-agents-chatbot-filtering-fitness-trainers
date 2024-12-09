export interface IRecommendationObject {
  name: string;
  description: string;
  items: string[];
}

export interface FilterExecuteState {
  input: string;
  currentData: object;
  newData?: object;
  ommittedData?: string[];
  validatedData?: object;
  output: string;
  mistakes?: string[];
  language: string;
}

export interface IAnalizedData {
  containDoubtsRelatedWithSuggestions: boolean;
  doubts: string[];
}

export interface SuggestionsExecuteState {
  input: string;
  language: string;
  output: string;
  analizedData: IAnalizedData;
  recommendedObject?: IRecommendationObject;
}

export interface MainExecuteState
  extends FilterExecuteState,
    SuggestionsExecuteState {}
