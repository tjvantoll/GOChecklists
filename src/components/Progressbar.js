import React from "react";

export default function Progressbar({ value, max }) {
  const getWidth = () => {
    if (!max) {
      return "0";
    }

    return ((value / max) * 100) + "%";
  }

  const getBackgroundColor = () => {
    const percent = Math.round((value / max) * 100);
    return (percent <= 6) ? "#FB041E" :
      (percent > 6 && percent <= 12) ? "#FD2222" :
      (percent > 12 && percent <= 18) ? "#FC4926" :
      (percent > 18 && percent <= 24) ? "#FC6628" :
      (percent > 24 && percent <= 30) ? "#FE882A" :
      (percent > 30 && percent <= 36) ? "#FFA52E" :
      (percent > 36 && percent <= 42) ? "#FEC230" :
      (percent > 42 && percent <= 48) ? "#FFDE34" :
      (percent > 48 && percent <= 54) ? "#F4DE2B" :
      (percent > 54 && percent <= 60) ? "#E7DD25" :
      (percent > 60 && percent <= 66) ? "#DBDD1C" :
      (percent > 66 && percent <= 72) ? "#CEDC18" :
      (percent > 72 && percent <= 78) ? "#C3DC0E" :
      (percent > 78 && percent <= 84) ? "#B6DC07" :
      (percent > 84 && percent <= 90) ? "#A9DC03" : "#9ADA00";
  }

  return (
    <div className="flex mt-[0.6em] mb-[0.20em] mx-[0.5em]">
      <div className="progressbar border border-gray-400 rounded w-full">
        <div
          className="progressbar-contents h-[25px]"
          style={{
            width: getWidth(),
            backgroundColor: getBackgroundColor()
          }}
        />
      </div>
      {!!max && (
        <span className="flex flex-col justify-center min-w-[5.5em] text-center text-[0.8em]">{`${value} / ${max}`}</span>
      )}
    </div>
  );
}
