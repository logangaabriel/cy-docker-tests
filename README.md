# Cypress Tests with Docker

This repository sets up End-to-End (E2E) tests using [Cypress](https://www.cypress.io/) and Docker. The provided Dockerfile creates a consistent, isolated environment, ensuring tests run the same way locally and in CI/CD pipelines.

## Requirements

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (Latest version)
- [Node.js](https://nodejs.org/) (Optional, only needed if running tests outside Docker)

## Project Structure

Here's the basic project layout:

```
/cypress
  └── e2e
      └── TODO.cy.js        # Your Cypress test file
Dockerfile                  # Dockerfile for creating the Cypress test image
package.json                # Manages npm dependencies and scripts
package-lock.json           # Ensures consistent dependencies
```

## Dockerfile Overview

This is the Dockerfile used to set up the testing environment:

```dockerfile
FROM cypress/factory

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci --silent

COPY . .

CMD ["npm", "run", "cy:run"]
```

### Dockerfile Steps:

1. **Base Image**:  
   - We use `cypress/factory`, a minimal image with the necessary dependencies for Cypress.

2. **Working Directory**:  
   - Sets `/app` as the working directory in the container.

3. **Install Dependencies**:  
   - Copies `package.json` and `package-lock.json` and installs dependencies with `npm ci --silent`.

4. **Copy Files**:  
   - Copies project files into the container.

5. **Run Command**:  
   - The container runs `npm run cy:run` to start Cypress tests.

## Running Tests

### 1. Build the Docker Image

First, build the Docker image:

```bash
docker build -t cypress-tests .
```

### 2. Run the Tests

Then, run the tests with:

```bash
docker run --rm cypress-tests
```

This command runs the tests in a temporary container and removes it afterward.

## Development Tips
- **npm Scripts**: Ensure `cy:run` is defined in your `package.json`:

```json
{
  "scripts": {
    "cy:run": " npx cypress run"
  }
}
```

## Additional Resources

- [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress)
- [Docker documentation](https://docs.docker.com/)

