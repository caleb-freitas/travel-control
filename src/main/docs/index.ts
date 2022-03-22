import components from "./components"
import paths from "./paths"
import schemas from "./schemas"

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
  },
  servers: [
    {
      url: "/api",
      description: "Main server",
    },
  ],
  tags: [
    {
      name: "Sign Up",
      description: "Sign up related APIs"
    }
  ],
  paths,
  schemas,
  components
}
