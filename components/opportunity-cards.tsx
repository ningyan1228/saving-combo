import Link from "next/link";
import type { Opportunity } from "@/lib/types";

export function OpportunityCards({ items }: { items: Opportunity[] }) {
  return <div className="card-grid">{items.map((item) => <article className="opportunity-card" key={item.slug}>
    <div className="card-meta"><span className={item.status === "active" ? "tag verified" : "tag review"}>{item.confidence}</span><span>{item.type}</span></div>
    <h3>{item.title}</h3><p>{item.summary}</p>
    <dl><div><dt>适用服务</dt><dd>{item.service}</dd></div><div><dt>预计节省</dt><dd>{item.saving ?? "待确认"}</dd></div><div><dt>最后核验</dt><dd>{item.verifiedAt}</dd></div></dl>
    <Link className="text-link" href={`/opportunities/${item.slug}`}>查看详情 →</Link>
  </article>)}</div>;
}
