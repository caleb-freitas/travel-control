export const loginPath = {
  post: {
    tags: ["Login"],
    summary: "Log in a company or a driver",
    description: "Log in a company or a driver",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/loginParams"
          },
        },
      },
    },
    responses: {
      200: {
        description: "Company or driver authenticated",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/loginResult",
            }
          }
        }
      },
      400: {
        $ref: "#/components/badRequest"
      },
      401: {
        $ref: "#/components/unauthorized"
      },
      500: {
        $ref: "#/components/serverError"
      }
    },
  },
}
