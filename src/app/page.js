"use client";

import React from 'react';
import Profile from "@/components/molecules/profile";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import localFont from 'next/font/local';
import { useTerminal } from '@/utils/store/terminal';
import ProgressBar from '@/components/atoms/progress-bar';
import HelpTerminal from '@/components/molecules/help-terminal';
import { useIsMobile } from '@/utils/hooks/is-mobile';
import Projects from '@/components/molecules/projects';
import Header from '@/components/molecules/header';
import Desktops from '@/components/templates/desktops';
import { useDesktops } from '@/utils/store/desktop';
import Desktop from '@/components/organisms/desktop';

const fantasqueBold = localFont({ src: '../../public/fonts/FantasqueSansMNerdFont-Bold.ttf' });

export default function Home() {
  const isMobile = useIsMobile()
  const [terminal, setTerminal] = useState([
    {id: Math.random(), closing: false, floating: true, idDesktop: 0 },
  ]);
  const [isCurrentlyClosing, setIsCurrentlyClosing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const {
    currentDesktop,
  } = useDesktops();

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
      return [...prev, { id: Math.random(), idDesktop: currentDesktop, closing: false }];
    });
  }, [currentDesktop]);
  const newProfileTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), idDesktop: currentDesktop, closing: false, child: <Profile /> }];
    });
  }, [currentDesktop]);

  const newHelpTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), idDesktop: currentDesktop, closing: false, floating: true, child: <HelpTerminal /> }];
    });
  }, [currentDesktop]);

  const newProjectTerminal = useCallback(() => {
    setTerminal((prev) => {
      return [...prev, { id: Math.random(), idDesktop: currentDesktop, closing: false, child: <Projects showTerminal={false} /> }];
    });
  }, [currentDesktop]);

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
        <Header
          newHelpTerminal={newHelpTerminal}
        />

        <div className={`absolute top-[40%] right-0 z-50 ${isMobile ? 'flex' : 'hidden'}`}>
          <div className="flex flex-col items-center gap-2 max-w-4 bg-black/75 px-5 py-2.5 rounded-full mr-1">
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150" title="New Terminal" onClick={() => newTerminal()}>+</button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150" title="Close Terminal" onClick={() => closeTerminal()}>-</button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150 -translate-x-1" title="Profile Terminal" onClick={() => newProfileTerminal()}></button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150 -translate-x-1.25" title="Profile Terminal" onClick={() => newProjectTerminal()}>󰲋</button>
            <button className="text-[1.5em] cursor-pointer transition-transform active:scale-150 -translate-x-1.25" title="Profile " onClick={() => newProjectTerminal()}>󰲋</button>
          </div>
        </div>
        <Desktop terminal={terminal} desktop={{id: 0}} />
        {/* <Desktops terminal={terminal} /> */}
      </div>
    </>
  );
}
