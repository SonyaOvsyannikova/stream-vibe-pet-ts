import React, {FC, ReactNode, SVGProps} from 'react';
import cl from './DevicesCard.module.scss'
import Devices from "@/widgets/Devices/Devices.tsx";

type DevicesCardProps = {
    device: Devices
}


const DevicesCard = (props: DevicesCardProps) => {

   const {
       device
   } = props

   const {
       title,
       IconComponent
   } = device

    return (
        <div className={cl.deviceCard}>
            <div className={cl.devicesCardHeader}>
                <div className={cl.deviceIcon}>
                    <IconComponent
                        className={cl.iconColor}/>
                </div>
                <h4>{title}</h4>
            </div>
            <div className={cl.devicesCardBody}>
                <p>
                    StreamVibe is optimized for both Android and iOS smartphones.
                    Download our app from the Google Play Store or the Apple App Store
                </p>
            </div>
        </div>
    );
};

export default DevicesCard;