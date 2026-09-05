const categoryData = {
  ai:{title:"AI & Emerging Technologies",text:"AI can power smarter decisions, automate routine tasks and unlock human creativity. The future is less about replacing people and more about extending what people can do.",icon:"◈"},
  education:{title:"Future Education",text:"Learning can become personalised, immersive and available anywhere — combining human mentorship with adaptive digital tools.",icon:"◇"},
  healthcare:{title:"Digital Healthcare",text:"Connected devices, remote care and intelligent systems could help healthcare become more proactive, accessible and convenient.",icon:"♡"},
  work:{title:"Future of Work",text:"Human creativity and AI assistance can work together across remote, flexible and highly collaborative workplaces.",icon:"▣"},
  city:{title:"Smart Cities",text:"Sensors, clean energy, connected mobility and responsive public services can make cities more efficient and more human-centred.",icon:"⌂"},
  transport:{title:"Future Transportation",text:"Connected vehicles, intelligent public transport and cleaner mobility can make movement safer, faster and more sustainable.",icon:"▰"},
  sustainability:{title:"Sustainable Technology",text:"Technology can help optimise energy, water, waste and infrastructure while supporting a lower-impact future.",icon:"✦"},
  cyber:{title:"Cyber Safety",text:"As our lives become more connected, digital trust, privacy and security need to become everyday design principles.",icon:"⬡"}
};

const visionData = {
  education:["Learning Without Walls","Your future classroom follows curiosity, not geography — adaptive lessons, immersive simulations and human mentors work together."],
  healthcare:["Healthcare That Comes to You","Connected care helps people monitor wellbeing, access professionals remotely and receive support earlier."],
  city:["A City That Responds","Your city becomes a living network: cleaner energy, smarter transport and public services that respond to real needs."],
  work:["Human + AI Teams","Routine tasks fade into the background while people focus on creativity, judgement, empathy and meaningful problem-solving."],
  green:["Technology for a Living Planet","Digital systems help communities use energy, water and resources more intelligently while protecting natural ecosystems."],
  space:["Beyond the Horizon","AI, robotics and new propulsion technologies expand exploration while bringing new knowledge back to Earth."]
};

const responses = {
  education:"Education could become more personalised and flexible. AI may adapt practice to a learner's pace while teachers focus even more on mentorship, creativity and critical thinking.",
  smart:"A smart city uses connected infrastructure, data and automation to improve services such as transport, energy, safety and waste management — with privacy and inclusion built in.",
  healthcare:"AI can support healthcare through pattern detection, administrative automation, remote monitoring and decision support. Human professionals remain essential for judgement and care.",
  sustainability:"Technology can help optimise energy grids, reduce waste, monitor ecosystems and make infrastructure more efficient. The biggest impact comes when good design and policy work together.",
  work:"Future workplaces are likely to combine human strengths — empathy, creativity and judgement — with AI assistance for repetitive or data-heavy tasks.",
  cyber:"Start with strong unique passwords, two-factor authentication, software updates, careful link checking and limited sharing of personal information."
};

let currentSelectedCategory = "ai";

const categorySectionMap = {
  ai: "#home",
  education: "#education",
  healthcare: "#healthcare",
  work: "#work",
  city: "#smart-city",
  transport: "#future-cards",
  sustainability: "#sustainability",
  cyber: "#cyber"
};

document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentSelectedCategory = btn.dataset.category;
    const d=categoryData[currentSelectedCategory];
    document.querySelector("#pulseDetail .detail-icon").textContent=d.icon;
    document.querySelector("#pulseDetail h3").textContent=d.title;
    document.querySelector("#pulseDetail p").textContent=d.text;
  });
});

// Explore Now Button inside #pulseDetail
const explorePulseBtn = document.getElementById("explorePulseBtn");
if (explorePulseBtn) {
  explorePulseBtn.addEventListener("click", () => {
    const sectionId = categorySectionMap[currentSelectedCategory] || "#future-cards";
    const targetEl = document.querySelector(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
    
    const d = categoryData[currentSelectedCategory];
    if (nova && fab) {
      setTimeout(() => {
        nova.style.display = "flex";
        fab.style.display = "none";
        askNova(`Tell me more about the future of "${d.title}" and how technology will impact it over the next decade.`, false);
      }, 950);
    }
  });
}

document.querySelectorAll("[data-scroll]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
}));

