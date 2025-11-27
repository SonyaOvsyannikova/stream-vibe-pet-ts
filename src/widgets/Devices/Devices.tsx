import React, {FC, SVGProps} from 'react';
import SmartphonesIcon from '@/assets/icons/Smartphones1.svg?react'
import TabletIcon from '@/assets/icons/tablet.svg?react'
import SmartTvIcon from '@/assets/icons/smartTV.svg?react'
import LaptopsIcon from '@/assets/icons/laptops.svg?react'
import GamingConsoleIcon from '@/assets/icons/gamingConsole.svg?react'
import VRIcon from '@/assets/icons/VR.svg?react'
import DevicesCard from "@/shared/ui/DevicesCard";
import cl from './Devices.module.scss'

type Devices = {
    title: string,
    IconComponent: FC<SVGProps<SVGSVGElement>>,
}

const Devices = () => {

    const devices: Array<Devices> = [
        {
            title: 'Smartphones',
            IconComponent: SmartphonesIcon,
        },
        {
            title: 'Tablet',
            IconComponent: TabletIcon,
        },
        {
            title: 'Smart TV',
            IconComponent: SmartTvIcon,

        },
        {
            title: 'Laptops',
            IconComponent: LaptopsIcon,
        },
        {
            title: 'Gaming Consoles',
            IconComponent: GamingConsoleIcon,
        },
        {
            title: 'VR Headsets ',
            IconComponent: VRIcon,
        }
    ]

    return (
            <div className={cl.deviceSection}>
                <div className={cl.deviceHeader}>
                    <h3> We Provide you streaming experience across various devices. </h3>
                    <p>
                        With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere.
                        Our platform is designed to be compatible with a wide range of devices,
                        ensuring that you never miss a moment of entertainment.
                    </p>
                </div>

                <div className={cl.devicesBody}>
                    {devices.map((device) => (
                        <DevicesCard
                        device={device}
                        />
                    ))}
                </div>
            </div>
    );
};

export default Devices;