import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { DATA_API_KEY, APP_ID } = config();

const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "distros";
const COLLECTION = "list";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY 
  },
  body: ""
};

const getDistros = async ({ response }: { response: any }) => {
    try {
      const URI = `${BASE_URI}/find`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const allTodos = await dataResponse.json();
  
      if (allTodos) {
        response.status = 200;
        response.body = {
          success: true,
          data: allTodos,
        };
      } else {
        response.status = 500;
        response.body = {
          success: false,
          msg: "Internal Server Error",
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const getDistro = async ({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) => {
    const URI = `${BASE_URI}/findOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { id: parseInt(params.id) }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const distro = await dataResponse.json();
    
    if (distro) {
      response.status = 200;
      response.body = {
        success: true,
        data: distro,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No todo found",
      };
    }
  };

const addDistro = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = {
          success: false,
          msg: "No Data",
        };
      } else {
        const body = await request.body();
        const distro = await body.value;
        const URI = `${BASE_URI}/insertOne`;
        const query = {
          collection: COLLECTION,
          database: DATABASE,
          dataSource: DATA_SOURCE,
          document: distro
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        const { insertedId } = await dataResponse.json();
        
        response.status = 201;
        response.body = {
          success: true,
          data: distro,
          insertedId
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const updateDistro = async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      const body = await request.body();
      const { name,
        current_version,
        desktop_environment,
        package_manager,
        description } = await body.value;
      const URI = `${BASE_URI}/updateOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        filter: { id: parseInt(params.id) },
        update: { $set: { name,
            current_version,
            desktop_environment,
            package_manager,
            description } }
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const todoUpdated = await dataResponse.json();
      
      response.status = 200;
      response.body = { 
        success: true,
        todoUpdated 
      };
      
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const removeDistro = async ({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) => {
    try {
      const URI = `${BASE_URI}/deleteOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        filter: { id: parseInt(params.id) }
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const distroDeleted = await dataResponse.json();
  
      response.status = 201;
      response.body = {
        distroDeleted
      };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

export { 
    addDistro,
    getDistros,
    getDistro,
    updateDistro,
    removeDistro
};