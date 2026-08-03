"use client";

import { useMemo, useState } from "react";

export function CostCalculator() {
  const [price, setPrice] = useState(20);
  const [rate, setRate] = useState(7.2);
  const [fee, setFee] = useState(1.5);
  const [cashback, setCashback] = useState(0);
  const result = useMemo(() => price * rate * (1 + fee / 100) - cashback, [price, rate, fee, cashback]);
  const input = (label: string, value: number, setter: (next: number) => void, suffix: string) => <label>{label}<div className="number-input"><input type="number" min="0" step="0.01" value={value} onChange={(event) => setter(Number(event.target.value) || 0)} /><span>{suffix}</span></div></label>;
  return <div className="calculator-layout"><form className="calculator-form"><label>服务<select defaultValue="chatgpt-plus"><option value="chatgpt-plus">ChatGPT Plus</option></select></label>{input("官方标价", price, setPrice, "USD")}{input("汇率（1 USD =）", rate, setRate, "CNY")}{input("已知支付手续费", fee, setFee, "%")}{input("已确认返现", cashback, setCashback, "CNY")}</form><aside className="result-card"><span>预计实际支付成本</span><strong>¥ {result.toFixed(2)}</strong><p>USD {price.toFixed(2)} × {rate.toFixed(4)} + 手续费 − 已确认返现</p><hr /><small>这是本地演示计算，不包含未确认返现，也不代表最终扣款金额。请以付款页面、发卡行汇率和活动规则为准。</small></aside></div>;
}
