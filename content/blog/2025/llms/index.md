---
title: LLMs
date: 2025-03-22T16:26:58
description: Let's explore the state of LLMs in early 2025.
---

Let's explore the state of <abbr title="Large Language Models">LLMs</abbr> in early 2025. Everyone knows about ChatGPT, and while GPT4o is great, I'm far more interested in local LLMs I can run myself with my own hardware, software, and data.

I've tried a wide range of models, primarily on Apple Silicon, and overall I'm really impressed with the state of things. Meta's Llama really pushed things forward with its initial launch a while back, and set the precedent for their competitors. Llama 3 is great, and generally my preferred model for general chat and prose. Google's Gemma 3 is incredibly good, and feels competitive with larger reasoning models while being much faster. Qwen2.5 is generally useful as a local alternative to GitHub Copilot, and works well when integrated into VS Code with Continue.

Giving a PDF, text, or image file as additional input can be really powerful. With AI tools being used for so much automation these days, things like job applications are much more doable with proper use of LLMs. I'm certainly not advocating for lying about skills, mass applying, or any other broad automation, but if your resume and cover letter are going to be reviewed by an AI before a human, you should at least get Llama's take on your resume first!

## Llama

I find Llama especially good at creative writing tasks, particularly when I want to do brainstorming or roleplay conversations. Setting system params for a particular context is very effective for defining a "personality", and really shaping its responses.

I’ve used it to flesh out worldbuilding details simply by asking questions and letting it respond in character. It's fantastic for generating variations on themes, offering alternative ideas when I get stuck, or even just bouncing ideas off of.

My favorite Llama models:

- Llama 3.1 8B Instruct
  - Great at writing prose, but struggles with complex topics and questions. Often misses details of the prompt.

- Llama 3.2 3B
  - Remarkably fast, runs acceptably on basically any hardware. Good enough for general chat and prose, but really struggles with information accuracy and question understanding.

## Gemma

For more functional and instructional use cases, Gemma 3 is remarkable. I've found it better at prompt understanding than DeepSeek R1 distills, despite not being a reasoning model, and it's far faster than its competitors that have similar understanding properties.

There is a lot that it will refuse to do, and very easily triggers warnings and will add disclaimers and support information to a wide range of content. By default, it's not very useful for creative tasks, as nearly any fiction subject could appear too risky for it. Specifying a relevant system message can somewhat alleviate this, but I often find Llama more useful for creative prose.

- Gemma 3 4B Instruct
  - Handles complex questions incredibly well compared to Llama and even DeepSeek R1 distills, at a dramatically-improved token rate.
  - Really likes adding lots of Markdown formatting to responses, while Llama typically responds in plain text.
  - The image input handling is very good, able to discern lots of detail from images. It understands subjects, lighting, composition, and styles with the ability to discuss the image with all of that context.

## Qwen

Qwen's models are really nice. The 1.5B param Coder model is super lightweight, making it quite usable for local code autocomplete. The 3B param model is good enough to give reasonably-accurate larger code changes with the right prompts and context.

I highly recommend trying [Continue](https://docs.continue.dev/) for integrating local LLMs into VS Code. My MacBook Air is more than capable of replacing GitHub Copilot with Qwen2.5 on LM Studio/Ollama, with obvious advantages in cost and flexibility. It's not perfect, GitHub's integration is much better than Continue's, but the option to have a local, offline code assistant is very compelling. I've found it useful enough to be worth the implementation time.

I like using the general Instruct model for technical questions, though I could see myself fully moving over to Gemma 3 now that it's out. It's a nice balance between technical and creative, making it a good enough general use model, but with Llama and Gemma both available too, I'll likely not use it as much.

- Qwen2.5 Coder 1.5B
  - Incredibly fast model that's helpful for code autocomplete, but struggles with more complex code and questions.

- Qwen2.5 Coder 3B Instruct
  - Slightly slower than the 1.5B param model, but writes fairly usable code, especially when given enough context.

- Qwen2.5 7B Instruct
  - Solid middle ground between Llama and Gemma. It's fast enough, has good technical knowledge, and can answer questions well. Writes more literally than Llama's more casual responses, while being far less formal than Gemma.

---

If you have the hardware for it (and you very likely do!), you should definitely give local LLMs a try. Even on a fairly low-end PC, Llama 3.2 is quite useful and can run on a tiny amount of RAM. There are a huge number of models to try out, with many specialized use cases.