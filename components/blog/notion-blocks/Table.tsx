import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";

export default function Table({ block }: { block: BlockWithChildren }) {
  if (block.type !== "table" || !block.children) return null;

  const hasColumnHeader = block.table.has_column_header;
  const hasRowHeader = block.table.has_row_header;

  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse border border-foreground/10">
        <tbody>
          {block.children.map((row, rowIdx) => {
            if (row.type !== "table_row") return null;
            const isHeaderRow = hasColumnHeader && rowIdx === 0;
            const Tag = isHeaderRow ? "th" : "td";

            return (
              <tr key={row.id} className={isHeaderRow ? "bg-muted/50" : ""}>
                {row.table_row.cells.map((cell, cellIdx) => {
                  const isHeaderCell = hasRowHeader && cellIdx === 0;
                  const CellTag = isHeaderCell && !isHeaderRow ? "th" : Tag;
                  return (
                    <CellTag
                      key={cellIdx}
                      className={`border border-foreground/10 px-3 py-2 text-left text-sm ${
                        isHeaderRow || isHeaderCell ? "font-semibold bg-muted/50" : ""
                      }`}
                    >
                      <RichText richTexts={cell} />
                    </CellTag>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
