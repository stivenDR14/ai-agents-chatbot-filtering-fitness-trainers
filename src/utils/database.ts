export const younngerTarget =
  "Conseguir que los usuarios agenden sesiones de entrenamiento con entrenadores especializados en fitness, adaptados a sus necesidades y objetivos y/o se suscriban a un plan de sesiones de entrenamiento donde los usuarios estarian motivados por el acompañamiento del nutricionista y las sesiones de ejercicio.";
export const younngerProcess =
  "Provide a link from which, based on specific data about location, available hours and fitness specialties, the user will be redirected to a list of trainers filtered based on the criteria established in their request.";

export const callToActionQuestion =
  "Where would you like to train, in person or online, and in what time slot? - To find a trainer that meets your needs, which modality between in-person and virtual do you prefer, for which area of ​​Bogotá and for what time slot? - To help you find one or more trainers, what other specialties would you like us to filter for? - You can also optionally provide how many sessions you want to attend to train per week";

export const topicRelatedForCallToAction =
  "the user has a question or doubt about the fitness, wellness and/or health, could be about the best specialities for improve the muscle mass, how to get a vegetarian diet that allows to loss weigth, how many times do I need to do Joga for increase the concentration and these related things. At the end, try to hook him up to the process that consist in: " +
  younngerProcess +
  ". Finally the target of the user when is done the process is: " +
  younngerTarget +
  ". Always finish the response with a question that welcomes the user to the process. This question should be related with this examples:" +
  callToActionQuestion;

export const schemeData = {
  locations: "string[]",
  specialities: "string[]",
  timeOfDay: "string[]",
  mode: "string[]",
  sessionAmount: "string[]",
};

export const recommendedKey = Object.keys(schemeData)[1];

export const keyToReturnByItem = {
  [Object.keys(schemeData)[0]]: "id",
  [Object.keys(schemeData)[1]]: "id",
  [Object.keys(schemeData)[2]]: "id",
  [Object.keys(schemeData)[3]]: "id",
  [Object.keys(schemeData)[4]]: "id",
};

export const keyForFilterByItem = {
  [Object.keys(schemeData)[0]]: "name",
  [Object.keys(schemeData)[1]]: "name",
  [Object.keys(schemeData)[2]]: "name",
  [Object.keys(schemeData)[3]]: "name",
  [Object.keys(schemeData)[4]]: "name",
};

export const utils = {
  [Object.keys(schemeData)[0]]: [
    { id: 1, name: "Usaquen" },
    { id: 2, name: "Chapinero" },
    { id: 3, name: "Santa Fe" },
    { id: 4, name: "San Cristobal" },
    { id: 5, name: "Usme" },
    { id: 6, name: "Tunjuelito" },
    { id: 7, name: "Kennedy" },
    { id: 8, name: "Fontibon" },
    { id: 9, name: "Bosa" },
    { id: 10, name: "Engativa" },
    { id: 11, name: "Suba" },
    { id: 12, name: "Barrios Unidos" },
    { id: 13, name: "Teusaquillo" },
    { id: 14, name: "Los Martires" },
    { id: 15, name: "Antonio Narino" },
    { id: 16, name: "Puente Aranda" },
    { id: 17, name: "Candelaria" },
    { id: 18, name: "Rafael Uribe Uribe" },
    { id: 19, name: "Ciudad Bolivar" },
    { id: 20, name: "Sumapaz" },
    { id: 21, name: "Cota" },
    { id: 22, name: "Chia" },
    { id: 23, name: "Mosquera" },
    { id: 24, name: "Calera" },
    { id: 25, name: "Cajica" },
    { id: 26, name: "Soacha" },
  ],

  [Object.keys(schemeData)[1]]: [
    { id: 1, name: "Boxeo" },
    { id: 2, name: "Entrenamiento funcional" },
    { id: 3, name: "Fisioterapia" },
    { id: 4, name: "Ejercicio especializado para embarazadas" },
    { id: 5, name: "Entrenamiento con pesas" },
    { id: 6, name: "Kick boxing" },
    { id: 7, name: "Baile" },
    { id: 8, name: "Zumba" },
    { id: 9, name: "Running" },
  ],

  [Object.keys(schemeData)[2]]: [
    { id: 0, name: "Madrugada" },
    { id: 1, name: "Mañana" },
    { id: 2, name: "Medio dia" },
    { id: 3, name: "Tarde" },
    { id: 4, name: "Noche" },
  ],

  [Object.keys(schemeData)[3]]: [
    { id: 1, name: "Presencial" },
    { id: 2, name: "Virtual" },
  ],

  [Object.keys(schemeData)[4]]: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ],

  FITNESS_OBJECTIVES: [
    {
      id: 0,
      name: "Ninguno",
      description:
        "No tiene un objetivo específico en mente y/o solo quiere entrenar por diversión, salud o bienestar general",
      specialities: [],
    },
    {
      id: 1,
      name: "Bajar de peso",
      description:
        "Reducir el peso corporal, enfocándose en la disminución del porcentaje de grasa mientras se mantiene o mejora la masa muscular",
      specialities: [
        "Boxeo",
        "Entrenamiento funcional",
        "Entrenamiento con pesas",
        "Kick boxing",
        "Baile",
        "Zumba",
        "Running",
      ],
    },
    {
      id: 2,
      name: "Aumentar masa muscular",
      description:
        "Incrementar el porcentaje de masa muscular de forma controlada, mejorando la composición corporal general mediante entrenamiento de resistencia progresivo",
      specialities: ["Entrenamiento con pesas"],
    },
    {
      id: 3,
      name: "Tonificar",
      description:
        "Mejorar la definición muscular y la firmeza del cuerpo sin necesariamente aumentar el tamaño muscular",
      specialities: [
        "Boxeo",
        "Entrenamiento funcional",
        "Entrenamiento con pesas",
        "Kick boxing",
        "Running",
      ],
    },
    {
      id: 4,
      name: "Dormir mejor",
      description:
        "Optimizar la calidad y duración del sueño para mejorar la recuperación y el bienestar general",
      specialities: [
        "Boxeo",
        "Entrenamiento funcional",
        "Kick boxing",
        "Baile",
        "Zumba",
        "Running",
      ],
    },
    {
      id: 5,
      name: "Mejorar la técnica",
      description:
        "Perfeccionar la ejecución de los ejercicios para maximizar los beneficios y reducir el riesgo de lesiones",
      specialities: [
        "Boxeo",
        "Entrenamiento funcional",
        "Fisioterapia",
        "Kick boxing",
        "Baile",
        "Running",
      ],
    },
    {
      id: 6,
      name: "Mejorar la recuperación",
      description:
        "Optimizar los procesos de regeneración muscular y energética entre sesiones de entrenamiento, lo que a su vez mejora la resistencia física al permitir entrenamientos más frecuentes e intensos con menor fatiga acumulada",
      specilities: ["Fisioterapia"],
    },
    {
      id: 7,
      name: "Ejercicio en embarazo y post parto",
      description:
        "Adaptar la actividad física de manera segura y efectiva durante el embarazo y después del parto para mantener la salud de la madre y el bebé",
      specialities: ["Ejercicio especializado para embarazadas"],
    },
  ],

  HOURS_ID_BY_INTERVAL: {
    // hours id by interval
    0: [1, 2, 3, 4, 5],
    1: [6, 7, 8],
    2: [9, 10],
    3: [11, 12, 13, 14],
    4: [15, 16, 17, 18, 19, 20, 21],
  },
};

