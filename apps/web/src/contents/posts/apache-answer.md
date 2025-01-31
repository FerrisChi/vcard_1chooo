---
title: "Journey into Open Source: Adding Recommendation for Apache Answer"
category: "project"
startDate: 2024-06-21
endDate: 2024-09-16
publishedAt: 2025-01-21
summary: "🎓 Building an intelligent course recommendation system using LLMs and RAG to help university students make better academic decisions"
tags:
  - GO
  - Typescript
  - React
  - Open Source
banner: /images/banner/posts/apache-answer.webp
alt: "Open source journey with Apache Answer"
---

# Journey into Open Source: Adding Recommendation Feature for Apache Answer

[Apache Answer](https://answer.apache.org/) is a Q&A platform software for teams at any scales. Whether it’s a community forum, help center, or knowledge management platform, you can always count on Answer.
I want to share my experience contributing to this vibrant community by developing a personalized recommendation feature in support of OSPP 2024.

## The Feature: Enhancing User Experience

Our project aimed to enhance Apache Answer's question-answer platform by adding personalized content recommendations. The goal was simple yet impactful: users can discover questions they might be interested in answering or exploring based on their interests and behavior with a new "Recommend" filter button on the question list. This feature would analyze user tag preferences and interaction history to make relevant suggestions.

![A demo of Recommendation feature](/images/posts/apache-answer/button.png)

## Implementation Breaking Down

When I first looked at the requirements, I realized this wasn't just about adding a button - it was about understanding user needs and creating a feature that would make the platform more engaging. We approached the development in the following steps:

### Step 1: Foundation Work
- Fork the repo and create an issue [#1003](https://github.com/apache/answer/issues/1003) to make the propose.
- Get familiar with `controller`s, `service`s and `repo`s in the layered backend
- Identify data points to track: In this feature, user `activity`, `tag` and `question` services are included
- Set up API in `controller/question_controller:QuestionRecommendPage()` to handle recommendation requests

### Step 2: Core Feature Development
- Build the recommendation logic from `controller` to `repo`
- Implement behavior-based filtering for question matching
- UI integration in the question list that "Recommended" filter option only shows after user login

### Step 3: Debug, Test and Commit!
- Write go test script and creating testing samples to make sure the recommendation rule is strictly followed
- Test recommendation functionality against different database backend like `MySQL`, `PostgreSQL`, and `SQLite`
- Solve conflicts between local branch and `dev` branch, creating PR and wait for the issue to be `resolved`🎉🎉🎉

## Challenges & Solutions

### Recommendation Strategy

One significant hurdle in the development process was implementing efficient content filtering while maintaining good performance. 

We cherry-pick recommendation rules that can be performed by SQLs, which ensure the recommendations were both relevant and quick to load. Recommended questions for a certain user include:
1. Questions followed by that user.
2. Tag-specific questions: Questions with user-followed tags but he/she has not participated in (either by asking or answering that question).

An example SQL query for the target question list is like:
```sql
SELECT DISTINCT question.*
FROM `question`
INNER JOIN `tag_rel` ON question.id = tag_rel.object_id
INNER JOIN `tag` ON tag.id = tag_rel.tag_id
WHERE (
    (
        (question.user_id != ?)
        AND (question.id NOT IN (SELECT question_id FROM answer WHERE user_id = ?))
        AND (tag_rel.status = ?)
        AND `tag`.`id` IN (?,?)
    )
    OR question.id IN (?,?)
)
AND (question.show = ? and question.status = ?)
ORDER BY
    CASE WHEN question.id IN (?,?) THEN 0 ELSE 1 END,
    question.pin DESC,
    question.created_at DESC
LIMIT 20;
```

One possible optimization to sample query is to create a composite index on `question` and `tag_rel` table. Since it's a big decision to add the index, we focus only on the query itself. The subquery `question.id NOT IN (SELECT question_id FROM answer WHERE user_id = ?) can be rewritten as a LEFT JOIN` can be rewritten as a LEFT JOIN:

```sql
SELECT DISTINCT question.* 
FROM question
INNER JOIN tag_rel ON question.id = tag_rel.object_id
INNER JOIN tag ON tag.id = tag_rel.tag_id
LEFT JOIN answer ON question.id = answer.question_id 
  AND answer.user_id = ?
WHERE (
    (
        question.user_id != ?
        AND answer.question_id IS NULL
        AND tag_rel.status = ?
        AND tag.id IN (?,?)
    )
    OR question.id IN (?,?)
)
AND (question.show = ? and question.status = ?)
ORDER BY 
    CASE WHEN question.id IN (?,?) THEN 0 ELSE 1 END,
    question.pin DESC, 
    question.created_at DESC 
LIMIT 20;
```

### Paginated Recommendation List
Another challenge was implementing pagination for the recommendation list.
While existing question filters used a simple SQL query with pagination, our recommendation feature required more complex data structures that couldn't be handled with a single static SQL query. We solved this by implementing a dynamic query builder using `xorm builder`, which allowed us to construct flexible filtering conditions and adjust question sorting based on recommendation parameters like user-followed questions and user-followed tags.

To ensure reliability, we added comprehensive testing modules that verified different combinations of recommendation parameters, including various tag combinations, user interaction histories, and pagination settings. Along with other scripts running with `go test`, it helped us validate the query builder's behavior across diverse scenarios and catch edge cases early in development.


1. **Feature Integration**: I learned how to integrate new functionality into an existing codebase while maintaining consistency with the platform's architecture.

2. **User-Centric Development**: Every decision, from algorithm choice to UI design, was made with the end-user in mind.

## Future Improvements

The recommendation feature is now helping Apache Answer users discover relevant questions more easily. Future improvements include:
- Integrate a machine-learning based recommender system. [Gorse](https://gorse.io/) might be an excellent choice for its multi-source feature and multi-database support. It might serve as a plugin to unlock new possibilities to large communities.
- Adding more question filter options (Answer has 6 filters right now: `Newest`, `Active`, `Unanswered`, `Recommend`, `Frequent`, `Score`).
- (Hopefully) Improving recommendation performance for larger communities.

## Leanring & Advice

1. **Start with understanding**: Take time to understand the project's architecture and existing features before making changes. It'll be better if you can talk to someone who has contributed to this project, but gpt is always the best teacher at touch.

2. **Communicate clearly**: Document the code and explain your implementation decisions.

3. **Testing iteratively before going online**: Make sure to constantly tested and refined the feature based on different use cases and scenarios before deployment, or it takes uneccessary time and effort reverting back and redo the process.

## Working with the Community

I appreciate OSPP for providing this opportunity to collaborate with the Apache Answer community. Their support and feedback were invaluable throughout the development process. We discussed implementation details, shared testing results, and worked together to solve issues, which made my journey into the open source world delightful.