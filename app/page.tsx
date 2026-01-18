"use client";
import React, { useState, useEffect } from "react";

export default function AsphaltCalculator() {
  // 定义状态：长、宽、厚度、单价、密度
  const [length, setLength] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [thickness, setThickness] = useState<number | "">(3); // 默认3英寸
  const [price, setPrice] = useState<number | "">(""); // 每吨价格
  const [density, setDensity] = useState<number>(145); // 默认沥青密度 (lbs/cu ft)

  // 结果状态
  const [tons, setTons] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // 实时计算逻辑
  useEffect(() => {
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const t = Number(thickness) || 0;
    const p = Number(price) || 0;

    // 1. 计算体积 (立方英尺) = 长(ft) * 宽(ft) * 厚度(ft)
    // 注意：厚度输入是英寸，所以要除以 12
    const cubicFeet = l * w * (t / 12);

    // 2. 计算重量 (磅) = 体积 * 密度
    const weightLbs = cubicFeet * density;

    // 3. 转换为吨 (1吨 = 2000磅)
    const weightTons = weightLbs / 2000;

    // 4. 计算总价
    const cost = weightTons * p;

    setTons(parseFloat(weightTons.toFixed(2))); // 保留2位小数
    setTotalCost(parseFloat(cost.toFixed(2)));
  }, [length, width, thickness, price, density]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      
      {/* 标题区域 */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Asphalt Calculator 🚜
        </h1>
        <p className="text-gray-600 text-lg">
          Instantly estimate the hot mix asphalt tonnage and cost for your paving project.
        </p>
      </div>

      {/* 计算器核心卡片 */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* 输入区域 */}
        <div className="space-y-6">
          
          {/* 长和宽 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Length (Feet)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Width (Feet)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g. 20"
              />
            </div>
          </div>

          {/* 厚度 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thickness (Inches)</label>
            <div className="flex items-center gap-4">
               <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Standard driveway is 3 inches.</p>
          </div>

          {/* 单价 (杀手锏功能) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Ton ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 pl-8 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                placeholder="e.g. 80"
              />
            </div>
          </div>
        </div>

        {/* 结果显示区域 - 醒目设计 */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white text-center">
          <div className="mb-4">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Required Asphalt</p>
            <p className="text-5xl font-bold text-yellow-400">{tons} <span className="text-2xl text-white">Tons</span></p>
          </div>
          
          {totalCost > 0 && (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Estimated Cost</p>
              <p className="text-3xl font-bold text-green-400">${totalCost.toLocaleString()}</p>
            </div>
          )}
        </div>

      </div>

      {/* SEO 优化内容 - 增加关键词密度 */}
      <div className="mt-16 max-w-2xl prose prose-slate text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Asphalt Calculator</h2>
        <p className="mb-4">
          Planning a paving project? Our <strong>free asphalt calculator</strong> helps contractors and homeowners accurately estimate hot mix asphalt (HMA) tonnage. Whether you are paving a driveway, parking lot, or highway, getting the math right saves you money and prevents material shortages.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Asphalt Calculation Formula</h3>
        <p className="mb-4">
          The standard formula for calculating asphalt tonnage is:
          <br />
          <code className="bg-gray-100 p-1 rounded">Length (ft) × Width (ft) × Thickness (in) × Density ÷ 2000</code>
        </p>
        <p className="mb-4">
          Most hot mix asphalt has a density of approximately <strong>145 to 150 lbs per cubic foot</strong>. This calculator uses the standard 145 lbs/cf to ensure you have enough material.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Tips for Accurate Estimates</h3>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Measure Twice:</strong> Always measure your project area carefully. For irregular shapes, break them down into smaller rectangles.</li>
          <li><strong>Check Thickness:</strong> A standard residential driveway is typically <strong>3 inches</strong> thick (compacted). Heavy-duty areas may need 4-6 inches.</li>
          <li><strong>Add a Safety Margin:</strong> We recommend adding 5-10% to your total tonnage to account for waste and subgrade variations.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Calculate Cost</h3>
        <p>
          Knowing the tonnage is half the battle. Enter your local <strong>price per ton</strong> in the calculator to get an instant project cost estimate. Asphalt prices vary by region and oil prices, so check with your local asphalt plant for current rates.
        </p>
      </div>

    </div>
  );
}