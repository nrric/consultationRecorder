package service

import (
	"mime/multipart"

	"github.com/gin-gonic/gin"
)

// MOCK Text to speach client
type TTSClient struct {
}

func (c TTSClient) TranscribeFromReader(ctx *gin.Context, file *multipart.FileHeader, config interface{}) (string, error) {
	// AssemblyAi handles transcription
	return "Transcribed data...", nil
}

// This is a mock function used to show logical step
// The purpose of this function is to take the raw audio from the consultation and turn it into text
func (s Service) AudioToText(ctx *gin.Context, file *multipart.FileHeader) (string, error) {

	// To do this assemblyAI can be used https://www.assemblyai.com/blog/golang-speech-recognition/
	text, err := s.TTSClient.TranscribeFromReader(ctx, file, nil)
	if err != nil {
		return "", err
	}

	return text, nil
}
