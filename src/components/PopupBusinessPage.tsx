import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const businessData = {
  name: "Joshua's Coffee Corner",
  totalAttendees: 342,
  averageAttendees: 43,
  previousPopups: [
    {
      id: 1,
      date: "November 2, 2025",
      location: "Golden Gate Park, SF",
      attendees: 56,
    },
    {
      id: 2,
      date: "October 26, 2025",
      location: "Mission District, SF",
      attendees: 48,
    },
    {
      id: 3,
      date: "October 19, 2025",
      location: "Ferry Building, SF",
      attendees: 62,
    },
    {
      id: 4,
      date: "October 12, 2025",
      location: "Dolores Park, SF",
      attendees: 41,
    },
    {
      id: 5,
      date: "October 5, 2025",
      location: "Union Square, SF",
      attendees: 38,
    },
  ],
};

const attendanceData = [
  { date: "Oct 5", attendees: 38 },
  { date: "Oct 12", attendees: 41 },
  { date: "Oct 19", attendees: 62 },
  { date: "Oct 26", attendees: 48 },
  { date: "Nov 2", attendees: 56 },
];

export function PopupBusinessPage() {
  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-[#f5f6f4] to-[#e8eae6]">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] px-6 py-8 border-b-4 border-[#1a1a1a] mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#6b5744] rounded-2xl p-3 border-3 border-white shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-4xl text-white"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                textShadow: '2px 2px 0px rgba(26, 26, 26, 0.3)',
              }}
            >
              {businessData.name}
            </h1>
          </div>
          <p
            className="text-white/90 ml-16"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Your popup business dashboard 📊
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] p-4 rounded-xl border-2 border-[#1a1a1a]">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Total Attendees
                </p>
                <p
                  className="text-3xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {businessData.totalAttendees}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#6b5744] to-[#5a4836] p-4 rounded-xl border-2 border-[#1a1a1a]">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Total Pop-ups
                </p>
                <p
                  className="text-3xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {businessData.previousPopups.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] p-4 rounded-xl border-2 border-[#1a1a1a]">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Avg Attendees
                </p>
                <p
                  className="text-3xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {businessData.averageAttendees}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Attendance Graph */}
        <Card className="p-6 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-lg">
          <h2
            className="text-2xl text-[#1a1a1a] mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Attendance Over Time
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eae6" />
                <XAxis
                  dataKey="date"
                  stroke="#6b5744"
                  style={{ fontFamily: 'var(--font-primary)' }}
                />
                <YAxis
                  stroke="#6b5744"
                  style={{ fontFamily: 'var(--font-primary)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #1a1a1a',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-primary)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendees"
                  stroke="#88a37e"
                  strokeWidth={3}
                  dot={{ fill: '#6b5744', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Previous Pop-ups */}
        <Card className="p-6 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-lg">
          <h2
            className="text-2xl text-[#1a1a1a] mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Previous Pop-ups
          </h2>
          <div className="space-y-3">
            {businessData.previousPopups.map((popup) => (
              <div
                key={popup.id}
                className="p-4 bg-gradient-to-br from-[#f5f6f4] to-[#e8eae6] rounded-xl border-2 border-[#1a1a1a]/10 hover:border-[#88a37e] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#6b5744]" />
                      <span
                        className="text-[#1a1a1a]"
                        style={{
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 600,
                        }}
                      >
                        {popup.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#88a37e]" />
                      <span
                        className="text-[#6b5744]"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        {popup.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-[#1a1a1a]">
                    <Users className="w-4 h-4 text-[#88a37e]" />
                    <span
                      className="text-[#1a1a1a]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      {popup.attendees}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="py-4 bg-gradient-to-br from-[#88a37e] to-[#6d8a64] text-white rounded-2xl hover:from-[#7a9470] hover:to-[#5f7c58] transition-all hover:shadow-xl hover:scale-[1.02] border-3 border-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Schedule New Pop-up
          </button>
          <button
            className="py-4 bg-gradient-to-br from-[#6b5744] to-[#5a4836] text-white rounded-2xl hover:from-[#5a4836] hover:to-[#4a3828] transition-all hover:shadow-xl hover:scale-[1.02] border-3 border-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
