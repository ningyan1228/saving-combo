# 架构与数据流

前端采用 Next.js 静态导出并部署到 GitHub Pages；它只能读取公开数据及使用 Supabase Anon Key（配合 RLS）。API 服务部署在受控服务器，保管 Service Role Key、邮件服务密钥和任务密钥。

```text
官方公开页 / RSS / API / 用户公开报料
  → 服务器采集、规则校验、待审核队列
  → Supabase（来源快照、机会、用户组合）
  → 服务器匹配与续费提醒
  → GitHub Pages（展示机会与用户界面）
```

正式推荐只读取 `opportunities.status = verified` 的记录。RLS 禁止普通用户读取或更改他人的个人信息；后台写入必须通过服务端完成。
