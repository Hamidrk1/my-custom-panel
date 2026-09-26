const express = require('express');
const app = express();

// تنظیم پورت بر اساس متغیر محیطی سرور یا پورت پیش‌فرض
const PORT = process.env.PORT || 20218;

// لیست کانفیگ‌های اختصاصی شما (می‌تونی هر تعداد کانفیگ دلخواه اضافه یا ویرایش کنی)
const configs = [
  { 
    name: "Thunder VLESS WS", 
    type: "VLESS", 
    link: "vless://YOUR_UUID@51.83.6.5:20218?type=ws&security=none&path=/custom-path#Thunder-VLESS" 
  },
  { 
    name: "Crimson Trojan", 
    type: "Trojan", 
    link: "trojan://YOUR_PASSWORD@51.83.6.5:20218?type=tcp&security=none#Crimson-Trojan" 
  },
  { 
    name: "Phantom Hysteria2", 
    type: "Hysteria2", 
    link: "hysteria2://YOUR_PASSWORD@51.83.6.5:20218#Phantom-Hysteria" 
  }
];

// مسیر اصلی پنل
app.get('/my-panel', (req, res) => {
  const configItems = configs.map(c => `
    <div class="card">
      <div class="card-header">
        <span class="badge">${c.type}</span>
        <h3>${c.name}</h3>
      </div>
      <div class="input-group">
        <input type="text" value="${c.link}" id="cfg-${c.name.replace(/\s+/g, '')}" readonly />
        <button onclick="copyToClipboard('cfg-${c.name.replace(/\s+/g, '')}')">کپی کانفیگ</button>
      </div>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>پنل اختصاصی مدیریت کانفیگ</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background-color: #121212; color: #e0e0e0; padding: 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 600px; background: #1e1e1e; padding: 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
        h1 { font-size: 1.5rem; text-align: center; margin-bottom: 20px; color: #4caf50; }
        .card { background: #2a2a2a; padding: 15px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #333; }
        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .badge { background: #4caf50; color: #000; font-weight: bold; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; }
        .card h3 { font-size: 1rem; color: #fff; }
        .input-group { display: flex; gap: 8px; }
        input { flex: 1; background: #121212; border: 1px solid #444; color: #aaa; padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; }
        button { background: #333; color: #fff; border: 1px solid #555; padding: 8px 14px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
        button:hover { background: #4caf50; color: #000; border-color: #4caf50; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 پنل مدیریت کانفیگ من</h1>
        ${configItems}
      </div>
      <script>
        function copyToClipboard(id) {
          const input = document.getElementById(id);
          input.select();
          navigator.clipboard.writeText(input.value);
          alert('کانفیگ کپی شد!');
        }
      </script>
    </body>
    </html>
  `);
});

// مسیر پیش‌فرض برای ریدایرکت
app.get('/', (req, res) => {
  res.redirect('/my-panel');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
