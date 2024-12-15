# Fitness Filter Chatbot AI

This repository contains a Next.js application, where it has the CoplitKit package utilized to make a chatbot with human-in-loop features.
The human-in-loop feature is implemented by calling the respective endpoint of two LangGraph agents. Those ones implements a graph agent using a Singleton pattern to maintain state across API calls.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Description

There are two agents, filter-graph and doubt-graph.

- The Graph Filter Agent is designed to process and filter input data using a state graph, this filter consist firstful, scrapping important data is provided in the input, like location, time for training, sessions amount, fitness specialities and virtual/presential mode. Then the agent compares the data extracted with the 'database' (Embedded values) that has all the limitations, options and possible values that might be valid by the context of the chatbot, for instance all the zones where Bogotá city (Colombia) is divided (Tunjuelito, Usaquen, Kennedy...), whose are defined as the field of 'locations', and in the same way, there are some definitios for other fields that agent must extract and ask for the user: specialities, timeOfDay, mode and optionaly sessionAmount.

- The Doubt Graph Agent is designed to process all the questions or doubts that the user has about the chatbot, the company (Younnger), fitness suggestions or even the information saved by the chatbot between each response.

Both of those agents maintains its state across multiple API calls by using a Singleton pattern. This ensures that the state is not reset with each request, providing a consistent and reliable filtering process, taking into account the data collected in the state between each API call.

In adittion, this Next JS project has the possibility of change the language of the app, that is consistent in the chatbot too in the language that chatbot will answer the questions, doubts or request.

**Bonus!** You've the option of change the language in the app since the header of the chatbot, howeever you can try to change the language of the chatbot by writing it in the chat. The chatbot will respond in the language you specify, providing a more personalized and versatile user experience.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

Create a .env file in the root of your project and add any necessary environment variables. In this repository you have the .env.example file for guidance.

## Usage

1. Run the development server:

```bash
   npm run dev
```

2. Access the app in: [http://localhost:4000](http://localhost:4000)

## API Endpoints

The API endpoints are at the moment just one:

- POST /api/copilotKit

This endpoint is used to interact with the agents, sending the user's message and receiving the chatbot's response.
Actually is linked with the component CopilotKit, where the runtimeUrl is set with this endpoint.

## Project Structure

The project structure is as follows:

1. Into the src folder:

- `app/`: Contains the layout, page, styles, fonts and API routes of the application.
- `components/`: Contains all the frontend components used in the application.
- `config/`: Contains the enviroment variables in an object.
- `helpers/`: Contains helper functions used in the application, at the moment, the one that gets the browser language for stablish as default in the app.
- `i18n/`: Contains the configuration of languages that will be used in the app, and the folder where the translations will set.
- `models/`: Contains the models used in the application, at the moment, the ones that define the structure of the agents.
- `services/`: Contains the services used in the application, like the calling of LLM's with Langchain, the current language in the app, and the nodes and settings of the graph agents.
- `utils/`: Contains utility functions and objects, like database that mocks the data that the agents will use to filter and compare the input data, constants for some labels and the theme based on Material UI.

2. Into the external foldes:

- `messages/`: Contains the different labels by language that the app will use.
- `public/`: Contains the public files of the app, like the images utilized.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

```
