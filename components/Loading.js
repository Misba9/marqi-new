"use client";

import React, { useState, useEffect } from "react";

const Loading = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#fcf3ff]">
      <div
        className="text-[#51375b] text-6xl font-normal"
        aria-live="polite"
        aria-atomic="true"
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default Loading;
