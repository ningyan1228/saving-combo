import Link from "next/link";

export function SiteNav() {
  return <nav className="inner-nav shell"><Link className="brand" href="/">省钱组合</Link><div><Link href="/opportunities">机会大厅</Link><Link href="/calculator">成本计算器</Link><Link href="/my-combo">我的组合</Link></div></nav>;
}
