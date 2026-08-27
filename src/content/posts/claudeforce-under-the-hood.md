---
title: "Claudeforce, Explained: What Actually Changes Under Agentforce's Hood"
date: "2026-08-28"
channel: "technical"
excerpt: "Salesforce and Anthropic just announced Claudeforce. Past the press-release language, here's what actually changes architecturally — and what doesn't."
coverImage: "/blog/claudeforce-architecture.svg"
coverImageAlt: "Diagram showing a request flowing from a user to the Atlas Reasoning Engine (Claude via Amazon Bedrock), to an MCP server enforcing sharing rules, to Salesforce actions like Flow, Apex, and Data Cloud."
---

On August 26, 2026, Salesforce and Anthropic announced Claudeforce — a partnership with two directions. Salesforce surfaces inside Claude as a plugin with prebuilt sales skills, and Claude becomes the default reasoning model inside Agentforce. The second one is the part worth understanding at an architecture level, because "we added a new AI model" undersells what's actually being swapped out.

## What the Reasoning Engine actually does

Agentforce's Atlas Reasoning Engine is the component that decides, at runtime, what an agent does next — which action to invoke, what parameters to pass it, when to ask a clarifying question instead of guessing. It's the planning layer, not the execution layer. The actions themselves — a Flow, an invocable Apex method, a Data Cloud query — stay exactly as they were. The Reasoning Engine just decides which one to call and with what inputs.

That distinction matters more than it sounds. Swapping the model behind the planning layer doesn't touch your existing Agent Actions, Flow definitions, or Apex, because the model was never the thing executing them — it's the thing deciding to call them. Under Claudeforce, Claude becomes the default model doing that deciding, across the Reasoning Engine, Agentforce Vibes, Agentforce Coworker, and Agent Builder.

## Where the model actually runs

The more interesting engineering detail is deployment, not branding. This isn't Salesforce calling out to a public Claude API. Claude runs via Amazon Bedrock, inside what Salesforce calls the Trust Boundary — the same perimeter that already governs where customer data can and can't travel. For anyone who's had the "can we even use this, we're in a regulated industry" conversation with a client, that's the answer to the first objection before it gets asked.

## How Salesforce data reaches Claude without bypassing governance

The connective piece is MCP — the Model Context Protocol, an open standard for how an AI runtime discovers and calls external tools and data sources, instead of every vendor building bespoke one-off integrations. Salesforce exposes objects, workflows, and business logic to Claude through MCP servers, APIs, and CLI tooling.

The detail worth sitting with as an architect: permission enforcement happens on the Salesforce side of that boundary, not the model side. If a user doesn't have field-level access to a record, the MCP server doesn't return it — full stop, before Claude ever sees it. Sharing rules, profiles, permission sets: none of that gets reinvented for the AI layer. It's the same governance model doing the same job it's always done, just fronted by a different interface.

![Diagram showing a request flowing from a user to the Atlas Reasoning Engine (Claude via Amazon Bedrock), to an MCP server enforcing sharing rules, to Salesforce actions like Flow, Apex, and Data Cloud.](/blog/claudeforce-architecture.svg)

## What's confirmed, and what's still open

A few things worth flagging plainly rather than glossing over. No specific Claude model version has been named publicly. Billing is structured as two separate invoices — one from Salesforce for platform and API consumption, one from Anthropic for inference — which is a real cost-of-ownership conversation to have with a client before assuming a flat per-seat number. And the rollout is staged: select pilot customers now, an open beta in September 2026, with more prebuilt skills for other business functions landing later in the year.

## The take

None of this is a rebuild. If your Agent Actions are already invocable, permission-aware, and testable independent of any particular model, Claudeforce is a reasoning-layer upgrade that should slot in underneath what you've built — not a reason to rearchitect it. The thing actually worth double-checking on any client's org isn't the model. It's whether your existing actions have clean, minimal, unambiguous input schemas. A better reasoning model doesn't fix an action that was ambiguous to begin with.
