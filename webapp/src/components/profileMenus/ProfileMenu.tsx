import React, { useState } from 'react'
import { NoLogedMenu } from './NoLogedMenu'
import LogedMenu from './LogedMenu'

export function ProfileMenu() {

    const [loged, setLoged] = useState(false);

    const changeLoged = function (isLoged: boolean) {
        setLoged(isLoged);
        return;
    }

    if (loged) {
        return (<LogedMenu changeLoged={changeLoged} />)
    }
    else {
        return (<NoLogedMenu changeLoged={changeLoged} />)
    }

}
