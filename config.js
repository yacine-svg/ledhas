/* Ledhas · configuration partagée par le site et l'espace de gestion.
   Ces deux valeurs viennent de Supabase → Project Settings → API.
   La clé « anon / publishable » est faite pour être publique : les données
   restent protégées par les règles de sécurité (RLS) de supabase/schema.sql.
   demo: true  → l'espace /admin/ fonctionne avec des réservations fictives
   gardées dans le navigateur, et les demandes du formulaire (même navigateur)
   y apparaissent. Passer à false une fois Supabase branché. */
window.LEDHAS_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
  whatsappNumber: "213550581196",
  demo: true
};
