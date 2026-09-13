import React, { useEffect, useState, useRef } from 'react'
import Canvas from './Canvas'
import data from './data'
import canvasImages from './canvasimages'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import gsap from 'gsap'

const navLinks = [
  { name: "What we do", href: "#" },
  { name: "Who we are", href: "#" },
  { name: "How we give back", href: "#" },
  { name: "Talk to us", href: "#" }
]

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false)
  const [isRedBg, setIsRedBg] = useState(false)

  const cursorRef = useRef(null)
  const chiliRef = useRef(null)
  const overlayRef = useRef(null)

  // Locomotive Scroll & Mouse Cursor Movement
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll()

    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      locomotiveScroll.destroy()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Oval Red Expansion on Open, Instant Black on Close
  // Pehli click par Red smooth expand hoga, doosri click par FORAN Black
  useEffect(() => {
    if (isRedBg) {
      gsap.to(overlayRef.current, {
        clipPath: "ellipse(160% 160% at 50% 100%)",
        duration: 2.2,
        ease: "power2.inOut"
      })
    } else {
      // Red animation ko instantly stop karke red overlay ko bilkul khatam (0%) kar do
      gsap.killTweensOf(overlayRef.current)
      gsap.set(overlayRef.current, {
        clipPath: "ellipse(0% 0% at 50% 100%)"
      })
    }
  }, [isRedBg])

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 5,
      duration: 0.3,
      ease: "power2.out"
    })
    gsap.to(chiliRef.current, {
      opacity: 1,
      scale: 0.8,
      duration: 0.3
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    gsap.to(chiliRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3
    })
  }

  return (
    <div className={`w-full bg-black ${isRedBg ? 'text-black' : 'text-white'} transition-colors duration-500 font-[Helvetica] relative selection:bg-black selection:text-white`}>

      {/* Oval Shape Bottom-to-Top Red Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-full bg-red-600 z-0 pointer-events-none"
        style={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
      />

      {/* Dynamic Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
      >
        <img
          ref={chiliRef}
          src={canvasImages[0]}
          alt="Chili"
          className="w-full h-full object-contain opacity-0 scale-0"
        />
      </div>

      {/* SECTION 1: HERO SECTION */}
      <div className='w-full min-h-screen relative flex flex-col justify-between overflow-hidden'>
        {showCanvas && data[0].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        {/* Navbar */}
        <nav className="w-full py-6 px-10 fixed top-0 left-0 z-50 flex justify-between items-center">
          <h3 className='text-xl font-bold tracking-tighter'>ThirtySixStudio</h3>
          <ul className="flex space-x-8">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`${isRedBg ? 'text-black hover:text-white' : 'text-white hover:text-blue-400'} transition text-sm`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hero Text Content & Rotating Circular Text */}
        <div className='textcontainer px-[20%] pt-36 relative z-10 flex justify-between items-start'>
          {/* Left Text Block */}
          <div className='text w-[50%]'>
            <h3 className='leading-[1.1] text-4xl font-normal transition-colors duration-500'>
              At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
            </h3>
            <p className={`text-md w-[80%] mt-10 font-normal leading-relaxed transition-colors duration-500 ${isRedBg ? 'text-black/80' : 'text-white/80'}`}>
              We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
            </p>
            <p className={`text-md mt-8 transition-colors duration-500 ${isRedBg ? 'text-black/60' : 'text-white/60'}`}>
              scroll
            </p>
          </div>

          {/* Rotating Circular Text Badge */}
          <div className="w-48 h-48 animate-[spin_12s_linear_infinite] select-none opacity-90 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
              <path
                id="circlePath"
                d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
                fill="none"
              />
              <text className="text-[12px] font-semibold tracking-[2.8px] uppercase">
                <textPath href="#circlePath">
                  THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Interactive Big Heading */}
        <div className='w-full px-8 z-10 overflow-hidden'>
          <h1
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setShowCanvas(prev => !prev)
              setIsRedBg(prev => !prev)
            }}
            className='text-[16rem] mt-[14rem] font-normal leading-none tracking-tight whitespace-nowrap cursor-pointer select-none transition-colors duration-500'
          >
            Thirtysixstudio
          </h1>
        </div>
      </div>

      {/* SECTION 2: 01 — WHAT WE DO */}
      <div className='w-full min-h-screen px-16 pt-32 pb-20 flex justify-between relative z-10 overflow-hidden'>
        {showCanvas && data[1].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='w-[35%] relative z-10 pl-12'>
          <h3 className='text-sm font-semibold tracking-wider uppercase opacity-90'>
            01 — WHAT WE DO
          </h3>
        </div>

        <div className='w-[45%] flex flex-col justify-between relative z-10 pr-10'>
          <div className='w-full'>
            <h2 className='text-6xl font-normal leading-[1.15] tracking-tight'>
              We elevate creative production in the advertising industry, transforming ambitious ideas into reality.
            </h2>
          </div>

          <div className='mt-36 w-[80%]'>
            <p className='text-lg leading-relaxed opacity-90 font-light'>
              By combining cutting-edge craft with modern technology and top-tier processes, we deliver sophisticated work that resonates.
            </p>
            <p className='text-md mt-6 opacity-70 font-light'>
              Our agile approach balances innovation with simplicity.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: OUR SERVICES */}
      <div className='w-full min-h-screen px-16 pt-32 pb-20 flex justify-between relative z-10 overflow-hidden border-t border-current/20'>
        {showCanvas && data[2] && data[2].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='w-[35%] pl-12 relative z-10'>
          <h3 className='text-sm font-semibold tracking-wider uppercase opacity-90'>
            OUR SERVICES
          </h3>
        </div>

        <div className='w-[50%] pr-10 relative z-10'>
          <p className='text-4xl leading-[1.25] font-normal tracking-tight w-[90%]'>
            Captivating design. Interactive animation. Reliable code. Immaculate project coordination. Whether you need a full-scale campaign built from scratch or expert assistance during a specific phase of production, we adapt to your needs to deliver on brand.
          </p>
        </div>
      </div>

      {/* SECTION 4: 02 — WHO WE ARE */}
      <div className='w-full min-h-screen px-16 pt-32 pb-20 flex justify-between relative z-10 overflow-hidden border-t border-current/20'>
        {showCanvas && data[3] && data[3].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='w-[35%] pl-12 relative z-10'>
          <h3 className='text-sm font-semibold tracking-wider uppercase opacity-90'>
            02 — WHO WE ARE
          </h3>
        </div>

        <div className='w-[45%] pr-10 relative z-10'>
          <h2 className='text-6xl font-normal leading-[1.15] tracking-tight w-[90%]'>
            We elevate creative production, while creating impact and opportunity.
          </h2>
        </div>
      </div>

      {/* SECTION 5: AGILE / INNOVATIVE / CONNECTED */}
      <div className='w-full min-h-screen px-16 pt-24 pb-20 relative z-10 overflow-hidden border-t border-current/20 flex flex-col justify-between'>
        {showCanvas && data[4] && data[4].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='flex justify-between items-start my-6 relative z-10 pl-12'>
          <h1 className='text-[9rem] font-normal leading-none tracking-tight'>
            Agile
          </h1>
          <p className='w-[32%] text-sm leading-relaxed opacity-80 pr-10 pt-2'>
            We live and breathe efficiency and are not limited by geography. Local to Amsterdam with hubs in London, Paris, Johannesburg, New York, and beyond, we curate the right team for each project and get moving swiftly.
          </p>
        </div>

        <div className='flex justify-between items-start my-6 relative z-10 pl-12'>
          <h1 className='text-[9rem] font-normal leading-none tracking-tight'>
            Innovative
          </h1>
          <p className='w-[32%] text-sm leading-relaxed opacity-80 pr-10 pt-2'>
            We use carefully crafted operational processes and modern technology to ensure our initiatives run smoothly. This allows our lean and specialized team to maximize momentum and focus on what matters.
          </p>
        </div>

        <div className='flex justify-between items-start my-6 relative z-10 pl-12'>
          <h1 className='text-[9rem] font-normal leading-none tracking-tight'>
            Connected
          </h1>
          <p className='w-[32%] text-sm leading-relaxed opacity-80 pr-10 pt-2'>
            We are community-focused, and deliberate about challenging the status quo. Our people reflect today's realities and remain deeply connected to culture.
          </p>
        </div>
      </div>

      {/* SECTION 6: 03 — HOW WE GIVE BACK */}
      <div className='w-full min-h-screen px-16 pt-32 pb-20 flex justify-between relative z-10 overflow-hidden border-t border-current/20'>
        {showCanvas && data[5] && data[5].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='w-[35%] pl-12 relative z-10'>
          <h3 className='text-sm font-semibold tracking-wider uppercase opacity-90'>
            03 — HOW WE GIVE BACK
          </h3>
        </div>

        <div className='w-[50%] pr-10 relative z-10'>
          <p className='text-4xl leading-[1.25] font-normal tracking-tight w-[95%]'>
            At Thirtysixstudio, we recognize that our industry can perpetuate harm. We believe we have to try and reverse some of these imbalances. That’s why we’re launching SS36, our local social sustainability hub.
          </p>

          <p className='mt-16 text-lg leading-relaxed opacity-80 font-light w-[85%]'>
            Through SS36, we reinvest some of our revenue and expertise into the communities that shape the culture and trends our field so heavily relies on. Our main focus is on bridging gaps for those affected by systemic shortfalls.
          </p>
        </div>
      </div>

      {/* SECTION 7: CLIENTS / CONTACT */}
      <div className='w-full min-h-screen px-16 pt-52 pb-32 mt-32 flex flex-col justify-between relative z-10 overflow-hidden border-t border-current/20'>
        {showCanvas && data[6] && data[6].map((canvasdets, idx) => (
          <Canvas key={idx} details={canvasdets} />
        ))}

        <div className='flex justify-between items-start w-full relative z-10'>
          <div className='w-[35%] pl-12 relative z-10'>
            <h3 className='text-sm font-semibold tracking-wider uppercase opacity-90'>
              CLIENTS
            </h3>
          </div>

          <div className='w-[50%] pr-10 relative z-10'>
            <h2 className='text-6xl font-normal leading-[1.15] tracking-tight w-[90%]'>
              Ready to get your project off the ground?
            </h2>

            <p className='mt-10 text-lg leading-relaxed opacity-80 font-light w-[80%]'>
              We're currently accepting new clients and are excited to hear from you. Get in touch by sending an email to{' '}
              <a href="mailto:hello@thirtysixstudio.com" className="underline hover:opacity-70 transition">
                hello@thirtysixstudio.com
              </a>{' '}
              or fill out the form below to start your journey with us.
            </p>
          </div>
        </div>

        {/* Centered Rounded Form Fields */}
        <div className='w-full flex justify-center mt-20 relative z-10 px-12'>
          <form className='w-full max-w-4xl flex flex-col space-y-6' onSubmit={(e) => e.preventDefault()}>
            <div className='w-full border border-current/30 rounded-full py-5 px-8 flex items-center'>
              <input
                type="text"
                placeholder="Name*"
                className="w-full bg-transparent outline-none text-2xl placeholder:text-current placeholder:opacity-90 font-light"
              />
            </div>

            <div className='w-full border border-current/30 rounded-full py-5 px-8 flex items-center'>
              <input
                type="email"
                placeholder="Email*"
                className="w-full bg-transparent outline-none text-2xl placeholder:text-current placeholder:opacity-90 font-light"
              />
            </div>

            <div className='w-full border border-current/30 rounded-full py-5 px-8 flex items-center'>
              <input
                type="text"
                placeholder="Topic*"
                className="w-full bg-transparent outline-none text-2xl placeholder:text-current placeholder:opacity-90 font-light"
              />
            </div>

            <div className='w-full border border-current/30 rounded-3xl py-5 px-8 flex items-start'>
              <textarea
                rows="3"
                placeholder="Message*"
                className="w-full bg-transparent outline-none text-2xl placeholder:text-current placeholder:opacity-90 font-light resize-none"
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 8: FOOTER */}
      <footer className='w-full px-16 pt-24 pb-12 relative z-10 overflow-hidden border-t border-current/20 flex flex-col justify-between min-h-[60vh]'>
        {showCanvas && data[7] && data[7].map((canvasdets, idx) => {
          const spreadLefts = [8, 24, 42, 58, 74, 88];
          const spreadTops = [12, 58, 20, 64, 15, 50];

          return (
            <Canvas
              key={idx}
              details={{
                ...canvasdets,
                left: spreadLefts[idx % spreadLefts.length],
                top: spreadTops[idx % spreadTops.length]
              }}
            />
          )
        })}

        <div className='flex justify-between items-start w-full relative z-10 pl-12 pr-10'>
          <div className='flex space-x-24'>
            <div>
              <h4 className='text-xs font-semibold tracking-wider uppercase opacity-60 mb-6'>
                Socials
              </h4>
              <ul className='space-y-3 text-lg font-light'>
                <li><a href="#" className='hover:opacity-60 transition'>Instagram</a></li>
                <li><a href="#" className='hover:opacity-60 transition'>LinkedIn</a></li>
                <li><a href="#" className='hover:opacity-60 transition'>Twitter / X</a></li>
              </ul>
            </div>

            <div>
              <h4 className='text-xs font-semibold tracking-wider uppercase opacity-60 mb-6'>
                Hubs
              </h4>
              <ul className='space-y-3 text-lg font-light opacity-80'>
                <li>Amsterdam</li>
                <li>London</li>
                <li>New York</li>
              </ul>
            </div>
          </div>

          <div className='text-right space-y-3 text-sm font-light opacity-70'>
            <p>&copy; {new Date().getFullYear()} Thirtysixstudio. All rights reserved.</p>
            <div className='flex space-x-6 justify-end pt-2'>
              <a href="#" className='hover:underline'>Privacy Policy</a>
              <a href="#" className='hover:underline'>Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App