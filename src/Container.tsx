import react, { FC, useEffect, useState } from 'react';
import {ISelector, Selectors} from './types';

interface props{
    app_id: string;
    account_ids: string[];
}


const Container: FC<props> = (props: props) => {
    const [name, setName] = useState<string>(Selectors.filter((el: ISelector) => {return el.id === props.app_id})[0].name);
    return(
        <div className='Container'>
            <h4>{name + ` (аккаунтов: ` + props.account_ids.length + `)`}</h4>
            <ul>
                {props.account_ids.map((el: string) => {
                    return  el + ", "
                })}
            </ul>
        </div>
    )
}


export default Container