export const dataForExtraction = {
  name: "dataForExtraction",
  description:
    "This tool is used to get the data that user is asking for and agrupate it in a structured way",
  parameters: {
    title: "getDataSchema",
    type: "object",
    properties: {
      [Object.keys(schemeData)[0]]: {
        title: "Zona por localidades de Bogotá",
        someOf: [
          {
            enum: [
              "Usaquen",
              "Chapinero",
              "Santa Fe",
              "San Cristobal",
              "Usme",
              "Tunjuelito",
              "Kennedy",
              "Fontibon",
              "Bosa",
              "Engativa",
              "Suba",
              "Barrios Unidos",
              "Teusaquillo",
              "Los Martires",
              "Antonio Narino",
              "Puente Aranda",
              "Candelaria",
              "Rafael Uribe Uribe",
              "Ciudad Bolivar",
              "Sumapaz",
              "Cota",
              "Chia",
              "Mosquera",
              "Calera",
              "Cajica",
              "Soacha",
            ],
          },
        ],
        description:
          "Unicas zonas posibles en las que se encuentra el entrenador, si no es alguna de ellas, no establecer ninguna. Si el usuario pide todas las opciones posibles, brindar un array con cada opción enumerada. Solo un array de opciones es aceptado",
      },
      [Object.keys(schemeData)[1]]: {
        title: "Especialidades de entrenadores",
        someOf: [
          {
            enum: [
              "Boxeo",
              "Entrenamiento funcional",
              "Fisioterapia",
              "Ejercicio especializado para embarazadas",
              "Entrenamiento con pesas",
              "Kick boxing",
              "Baile",
              "Zumba",
              "Running",
            ],
          },
        ],
        description: `Unicas especialidades posibles de los entrenadores, a menos que el usuario suministre opciones similares ('nadado' lo conviertes a natación, 'pelea' lo conviertes a boxeo, y asi sucesivamente). si no es alguna de ellas, no establecer ninguna. Si el usuario pide todas las opciones posibles, brindar un array con cada opción enumerada. Solo un array de opciones es aceptado`,
      },
      [Object.keys(schemeData)[2]]: {
        title: "Tiempos del dia",
        someOf: [
          { enum: ["Madrugada", "Mañana", "Medio dia", "Tarde", "Noche"] },
        ],
        description: `Unicos tiempos del dia aceptados:\
        - Madrugada: si el usuario establece horas entre las 4 am y las 9 am.\
        - Mañana: si el usuario establece horas entre las 9 am y las 12 pm.\
        - Medio dia: si el usuario establece horas entre las 12 pm y las 2 pm.\
        - Tarde: si el usuario establece horas entre las 2 pm y las 6 pm.\
        - Noche: si el usuario establece horas entre las 6 pm y la 1 am.\
        Si no es alguna de ellas, no establecer ninguna. Si el usuario pide todas las opciones posibles, brindar un array con cada opción enumerada. Solo un array de opciones es aceptado`,
      },
      [Object.keys(schemeData)[3]]: {
        title: "Modalidad",
        someOf: [{ enum: ["presencial", "virtual"] }],
        description:
          "Modalidad de entrenamiento que el usuario prefiere, si no es alguna de ellas, no establecer ninguna. Solo un array de opciones es aceptado",
      },
      [Object.keys(schemeData)[4]]: {
        title: "Cantidad de sesiones por semana",
        someOf: [
          {
            enum: ["1", "2", "3", "4", "5"],
          },
        ],
        description:
          "Cantidad de sesiones a las que el usuario quiere acudir por semana. Solo un array de opciones es aceptado",
      },
      ommittedData: {
        title: "Datos omitidos",
        type: "array",
        description:
          "Indica si hay datos omitidos en la extracción de datos, a causa de que no coinciden con el modelo o no se encuentran en el array de 'enum' de las opciones posibles, y en un array de strings, se brinda la información de los datos omitidos en la extracción, agregando al array el parametro al que se supone pertenecian",
      },
    },
    required: ["location", "specialities", "timeOfDay", "mode"],
  },
};

