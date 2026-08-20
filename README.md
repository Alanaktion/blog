# blog-chat

You've always wanted to have a Markov-chain based IM with a blog, right?

If I'm insane enough I might eventually extend this to a LoRA on a tiny open-weight LLM or something...

Build the model from whatever corpus text you want:

```bash
cat ../blog/content/**/*.md > corpus.txt
node build-bidi.js
```

There's a bidirectional and forward-only version, the chat works "best" with bidi (it's still intentionally terrible though).
