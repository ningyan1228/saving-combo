# 省钱组合

面向数字订阅用户的机会雷达。当前实现 P0/P1 的可交互静态前端原型、ChatGPT Plus 成本计算、组合匹配演示、基础 API 健康检查与 Supabase 初始迁移。

## 本地启动

需要 Node.js 20+。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。静态部署产物使用：

```bash
npm run build
```

构建结果在 `out/`，可部署到 GitHub Pages。复制 `.env.example` 为本地环境文件；不要提交任何真实密钥。

## GitHub Pages 发布

仓库推送到 `main` 后，`.github/workflows/deploy-pages.yml` 会构建并发布 `out/`。首次在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。发布地址为 `https://<你的 GitHub 用户名>.github.io/saving-combo/`。

## API 服务

```bash
cd server
npm install
npm run dev
```

默认监听 `http://localhost:8787`，健康检查为 `/health`。当前只实现无需身份信息的成本计算契约；用户/管理员接口需在 Supabase Auth 和服务端角色校验接通后实施。

## 数据库

在 Supabase SQL Editor 或 Supabase CLI 中执行 `supabase/migrations/202608030001_initial_schema.sql`。迁移创建表、索引和用户/公开读取的 RLS 策略。

## 当前限制

- 页面使用演示数据；待核验活动永远不会作为推荐。
- 未连接 Supabase Auth、邮件和定时任务。
- 汇率与真实活动数据尚未接入，计算器仅供输入已核实数字后的本地估算。
- 管理后台仍是下一步工作，不应将服务端密钥置于前端。