const optionsParameter = "Las opciones para el parametro de";

const optionsSelected = "Las opciones que seleccionaste para el parametro de";

const greaterThanAllowed =
  "son mayores que la cantidad permitida de items, es decir a lo mucho";

const lessThanAllowed =
  "son menores que la cantidad necesaria de items, es decir al menos";

export const fieldLabels = {
  [Object.keys(schemeData)[0]]: "Zonas por localidades de Bogotá",
  [Object.keys(schemeData)[1]]: "Especialidades de entrenadores",
  [Object.keys(schemeData)[2]]: "Tiempos del dia",
  [Object.keys(schemeData)[3]]: "Modalidad",
  [Object.keys(schemeData)[4]]: "Cantidad de sesiones por semana",
};

export const validations = {
  [Object.keys(schemeData)[0]]: [
    {
      max: 3,
      message: `${optionsSelected} ${
        fieldLabels[Object.keys(schemeData)[0]]
      } ${greaterThanAllowed} 3`,
    },
    {
      min: 1,
      message: `${optionsParameter} ${
        fieldLabels[Object.keys(schemeData)[0]]
      } ${lessThanAllowed} 1`,
    },
  ],
  [Object.keys(schemeData)[1]]: [
    {
      max: 3,
      message: `${optionsSelected} ${
        fieldLabels[Object.keys(schemeData)[1]]
      } ${greaterThanAllowed} 3`,
    },
    {
      min: 1,
      message: `${optionsParameter} ${
        fieldLabels[Object.keys(schemeData)[1]]
      } ${lessThanAllowed} 1`,
    },
  ],
  [Object.keys(schemeData)[2]]: [
    {
      min: 1,
      message: `${optionsParameter} ${
        fieldLabels[Object.keys(schemeData)[2]]
      } ${lessThanAllowed} 1`,
    },
  ],
  [Object.keys(schemeData)[3]]: [
    {
      min: 1,
      message: `${optionsParameter} ${
        fieldLabels[Object.keys(schemeData)[3]]
      } ${lessThanAllowed} 1, entre las opciones de Presencial o Virtual`,
    },
    {
      max: 1,
      message: `${optionsSelected} ${
        fieldLabels[Object.keys(schemeData)[3]]
      } ${greaterThanAllowed} 1`,
    },
  ],
  [Object.keys(schemeData)[4]]: [
    {
      min: 1,
      message: `${optionsParameter} ${
        fieldLabels[Object.keys(schemeData)[4]]
      } ${lessThanAllowed} 1, entre las opciones de 1,2,3,4 o 5 sesiones por semana`,
    },
    {
      max: 1,
      message: `${optionsSelected} ${
        fieldLabels[Object.keys(schemeData)[4]]
      } ${greaterThanAllowed} 1`,
    },
  ],
};

export const organizationName = "Younnger";
export const processInformation = `a conversational form chatbot that collects data, analyzes it, and provides links with sorted params or information. The information is managed by the process and configured by '${organizationName}' and this data won't share with third parties. for more information about the organization, you can ask for it. Even if you want to know about specific page in the organization ask for it. ask him questions like: ${callToActionQuestion}, with the objective of ${younngerTarget}`;
export const organizationInformation = `Youngger is the name of the company, which defines itself as a web platform that connects trainers specialized in certain areas of fitness with people who seek to improve their health and well-being. At the moment it is only available in the city of Bogotá but will soon be able to cover other cities in Colombia.
It has plans of 4, 8, 12, 16 and 20 monthly sessions with up to two different specialties. The trainers are selected for their experience and knowledge in the area, and they adapt to the needs and objectives of each user. In addition, each subscription includes a personalized nutrition plan and follow-up to that same nutritional plan.
`;

export const linkForProcess = `https://app.younnger.com/filter-trainers?`;
