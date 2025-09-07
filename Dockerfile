# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Production runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# The server listens on PORT
ENV PORT=3000
EXPOSE 3000

# Copy the Nitro output only
COPY --from=build /app/.output ./.output

# Runtime envs for Nuxt public runtimeConfig
# Provide at `docker run` or compose; defaults are safe placeholders
ENV API_URL="https://www.omdbapi.com"
ENV OMDB_API_KEY="CHANGE_ME"

CMD ["node", ".output/server/index.mjs"]

