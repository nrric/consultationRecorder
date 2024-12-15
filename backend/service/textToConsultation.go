package service

// MOCK LLM that allows for text to be analysed and
type ConsultationClient struct {
}

type Prompt string

// These represent engineered prompt stubs that allow for llm prompt to be configured
var (
	Format        Prompt = "Seperate each issue, number and stating what they are"
	Solution      Prompt = "List all discussed solutions explicitly and then list actioned solutions explicitly"
	OngoingAction Prompt = "List the needed action and its accompanied priority"
	Note          Prompt = "These are important things to note. Please add these notes to this file where is appropriate"
)

func (c ConsultationClient) ToConsultation(text string, notes string, prompts []Prompt) (string, error) {
	// This combined the notes added by a docter with a Prompt related specifically to notes.
	// The idea behind this is so that notes are always handled in the same way by the llm
	if notes != "" {
		notes = string(Note) + notes
	}

	// This adds the ability to add an arbitrary number of prompts to the start of a request
	// By doing this users can configure the style of the consultations that are created to some degree
	// e.g. add a prompt that always adds a header to a consultation with location information, always
	// uses a certain spelling of a word, shortens different terminology in different ways
	for _, prompt := range prompts {
		text = string(prompt) + "\n" + text
	}

	// Send llm generated prompt+text and get back the consultation note in response

	llmResponse := `Clients name is Nic, 
		Issue 1: shoulder pain in his left shoulder. 
		Solutions discussed: stretching, weight training. 
		Solutions actioned: Stretching. 
		Needed action: Soft tissue scan, high priority` + notes

	return llmResponse, nil
}

// This is a mock function used to show logical step
// The purpose of this function is to take the raw transcript from the cosultation and format it
func (s Service) TextToConsultation(text string, notes string) (string, error) {

	llmResponse, err := s.ConsultationClient.ToConsultation(text, notes, []Prompt{Format, Solution, OngoingAction})
	if err != nil {
		return "", err
	}

	return llmResponse, nil
}
