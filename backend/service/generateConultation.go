package service

import (
	"fmt"
	"mime/multipart"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func (s Service) ProcessAudio(ctx *gin.Context, file *multipart.FileHeader, notes string) (string, error) {

	// Full solution could link this to a database record through uuid of some kind
	// Depending on the size of the files created the database record could point to some cloud storage
	//   while storing some basic information about the record
	fileName := strings.Split(time.Now().String(), " ")[0]

	outFile, err := os.Create("./uploads/" + fileName)
	if err != nil {
		return "", err
	}
	defer outFile.Close()

	err = ctx.SaveUploadedFile(file, outFile.Name())
	if err != nil {
		return "", err
	}

	consultationRawText, err := s.AudioToText(ctx, file)
	if err != nil {
		return "", err
	}

	consultationText, err := s.TextToConsultation(consultationRawText, notes)
	if err != nil {
		return "", err
	}

	err = os.WriteFile("./uploads/"+fileName+"Text", []byte(consultationText), 0644)
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return consultationText, err
	}

	return consultationText, nil
}
