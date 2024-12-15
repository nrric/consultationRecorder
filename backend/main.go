package main

import (
	"backend/handler"
	"backend/service"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	err := os.MkdirAll("./uploads", os.ModePerm)
	if err != nil {
		fmt.Println("Error creating uploads directory:", err)
		return
	}

	Service := service.Service{
		TTSClient:          service.TTSClient{},          // Mock Text to Speach model
		ConsultationClient: service.ConsultationClient{}, // Mock llm: text -> consultation model
	}
	Handler := handler.Handler{
		Service: Service,
	}

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	router.POST("/uploadAudio", Handler.UploadAudio)

	router.Run()
}
