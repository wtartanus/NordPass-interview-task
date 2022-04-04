import { API } from "~/constants";
import getUrl from "~/utils/getUrl";
import getAuthHeader from '~/utils/getAuthHeader';
import { IItem } from "./getUserItems";

const updateItem = (item: IItem) => (
    fetch(getUrl(API.Items), {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        }
    })
)

export default updateItem;