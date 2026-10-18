/**
 * My AI Workspace - Core JavaScript Engine
 * Tailored for IMCA Second-Year Student
 * Features:
 * - Persistent Tools link management (localStorage)
 * - 10 Curated Academic, Python & Career Prompt Library
 * - Instant Prompt Search & Category Filtering
 * - One-click Copy with Toast Notification feedback
 * - Knowledge Base with Real File / Link addition and management
 * - Projects Tracker (Builds 1-6) with editable statuses and link storage
 */

// ==========================================
// 1. DATA: INITIAL TOOLS
// ==========================================
const DEFAULT_TOOLS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    badge: "Reasoning & Writing",
    avatar: "🤖",
    desc: "Versatile conversational model for explaining abstract concepts, drafting study plans, generating quizzes, and rapid code prototyping.",
    defaultUrl: "https://chatgpt.com",
    storageKey: "tool_url_chatgpt"
  },
  {
    id: "gemini",
    name: "Gemini Notebook",
    vendor: "Google AI / NotebookLM",
    badge: "Source Grounding",
    avatar: "📓",
    desc: "Grounded study assistant ideal for synthesizing lecture PDFs, syllabus slides, and textbook chapters into revision notes without hallucinations.",
    defaultUrl: "https://notebooklm.google.com",
    storageKey: "tool_url_gemini"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    vendor: "Perplexity AI",
    badge: "Live Web & Citations",
    avatar: "🔍",
    desc: "Citation-first research engine that indexes real-time technical documentation, academic papers, and current industry trends with verifiable sources.",
    defaultUrl: "https://www.perplexity.ai",
    storageKey: "tool_url_perplexity"
  },
  {
    id: "antigravity",
    name: "Antigravity",
    vendor: "Google DeepMind",
    badge: "Agentic Engineering",
    avatar: "🚀",
    desc: "Next-generation agentic AI coding workspace for automated full-stack software development, Python refactoring, debugging, and project architecture.",
    defaultUrl: "https://antigravity.google",
    storageKey: "tool_url_antigravity"
  }
];

