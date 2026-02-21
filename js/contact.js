// site/js/contact.js
const API_BASE =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:8000" // ローカルAPI
    : "https://fusuma-app-server-5rhygt2tha-an.a.run.app"; // 本番API

const form = document.getElementById("contactForm");
const resultBox = document.getElementById("resultBox");
const resultJson = document.getElementById("resultJson");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(form);

  const payload = {
    name: fd.get("name")?.toString().trim(),
    email: fd.get("email")?.toString().trim(),
    tel: fd.get("tel")?.toString().trim(),
    area: fd.get("area")?.toString().trim(),
    type: fd.get("type")?.toString().trim(),
    count: fd.get("count")?.toString().trim(),
    timing: fd.get("timing")?.toString().trim(),
    message: fd.get("message")?.toString().trim(),
  };

  try {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "送信に失敗しました");

    // 画面表示（デモ表示を活かす）
    resultBox.classList.remove("hidden");
    resultJson.textContent = JSON.stringify(
      { saved: true, id: data.id, ...payload },
      null,
      2,
    );

    form.reset();
    alert("送信しました！DBに保存しました。");
  } catch (err) {
    alert(`エラー: ${err.message}`);
  }
});

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultJson.textContent || "");
    alert("コピーしました！");
  } catch {
    alert("コピーに失敗しました");
  }
});
