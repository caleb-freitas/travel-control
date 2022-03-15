export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Travel Control",
    description:
      "This is an API created to control the travels of an ore ore transport company",
    contact: {
      name: "Caleb Freitas",
      email: "calebfreitas@tutanota.com",
      url: "https://www.linkedin.com/in/caleb-freitas/",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    servers: [
      {
        url: "/api",
        description: "Main server",
      },
    ],
    paths: {
      "/company/signup": {
        post: {
          tags: ["Companies"],
          summary: "Create a new company",
          description: "Create a new company",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    passwordConfirmation: {
                      type: "string",
                    },
                    cnpj: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Company created",
            },
          },
        },
      },
    },
  },
};