// ==========================================
// 2. DATA: 10 CURATED REUSABLE PROMPTS
// ==========================================
const PROMPTS_DATA = [
  {
    id: 1,
    name: "Academic Concept Breakdown (Feynman Technique)",
    category: "Academic",
    bestTool: "ChatGPT / Gemini",
    whenToUse: "When learning a complex syllabus topic for the first time or clarifying confusing lecture concepts.",
    notes: "Direct the model to break abstract jargon into physical analogies and verify understanding through a 2-minute memory hook.",
    template: `Act as a Senior Computer Science Professor and AI Mentor. Explain the concept of [CONCEPT / TOPIC] to an IMCA second-year student.

Structure your response:
1. High-Level Intuition (Explain in simple terms using a real-world everyday analogy).
2. Formal Academic Definition & Core Theoretical Principles.
3. Architecture / Flow Breakdown (Provide a clean ASCII diagram or structured table).
4. Top 3 Common Pitfalls or Misconceptions evaluated in university exams.
5. A quick 2-minute memory hook to recall this concept during tests.`
  },
  {
    id: 2,
    name: "High-Yield Exam Revision Notes & Cheat Sheet",
    category: "Exam Prep",
    bestTool: "Gemini Notebook",
    whenToUse: "2 to 3 days prior to mid-term or semester exams to condense voluminous textbooks into high-yield points.",
    notes: "Feed your syllabus PDF or lecture slide notes into Gemini Notebook / NotebookLM as the source ground for zero hallucination.",
    template: `You are an academic exam specialist preparing a high-yield study sheet for [SUBJECT NAME], specifically Unit/Chapter: [CHAPTER NAME].

Extract and organize:
1. Top 5 Frequently Asked Exam Questions (short definition & 5-mark long answer formats).
2. Key Formulas, Theorems, Axioms, and Definitions that carry direct scoring weight.
3. Comparison Matrix: Create a markdown table contrasting [TOPIC A] vs [TOPIC B].
4. 5 'Must-Include' technical keywords that university evaluators check for.
Format in clean, bulleted, scannable markdown.`
  },
  {
    id: 3,
    name: "Numerical & Algorithmic Step-by-Step Solver",
    category: "Problem Solving",
    bestTool: "ChatGPT / Gemini",
    whenToUse: "For discrete math, statistical computations, algorithm recurrence relations, and quantitative aptitude.",
    notes: "Insist on step-by-step arithmetic substitutions so you can identify exactly where your manual calculation differed.",
    template: `Solve the following numerical or algorithmic problem step-by-step:
Problem Statement: [PASTE NUMERICAL PROBLEM / ALGORITHM INPUT]

Requirements:
1. State given parameters and explicitly define target variables.
2. State the underlying mathematical formulas or algorithmic recurrences used.
3. Show all intermediate substitution and algebraic steps (do not skip steps).
4. Present the final verified result with correct units or Big-O time/space complexity.
5. Provide a sanity check or boundary condition to confirm the solution's validity.`
  },
  {
    id: 4,
    name: "Self-Assessment Diagnostic Quiz Generator",
    category: "Quiz & Recall",
    bestTool: "ChatGPT",
    whenToUse: "At the end of a study session to test active recall before moving to the next syllabus module.",
    notes: "Forces retrieval practice. Keeps answer key hidden at the bottom so you can self-evaluate without peeking.",
    template: `Create a 10-question self-diagnostic quiz on [TOPIC / CHAPTER] designed for IMCA 2nd Year exams.

Distribution:
- 5 Multiple Choice Questions (MCQs) with subtle distractor options testing edge cases.
- 3 Short Answer technical questions (2-3 marks weightage).
- 2 Code output prediction / tracing questions (in Python or pseudocode).

IMPORTANT: Provide the complete Answer Key with pedagogical explanations at the very bottom in a separate section labeled 'ANSWER KEY - DO NOT PEEK'.`
  },
  {
    id: 5,
    name: "Active Recall & Spaced Repetition Flashcards",
    category: "Flashcards",
    bestTool: "Gemini Notebook / ChatGPT",
    whenToUse: "Daily spaced repetition drills for memorizing syntax, definitions, and protocol standards.",
    notes: "Formatted strictly as Question and atomic Answer for direct import into Anki, Quizlet, or digital index cards.",
    template: `Generate 12 high-impact active recall flashcards for [TOPIC / SUBJECT].
Format each flashcard strictly as:

Q: [Clear, single-concept prompt testing understanding rather than passive recognition]
A: [Concise, atomic answer highlighting the primary technical keyword in bold]

Focus on:
- Formal definitions & acronyms
- Time & Space complexities
- Critical design trade-offs
- Syntax nuances & common exceptions`
  },
  {
    id: 6,
    name: "Academic Deep-Dive & Cited Literature Research",
    category: "Research",
    bestTool: "Perplexity",
    whenToUse: "Preparing technical seminar reports, academic presentations, or scoping innovative project ideas.",
    notes: "Leverages Perplexity's live indexing to supply verifiable links to research papers, conference proceedings, and docs.",
    template: `Conduct an academic research survey on [AI / COMPUTER SCIENCE TOPIC].

Provide:
1. Current State of the Art (SOTA) and recent advancements (2024–2026).
2. Leading Frameworks, Models, and benchmark comparisons.
3. Real-world industry applications and case studies.
4. Key technical challenges, ethical considerations, and open research questions.
5. Primary citations and authoritative paper references (ArXiv, IEEE, ACM, official GitHub documentation).`
  },
  {
    id: 7,
    name: "Structured Multi-Level Document Summarizer",
    category: "Summarization",
    bestTool: "Gemini Notebook",
    whenToUse: "Digesting voluminous academic papers, research PDFs, or complex software technical specifications.",
    notes: "Particularly powerful when uploading PDF sources into NotebookLM to keep summaries strictly grounded.",
    template: `Analyze and synthesize the provided document: [PASTE TEXT OR ATTACH PDF]

Structure the summary into:
1. Executive Abstract: The central thesis and core problem in 3 concise sentences.
2. 5 Key Findings / Methodological Breakthroughs: Prioritized bullet points.
3. Technical Architecture: How the system or methodology is structured.
4. Practical Implications: What this means for an undergraduate developer building software.
5. Critical Evaluation: Any stated limitations or assumptions.`
  },
  {
    id: 8,
    name: "Python Code Review, PEP 8 & Complexity Audit",
    category: "Python",
    bestTool: "Antigravity / ChatGPT",
    whenToUse: "Before submitting programming lab assignments, pushing commits to GitHub, or solving LeetCode/HackerRank problems.",
    notes: "Provides actionable feedback on time complexity, edge cases, exception handling, and clean idiomatic Python 3.",
    template: `Review the following Python code for an IMCA coursework / portfolio project:

\`\`\`python
[PASTE PYTHON CODE HERE]
\`\`\`

Provide a rigorous technical review:
1. Bug Detection & Edge Cases: Identify any logical flaws, runtime errors, or unhandled null/empty inputs.
2. Idiomatic Refactoring (PEP 8): Suggest cleaner Python constructs (list comprehensions, generator expressions, type hints).
3. Algorithmic Complexity: Analyze current Time and Space complexity (Big-O) and propose optimizations.
4. Robustness & Clean Architecture: Exception handling and docstrings.
5. Provide the complete refactored, production-ready Python code.`
  },
  {
    id: 9,
    name: "High-Conversion Internship Outreach & Email",
    category: "Career",
    bestTool: "ChatGPT",
    whenToUse: "Writing cold emails to tech recruiters, software engineering alumni, or university research professors.",
    notes: "Keep under 180 words. Personalize the bracketed sections with specific projects or publications.",
    template: `Draft a professional, compelling outreach email seeking a [SOFTWARE / AI INTERNSHIP / RESEARCH ASSISTANTSHIP].

Details:
- Recipient: [NAME, TITLE] at [COMPANY / UNIVERSITY]
- My Profile: Second-year IMCA student proficient in Python, Data Structures, and Generative AI applications.
- Highlighted Work: [MENTION 1-2 HANDS-ON BUILDS, e.g., AI Workspace, Prompt Chain Engine]
- Request: A brief 15-minute introductory call or consideration for upcoming internship cycles.

Requirements:
- Subject Line: Provide 3 high-open-rate options.
- Tone: Confident, articulate, respectful, concise (under 180 words).
- Zero fluff or generic praise; focus on demonstrated competence and alignment.`
  },
  {
    id: 10,
    name: "Software Architecture & Milestone Project Planner",
    category: "Planning",
    bestTool: "Antigravity",
    whenToUse: "Starting a new semester software project, hackathon project, or capstone portfolio build.",
    notes: "Translates abstract ideas into a week-by-week delivery roadmap with defined deliverables and tech choices.",
    template: `Develop an end-to-end technical project implementation plan for:
Project Title / Goal: [PROJECT IDEA, e.g., Personal AI Knowledge Engine]
Target Timeline: 4 Weeks (IMCA semester project / portfolio showcase).

Generate:
1. System Architecture: Recommended tech stack (Frontend, Backend, Database, AI API integration) and data flow.
2. Sprint Breakdown:
   - Week 1: Requirements specification, data schemas & development environment setup.
   - Week 2: Core functional logic & API connectivity.
   - Week 3: AI enhancement, prompt chaining & edge-case testing.
   - Week 4: UI polish, responsive styling, documentation & GitHub README.
3. Potential Blockers & Mitigation Strategies.`
  }
];

