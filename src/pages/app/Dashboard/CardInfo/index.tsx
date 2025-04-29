import { cva, VariantProps } from 'class-variance-authority'

export enum CARD_INFO_VARIANTS_LABEL {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
}

const cardInfoVariants = cva('font-bold', {
  variants: {
    variant: {
      positive: 'text-emerald-500  dark:text-emerald-400',
      negative: 'text-rose-500  dark:text-rose-400',
      neutral: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'negative',
  },
})
type CardInfoVariantsType = VariantProps<typeof cardInfoVariants>

type CardInfoProps = CardInfoVariantsType & {
  percentageValue: string | number
  isError?: boolean
  description?: string
}

const CARD_INFO_VARIANTS_INFO = {
  [CARD_INFO_VARIANTS_LABEL.positive]: {
    prefix: '+',
    suffix: '%',
  },
  [CARD_INFO_VARIANTS_LABEL.negative]: {
    prefix: '-',
    suffix: '%',
  },
  [CARD_INFO_VARIANTS_LABEL.neutral]: {
    prefix: '',
    suffix: '%',
  },
} as const

export function CardInfo({
  isError = false,
  percentageValue,
  description,
  variant = CARD_INFO_VARIANTS_LABEL.neutral,
}: Readonly<CardInfoProps>) {
  if (isError) {
    return (
      <p className="text-xs text-muted-foreground">
        <span className="font-bold">Ocorreu um erro ao buscar os dados</span>
      </p>
    )
  }

  const cardInfoClassName = cardInfoVariants({
    variant,
  })

  const cardInfoVariant =
    CARD_INFO_VARIANTS_INFO[variant ?? CARD_INFO_VARIANTS_LABEL.neutral]

  return (
    <p className="text-xs text-muted-foreground">
      <span className={cardInfoClassName}>
        {cardInfoVariant.prefix}
        {percentageValue}
        {cardInfoVariant.suffix}
      </span>{' '}
      {description}
    </p>
  )
}
