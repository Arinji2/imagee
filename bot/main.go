package main

import (
	"log"

	"github.com/arinji2/imagee-bot/bot"
	"github.com/arinji2/imagee-bot/env"
)

func main() {
	env := env.SetupEnv()

	discordBot, err := bot.NewBot(env.Token)
	if err != nil {
		log.Panicf("Cannot create bot: %v", err)
	}
	discordBot.Run()
}
