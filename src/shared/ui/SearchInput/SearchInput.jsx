import React from 'react';
import cl from './SearchInput.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import SearchIcon from "@/assets/icons/searchIcon.svg?react";


const SearchInput = (props) => {

   const {
       inputRef,
       value,
       onSearchChange,
       onSearchSubmit,
       onSearchClick,
   } = props

    return (
        <div>
            <form
                className={cl.searchForm}
                onSubmit={(e) => e.preventDefault()}>
                <input
                    className={cl.searchInput}
                    ref={inputRef}
                    value={value}
                    onChange={onSearchChange}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            onSearchSubmit(e)
                        }
                    }
                }
                />
                <ButtonIcon
                    label={<SearchIcon />}
                    onClick={ (event) => {
                        event.preventDefault()
                        onSearchClick(value)
                    } }>Поиск</ButtonIcon>
            </form>
        </div>
    );
};

export default SearchInput;