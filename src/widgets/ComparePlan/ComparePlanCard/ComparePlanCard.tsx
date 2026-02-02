import { ComparePlanTypes } from '@/widgets/ComparePlan/ComparePlan.tsx'
import cl from './ComparePlanCard.module.scss'

type ComparePlanCardProps = {
  plan?: string
  dataComparePlan: ComparePlanTypes[]
}
const ComparePlanCard = (props: ComparePlanCardProps) => {
  const { plan, dataComparePlan } = props

  const selectedPlan = dataComparePlan.find(
    (selectedPlan) => selectedPlan.name.toLowerCase() === plan?.toLowerCase(),
  )

  return (
    <div className={cl.comparePlanCard}>
      <div className={cl.comparePlanCardContents}>
        <div>
          <h6> Price </h6>
          <p>{selectedPlan.features.price}</p>
        </div>
        <div>
          <h6>Free Trial</h6>
          <p>{selectedPlan.features.freeTrial}</p>
        </div>
      </div>
      <div className={cl.comparePlanCardContent}>
        <h6>Content</h6>
        <p>{selectedPlan.features.content}</p>
      </div>
      <div className={cl.comparePlanCardContent}>
        <h6>Devices</h6>
        <p>{selectedPlan.features.devices}</p>
      </div>
      <div className={cl.comparePlanCardContents}>
        <div>
          <h6> Cancel Anytime </h6>
          <p>{selectedPlan.features.cancelAnytime}</p>
        </div>
        <div>
          <h6>HDR</h6>
          <p>{selectedPlan.features.HDR}</p>
        </div>
      </div>
      <div className={cl.comparePlanCardContents}>
        <div>
          <h6> Dolby Atmos </h6>
          <p>{selectedPlan.features.dolbyAtmos}</p>
        </div>
        <div>
          <h6>Ad - Free</h6>
          <p>{selectedPlan.features.adFree}</p>
        </div>
      </div>
      <div className={cl.comparePlanCardContents}>
        <div>
          <h6> Offline Viewing </h6>
          <p>{selectedPlan.features.offlineViewing}</p>
        </div>
        <div>
          <h6>Family Sharing</h6>
          <p>{selectedPlan.features.familySharing}</p>
        </div>
      </div>
    </div>
  )
}

export default ComparePlanCard
