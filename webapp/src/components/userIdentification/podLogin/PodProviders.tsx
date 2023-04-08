import React, { useState } from 'react';

type PodProvider = {
    name: string,
    url: string,
};

export function GetProviders():Array<PodProvider> {
        return [
            {
                name: "Inrupt",
                url: "https://inrupt.net/",
            },
        ];
    
}

export default GetProviders;