// ==========================================
// 3. DATA: INITIAL KNOWLEDGE BASE SECTIONS
// ==========================================
const DEFAULT_KNOWLEDGE_SECTIONS = [
  {
    id: "kb-build2",
    title: "Build 2: Personal Prompt Playbook",
    icon: "📘",
    desc: "Curated repository of prompt engineering patterns, few-shot examples, and system instructions for daily academic work.",
    resourcesKey: "kb_resources_build2",
    defaultResources: [
      {
        title: "Build 2 _ Personal Prompt Playbook.pdf",
        url: "Build 2 _ Personal Prompt Playbook.pdf",
        type: "Local Coursework File"
      }
    ]
  },
  {
    id: "kb-build3",
    title: "Build 3: Personal AI Study Kit",
    icon: "🎓",
    desc: "Structured notes and revision frameworks built using Gemini Notebook and NotebookLM for active recall and exam prep.",
    resourcesKey: "kb_resources_build3",
    defaultResources: [
      {
        title: "Build 3 _ Personal Prompt Playbook (1).pdf",
        url: "Build 3 _ Personal Prompt Playbook  (1).pdf",
        type: "Local Coursework File"
      }
    ]
  },
  {
    id: "kb-build5",
    title: "Build 5: 10-Step Prompt Chain — Python Basics",
    icon: "🐍",
    desc: "Sequential 10-step AI prompting pipeline to learn, debug, and test core Python programming concepts from syntax to OOP.",
    resourcesKey: "kb_resources_build5",
    defaultResources: [
      {
        title: "Build 5 _ Design a 10-Step Prompt Chain.pdf",
        url: "Build 5 _ Design a 10-Step Prompt Chain.pdf",
        type: "Local Coursework File"
      }
    ]
  },
  {
    id: "kb-academic",
    title: "Academic Notes & Learning Resources",
    icon: "📚",
    desc: "Central repository for semester lecture notes, university syllabus documents, Python cheat sheets, and research papers.",
    resourcesKey: "kb_resources_academic",
    defaultResources: [
      {
        title: "Build 1 _ Comparison of AI tools.pdf",
        url: "Build 1 _  Comparison of AI tools.pdf",
        type: "Local Coursework File"
      }
    ]
  }
];

