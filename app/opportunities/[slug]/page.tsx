import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { opportunities } from "@/lib/demo-data";

export function generateStaticParams() { return opportunities.map(({ slug }) => ({ slug })); }

export default async function OpportunityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = opportunities.find((opportunity) => opportunity.slug === slug);
  if (!item) notFound();
  return <main><SiteNav /><section className="detail shell"><Link className="back-link" href="/opportunities">← 返回机会大厅</Link><div className="detail-title"><div><span className={item.status === "active" ? "tag verified" : "tag review"}>{item.confidence}</span><h1>{item.title}</h1><p>{item.summary}</p></div><aside><span>预计节省</span><strong>{item.saving ?? "待确认"}</strong><small>仅在所有计算条件完整时显示具体金额</small></aside></div><div className="detail-grid"><article><h2>适用条件</h2><ul>{item.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul><h2>建议操作</h2><ol><li>打开原始来源，确认当前内容和适用地区。</li><li>核对支付方式、门槛、上限与截止时间。</li><li>在成本计算器中确认预计实付，再自行决定是否操作。</li></ol></article><aside className="source-box"><h2>来源与核验</h2><dl><div><dt>来源</dt><dd><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceName} ↗</a></dd></div><div><dt>最后核验</dt><dd>{item.verifiedAt}</dd></div><div><dt>适用地区</dt><dd>{item.regions.join("、")}</dd></div><div><dt>状态</dt><dd>{item.status === "active" ? "有效" : "待人工审核"}</dd></div></dl><p>资格和结果最终以服务方、发卡方的实际规则为准；本站不作保证。</p></aside></div></section></main>;
}
