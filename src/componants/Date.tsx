"use client";

import { useEffect, useState } from "react";

const BanglaDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('bn-BD', {
      dateStyle: 'full'
    });
    setFormattedDate(dateStr);
  }, []);

  if (!formattedDate) {
    return <span className="animate-pulse">Loading date...</span>; 
  }

  return <span>{formattedDate}</span>;
};

export default BanglaDate;
