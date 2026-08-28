import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Banknote, Train, Bed, Utensils, Star } from 'lucide-react'

const COLORS = ['#FF3366', '#3B82F6', '#10B981', '#F59E0B']

const formatJPY = (v) => `¥${v.toLocaleString()}`
const formatPHP = (v) => `₱${v.toLocaleString()}`

const CUSTOM_TOOLTIP = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload[0]
    return (
      <div className="bg-white shadow-xl rounded-xl px-4 py-3 border border-gray-100">
        <p className="font-semibold text-indigo-900 text-sm">{entry.name}</p>
        <p className="text-pink-600 font-bold">{formatJPY(entry.value)}</p>
        <p className="text-gray-400 text-xs">{formatPHP(Math.round(entry.value * 0.37))}</p>
      </div>
    )
  }
  return null
}

export default function CostBreakdown({ costs, totalDays }) {
  if (!costs) return null

  const {
    accommodation, food, activities, transport,
    grandTotalJPY, grandTotalPHP, jrPassRecommended, jrPassCostJPY
  } = costs

  const pieData = [
    { name: 'Accommodation', value: accommodation },
    { name: 'Transport', value: transport },
    { name: 'Food & Dining', value: food },
    { name: 'Activities', value: activities },
  ]

  const barData = [
    { category: 'Stay', jpyK: Math.round(accommodation / 1000) },
    { category: 'Transport', jpyK: Math.round(transport / 1000) },
    { category: 'Food', jpyK: Math.round(food / 1000) },
    { category: 'Activities', jpyK: Math.round(activities / 1000) },
  ]

  const avgPerDayJPY = Math.round(grandTotalJPY / totalDays)
  const avgPerDayPHP = Math.round(grandTotalPHP / totalDays)

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Bed, label: 'Accommodation', value: accommodation, color: 'from-pink-500 to-rose-500' },
          { icon: Train, label: 'Transport', value: transport, color: 'from-blue-500 to-indigo-500' },
          { icon: Utensils, label: 'Food & Dining', value: food, color: 'from-emerald-500 to-teal-500' },
          { icon: Star, label: 'Activities', value: activities, color: 'from-amber-500 to-orange-500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-lg font-bold text-indigo-900">{formatJPY(value)}</p>
            <p className="text-xs text-gray-400">{formatPHP(Math.round(value * 0.37))}</p>
          </div>
        ))}
      </div>

      {/* Grand total banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white/60 text-sm font-medium mb-1 flex items-center gap-2">
            <Banknote size={14} />
            Estimated Total ({totalDays} days)
          </p>
          <p className="text-4xl font-bold font-serif">{formatJPY(grandTotalJPY)}</p>
          <p className="text-white/60 text-lg mt-1">≈ {formatPHP(grandTotalPHP)} Philippine Peso</p>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-sm mb-1">Per Day Average</p>
          <p className="text-2xl font-bold">{formatJPY(avgPerDayJPY)}</p>
          <p className="text-white/60">≈ {formatPHP(avgPerDayPHP)} / day</p>
        </div>
      </div>

      {/* JR Pass recommendation */}
      {jrPassRecommended && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-2xl">🚄</span>
          <div>
            <p className="font-semibold text-amber-900">JR Pass Recommended!</p>
            <p className="text-sm text-amber-700 mt-1">
              For your {totalDays}-day trip with multiple city hops, the{' '}
              <strong>{jrPassRecommended.replace('day', '-Day')} JR Pass</strong> ({formatJPY(jrPassCostJPY)} / {formatPHP(Math.round(jrPassCostJPY * 0.37))}) can save you significantly on Shinkansen fares.
              The transport cost above already reflects the pass savings.
            </p>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-indigo-900 mb-4 text-sm">Cost Breakdown</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-indigo-900 mb-4 text-sm">Cost by Category (¥ thousands)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barCategoryGap="30%">
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="k" />
              <Tooltip
                formatter={(v) => [`¥${v}k`, '']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0' }}
              />
              <Bar dataKey="jpyK" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * Estimates based on 2025 average prices. Exchange rate: ¥1 ≈ ₱0.37 Philippine Peso. Actual costs may vary.
      </p>
    </div>
  )
}