// ==========================================
// 4. DATA: 6 PROJECT TRACKER BUILDS
// ==========================================
const DEFAULT_PROJECTS = [
  {
    id: "build1",
    num: "Build 1",
    title: "AI Tools Comparison",
    desc: "Comprehensive evaluation matrix comparing ChatGPT, Gemini Notebook, Perplexity, and Antigravity across speed, reasoning, coding, and academic research.",
    defaultStatus: "Completed",
    defaultLink: "Build 1 _  Comparison of AI tools.pdf",
    storageKeyStatus: "proj_status_build1",
    storageKeyLink: "proj_link_build1"
  },
  {
    id: "build2",
    num: "Build 2",
    title: "Personal Prompt Playbook",
    desc: "A systematic library of parameterized prompts covering Feynman concept explainers, numerical solvers, and exam cheat-sheet generation.",
    defaultStatus: "Completed",
    defaultLink: "Build 2 _ Personal Prompt Playbook.pdf",
    storageKeyStatus: "proj_status_build2",
    storageKeyLink: "proj_link_build2"
  },
  {
    id: "build3",
    num: "Build 3",
    title: "Personal AI Study Kit",
    desc: "An end-to-end active recall revision system combining NotebookLM source grounding, Anki-ready flashcard generation, and mock exam quizzes.",
    defaultStatus: "Completed",
    defaultLink: "Build 3 _ Personal Prompt Playbook  (1).pdf",
    storageKeyStatus: "proj_status_build3",
    storageKeyLink: "proj_link_build3"
  },
  {
    id: "build4",
    num: "Build 4",
    title: "Career Starter Pack",
    desc: "Professional career toolkit including an ATS-compliant technical resume, cold outreach templates, internship tracker, and AI interview prep prompts.",
    defaultStatus: "In Progress", // Explicit requirement: Mark Build 4 as In Progress until completed
    defaultLink: "Build 4 _ Career Starter Pack.pdf",
    storageKeyStatus: "proj_status_build4",
    storageKeyLink: "proj_link_build4",
    featured: true
  },
  {
    id: "build5",
    num: "Build 5",
    title: "10-Step Prompt Chain",
    desc: "A progressive 10-step chained prompting architecture guiding students from fundamental Python data structures to algorithmic problem solving and unit testing.",
    defaultStatus: "Completed",
    defaultLink: "Build 5 _ Design a 10-Step Prompt Chain.pdf",
    storageKeyStatus: "proj_status_build5",
    storageKeyLink: "proj_link_build5"
  },
  {
    id: "build6",
    num: "Build 6",
    title: "Personal AI Operating System",
    desc: "A unified, responsive personal dashboard integrating AI tools, reusable prompt engineering libraries, knowledge assets, and project lifecycle tracking.",
    defaultStatus: "In Progress",
    defaultLink: "index.html",
    storageKeyStatus: "proj_status_build6",
    storageKeyLink: "proj_link_build6"
  }
];

