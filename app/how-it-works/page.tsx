import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F9F9FB] font-sans">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-base font-bold text-[#2E2C34] tracking-wide">TICKET LEAD</span>
        <Link
          href="/login"
          className="px-4 py-2 bg-[#7F56D8] text-white text-sm font-medium rounded-lg hover:bg-[#6B45C4] transition-colors"
        >
          Go to Demo →
        </Link>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <div className="inline-flex items-center gap-2 bg-[#7F56D8]/10 text-[#7F56D8] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          ✦ AI-Powered Support System
        </div>
        <h1 className="text-4xl font-bold text-[#2E2C34] max-w-2xl mx-auto leading-tight">
          How Ticket Lead Works
        </h1>
        <p className="text-[#84818A] mt-4 max-w-xl mx-auto text-base leading-relaxed">
          A smart support ticket platform built for AI-based LMS platforms — where students get help faster and admins respond better, with AI doing the heavy lifting on both sides.
        </p>
      </section>

      {/* Roles Overview */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-7">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className="font-semibold text-[#2E2C34] mb-2">Students (Users)</h3>
            <p className="text-sm text-[#84818A] leading-relaxed">
              Students enrolled in the LMS who interact with AI tutors. When they face issues — with course content, the AI tutor, or technical problems — they raise a support ticket. AI helps them write a clear, professional ticket even if they type it informally.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-7">
            <div className="w-10 h-10 rounded-xl bg-[#7F56D8]/10 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-[#2E2C34] mb-2">Admin (Support Team)</h3>
            <p className="text-sm text-[#84818A] leading-relaxed">
              The support admin manages all incoming tickets across all students. They can view, filter, and respond to tickets. AI helps them write polished professional replies and instantly summarize long ticket conversations so they spend less time reading and more time resolving.
            </p>
          </div>
        </div>
      </section>

      {/* Student Flow */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest">Student Journey</span>
          <h2 className="text-2xl font-bold text-[#2E2C34] mt-1">How a student raises a ticket</h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-8 left-8 right-8 h-px bg-gray-200 hidden md:block" style={{zIndex: 0}} />

          <div className="grid grid-cols-4 gap-4 relative" style={{zIndex: 1}}>
            {[
              {
                step: "01",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                title: "Faces an issue",
                desc: "Student encounters a problem — AI tutor giving wrong answers, can't access a module, or a content question.",
                color: "bg-blue-50",
              },
              {
                step: "02",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
                title: "Writes ticket",
                desc: "Opens New Ticket form. Types a rough, informal description of the issue in plain language.",
                color: "bg-blue-50",
              },
              {
                step: "03",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                title: "AI polishes it",
                desc: 'Clicks "✨ Polish It" — Gemini AI rewrites the description into formal, clear, professional language. Student reviews and applies.',
                color: "bg-[#7F56D8]/10",
                highlight: true,
              },
              {
                step: "04",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8"><polyline points="20 6 9 17 4 12"/></svg>,
                title: "Submits & tracks",
                desc: "Ticket is submitted with a ticket number. Student can track status (New → On-Going → Resolved) and add replies.",
                color: "bg-green-50",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-4 border-2 ${item.highlight ? "border-[#7F56D8]/30" : "border-white"} shadow-sm bg-white`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-[#84818A] mb-1">{item.step}</span>
                <h4 className="text-sm font-semibold text-[#2E2C34] mb-2">{item.title}</h4>
                <p className="text-xs text-[#84818A] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Polish */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-xs font-semibold text-[#84818A] uppercase tracking-widest mb-4">Example — Polish It in action</p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-red-400 mb-2">Before (student types)</p>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-[#2E2C34] leading-relaxed italic">
                "my ai tutor isnt helping me with math its just giving random answers idk whats wrong pls fix it"
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-green-500 mb-2">After (AI polishes)</p>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-[#2E2C34] leading-relaxed">
                "I am experiencing an issue with the AI tutor assigned to my Mathematics course. The tutor is consistently providing irrelevant or incorrect responses to my questions rather than helpful guidance, which is preventing me from progressing through the course material effectively."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Flow */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#7F56D8] uppercase tracking-widest">Admin Journey</span>
          <h2 className="text-2xl font-bold text-[#2E2C34] mt-1">How an admin manages & responds</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8"><path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"/></svg>,
              title: "Views all tickets in one place",
              desc: "Admin sees every ticket from all students. Filter by status: New, On-Going, Pending, Resolved. Search by keyword or ticket number.",
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
              title: "Opens ticket & reads thread",
              desc: "Clicks into any ticket to see the full conversation thread — original complaint, all replies from both sides, and timestamps.",
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              title: "Summarizes long threads with AI",
              desc: 'For long conversations, clicks "📋 Summarize Thread" — AI produces a bullet-point summary: what the issue was, what was tried, and what\'s pending.',
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F56D8" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
              title: "Polishes reply & updates status",
              desc: 'Types a quick reply, clicks "✨ Polish Response" — AI makes it professional and empathetic. Then updates ticket status and submits.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#7F56D8]/10 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#2E2C34] mb-1">{item.title}</h4>
                <p className="text-xs text-[#84818A] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary example */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-xs font-semibold text-[#84818A] uppercase tracking-widest mb-4">Example — Summarize Thread in action</p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-[#84818A] mb-2">Long thread (admin has to scroll through)</p>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2 text-xs text-[#84818A]">
                <p><span className="font-medium text-[#2E2C34]">Student:</span> "my ai tutor isn't helping..."</p>
                <p><span className="font-medium text-[#2E2C34]">Admin:</span> "Can you try refreshing?"</p>
                <p><span className="font-medium text-[#2E2C34]">Student:</span> "still same issue, tried 3 times"</p>
                <p><span className="font-medium text-[#2E2C34]">Admin:</span> "We've escalated to engineering..."</p>
                <p><span className="font-medium text-[#2E2C34]">Student:</span> "ok how long will it take?"</p>
                <p className="text-[#7F56D8]">...6 more messages</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#7F56D8] mb-2">AI Summary (instant)</p>
              <div className="bg-[#7F56D8]/5 border border-[#7F56D8]/20 rounded-xl p-4 text-xs text-[#2E2C34] space-y-1.5 leading-relaxed">
                <p>• Student reported AI tutor giving incorrect Math responses</p>
                <p>• Admin asked student to refresh — issue persisted after 3 attempts</p>
                <p>• Issue escalated to engineering team on Day 2</p>
                <p>• Student awaiting ETA for resolution</p>
                <p>• Status: On-Going — pending engineering fix</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-[#7F56D8] uppercase tracking-widest">AI Capabilities</span>
          <h2 className="text-2xl font-bold text-[#2E2C34] mt-1">Three AI features, two roles</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              emoji: "✨",
              title: "Polish Ticket",
              role: "Student",
              roleColor: "bg-blue-100 text-blue-600",
              desc: "Rewrites a rough, informal ticket description into clear, professional language. Same content — better words. Admin reads it, understands it instantly.",
              model: "Gemini 2.5 Flash",
            },
            {
              emoji: "✨",
              title: "Polish Response",
              role: "Admin",
              roleColor: "bg-[#7F56D8]/10 text-[#7F56D8]",
              desc: "Takes an admin's quick draft reply and rewrites it to be professional, empathetic, and action-oriented — with a warm closing tone.",
              model: "Gemini 2.5 Flash",
            },
            {
              emoji: "📋",
              title: "Summarize Thread",
              role: "Admin only",
              roleColor: "bg-[#7F56D8]/10 text-[#7F56D8]",
              desc: "Reads the entire ticket conversation and produces a bullet-point summary: what the issue was, steps taken, current status, pending actions.",
              model: "Gemini 2.5 Flash",
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="text-3xl mb-4">{f.emoji}</div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-[#2E2C34]">{f.title}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${f.roleColor}`}>{f.role}</span>
              </div>
              <p className="text-sm text-[#84818A] leading-relaxed mb-4">{f.desc}</p>
              <div className="flex items-center gap-1.5 text-xs text-[#84818A]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                Powered by {f.model}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ticket Lifecycle */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#84818A] uppercase tracking-widest">Ticket Lifecycle</span>
          <h2 className="text-2xl font-bold text-[#2E2C34] mt-1">From submission to resolution</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between gap-2">
            {[
              { label: "NEW", color: "bg-blue-500", desc: "Just submitted by student" },
              { label: "ON-GOING", color: "bg-orange-400", desc: "Admin is actively working on it" },
              { label: "PENDING", color: "bg-yellow-400", desc: "Waiting on student or third party" },
              { label: "RESOLVED", color: "bg-green-500", desc: "Issue closed successfully" },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex-1 text-center">
                  <div className={`w-4 h-4 rounded-full ${s.color} mx-auto mb-2`} />
                  <p className="text-xs font-bold text-[#2E2C34]">{s.label}</p>
                  <p className="text-[10px] text-[#84818A] mt-0.5 leading-tight">{s.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" className="shrink-0">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-[#84818A] uppercase tracking-widest">Under the Hood</span>
          <h2 className="text-2xl font-bold text-[#2E2C34] mt-1">Built on modern, proven technology</h2>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[
            { name: "Next.js 16", role: "Frontend + API", icon: "▲" },
            { name: "PostgreSQL", role: "Database", icon: "🐘" },
            { name: "Prisma ORM", role: "Data Layer", icon: "◆" },
            { name: "NextAuth", role: "Authentication", icon: "🔐" },
            { name: "Gemini AI", role: "AI Engine", icon: "✦" },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="text-2xl mb-2">{t.icon}</div>
              <p className="text-sm font-semibold text-[#2E2C34]">{t.name}</p>
              <p className="text-xs text-[#84818A] mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-[#7F56D8] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">See it live</h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            Log in as a student or admin to experience the full AI-powered ticket workflow firsthand.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 bg-white text-[#7F56D8] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login as Admin
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-white/10 text-white border border-white/20 text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Login as Student
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-4">
            Admin: admin@lms.com / admin123 · Student: alice@student.com / student123
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center">
        <p className="text-xs text-[#84818A]">Ticket Lead — AI-Powered LMS Support System</p>
      </footer>

    </div>
  )
}
