export const companyAccountPath = {
  post: {
    tags: ["Sign Up"],
    summary: "Create a new company",
    description: "Create a new company",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/companyAccount"
          },
        },
      },
    },
    responses: {
      200: {
        description: "Company created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/companyModel",
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
      500: {
        $ref: "#/components/serverError"
      }
    },
  },
}