// ==========================================
// 5. APPLICATION INITIALIZATION & DOM BINDINGS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTools();
  initPrompts();
  initKnowledgeBase();
  initProjects();
  initQuickStats();
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add("show");

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// ==========================================
// AREA 1: TOOLS INITIALIZATION
// ==========================================
function initTools() {
  const container = document.getElementById("tools-container");
  if (!container) return;

  container.innerHTML = "";

  DEFAULT_TOOLS.forEach((tool) => {
    const savedUrl = localStorage.getItem(tool.storageKey) || tool.defaultUrl;

    const card = document.createElement("div");
    card.className = "tool-card";
    card.setAttribute("data-tool", tool.id);

    card.innerHTML = `
      <div>
        <div class="tool-top">
          <div class="tool-avatar">${tool.avatar}</div>
          <div class="tool-name-wrap">
            <h3>${tool.name}</h3>
            <span class="tool-tag">${tool.badge} • ${tool.vendor}</span>
          </div>
        </div>
        <p class="tool-desc">${tool.desc}</p>
      </div>

      <div class="tool-link-group">
        <div class="tool-link-label">Destination URL</div>
        <div class="link-input-row">
          <input 
            type="text" 
            class="link-input" 
            id="url-input-${tool.id}" 
            value="${escapeHtml(savedUrl)}" 
            placeholder="https://..."
            aria-label="${tool.name} URL"
          />
          <a 
            href="${escapeHtml(savedUrl)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-open-link" 
            id="open-link-${tool.id}"
            title="Launch ${tool.name}"
          >
            Launch ↗
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);

    // Event listener for user modifying tool link
    const inputEl = card.querySelector(`#url-input-${tool.id}`);
    const openBtn = card.querySelector(`#open-link-${tool.id}`);

    inputEl.addEventListener("input", (e) => {
      const newUrl = e.target.value.trim();
      localStorage.setItem(tool.storageKey, newUrl);
      openBtn.href = newUrl.startsWith("http") || newUrl.startsWith("/") ? newUrl : `https://${newUrl}`;
    });
  });
}

// ==========================================
// AREA 2: PROMPT LIBRARY INITIALIZATION
// ==========================================
let currentActiveFilter = "All";
let currentSearchQuery = "";

