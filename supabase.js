// Shape — Supabase client (Phase 1: auth + profiles)
// Loads the Supabase JS v2 client from CDN and exposes it as window.shapeDb.
// All pages that need auth should include this file *after* the CDN script:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="supabase.js"></script>

(function () {
  var SUPABASE_URL = 'https://zznufekgjngecelwxndw.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_vuOq-03RJHruIz0PWtXiUA_R4zvTJcR';

  if (typeof window === 'undefined') return;
  if (!window.supabase || !window.supabase.createClient) {
    console.error('[shape] Supabase CDN script missing. Add @supabase/supabase-js@2 before supabase.js');
    return;
  }

  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'shape.auth'
    }
  });

  // ===== Public API (attached to window.shapeDb) =====
  var shapeDb = {
    client: client,

    // Sign up a new user and create their profile row.
    async signUp(opts) {
      var email = opts.email;
      var password = opts.password;
      var role = opts.role; // 'client' | 'trainer' | 'nutritionist'
      var fullName = opts.fullName || '';

      var signUpRes = await client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: fullName, role: role }
        }
      });
      if (signUpRes.error) return { error: signUpRes.error };

      var user = signUpRes.data && signUpRes.data.user;
      // If email confirmations are enabled, user exists but no session yet.
      // Either way, upsert the profile row now.
      if (user) {
        var profileRes = await client.from('profiles').upsert({
          id: user.id,
          role: role,
          full_name: fullName
        });
        if (profileRes.error) {
          console.warn('[shape] profile upsert failed', profileRes.error);
        }
      }
      return { data: signUpRes.data, user: user };
    },

    // Sign in with email + password, returning the user's profile.
    async signIn(email, password) {
      var res = await client.auth.signInWithPassword({ email: email, password: password });
      if (res.error) return { error: res.error };
      var user = res.data.user;
      var profile = await shapeDb.getProfile(user.id);
      return { user: user, profile: profile };
    },

    async signOut() {
      await client.auth.signOut();
      // Clear legacy demo keys so stale UI state doesn't linger.
      try {
        localStorage.removeItem('shapeLoggedIn');
        localStorage.removeItem('shapeUserType');
        localStorage.removeItem('shapeFirstName');
        localStorage.removeItem('shapeLastName');
        localStorage.removeItem('shapeEmail');
      } catch (e) {}
    },

    async getSession() {
      var res = await client.auth.getSession();
      return res.data && res.data.session;
    },

    async getUser() {
      var res = await client.auth.getUser();
      return res.data && res.data.user;
    },

    async getProfile(userId) {
      if (!userId) {
        var u = await shapeDb.getUser();
        if (!u) return null;
        userId = u.id;
      }
      var res = await client.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (res.error) {
        console.warn('[shape] getProfile error', res.error);
        return null;
      }
      return res.data;
    },

    // Guard a dashboard page. If no session or wrong role → bounce to login.
    async requireRole(expectedRole) {
      var session = await shapeDb.getSession();
      if (!session) {
        window.location.href = 'login.html';
        return null;
      }
      var profile = await shapeDb.getProfile(session.user.id);
      if (!profile) {
        window.location.href = 'login.html';
        return null;
      }
      if (expectedRole && profile.role !== expectedRole) {
        window.location.href = shapeDb.dashboardFor(profile.role);
        return null;
      }
      return { session: session, profile: profile };
    },

    dashboardFor(role) {
      if (role === 'trainer') return 'trainer-dashboard.html';
      if (role === 'nutritionist') return 'nutrition-schedule.html';
      return 'clients.html';
    }
  };

  window.shapeDb = shapeDb;
})();
