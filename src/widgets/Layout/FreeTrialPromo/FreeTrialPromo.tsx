import MainButton from "@/shared/ui/MainButton";
import React from "react";
import cl from './FreeTrialPromo.module.scss'

const FreeTrialPromo = () => {

    return (
        <div className={`container ${cl.freeTrialPromoSection}`}>
            <div className={cl.freeTrialPromoHeader}>
                <h2>Start your free trial today!</h2>
                <p>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
            </div>
            <div className={cl.freeTrialPromoButton}>
                <MainButton
                    label={'Start a Free Trail'}
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                />
            </div>

        </div>
    )
};

export default FreeTrialPromo;