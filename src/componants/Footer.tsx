import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f7f5] py-6 px-6 font-sans border-t border-gray-200/50 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm text-gray-500 antialiased">
        
        {/* Left Side: App Intro */}
        <div className="font-normal tracking-wide">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>

        {/* Right Side: Disclaimer Note */}
        <div className="font-normal tracking-wide text-left md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>

      </div>
    </footer>
  );
}
