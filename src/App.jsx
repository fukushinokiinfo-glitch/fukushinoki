import { useState, useEffect } from "react";

const SHIGA_CITIES = ["大津市", "彦根市", "長浜市", "近江八幡市", "草津市", "守山市", "栗東市", "甲賀市", "野洲市", "湖南市", "高島市", "東近江市", "米原市", "日野町", "竜王町", "愛荘町", "豊郷町", "甲良町", "多賀町"];

const STATIONS = {
  "大津市": ["大津駅(JR)", "膳所駅(JR)", "石山駅(JR)", "瀬田駅(JR)", "大津京駅(JR)", "おごと温泉駅(JR)", "石山寺駅(京阪)", "びわ湖浜大津駅(京阪)", "坂本比叡山口駅(京阪)"],
  "草津市": ["草津駅(JR)", "南草津駅(JR)"],
  "守山市": ["守山駅(JR)"],
  "栗東市": ["栗東駅(JR)", "手原駅(JR)"],
  "野洲市": ["野洲駅(JR)"],
  "近江八幡市": ["近江八幡駅(JR)", "安土駅(JR)", "近江八幡駅(近江鉄道)"],
  "東近江市": ["能登川駅(JR)", "八日市駅(近江鉄道)", "新八日市駅(近江鉄道)"],
  "彦根市": ["彦根駅(JR)", "南彦根駅(JR)", "彦根駅(近江鉄道)", "高宮駅(近江鉄道)"],
  "長浜市": ["長浜駅(JR)", "田村駅(JR)", "虎姫駅(JR)", "高月駅(JR)", "木ノ本駅(JR)"],
  "米原市": ["米原駅(JR)", "坂田駅(JR)", "近江長岡駅(JR)", "柏原駅(JR)"],
  "甲賀市": ["貴生川駅(JR)", "甲南駅(JR)", "甲賀駅(JR)", "信楽駅(信楽高原鐵道)"],
  "湖南市": ["三雲駅(JR)", "甲西駅(JR)"],
  "高島市": ["近江今津駅(JR)", "近江高島駅(JR)", "安曇川駅(JR)", "マキノ駅(JR)", "近江舞子駅(JR)"],
  "愛荘町": ["愛知川駅(近江鉄道)", "五箇荘駅(近江鉄道)"],
  "豊郷町": ["豊郷駅(近江鉄道)"],
  "甲良町": ["尼子駅(近江鉄道)"],
  "多賀町": ["多賀大社前駅(近江鉄道)"],
  "日野町": ["日野駅(近江鉄道)"],
  "竜王町": [],
};

const SERVICE_TYPES = [
  "── デイサービス系 ──", "通所介護（デイサービス）", "リハビリ特化型デイ", "認知症対応型デイ", "機能訓練特化型デイ", "小規模多機能型居宅介護",
  "── 訪問系 ──", "訪問介護（高齢者）", "訪問介護（障害）", "訪問介護（高齢者・障害）", "行動援護", "同行援護", "重度訪問介護", "訪問看護",
  "── 入居系 ──", "グループホーム（認知症）", "グループホーム（障害）", "特別養護老人ホーム", "介護老人保健施設", "サービス付き高齢者向け住宅",
  "── 障害系 ──", "生活介護（重度）", "生活介護（知的）", "就労継続支援A型", "就労継続支援B型", "放課後等デイサービス",
  "── その他 ──", "居宅介護支援", "障害者支援施設",
];

const QUALIFICATIONS = [
  "── 介護系 ──", "介護職員初任者研修（旧ヘルパー2級）", "実務者研修（旧ヘルパー1級）", "介護福祉士", "介護支援専門員（ケアマネ）", "認知症ケア専門士",
  "── 看護・医療系 ──", "看護師", "准看護師", "理学療法士（PT）", "作業療法士（OT）", "言語聴覚士（ST）",
  "── 福祉系 ──", "社会福祉士", "精神保健福祉士", "社会福祉主事",
  "── 障害系 ──", "強度行動障害支援者養成研修", "行動援護従業者養成研修", "同行援護従業者養成研修", "重度訪問介護従業者養成研修",
  "── その他 ──", "保育士", "幼稚園教諭", "普通自動車運転免許", "福祉車両運転技術", "無資格・未経験OK",
];

const QUALIFICATIONS_REAL = QUALIFICATIONS.filter(q => !q.startsWith("──"));
const WORK_TIMES = ["早朝（6〜9時）", "日中（9〜17時）", "夕方（17〜22時）", "夜間（22〜7時）", "シフト制（要相談）"];