function initPrompts() {
  const container = document.getElementById("prompts-container");
  const searchInput = document.getElementById("prompt-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container) return;

  function renderPrompts() {
    container.innerHTML = "";

    const query = currentSearchQuery.toLowerCase().trim();

    const filtered = PROMPTS_DATA.filter((p) => {
      const matchesFilter =
        currentActiveFilter === "All" ||
        p.category.toLowerCase().includes(currentActiveFilter.toLowerCase()) ||
        (currentActiveFilter === "Python" && p.category === "Python") ||
        (currentActiveFilter === "Academic" && (p.category === "Academic" || p.category === "Numerical Problems"));

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.bestTool.toLowerCase().includes(query) ||
        p.whenToUse.toLowerCase().includes(query) ||
        p.template.toLowerCase().includes(query) ||
        p.notes.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-dim); background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-muted);">No matching prompts found</p>
          <p style="font-size: 0.85rem;">Try adjusting your search terms or selecting 'All' categories.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((prompt) => {
      const card = document.createElement("div");
      card.className = "prompt-card";

      card.innerHTML = `
        <div class="prompt-header">
          <div class="prompt-title-wrap">
            <h4>${prompt.name}</h4>
            <span class="prompt-category-badge">${prompt.category}</span>
          </div>
          <span class="prompt-best-tool" title="Recommended AI Model">⚡ ${prompt.bestTool}</span>
        </div>

        <div class="prompt-meta">
          <div class="meta-row"><strong>When to use:</strong> ${prompt.whenToUse}</div>
        </div>

        <div class="prompt-template-box" id="template-${prompt.id}">${escapeHtml(prompt.template)}</div>

        <div class="prompt-notes">
          <strong>Note:</strong> ${prompt.notes}
        </div>

        <div class="prompt-actions">
          <button class="btn-copy" data-id="${prompt.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Template</span>
          </button>
          <span style="font-size: 0.72rem; color: var(--text-dim);">Best in: <strong>${prompt.bestTool.split("/")[0].trim()}</strong></span>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach copy button logic
    container.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const promptObj = PROMPTS_DATA.find((p) => p.id == id);
        if (promptObj) {
          navigator.clipboard.writeText(promptObj.template).then(() => {
            const span = btn.querySelector("span");
            const originalText = span.textContent;
            btn.classList.add("copied");
            span.textContent = "Copied!";
            showToast(`Copied "${promptObj.name}" to clipboard!`);
            setTimeout(() => {
              btn.classList.remove("copied");
              span.textContent = originalText;
            }, 1800);
          });
        }
      });
    });
  }

  // Search input event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderPrompts();
    });
  }

  // Filter button clicks
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentActiveFilter = btn.getAttribute("data-category") || "All";
      renderPrompts();
    });
  });

  renderPrompts();
}

// ==========================================
// AREA 3: KNOWLEDGE BASE INITIALIZATION
// ==========================================
function initKnowledgeBase() {
  const container = document.getElementById("knowledge-container");
  if (!container) return;

  container.innerHTML = "";

  DEFAULT_KNOWLEDGE_SECTIONS.forEach((sec) => {
    const card = document.createElement("div");
    card.className = "knowledge-section-card";
    card.id = `sec-${sec.id}`;

    // Load persisted resources or fallback
    let resources = [];
    try {
      const stored = localStorage.getItem(sec.resourcesKey);
      resources = stored ? JSON.parse(stored) : [...sec.defaultResources];
    } catch (e) {
      resources = [...sec.defaultResources];
    }

    card.innerHTML = `
      <div class="k-header">
        <div class="k-icon">${sec.icon}</div>
        <div>
          <h4>${sec.title}</h4>
        </div>
      </div>
      <p class="k-desc">${sec.desc}</p>

      <ul class="resource-list" id="res-list-${sec.id}"></ul>

      <form class="add-resource-form" id="form-${sec.id}">
        <div class="add-res-row">
          <input 
            type="text" 
            class="input-res-title" 
            placeholder="File name or Resource Title" 
            required 
          />
        </div>
        <div class="add-res-row">
          <input 
            type="text" 
            class="input-res-url" 
            placeholder="Real File path or Web URL (e.g., ./Build 2.pdf or https://...)" 
            required 
          />
          <button type="submit" class="btn-add-resource">+ Add</button>
        </div>
      </form>
    `;

    container.appendChild(card);

    const listEl = card.querySelector(`#res-list-${sec.id}`);
    const formEl = card.querySelector(`#form-${sec.id}`);

    function renderList() {
      listEl.innerHTML = "";
      if (resources.length === 0) {
        listEl.innerHTML = `
          <div class="empty-resource-state">
            No files or links added yet.<br>Add your real coursework documents below.
          </div>
        `;
        return;
      }

      resources.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "resource-item";
        li.innerHTML = `
          <div class="res-info">
            <span class="res-icon">📄</span>
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="res-title" title="${escapeHtml(item.title)}">
              ${escapeHtml(item.title)}
            </a>
          </div>
          <button class="btn-remove-res" data-index="${index}" title="Remove file reference">✕</button>
        `;

        li.querySelector(".btn-remove-res").addEventListener("click", () => {
          resources.splice(index, 1);
          localStorage.setItem(sec.resourcesKey, JSON.stringify(resources));
          renderList();
          showToast(`Removed "${item.title}"`);
        });

        listEl.appendChild(li);
      });
    }

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = formEl.querySelector(".input-res-title");
      const urlInput = formEl.querySelector(".input-res-url");

      const title = titleInput.value.trim();
      const url = urlInput.value.trim();

      if (title && url) {
        resources.push({ title, url, type: "User Resource" });
        localStorage.setItem(sec.resourcesKey, JSON.stringify(resources));
        titleInput.value = "";
        urlInput.value = "";
        renderList();
        showToast(`Added real resource: "${title}"`);
      }
    });

    renderList();
  });
}

