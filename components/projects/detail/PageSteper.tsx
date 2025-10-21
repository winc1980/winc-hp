import Link from "next/link"

export default function PageSteper({pageTitle,className }:{pageTitle:string,className?:string}) {
    return (
      <div className={className}>
        <div className="flex items-center gap-2 text-xs md:text-sm font-normal">
          <Link
            href="/"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            ホーム
          </Link>
          {">"}
          <Link
            href="/projects"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            プロジェクト一覧
          </Link>
          {">"}
          <span className="text-foreground text-xs md:text-sm">{pageTitle}</span>
        </div>
      </div>
    );
}