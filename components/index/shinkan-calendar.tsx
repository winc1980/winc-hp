"use client";

type EventType = "official" | "social";

type CalendarEvent = {
  label: string;
  type: EventType;
  time?: string;
  location?: string;
};

type CalendarDay = {
  date: string;
  dayOfWeek: number; // 0=月, 1=火, ..., 5=土, 6=日
  events: CalendarEvent[];
};

const weeks: CalendarDay[][] = [
  [
    { date: "3/30", dayOfWeek: 0, events: [{ label: "理工ガイダンス", type: "official" },] },
    { date: "31", dayOfWeek: 1, events: [{ label: "履修相談会", type: "social", time: "15:00~19:00", location: "西早稲田キャンパス中庭" }] },
    { date: "4/1", dayOfWeek: 2, events: [{ label: "入学式", type: "official" },] },
    { date: "2", dayOfWeek: 3, events: [{ label: "入学式", type: "official" },] },
    { date: "3", dayOfWeek: 4, events: [{ label: "理工合同新歓", type: "official" }] },
    { date: "4", dayOfWeek: 5, events: [{ label: "web体験会(後食事)", type: "social", time: "15:30~18:30", location: "未定" }] },
    { date: "5", dayOfWeek: 6, events: [] },
  ],
  [
    { date: "4/6", dayOfWeek: 0, events: [] },
    { date: "7", dayOfWeek: 1, events: [] },
    { date: "8", dayOfWeek: 2, events: [{ label: "BBQ", type: "social", time: "未定", location: "未定" }] },
    { date: "9", dayOfWeek: 3, events: [] },
    { date: "10", dayOfWeek: 4, events: [{ label: "エンジニア進路会", type: "social", time: "13:30~15:30", location: "学生会館E519" }] },
    { date: "11", dayOfWeek: 5, events: [] },
    { date: "12", dayOfWeek: 6, events: [] },
  ],
  [
    { date: "4/13", dayOfWeek: 0, events: [] },
    { date: "14", dayOfWeek: 1, events: [] },
    { date: "15", dayOfWeek: 2, events: [] },
    { date: "16", dayOfWeek: 3, events: [{ label: "web体験会(後食事)", type: "social", time: "15:30~18:30", location: "学生会館E519" }] },
    { date: "17", dayOfWeek: 4, events: [] },
    { date: "18", dayOfWeek: 5, events: [{ label: "女子会", type: "social", time: "13:30~15:30", location: "学生会館E519" }] },
    { date: "19", dayOfWeek: 6, events: [] },
  ],
  [
    { date: "4/20", dayOfWeek: 0, events: [] },
    { date: "21", dayOfWeek: 1, events: [] },
    { date: "22", dayOfWeek: 2, events: [{ label: "エンジニア進路会", type: "social", time: "15:30~18:30", location: "学生会館E519" }] },
    { date: "23", dayOfWeek: 3, events: [] },
    { date: "24", dayOfWeek: 4, events: [] },
    { date: "25", dayOfWeek: 5, events: [] },
    { date: "26", dayOfWeek: 6, events: [] },
  ],
  [
    { date: "4/27", dayOfWeek: 0, events: [] },
    { date: "28", dayOfWeek: 1, events: [{ label: "web体験会", type: "social", time: "15:30~18:30", location: "学生会館E519" }] },
    { date: "29", dayOfWeek: 2, events: [] },
    { date: "30", dayOfWeek: 3, events: [] },
    { date: "5/1", dayOfWeek: 4, events: [] },
    { date: "2", dayOfWeek: 5, events: [{ label: "女子会(仮)", type: "social", time: "15:00~19:00", location: "学生会館E519" }] },
    { date: "3", dayOfWeek: 6, events: [] },
  ],
  [
    { date: "5/4", dayOfWeek: 0, events: [] },
    { date: "5", dayOfWeek: 1, events: [] },
    { date: "6", dayOfWeek: 2, events: [] },
    { date: "7", dayOfWeek: 3, events: [] },
    { date: "8", dayOfWeek: 4, events: [] },
    { date: "9", dayOfWeek: 5, events: [{ label: "新体制キックオフ", type: "social" }] },
    { date: "10", dayOfWeek: 6, events: [] },
  ],
];

