"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface LocationImageSliderProps {
    images: string[];
}

const LocationImageSlider = ({ images }: LocationImageSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const imageCount = images.length;

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % imageCount);
    }, [imageCount]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }, [imageCount]);

    // Autoplay with pause-on-hover
    useEffect(() => {
        if (isPaused || imageCount <= 1) return;

        intervalRef.current = setInterval(goToNext, 4500);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, goToNext, imageCount]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0) goToNext();
            else goToPrev();
        }
        touchStartX.current = null;
    };

    // Prevent card click when interacting with slider
    const handleSliderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!images.length) return null;

    return (
        <div
            className="relative w-full h-[200px] md:h-[240px] rounded-t-2xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={handleSliderClick}
        >
            {/* Images */}
            {images.map((src, index) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
                    style={{ opacity: index === activeIndex ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt={`Location view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                    />
                </div>
            ))}

            {/* Subtle warm gradient overlay at bottom */}
            <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, hsl(38 45% 65% / 0.1), transparent)",
                }}
            />

            {/* Dot indicators */}
            {imageCount > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex(index);
                            }}
                            className={`rounded-full transition-all duration-300 ${index === activeIndex
                                    ? "w-2 h-2 bg-champagne shadow-sm"
                                    : "w-1.5 h-1.5 bg-sand/60"
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationImageSlider;
