# Use the official Go image as a build stage
FROM golang:1.23.5-alpine AS builder
LABEL org.opencontainers.image.source="https://github.com/Arinji2/imagee"

# Install build dependencies for CGO 
RUN apk add --no-cache gcc musl-dev 

# Set the working directory
WORKDIR /app

# Copy and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Enable CGO and build with static linking
ENV CGO_ENABLED=1 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-linkmode=external -extldflags=-static" -o main .

# Use a minimal runtime image
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the compiled binary
COPY --from=builder /app/main .

# Run the binary
CMD ["./main"]
