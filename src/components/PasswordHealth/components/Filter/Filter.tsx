import { FC } from 'react';

import { Routes } from "~/constants";

import FilterTab from "./components/FilterTab"

import './filter-style.scss';

interface IFilter {
  weakCount: number;
  reusedCount: number;
  oldCount: number;
}

const Filter: FC<IFilter> = ({
  weakCount,
  reusedCount,
  oldCount,
}) => (
  <div className="filter">
    <FilterTab title="Weak" count={weakCount} path={Routes.Weak}/>
    <FilterTab title="Reused" count={reusedCount} path={Routes.Reused}/>
    <FilterTab title="Old" count={oldCount} path={Routes.Old} />
  </div>
);

export default Filter;
