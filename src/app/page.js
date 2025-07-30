"use client";

import Profile from "@/components/molecules/profile";
import Terminal from "@/components/organisms/terminal";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import localFont from 'next/font/local';

const fantasqueBold = localFont({ src: '../../public/fonts/FantasqueSansMNerdFont-Bold.ttf' });

export default function Home() {
  const [terminal, setTerminal] = useState([]);
  const gridCols = useMemo(() => {
    return `grid-cols-${terminal.length > 2 ? 2 : terminal.length}`;
  }, [terminal.length]);

  const handleKeyDown = useCallback((event) => {
    const whiteList = ["F12", "Control", "r"];

    if (!whiteList.includes(event.key)) {
      event.preventDefault();
    }
    console.log(event.key);

    if (event.key === "Enter") {
      setTerminal((prev) => {
        return [...prev, { closing: false }];
      });
    }
    if(event.key === 'p') {
      setTerminal((prev) => {
        return [...prev, { closing: false, child: <Profile/> }];
      });
    }
    if (event.key === "w") {
      setTerminal((prev) => {
        prev[prev.length - 1] = {
          ...prev[prev.length - 1],
          closing: true
        }
        return [
          ...prev
        ]
      })
    }
    
  }, []);

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
        }, 500);

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

  return (
    <div className={`relative bg-[url(/images/main-wp.png)] w-full h-screen bg-cover bg-center overflow-hidden text-[16px] ${fantasqueBold.className}`}>
      <div className={`grid grid-cols-2 grid-rows-2 gap-3 h-full p-2`}>
        {terminal.map((item, index) => {
          const totalTerminals = terminal.length;
          const gridClasses = getTerminalGridClasses(index, totalTerminals);

          return (
            <Terminal item={item} key={index} className={`${gridClasses}`}>
              {
                item.child || (
                  <div className="text-white text-center">
                    <h1 className="text-4xl font-bold">Welcome to Portfolio Hyprland {index}</h1>
                    <p className="mt-4">Showcasing the best of Hyprland</p>
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
