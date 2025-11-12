import React from "react";
import Image from "next/image";
import heroImage from "@/assistes/Icon/hero1.webp"; // adjust path if your image lives in /public

export default function Hero() {
  return (
    <section className="bg-[#1e90ff] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
          {/* LEFT: text content */}
          <div className="z-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="bg-white/90 text-[#1e90ff] font-semibold px-3 py-1 rounded-sm text-sm">
                MY25
              </span>
              <span className="text-sm font-medium opacity-90">
                25% off for new user
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow">
              #1 Dry Cleaning & Laundry
              <br />
              Service in Noida
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-white/90 font-medium">
              Now 25% Off for First Order — Serving{" "}
              <span className="text-yellow-300 font-bold">68 cities</span>
            </p>

            <p className="mt-6 text-2xl font-bold text-white/90">
              Greater Noida
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/cleaners/tumbledry-s76"
                className="inline-block bg-white text-[#1e90ff] font-semibold px-5 py-3 rounded shadow hover:translate-y-[-1px] transition-transform"
              >
                Book Pickup
              </a>
              {/* <a
                href="/cleaners"
                className="inline-block border border-white/30 text-white/95 px-4 py-3 rounded hover:bg-white/10 transition"
              >
                View Cleaners
              </a> */}
            </div>
          </div>

          {/* RIGHT: image + floating badges */}
          <div className="relative flex justify-center lg:justify-end items-center">
            {/* Blue concentric circles background */}
            <div className="hidden lg:block absolute -right-24 w-[480px] h-[480px] rounded-full bg-[#0f6fe8]/20 blur-[18px]"></div>
            <div className="hidden lg:block absolute -right-12 w-[360px] h-[360px] rounded-full bg-[#0f6fe8]/10 blur-[12px]"></div>

            {/* Hero image */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src={heroImage}
                alt="Tidee Services - laundry hero"
                priority
                className="rounded-xl shadow-2xl"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />

              {/* Floating badge 1 */}
              <div className="hidden md:flex absolute -top-4 right-6 bg-white rounded-xl px-3 py-2 items-center gap-2 shadow">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-100 text-yellow-600 font-bold">
                  ★
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Best
                  </div>
                  <div className="text-xs text-slate-500">Cleaning Service</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="hidden md:flex absolute top-20 right-[-10px] bg-white rounded-xl px-3 py-2 items-center gap-2 shadow">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-orange-100 text-orange-600">
                  ⚙
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Qualified
                  </div>
                  <div className="text-xs text-slate-500">Team Work</div>
                </div>
              </div>

              {/* Floating shield icon bottom-left */}
              <div className="absolute -left-6 bottom-6 bg-white p-2 rounded-full shadow hidden md:block">
                <div className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
