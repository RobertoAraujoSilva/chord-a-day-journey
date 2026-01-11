import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressContextType {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  completedDays: number[];
  introCompleted: boolean;
  streak: number;
  markDayComplete: (day?: number) => void;
  markIntroComplete: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCompletedDays = localStorage.getItem("completedDays");
    const savedIntroCompleted = localStorage.getItem("introCompleted");
    const savedStreak = localStorage.getItem("streak");
    const savedLastDate = localStorage.getItem("lastCompletedDate");

    if (savedCompletedDays) {
      const parsed = JSON.parse(savedCompletedDays);
      setCompletedDays(parsed);
      setCurrentDay(Math.min(parsed.length + 1, 30));
    }
    if (savedIntroCompleted) {
      setIntroCompleted(JSON.parse(savedIntroCompleted));
    }
    if (savedStreak) {
      setStreak(JSON.parse(savedStreak));
    }
    if (savedLastDate) {
      setLastCompletedDate(savedLastDate);
    }
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();

    if (lastCompletedDate === today) {
      return; // Already counted today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompletedDate === yesterday.toDateString()) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", JSON.stringify(newStreak));
    } else if (lastCompletedDate !== today) {
      setStreak(1);
      localStorage.setItem("streak", JSON.stringify(1));
    }

    setLastCompletedDate(today);
    localStorage.setItem("lastCompletedDate", today);
  };

  const markDayComplete = (day?: number) => {
    const dayToComplete = day ?? currentDay;
    if (!completedDays.includes(dayToComplete)) {
      const newCompletedDays = [...completedDays, dayToComplete].sort((a, b) => a - b);
      setCompletedDays(newCompletedDays);
      localStorage.setItem("completedDays", JSON.stringify(newCompletedDays));

      if (dayToComplete < 30) {
        setCurrentDay(dayToComplete + 1);
      }

      updateStreak();
    }
  };

  const markIntroComplete = () => {
    setIntroCompleted(true);
    localStorage.setItem("introCompleted", JSON.stringify(true));
    updateStreak();
  };

  return (
    <ProgressContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        completedDays,
        introCompleted,
        streak,
        markDayComplete,
        markIntroComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
