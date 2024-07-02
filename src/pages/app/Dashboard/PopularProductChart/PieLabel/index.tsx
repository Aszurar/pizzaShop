/* eslint-disable @typescript-eslint/no-explicit-any */
type DataProps = {
  product: string
  amount: number
}

type LabelPieProps = {
  data: DataProps[]
  cx: any
  cy: any
  midAngle: any
  innerRadius: any
  outerRadius: any
  value: any
  index: any
}

const LONG_LABEL = 12

export function PieLabel({
  cx,
  cy,
  data,
  innerRadius,
  outerRadius,
  midAngle,
  index,
  value,
}: LabelPieProps) {
  const RADIAN = Math.PI / 180
  const radius = 12 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const label = data[index].product
  const isLongLabel = label.length > LONG_LABEL
  const labelFormatted = isLongLabel
    ? label.substring(0, LONG_LABEL).concat('...')
    : label

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {labelFormatted} ({value})
    </text>
  )
}