const dayHeaders = ["月", "火", "水", "木", "金", "土", "日"];

function EventBadge({ ev }: { ev: CalendarEvent }) {
  return (
    <div
      className={`rounded-lg px-2 py-1 flex flex-col gap-0.5 ${ev.type === "official" ? "bg-orange-500" : "bg-[#4a3320]"
        }`}
    >
      <span className="text-xs font-bold text-white leading-tight">{ev.label}</span>
      {ev.time && (
        <span className="text-[11px] text-white/90 font-medium leading-tight">🕐 {ev.time}</span>
      )}
      {ev.location && (
        <span className="text-[11px] text-white/90 font-medium leading-tight">📍 {ev.location}</span>
      )}
    </div>
  );
}

export default function ShinkanCalendar() {
  return (
    <div className="w-full rounded-2xl bg-[#f5ede0] p-4 sm:p-6 text-[#3b2a1a] font-sans">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          <span className="text-orange-500">WINC</span> 新歓カレンダー
        </h3>
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#3b2a1a]/60 mt-1">
          SPRING SCHEDULE
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm mb-5">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
          公式行事・広報
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4a3320] inline-block" />
          交流・体験イベント
        </span>
      </div>

      {/* --- Mobile: agenda list view --- */}
      <div className="sm:hidden flex flex-col gap-3">
        {weeks.map((week, wi) => {
          const daysWithEvents = week.filter((d) => d.events.length > 0);
          if (daysWithEvents.length === 0) return null;
          const first = week[0].date;
          const last = week[6].date;
          return (
            <div key={wi}>
              <p className="text-xs font-bold text-[#3b2a1a]/50 mb-1 pl-1">
                {first} 〜 {last}
              </p>
              <div className="flex flex-col gap-2">
                {daysWithEvents.map((day, di) => (
                  <div key={di} className="bg-white rounded-xl p-3 flex gap-3 items-start">
                    {/* Date column */}
                    <div className="flex flex-col items-center min-w-[40px]">
                      <span
                        className={`text-lg font-extrabold leading-none ${day.dayOfWeek === 5
                          ? "text-blue-500"
                          : day.dayOfWeek === 6
                            ? "text-red-500"
                            : "text-[#3b2a1a]"
                          }`}
                      >
                        {day.date}
                      </span>
                      <span
                        className={`text-xs font-semibold ${day.dayOfWeek === 5
                          ? "text-blue-400"
                          : day.dayOfWeek === 6
                            ? "text-red-400"
                            : "text-[#3b2a1a]/50"
                          }`}
                      >
                        {dayHeaders[day.dayOfWeek]}
                      </span>
                    </div>
                    {/* Events column */}
                    <div className="flex flex-col gap-1.5 flex-1">
                      {day.events.map((ev, ei) => (
                        <EventBadge key={ei} ev={ev} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Desktop: grid view --- */}
      <div className="hidden sm:block">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {dayHeaders.map((d, i) => (
            <div
              key={d}
              className={`text-center text-xs font-bold py-1 ${i === 5 ? "text-blue-500" : i === 6 ? "text-red-500" : "text-[#3b2a1a]"
                }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="border-t-2 border-[#3b2a1a]/30 mb-1" />

        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((day, di) => (
              <div
                key={di}
                className="bg-white rounded-xl p-1.5 min-h-[108px] flex flex-col gap-1"
              >
                <span
                  className={`text-[11px] font-semibold leading-none ${di === 5 ? "text-blue-500" : di === 6 ? "text-red-500" : "text-[#3b2a1a]"
                    }`}
                >
                  {day.date}
                </span>
                {day.events.map((ev, ei) => (
                  <div
                    key={ei}
                    className={`rounded-md px-1 py-1 flex flex-col gap-0.5 ${ev.type === "official" ? "bg-orange-500" : "bg-[#4a3320]"
                      }`}
                  >
                    <span className="text-[12px] leading-tight font-bold text-white">
                      {ev.label}
                    </span>
                    {ev.time && (
                      <span className="text-[12px] leading-none text-white/90 font-medium">
                        🕐 {ev.time}
                      </span>
                    )}
                    {ev.location && (
                      <span className="text-[12px] leading-none text-white/90 font-medium">
                        📍 {ev.location}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