const DUMMY_JOBS = [
  { id: 1, officeName: "あおぞらグループホーム大津", serviceType: "グループホーム（認知症）", city: "大津市", station: "大津駅(JR)", walkMin: 5, distanceKm: 0.4, role: "介護職員", employmentType: "正社員", salaryNum: 220000, salary: "月給 200,000〜240,000円", hourly: null, hourlyNum: null, bonus: true, paidLeave: true, nightAllowance: true, certAllowance: true, carOK: true, inexperiencedOK: false, immediateOK: false, minDays: 5, workTimes: ["日中（9〜17時）", "夜間（22〜7時）"], requiredQuals: ["介護職員初任者研修（旧ヘルパー2級）"], preferredQuals: ["介護福祉士"], scale: "小規模（定員18名以下）", capacity: 18, currentUsers: 16, staffCount: 12, genderRatio: "女性が多い（3:7以上）", ageGroup: "40代が中心", pr: "認知症の方が安心して暮らせるホーム。チームワーク抜群！", photo: "🏡", address: "大津市浜町1-2-3", tel: "077-111-2222", hp: "https://example.com", instagram: "https://instagram.com", facebook: null, line: null, postedDays: 3, views: 42, applies: 3 },
  { id: 2, officeName: "ひまわり訪問介護草津", serviceType: "訪問介護（高齢者・障害）", city: "草津市", station: "草津駅(JR)", walkMin: 8, distanceKm: 0.6, role: "訪問介護員", employmentType: "パート", salaryNum: null, salary: null, hourly: "1,400〜1,600円", hourlyNum: 1500, bonus: false, paidLeave: true, nightAllowance: false, certAllowance: true, carOK: true, inexperiencedOK: true, immediateOK: true, minDays: 2, workTimes: ["日中（9〜17時）", "夕方（17〜22時）"], requiredQuals: ["介護職員初任者研修（旧ヘルパー2級）"], preferredQuals: ["実務者研修（旧ヘルパー1級）"], scale: null, capacity: null, currentUsers: null, staffCount: 20, genderRatio: "女性が多い（3:7以上）", ageGroup: "幅広い（20〜50代）", pr: "週2日〜OK！ブランクある方も歓迎。", photo: "🚗", address: "草津市草津2-4-5", tel: "077-222-3333", hp: null, instagram: null, facebook: "https://facebook.com", line: "https://line.me", postedDays: 1, views: 28, applies: 2 },
  { id: 3, officeName: "虹の放課後デイ彦根", serviceType: "放課後等デイサービス", city: "彦根市", station: "彦根駅(JR)", walkMin: 10, distanceKm: 0.8, role: "支援員", employmentType: "正社員", salaryNum: 200000, salary: "月給 185,000〜220,000円", hourly: null, hourlyNum: null, bonus: true, paidLeave: true, nightAllowance: false, certAllowance: false, carOK: false, inexperiencedOK: true, immediateOK: false, minDays: 5, workTimes: ["日中（9〜17時）", "夕方（17〜22時）"], requiredQuals: [], preferredQuals: ["保育士", "社会福祉士"], scale: "小規模（定員18名以下）", capacity: 10, currentUsers: 8, staffCount: 8, genderRatio: "ほぼ同じ（5:5）", ageGroup: "30代が中心", pr: "子どもたちの笑顔が原動力！未経験OK。", photo: "🌈", address: "彦根市本町3-1-4", tel: "0749-111-2222", hp: null, instagram: "https://instagram.com", facebook: null, line: null, postedDays: 7, views: 15, applies: 1 },
  { id: 4, officeName: "さくら特養守山", serviceType: "特別養護老人ホーム", city: "守山市", station: "守山駅(JR)", walkMin: 15, distanceKm: 1.2, role: "介護福祉士", employmentType: "正社員", salaryNum: 255000, salary: "月給 230,000〜280,000円", hourly: null, hourlyNum: null, bonus: true, paidLeave: true, nightAllowance: true, certAllowance: true, carOK: true, inexperiencedOK: false, immediateOK: false, minDays: 5, workTimes: ["早朝（6〜9時）", "日中（9〜17時）", "夜間（22〜7時）"], requiredQuals: ["介護福祉士"], preferredQuals: ["介護支援専門員（ケアマネ）"], scale: "大規模（26名以上）", capacity: 80, currentUsers: 75, staffCount: 45, genderRatio: "女性が多い（3:7以上）", ageGroup: "幅広い（20〜50代）", pr: "充実した研修制度。資格取得支援あり。", photo: "🌸", address: "守山市守山1-5-6", tel: "077-333-4444", hp: "https://example.com", instagram: null, facebook: "https://facebook.com", line: null, postedDays: 14, views: 67, applies: 5 },
  { id: 5, officeName: "コスモス訪問看護長浜", serviceType: "訪問看護", city: "長浜市", station: "長浜駅(JR)", walkMin: 7, distanceKm: 0.5, role: "看護師", employmentType: "正社員", salaryNum: 350000, salary: "月給 320,000〜380,000円", hourly: null, hourlyNum: null, bonus: true, paidLeave: true, nightAllowance: false, certAllowance: true, carOK: true, inexperiencedOK: false, immediateOK: false, minDays: 5, workTimes: ["日中（9〜17時）"], requiredQuals: ["看護師"], preferredQuals: ["理学療法士（PT）"], scale: null, capacity: null, currentUsers: null, staffCount: 15, genderRatio: "女性が多い（3:7以上）", ageGroup: "40代が中心", pr: "オンコール少なめ・残業ほぼなし。", photo: "💊", address: "長浜市公園町2-3", tel: "0749-222-3333", hp: "https://example.com", instagram: "https://instagram.com", facebook: "https://facebook.com", line: "https://line.me", postedDays: 2, views: 89, applies: 7 },
  { id: 6, officeName: "なごみリハビリデイ近江八幡", serviceType: "リハビリ特化型デイ", city: "近江八幡市", station: "近江八幡駅(JR)", walkMin: 12, distanceKm: 1.0, role: "機能訓練指導員", employmentType: "パート", salaryNum: null, salary: null, hourly: "1,300〜1,600円", hourlyNum: 1450, bonus: false, paidLeave: true, nightAllowance: false, certAllowance: true, carOK: false, inexperiencedOK: false, immediateOK: true, minDays: 3, workTimes: ["日中（9〜17時）"], requiredQuals: ["理学療法士（PT）"], preferredQuals: ["作業療法士（OT）", "言語聴覚士（ST）"], scale: "通常規模（19〜25名）", capacity: 20, currentUsers: 18, staffCount: 10, genderRatio: "ほぼ同じ（5:5）", ageGroup: "30代が中心", pr: "リハビリ特化型で専門スキルを活かせます！", photo: "☀️", address: "近江八幡市桜宮町1-2", tel: "0748-111-2222", hp: null, instagram: null, facebook: null, line: "https://line.me", postedDays: 5, views: 33, applies: 2 },
];

