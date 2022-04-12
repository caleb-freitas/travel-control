import components from "./components"
import paths from "./paths"
import schemas from "./schemas"

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Travel Control",
    description:
      "An application created to control the travels of an ore transport company",
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
      name: "Signup",
      description: "Signup related API"
    },
    {
      name: "Login",
      description: "Login related API"
    },
    {
      name: "Truck",
      description: "Truck related API"
    }
  ],
  paths,
  schemas,
  components
}
