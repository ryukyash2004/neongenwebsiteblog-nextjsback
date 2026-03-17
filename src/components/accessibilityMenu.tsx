import React, { useState, useEffect } from "react";
import { Accessibility, Type, Palette, Undo2, Volume2, Eye, EyeOff, Minimize2, Maximize, Sun, Moon, Underline, Italic } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { set } from "react-hook-form";

export const AccessibilityMenu = () => {
  // 1. Initialize state by checking localStorage FIRST

  const [textReader, setTextReader] = useState(() => {
    return localStorage.getItem("acc-textReader") === "true";
  }); 
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("acc-fontSize");
    return saved ? parseInt(saved) : 100;
  });
  const [letterSpacing, setLetterSpacing] = useState(() => {
    const saved = localStorage.getItem("acc-letterSpacing");
    return saved ? parseInt(saved) : 0;
  });
  const [lineHeight, setLineHeight] = useState(() => {
    const saved = localStorage.getItem("acc-lineHeight");
    return saved ? parseFloat(saved) : 1.5;
  });
  const [monochrome, setMonochrome] = useState(() => {
    return localStorage.getItem("acc-monochrome") === "true";
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("acc-highContrast") === "true";
  });
  const [highlightLinks, setHighlightLinks] = useState(() => {
    return localStorage.getItem("acc-highlightLinks") === "true";
  });
  const [hideImages, setHideImages] = useState(() => {
    return localStorage.getItem("acc-hideImages") === "true";
  });
  const [largeCursor, setLargeCursor] = useState(() => {
    return localStorage.getItem("acc-largeCursor") === "true";
  });
  const [stopAnimations, setStopAnimations] = useState(() => {
    return localStorage.getItem("acc-stopAnimations") === "true";
  });
  const [underlineLinks, setUnderlineLinks] = useState(() => {
    return localStorage.getItem("acc-underlineLinks") === "true";
  });
  const [invertColors, setInvertColors] = useState(() => {
    return localStorage.getItem("acc-invertColors") === "true";
  });

  // 2. Apply changes to DOM AND save to localStorage whenever state changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.fontSize = `${fontSize}%`;
    root.style.setProperty('--user-letter-spacing', `${letterSpacing}px`);
    root.style.setProperty('--user-line-height', `${lineHeight}`);

    // Apply classes
    if (monochrome) root.classList.add("grayscale");
    else root.classList.remove("grayscale");

    if (highContrast) root.classList.add("high-contrast-mode");
    else root.classList.remove("high-contrast-mode");

    if (highlightLinks) root.classList.add("highlight-links");
    else root.classList.remove("highlight-links");

    if (hideImages) root.classList.add("hide-images");
    else root.classList.remove("hide-images");

    if (largeCursor) root.classList.add("large-cursor");
    else root.classList.remove("large-cursor");

    if (stopAnimations) root.classList.add("stop-animations");
    else root.classList.remove("stop-animations");

    if (underlineLinks) root.classList.add("underline-links");
    else root.classList.remove("underline-links");

    if (invertColors) root.classList.add("invert-colors");
    else root.classList.remove("invert-colors");

    // Save current settings to localStorage
    localStorage.setItem("acc-fontSize", fontSize.toString());
    localStorage.setItem("acc-letterSpacing", letterSpacing.toString());
    localStorage.setItem("acc-lineHeight", lineHeight.toString());
    localStorage.setItem("acc-monochrome", monochrome.toString());
    localStorage.setItem("acc-highContrast", highContrast.toString());
    localStorage.setItem("acc-highlightLinks", highlightLinks.toString());
    localStorage.setItem("acc-hideImages", hideImages.toString());
    localStorage.setItem("acc-largeCursor", largeCursor.toString());
    localStorage.setItem("acc-stopAnimations", stopAnimations.toString());
    localStorage.setItem("acc-underlineLinks", underlineLinks.toString());
    localStorage.setItem("acc-invertColors", invertColors.toString());

  }, [fontSize, letterSpacing, lineHeight, monochrome, highContrast, highlightLinks, hideImages, largeCursor, stopAnimations, underlineLinks, invertColors]);
  
  useEffect(() => {
    localStorage.setItem("acc-textReader", textReader.toString());

    if (!textReader) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const sheetPanel = document.querySelector('[data-radix-sheet-content]') 
                ?? document.querySelector('[role="dialog"]');
      if (sheetPanel && sheetPanel.contains(target)) return;
      const textToRead = target.innerText || target.textContent || target.getAttribute('aria-label');

      if (textToRead && textToRead.trim() !== '') {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(textToRead.trim());
        
        const originalOutline = target.style.outline;
        const originalOutlineOffset = target.style.outlineOffset;
        
        target.style.outline = '3px solid #3b82f6';
        target.style.outlineOffset = '2px';
        
        utterance.onend = () => {
          target.style.outline = originalOutline;
          target.style.outlineOffset = originalOutlineOffset;
        };
        
        utterance.onerror = () => {
           target.style.outline = originalOutline;
           target.style.outlineOffset = originalOutlineOffset;
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    document.body.addEventListener('click', handleElementClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleElementClick, { capture: true });
      window.speechSynthesis.cancel();
    };
  }, [textReader]);

  // 3. Restore Defaults (useEffect will automatically update localStorage)
  const restoreDefaults = () => {
    setTextReader(false);
    setFontSize(100);
    setLetterSpacing(0);
    setLineHeight(1.5);
    setMonochrome(false);
    setHighContrast(false);
    setHighlightLinks(false);
    setHideImages(false);
    setLargeCursor(false);
    setStopAnimations(false);
    setUnderlineLinks(false);
    setInvertColors(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            aria-label="Open Accessibility Menu"
            className="rounded-full w-14 h-14 shadow-2xl glass-effect border border-white/20 text-white hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-all duration-300"
          >
            <Accessibility className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto bg-[#0a0a0a] border-white/10 text-white">
          <SheetHeader className="border-b border-white/10 pb-4 mb-4">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-white" tabIndex={0}>
              <Accessibility className="h-6 w-6 text-blue-400" />
              Accessibility Menu
            </SheetTitle>
          </SheetHeader>

          <Accordion type="multiple" className="w-full">
          
            {/* Audio Adjustments */}
            <AccordionItem value="audio">
              <AccordionTrigger className="text-lg hover:bg-muted/50 px-2 rounded-md">
                <div className="flex items-center gap-3"><Volume2 className="h-5 w-5" /> Audio & Speech</div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="text-reader-toggle" className="text-sm font-medium text-gray-300 cursor-pointer block">Read on Click</label>
                    <span className="text-sm text-gray-500" aria-hidden="true">Click any text on the page to hear it read aloud.</span>
                  </div>
                  <Switch 
                    id="text-reader-toggle" 
                    aria-label="Toggle Read on Click feature"
                    checked={textReader} 
                    onCheckedChange={setTextReader} 
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Text Adjustments */}
            <AccordionItem value="text" className="border-white/10">
              <AccordionTrigger className="text-lg hover:bg-white/5 px-2 rounded-md text-gray-200">
                <div className="flex items-center gap-3"><Type className="h-5 w-5 text-blue-400" /> Text Adjustments</div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 px-2 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label htmlFor="font-size-slider" className="text-sm font-medium text-gray-300 cursor-pointer">Text Size</label>
                    <span className="text-sm text-gray-500" aria-hidden="true">{fontSize}%</span>
                  </div>
                  <Slider
                    id="font-size-slider"
                    aria-label={`Adjust text size, currently ${fontSize} percent`}
                    value={[fontSize]}
                    onValueChange={(val) => setFontSize(val[0])}
                    min={80} max={200} step={5}
                    className="cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label htmlFor="letter-spacing-slider" className="text-sm font-medium text-gray-300 cursor-pointer">Letter Spacing</label>
                    <span className="text-sm text-gray-500" aria-hidden="true">{letterSpacing}px</span>
                  </div>
                  <Slider
                    id="letter-spacing-slider"
                    aria-label={`Adjust letter spacing, currently ${letterSpacing} pixels`}
                    value={[letterSpacing]}
                    onValueChange={(val) => setLetterSpacing(val[0])}
                    min={0} max={10} step={1}
                    className="cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label htmlFor="line-height-slider" className="text-sm font-medium text-gray-300 cursor-pointer">Line Height</label>
                    <span className="text-sm text-gray-500" aria-hidden="true">{lineHeight}x</span>
                  </div>
                  <Slider
                    id="line-height-slider"
                    aria-label={`Adjust line height, currently ${lineHeight} times`}
                    value={[lineHeight]}
                    onValueChange={(val) => setLineHeight(val[0])}
                    min={1} max={3} step={0.1}
                    className="cursor-pointer"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Color & Display */}
            <AccordionItem value="color" className="border-white/10">
              <AccordionTrigger className="text-lg hover:bg-white/5 px-2 rounded-md text-gray-200">
                <div className="flex items-center gap-3"><Palette className="h-5 w-5 text-purple-400" /> Color & Display</div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="monochrome-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Monochrome (Grayscale)</label>
                  <Switch
                    id="monochrome-toggle"
                    aria-label="Toggle Monochrome Mode"
                    checked={monochrome}
                    onCheckedChange={setMonochrome}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="high-contrast-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">High Contrast</label>
                  <Switch
                    id="high-contrast-toggle"
                    aria-label="Toggle High Contrast Mode"
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="invert-colors-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Invert Colors</label>
                  <Switch
                    id="invert-colors-toggle"
                    aria-label="Toggle Inverted Colors"
                    checked={invertColors}
                    onCheckedChange={setInvertColors}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="highlight-links-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Highlight Links</label>
                  <Switch
                    id="highlight-links-toggle"
                    aria-label="Toggle Highlight Links Mode"
                    checked={highlightLinks}
                    onCheckedChange={setHighlightLinks}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="underline-links-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Underline Links</label>
                  <Switch
                    id="underline-links-toggle"
                    aria-label="Toggle Underline Links"
                    checked={underlineLinks}
                    onCheckedChange={setUnderlineLinks}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Vision Assistance */}
            <AccordionItem value="vision" className="border-white/10">
              <AccordionTrigger className="text-lg hover:bg-white/5 px-2 rounded-md text-gray-200">
                <div className="flex items-center gap-3"><Eye className="h-5 w-5 text-green-400" /> Vision Assistance</div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="hide-images-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Hide Images</label>
                  <Switch
                    id="hide-images-toggle"
                    aria-label="Toggle Hide Images"
                    checked={hideImages}
                    onCheckedChange={setHideImages}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="large-cursor-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Large Cursor</label>
                  <Switch
                    id="large-cursor-toggle"
                    aria-label="Toggle Large Cursor"
                    checked={largeCursor}
                    onCheckedChange={setLargeCursor}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Motion & Animation */}
            <AccordionItem value="motion" className="border-white/10">
              <AccordionTrigger className="text-lg hover:bg-white/5 px-2 rounded-md text-gray-200">
                <div className="flex items-center gap-3"><Minimize2 className="h-5 w-5 text-orange-400" /> Reduce Motion</div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="stop-animations-toggle" className="text-sm font-medium text-gray-300 cursor-pointer">Stop All Animations</label>
                  <Switch
                    id="stop-animations-toggle"
                    aria-label="Toggle Stop Animations"
                    checked={stopAnimations}
                    onCheckedChange={setStopAnimations}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          <div className="mt-8 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 glass-effect border-white/20 hover:bg-white/10 text-gray-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              onClick={restoreDefaults}
              aria-label="Restore all accessibility settings to default"
            >
              <Undo2 className="h-4 w-4" /> Restore Defaults
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};