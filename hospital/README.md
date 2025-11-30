# 医院挂号项目

## pnpm + vite创建vue项目

- pnpm + vite创建项目
```bash
  pnpm create vite
  # 输入项目名称
  # hospital
  # 选择开发框架
  # Vue
  # 选择语言
  # TypeScript
  # 是否使用rolldown-vite
  # No
  # 是否使用npm安装并立即开始
  # Yes
```

- 删除无关文件

## 项目配置

### 启动后自动打开浏览器

- 在`package.json`中添加`"scripts": { "dev": "vite --open" }`
```json
  {
    "scripts": {
      "dev": "vite --open"
    }
  }
```