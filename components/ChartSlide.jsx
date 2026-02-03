import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LineChart, Line, AreaChart, Area, PieChart, Pie } from 'recharts';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const ChartSlide = ({ slide, colors, palette, headingWeight, socialHandle, postTitle }) => {
    const chartVariant = slide.variant || 'classic';
    const isDark = ['line', 'dark'].includes(chartVariant);

    const chartData = (slide.chartData || [65, 45, 85, 30]).map((v, i) => ({
        name: (slide.labels || ["A", "B", "C", "D"])[i],
        value: v
    }));

    const renderChart = () => {
        if (chartVariant === 'horizontal') {
            return (
                <div className="flex-1 w-full bg-white rounded-3xl p-12 shadow-sm relative z-10 border border-slate-100">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 24, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                            <Bar dataKey="value" radius={[0, 20, 20, 0]} barSize={60}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? colors.primary : colors.secondary} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        } else if (chartVariant === 'minimal') {
            return (
                <div className="w-full flex items-end justify-center gap-12 h-96 relative z-10">
                    {chartData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-6">
                            <div className="text-5xl font-black text-slate-900">{d.value}%</div>
                            <div className="w-24 rounded-full transition-all duration-500 shadow-lg" style={{ height: `${d.value * 3}px`, background: colors.primary }}></div>
                            <div className="text-3xl font-bold text-slate-400">{d.name}</div>
                        </div>
                    ))}
                </div>
            );
        } else if (chartVariant === 'dark') {
            return (
                <div className="flex-1 grid grid-cols-2 gap-12 relative z-10">
                    {chartData.map((d, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col justify-center backdrop-blur-md">
                            <div className="text-3xl text-white/50 mb-2 font-bold">{d.name}</div>
                            <div className="flex items-end gap-4">
                                <div className="text-8xl font-black text-white leading-none">{d.value}%</div>
                                <div className="w-full h-4 bg-white/10 rounded-full mb-4 overflow-hidden">
                                    <div className="h-full" style={{ width: `${d.value}%`, background: getGradientCSS(colors) }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (chartVariant === 'cards') {
            return (
                <div className="grid grid-cols-2 gap-8 h-full min-h-0 relative z-10">
                    {chartData.map((d, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-3" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}></div>
                            <div className="text-[120px] font-black text-slate-900 mb-4">{d.value}%</div>
                            <div className="text-4xl font-bold text-slate-400 uppercase tracking-widest">{d.name}</div>
                        </div>
                    ))}
                </div>
            );
        } else if (chartVariant === 'donut') {
            return (
                <div className="flex-1 flex justify-center items-center relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={180}
                                outerRadius={280}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? colors.primary : index === 1 ? colors.secondary : colors.accent} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 text-center mt-8">
                        <div className="text-[140px] font-black text-slate-900 leading-none">{chartData[0].value}%</div>
                        <div className="text-5xl font-bold text-slate-400 mt-4">{chartData[0].name}</div>
                    </div>
                </div>
            );
        } else if (chartVariant === 'area') {
            return (
                <div className="flex flex-col flex-1 h-full w-full">
                    <div className="flex-1 w-full -ml-8 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{ fontSize: 24, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Area type="monotone" dataKey="value" stroke={colors.primary} strokeWidth={8} fill={colors.primary} fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-12 bg-slate-50 p-10 rounded-3xl relative z-10">
                        {chartData.map((d, i) => (
                            <div key={i} className="text-center">
                                <div className="text-5xl font-black text-slate-900">{d.value}</div>
                                <div className="text-2xl font-bold text-slate-400">{d.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (chartVariant === 'line') {
            return (
                <div className="flex-1 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line type="stepAfter" dataKey="value" stroke={colors.accent} strokeWidth={10} dot={{ r: 16, fill: colors.accent, strokeWidth: 4, stroke: "#000" }} />
                            <XAxis dataKey="name" tick={{ fontSize: 28, fontWeight: 'bold', fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            );
        } else if (chartVariant === 'split') {
            return (
                <div className="flex flex-1 h-full w-full relative z-10">
                    <div className="w-1/2 h-full flex flex-col justify-center p-20" style={{ background: colors.primary }}>
                        <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
                            <div className="text-[150px] font-black text-white leading-none">{chartData[0].value}%</div>
                            <div className="text-4xl font-bold text-white/70 uppercase tracking-widest">{chartData[0].name}</div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full p-20 flex flex-col justify-center space-y-16">
                        {chartData.slice(1).map((d, i) => (
                            <div key={i} className="flex flex-col gap-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-4xl font-bold text-slate-900">{d.name}</span>
                                    <span className="text-6xl font-black text-slate-900">{d.value}%</span>
                                </div>
                                <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: colors.secondary }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        // Classic
        return (
            <div className="flex-1 w-full bg-slate-50 rounded-3xl p-12 relative z-10 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 28, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 22, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                        <Bar dataKey="value" fill={colors.primary} radius={[15, 15, 0, 0]} barSize={110} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="w-full h-full relative group/slide">
            <div className={`h-full w-full flex flex-col p-24 relative overflow-hidden ${chartVariant === 'line' || chartVariant === 'dark' ? 'text-white' : 'bg-white'}`} style={chartVariant === 'line' || chartVariant === 'dark' ? { background: colors.dark } : {}}>
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className={`text-8xl ${headingWeight || 'font-black'} mb-16 relative z-10 leading-tight ${chartVariant === 'line' || chartVariant === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {stripMarkdown(slide.heading)}
                </h2>
                {renderChart()}
            </div>
            <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode={isDark ? 'dark' : 'light'} />
        </div>
    );
};

export default ChartSlide;
