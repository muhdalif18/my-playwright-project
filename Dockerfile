# Use the official Playwright image (includes browsers + dependencies)
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# For CI or headless mode
ENV CI=true

# Command to run the tests when the container starts
CMD ["npx", "playwright", "test"]
