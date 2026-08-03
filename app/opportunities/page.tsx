import { OpportunityCards } from "@/components/opportunity-cards";
import { SiteNav } from "@/components/site-nav";
import { opportunities } from "@/lib/demo-data";

export default function OpportunitiesPage() {
  return <main><SiteNav /><section className="page-header shell"><p className="eyebrow">公开、可追溯的信息</p><h1>机会大厅</h1><p>这里只展示演示数据：已核验信息与待核验模板明确区分，待核验信息不会成为主动推荐。</p><div className="filters"><button>ChatGPT Plus</button><button>全部地区</button><button>全部类型</button><button>有效状态</button></div></section><section className="shell section compact"><OpportunityCards items={opportunities} /></section></main>;
}
