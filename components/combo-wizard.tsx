"use client";

import { useMemo, useState } from "react";
import { opportunities } from "@/lib/demo-data";
import type { SavingsCombo } from "@/lib/types";

const defaultCombo: SavingsCombo = { region: "中国大陆", currency: "CNY", services: ["ChatGPT Plus"], cardNetwork: "Visa", renewalDate: "" };

export function ComboWizard() {
  const [combo, setCombo] = useState(defaultCombo);
  const [submitted, setSubmitted] = useState(false);
  const matches = useMemo(() => opportunities.filter((item) => item.service === "ChatGPT Plus" && (item.regions.includes(combo.region) || item.regions.includes("全部地区"))).filter((item) => item.status === "active"), [combo.region]);
  const update = <K extends keyof SavingsCombo>(key: K, value: SavingsCombo[K]) => setCombo((current) => ({ ...current, [key]: value }));
  if (submitted) return <div className="match-summary"><p className="eyebrow">匹配预览</p><h2>针对你的组合，当前有 {matches.length} 条可关注机会。</h2><p>{combo.renewalDate ? `下一次续费在 ${combo.renewalDate}；系统将在 14、7、1 天前生成站内提醒。` : "添加续费日期后，系统会在 14、7、1 天前生成站内提醒。"}</p><ul>{matches.map((item) => <li key={item.slug}><b>{item.title}</b><span>{item.summary}</span></li>)}</ul><button className="button secondary" onClick={() => setSubmitted(false)}>返回修改</button></div>;
  return <form className="wizard" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div><span className="step-number">1</span><h2>你通常在哪里结算？</h2><div className="choice-row">{["中国大陆", "美国", "其他地区"].map((region) => <button type="button" className={combo.region === region ? "choice selected" : "choice"} onClick={() => update("region", region)} key={region}>{region}</button>)}</div></div><div><span className="step-number">2</span><h2>关注哪些服务？</h2><div className="choice-row"><button type="button" className="choice selected">ChatGPT Plus</button><span className="coming-soon">Claude / Cursor / Gemini 将在后续版本开放</span></div></div><div><span className="step-number">3</span><h2>付款与续费信息</h2><div className="field-row"><label>结算货币<select value={combo.currency} onChange={(event) => update("currency", event.target.value)}><option>CNY</option><option>USD</option></select></label><label>卡组织<select value={combo.cardNetwork} onChange={(event) => update("cardNetwork", event.target.value)}><option>Visa</option><option>Mastercard</option><option>其他/暂不填写</option></select></label><label>下次续费日（可选）<input type="date" value={combo.renewalDate} onChange={(event) => update("renewalDate", event.target.value)} /></label></div><p className="privacy">只记录非敏感支付标签，不需要完整卡号、CVV、密码或验证码。</p></div><button className="button primary" type="submit">查看我的匹配机会</button></form>;
}
