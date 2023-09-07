import { ArrowCircleUp } from '@phosphor-icons/react'
import { SummaryCard, SummaryContainer } from './styles'
import { amountFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{amountFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>
        <strong>{amountFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <ArrowCircleUp size={32} color="#fff" />
        </header>
        <strong>{amountFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
