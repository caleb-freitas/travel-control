export const truckPath = {
  post: {
    parameters: [{
      name: "x-access-token",
      in: "header",
      description: "Company access token",
      required: true,
      schema: {
        type: "string"
      }
    }],
    tags: ["Truck"],
    summary: "Create a new truck",
    description: "Create a new truck",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/truckParams"
          },
        },
      },
    },
    responses: {
      200: {
        description: "Truck created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/truckResult",
            }
          }
        }
      },
      400: {
        $ref: "#/components/badRequest"
      },
      403: {
        $ref: "#/components/forbidden"
      },
      404: {
        $ref: "#/components/notFound"
      },
      500: {
        $ref: "#/components/serverError"
      }
    },
  },
}