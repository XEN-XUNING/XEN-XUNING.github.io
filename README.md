# hatsune.fun

一个轻量的个人静态站点（HTML/CSS/JS）。适合直接部署到 GitHub Pages / Cloudflare Pages / Vercel / 任意静态托管。

## 本地预览

方式 1：直接用浏览器打开 `index.html`。

方式 2：起一个本地静态服务器（推荐，路径与路由更接近线上）：

```bash
cd /Users/bytedance/Documents/trae_projects/web_hatsune
python3 -m http.server 5173
```

然后访问：

`http://localhost:5173/`

## 自定义内容（最常改的地方）

- 文案：`index.html`
- 样式：`assets/styles.css`
- 交互（主题切换/复制邮箱等）：`assets/main.js`
- SEO：`index.html` 里的 `title/description/og:*`
- 域名：`CNAME`

## 部署到 GitHub Pages（推荐）

1. 创建一个仓库（例如 `web_hatsune`），把本目录文件推上去。
2. 在 GitHub 仓库设置中打开 Pages：
   - Build and deployment：选择 `Deploy from a branch`
   - Branch：选 `main`，Folder：选 `/ (root)`
3. Custom domain 填 `hatsune.fun`，等待 GitHub 生成 HTTPS 证书。
4. DNS 配置（示例，二选一）：
   - **apex 根域（hatsune.fun）**：添加 A 记录指向 GitHub Pages（4 条）
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **或使用子域**：例如 `www.hatsune.fun` 做 CNAME 到 `<你的GitHub用户名>.github.io`
5. 如果你希望 `www` 自动跳转到根域（或反过来），在 Pages 设置里开启重定向或用托管平台规则实现。

说明：本仓库已包含 `CNAME` 文件（内容为 `hatsune.fun`）。

## 部署到 Cloudflare Pages

1. Cloudflare Pages 新建项目，绑定该仓库。
2. 框架选择 `None`（静态站点），Build command 留空，Output directory 留空（或 `/`）。
3. 添加自定义域名 `hatsune.fun`。
4. DNS 按 Cloudflare 提示配置（一般是 CNAME 到 `xxx.pages.dev`，根域会自动扁平化）。

## 部署到 Vercel

1. Import 项目后，Framework Preset 选 `Other`。
2. Build command 留空，Output directory 留空。
3. 添加域名 `hatsune.fun`，按提示配置 DNS。

