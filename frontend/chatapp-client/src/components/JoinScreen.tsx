import React from 'react'

import { useState } from 'react';

interface JoinProps { onJoin: (username: string) => void }

export const Join = ({ onJoin }: JoinProps) => {
    const [username, setUsername] = useState(""); 
  return (
<div className="flex items-center justify-center min-h-[200px]  p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-sm border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ">
        
        <h2 className="mb-6 text-3xl font-black uppercase tracking-tighter text-black">
          Join a Room
        </h2>

        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-4 border-black bg-white px-4 py-3 text-lg font-bold placeholder-gray-400 outline-none focus:bg-yellow-50 focus:ring-0"
          />

          {/* Join Button */}
          <button
          onClick={()=>onJoin(username)}  
            className="w-full border-4 border-black bg-[#FFD100] py-4 text-xl font-extrabold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-[#e6bc00]"
          >
            Join Now
          </button>
        </div>

        <p className="mt-4 text-xs font-bold uppercase text-gray-500">
          Status: Ready to connect
        </p>
      </div>
    </div>
  )
}
