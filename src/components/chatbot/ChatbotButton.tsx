"use client";

import { useState } from "react";
interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

// Contact information - you can update these with your actual details
export const CONTACT = {
  WHATSAPP_NUMBER: "+1234567890", // Replace with your WhatsApp number
  PHONE_NUMBER: "+1234567890", // Replace with your phone number
};

export function ChatbotButton({ onClick, isOpen }: ChatbotButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleWhatsApp = () => {
    const message = "Hello! I'd like to inquire about your products.";
    const whatsappURL = `https://wa.me/${CONTACT.WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACT.PHONE_NUMBER}`;
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex flex-col-reverse items-center gap-4">
      {/* Secondary buttons menu */}
      {/* <div
        style={{ pointerEvents: showMenu ? "auto" : "none" }}
        className={`flex flex-col gap-3 items-center transition-all duration-200 ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      > */}
        {/* WhatsApp Button */}
        {/* <button
          type="button"
          onClick={handleWhatsApp}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95"
          aria-label="Contact us on WhatsApp"
          title="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6915026,2.4744748 C15.6693616,0.559246 12.8124629,0 10.0151496,0 C4.50548941,0 0.11546504,4.40604706 0.11546504,9.89612521 C0.11546504,11.8102415 0.604154852,13.6982485 1.52273022,15.3640212 L0,24 L8.87192326,21.69253 C10.4693899,22.5315722 12.2604339,23.0157454 14.1383652,23.0157454 L14.1423978,23.0157454 C19.6504706,23.0157454 24,18.6095985 24,13.1195203 C24,10.3249843 23.4306751,7.4652151 21.4088336,5.54698689 L17.6915026,2.4744748 Z M14.1383652,21.0115273 C12.5274491,21.0115273 11.0474039,20.5590915 9.74077571,19.7607649 L9.41483309,19.5821449 L5.64303262,20.6346425 L6.72147318,17.1023718 L6.51701971,16.7621548 C5.60356722,15.3854176 5.11765022,13.726539 5.11765022,11.9958839 C5.11765022,7.02490947 9.17674171,3.01899347 14.1463536,3.01899347 C16.6928582,3.01899347 19.0543607,3.99036126 20.6798005,5.59915218 C22.3044611,7.20661156 23.2895249,9.56722901 23.2895249,12.1082968 C23.2895249,17.067377 19.2309281,21.0115273 14.1383652,21.0115273 Z M19.1823818,14.0924513 C18.8902817,13.9115165 17.3812618,13.1213859 17.1161671,13.0276211 C16.8501953,12.9363854 16.6547128,12.8915501 16.4600411,13.1811767 C16.2657893,13.4683213 15.7631024,14.0924513 15.5848043,14.2843656 C15.4069144,14.4759652 15.228899,14.5089713 14.9373029,14.3284865 C14.6451028,14.1481199 13.7206166,13.8432996 12.6375088,12.8771842 C11.7887128,12.1176767 11.1872768,11.1876959 11.0091868,10.8984515 C10.8314829,10.6107621 10.9939821,10.4426699 11.1748071,10.2635767 C11.3383249,10.1016221 11.5417881,9.84175626 11.7220032,9.66388849 C11.9019183,9.48634145 11.9988213,9.37268839 12.0911132,9.17843156 C12.1847597,8.98383 12.1392282,8.80625477 12.0456817,8.62579968 C11.9522425,8.44533458 11.348956,6.93810579 11.0846919,6.34339635 C10.8281799,5.77632227 10.5667915,5.86389487 10.3754975,5.85378911 C10.1921772,5.84424449 9.99710199,5.84318618 9.80229622,5.84318618 C9.60715209,5.84318618 9.27696693,5.91583215 9.01102055,6.20408979 C8.74507418,6.49160038 7.96927182,7.28095048 7.96927182,8.78766989 C7.96927182,10.2944699 9.03650948,11.7527627 9.2174239,11.9451857 C9.39794654,12.1359629 11.3411645,15.2124957 14.3282653,16.6485086 C15.0181899,16.9950413 15.5683239,17.2124275 16.0181899,17.3707797 C16.7063011,17.6107889 17.3329555,17.5797379 17.8266469,17.5044389 C18.3757152,17.4208485 19.3938555,16.8748557 19.6579975,16.2642324 C19.9221394,15.6534991 19.9221394,15.1393055 19.8286887,15.0060819 C19.7352381,14.8721564 19.5392357,14.7990141 19.1823818,14.0924513 Z" />
          </svg>
        </button> */}

        {/* Phone Call Button */}
        {/* <button
          type="button"
          onClick={handleCall}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6B6B] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95"
          aria-label="Call us"
          title="Call"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
      </div> */}

      {/* Main Chat Button */}
      <button
        type="button"
        onClick={() => {
          setShowMenu(!showMenu);
          onClick();
        }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:shadow-xl flex items-center justify-center z-30 transition-transform duration-150 group hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close Plant Assistant" : "Open Plant Assistant"}
        title="Plant Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:scale-110 transition-transform"
          >
            {/* Leaf/plant style icon */}
            <path d="M12 3C8 8 5 12 5 16c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.5-.8-3.5-2-5.5" />
            <path d="M12 3c4 5 7 9 7 13 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5.8-3.5 2-5.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
