export interface ISelector{
    name: string;
    id: string;
}


export const Selectors:ISelector[] = [
    // {
    //     name: "Dickey Monkey",
    //     id: '595282015447095'
    // },
    {
        name: "Queen Of Pearls",
        id: "357870159642422"
    },
    {
        name: "Hunter Of The Treasure",
        id: "2019449168262303"
    },
    {
        name: "Prince Of sand",
        id: "742877997039962"
    },
    {
        name: "Temple Fortune",
        id: "627350779006969"
    },
    {
        name: "Baseball winner",
        id: "680230049751992"
    }
]

export interface IServerData{
    account_ids: string[];
    app_id: string;
    __v: number;
    _id:  string;
}