const scoreEl=document.getElementById("score"), scoreBar=document.getElementById("scoreBar"), scoreMsg=document.getElementById("scoreMessage"), cyberBadge=document.getElementById("cyberBadge");

function updateScore(){
  let score=0;
  document.querySelectorAll("#questions input").forEach(i=>{if(i.checked)score+=Number(i.dataset.points)});
  scoreEl.textContent=`${score}/100`; 
  scoreBar.style.width=score+"%";
  
  if(score === 0) {
    scoreMsg.textContent = "Complete the checklist to calculate your digital resilience score.";
    if(cyberBadge) cyberBadge.textContent = "CYBER NOVICE 🛡️";
  } else if(score < 50) {
    scoreMsg.textContent = "High Risk: Enable 2FA, use unique passwords, and keep updates on.";
    if(cyberBadge) cyberBadge.textContent = "VULNERABLE ⚠️";
  } else if(score < 80) {
    scoreMsg.textContent = "Good Progress: A few more habits will make your setup resilient.";
    if(cyberBadge) cyberBadge.textContent = "CYBER DEFENDER 🛡️";
  } else {
    scoreMsg.textContent = "Excellent! You follow top-tier cyber security hygiene.";
    if(cyberBadge) cyberBadge.textContent = "CYBER SENTINEL ⚡";
  }
}
document.querySelectorAll("#questions input").forEach(i=>i.addEventListener("change",updateScore));

// Tab Switcher
document.querySelectorAll(".cyber-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".cyber-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    const content = document.getElementById(tab.dataset.tab);
    if(content) content.classList.add("active");
  });
});

// Ask NOVA for Security Plan
const askNovaSecurityBtn = document.getElementById("askNovaSecurity");
if(askNovaSecurityBtn) {
  askNovaSecurityBtn.addEventListener("click", () => {
    let currentScore = scoreEl ? scoreEl.textContent : "0/100";
    if(nova && fab) {
      nova.style.display = "flex";
      fab.style.display = "none";
      askNova(`My Cyber Safety score is ${currentScore}. What are the top 3 specific security actions I should take to protect my personal data?`, false);
    }
  });
}

// Password Strength Evaluator
const passInput = document.getElementById("passInput");
const togglePass = document.getElementById("togglePass");
const passMeterBar = document.getElementById("passMeterBar");
const passRating = document.getElementById("passRating");
const passCrackTime = document.getElementById("passCrackTime");

if(togglePass && passInput) {
  togglePass.addEventListener("click", () => {
    passInput.type = passInput.type === "password" ? "text" : "password";
    togglePass.textContent = passInput.type === "password" ? "👁️" : "🙈";
  });

  passInput.addEventListener("input", () => {
    const val = passInput.value;
    const hasLen = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasSym = /[^A-Za-z0-9]/.test(val);

    document.getElementById("ruleLen").className = hasLen ? "pass" : "";
    document.getElementById("ruleLen").textContent = (hasLen ? "✅" : "❌") + " 8+ characters";
    
    document.getElementById("ruleUpper").className = hasUpper ? "pass" : "";
    document.getElementById("ruleUpper").textContent = (hasUpper ? "✅" : "❌") + " Uppercase letter";

    document.getElementById("ruleNum").className = hasNum ? "pass" : "";
    document.getElementById("ruleNum").textContent = (hasNum ? "✅" : "❌") + " Number";

    document.getElementById("ruleSym").className = hasSym ? "pass" : "";
    document.getElementById("ruleSym").textContent = (hasSym ? "✅" : "❌") + " Special symbol (!@#$)";

    let score = 0;
    if (val.length > 0) score += Math.min(val.length * 4, 30);
    if (hasLen) score += 15;
    if (hasUpper) score += 15;
    if (hasNum) score += 20;
    if (hasSym) score += 20;

    passMeterBar.style.width = score + "%";

    if (val.length === 0) {
      passMeterBar.style.background = "#ff4d4d";
      passRating.textContent = "Type a password";
      passCrackTime.textContent = "-";
    } else if (score < 40) {
      passMeterBar.style.background = "#ff4d4d";
      passRating.textContent = "Weak 🔴";
      passCrackTime.textContent = "Instant / Few Seconds";
    } else if (score < 75) {
      passMeterBar.style.background = "#ffb84d";
      passRating.textContent = "Moderate 🟡";
      passCrackTime.textContent = "3 Days to 2 Months";
    } else {
      passMeterBar.style.background = "#35e6a3";
      passRating.textContent = "Very Strong 🟢";
      passCrackTime.textContent = "400+ Years (Brute-Force Resistant)";
    }
  });
}

