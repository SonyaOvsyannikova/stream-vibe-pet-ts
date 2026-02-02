import MainButton from '@/shared/ui/MainButton'
import Plan from '@/widgets/Plan/Plan.tsx'
import cl from './PlanCard.module.scss'

type PlanCardProps = {
  plans: Array<Plan>
  billingPeriod: 'monthly' | 'yearly'
}

const PlanCard = (props: PlanCardProps) => {
  const { plans, billingPeriod } = props

  return (
    <div className={cl.planCardSection}>
      {plans.map((plan) => (
        <div className={cl.planCard}>
          <div>
            <h4 className={cl.planCardTitle}>{plan.title}</h4>
            <p className={cl.planCardDescription}>{plan.description}</p>
          </div>
          {billingPeriod === 'monthly' ? (
            <div className={cl.planCardPrice}>
              <h3 className={cl.planCardPriceTitle}>${plan.monthlyPrice}</h3>
              <p>/month</p>
            </div>
          ) : (
            <div className={cl.planCardPrice}>
              <h3>${plan.monthlyPrice * 10}</h3>
              <p>/year</p>
            </div>
          )}
          <div className={cl.planCardButton}>
            <MainButton
              className={cl.disActiveButton}
              label={'Start Free Trial'}
              onClick={() => {}}
            />
            <MainButton
              className={cl.activeButton}
              label={'Choose Plan'}
              onClick={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlanCard
