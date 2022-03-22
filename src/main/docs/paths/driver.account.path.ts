export const driverAccountPath = {
  post: {
    tags: ["Sign Up"],
    summary: "Create a new driver",
    description: "Create a new driver",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/driverAccount"
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
              $ref: "#/schemas/driverModel",
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