// Phishing Simulator
const scenarios = [
  {
    sender: "From: security-alert@mybank-account-update.net",
    subject: "⚠️ Account Suspended: Action Required in 2 Hours",
    body: "Dear User, suspicious activity was detected on your account. Please log in immediately to restore access:<br><br><span class='phish-link'>http://login-mybank-security-verify.org/auth</span>",
    isPhishing: true,
    reason: "🚨 Phishing! Fake domain name (net/org instead of real bank) & urgent threat tactic."
  },
  {
    sender: "From: no-reply@accounts.google.com",
    subject: "Security Alert: New sign-in from Chrome on Windows",
    body: "Your Google Account was signed in to from a new Windows device. If this was you, you don't need to do anything.",
    isPhishing: false,
    reason: "✅ Legitimate! Authentic domain (google.com) and standard informative security alert with no suspicious link."
  },
  {
    sender: "From: prize-winner@global-lottery-gift.xyz",
    subject: "🎉 Congratulations! You won $50,000 USD",
    body: "You have been selected as the grand winner. Send your bank details & $50 processing fee to claim your reward now!",
    isPhishing: true,
    reason: "🚨 Phishing / Advance-Fee Scam! Unsolicited prize claim requiring bank details & fee payment."
  }
];

let currentPhishIdx = 0;
let scamScoreVal = 0;

function loadScenario(idx) {
  const s = scenarios[idx];
  document.getElementById("phishCount").textContent = `Scenario ${idx+1} of ${scenarios.length}`;
  document.getElementById("phishSender").textContent = s.sender;
  document.getElementById("phishSubject").textContent = s.subject;
  document.getElementById("phishBody").innerHTML = s.body;
  const fb = document.getElementById("phishFeedback");
  fb.style.display = "none";
  fb.className = "phish-feedback";
}

function handlePhishAnswer(userSaidPhish) {
  const s = scenarios[currentPhishIdx];
  const isCorrect = (userSaidPhish === s.isPhishing);
  const fb = document.getElementById("phishFeedback");
  
  if(isCorrect) {
    if(!fb.dataset.answered) scamScoreVal++;
    fb.className = "phish-feedback correct";
    fb.innerHTML = `<strong>Correct! 🎉</strong> ${s.reason}`;
  } else {
    fb.className = "phish-feedback wrong";
    fb.innerHTML = `<strong>Incorrect ❌</strong> ${s.reason}`;
  }
  fb.dataset.answered = "true";
  document.getElementById("scamScore").textContent = `${scamScoreVal}/${scenarios.length}`;

  setTimeout(() => {
    currentPhishIdx = (currentPhishIdx + 1) % scenarios.length;
    fb.dataset.answered = "";
    loadScenario(currentPhishIdx);
  }, 3500);
}

const btnLegit = document.getElementById("btnLegit");
const btnPhish = document.getElementById("btnPhish");
if(btnLegit && btnPhish) {
  btnLegit.addEventListener("click", () => handlePhishAnswer(false));
  btnPhish.addEventListener("click", () => handlePhishAnswer(true));
}

document.querySelectorAll("#futurePicker button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const [title,text]=visionData[btn.dataset.vision];
    document.querySelector("#visionResult h3").textContent=title;
    document.querySelector("#visionResult p").textContent=text;
  });
});

