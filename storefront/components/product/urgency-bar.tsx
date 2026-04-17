'use client'

import { useState, useEffect } from 'react'
import { Clock, Users } from 'lucide-react'

interface UrgencyBarProps {
  inventoryCount?: number | null
}

export default function UrgencyBar({ inventoryCount }: UrgencyBarProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [viewers] = useState(() => Math.floor(Math.random() * 12) + 8)

  useEffect(() => {
    // Count down to midnight (end of sale) 
    function getTimeUntilMidnight() {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(23, 59, 59, 999)
      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      return { hours, minutes, seconds }
    }

    setTimeLeft(getTimeUntilMidnight())
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="space-y-3">
      {/* Live viewers */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>
            <strong className="text-foreground font-semibold">{viewers} people</strong> viewing this right now
          </span>
        </div>
      </div>

      {/* Sale countdown */}
      <div className="flex items-center gap-3 bg-accent/8 border border-accent/20 px-4 py-3">
        <Clock className="h-4 w-4 text-accent flex-shrink-0" />
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Sale ends in</span>
          <span className="font-bold text-foreground tabular-nums">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </span>
        </div>
      </div>

      {/* Stock warning */}
      {inventoryCount != null && inventoryCount > 0 && inventoryCount <= 12 && (
        <p className="text-xs font-semibold text-amber-600">
          Only {inventoryCount} left — selling fast
        </p>
      )}
    </div>
  )
}
