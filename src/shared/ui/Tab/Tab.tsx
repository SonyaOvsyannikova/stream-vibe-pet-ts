import React, {ReactNode, useState} from 'react';
import cl from './Tab.module.scss'
import clsx from "clsx";

type TabProps = {
    labels: Array<Label>,
    onChange: (id: number) => void,
    classNameForTab?: string,
    classNameForButton?: string,
}
type Label = {
    id: number,
    label: string | ReactNode,
}

const Tab = (props: TabProps) => {

    const {
        classNameForTab,
        labels,
        onChange,
        classNameForButton
    } = props


    const [activeTabId, setActiveTabId] = useState<number>(1);

    return (
       <div className={clsx(cl.tabContainer, classNameForTab)}>
           {labels.map((labelName, index) => (
               <button
                   className={clsx(activeTabId === labelName.id ? cl.tabButton : cl.disActiveTabButton, classNameForButton)}
                   key={index}
                   onClick={() => {
                       setActiveTabId(labelName.id)
                       onChange(labelName.id)
                   }}
               >
               {labelName.label}
               </button>
           ))}

       </div>
    );
};

export default Tab;