const modal=document.getElementById("modal"), modalTitle=document.getElementById("modalTitle"), modalText=document.getElementById("modalText"), modalTags=document.getElementById("modalTags");
const modalContent={
  city:["Smart City","A connected city can coordinate mobility, energy, public services and green infrastructure around the needs of its residents.",["Clean Energy","Smart Mobility","Connected Services"]],
  healthcare:["Digital Healthcare","Future healthcare concepts can combine remote access, connected monitoring and intelligent decision support while keeping human care at the centre.",["Remote Care","Wearables","AI Support"]],
  work:["Future of Work","The workplace can become more flexible and collaborative, with AI handling routine work and people concentrating on creativity, empathy and judgement.",["Remote","Human + AI","Skills"]],
  sustainability:["Sustainable Tech","Digital tools can make energy, water, agriculture and infrastructure more efficient and measurable, helping communities make better environmental decisions.",["Clean Energy","Circular Design","Efficiency"]]
};
document.querySelectorAll("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>{
  const d=modalContent[btn.dataset.modal]; modalTitle.textContent=d[0]; modalText.textContent=d[1];
  modalTags.innerHTML=d[2].map(x=>`<span>${x}</span>`).join("");
  const bookmarks = JSON.parse(localStorage.getItem("nexora_bookmarks") || "[]");
  if(btnModalBookmark) {
    btnModalBookmark.textContent = bookmarks.includes(d[0]) ? "Bookmarked! ⭐" : "Bookmark Concept ⭐";
  }
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalBackdrop").addEventListener("click",closeModal);

const nova=document.getElementById("nova"), fab=document.getElementById("novaFab"), novaBody=document.getElementById("novaBody");
let novaMessages = [
  {role:"assistant", content:"Hi! I'm Nova 🤖\nAsk me anything — technology, education, coding, science, ideas, or general questions."}
];

function saveNovaHistory() {
  try {
    localStorage.setItem("nexora_nova_history", JSON.stringify(novaMessages));
  } catch(e) {
    console.warn("Could not save NOVA history:", e);
  }
}

// Voice Assistant State
let autoVoiceEnabled = true;
let isListening = false;
let isSpeaking = false;
let activeTTSBtn = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListeningWasActive = false;

const novaStatusEl = document.getElementById("novaStatus");
function setNovaStatus(msg, type = "info") {
  if (!novaStatusEl) return;
  if (!msg) {
    novaStatusEl.style.display = "none";
    novaStatusEl.className = "nova-status";
    novaStatusEl.innerHTML = "";
    return;
  }
  novaStatusEl.style.display = "flex";
  novaStatusEl.className = `nova-status ${type}`;
  novaStatusEl.innerHTML = msg;
}

function cleanMarkdownForSpeech(text) {
  if (!text) return "";
  return text
    .replace(/```[\s\S]*?```/g, " code snippet ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[#•*-]+\s+/gm, "")
    .replace(/🤖|✦|🛡️|🔑|🎣|⚡|🟢|🟡|🔴|⚠️|🎓|🏥|🏙️|💼|🌱|🚀|🎉|❌|✅|•/g, "")
    .replace(/\n+/g, ". ");
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  if (activeTTSBtn) {
    activeTTSBtn.classList.remove("speaking");
    activeTTSBtn = null;
  }
  if (novaStatusEl && novaStatusEl.classList.contains("speaking")) {
    setNovaStatus("");
  }
}

function speakText(text, btnElement = null) {
  if (!('speechSynthesis' in window)) {
    setNovaStatus("⚠️ Speech synthesis not supported in browser.", "error");
    return;
  }

  stopSpeaking();
  const cleanText = cleanMarkdownForSpeech(text);
  if (!cleanText.trim()) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const preferVoice = voices.find(v => (v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Zira") || v.name.includes("Jenny") || v.name.includes("Samantha")))) || voices.find(v => v.lang.startsWith("en"));
  if (preferVoice) utterance.voice = preferVoice;

  utterance.onstart = () => {
    isSpeaking = true;
    if (btnElement) {
      activeTTSBtn = btnElement;
      activeTTSBtn.classList.add("speaking");
    }
    setNovaStatus("🔊 NOVA is speaking...", "speaking");
  };

  utterance.onend = () => {
    stopSpeaking();
  };

  utterance.onerror = (e) => {
    console.warn("TTS error:", e);
    stopSpeaking();
  };

  window.speechSynthesis.speak(utterance);
}

// Voice Toggle Control
const novaVoiceToggle = document.getElementById("novaVoiceToggle");
if (novaVoiceToggle) {
  novaVoiceToggle.addEventListener("click", () => {
    autoVoiceEnabled = !autoVoiceEnabled;
    if (autoVoiceEnabled) {
      novaVoiceToggle.classList.add("active");
      novaVoiceToggle.classList.remove("muted");
      novaVoiceToggle.textContent = "🔊";
      novaVoiceToggle.title = "Voice Response: ON (Click to Mute)";
    } else {
      novaVoiceToggle.classList.remove("active");
      novaVoiceToggle.classList.add("muted");
      novaVoiceToggle.textContent = "🔇";
      novaVoiceToggle.title = "Voice Response: OFF (Click to Enable)";
      stopSpeaking();
    }
  });
}

// Speech Recognition Control
const novaMicBtn = document.getElementById("novaMic");

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isListening = true;
    if (novaMicBtn) {
      novaMicBtn.classList.add("listening");
      novaMicBtn.textContent = "🛑";
      novaMicBtn.title = "Stop Listening";
    }
    setNovaStatus("🎙️ Listening... speak your question now!");
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    const input = document.getElementById("novaInput");
    if (input) input.value = transcript;
  };

  recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    stopListening();
    if (event.error === 'not-allowed') {
      setNovaStatus("⚠️ Microphone permission denied.", "error");
    } else if (event.error !== 'no-speech') {
      setNovaStatus(`⚠️ Voice error: ${event.error}`, "error");
    }
  };

  recognition.onend = () => {
    stopListening();
    const input = document.getElementById("novaInput");
    if (input && input.value.trim() && isListeningWasActive) {
      const q = input.value.trim();
      input.value = "";
      askNova(q);
    }
  };
}

function startListening() {
  if (!recognition) {
    setNovaStatus("⚠️ Speech recognition is not supported in this browser.", "error");
    return;
  }
  stopSpeaking();
  isListeningWasActive = true;
  try {
    recognition.start();
  } catch (err) {
    console.warn("Recognition start error:", err);
  }
}

function stopListening() {
  isListening = false;
  if (novaMicBtn) {
    novaMicBtn.classList.remove("listening");
    novaMicBtn.textContent = "🎤";
    novaMicBtn.title = "Speak to NOVA (Voice Input)";
  }
  if (novaStatusEl && novaStatusEl.textContent.includes("Listening")) {
    setNovaStatus("");
  }
  if (recognition) {
    try { recognition.stop(); } catch(e){}
  }
}

if (novaMicBtn) {
  novaMicBtn.addEventListener("click", () => {
    if (isListening) {
      isListeningWasActive = false;
      stopListening();
    } else {
      startListening();
    }
  });
}

document.getElementById("novaClose").addEventListener("click",()=>{
  stopSpeaking();
  stopListening();
  nova.style.display="none"; fab.style.display="grid";
});
fab.addEventListener("click",()=>{
  nova.style.display="flex"; fab.style.display="none";
  if(nova.classList.contains("collapsed")) {
    nova.classList.remove("collapsed");
    const cBtn = document.getElementById("novaCollapse");
    if(cBtn) cBtn.textContent = "▼";
  }
});

const posToggleBtn = document.getElementById("novaPosToggle");
if (posToggleBtn) {
  posToggleBtn.addEventListener("click", () => {
    nova.style.left = "";
    nova.style.top = "";
    nova.classList.toggle("pos-top");
    posToggleBtn.title = nova.classList.contains("pos-top") ? "Move to Bottom" : "Move to Top";
  });
}

if (nova) {
  nova.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (novaBody) {
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 33;
      else if (e.deltaMode === 2) dy *= 300;
      novaBody.scrollTop += dy;
    }
  }, { passive: false });

  let touchStartY = 0;
  nova.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  nova.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      const touchY = e.touches[0].clientY;
      const dy = touchStartY - touchY;
      if (novaBody) {
        novaBody.scrollTop += dy;
      }
      touchStartY = touchY;
      e.stopPropagation();
    }
  }, { passive: true });
}

