"use client";

import React from 'react';
import Profile from "@/components/molecules/profile";
import Terminal from "@/components/organisms/terminal";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import localFont from 'next/font/local';
import MainTerminal from "@/components/molecules/main-terminal";
import { useTerminal } from '@/utils/store/terminal';
import OpeningTerminal from '@/components/molecules/opening-terminal';
import ProgressBar from '@/components/atoms/progress-bar';
import TextWithTooltip from '@/components/atoms/text-with-tooltip';
import HelpTerminal from '@/components/molecules/help-terminal';
import { useIsMobile } from '@/utils/hooks/is-mobile';
import TerminalProject from '@/components/molecules/project-terminal';
import Projects from '@/components/molecules/projects';

const fantasqueBold = localFont({ src: '../../public/fonts/FantasqueSansMNerdFont-Bold.ttf' });

export default function Home() {
  const isMobile = useIsMobile()
  const [terminal, setTerminal] = useState([
    { closing: false, floating: true },
  ]);
  const [isCurrentlyClosing, setIsCurrentlyClosing] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const {
    focusedIndex,
    clearLastHistory,
    resetInput,
    setFocusedIndex
  } = useTerminal()

  const gridCols = useMemo(() => {
    return `grid-cols-${terminal.length > 2 ? 2 : terminal.length}`;
  }, [terminal.length]);

  const newTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), closing: false }];
    });
  }, []);
  const newProfileTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), closing: false, child: <Profile /> }];
    });
  }, []);

  const newHelpTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), closing: false, floating: true, child: <HelpTerminal /> }];
    });
  }, []);

  const newProjectTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), closing: false, child: <Projects showTerminal={false} /> }];
    });
  }, []);

  const closeTerminal = useCallback(() => {
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
  }, [focusedIndex, clearLastHistory, resetInput]);

  const handleKeyDown = useCallback((event) => {
    if (isCurrentlyClosing) return;
    const whiteList = ["F12", "r", "=", "-", "0"];

    if (!whiteList.includes(event.key) && !event.ctrlKey) {
      event.preventDefault();
    }
    console.log(event.key);

    if (event.key === "Enter" && event.altKey) {
      newTerminal()
    }
    if (event.key === 'p' && event.altKey) {
      newProfileTerminal();
    }
    if (event.key === 'h' && event.altKey) {
      newHelpTerminal();
    }
    if (event.key === "q" && event.altKey) {
      closeTerminal()
    }

  }, [closeTerminal, isCurrentlyClosing, newHelpTerminal, newProfileTerminal, newTerminal]);

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


  const loadAllAssets = useCallback(async () => {
    const assetUrls = ['/images/main-wp.png'];

    // Promise untuk load semua aset
    const assetPromise = Promise.all(
      assetUrls.map(
        url =>
          new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          })
      )
    );

    // Promise untuk minimum loading time (misalnya 2.5 detik)
    const minimumTimePromise = new Promise(resolve =>
      setTimeout(resolve, 2500)
    );

    try {
      // Tunggu dua-duanya selesai (siapa lambat, dia yang menang)
      await Promise.all([assetPromise, minimumTimePromise]);

      // Pastikan progress ke 100% + delay kecil biar smooth
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Gagal memuat aset:', error);
      setProgress(100);
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    loadAllAssets();
  }, [loadAllAssets]);

  useEffect(() => {
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return newProgress;
        });
      }, 300); // Kecepatan update progress
    }

    return () => clearInterval(interval); // Cleanup
  }, [isLoading]);

  useEffect(() => {
    console.log("Terminal updated:", terminal);
  }, [terminal]);

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
    if(isMobile) {
      return;
    }
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

  useEffect(() => {
    if(isMobile && !isLoading){
      setFocusedIndex(terminal.length - 1)
    }
  }, [isLoading, isMobile, setFocusedIndex, terminal.length])

  return (
    <>
      {
        isLoading && (
          <div className="flex flex-col w-full items-center justify-center h-screen bg-black text-white italic absolute z-50">
            <h1 className="text-white text-2xl mb-4">Loading Assets...</h1>
            <ProgressBar progress={progress} />
          </div>
        )
      }
      <div className={`relative w-full h-screen overflow-hidden text-[16px] ${fantasqueBold.className}`}>
        {/* Background Image */}
        <Image
          src="/images/main-wp.png"
          alt="Background"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* Content */}
        <header className="top-0 left-0 w-full h-12 bg-black/50 backdrop-blur-sm flex items-center justify-between rounded-lg m-1 px-4">
          <h1 className="text-white text-lg font-bold">Diru</h1>
          <div className="">{currentDate}</div>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex items-center gap-4 mx-4">
              <TextWithTooltip tooltip={'Help'}>
                <span className="cursor-pointer text-white text-[1.5em]" onClick={() => newHelpTerminal()}>?</span>
              </TextWithTooltip>
              <TextWithTooltip tooltip={'Linkedin'}>
                <span className="cursor-pointer text-blue-400 text-[1.5em]"></span>
              </TextWithTooltip>
              <TextWithTooltip tooltip={'Github'}>
                <span className="cursor-pointer text-white text-[1.5em]"></span>
              </TextWithTooltip>
            </div>
            <span className="text-gray-400 text-[1em]">|</span>
            <span className="text-white text-[1em]">⏻</span>
          </div>
        </header>

        <div className={`absolute top-[40%] right-0 z-50 ${isMobile ? 'flex' : 'hidden'}`}>
          <div className="flex flex-col items-center gap-2 max-w-4 bg-black/75 px-5 py-2.5 rounded-full mr-1">
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150" title="New Terminal" onClick={() => newTerminal()}>+</button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150" title="Close Terminal" onClick={() => closeTerminal()}>-</button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150 -translate-x-1" title="Profile Terminal" onClick={() => newProfileTerminal()}></button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150 -translate-x-1.25" title="Profile Terminal" onClick={() => newProjectTerminal()}>󰲋</button>
          </div>
        </div>
        {
          terminal?.filter(item => item?.floating)?.map((item, index) => {
            return (
              item.child ? React.cloneElement(item.child, { index, key: item.id }) : <OpeningTerminal
                index={index}
                key={index}
                item={item}
              />
            )
          })
        }

        <div className={`grid grid-cols-2 grid-rows-2 gap-3 h-[95svh] p-2 overflow-hidden`}>
          {terminal?.filter(item => !item?.floating)?.map((item, index) => {
            const totalTerminals = terminal.filter(item => !item?.floating).length;
            const gridClasses = getTerminalGridClasses(index, totalTerminals);

            return (
              <Terminal item={item} key={`terminal-${index}`} index={index} className={`${gridClasses}`}>
                {
                  item.child ? React.cloneElement(item.child, { index }) : (
                    <div className={`flex flex-col overflow-scroll max-h-[90svh] transition-opacity ${index !== focusedIndex ? 'opacity-70' : ''}`}>
                      <div className="text-white text-center py-4">
                        <h1 className="text-[1.25em] md:text-[1.5em] font-bold">Hi, I&apos;m Fadhil</h1>
                        <h1 className="text-[1.25em] md:text-[1.5em] font-bold">Welcome to my Hyprland Portfolio</h1>
                        <p className="mt-4 text-[1em] md:text-[1.25em]">Type <i>help</i> for available commands.</p>
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
    </>
  );
}
