import { useState, useEffect } from 'react'
import { Clock, Sun, Moon, CloudSun } from 'lucide-react'

export default function JapanLiveTime() {
  const [time, setTime] = useState('')
  const [greeting, setGreeting] = useState('')
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Tokyo is UTC+9
      const options = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      const tokyoTimeString = new Intl.DateTimeFormat('en-US', options).format(now)
      setTime(tokyoTimeString)

      // Get Tokyo current hour
      const hourOptions = { timeZone: 'Asia/Tokyo', hour: 'numeric', hour12: false }
      const hour = parseInt(new Intl.DateTimeFormat('en-US', hourOptions).format(now), 10)

      if (hour >= 5 && hour < 12) {
        setGreeting('おはよう (Good Morning)')
        setIsNight(false)
      } else if (hour >= 12 && hour < 18) {
        setGreeting('こんにちは (Good Afternoon)')
        setIsNight(false)
      } else {
        setGreeting('こんばんは (Good Evening)')
        setIsNight(true)
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs shadow-sm">
      <span className="text-sm">{isNight ? '🌙' : '☀️'}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-amber-300 font-mono tracking-wider">{time || '12:00:00 PM'} JST</span>
        <span className="text-white/60 text-[11px] hidden md:inline">· {greeting}</span>
      </div>
    </div>
  )
}
