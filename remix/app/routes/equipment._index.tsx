// New Remix Page

import { json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Equipment, Equipment } from "~/gurps/equipment";

export function meta() {
  return [
    { title: "Equipment" },
    { name: "description", content: "Equipment" },
  ];
}

type SortOptions = "description" | "reference" | "value" | "weight";

export default function Equipment() {
  const [sortBy, setSortBy] = useState<SortOptions>("description");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const equipment = useLoaderData<typeof loader>();

  const tags = Array.from(new Set(equipment.flatMap((item) => item.tags)));

  const toggleSort = (newSortBy: SortOptions) => {
    if (newSortBy === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
    }
    setSortBy(newSortBy);
  };

  equipment.sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1;

    if (a[sortBy] < b[sortBy]) {
      return direction;
    } else if (a[sortBy] > b[sortBy]) {
      return -direction;
    } else {
      return 0;
    }
  });

  const visibleEquipment = equipment.filter((item) => {
    if (tagFilter.length === 0) {
      return true;
    }

    return tagFilter.some((tag) => item.tags.includes(tag));
  });

  return (
    <main>
      <h1>Equipment</h1>
      <label>
        Filter by Tag
        <select
          multiple
          value={tagFilter}
          // @ts-ignore
          onChange={(event) => {
            const options = event.target.options;
            const selectedValues = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                selectedValues.push(options[i].value);
              }
            }
            setTagFilter(selectedValues);
          }}
        >
          {tags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("description")}>
              Description{" "}
              <SortIcon
                column="description"
                current={sortBy}
                direction={sortDirection}
              />{" "}
            </th>
            <th onClick={() => toggleSort("reference")}>
              Reference{" "}
              <SortIcon
                column="reference"
                current={sortBy}
                direction={sortDirection}
              />{" "}
            </th>
            <th>Tags</th>
            <th onClick={() => toggleSort("value")}>
              Value{" "}
              <SortIcon
                column="value"
                current={sortBy}
                direction={sortDirection}
              />{" "}
            </th>
            <th onClick={() => toggleSort("weight")}>
              Weight{" "}
              <SortIcon
                column="weight"
                current={sortBy}
                direction={sortDirection}
              />{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleEquipment.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.reference}</td>
              <td className="flex gap-0.5">
                {item.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setTagFilter([tag])}
                    className="border rounded px-1 py-0.5 text-sm bg-slate-100 inset-2"
                  >
                    {tag}
                  </button>
                ))}
              </td>
              <td>{item.value}</td>
              <td>{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export const loader = async () => {
  // Load data from https://raw.githubusercontent.com/richardwilkes/gcs_master_library/master/Library/Basic%20Set/Basic%20Set%20Equipment.eqp

  const response = await fetch(
    "https://raw.githubusercontent.com/richardwilkes/gcs_master_library/master/Library/Basic%20Set/Basic%20Set%20Equipment.eqp"
  );

  const equipment = await response.json();

  return json<Equipment[]>(equipment.rows);
};

function SortIcon({
  column,
  current,
  direction,
}: {
  column: SortOptions;
  current: SortOptions;
  direction: "asc" | "desc";
}) {
  if (column !== current) {
    return null;
  } else if (direction === "asc") {
    return <>↓</>;
  } else {
    return <>↑</>;
  }
}
