# Ledhas · Gîte à Timimoun

Site du gîte Ledhas (لدهاس), Massine, Timimoun, avec son espace de gestion des réservations.
Site statique (HTML, GSAP, Lenis) déployé sur Vercel, sans étape de build.

- Numéro WhatsApp : constante `WA_NUMBER` dans le script de `index.html`
- Photos du gîte : `img/` · vidéo : `video/` · logo : `logo/`
- Espace de gestion : `/admin/` (fichiers dans `admin/`)
- Base de données : Supabase, schéma dans `supabase/schema.sql`
- Configuration partagée (site + admin) : `config.js`

## Comment ça marche

1. Le client remplit le formulaire du site. La demande est enregistrée dans Supabase
   (fonction `submit_reservation`, avec validation et anti-abus), puis WhatsApp s'ouvre
   avec le message prêt, qui porte la même référence (`LDH-XXXXXX`).
2. Dans `/admin/`, l'équipe voit les demandes « À vérifier », les confirme ou les refuse,
   contacte le client (WhatsApp avec messages types en FR / EN / AR, appel, e-mail),
   note le prix, l'acompte, la chambre attribuée et des notes internes.
3. Chaque changement de statut, modification ou contact est enregistré dans l'historique
   de la réservation, côté serveur.

Sécurité : le public ne peut ni lire ni modifier la base (RLS). Seuls les comptes listés
dans la table `ledhas_admins` voient les réservations.

## Mode démo (avant Supabase)

Avec `demo: true` dans `config.js` (réglage actuel), `/admin/` fonctionne sans base de données :
compte `demo@ledhas.dz` / `demo1234`, réservations fictives gardées dans le navigateur,
bouton « Réinitialiser la démo » dans le menu. Les demandes envoyées depuis le formulaire
du site, dans le même navigateur, apparaissent dans l'admin comme de vraies demandes.
Sur les réservations fictives, WhatsApp demande de choisir le contact (aucun message ne
part vers un numéro inventé).

## Mise en service (une seule fois)

1. Créer un projet gratuit sur https://supabase.com (région : Europe, ex. Frankfurt).
2. **SQL Editor → New query** : coller tout `supabase/schema.sql`, puis **Run**.
3. **Authentication → Users → Add user → Create new user** : e-mail + mot de passe du
   gérant, cocher « Auto Confirm User ».
4. Dans le SQL Editor, exécuter (avec le bon e-mail et le bon prénom) :
   ```sql
   insert into public.ledhas_admins (user_id, name)
   select id, 'Prénom' from auth.users where email = 'gerant@exemple.com'
   on conflict (user_id) do update set name = excluded.name;
   ```
5. **Authentication → URL Configuration** : Site URL = `https://ledhas.vercel.app`
   (ou le domaine final) et ajouter `https://ledhas.vercel.app/admin/` aux Redirect URLs
   (pour « Mot de passe oublié »).
6. **Project Settings → API** : copier la *Project URL* et la clé *anon public*
   (ou *publishable*) dans `config.js` (ici et dans le dépôt `ledhas2`), mettre `demo: false`,
   puis déployer.

Pour ajouter un autre membre de l'équipe : refaire les étapes 3 et 4.

Réalisé par Nova Web Dz.
