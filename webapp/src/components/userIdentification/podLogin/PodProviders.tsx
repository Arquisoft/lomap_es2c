export type PodProvider = {
    name: string,
    url: string,
    logo: string,
};

export function GetProviders(): Array<PodProvider> {
    return [
        {
            name: "Inrupt",
            url: "https://inrupt.net/",
            logo: "inrupt.png"
        },
        {
            name: "SolidCommunity",
            url: "https://solidcommunity.net",
            logo: "solidcommunity.png"
        }
    ];

}

export default GetProviders;