const Tag = ({ children, color }) => {
  const colors = { green: { background: "#e8f5e9", color: "#2e7d32" }, orange: { background: "#fff3e0", color: "#e65100" }, teal: { background: "#e0f2f1", color: "#00695c" }, gray: { background: "#f5f5f5", color: "#616161" }, red: { background: "#fce4ec", color: "#c62828" }, blue: { background: "#e3f2fd", color: "#1565c0" } };
  return <span style={{ ...colors[color || "gray"], fontSize: "11px", padding: "3px 8px", borderRadius: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>{children}</span>;
};

const SNSLinks = ({ job }) => {
  const links = [job.hp && { url: job.hp, label: "HP", icon: "🌐", bg: "#e3f2fd", color: "#1565c0" }, job.instagram && { url: job.instagram, label: "Instagram", icon: "📷", bg: "#fce4ec", color: "#ad1457" }, job.facebook && { url: job.facebook, label: "Facebook", icon: "👥", bg: "#e8eaf6", color: "#283593" }, job.line && { url: job.line, label: "LINE", icon: "💬", bg: "#e8f5e9", color: "#1b5e20" }].filter(Boolean);
  if (!links.length) return null;
  return <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>{links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px", borderRadius: "20px", background: l.bg, color: l.color, fontSize: "12px", fontWeight: 600, textDecoration: "none" }} onClick={e => e.stopPropagation()}>{l.icon} {l.label}</a>)}</div>;
};

const QualMatch = ({ job, myQuals }) => {
  if (!myQuals.length) return null;
  const matched = myQuals.filter(q => job.requiredQuals.includes(q) || job.preferredQuals.includes(q));
  if (!matched.length) return null;
  return <div style={{ background: "#e8f5e9", borderRadius: "10px", padding: "8px 12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}><span>✅</span><span style={{ fontSize: "12px", color: "#2e7d32", fontWeight: 600 }}>あなたの資格がマッチ！ {matched.slice(0, 2).join("・")}{matched.length > 2 ? `など${matched.length}件` : ""}</span></div>;
};

const JobCard = ({ job, onClick, isFaved, onToggleFav, myQuals }) => (
  <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e8e0d4", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"}>
    <QualMatch job={job} myQuals={myQuals} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }} onClick={() => onClick(job)}>
        <div style={{ fontSize: "32px", background: "#fdf6ec", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{job.photo}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
            <p style={{ fontWeight: 700, color: "#2d1f0e", fontSize: "15px" }}>{job.officeName}</p>
            {job.postedDays <= 3 && <span style={{ background: "#ff5722", color: "white", fontSize: "10px", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>NEW</span>}
          </div>
          <p style={{ fontSize: "12px", color: "#9e8c7a" }}>{job.city} · {job.station}から徒歩{job.walkMin}分（約{job.distanceKm}km）</p>
          {job.scale && <p style={{ fontSize: "11px", color: "#9e8c7a", marginTop: "2px" }}>{job.scale} · 利用者{job.currentUsers}/{job.capacity}名 · スタッフ{job.staffCount}名</p>}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <Tag color="orange">{job.serviceType}</Tag>
        <button onClick={() => onToggleFav(job.id)} style={{ background: isFaved ? "#fce4ec" : "#f5f5f5", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{isFaved ? "❤️" : "🤍"}</button>
      </div>
    </div>
    <div onClick={() => onClick(job)} style={{ cursor: "pointer" }}>
      <p style={{ fontWeight: 700, color: "#c85c2a", fontSize: "16px", marginBottom: "6px" }}>{job.role}</p>
      <p style={{ fontSize: "14px", color: "#5a4a3a", marginBottom: "10px" }}>{job.salary ? `💴 ${job.salary}` : `⏰ 時給 ${job.hourly}`}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
        {job.bonus && <Tag color="green">賞与あり</Tag>}
        {job.paidLeave && <Tag color="teal">有給休暇あり</Tag>}
        {job.nightAllowance && <Tag color="orange">深夜手当あり</Tag>}
        {job.certAllowance && <Tag color="teal">資格手当あり</Tag>}
        {job.inexperiencedOK && <Tag color="blue">未経験OK</Tag>}
        {job.carOK && <Tag color="gray">車通勤OK</Tag>}
        {job.immediateOK && <Tag color="red">即日勤務OK</Tag>}
      </div>
      {job.requiredQuals.length > 0 && <p style={{ fontSize: "12px", color: "#5a4a3a", marginBottom: "4px" }}>📋 必須: {job.requiredQuals.join("・")}</p>}
      {job.preferredQuals.length > 0 && <p style={{ fontSize: "12px", color: "#9e8c7a", marginBottom: "10px" }}>⭐ 優遇: {job.preferredQuals.join("・")}</p>}
      <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#9e8c7a", marginBottom: "10px" }}>
        {job.genderRatio && <span>👥 {job.genderRatio}</span>}
        {job.ageGroup && <span>🎂 {job.ageGroup}</span>}
      </div>
      <p style={{ fontSize: "13px", color: "#7a6a5a", lineHeight: "1.6", borderTop: "1px solid #f0e8dc", paddingTop: "10px", marginBottom: "10px" }}>{job.pr}</p>
    </div>
    <SNSLinks job={job} />
  </div>
);

// 応募完了後に事業所の連絡先を表示するモーダル
const ContactModal = ({ job, onClose }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(45,31,14,0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={onClose}>
    <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "32px" }} onClick={e => e.stopPropagation()}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <p style={{ fontSize: "48px", marginBottom: "12px" }}>✅</p>
        <h2 style={{ fontWeight: 700, color: "#2d1f0e", fontSize: "20px", marginBottom: "8px" }}>お問い合わせありがとうございます！</h2>
        <p style={{ color: "#9e8c7a", fontSize: "14px", lineHeight: "1.7" }}>
          面接・詳細のご確認は<br />
          <span style={{ fontWeight: 700, color: "#c85c2a" }}>{job.officeName}</span>へ<br />
          直接ご連絡ください
        </p>
      </div>

      <div style={{ background: "#fdf6ec", borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e", marginBottom: "14px" }}>📞 事業所への直接連絡</p>
        {job.tel && (
          <a href={`tel:${job.tel}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "white", borderRadius: "12px", marginBottom: "10px", textDecoration: "none", border: "1px solid #e8e0d4" }}>
            <span style={{ fontSize: "24px" }}>📞</span>
            <div>
              <p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>電話番号</p>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#c85c2a" }}>{job.tel}</p>
            </div>
          </a>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {job.hp && <a href={job.hp} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "white", borderRadius: "10px", textDecoration: "none", border: "1px solid #e8e0d4" }}><span>🌐</span><span style={{ fontSize: "13px", color: "#1565c0", fontWeight: 600 }}>公式ホームページを見る</span></a>}
          {job.instagram && <a href={job.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "white", borderRadius: "10px", textDecoration: "none", border: "1px solid #e8e0d4" }}><span>📷</span><span style={{ fontSize: "13px", color: "#ad1457", fontWeight: 600 }}>Instagramで雰囲気をチェック</span></a>}
          {job.line && <a href={job.line} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "#e8f5e9", borderRadius: "10px", textDecoration: "none", border: "1px solid #c8e6c9" }}><span>💬</span><span style={{ fontSize: "13px", color: "#1b5e20", fontWeight: 700 }}>LINEで問い合わせる</span></a>}
          {job.facebook && <a href={job.facebook} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "white", borderRadius: "10px", textDecoration: "none", border: "1px solid #e8e0d4" }}><span>👥</span><span style={{ fontSize: "13px", color: "#283593", fontWeight: 600 }}>Facebookページを見る</span></a>}
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#9e8c7a", textAlign: "center", marginBottom: "16px", lineHeight: "1.6" }}>
        ※ 面接・採用のやり取りは事業所と直接行ってください
      </p>
      <button onClick={onClose} style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#f5f0e8", color: "#5a4a3a", fontWeight: 700, border: "none", cursor: "pointer" }}>閉じる</button>
    </div>
  </div>
);

const JobModal = ({ job, onClose, isFaved, onToggleFav, onApply, myQuals }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(45,31,14,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={onClose}>
    <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
      <div style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)", borderRadius: "20px 20px 0 0", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>{job.serviceType}</p>
            <h2 style={{ color: "white", fontWeight: 700, fontSize: "20px" }}>{job.officeName}</h2>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", marginTop: "4px" }}>📍 {job.address}</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => onToggleFav(job.id)} style={{ background: isFaved ? "#fce4ec" : "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{isFaved ? "❤️" : "🤍"}</button>
            <button onClick={onClose} style={{ color: "white", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px" }}>✕</button>
          </div>
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <QualMatch job={job} myQuals={myQuals} />
        <div style={{ background: "#fdf6ec", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
          <p style={{ fontWeight: 700, color: "#c85c2a", fontSize: "18px", marginBottom: "4px" }}>{job.role}</p>
          <p style={{ fontSize: "15px", color: "#2d1f0e", fontWeight: 600 }}>{job.salary ? `💴 ${job.salary}` : `⏰ 時給 ${job.hourly}`}</p>
        </div>
        {(job.scale || job.capacity) && (
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>事業所規模</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {job.scale && <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>規模</p><p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e" }}>{job.scale}</p></div>}
              {job.capacity && <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>定員</p><p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e" }}>{job.capacity}名</p></div>}
              {job.currentUsers && <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>利用者</p><p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e" }}>{job.currentUsers}名</p></div>}
              {job.staffCount && <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>スタッフ</p><p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e" }}>{job.staffCount}名</p></div>}
            </div>
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>スタッフの雰囲気</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {job.genderRatio && <div style={{ background: "#fdf6ec", borderRadius: "10px", padding: "10px 14px" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>男女比</p><p style={{ fontSize: "13px", fontWeight: 600, color: "#2d1f0e" }}>👥 {job.genderRatio}</p></div>}
            {job.ageGroup && <div style={{ background: "#fdf6ec", borderRadius: "10px", padding: "10px 14px" }}><p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "2px" }}>年齢層</p><p style={{ fontSize: "13px", fontWeight: 600, color: "#2d1f0e" }}>🎂 {job.ageGroup}</p></div>}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>求める資格</h3>
          {job.requiredQuals.length > 0 && <div style={{ marginBottom: "8px" }}><p style={{ fontSize: "12px", color: "#e65100", fontWeight: 600, marginBottom: "4px" }}>必須</p><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{job.requiredQuals.map(q => <Tag key={q} color="orange">{q}</Tag>)}</div></div>}
          {job.preferredQuals.length > 0 && <div><p style={{ fontSize: "12px", color: "#2e7d32", fontWeight: 600, marginBottom: "4px" }}>優遇</p><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{job.preferredQuals.map(q => <Tag key={q} color="green">{q}</Tag>)}</div></div>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>待遇</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {job.bonus && <Tag color="green">賞与あり</Tag>}
            {job.paidLeave && <Tag color="teal">有給休暇あり</Tag>}
            {job.nightAllowance && <Tag color="orange">深夜手当あり</Tag>}
            {job.certAllowance && <Tag color="teal">資格手当あり</Tag>}
            {job.inexperiencedOK && <Tag color="blue">未経験OK</Tag>}
            {job.carOK && <Tag color="gray">車通勤OK</Tag>}
            {job.immediateOK && <Tag color="red">即日勤務OK</Tag>}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>アクセス</h3>
          <p style={{ fontSize: "14px", color: "#5a4a3a" }}>📍 {job.address}</p>
          <p style={{ fontSize: "14px", color: "#5a4a3a", marginTop: "4px" }}>🚉 {job.station}から徒歩{job.walkMin}分（約{job.distanceKm}km）</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>事業所PR</h3>
          <p style={{ fontSize: "14px", color: "#5a4a3a", lineHeight: "1.7", background: "#fdf6ec", padding: "16px", borderRadius: "12px" }}>{job.pr}</p>
        </div>
        {(job.hp || job.instagram || job.facebook || job.line) && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#9e8c7a", marginBottom: "10px", textTransform: "uppercase" }}>公式SNS・HP</h3>
            <SNSLinks job={job} />
          </div>
        )}
        <button onClick={() => onApply(job)} style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "linear-gradient(135deg, #f97316, #f59e0b)", color: "white", fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer" }}>
          📞 この事業所に問い合わせる
        </button>
        <p style={{ fontSize: "12px", color: "#9e8c7a", textAlign: "center", marginTop: "8px" }}>
          ボタンを押すと事業所の連絡先が表示されます
        </p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [tab, setTab] = useState("search");
  const [myQuals, setMyQuals] = useState([]);
  const [showMyQuals, setShowMyQuals] = useState(false);
  const [city, setCity] = useState("");
  const [station, setStation] = useState("");
  const [distanceRange, setDistanceRange] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [qualFilter, setQualFilter] = useState("");
  const [bonusOnly, setBonusOnly] = useState(false);
  const [nightOnly, setNightOnly] = useState(false);
  const [certOnly, setCertOnly] = useState(false);
  const [inexperiencedOK, setInexperiencedOK] = useState(false);
  const [carOK, setCarOK] = useState(false);
  const [immediateOK, setImmediateOK] = useState(false);
  const [sortBy, setSortBy] = useState("new");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [contactJob, setContactJob] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [jobs, setJobs] = useState(DUMMY_JOBS);

  useEffect(() => {
    try {
      const s = localStorage.getItem("fukushi_fav"); if (s) setFavorites(JSON.parse(s));
      const q = localStorage.getItem("fukushi_quals"); if (q) setMyQuals(JSON.parse(q));
    } catch {}
  }, []);

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try { localStorage.setItem("fukushi_fav", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleMyQual = (q) => {
    setMyQuals(prev => {
      const next = prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q];
      try { localStorage.setItem("fukushi_quals", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // 閲覧数カウントアップ
  const handleJobClick = (job) => {
    setJobs(prev => prev.map(j => j.id === job.id ? { ...j, views: (j.views || 0) + 1 } : j));
    setSelected(job);
  };

  // 問い合わせ数カウントアップ
  const handleApply = (job) => {
    setJobs(prev => prev.map(j => j.id === job.id ? { ...j, applies: (j.applies || 0) + 1 } : j));
    setSelected(null);
    setContactJob(job);
  };

  const availableStations = city && STATIONS[city] ? STATIONS[city] : [];
  const favJobs = jobs.filter(j => favorites.includes(j.id));

  const sortJobs = (jobList) => {
    if (sortBy === "salary_high") return [...jobList].sort((a, b) => (b.salaryNum || b.hourlyNum * 160 || 0) - (a.salaryNum || a.hourlyNum * 160 || 0));
    if (sortBy === "salary_low") return [...jobList].sort((a, b) => (a.salaryNum || a.hourlyNum * 160 || 0) - (b.salaryNum || b.hourlyNum * 160 || 0));
    if (sortBy === "near") return [...jobList].sort((a, b) => a.distanceKm - b.distanceKm);
    if (sortBy === "match") return [...jobList].sort((a, b) => {
      const mA = myQuals.filter(q => a.requiredQuals.includes(q) || a.preferredQuals.includes(q)).length;
      const mB = myQuals.filter(q => b.requiredQuals.includes(q) || b.preferredQuals.includes(q)).length;
      return mB - mA;
    });
    return [...jobList].sort((a, b) => a.postedDays - b.postedDays);
  };

  const handleSearch = () => {
    let r = jobs;
    if (city) r = r.filter(j => j.city === city);
    if (station) r = r.filter(j => j.station === station);
    if (distanceRange) { const [min, max] = distanceRange.split("-").map(Number); r = r.filter(j => j.distanceKm >= min && j.distanceKm <= max); }
    if (serviceType) r = r.filter(j => j.serviceType === serviceType);
    if (employmentType) r = r.filter(j => j.employmentType === employmentType);
    if (workTime) r = r.filter(j => j.workTimes.includes(workTime));
    if (qualFilter) r = r.filter(j => j.requiredQuals.includes(qualFilter) || j.preferredQuals.includes(qualFilter));
    if (bonusOnly) r = r.filter(j => j.bonus);
    if (nightOnly) r = r.filter(j => j.nightAllowance);
    if (certOnly) r = r.filter(j => j.certAllowance);
    if (inexperiencedOK) r = r.filter(j => j.inexperiencedOK);
    if (carOK) r = r.filter(j => j.carOK);
    if (immediateOK) r = r.filter(j => j.immediateOK);
    setResults(sortJobs(r));
    setSearched(true);
  };

  const selStyle = { width: "100%", border: "1px solid #e8e0d4", borderRadius: "10px", padding: "10px 12px", fontSize: "14px", background: "white", outline: "none", color: "#2d1f0e" };

  return (
    <div style={{ fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif", background: "#faf5ee", minHeight: "100vh" }}>
      <header style={{ background: "white", borderBottom: "2px solid #f0e8dc", padding: "0 16px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", gap: "3px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#e65100" }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", marginTop: "-3px" }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#388e3c" }}></div>
            </div>
            <div>
              <span style={{ fontWeight: 900, fontSize: "20px", color: "#2d1f0e" }}>福祉の樹</span>
              <span style={{ fontSize: "11px", color: "#9e8c7a", marginLeft: "8px" }}>滋賀県の福祉・介護求人</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button onClick={() => setShowMyQuals(!showMyQuals)} style={{ padding: "7px 12px", borderRadius: "20px", border: myQuals.length ? "1px solid #388e3c" : "1px solid #e8e0d4", cursor: "pointer", fontWeight: 600, fontSize: "11px", background: myQuals.length ? "#e8f5e9" : "white", color: myQuals.length ? "#2e7d32" : "#9e8c7a" }}>🎓 マイ資格{myQuals.length > 0 ? `(${myQuals.length})` : ""}</button>
            {[["search","求人検索"],["favorites","❤️"],["inquiry","掲載申込"]].map(([t, label], i) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 12px", borderRadius: "20px", border: t === "inquiry" ? "1px solid #f97316" : "none", cursor: "pointer", fontWeight: 600, fontSize: "11px", background: tab === t ? (t === "favorites" ? "#e91e63" : "#f97316") : (t === "inquiry" ? "white" : "#f5f0e8"), color: tab === t ? "white" : (t === "inquiry" ? "#f97316" : "#5a4a3a"), display: "flex", alignItems: "center", gap: "3px" }}>
                {label}
                {t === "favorites" && favorites.length > 0 && <span style={{ background: tab === "favorites" ? "white" : "#e91e63", color: tab === "favorites" ? "#e91e63" : "white", borderRadius: "50%", width: "15px", height: "15px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{favorites.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </header>

      {showMyQuals && (
        <div style={{ background: "#f0fdf4", borderBottom: "2px solid #c8e6c9", padding: "16px 20px" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={{ fontWeight: 700, color: "#2e7d32", fontSize: "14px" }}>🎓 あなたの保有資格を登録（資格マッチング検索に使います）</p>
              <button onClick={() => setShowMyQuals(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9e8c7a", fontSize: "18px" }}>✕</button>
            </div>
            <div style={{ maxHeight: "180px", overflowY: "auto", background: "white", borderRadius: "12px", padding: "10px" }}>
              {QUALIFICATIONS.map(q => q.startsWith("──") ? (
                <p key={q} style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 700, padding: "3px 8px", background: "#f5f5f5", borderRadius: "4px", margin: "4px 0 2px" }}>{q}</p>
              ) : (
                <label key={q} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#5a4a3a", cursor: "pointer", padding: "3px 8px", borderRadius: "6px", background: myQuals.includes(q) ? "#e8f5e9" : "transparent" }}>
                  <input type="checkbox" checked={myQuals.includes(q)} onChange={() => toggleMyQual(q)} />{q}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "search" && (
        <>
          <div style={{ background: "linear-gradient(135deg, #fff8f0, #fef3e2)", borderBottom: "1px solid #f0e8dc", padding: "28px 20px" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#2d1f0e", marginBottom: "8px", lineHeight: 1.3 }}>滋賀県の福祉・介護の仕事を<br />見つけよう</h1>
              <p style={{ color: "#9e8c7a", fontSize: "13px" }}>全路線対応 · 資格マッチング · 事業所へ直接問い合わせ</p>
            </div>
          </div>
          <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}>
            <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e8e0d4", padding: "20px", marginBottom: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#2d1f0e", marginBottom: "14px" }}>🔍 求人を検索する</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>市区町村</label><select style={selStyle} value={city} onChange={e => { setCity(e.target.value); setStation(""); }}><option value="">すべて</option>{SHIGA_CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>最寄り駅</label><select style={selStyle} value={station} onChange={e => setStation(e.target.value)} disabled={!availableStations.length}><option value="">{city ? "すべて" : "市区町村を先に選択"}</option>{availableStations.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>駅からの距離</label><select style={selStyle} value={distanceRange} onChange={e => setDistanceRange(e.target.value)}><option value="">すべて</option><option value="0-0.5">〜500m</option><option value="0-1">〜1km</option><option value="0-2">〜2km</option><option value="0-5">〜5km</option><option value="0-10">〜10km</option><option value="10-20">10〜20km</option></select></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>サービス種別</label>
                  <select style={selStyle} value={serviceType} onChange={e => setServiceType(e.target.value)}><option value="">すべて</option>{SERVICE_TYPES.map(s => s.startsWith("──") ? <option key={s} disabled style={{ color: "#9e8c7a" }}>{s}</option> : <option key={s}>{s}</option>)}</select></div>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>雇用形態</label><select style={selStyle} value={employmentType} onChange={e => setEmploymentType(e.target.value)}><option value="">すべて</option><option>正社員</option><option>パート</option><option>アルバイト</option><option>契約社員</option></select></div>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>勤務時間帯</label><select style={selStyle} value={workTime} onChange={e => setWorkTime(e.target.value)}><option value="">すべて</option>{WORK_TIMES.map(w => <option key={w}>{w}</option>)}</select></div>
                <div><label style={{ fontSize: "11px", color: "#9e8c7a", fontWeight: 600, display: "block", marginBottom: "5px" }}>資格で絞り込み</label>
                  <select style={selStyle} value={qualFilter} onChange={e => setQualFilter(e.target.value)}><option value="">すべて</option>{QUALIFICATIONS.map(q => q.startsWith("──") ? <option key={q} disabled style={{ color: "#9e8c7a" }}>{q}</option> : <option key={q}>{q}</option>)}</select></div>
              </div>
              <div style={{ display: "flex", gap: "14px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[[bonusOnly, setBonusOnly, "賞与あり"], [nightOnly, setNightOnly, "深夜手当"], [certOnly, setCertOnly, "資格手当"], [inexperiencedOK, setInexperiencedOK, "未経験OK"], [carOK, setCarOK, "車通勤OK"], [immediateOK, setImmediateOK, "即日OK"]].map(([val, setter, label]) => (
                  <label key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5a4a3a", cursor: "pointer" }}><input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} />{label}</label>
                ))}
              </div>
              <button onClick={handleSearch} style={{ width: "100%", padding: "13px", borderRadius: "12px", background: "linear-gradient(135deg, #f97316, #f59e0b)", color: "white", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer" }}>求人を検索する</button>
            </div>

            {searched ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <p style={{ fontSize: "14px", color: "#9e8c7a" }}><span style={{ fontWeight: 700, color: "#c85c2a", fontSize: "18px" }}>{results.length}</span> 件</p>
                  <select value={sortBy} onChange={e => { setSortBy(e.target.value); setResults(prev => sortJobs([...prev])); }} style={{ border: "1px solid #e8e0d4", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", background: "white", outline: "none" }}>
                    <option value="new">新着順</option><option value="salary_high">給与高い順</option><option value="salary_low">給与低い順</option><option value="near">駅から近い順</option>
                    {myQuals.length > 0 && <option value="match">資格マッチ順</option>}
                  </select>
                </div>
                {results.length === 0 ? <div style={{ textAlign: "center", padding: "60px 0", color: "#9e8c7a" }}><p style={{ fontSize: "40px", marginBottom: "12px" }}>🌿</p><p>条件に合う求人が見つかりませんでした</p></div> : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {results.map(j => <JobCard key={j.id} job={j} onClick={handleJobClick} isFaved={favorites.includes(j.id)} onToggleFav={toggleFav} myQuals={myQuals} />)}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[["🏡","グループホーム（認知症）",8],["🚗","訪問介護（高齢者・障害）",12],["🌈","放課後等デイサービス",6],["🌸","特別養護老人ホーム",5],["💊","訪問看護",9],["☀️","リハビリ特化型デイ",7]].map(([icon, label, count]) => (
                  <div key={label} onClick={() => setServiceType(label)} style={{ background: "white", borderRadius: "14px", border: "1px solid #e8e0d4", padding: "14px", textAlign: "center", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fdf6ec"} onMouseLeave={e => e.currentTarget.style.background = "white"}>
                    <p style={{ fontSize: "26px", marginBottom: "4px" }}>{icon}</p>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#2d1f0e", marginBottom: "2px" }}>{label}</p>
                    <p style={{ fontSize: "11px", color: "#c85c2a" }}>{count}件</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {tab === "favorites" && (
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#2d1f0e", marginBottom: "6px" }}>❤️ 保存済みの求人</h2>
          {favJobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9e8c7a" }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🤍</p>
              <button onClick={() => setTab("search")} style={{ marginTop: "20px", padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #f97316, #f59e0b)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>求人を探す</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {favJobs.map(j => <JobCard key={j.id} job={j} onClick={handleJobClick} isFaved={true} onToggleFav={toggleFav} myQuals={myQuals} />)}
            </div>
          )}
        </div>
      )}

      {tab === "inquiry" && (
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 20px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📋</p>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#2d1f0e", marginBottom: "8px" }}>掲載のご相談・お申し込み</h2>
            <p style={{ color: "#9e8c7a", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px" }}>
              お電話またはメールにてお気軽にご相談ください。<br />
              情報をお送りいただければ、こちらで掲載作業を行います。
            </p>
            <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e8e0d4", padding: "28px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <a href="tel:090-0000-0000" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#fff8f0", borderRadius: "14px", textDecoration: "none", border: "1px solid #f0e8dc" }}>
                  <span style={{ fontSize: "28px" }}>📞</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "12px", color: "#9e8c7a", marginBottom: "2px" }}>お電話</p>
                    <p style={{ fontSize: "18px", fontWeight: 700, color: "#c85c2a" }}>090-0000-0000</p>
                    <p style={{ fontSize: "11px", color: "#9e8c7a" }}>平日 9:00〜18:00</p>
                  </div>
                </a>
                <a href="mailto:info@fukushinoki.jp" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#f0fdf4", borderRadius: "14px", textDecoration: "none", border: "1px solid #c8e6c9" }}>
                  <span style={{ fontSize: "28px" }}>✉️</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "12px", color: "#9e8c7a", marginBottom: "2px" }}>メール</p>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#15803d" }}>info@fukushinoki.jp</p>
                    <p style={{ fontSize: "11px", color: "#9e8c7a" }}>24時間受付・2営業日以内に返信</p>
                  </div>
                </a>
              </div>
              <div style={{ marginTop: "20px", padding: "16px", background: "#fdf6ec", borderRadius: "12px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#2d1f0e", marginBottom: "8px" }}>💰 掲載料金</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1, background: "white", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#9e8c7a", marginBottom: "4px" }}>1ヶ月</p>
                    <p style={{ fontSize: "18px", fontWeight: 700, color: "#c85c2a" }}>¥2,500</p>
                  </div>
                  <div style={{ flex: 1, background: "#2d1f0e", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>3ヶ月〜</p>
                    <p style={{ fontSize: "18px", fontWeight: 700, color: "#f59e0b" }}>¥2,000<span style={{ fontSize: "11px" }}>/月</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selected && <JobModal job={selected} onClose={() => setSelected(null)} isFaved={favorites.includes(selected.id)} onToggleFav={toggleFav} onApply={handleApply} myQuals={myQuals} />}
      {contactJob && <ContactModal job={contactJob} onClose={() => setContactJob(null)} />}
    </div>
  );
}
