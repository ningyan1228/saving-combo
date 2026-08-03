import Link from "next/link";
import { OpportunityCards } from "@/components/opportunity-cards";
import { opportunities } from "@/lib/demo-data";

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <nav><Link className="brand" href="/">省钱组合</Link><div><Link href="/opportunities">机会大厅</Link><Link href="/calculator">成本计算器</Link></div></nav>
        <div className="hero-copy">
          <p className="eyebrow">你的数字生活自动省钱系统</p>
          <h1>不用到处搜优惠，<br />省钱组合替你盯着。</h1>
          <p className="lead">自动追踪 AI 订阅价格、公开返现、汇率和续费节点，只推你可能用得上的机会。</p>
          <div className="actions"><Link className="button primary" href="/my-combo">创建我的省钱组合</Link><Link className="button secondary" href="/calculator">先看 ChatGPT Plus 成本</Link></div>
        </div>
        <aside className="trust-card"><span>透明计算，不作保证</span><strong>每一条机会都说明来源、条件与核验时间。</strong><p>不收集完整卡号，不做代付或换汇。</p></aside>
      </section>
      <section className="section shell"><div className="section-heading"><div><p className="eyebrow">今日已核验机会</p><h2>先看与你有关的机会</h2></div><Link href="/opportunities">查看全部 →</Link></div><OpportunityCards items={opportunities.slice(0, 3)} /></section>
      <section className="calculation shell"><div><p className="eyebrow">成本看得见</p><h2>标价不是最终成本</h2><p>把汇率、支付手续费和已核验返现放进同一个公式，得到可解释的预计实付。</p></div><div className="formula"><span>官方标价 × 汇率</span><b>＋</b><span>支付手续费</span><b>－</b><span>可确认返现</span><strong>＝ 预计实付</strong></div></section>
      <section className="section shell steps"><p className="eyebrow">两分钟开始</p><h2>建立你的省钱组合</h2><div className="step-grid"><article><b>01</b><h3>选择服务与地区</h3><p>告诉我们你关注的服务和结算习惯。</p></article><article><b>02</b><h3>填写订阅节点</h3><p>仅填写套餐、金额和续费日期，不需要支付凭据。</p></article><article><b>03</b><h3>接收匹配与提醒</h3><p>有适用机会或临近续费时再提醒你。</p></article></div></section>
    </main>
  );
}
