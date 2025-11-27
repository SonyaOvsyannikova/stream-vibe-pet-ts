import React, {ReactNode, useState} from 'react';
import cl from './Tab.module.scss'

type TabProps = {
    labels: Array<Label>,
    onChange: (id: number) => void,
}
type Label = {
    id: number,
    label: string,
}

const Tab = (props: TabProps) => {

    const {
        labels,
        onChange,
    } = props


    const [activeTabId, setActiveTabId] = useState<number>(1);

    return (
       <div className={cl.tabContainer}>
           {labels.map((labelName, index) => (
               <button
                   className={activeTabId === labelName.id ? cl.tabButton : cl.disActiveTabButton}
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