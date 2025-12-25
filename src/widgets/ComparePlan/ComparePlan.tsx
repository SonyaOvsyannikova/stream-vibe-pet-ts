import cl from './ComparePlan.module.scss'
import {useEffect, useState} from "react";
import Tab from "@/shared/ui/Tab/Tab.tsx";
import ComparePlanCard from "@/widgets/ComparePlan/ComparePlanCard";

export type ComparePlanTypes = {
    id: number;
    name: string;
    features: {
        price: string;
        content: string;
        devices: string;
        freeTrial: string;
        cancelAnytime: 'Yes' | 'No';
        HDR: 'Yes' | 'No';
        dolbyAtmos: 'Yes' | 'No';
        adFree: 'Yes' | 'No';
        offlineViewing: string;
        familySharing: string;
    };
}

const ComparePlan = () => {

    const [tablet, setTablet] = useState<boolean>(true)
    const [billingPlant, setBillingPlant] = useState<'Basic'| 'Standard' | 'Premium'>('Standard')
    useEffect(() => {
       if( window.innerWidth <= 1024) {
           setTablet(false)
       }
    }, []);
    const dataComparePlan: ComparePlanTypes[] = [
        {
            id: 1,
            name: 'Basic',
            features: {
                price: '$9.99/Month',
                content: 'Access to a wide selection of movies and shows, including some new releases.',
                devices: 'Watch on one device simultaneously',
                freeTrial: "7 Days",
                cancelAnytime: 'No',
                HDR: 'No',
                dolbyAtmos: 'No',
                adFree: 'No',
                offlineViewing: "No",
                familySharing: "No"
            }
        },
        {
            id: 2,
            name: 'Standard',
            features: {
                price: '$12.99/Month',
                content: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
                devices: "Watch on Two device simultaneously",
                freeTrial: "7 Days",
                cancelAnytime: 'Yes',
                HDR: 'Yes',
                dolbyAtmos: 'Yes',
                adFree: 'Yes',
                offlineViewing: "Yes, for select titles.",
                familySharing: "Yes, up to 5 family members."
            }
        },
        {
            id: 3,
            name: 'Premium',
            features: {
                price: '$14.99/Month',
                content: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
                devices: "Watch on Four device simultaneously",
                freeTrial: "7 Days",
                cancelAnytime: 'Yes',
                HDR: 'Yes',
                dolbyAtmos: 'Yes',
                adFree: 'Yes',
                offlineViewing: "Yes, for all titles.",
                familySharing: "Yes, up to 6 family members."
            }
        }
    ]

    return (
        <div className={cl.comparePlan}>
            <div>
                <h3>Compare our plans and find the right one for you</h3>
                <p>StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you.</p>
            </div>
            <div>
                {tablet ? (<table className={cl.planTable}>
                    <thead className={cl.planTableHead}>
                    <tr className={cl.planTableHeaderRow}>
                        <th className={cl.planTableHeader}>Features</th>
                        {dataComparePlan.map(comparePlan => (
                            <th
                                className={cl.planTableHeader}
                                key = {comparePlan.id}
                            >
                                {comparePlan.name === 'Standard' ? (
                                    <th className={cl.planTableHeaderPopular}>
                                        {comparePlan.name}
                                        <div className={cl.popularFlag}>Popular</div>
                                    </th>
                                ) : (
                                    <th>
                                        {comparePlan.name}
                                    </th>
                                )}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(dataComparePlan[0].features).map(feature => (
                        <tr>
                            <td className={cl.planTableBody}>{feature}</td>
                            {dataComparePlan.map(plan => (
                                <td
                                    className={cl.planTableBody}
                                    key = {plan.id}>
                                    {plan.features[feature]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>) : (
                    <div>
                        <Tab labels={[{id:1, label:'Basic'}, {id: 2, label: 'Standard'}, {id: 3, label: 'Premium'}]}
                             onChange={(id) => {
                                 setBillingPlant(
                                     id === 1 ? 'Basic' :
                                         id === 2 ? 'Standard' :
                                             'Premium'
                                 );
                             }}/>
                        <ComparePlanCard plan={billingPlant} dataComparePlan={dataComparePlan}/>
                    </div>

                )}

            </div>
        </div>
    );
};

export default ComparePlan;