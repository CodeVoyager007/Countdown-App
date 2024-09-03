"use client"; // Enables client-side rendering for this component

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>(""); // State to manage the duration input
  const [timeLeft, setTimeLeft] = useState<number>(0); // State to manage the countdown timer value
  const [isActive, setIsActive] = useState<boolean>(false); // State to track if the timer is active
  const [isPaused, setIsPaused] = useState<boolean>(false); // State to track if the timer is paused
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Reference to store the timer ID

  // Function to clear the existing timer
  const clearTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Function to handle setting the duration of the countdown
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration); // Set the countdown timer
      setIsActive(false); // Reset active state
      setIsPaused(false); // Reset paused state
      clearTimer(); // Clear any existing timer
    } else {
      alert("Please enter a valid duration in seconds."); // Alert for invalid input
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true); // Set the timer as active
      setIsPaused(false); // Unpause the timer if it was paused
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true); // Set the timer as paused
      setIsActive(false); // Set the timer as inactive
      clearTimer(); // Clear any existing timer
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false); // Set the timer as inactive
    setIsPaused(false); // Set the timer as not paused
    setTimeLeft(typeof duration === "number" ? duration : 0); // Reset the timer to the original duration
    clearTimer(); // Clear any existing timer
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearTimer(); // Clear the interval when time is up
            setIsActive(false); // Stop the timer
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Interval of 1 second
    }
    return () => clearTimer(); // Cleanup function to clear the interval
  }, [isActive, isPaused]);

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = Number(e.target.value);
    setDuration(input >= 0 ? input : ""); // Ensure only non-negative numbers are set
  };

  // JSX return statement rendering the Countdown UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[rgb(63,94,251)] bg-[radial-gradient(circle,_rgba(63,94,251,1)_0%,_rgba(252,70,107,1)_100%)]"> {/* Radial gradient background */}
      <div className="bg-[radial-gradient(circle,_rgba(238,174,202,1)_0%,_rgba(148,187,233,1)_100%)] border-2 border-black shadow-lg rounded-lg p-8 w-full max-w-md hover:shadow-2xl hover:translate-y-[-10px] transition-transform duration-300 hover:bg-[#f5e1e1]"> {/* Card with black border and hover effect */}
        <h1 className="text-3xl font-bold mb-6 text-black text-center font-[cursive]">
          𝓒𝓸𝓾𝓷𝓽𝓭𝓸𝔀𝓷 𝓣𝓲𝓶𝓮𝓻
        </h1>
        <div className="flex flex-col md:flex-row items-center mb-8">
          <Input
            type="number"
            id="duration"
            placeholder="𝓔𝓷𝓽𝓮𝓻 𝓭𝓾𝓻𝓪𝓽𝓲𝓸𝓷 𝓲𝓷 𝓼𝓮𝓬𝓸𝓷𝓭𝓼"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mb-4 md:mb-0 md:mr-4 rounded-md border-gray-300 p-2 text-lg border-[#8B0000] focus:ring-[#8B0000] bg-white text-black font-[cursive]"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="bg-[#8B0000] text-white hover:bg-white hover:text-black rounded-md px-4 py-2 font-[cursive]"
          >
            𝓢𝓮𝓽
          </Button>
        </div>
        <div className="text-7xl font-extrabold text-black mb-10 text-center font-[cursive]">
          {formatTime(timeLeft)}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="bg-[#8B0000] text-white hover:bg-white hover:text-black rounded-md px-6 py-2 font-[cursive]"
            disabled={isActive || timeLeft <= 0}
          >
            𝓢𝓽𝓪𝓻𝓽
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="bg-[#8B0000] text-white hover:bg-white hover:text-black rounded-md px-6 py-2 font-[cursive]"
            disabled={!isActive}
          >
            𝓟𝓪𝓾𝓼𝓮
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-[#8B0000] text-white hover:bg-white hover:text-black rounded-md px-6 py-2 font-[cursive]"
            disabled={timeLeft <= 0}
          >
            𝓡𝓮𝓼𝓮𝓽
          </Button>
        </div>
      </div>
      <div className="mt-6 text-center text-black text-lg font-[cursive]">
        𝓜𝓪𝓭𝓮 𝔀𝓲𝓽𝓱 <span className="text-[#8B0000]">❤️</span> 𝓫𝔂 𝓐𝔂𝓮𝓼𝓱𝓪 𝓜𝓾𝓰𝓱𝓪𝓵
      </div>
    </div>
  );
}
