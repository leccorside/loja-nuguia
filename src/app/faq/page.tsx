"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeIcon, ChevronRightIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-border py-6 first:pt-0 group">
      <button 
        onClick={onToggle}
        className="flex items-center gap-6 w-full text-left transition-all"
      >
        <span className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center transition-all ${
          isOpen ? "border-primary text-primary" : "border-secondary text-secondary group-hover:border-primary group-hover:text-primary"
        }`}>
          {isOpen ? <MinusIcon className="h-3 w-3" /> : <PlusIcon className="h-3 w-3" />}
        </span>
        <span className={`text-xs font-black uppercase tracking-tight transition-colors ${
          isOpen ? "text-primary" : "text-secondary group-hover:text-primary"
        }`}>
          {question}
        </span>
      </button>
      
      <div className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
      }`}>
        <div className="overflow-hidden">
          <p className="text-xs text-muted leading-relaxed font-medium italic pl-12 max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openGeneral, setOpenGeneral] = useState<number | null>(0);
  const [openOther, setOpenOther] = useState<number | null>(0);

  const generalQuestions = [
    {
      question: "Can the products be applied during rainy season?",
      answer: "Well, every product has its own drying time. And its quite risky to paint during the rainy season. If in case, you go ahead with the painting and it rains heavily, not allowing enough time for the paint to dry, you might have to face problems. Hence, we recommend you to observe the weather condition and then go ahead with painting."
    },
    {
      question: "How long should one wait before painting in case of a new construction?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
    },
    {
      question: "Can ink or other stains be washed off?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "How do the stains on the floor be removed after the painting is over?",
      answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      question: "What is the expiry date of the paints?",
      answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
      question: "What is the difference between emulsions and distempers?",
      answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos."
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* 1. Page Header */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">FAQ</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">FAQ</span>
          </nav>
        </div>
      </section>

      {/* 2. Questions Grid */}
      <section className="container-custom py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* General Questions */}
          <div>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight mb-12">General questions</h2>
            <div className="space-y-2">
              {generalQuestions.map((item, index) => (
                <AccordionItem 
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openGeneral === index}
                  onToggle={() => setOpenGeneral(openGeneral === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Other Questions */}
          <div>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight mb-12">Other questions</h2>
            <div className="space-y-2">
              {generalQuestions.map((item, index) => (
                <AccordionItem 
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openOther === index}
                  onToggle={() => setOpenOther(openOther === index ? null : index)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
