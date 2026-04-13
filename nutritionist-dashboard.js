// ===== Nutritionist Dashboard =====

// Dynamic date helper
const _ndToday = new Date();
function _ndDate(daysAgo) {
  const d = new Date(_ndToday);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// Demo client data
const ndClients = [
  {
    id: 1, name: "Olivia Martinez", plan: "Monthly Subscription", status: "active",
    joined: "2026-01-10", lastCheckin: _ndDate(0), checkinsThisMonth: 8,
    mealsLogged: 84, adherence: 92, goal: "Weight Loss",
    progress: [
      { week: "Week 1", meals: 21, adherence: 95 },
      { week: "Week 2", meals: 20, adherence: 90 },
      { week: "Week 3", meals: 19, adherence: 88 },
      { week: "Week 4", meals: 24, adherence: 96 },
    ],
    recentMeals: [
      { name: "Greek Yogurt Bowl", date: _ndDate(0), calories: 380, type: "Breakfast", onPlan: true },
      { name: "Grilled Chicken Salad", date: _ndDate(0), calories: 520, type: "Lunch", onPlan: true },
      { name: "Salmon & Quinoa", date: _ndDate(1), calories: 610, type: "Dinner", onPlan: true },
    ]
  },
  {
    id: 2, name: "James Thompson", plan: "Monthly Subscription", status: "active",
    joined: "2026-02-05", lastCheckin: _ndDate(1), checkinsThisMonth: 6,
    mealsLogged: 72, adherence: 85, goal: "Muscle Gain",
    progress: [
      { week: "Week 1", meals: 21, adherence: 88 },
      { week: "Week 2", meals: 18, adherence: 82 },
      { week: "Week 3", meals: 17, adherence: 80 },
      { week: "Week 4", meals: 16, adherence: 90 },
    ],
    recentMeals: [
      { name: "Protein Pancakes", date: _ndDate(1), calories: 520, type: "Breakfast", onPlan: true },
      { name: "Turkey & Rice Bowl", date: _ndDate(1), calories: 680, type: "Lunch", onPlan: true },
      { name: "Steak & Sweet Potato", date: _ndDate(2), calories: 750, type: "Dinner", onPlan: false },
    ]
  },
  {
    id: 3, name: "Sophia Nguyen", plan: "Clean Eating Reset (One-time)", status: "active",
    joined: "2026-03-15", lastCheckin: _ndDate(2), checkinsThisMonth: 4,
    mealsLogged: 56, adherence: 78, goal: "General Health",
    progress: [
      { week: "Week 1", meals: 18, adherence: 85 },
      { week: "Week 2", meals: 15, adherence: 75 },
      { week: "Week 3", meals: 12, adherence: 70 },
      { week: "Week 4", meals: 11, adherence: 82 },
    ],
    recentMeals: [
      { name: "Avocado Toast & Eggs", date: _ndDate(2), calories: 420, type: "Breakfast", onPlan: true },
      { name: "Buddha Bowl", date: _ndDate(2), calories: 490, type: "Lunch", onPlan: true },
      { name: "Pizza (off-plan)", date: _ndDate(3), calories: 880, type: "Dinner", onPlan: false },
    ]
  },
  {
    id: 4, name: "Marcus Williams", plan: "Monthly Subscription", status: "active",
    joined: "2025-11-20", lastCheckin: _ndDate(0), checkinsThisMonth: 10,
    mealsLogged: 95, adherence: 96, goal: "Athletic Performance",
    progress: [
      { week: "Week 1", meals: 24, adherence: 98 },
      { week: "Week 2", meals: 23, adherence: 95 },
      { week: "Week 3", meals: 24, adherence: 96 },
      { week: "Week 4", meals: 24, adherence: 95 },
    ],
    recentMeals: [
      { name: "Overnight Oats & Berries", date: _ndDate(0), calories: 450, type: "Breakfast", onPlan: true },
      { name: "Grilled Fish Tacos", date: _ndDate(0), calories: 580, type: "Lunch", onPlan: true },
      { name: "Chicken Stir Fry", date: _ndDate(0), calories: 620, type: "Dinner", onPlan: true },
    ]
  },
  {
    id: 5, name: "Rachel Kim", plan: "Monthly Subscription", status: "inactive",
    joined: "2026-01-28", lastCheckin: "2026-03-25", checkinsThisMonth: 1,
    mealsLogged: 12, adherence: 45, goal: "Weight Loss",
    progress: [
      { week: "Week 1", meals: 8, adherence: 55 },
      { week: "Week 2", meals: 4, adherence: 40 },
      { week: "Week 3", meals: 0, adherence: 0 },
      { week: "Week 4", meals: 0, adherence: 0 },
    ],
    recentMeals: [
      { name: "Smoothie Bowl", date: "2026-03-25", calories: 340, type: "Breakfast", onPlan: true },
    ]
  },
  {
    id: 6, name: "Daniel Park", plan: "Macro Mastery (One-time)", status: "active",
    joined: _ndDate(12), lastCheckin: _ndDate(1), checkinsThisMonth: 5,
    mealsLogged: 60, adherence: 88, goal: "Muscle Gain",
    progress: [
      { week: "Week 1", meals: 20, adherence: 90 },
      { week: "Week 2", meals: 18, adherence: 85 },
      { week: "Week 3", meals: 22, adherence: 92 },
      { week: "Week 4", meals: 0, adherence: 0 },
    ],
    recentMeals: [
      { name: "Egg White Omelette", date: _ndDate(1), calories: 310, type: "Breakfast", onPlan: true },
      { name: "Lean Beef & Broccoli", date: _ndDate(1), calories: 590, type: "Lunch", onPlan: true },
      { name: "Protein Shake & Banana", date: _ndDate(2), calories: 280, type: "Snack", onPlan: true },
    ]
  },
  {
    id: 7, name: "Emily Foster", plan: "Monthly Subscription", status: "inactive",
    joined: "2025-12-15", lastCheckin: _ndDate(10), checkinsThisMonth: 2,
    mealsLogged: 18, adherence: 52, goal: "Hormone Balance",
    progress: [
      { week: "Week 1", meals: 14, adherence: 65 },
      { week: "Week 2", meals: 4, adherence: 38 },
      { week: "Week 3", meals: 0, adherence: 0 },
      { week: "Week 4", meals: 0, adherence: 0 },
    ],
    recentMeals: [
      { name: "Salmon & Avocado Bowl", date: _ndDate(10), calories: 560, type: "Lunch", onPlan: true },
      { name: "Veggie Wrap", date: _ndDate(10), calories: 380, type: "Dinner", onPlan: false },
    ]
  },
  {
    id: 8, name: "Aisha Johnson", plan: "Monthly Subscription", status: "active",
    joined: "2026-03-01", lastCheckin: _ndDate(0), checkinsThisMonth: 7,
    mealsLogged: 68, adherence: 82, goal: "Maintenance",
    progress: [
      { week: "Week 1", meals: 18, adherence: 85 },
      { week: "Week 2", meals: 17, adherence: 80 },
      { week: "Week 3", meals: 16, adherence: 78 },
      { week: "Week 4", meals: 17, adherence: 84 },
    ],
    recentMeals: [
      { name: "Acai Bowl", date: _ndDate(0), calories: 410, type: "Breakfast", onPlan: true },
      { name: "Mediterranean Salad", date: _ndDate(0), calories: 480, type: "Lunch", onPlan: true },
      { name: "Pasta Bolognese", date: _ndDate(1), calories: 720, type: "Dinner", onPlan: false },
    ]
  },
];

const ndRecentSales = [
  { client: "Daniel Park", plan: "Macro Mastery", price: 39.99, date: _ndDate(12), type: "One-time" },
  { client: "Sophia Nguyen", plan: "Clean Eating Reset", price: 34.99, date: _ndDate(15), type: "One-time" },
  { client: "New User", plan: "Anti-Inflammatory Plan", price: 29.99, date: _ndDate(3), type: "One-time" },
  { client: "Olivia Martinez", plan: "Monthly Subscription", price: 49.99, date: _ndDate(6), type: "Recurring" },
  { client: "Marcus Williams", plan: "Monthly Subscription", price: 49.99, date: _ndDate(6), type: "Recurring" },
  { client: "James Thompson", plan: "Monthly Subscription", price: 49.99, date: _ndDate(8), type: "Recurring" },
  { client: "Aisha Johnson", plan: "Monthly Subscription", price: 49.99, date: _ndDate(8), type: "Recurring" },
  { client: "New User", plan: "Keto Kickstart", price: 27.99, date: _ndDate(1), type: "One-time" },
];

// ===== Render Client List =====
function renderNdClients(filter) {
  const filtered = filter === 'all' ? ndClients :
    filter === 'active' ? ndClients.filter(c => c.status === 'active' && c.adherence >= 70) :
    ndClients.filter(c => c.status === 'inactive' || c.adherence < 70);

  const list = document.getElementById('ndClientList');
  list.innerHTML = filtered.map(c => {
    const initials = c.name.split(' ').map(n => n[0]).join('');
    const isLow = c.status === 'inactive' || c.adherence < 70;
    const lastDate = new Date(c.lastCheckin + 'T00:00:00');
    const daysAgo = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
    const lastStr = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

    return `
      <div class="td-client-row ${isLow ? 'needs-attention' : ''}" onclick="showNdClientDetail(${c.id})">
        <div class="td-client-avatar">
          <div class="avatar">${initials}</div>
        </div>
        <div class="td-client-info">
          <h4>${c.name}</h4>
          <span>${c.plan}</span>
        </div>
        <div class="td-client-stats-mini">
          <div class="td-mini-stat">
            <strong>${c.mealsLogged}</strong>
            <span>meals logged</span>
          </div>
          <div class="td-mini-stat">
            <strong>${c.adherence}%</strong>
            <span>adherence</span>
          </div>
          <div class="td-mini-stat">
            <strong>${lastStr}</strong>
            <span>last check-in</span>
          </div>
        </div>
        <div class="td-client-status">
          ${isLow ? '<span class="status-badge status-warning">Needs Attention</span>' : '<span class="status-badge status-good">On Track</span>'}
        </div>
      </div>
    `;
  }).join('');
}

function filterNdClients(filter, btn) {
  document.querySelectorAll('.td-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNdClients(filter);
}

// ===== Client Detail =====
function showNdClientDetail(id) {
  const c = ndClients.find(cl => cl.id === id);
  if (!c) return;

  document.getElementById('ndClientDetailSection').style.display = '';
  document.getElementById('ndClientDetailName').textContent = c.name;

  const maxAdherence = Math.max(...c.progress.map(w => w.adherence), 1);

  document.getElementById('ndClientDetailContent').innerHTML = `
    <div class="progress-stats-row" style="margin-bottom:36px;">
      <div class="progress-stat-card">
        <div class="progress-stat-number">${c.checkinsThisMonth}</div>
        <div class="progress-stat-label">Check-ins This Month</div>
      </div>
      <div class="progress-stat-card">
        <div class="progress-stat-number">${c.mealsLogged}</div>
        <div class="progress-stat-label">Meals Logged</div>
      </div>
      <div class="progress-stat-card">
        <div class="progress-stat-number">${c.adherence}%</div>
        <div class="progress-stat-label">Adherence Rate</div>
      </div>
      <div class="progress-stat-card">
        <div class="progress-stat-number">${c.goal}</div>
        <div class="progress-stat-label">Nutrition Goal</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;">
      <div>
        <h3 style="font-size:0.78rem;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:20px;">Weekly Adherence</h3>
        <div class="progress-bar-chart">
          ${c.progress.map(w => `
            <div class="chart-row">
              <div class="chart-label">${w.week}</div>
              <div class="chart-bar-container">
                <div class="chart-bar" style="width: ${(w.adherence / maxAdherence) * 100}%;"></div>
              </div>
              <div class="chart-value">${w.meals} meals &middot; ${w.adherence}%</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h3 style="font-size:0.78rem;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:20px;">Recent Meals</h3>
        ${c.recentMeals.map(m => {
          const d = new Date(m.date + 'T00:00:00');
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return `
            <div class="log-entry" style="cursor:default;">
              <div class="log-entry-date">${dateStr}</div>
              <div class="log-entry-info">
                <h4>${m.name}</h4>
                <div class="log-entry-meta">
                  <span>${m.calories} cal</span>
                  <span>${m.type}</span>
                  ${m.onPlan ? '<span style="color:#10B981;">&#10003; On Plan</span>' : '<span style="color:#EF4444;">&#10007; Off Plan</span>'}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div style="margin-top:36px;padding-top:24px;border-top:1px solid var(--border);display:flex;gap:12px;">
      <span style="font-size:0.82rem;color:var(--text-muted);">Member since ${new Date(c.joined + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
    </div>
  `;

  document.getElementById('ndClientDetailSection').scrollIntoView({ behavior: 'smooth' });
}

function closeNdClientDetail() {
  document.getElementById('ndClientDetailSection').style.display = 'none';
}

// ===== Sales List =====
function renderNdSales() {
  const list = document.getElementById('ndSalesList');
  const totalSales = ndRecentSales.reduce((sum, s) => sum + s.price, 0);
  const yourEarnings = totalSales * 0.85;
  const shapeFee = totalSales * 0.15;

  list.innerHTML = `
    <div style="display:flex;gap:24px;margin-bottom:24px;padding:20px;background:var(--bg-alt);border-radius:8px;">
      <div style="flex:1;text-align:center;">
        <div style="font-size:1.2rem;font-weight:600;">$${totalSales.toFixed(2)}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Total Sales</div>
      </div>
      <div style="flex:1;text-align:center;">
        <div style="font-size:1.2rem;font-weight:600;color:#10B981;">$${yourEarnings.toFixed(2)}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Your Earnings (85%)</div>
      </div>
      <div style="flex:1;text-align:center;">
        <div style="font-size:1.2rem;font-weight:600;color:var(--text-muted);">$${shapeFee.toFixed(2)}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Shape Fee (15%)</div>
      </div>
    </div>
  ` + ndRecentSales.map(s => {
    const d = new Date(s.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const earned = (s.price * 0.85).toFixed(2);
    return `
      <div class="td-sale-row">
        <div class="td-sale-info">
          <h4>${s.client}</h4>
          <span>${s.plan}</span>
        </div>
        <div class="td-sale-type">
          <span class="workout-tag">${s.type}</span>
        </div>
        <div class="td-sale-amount">
          <strong style="color:#10B981;">$${earned}</strong>
          <span>of $${s.price.toFixed(2)} &middot; ${dateStr}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Init
renderNdClients('all');
renderNdSales();
