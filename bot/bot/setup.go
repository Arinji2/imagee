package bot

import (
	"log"
	"os"
	"os/signal"
	"regexp"
	"strings"
	"syscall"

	"github.com/bwmarrin/discordgo"
)

type Bot struct {
	*discordgo.Session
}

func NewBot(token string) (*Bot, error) {
	var err error
	s, err := discordgo.New("Bot " + token)
	if err != nil {
		log.Fatalf("Invalid token: %v", err)
	}
	return &Bot{Session: s}, nil
}

func (b *Bot) Run() {
	log.Println("Starting bot...")

	b.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as: %v#%v", s.State.User.Username, s.State.User.Discriminator)

		err := s.UpdateStatusComplex(discordgo.UpdateStatusData{
			Activities: []*discordgo.Activity{
				{
					Name: "DM me a Custom Emoji to get started!",
					Type: discordgo.ActivityTypeGame,
					URL:  "https://imagee.arinji.com",
				},
			},
			Status: string(discordgo.StatusOnline),
		})
		if err != nil {
			log.Printf("Error setting presence: %v", err)
		}
	})

	b.AddHandler(messageCreate)

	b.Identify.Intents = discordgo.IntentsGuildMessages | discordgo.IntentsDirectMessages | discordgo.IntentsMessageContent

	err := b.Open()
	if err != nil {
		log.Fatalf("Failed to open connection to Discord Gateway: %v", err)
		return
	}

	log.Println("Bot is now running.")

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	log.Println("\nShutting down gracefully...")
	b.Close()
}

func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	channel, err := s.Channel(m.ChannelID)
	if err != nil {
		log.Printf("Error getting channel: %v", err)
		return
	}

	if channel.Type != discordgo.ChannelTypeDM {
		return
	}

	// Check if the message contains a colon (which might indicate an emoji)
	if !strings.Contains(m.Content, ":") {
		// If no colon, assume it might be a raw emoji ID
		s.ChannelMessageSend(m.ChannelID,
			`Hiya, use this link to continue with your Imagee Setup: https://cdn.discordapp.com/emojis/`+m.Content+`.webp. Don't know what's going on? Check out our website on https://imagee.arinji.com`)
		return
	}

	emojiRegex := regexp.MustCompile(`<:[a-zA-Z0-9_]+:(\d+)>`)
	matches := emojiRegex.FindStringSubmatch(m.Content)

	if len(matches) > 1 {
		emojiID := matches[1]
		s.ChannelMessageSend(m.ChannelID,
			`Hiya, use this link to continue with your Imagee Setup: https://cdn.discordapp.com/emojis/`+emojiID+`.webp. Don't know what's going on? Check out our FAQ: https://imagee.arinji.com/faq?emoji`)
	} else {
		s.ChannelMessageSend(m.ChannelID,
			`It seems as if you didn't send me a Custom Emoji, have questions? Check out our FAQ: https://imagee.arinji.com/faq?emoji`)
	}
}
