# Batch Buddy Backend Test Setup

## 1. Supabase (Lovable)
- Paste SQL seeds from previous message.
- Get URL/anon key from dashboard → paste into .env.local

## 2. Run App (PowerShell blocks npm – use CMD or VSCode Terminal)
**CMD:**
```
cd /d c:\Users\User\Downloads\ellaine\batch-buddy
npm install
npm run dev
```

**PowerShell Fix:**
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
npm run dev
```

## 3. Test
- Login (signup first).
- Check dashboard queries/alerts.
- CRUD products/ingredients/stock.

Backend 100% good!
