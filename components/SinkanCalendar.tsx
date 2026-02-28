"use client";

import React from 'react';


// カレンダー用データ型
interface EventItem {
  text: string;
  type: 'accent' | 'secondary';
}
interface Cell {
  date: string;
  events: EventItem[];
}

interface SinkanCalendarProps {
  /**
   * スケジュールデータ。渡されない場合はデフォルトのものを使用します。
   */
  scheduleData?: Cell[];
  /**
   * ページ専用のフルスクリーンラッパーを無効化する場合に true。
   * 新歓セクションなど他のコンテキストに埋め込みたい時に利用します。
   */
  noWrapper?: boolean;
  /**
   * ラッパー要素に追加するクラス名。
   */
  className?: string;
}

// もともと page.tsx にあったデフォルトの予定表データ
const defaultScheduleData: Cell[] = [
  // 第1週
  { date: "3/30", events: [{ text: "理工ガイダンス", type: "accent" }, { text: "ビラ配り", type: "accent" }] },
  { date: "31", events: [{ text: "履修相談会", type: "accent" }] },
  { date: "4/1", events: [{ text: "入学式", type: "accent" }, { text: "ビラ配り", type: "accent" }] },
  { date: "2", events: [{ text: "入学式", type: "accent" }, { text: "ビラ配り", type: "accent" }] },
  { date: "3", events: [{ text: "理工合同新歓", type: "accent" }] },
  { date: "4", events: [{ text: "web体験会\n(後食事)", type: "secondary" }] },
  { date: "5", events: [] },
  // 第2週
  { date: "4/6", events: [] },
  { date: "7", events: [{ text: "BBQ", type: "secondary" }] },
  { date: "8", events: [] },
  { date: "9", events: [] },
  { date: "10", events: [{ text: "エンジニア進路会", type: "secondary" }] },
  { date: "11", events: [] },
  { date: "12", events: [] },
  // 第3週
  { date: "4/13", events: [{ text: "理工授業開始日", type: "accent" }] },
  { date: "14", events: [] },
  { date: "15", events: [] },
  { date: "16", events: [{ text: "web体験会\n(後食事)", type: "secondary" }] },
  { date: "17", events: [] },
  { date: "18", events: [{ text: "女子会", type: "secondary" }] },
  { date: "19", events: [] },
  // 第4週
  { date: "4/20", events: [] },
  { date: "21", events: [] },
  { date: "22", events: [{ text: "エンジニア進路会", type: "secondary" }] },
  { date: "23", events: [] },
  { date: "24", events: [] },
  { date: "25", events: [{ text: "ボウリング大会", type: "secondary" }] },
  { date: "26", events: [] },
  // 第5週
  { date: "4/27", events: [] },
  { date: "28", events: [{ text: "web体験会", type: "secondary" }] },
  { date: "29", events: [] },
  { date: "30", events: [] },
  { date: "5/1", events: [] },
  { date: "2", events: [{ text: "女子会(仮)", type: "secondary" }] },
  { date: "3", events: [] },
  // 第6週
  { date: "5/4", events: [] },
  { date: "5", events: [] },
  { date: "6", events: [] },
  { date: "7", events: [] },
  { date: "8", events: [] },
  { date: "9", events: [{ text: "新体制キックオフ", type: "accent" }] },
  { date: "10", events: [] },
];

export default function SinkanCalendar({ scheduleData = defaultScheduleData, noWrapper = false, className = "" }: SinkanCalendarProps) {
  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

  React.useEffect(() => {
    // 画像化ライブラリの動的読み込み
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const content = (
    <>
      {/* <div className="mb-6">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-[#FF4F00] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#cc3f00] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          {isDownloading ? '画像生成中...' : 'Instagram用画像をダウンロード'}
        </button>
      </div> */}

      <div
        id="instagram-export-target"
        className="relative w-full max-w-[800px] aspect-square bg-[#F8F0E5] text-[#42210B] p-8 md:p-12 shadow-2xl flex flex-col font-sans"
        style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-widest mb-2">
            <span className="text-[#FF4F00] mr-2">WINC</span>
            新歓カレンダー
          </h1>
          <p className="text-lg md:text-xl font-bold tracking-widest opacity-80">
            SPRING SCHEDULE
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-6 text-sm md:text-base font-bold">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#FF4F00]"></span>
            <span>公式行事・広報</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#42210B]"></span>
            <span>交流・体験イベント</span>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-7 gap-1 md:gap-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-center font-bold text-lg border-b-4 border-[#42210B] pb-1 
                ${index === 5 ? 'text-blue-700' : ''} 
                ${index === 6 ? 'text-red-600' : ''}`
              }
            >
              {day}
            </div>
          ))}

          {scheduleData.map((cell, index) => (
            <div
              key={index}
              className="flex flex-col border-2 border-[#42210B]/10 bg-white/50 rounded-lg p-1 md:p-1.5 overflow-hidden"
            >
              <div className={`text-sm md:text-base font-bold mb-1 ml-1
                ${index % 7 === 5 ? 'text-blue-700' : ''} 
                ${index % 7 === 6 ? 'text-red-600' : ''}
              `}>
                {cell.date}
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
                {cell.events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className={`
                      text-[9px] md:text-xs font-bold px-1 py-1 rounded-md leading-tight text-center whitespace-pre-line
                      ${event.type === 'accent' ? 'bg-[#FF4F00] text-[#F8F0E5]' : 'bg-[#42210B] text-[#F8F0E5]'}
                    `}
                  >
                    {event.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center border-t-2 border-[#42210B]/20 pt-4">
          <p className="text-lg md:text-xl font-bold">
            参加希望の方は各SNSのDMまで！
          </p>
        </div>
      </div>
    </>
  );

  if (noWrapper) {
    return content;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${className}`}
      style={{ backgroundColor: '#2d3748' }}
    >
      {content}
    </div>
  );
}
