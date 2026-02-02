import { useState } from 'react'
import Tab from '@/shared/ui/Tab/Tab.tsx'
import PlanCard from '@/shared/ui/PlanCard/PlanCard.tsx'
import cl from './Plan.module.scss'

type Plan = {
  title: string
  description: string
  monthlyPrice: number
}

const Plan = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  )

  const plans: Array<Plan> = [
    {
      title: 'Basic Plan',
      description:
        'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
      monthlyPrice: 9.99,
    },
    {
      title: 'Standard Plan',
      description:
        'Access to a wider selection of movies and shows, including most new releases and exclusive content',
      monthlyPrice: 12.99,
    },
    {
      title: 'Premium Plan',
      description:
        'Access to a widest selection of movies and shows, including all new releases and Offline Viewing',
      monthlyPrice: 14.99,
    },
  ]

  return (
    <div className={cl.planSection}>
      <div className={cl.planSectionHeader}>
        <div>
          <h3>Choose the plan that's right for you</h3>
          <p>
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>
        <Tab
          labels={[
            { id: 1, label: 'Monthly' },
            { id: 2, label: 'Yearly' },
          ]}
          onChange={(id) => {
            setBillingPeriod(id === 1 ? 'monthly' : 'yearly')
          }}
        ></Tab>
      </div>
      <PlanCard plans={plans} billingPeriod={billingPeriod} />
    </div>
  )
}

export default Plan
