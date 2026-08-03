import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "省钱组合｜数字订阅机会雷达",
  description: "透明追踪 AI 订阅的价格、公开返现和续费节点。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
