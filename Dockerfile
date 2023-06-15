FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8000

ENV PORT 8000

CMD ["node", "server.js"]