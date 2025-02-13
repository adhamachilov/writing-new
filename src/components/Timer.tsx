import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Timer as TimerIcon, AlertTriangle, Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  onTimeUp?: () => void;
}

export default function Timer({ onTimeUp }: TimerProps) {
  const { isDarkMode } = useStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isWarning, setIsWarning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [mode, setMode] = useState<'countdown' | 'stopwatch'>('countdown');
  const [stopwatchTime, setStopwatchTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      if (mode === 'countdown' && timeLeft !== null) {
        interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev === null) return null;
            if (prev <= 0) {
              clearInterval(interval);
              onTimeUp?.();
              return 0;
            }
            const remaining = prev - 1000;
            setIsWarning(remaining < 300000); // Warning when less than 5 minutes
            return remaining;
          });
        }, 1000);
      } else if (mode === 'stopwatch') {
        interval = setInterval(() => {
          setStopwatchTime(prev => prev + 1000);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, mode, timeLeft]);

  const startTimer = () => {
    if (mode === 'countdown') {
      setTimeLeft(duration * 60 * 1000);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'countdown') {
      setTimeLeft(duration * 60 * 1000);
    } else {
      setStopwatchTime(0);
    }
    setIsWarning(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900'
    } ${isWarning && isRunning ? 'animate-pulse' : ''}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as 'countdown' | 'stopwatch');
              resetTimer();
            }}
            className={`px-2 py-1 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <option value="countdown">Countdown</option>
            <option value="stopwatch">Stopwatch</option>
          </select>
          
          {mode === 'countdown' && !isRunning && (
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              className={`w-20 px-2 py-1 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
              placeholder="Minutes"
            />
          )}
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            {isWarning && isRunning ? (
              <AlertTriangle className={`w-5 h-5 ${
                isDarkMode ? 'text-red-400' : 'text-red-500'
              }`} />
            ) : (
              <TimerIcon className={`w-5 h-5 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-500'
              }`} />
            )}
            <span className={`font-mono text-xl ${
              isWarning && isRunning
                ? isDarkMode ? 'text-red-400' : 'text-red-500'
                : ''
            }`}>
              {mode === 'countdown' 
                ? formatTime(timeLeft ?? duration * 60 * 1000)
                : formatTime(stopwatchTime)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}