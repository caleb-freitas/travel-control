export const addTravelPath = {
  post: {
    parameters: [
      {
        name: "x-access-token",
        in: "header",
        description: "Company access token",
        required: true,
        schema: {
          type: "string"
        }
      },
      {
        name: "driver_id",
        in: "path",
        description: "Driver id",
        required: true,
        schema: {
          type: "string"
        }
      },
      {
        name: "truck_id",
        in: "path",
        description: "Truck id",
        required: true,
        schema: {
          type: "string"
        }
      }],
    tags: ["Travel"],
    summary: "Create a new travel",
    description: "Create a new travel",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/travelParams"
          },
        },
      },
    },
    responses: {
      200: {
        description: "Travel created",
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