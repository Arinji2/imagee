package env

import (
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Env struct {
	Token string
}

func loadEnv(envName string) string {
	val := os.Getenv(envName)
	if val == "" {
		log.Fatalf("Environment variable %s is empty", envName)
	}
	return val
}

func SetupEnv() *Env {
	log.Println("Loading environment variables...")
	token := loadEnv("TOKEN")

	log.Println("Environment variables loaded.")
	return &Env{
		Token: token,
	}
}
