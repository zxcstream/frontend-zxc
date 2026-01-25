import InstallButton from "@/components/ui/install";
import { Smartphone, Zap, Bell, Download } from "lucide-react";

export default function InstallPwa() {
  return (
    <div className="min-h-screen  grid place-items-center py-25">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-brand text-6xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-red-700  to-zinc-950 bg-clip-text text-transparent">
            ZXCPRIME
          </h1>

          <p className="text-zinc-400 font-medium tracking-wide text-lg md:text-xl mb-2">
            Install on your device
          </p>

          <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto">
            Get instant access with our progressive web app. No app store
            required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Native Feel</h3>
            <p className="text-zinc-400 text-sm">
              Works like a native app on your device
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-zinc-400 text-sm">
              Optimized performance and quick loading
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
              <Bell className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-zinc-400 text-sm">
              Receive notifications and updates
            </p>
          </div>
        </div>

        {/* Install Button */}
        <div className="flex justify-center mb-10">
          <InstallButton />
        </div>

        {/* Instructions */}

        {/* Footer Note */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          Works on all modern browsers and devices
        </p>
      </div>
    </div>
  );
}
