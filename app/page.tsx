"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "skills", "services", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("whatsapp", formData.whatsapp);
    data.append("subject", formData.subject);
    data.append("message", formData.message);
    if (file) data.append("file", file);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", whatsapp: "", subject: "", message: "" });
        setFile(null);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const projects = [
    {
      title: "Amazon Affiliate Platform",
      desc: "Amazon affiliate landing experience built for conversions.",
      tags: ["NEXT.JS", "AFFILIATE", "UI"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOPzcPkGdVMlr-igbUGwq3KsuzjpTDv3Z2km4DGQg9YfnVxzEaSlGooaDOE0plD9ciSq8Ogr8uIIOqwChOxtXlVRUONoklCQs_gtq9Lht9GEhtCkKh87jprd0_ihGHYdssYLoftHnsKrKG3-r0kJnRQJ_5lm17vWUkw2mOcM0T78ilC3YKt7nFOyOZ3Cyj5Uw4B5tjHkU1wjdSO6nHOWitb8rjn_95p8nCoH37gDmMyuPVdemJPiOS-R5gq0pVipASH6jLdgokpj0K",
      demo: "https://selectrostream.vercel.app/",
    },
    {
      title: "Restaurant Website",
      desc: "A modern restaurant site with menu, booking, and branding.",
      tags: ["NEXT.JS", "RESTAURANT", "RESPONSIVE"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOSyNbIwNmbLOjvg1Dok15J0hLky1Q1L46ulQnR9vqfvDa8KHKiXeXDetf6JyMbkJ3Car2Ixh4rAGYqNNX3diO9HHmqy7Aw2jyZ2RyroRTnLtzyyCdlLD1Kmt4_EKKYEtoXrZEDxbK2sf_EWUYgjhHSgAGRMfddzldqlSeQv-dIQyGy1xP_30RVNb9N0s_pT_tQ7pniCNPa1u-QcJ0HAsraQQVAeWIepGvqBw3NYdGGGNOuYgy0tMRbIOdENraEAdmQCaPfRUBZ1gJ",
      demo: "https://restorent-sigma.vercel.app/",
    },
    {
      title: "Business Management Software",
      desc: "Offline-ready business management software for inventory, sales, purchases, and reporting.",
      tags: ["REACT", "ELECTRON", "ERP"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUe18XjBanSCkf--1HWl_XhOGsDVt3fWpT5klgj8PL_qBoimMKjz86-GuZPKsS98j0HtTZizBi5S-27Jq1XAlSXV6Zxxn1sq898RL0mXN_vP2PI0uaKtI53oCSdoQXI03_vzGKOlrOf19DK2sMpd2R12cbszzJxXJ7eMH_FV-CFHGrRyTPojQ-JjAGIN72LuoEHqcJERkUY8WEUAVGrhj1PS1OTH9l39GbJKohQu3qUPgcp7A9UijIv-NhiQkQaEyk8FEGpOdEUSH1",
      demo: "https://genral-erp.vercel.app/",
    },
    {
      title: "Dastarkhwan Restaurant ERP",
      desc: "Offline restaurant operations software for orders, kitchen workflows, staff roles, and sales tracking.",
      tags: ["REACT", "RESTAURANT", "ERP"],
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
      demo: "https://restorentsoft-erp.vercel.app/",
    },
  ];

  return (
    <main className="flex-grow">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full z-50 bg-surface/70 backdrop-blur-[20px] border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <nav className="flex justify-between items-center w-full px-gutter h-[80px] max-w-container-max mx-auto">
          <div className="font-h3 text-h3 font-extrabold text-primary tracking-tighter">
            WebZen
          </div>
          <div className="hidden md:flex items-center gap-stack-md">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-body text-sm font-semibold transition-all duration-300 relative ${
                  activeSection === link.id
                    ? "text-primary after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            className="primary-gradient text-on-primary px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            href="#contact"
          >
            Let's Talk
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-gutter py-stack-lg" id="home">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold mb-stack-sm tracking-widest bg-primary/5 uppercase">MUHAMMAD HAMMADULLAH</span>
          <h1 className="font-h1 text-4xl md:text-6xl text-on-surface mb-stack-md font-extrabold leading-[1.1] tracking-[-0.02em]">
            Building Modern <span className="text-gradient">Websites, Apps</span> & Digital Solutions
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-stack-lg max-w-2xl mx-auto leading-relaxed">
            Empowering businesses through cutting-edge web, mobile, and API development. Precision-crafted software designed for high-growth scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-stack-sm justify-center">
            <a href="#projects" className="primary-gradient text-on-primary px-stack-md py-4 rounded-xl font-bold text-lg glow-hover text-center">View My Work</a>
            <a href="#contact" className="glass-card text-on-surface px-stack-md py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">Contact Me</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-stack-lg px-gutter max-w-container-max mx-auto" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
          <div className="space-y-stack-md">
            <h2 className="font-h2 text-3xl md:text-5xl font-bold leading-[1.2] tracking-[-0.01em]">The Precision Behind <span className="text-primary">Zen</span></h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Full Stack Developer and Mobile Specialist dedicated to creating fluid, responsive, and performance-optimized digital experiences. From React Native apps to scalable REST APIs, I bridge the gap between complex engineering and elegant UI/UX design.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <StatCard count="50+" label="Projects Completed" color="primary" />
              <StatCard count="30+" label="Happy Clients" color="secondary" />
              <StatCard count="20+" label="Tech Stacks" color="tertiary" />
              <StatCard count="15+" label="Mobile Apps Built" color="primary-fixed" />
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden glass-card p-2 aspect-video lg:aspect-auto">
            <img alt="Developer Workspace" className="w-full h-full object-cover rounded-xl opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU_VSM-1EcZisIbHueA34AiPwqDfNoCWU0yRkj1SAVo16JBrgb3ysBq8s_x55hCn15JFdFGgASdW0_AsDwxD8FXRrdC05lcDqvrEsd8x_sqmdaQOA1mlScE5t7veyqADQLel6BobGKDJJq7w6EAqpLgtYvETRpB4I2rMU2IDWbo6yfkSgk_-aJZ-IOdRV2TXpL4kLcpJczR3m_CMM-rgrh_p4nUUJ-H4jsMjOnathWEdLzJDL0b9Ls2WZTVYpRMRTm1OGeGEh_BCo3" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-stack-lg bg-surface-container-lowest/50" id="skills">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-stack-lg">
            <h2 className="font-h2 text-3xl md:text-5xl font-bold mb-stack-sm">Technical <span className="text-secondary">Arsenal</span></h2>
            <p className="text-on-surface-variant">Mastering the tools of the modern web to build future-ready solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
            <SkillCard icon="web" title="Frontend" skills={[{n:"React / Next.js", p:95}, {n:"TypeScript", p:85}, {n:"Tailwind CSS", p:98}]} color="primary" />
            <SkillCard icon="database" title="Backend" skills={[{n:"Node.js", p:90}, {n:"REST & GraphQL", p:88}, {n:"Firebase", p:92}]} color="secondary" />
            <SkillCard icon="smartphone" title="Mobile" skills={[{n:"React Native", p:92}, {n:"Android SDK", p:80}, {n:"App Stores", p:85}]} color="tertiary" />
            <SkillCard icon="build" title="Tools" skills={[{n:"Git & GitHub", p:95}, {n:"Vercel / Docker", p:85}, {n:"Figma (UI/UX)", p:80}]} color="primary-container" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-stack-lg px-gutter max-w-container-max mx-auto" id="services">
        <div className="text-center mb-stack-lg">
          <h2 className="font-h2 text-3xl md:text-5xl font-bold mb-stack-sm">Expertise <span className="text-primary">Offerings</span></h2>
          <p className="text-on-surface-variant">Comprehensive digital services designed to scale your brand.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ServiceCard icon="laptop_mac" title="Website Dev" desc="Full-scale web applications built with Next.js and React." color="primary" />
          <ServiceCard icon="smartphone" title="Mobile App Dev" desc="Native performance cross-platform apps for iOS and Android." color="secondary" />
          <ServiceCard icon="dashboard_customize" title="Dashboard Systems" desc="Complex internal tools and portals with real-time analytics." color="tertiary" colSpan="lg:col-span-2" />
          <ServiceCard icon="api" title="API Integration" desc="Seamless connecting services and custom backend architectures." color="primary-fixed" colSpan="lg:col-span-2" />
          <ServiceCard icon="business" title="Business Websites" desc="Professional corporate sites optimized for conversion." color="primary" />
          <ServiceCard icon="rocket_launch" title="Software Solutions" desc="Custom SaaS and automation tailored to your workflows." color="primary-fixed" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-stack-lg bg-surface-container-low/30 px-gutter" id="projects">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-stack-md">
            <div>
              <h2 className="font-h2 text-3xl md:text-5xl font-bold mb-stack-sm">Featured <span className="text-primary">Creations</span></h2>
              <p className="text-on-surface-variant">A showcase of technical excellence and creative problem-solving.</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">arrow_back</span></button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">arrow_forward</span></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-stack-lg px-gutter max-w-4xl mx-auto">
        <h2 className="font-h2 text-3xl md:text-5xl font-bold text-center mb-stack-lg">My <span className="text-tertiary">Journey</span></h2>
        <div className="relative border-l border-white/10 ml-4 space-y-stack-lg">
          <TimelineItem date="2024 - PRESENT" title="Lead Developer at WebZen" desc="Spearheading digital transformation for global clients." color="primary" active />
          <TimelineItem date="2022 - 2023" title="Freelance Client Projects" desc="Developed custom business management tools for startups." color="secondary" />
          <TimelineItem date="2020 - 2021" title="Full-Stack Immersive" desc="Intensive mastery of the MERN stack." color="tertiary" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-stack-lg px-gutter max-w-container-max mx-auto" id="contact">
        <div className="glass-card rounded-[32px] p-stack-lg grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
          <div>
            <h2 className="font-h2 text-3xl md:text-5xl font-bold mb-stack-sm">Let’s Start Your <span className="text-primary">Next Project</span></h2>
            <p className="text-lg text-on-surface-variant mb-stack-lg">Have a vision? Let’s turn it into a high-performance reality.</p>
            <div className="space-y-6">
              <ContactInfo icon="mail" label="Email Me" value={<a href="mailto:support.webzen.tech@gmail.com" className="hover:text-primary transition-colors">support.webzen.tech@gmail.com</a>} color="primary" />
              <ContactInfo icon="call" label="Phone / WhatsApp" value={<a href="https://wa.me/923145660928" target="_blank" className="hover:text-secondary transition-colors">+923145660928</a>} color="secondary" />
            </div>
            <div className="flex gap-4 mt-stack-lg">
              <SocialLink text="GH" href="https://github.com/hammad-khan893" />
              <SocialLink text="LI" href="#" />
              <SocialLink text="FB" href="https://web.facebook.com/profile.php?id=61589296713206" />
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Full Name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Input placeholder="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="WhatsApp Number" type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} required />
              <Input placeholder="Subject" type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
            </div>
            <div className="relative group">
              <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-2 px-1">Attach Project File (PDF, etc.)</label>
              <input type="file" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Project Details" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required></textarea>
            <button className={`w-full primary-gradient text-on-primary font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`} type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && <p className="text-green-400 text-center font-bold">Message sent successfully!</p>}
            {status === "error" && <p className="text-red-400 text-center font-bold">Failed to send message. Please try again.</p>}
            <a className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all" href="https://wa.me/923145660928" target="_blank">
              <span className="material-symbols-outlined">chat</span> Chat on WhatsApp
            </a>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-stack-md px-gutter max-w-container-max mx-auto w-full mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <div className="font-h3 text-2xl text-primary font-bold">WebZen</div>
          <div className="text-on-surface-variant/60 text-center md:text-left text-xs uppercase tracking-widest font-semibold">
            © 2026 WebZen. Built with Zen Precision.
          </div>
          <div className="flex gap-stack-md">
            <Link className="text-on-surface-variant/60 hover:text-primary transition-colors text-xs font-bold uppercase" href="/privacy">Privacy</Link>
            <Link className="text-on-surface-variant/60 hover:text-secondary transition-colors text-xs font-bold uppercase" href="/terms">Terms</Link>
            <button className="text-on-surface-variant/60 hover:text-tertiary transition-colors text-xs font-bold uppercase" onClick={() => setIsTechModalOpen(true)}>Tech Stack</button>
          </div>
        </div>
      </footer>

      {/* Tech Stack Modal */}
      {isTechModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-gutter bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-lg w-full rounded-3xl p-stack-md relative animate-in fade-in zoom-in duration-300">
            <button className="absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors" onClick={() => setIsTechModalOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-h2 text-2xl md:text-3xl font-bold mb-stack-sm">The <span className="text-tertiary">Zen Stack</span></h2>
            <p className="text-on-surface-variant mb-stack-md">This portfolio is a demonstration of high-performance modern web architecture:</p>
            <div className="grid grid-cols-2 gap-4">
              <TechItem name="Next.js 16" desc="App Router & SSR" />
              <TechItem name="Tailwind v4" desc="Modern CSS Engine" />
              <TechItem name="TypeScript" desc="Type-Safe Logic" />
              <TechItem name="Nodemailer" desc="Backend API Mailer" />
              <TechItem name="Framer Motion" desc="Fluid Animations" />
              <TechItem name="Google Fonts" desc="Premium Typography" />
            </div>
            <button className="w-full primary-gradient text-on-primary font-bold py-4 rounded-xl mt-stack-md" onClick={() => setIsTechModalOpen(false)}>Impressive</button>
          </div>
        </div>
      )}
    </main>
  );
}

// Helper Components
function StatCard({ count, label, color }: { count: string; label: string; color: string }) {
  const borderColors: Record<string, string> = {
    primary: "border-primary",
    secondary: "border-secondary",
    tertiary: "border-tertiary",
    "primary-fixed": "border-primary-fixed",
  };
  const textColors: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    "primary-fixed": "text-primary-fixed",
  };
  return (
    <div className={`glass-card p-stack-sm rounded-xl border-l-4 ${borderColors[color]}`}>
      <span className={`block text-2xl font-h3 ${textColors[color]}`}>{count}</span>
      <span className="text-on-surface-variant text-[10px] font-semibold uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SkillCard({ icon, title, skills, color }: { icon: string; title: string; skills: {n:string, p:number}[]; color: string }) {
  const iconColors: Record<string, string> = {
    primary: "primary-gradient text-white",
    secondary: "bg-secondary-container text-secondary",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
    "primary-container": "bg-primary-container text-on-primary-container",
  };
  return (
    <div className="glass-card p-stack-md rounded-2xl">
      <div className={`w-12 h-12 ${iconColors[color]} rounded-lg flex items-center justify-center mb-stack-sm`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="font-h3 text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map(s => <SkillItem key={s.n} name={s.n} percentage={s.p} color={color} />)}
      </div>
    </div>
  );
}

function SkillItem({ name, percentage, color }: { name: string; percentage: number; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary text-primary",
    secondary: "bg-secondary text-secondary",
    tertiary: "bg-tertiary text-tertiary",
    "primary-container": "bg-primary-container text-primary-container",
  };
  const activeClasses = colorMap[color] || "bg-primary text-primary";
  const [bgColor, textColor] = activeClasses.split(" ");
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className={`text-sm font-bold ${textColor}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div className={`${bgColor} h-full rounded-full shadow-[0_0_10px_rgba(0,210,255,0.2)] transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc, color, colSpan = "" }: { icon: string; title: string; desc: string; color: string; colSpan?: string }) {
  const textColors: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    "primary-fixed": "text-primary-fixed",
  };
  return (
    <div className={`glass-card p-stack-md rounded-2xl hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-white/20 group ${colSpan}`}>
      <span className={`material-symbols-outlined ${textColors[color]} text-4xl mb-4 group-hover:scale-110 transition-transform`}>{icon}</span>
      <h4 className="font-bold mb-2 text-lg">{title}</h4>
      <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ title, desc, tags, img, demo }: { title: string; desc: string; tags: string[]; img: string; demo: string }) {
  return (
    <div className="glass-card group rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500">
      <div className="h-64 overflow-hidden relative shrink-0">
        <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
      </div>
      <div className="p-stack-md flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-[9px] bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-on-surface-variant text-sm mb-stack-md flex-grow line-clamp-3">{desc}</p>
        <div className="flex gap-4">
          <a className="text-primary text-sm font-bold flex items-center gap-1 hover:underline" href={demo} target="_blank" rel="noopener noreferrer">
            Demo <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, title, desc, color, active = false }: { date: string; title: string; desc: string; color: string; active?: boolean }) {
  const dotColors: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  };
  const textColors: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };
  return (
    <div className="relative pl-10">
      <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full ${dotColors[color]} ${active ? "animate-pulse shadow-[0_0_15px_rgba(0,210,255,0.8)]" : ""}`}></div>
      <span className={`${textColors[color]} font-bold text-xs tracking-widest uppercase`}>{date}</span>
      <h3 className="text-xl font-bold mt-1">{title}</h3>
      <p className="text-on-surface-variant mt-2 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function ContactInfo({ icon, label, value, color }: { icon: string; label: string; value: React.ReactNode; color: string }) {
  const textColors: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
  };
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-12 h-12 rounded-full glass-card flex items-center justify-center ${textColors[color]} group-hover:scale-110 transition-transform`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-0.5">{label}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ text, href }: { text: string; href: string }) {
  return (
    <a className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all font-bold text-xs border border-white/5 hover:border-primary/50" href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

function Input({ placeholder, type, value, onChange, required }: { placeholder: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean }) {
  return (
    <input className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-on-surface-variant/50" placeholder={placeholder} type={type} value={value} onChange={onChange} required={required} />
  );
}

function TechItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
      <p className="font-bold text-sm text-primary">{name}</p>
      <p className="text-[10px] text-on-surface-variant uppercase">{desc}</p>
    </div>
  );
}
