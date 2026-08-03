import { CostCalculator } from "@/components/cost-calculator";
import { SiteNav } from "@/components/site-nav";

export default function CalculatorPage() {
  return <main><SiteNav /><section className="page-header shell"><p className="eyebrow">ChatGPT Plus · V1 演示</p><h1>实际成本计算器</h1><p>计算公式：标价 × 汇率 + 已知支付手续费 − 可确认返现。只有已确认的信息才进入计算。</p></section><section className="shell section compact"><CostCalculator /><div className="data-note"><b>数据来源状态</b><span>官方标价：请在后台登记来源与核验时间</span><span>汇率：请接入已许可来源，并展示更新时间</span><span>返现：仅限管理员审核为 verified 的活动</span></div></section></main>;
}