const collapseBtn = document.getElementById("novaCollapse");
if (collapseBtn) {
  collapseBtn.addEventListener("click", () => {
    stopSpeaking();
    stopListening();
    nova.classList.toggle("collapsed");
    collapseBtn.textContent = nova.classList.contains("collapsed") ? "▲" : "▼";
    collapseBtn.title = nova.classList.contains("collapsed") ? "Expand Chat" : "Collapse Chat";
  });
}

const expandBtn = document.getElementById("novaExpand");
if (expandBtn) {
  expandBtn.addEventListener("click", () => {
    nova.classList.remove("collapsed");
    if (collapseBtn) collapseBtn.textContent = "▼";
    nova.classList.toggle("expanded");
    expandBtn.textContent = nova.classList.contains("expanded") ? "🗗" : "⤢";
    expandBtn.title = nova.classList.contains("expanded") ? "Restore size" : "Maximize size";
  });
}

// Draggable Header Logic for NOVA Window
const novaHeadEl = document.getElementById("novaHead");
let isNovaDragging = false, startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

if (novaHeadEl) {
  novaHeadEl.addEventListener("mousedown", (e) => {
    if (e.target.closest("button")) return;
    isNovaDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = nova.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    nova.style.bottom = "auto";
    nova.style.right = "auto";
    nova.style.left = initialLeft + "px";
    nova.style.top = initialTop + "px";

    document.addEventListener("mousemove", onNovaDragMove);
    document.addEventListener("mouseup", onNovaDragEnd);
  });
}

