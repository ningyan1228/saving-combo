import type { Opportunity } from "./types";

export const opportunities: Opportunity[] = [
  {
    slug: "chatgpt-plus-usd-cost-guide",
    title: "ChatGPT Plus：美元结算成本核算指南",
    type: "价格变化",
    service: "ChatGPT Plus",
    regions: ["中国大陆", "美国"],
    saving: "待确认",
    sourceName: "OpenAI 官方定价页",
    sourceUrl: "https://chatgpt.com/pricing",
    verifiedAt: "2026-08-03",
    confidence: "官方",
    status: "active",
    summary: "适合希望先核算美元订阅实际人民币成本的用户；此条不代表优惠或返现。",
    conditions: ["以 OpenAI 页面显示的价格和可用地区为准", "汇率与发卡行手续费会影响最终入账金额", "不涉及代付、换汇或账户共享"]
  },
  {
    slug: "bank-public-cashback-template",
    title: "公开返现活动：人工核验后才会推送",
    type: "返现",
    service: "ChatGPT Plus",
    regions: ["中国大陆"],
    cardNetworks: ["Visa", "Mastercard"],
    saving: "待确认",
    sourceName: "活动来源待管理员录入",
    sourceUrl: "https://example.com",
    verifiedAt: "尚未核验",
    confidence: "待核验",
    status: "needs_review",
    summary: "这是后台录入流程的演示模板。待核验信息不会作为可用优惠推荐。",
    conditions: ["需由管理员填写官方来源链接", "需明确返现门槛、上限、活动期限", "审核状态为 verified 后才可推荐"]
  },
  {
    slug: "renewal-reminder-checklist",
    title: "续费前 14 天：重新核算实际成本",
    type: "续费建议",
    service: "ChatGPT Plus",
    regions: ["全部地区"],
    sourceName: "省钱组合规则说明",
    sourceUrl: "https://example.com",
    verifiedAt: "2026-08-03",
    confidence: "官方",
    status: "active",
    summary: "适合已添加 ChatGPT Plus 续费日期的用户；续费前复核价格、汇率和已审核活动。",
    conditions: ["仅在用户主动添加续费日后提醒", "默认提醒节点为 14 / 7 / 1 天前", "不保证任一优惠届时可用"]
  }
];
