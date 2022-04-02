export const companyAccountPath = {
  post: {
    tags: ["Sign up"],
    summary: "Create a new company",
    description: "Create a new company",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/companyParams"
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
              $ref: "#/schemas/companyResult",
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