function onNovaDragMove(e) {
  if (!isNovaDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const newLeft = Math.max(10, Math.min(window.innerWidth - nova.offsetWidth - 10, initialLeft + dx));
  const newTop = Math.max(10, Math.min(window.innerHeight - nova.offsetHeight - 10, initialTop + dy));
  nova.style.left = newLeft + "px";
  nova.style.top = newTop + "px";
}

function onNovaDragEnd() {
  isNovaDragging = false;
  document.removeEventListener("mousemove", onNovaDragMove);
  document.removeEventListener("mouseup", onNovaDragEnd);
}

function formatMarkdown(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "• $1")
    .replace(/\n/g, "<br>");
}

function addNovaBubble(text, role="assistant", loading=false, triggerSave=true){
  const el=document.createElement("div");
  el.className=`bubble ${role==="assistant"?"bot":""}`;
  if(loading) el.classList.add("loading");
  
  if(!loading && role === "assistant") {
    el.innerHTML = formatMarkdown(text);
    
    // Speaker button for Text-to-Speech
    const ttsBtn = document.createElement("button");
    ttsBtn.className = "bubble-tts-btn";
    ttsBtn.title = "Listen to response";
    ttsBtn.setAttribute("aria-label", "Read out loud");
    ttsBtn.textContent = "🔊";
    ttsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSpeaking && activeTTSBtn === ttsBtn) {
        stopSpeaking();
      } else {
        speakText(text, ttsBtn);
      }
    });
    el.appendChild(ttsBtn);
  } else {
    el.textContent = text;
  }
  
  novaBody.appendChild(el);
  setTimeout(() => {
    novaBody.scrollTop = novaBody.scrollHeight;
  }, 30);
  setTimeout(() => {
    novaBody.scrollTop = novaBody.scrollHeight;
  }, 150);

  if (triggerSave && !loading) {
    saveNovaHistory();
  }

  return el;
}

// Bind listener to initial static bot bubbles
document.querySelectorAll(".bubble.bot").forEach(b => {
  const ttsBtn = b.querySelector(".bubble-tts-btn");
  if (ttsBtn) {
    ttsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSpeaking && activeTTSBtn === ttsBtn) {
        stopSpeaking();
      } else {
        const textContent = b.textContent.replace("🔊", "").trim();
        speakText(textContent, ttsBtn);
      }
    });
  }
});

// Side Drawer Chat History Logic
const novaSidebar = document.getElementById("novaSidebar");
const novaSidebarToggle = document.getElementById("novaSidebarToggle");
const novaSidebarClose = document.getElementById("novaSidebarClose");
const novaSidebarContent = document.getElementById("novaSidebarContent");
const btnNewChat = document.getElementById("btnNewChat");

