---
title: "CampusCompanion: AI-Powered Course Recommendation Chatbot"
category: "AI/ML"
startDate: 2024-01-29
endDate: 2024-01-29
publishedAt: 2024-01-29
summary: "🎓 Building an intelligent course recommendation system using LLMs and RAG to help university students make better academic decisions"
tags:
  - LLM
  - RAG
  - Python
  - Django
  - Vue.js
banner: /images/banner/posts/compus-companion-high-resolution-logo.webp
alt: "CampusCompanion"
---

# CampusCompanion: AI-Powered Course Recommendation Chatbot

Course selection can be overwhelming for university students. With numerous options available and complex prerequisites to navigate, making the right choice isn't always straightforward. That's where CampusCompanion comes in - an intelligent course recommendation system that leverages Large Language Models (LLMs) and Retrieval Augmented Generation (RAG) to provide personalized academic guidance.

## The Challenge

At the University of Toronto, students face several challenges when selecting courses:
- Limited customization for individual interests and goals
- Overwhelming number of options
- Complex prerequisites and requirements
- Time constraints with academic advisors

## Our Solution

CampusCompanion addresses these challenges through a three-phase approach:

![piepline](/images/posts/campuscompanion/pipeline.png)

### 1. Q&A Phase
- Uses LangChain to facilitate dynamic conversations
- Extracts relevant information about the student's background
- Can process transcripts and resumes for additional context
- Builds comprehensive student profiles

### 2. Search Phase
- Leverages ChromaDB for efficient course data retrieval
- Uses chain-of-thought reasoning to generate optimized search queries
- Filters results based on academic level and department
- Returns top 30 most relevant courses

### 3. Recommendation Phase
- Narrows down to 10 best candidates based on detailed criteria
- Provides final top 5 recommendations with relevance scores
- Includes detailed justifications for each recommendation
- Ensures recommendations align with prerequisites and academic level

## Technical Implementation

The system is built using:
- Backend: Django with LangChain for LLM integration
- Frontend: Vue.js for responsive UI
- Database: ChromaDB for vector search capabilities
- LLM: GPT-4 for natural language understanding and generation

### Data Processing
- Parsed 5,768 course descriptions from various academic calendars
- Created structured dataset with course codes, descriptions, prerequisites
- Mapped courses to departments and study years
- Built separate collections for undergraduate and graduate courses

## Results and Evaluation

The system was evaluated using multiple metrics:

### Quantitative Results
- Consistency Score: **8.33/10** for profile summarization (GPT-4)
- Recall Rate: **37.7%** for predicting actual course selections
- Hit Ratio: **87.5%** for recommendation relevance
- NDCG@5: **0.96** showing strong ranking performance

### Qualitative Insights
Through manual evaluation of 30 different scenarios, we found:
- Strong performance for standard academic paths
- Good handling of interdisciplinary requests
- Room for improvement in edge cases
- High user satisfaction with recommendation explanations

## Key Learnings

1. RAG Integration
- Critical importance of proper data preprocessing
- Need for distinct undergraduate/graduate course collections
- Value of department context in search queries

2. LLM Prompting
- Chain-of-thought reasoning improves search quality
- Structured output formats enhance recommendation clarity
- Context window management is crucial for processing course descriptions

3. System Architecture
- Multiple search layers could improve recommendation precision
- Department-agnostic search could benefit interdisciplinary recommendations
- Dynamic context handling improves recommendation relevance

## Future Improvements

1. Enhanced Search Capabilities
- Implement multi-layered search strategy
- Add support for cross-departmental recommendations
- Improve handling of prerequisite chains

2. User Experience
- Add explanation of alternative course paths
- Implement feedback loop for recommendation improvement
- Add support for long-term academic planning

3. Data Integration
- Include historical enrollment patterns
- Add course review and rating data
- Integrate real-time course availability

## Conclusion

CampusCompanion demonstrates the potential of AI-powered academic advising. By combining LLMs with structured course data and intelligent search, we can provide students with personalized, accessible guidance for their academic journey. The system's strong performance metrics and positive user feedback suggest a promising direction for the future of academic planning tools.

The project code and documentation are available on [GitHub](your-repo-link).