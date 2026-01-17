# AI Chatbot - Knowledge Base & Customization Guide

## Key Improvements
1. **Hinglish Support**: Understands mix of Hindi and English (e.g., "paisa", "ghar", "kaise ho").
2. **Context Awareness**: Remembers what you asked last to provide better follow-up answers.
3. **Repetition Detection**: Prevents the bot from sending identical messages repeatedly.
4. **Premium UI**: Modern appearance with smooth animations and better typography.

## Current Knowledge Base

### Topics Covered:
1. **Greetings** - Welcome messages
2. **Services** - What Bharat Properties offers
3. **Properties** - Available listings and cities
4. **Locations** - Cities where you operate
5. **Pricing** - Budget ranges
6. **Amenities** - Features in projects
7. **Contact** - Phone, email, office details
8. **Site Visits** - Scheduling tours
9. **RERA** - Legal compliance
10. **Home Loans** - Bank partnerships

## How It Works

### Intent Detection
The chatbot analyzes customer messages for keywords:
- "price" → Shows pricing information
- "property" → Lists available properties
- "visit" → Explains site visit process
- "loan" → Provides loan information

### Quick Replies
Pre-defined buttons for common questions:
- Show properties
- Price range
- Schedule visit
- Contact details

## Customization

### 1. Update Contact Information
In `Chatbot.jsx`, find the `contact` response and update:
```javascript
contact: "📞 Contact Us:\n\nPhone: YOUR_PHONE\nEmail: YOUR_EMAIL\nOffice: YOUR_ADDRESS"
```

### 2. Add New Topics
Add to `KNOWLEDGE_BASE`:
```javascript
newTopic: ['keyword1', 'keyword2', 'keyword3']
```

Add response in `RESPONSES`:
```javascript
newTopic: "Your detailed response here"
```

### 3. Update Cities/Locations
Modify the `properties` and `location` responses with your actual cities.

### 4. Update Bank List
In the `loan` response, add/remove banks as per your partnerships.

### 5. Change Pricing Ranges
Update the `price` response with your actual price ranges.

## Advanced Features (Future Enhancements)

### Option 1: Connect to Real API
Replace the knowledge base with actual API calls to your CRM:
```javascript
const response = await fetch('/api/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message: userInput })
});
```

### Option 2: AI Integration
Integrate with OpenAI or Google Gemini for more intelligent responses:
```javascript
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userInput }]
});
```

### Option 3: Lead Capture
Add form fields to collect customer information:
- Name
- Phone
- Email
- Budget
- Preferred location

## Styling

### Change Colors
In the component, update:
- `backgroundColor: 'var(--color-primary)'` - Main color
- `backgroundColor: 'var(--color-accent)'` - User message color

### Change Position
Currently bottom-left. To move to bottom-right:
```javascript
style={{
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',  // Changed from left
    // ...
}}
```

## Analytics (Recommended)

Track chatbot usage:
1. Most asked questions
2. Conversation length
3. Conversion rate
4. Popular topics

This helps improve responses and understand customer needs.

## Best Practices

1. **Keep responses concise** - Mobile users prefer short answers
2. **Use emojis** - Makes conversation friendly
3. **Provide options** - Give users clear next steps
4. **Update regularly** - Add new projects, update prices
5. **Test thoroughly** - Try different question phrasings

## Next Steps

1. Update contact information with your actual details
2. Add your real project names and locations
3. Test with common customer questions
4. Consider adding lead capture form
5. Track which questions are most common
6. Expand knowledge base based on actual queries
