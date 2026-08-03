import { ComboWizard } from "@/components/combo-wizard";
import { SiteNav } from "@/components/site-nav";

export default function MyComboPage() { return <main><SiteNav /><section className="page-header shell"><p className="eyebrow">首次配置少于两分钟</p><h1>创建我的省钱组合</h1><p>未登录时可先在本地预览；接入 Supabase Auth 后再同步到你的账户。</p></section><section className="shell section compact"><ComboWizard /></section></main>; }
