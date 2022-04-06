export const driverAccountPath = {
  post: {
    tags: ["Signup"],
    summary: "Create a new driver",
    description: "Create a new driver",
    parameters: [
      {
        name: "company_id",
        in: "path",
        description: "Company id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/driverParams"
          },
        },
      },
    },
    responses: {
      200: {
        description: "Driver created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/driverResult",
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