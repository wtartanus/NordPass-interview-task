import {IItem} from "~/services/getUserItems";

const getOldDateMargin = () => {
    const dateMargin = new Date();
    dateMargin.setDate(dateMargin.getDate() - 30);

    return dateMargin.getTime();
};

const itemHasOldPassword = (item: IItem) => {
  const { createdAt } = item;

  return getOldDateMargin() > new Date(createdAt).getTime();
};

export default itemHasOldPassword;
