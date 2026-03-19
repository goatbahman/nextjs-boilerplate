"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const items = [
    { name: "⭐ Star", chance: 45 },
    { name: "🎁 Gift", chance: 20 },
    { name: "🧸 Toy", chance: 15 },
    { name: "💎 Diamond", chance: 5 },
    { name: "❌ Nothing", chance: 15 },
  ];

  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [coins, setCoins] = useState(10);

  useEffect(() => {
    const savedInventory = localStorage.getItem("inventory");
    const savedCoins = localStorage.getItem("coins");

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }

    if (savedCoins) {
      setCoins(JSON.parse(savedCoins));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);

  const spin = () => {
    if (coins <= 0) {
      setResult("سکه‌ات تموم شده 😅");
      return;
    }

    setSpinning(true);
    setCoins((prev) => prev - 1);

    setTimeout(() => {
      let random = Math.random() * 100;
      let cumulative = 0;
      let selected = "";

      for (let item of items) {
        cumulative += item.chance;
        if (random <= cumulative) {
          selected = item.name;
          break;
        }
      }

      setResult(selected);

      if (selected !== "❌ Nothing") {
        setInventory((prev) => [...prev, selected]);
      }

      setSpinning(false);
    }, 1000);
  };

  const clearInventory = () => {
    setInventory([]);
    setResult("");
  };

  const resetCoins = () => {
    setCoins(10);
    setResult("سکه‌ها ریست شدند");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Goat&apos;s Spin App 🎰
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "20px",
          }}
        >
           Mini App Goat ✨
        </p>

        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "22px",
          }}
        >
          🪙 Coins: {coins}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#1e293b",
                padding: "18px",
                borderRadius: "16px",
                minWidth: "130px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                border: "1px solid #334155",
                fontSize: "20px",
              }}
            >
              <div>{item.name}</div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#94a3b8",
                }}
              >
                {item.chance}%
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#111827",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Spin Zone</h2>

          <button
            onClick={spin}
            disabled={spinning}
            style={{marginTop: "12px",
              padding: "14px 28px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "none",
              background: spinning ? "#64748b" : "#22c55e",
              color: "white",
              cursor: "pointer",
            }}
          >
            {spinning ? "در حال چرخش..." : "🎰 Spin (-1 coin)"}
          </button>

          <div
            style={{
              marginTop: "20px",
              background: "#1e293b",
              padding: "18px",
              borderRadius: "14px",
              border: "1px solid #334155",
            }}
          >
            <p style={{ margin: 0, color: "#94a3b8" }}>Result</p>
            <h3 style={{ margin: "10px 0 0 0", fontSize: "24px" }}>
              {result || "هنوز چیزی برنده نشدی"}
            </h3>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "#111827",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ margin: 0 }}>Inventory 🎒</h2>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={clearInventory}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                پاک کردن Inventory
              </button>

              <button
                onClick={resetCoins}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#3b82f6",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ریست Coins
              </button>
            </div>
          </div>

          {inventory.length === 0 ? (
            <p style={{ color: "#94a3b8", marginTop: "16px" }}>
              هنوز آیتمی نداری
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "18px",
              }}
            >
              {inventory.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#1e293b",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #334155",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
