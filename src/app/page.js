"use client";

import React from 'react';
import Profile from "@/components/molecules/profile";
import Terminal from "@/components/organisms/terminal";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import localFont from 'next/font/local';
import MainTerminal from "@/components/molecules/main-terminal";
import { useTerminal } from '@/utils/store/terminal';

const fantasqueBold = localFont({ src: '../../public/fonts/FantasqueSansMNerdFont-Bold.ttf' });

export default function Home() {
  const [terminal, setTerminal] = useState([]);
  const [isCurrentlyClosing, setIsCurrentlyClosing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());
  const {
    focusedIndex,
    clearLastHistory,
    resetInput
  } = useTerminal()

  const gridCols = useMemo(() => {
    return `grid-cols-${terminal.length > 2 ? 2 : terminal.length}`;
  }, [terminal.length]);

  const handleKeyDown = useCallback((event) => {
    if (isCurrentlyClosing) return;
    const whiteList = ["F12", "r", "=", "-", "0"];

    if (!whiteList.includes(event.key) && !event.ctrlKey) {
      event.preventDefault();
    }
    console.log(event.key);

    if (event.key === "Enter" && event.altKey) {
      setTerminal((prev) => {
        return [...prev, { closing: false }];
      });
    }
    if (event.key === 'p' && event.altKey) {
      setTerminal((prev) => {
        return [...prev, { closing: false, child: <Profile/> }];
      });
    }
    if (event.key === "q" && event.altKey) {
      setTerminal((prev) => {
        prev[focusedIndex] = {
          ...prev[focusedIndex],
          closing: true
        }
        return [
          ...prev
        ]
      })

      clearLastHistory()
      resetInput(focusedIndex)

      setIsCurrentlyClosing(true);
    }
    
  }, [clearLastHistory, focusedIndex, isCurrentlyClosing]);

  const getTerminalGridClasses = (index, totalTerminals) => {
    if (totalTerminals === 1) {
      return "col-span-full row-span-full"; // 1 jendela penuh
    } else if (totalTerminals === 2) {
      return "col-span-1 row-span-full"; // 2 jendela, masing-masing setengah lebar dan penuh tinggi
    } else {
      // Lebih dari 2 jendela
      if (index === 0) {
        // Jendela pertama: setengah lebar, penuh tinggi
        return "col-span-1 row-span-full";
      } else {
        // Jendela kedua dan seterusnya: setengah lebar, dibagi secara vertikal
        // Perhatikan bahwa ini akan berada di "kolom kedua" secara implisit karena kita sudah menempatkan jendela pertama di `col-span-1`
        return "col-span-1 row-span-1";
      }
    }
  };

  // useEffect(() => {
  //   console.log(terminal);
  //   const timeoutId = setTimeout(() => {
  //     setTerminal((prev) => [...prev.map((item) => ({ ...item, show: true }))]);
  //   }, 100);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [terminal]);

  useEffect(() => {
    terminal.forEach((item, index) => {
      if (item.closing) {
        const timeoutId = setTimeout(() => {
          setTerminal((prev) => prev.filter((_, i) => i !== index));
          setIsCurrentlyClosing(false);
        }, 800);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    });

  }, [terminal]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`relative bg-[url(/images/main-wp.png)] w-full h-screen bg-cover bg-center overflow-hidden text-[16px] ${fantasqueBold.className}`}>
      <header className="top-0 left-0 w-full h-12 bg-black/50 backdrop-blur-lg flex items-center justify-between rounded-lg m-1 px-4">
        <h1 className="text-white text-lg font-bold">My Portfolio</h1>
        <div className="">{currentDate}</div>
        <div className="">

        </div>
      </header>
      <div className={`grid grid-cols-2 grid-rows-2 gap-3 h-[95svh] p-2`}>
        {terminal.map((item, index) => {
          const totalTerminals = terminal.length;
          const gridClasses = getTerminalGridClasses(index, totalTerminals);

          return (
            <Terminal item={item} key={index} index={index} className={`${gridClasses}`}>
              {
                item.child ? React.cloneElement(item.child, { index }) : (
                  <div className={`flex flex-col overflow-scroll max-h-[90svh] transition-opacity ${index !== focusedIndex ? 'opacity-75' : ''}`}>
                    <div className="text-white text-center py-4">
                      <h1 className="text-[2em] font-bold">Hi, I&apos;m Fadhil</h1>
                      <h1 className="text-[2em] font-bold">Welcome to my Hyprland Portfolio</h1>
                      <p className="mt-4">Type help for available commands.</p>
                    </div>
                    <MainTerminal index={index} />
                  </div>
                )
              }
            </Terminal>
          );
        })}
      </div>
    </div>
  );
}
