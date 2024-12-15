package handler

import (
	"github.com/gin-gonic/gin"
)

func (h Handler) UploadAudio(c *gin.Context) {

	notes := c.PostForm("notes")

	file, _ := c.FormFile("audio")
	if file == nil {
		c.JSON(400, gin.H{"error": "No file uploaded"})
		return
	}

	text, err := h.Service.ProcessAudio(c, file, notes)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error saving file: " + err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Audio uploaded successfully", "filename": file.Filename, "consultationRecording": text})
}