function renderSidebarHistory() {
  if (!novaSidebarContent) return;
  novaSidebarContent.innerHTML = "";

  const userMessages = novaMessages.filter(m => m.role === "user");

  if (userMessages.length === 0) {
    novaSidebarContent.innerHTML = `<div class="history-empty">No past questions yet.<br>Start asking NOVA!</div>`;
    return;
  }

  [...userMessages].reverse().forEach((msg) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <span class="history-item-role">👤 QUESTION</span>
      <span class="history-item-text">${msg.content}</span>
    `;
    item.addEventListener("click", () => {
      closeNovaSidebar();
      const bubbles = document.querySelectorAll(".nova-body .bubble");
      for (const b of bubbles) {
        if (b.textContent.includes(msg.content)) {
          b.scrollIntoView({ behavior: "smooth", block: "center" });
          b.style.boxShadow = "0 0 15px var(--cyan)";
          setTimeout(() => b.style.boxShadow = "", 2000);
          break;
        }
      }
    });
    novaSidebarContent.appendChild(item);
  });
}

function openNovaSidebar() {
  if (novaSidebar) {
    renderSidebarHistory();
    novaSidebar.classList.add("open");
  }
}

function closeNovaSidebar() {
  if (novaSidebar) {
    novaSidebar.classList.remove("open");
  }
}

if (novaSidebarToggle) novaSidebarToggle.addEventListener("click", openNovaSidebar);
if (novaSidebarClose) novaSidebarClose.addEventListener("click", closeNovaSidebar);

if (btnNewChat) {
  btnNewChat.addEventListener("click", () => {
    stopSpeaking();
    stopListening();
    closeNovaSidebar();
    novaMessages = [
      {role:"assistant", content:"Hi! I'm Nova 🤖\nAsk me anything — technology, education, coding, science, ideas, or general questions."}
    ];
    saveNovaHistory();
    if (novaBody) {
      novaBody.innerHTML = "";
    }
    addNovaBubble(novaMessages[0].content, "assistant", false, false);
    appendQuickButtons();
    setNovaStatus("✨ New chat session started!", "info");
    setTimeout(() => setNovaStatus(""), 3000);
  });
}

function appendQuickButtons() {
  document.querySelectorAll(".nova-body .quick").forEach(btn => btn.remove());
  const quickQuestions = [
    "How will education change?",
    "What is a smart city?",
    "How can AI improve healthcare?"
  ];
  quickQuestions.forEach(q => {
    const b = document.createElement("button");
    b.className = "quick";
    b.dataset.question = q;
    b.textContent = q;
    b.addEventListener("click", () => askNova(q));
    novaBody.appendChild(b);
  });
}

function loadNovaHistory() {
  const saved = localStorage.getItem("nexora_nova_history");
  if (!saved) return false;
  try {
    const history = JSON.parse(saved);
    if (Array.isArray(history) && history.length > 0) {
      novaMessages = history;
      if (novaBody) {
        novaBody.innerHTML = "";
      }
      history.forEach(msg => {
        addNovaBubble(msg.content, msg.role, false, false);
      });
      appendQuickButtons();
      renderSidebarHistory();
      return true;
    }
  } catch (e) {
    console.warn("Failed to load chat history:", e);
  }
  return false;
}

// Clear History Control inside Side Drawer
const novaClearHistoryBtn = document.getElementById("novaClearHistory");
if (novaClearHistoryBtn) {
  novaClearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your NOVA chat history?")) {
      stopSpeaking();
      stopListening();
      closeNovaSidebar();
      localStorage.removeItem("nexora_nova_history");
      novaMessages = [
        {role:"assistant", content:"Hi! I'm Nova 🤖\nAsk me anything — technology, education, coding, science, ideas, or general questions."}
      ];
      if (novaBody) {
        novaBody.innerHTML = "";
      }
      addNovaBubble(novaMessages[0].content, "assistant", false, false);
      appendQuickButtons();
      renderSidebarHistory();
      setNovaStatus("🧹 Chat history cleared!", "info");
      setTimeout(() => setNovaStatus(""), 3000);
    }
  });
}

// Load saved history on startup
loadNovaHistory();

async function askNova(q, autoFocus = true){
  if(!q.trim()) return;

  stopSpeaking();
  addNovaBubble(q, "user");
  novaMessages.push({role:"user", content:q});
  saveNovaHistory();

  const loading=addNovaBubble("Thinking…","assistant",true,false);
  const input=document.getElementById("novaInput");
  input.disabled=true;

  try{
    const response=await fetch("/api/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({messages:novaMessages})
    });

    const data=await response.json();
    if(!response.ok) throw new Error(data.error || "Request failed");

    loading.remove();
    addNovaBubble(data.answer,"assistant");
    novaMessages.push({role:"assistant",content:data.answer});
    saveNovaHistory();

    if (autoVoiceEnabled) {
      speakText(data.answer);
    }
  }catch(error){
    loading.remove();
    addNovaBubble("Sorry, I couldn't connect to my AI brain right now. Please make sure the NEXORA backend is running.","assistant");
    console.error(error);
  }finally{
    input.disabled=false;
    if(autoFocus) {
      input.focus();
    }
  }
}

document.querySelectorAll(".quick").forEach(b=>b.addEventListener("click",()=>{
  askNova(b.dataset.question);
}));

document.getElementById("novaSend").addEventListener("click",()=>{
  const input=document.getElementById("novaInput");
  const q=input.value.trim();
  if(q){askNova(q);input.value=""}
});

document.getElementById("novaInput").addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    e.preventDefault();
    document.getElementById("novaSend").click();
  }
});

const menuToggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll",()=>{
  const y=window.scrollY+130;
  let current="home";
  sections.forEach(s=>{if(y>=s.offsetTop)current=s.id});
  document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

// View All Gallery Modal Logic
const galleryModal = document.getElementById("galleryModal");
const galleryBackdrop = document.getElementById("galleryBackdrop");
const galleryClose = document.getElementById("galleryClose");
const galleryGrid = document.getElementById("galleryGrid");
const viewAllBtn = document.getElementById("viewAll");

function openGallery() {
  if (!galleryGrid || !galleryModal) return;
  
  galleryGrid.innerHTML = Object.keys(categoryData).map(key => {
    const item = categoryData[key];
    const targetSection = categorySectionMap[key] || "#future-cards";
    return `
      <div class="gallery-item">
        <div class="gallery-item-head">
          <div class="gallery-item-icon">${item.icon}</div>
          <div>
            <h4>${item.title}</h4>
            <span style="font-size:9px;color:var(--cyan);letter-spacing:0.5px;">NEXORA FUTURE TREND</span>
          </div>
        </div>
        <p>${item.text}</p>
        <div class="gallery-item-actions">
          <button class="gallery-btn" onclick="navigateToSection('${targetSection}')">Explore Section ➔</button>
          <button class="gallery-btn" onclick="askNovaCategory('${item.title}')">AI Deep Dive 🤖</button>
        </div>
      </div>
    `;
  }).join("");
  
  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
}

function closeGallery() {
  if (galleryModal) {
    galleryModal.classList.remove("open");
    galleryModal.setAttribute("aria-hidden", "true");
  }
}

if (viewAllBtn) viewAllBtn.addEventListener("click", openGallery);
if (galleryClose) galleryClose.addEventListener("click", closeGallery);
if (galleryBackdrop) galleryBackdrop.addEventListener("click", closeGallery);

window.navigateToSection = function(secId) {
  closeGallery();
  const el = document.querySelector(secId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

window.askNovaCategory = function(title) {
  closeGallery();
  if (nova && fab) {
    nova.style.display = "flex";
    fab.style.display = "none";
    askNova(`Provide a detailed analysis and future breakdown for "${title}". What are the key innovations to watch?`, false);
  }
};

// Modal Action Handlers (Blueprint & Bookmark)
const btnModalNova = document.getElementById("btnModalNova");
const btnModalBookmark = document.getElementById("btnModalBookmark");

if (btnModalNova) {
  btnModalNova.addEventListener("click", () => {
    const title = modalTitle.textContent;
    closeModal();
    if (nova && fab) {
      nova.style.display = "flex";
      fab.style.display = "none";
      askNova(`Please generate a detailed technical blueprint, key technologies, and implementation steps for the NEXORA concept: "${title}".`, false);
    }
  });
}

if (btnModalBookmark) {
  btnModalBookmark.addEventListener("click", () => {
    const title = modalTitle.textContent;
    let bookmarks = JSON.parse(localStorage.getItem("nexora_bookmarks") || "[]");
    if (!bookmarks.includes(title)) {
      bookmarks.push(title);
      localStorage.setItem("nexora_bookmarks", JSON.stringify(bookmarks));
      btnModalBookmark.textContent = "Bookmarked! ⭐";
    } else {
      btnModalBookmark.textContent = "Already Bookmarked ⭐";
    }
  });
}

// Competition Idea Submission & AI Evaluator
const ideaForm = document.getElementById("ideaForm");
const ideaResult = document.getElementById("ideaResult");

if (ideaForm) {
  ideaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("ideaTitle").value.trim();
    const category = document.getElementById("ideaCategory").value;
    const desc = document.getElementById("ideaDesc").value.trim();

    if (!title || !category || !desc) return;

    const btn = document.getElementById("btnSubmitIdea");
    btn.disabled = true;
    btn.textContent = "Evaluating Concept with AI... ⏳";
    ideaResult.style.display = "block";
    ideaResult.innerHTML = `<strong>Evaluating your concept "${title}" with NOVA AI...</strong>`;

    const prompt = `Evaluate this student competition concept for NEXORA:
Title: ${title}
Category: ${category}
Description: ${desc}

Please provide:
1. Concept Score (out of 100) and Badge
2. Top 2 Key Strengths
3. 2 Practical Suggestions to improve it
Keep it encouraging, structured, and concise.`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Evaluation failed");

      ideaResult.innerHTML = `
        <h4 style="color:#62eaff;font-size:14px;margin-bottom:8px;">🏆 AI Evaluation Report: ${title}</h4>
        <div>${formatMarkdown(data.answer)}</div>
      `;
    } catch (err) {
      ideaResult.innerHTML = `<span style="color:#ff4d4d;">Could not evaluate concept at this moment. Please verify backend is running.</span>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "Evaluate My Concept with AI ✨";
    }
  });
}
