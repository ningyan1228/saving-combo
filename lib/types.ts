export type Opportunity = {
  slug: string;
  title: string;
  type: "返现" | "价格变化" | "续费建议";
  service: string;
  regions: string[];
  cardNetworks?: string[];
  saving?: string;
  endAt?: string;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
  confidence: "官方" | "合作方公开页" | "待核验";
  summary: string;
  conditions: string[];
  status: "active" | "needs_review" | "expired";
};

export type SavingsCombo = {
  region: string;
  currency: string;
  services: string[];
  cardNetwork: string;
  renewalDate: string;
};
