import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WeatherData } from '@/types/weather';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useTheme } from '@/hooks/useTheme';

interface TemperatureChartProps {
  data: WeatherData;
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = data.hourly.time.slice(0, 24).map((time, index) => ({
    time: format(new Date(time), 'HH:mm', { locale: de }),
    temperatur: Math.round(data.hourly.temperature[index]),
    niederschlag: data.hourly.precipitation[index],
  }));

  const textColor = isDark ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))';
  const gridColor = isDark ? 'hsl(var(--border))' : 'hsl(var(--border))';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="w-full backdrop-blur-sm bg-card/95 border-border/50">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-lg md:text-xl">Temperaturverlauf (24h)</CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6 pb-4 md:pb-6">
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridColor}
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: textColor }}
                stroke={gridColor}
                interval={3}
                className="md:text-xs"
              />
              <YAxis
                tick={{ fontSize: 10, fill: textColor }}
                stroke={gridColor}
                width={35}
                className="md:text-xs"
                label={{ 
                  value: '°C', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: textColor,
                  style: { fontSize: 11 }
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Line
                type="monotone"
                dataKey="temperatur"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                name="Temperatur (°C)"
                animationDuration={1000}
                animationEasing="ease-in-out"
                className="md:stroke-[3]"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