// ==========================================
// AREA 4: PROJECTS TRACKER INITIALIZATION
// ==========================================
function initProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  DEFAULT_PROJECTS.forEach((proj) => {
    const savedStatus = localStorage.getItem(proj.storageKeyStatus) || proj.defaultStatus;
    const savedLink = localStorage.getItem(proj.storageKeyLink) || proj.defaultLink;

    const card = document.createElement("div");
    card.className = `project-card ${proj.featured ? "featured-in-progress" : ""}`;
    card.id = `card-${proj.id}`;

    card.innerHTML = `
      <div class="project-top">
        <div>
          <span class="project-badge">${proj.num}</span>
          <h4>${proj.title}</h4>
        </div>
      </div>

      <p class="project-desc">${proj.desc}</p>

      <div class="project-controls">
        <div class="control-field">
          <div class="control-label">
            <span>Current Status</span>
            ${proj.id === "build4" && savedStatus === "In Progress" ? '<span style="color: #fbbf24; font-size: 0.68rem;">(Active Track)</span>' : ""}
          </div>
          <select class="select-status" id="status-${proj.id}" data-status="${savedStatus}">
            <option value="Not Started" ${savedStatus === "Not Started" ? "selected" : ""}>Not Started</option>
            <option value="In Progress" ${savedStatus === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Under Review" ${savedStatus === "Under Review" ? "selected" : ""}>Under Review</option>
            <option value="Completed" ${savedStatus === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </div>

        <div class="control-field">
          <div class="control-label">
            <span>Project File / Repo Link</span>
          </div>
          <div class="project-link-row">
            <input 
              type="text" 
              class="project-link-input" 
              id="link-${proj.id}" 
              value="${escapeHtml(savedLink)}" 
              placeholder="e.g. Build 1.pdf or https://github.com/..." 
            />
            <a 
              href="${escapeHtml(savedLink)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-open-proj" 
              id="btn-open-${proj.id}"
            >
              Open ↗
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);

    const selectEl = card.querySelector(`#status-${proj.id}`);
    const linkInput = card.querySelector(`#link-${proj.id}`);
    const openBtn = card.querySelector(`#btn-open-${proj.id}`);

    selectEl.addEventListener("change", (e) => {
      const newStatus = e.target.value;
      localStorage.setItem(proj.storageKeyStatus, newStatus);
      selectEl.setAttribute("data-status", newStatus);
      showToast(`${proj.title} marked as "${newStatus}"`);
      initQuickStats();
    });

    linkInput.addEventListener("input", (e) => {
      const newLink = e.target.value.trim();
      localStorage.setItem(proj.storageKeyLink, newLink);
      openBtn.href = newLink;
    });
  });
}

// Quick Dashboard Stats Updater
function initQuickStats() {
  const statCompleted = document.getElementById("stat-completed");
  const statInProgress = document.getElementById("stat-inprogress");
  const statPrompts = document.getElementById("stat-prompts");

  if (statPrompts) {
    statPrompts.textContent = PROMPTS_DATA.length;
  }

  let completedCount = 0;
  let inProgressCount = 0;

  DEFAULT_PROJECTS.forEach((proj) => {
    const status = localStorage.getItem(proj.storageKeyStatus) || proj.defaultStatus;
    if (status === "Completed") completedCount++;
    if (status === "In Progress") inProgressCount++;
  });

  if (statCompleted) statCompleted.textContent = `${completedCount}/6`;
  if (statInProgress) statInProgress.textContent = inProgressCount;
}

// Helper: Escape HTML to avoid XSS
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
