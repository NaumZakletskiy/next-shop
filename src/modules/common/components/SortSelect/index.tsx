import { FC } from "react";
import { SortOrder } from "../../enums";
import { Select } from "../Select";

interface IParams {
  sortOrder: SortOrder | null;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const options = [
  { label: "Asc", value: SortOrder.ASC },
  { label: "Desc", value: SortOrder.DESC },
];

export const SortSelect: FC<IParams> = ({ setSortOrder }) => {
  return (
    <Select
      options={options}
      onChange={(value: SortOrder) => setSortOrder(value)}
      placeholder="Sort..."
    />
  );
};
