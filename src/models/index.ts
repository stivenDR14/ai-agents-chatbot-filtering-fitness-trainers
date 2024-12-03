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

export interface SuggestionsExecuteState {
  input: string;
  output: string;
  recommendedObject?: IRecommendationObject;
  redirection?: string;
}

export interface MainExecuteState extends FilterExecuteState {
  recommendedObject?: IRecommendationObject;
  doubts: string[];
  containDoubtsRelatedWithSuggestions: boolean;
}
