export interface ISelector{
    name: string;
    id: string;
}


export const Selectors:ISelector[] = [
    {
        name: "Dickey Monkey",
        id: '595282015447095'
    },
    {
        name: "test",
        id: "834958394589545"
    }
]

export interface IServerData{
    account_ids: string[];
    app_id: string;
    __v: number;
    _id:  string;
}