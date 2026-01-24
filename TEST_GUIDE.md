# 🧪 Guide de test - Intégration Sanity

## ✅ Services opérationnels

- **Sanity Studio** : http://localhost:3333 ✅
- **Site Astro** : http://localhost:4322 ✅

## 🎯 Plan de test

### Phase 1 : Création du contenu de test

#### 1. **Restaurant Éphémère**
Aller sur http://localhost:3333 et créer un document "Restaurant Éphémère" :

**Champs à remplir :**
- **Titre** : "Soirée Gastronomique d'Hiver"
- **Dates** : Cliquer sur le calendrier et sélectionner :
  - 5 mars 2026
  - 9 avril 2026
  - 21 mai 2026
  - 11 juin 2026
- **Prix par personne** : 50
- **Description du menu** : "Menu unique du chef avec produits frais et locaux, accord mets-vins"
- **Complet ?** : Non (décochez)
- **Nombre minimum de personnes** : 4
- **Montant de l'acompte** : 25

**Action** : Cliquer "Publier" (bouton vert en haut à droite)

#### 2. **Locations (La Zboum)**

Créer **2 documents** :

**Document 1 - Sociétés :**
- **Type de location** : Société
- **Titre** : "Réunions d'entreprise & Team-Buildings"
- **Prix HTVA** : "400€"
- **Points forts** : (cliquer + pour ajouter)
  - "Cadre inspirant et chaleureux"
  - "Cuisine entièrement équipée"
  - "Parking privé"
  - "Accès facile via E411"
- **Description détaillée** : "Espace idéal pour vos réunions d'équipe, formations et événements professionnels"
- **Capacité maximale** : 20

**Document 2 - Privé :**
- **Type de location** : Privé
- **Titre** : "Événements privés"
- **Prix HTVA** : "400€"
- **Points forts** :
  - "Anniversaires et célébrations"
  - "Réunions de famille"
  - "Dîners entre amis"
  - "Espace privatif et cosy"
- **Description détaillée** : "Créez des souvenirs inoubliables dans notre espace chaleureux"
- **Capacité maximale** : 12

**Action** : Publier les deux documents

### Phase 2 : Test de l'affichage

#### 1. **Page d'accueil avec données dynamiques**
Aller sur : http://localhost:4322/index-cms

**Vérifications attendues :**
- ✅ Titre "Soirée Gastronomique d'Hiver"
- ✅ Prix "50€"
- ✅ Dates affichées : Jeudi 5 mars, Jeudi 9 avril, etc.
- ✅ Statut "Places disponibles"
- ✅ Bouton "Réserver ma table" (pas disabled)

#### 2. **Sections Locations**
Sur la même page, vérifier :
- ✅ **Sociétés** : "Réunions d'entreprise & Team-Buildings" - 400€
- ✅ **Privé** : "Événements privés" - 400€
- ✅ Points forts affichés pour chaque section

### Phase 3 : Test des modifications

#### 1. **Modifier le restaurant**
Dans Sanity Studio :
- Ouvrir le document "Restaurant Éphémère"
- Cocher "Complet ?"
- **Publier**

**Vérification** : Sur http://localhost:4322/index-cms
- ✅ Voir "Complet" affiché
- ✅ Bouton "Réserver ma table" remplacé par message d'indisponibilité

#### 2. **Ajouter une nouvelle date**
- Ajouter "13 juillet 2026" aux dates
- **Publier**

**Vérification** : Nouvelle date apparaît sur le site

### Phase 4 : Test des erreurs

#### 1. **Données manquantes**
Temporairement supprimer le document Restaurant dans Sanity

**Vérification** : Le site affiche les données par défaut (fallback)

#### 2. **Remettre le contenu**
Recréer le document Restaurant

**Vérification** : Les données dynamiques reviennent

## 📊 Résultats attendus

### ✅ **Tests réussis**
- [ ] Contenu créé dans Sanity Studio
- [ ] Données affichées sur le site Astro
- [ ] Modifications en temps réel
- [ ] Gestion des états (complet/disponible)
- [ ] Fallback en cas d'erreur

### 🎯 **Fonctionnalités validées**
- [ ] Interface Sanity intuitive
- [ ] Mise à jour automatique du site
- [ ] Sécurité (design protégé)
- [ ] Performance (chargement rapide)

## 🚨 En cas de problème

### Site ne se met pas à jour
```bash
# Forcer le rafraîchissement
# Ctrl+F5 dans le navigateur
# Ou vider le cache du navigateur
```

### Studio ne répond pas
```bash
# Redémarrer le studio
npm run studio
```

### Erreur dans la console
Consulter les logs dans les terminaux ou vérifier :
- Variables d'environnement dans `.env`
- Configuration dans `sanity.config.ts`

## 🎉 Validation finale

Une fois tous les tests passés :
- ✅ **Sanity Studio** prêt pour Muriel
- ✅ **Site dynamique** opérationnel
- ✅ **Intégration complète** validée

---

**🚀 Prêt pour les tests ! Commence par créer le contenu Restaurant dans Sanity Studio.**