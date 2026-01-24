# 🚨 Guide de dépannage - Sanity Studio

## Problèmes identifiés et solutions

### 1. Erreur de permissions `EACCES: permission denied, mkdir '/Users/ryelandt/.config/sanity'`

**Cause** : Le CLI Sanity essaie de créer un dossier dans `~/.config/sanity` mais n'a pas les permissions.

**Solutions** :

#### Option A : Corriger les permissions (recommandée)
```bash
# Créer le dossier avec les bonnes permissions
sudo mkdir -p ~/.config/sanity
sudo chown -R $(whoami) ~/.config/sanity

# Puis réessayer
cd studio
npx sanity init
```

#### Option B : Utiliser notre script personnalisé (plus simple)
```bash
cd studio
# Éditer .env.local avec votre Project ID Sanity
# Puis lancer
npm run setup
```

### 2. Vulnérabilités de sécurité npm

**Cause** : Versions anciennes de certaines dépendances.

**Solution** :
```bash
cd studio
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### 3. Configuration Sanity manquante

**Étapes pour créer un projet Sanity** :

1. **Aller sur https://sanity.io**
2. **Créer un compte** (gratuit)
3. **Cliquer "Create project"**
4. **Choisir "Clean project"**
5. **Nommer le projet** : "Gastronomade Studio"
6. **Copier le Project ID** (ex: `abc123def`)

## 📋 Procédure complète de configuration

### Étape 1 : Préparer l'environnement
```bash
# Dans le dossier studio
cd studio

# Éditer .env.local
nano .env.local
# Ajouter :
# SANITY_PROJECT_ID=votre-project-id-ici
# SANITY_DATASET=production
```

### Étape 2 : Installer les dépendances
```bash
npm install
```

### Étape 3 : Lancer le studio
```bash
npm run dev
```

### Étape 4 : Accéder au studio
- Ouvrir http://localhost:3333
- Se connecter avec votre compte Sanity

## 🔧 Commandes de dépannage

### Vérifier les permissions
```bash
ls -la ~/.config/
```

### Forcer la réinstallation
```bash
cd studio
rm -rf node_modules package-lock.json .sanity/
npm install
```

### Vérifier la configuration
```bash
cd studio
cat .env.local
```

### Tester la connexion Sanity
```bash
cd studio
npx sanity debug
```

## 🚀 Démarrage rapide (méthode alternative)

Si les problèmes persistent, voici une méthode alternative :

1. **Créer le projet Sanity manuellement** sur sanity.io
2. **Utiliser notre configuration existante** :
   ```bash
   cd studio
   # Éditer .env.local avec le bon Project ID
   npm run dev
   ```

## 📞 Support

Si les problèmes persistent :
1. Vérifiez que Node.js >= 18
2. Essayez sur un nouveau terminal
3. Vérifiez votre connexion internet
4. Contactez le support Sanity : https://sanity.io/help

## ✅ Vérification finale

Une fois configuré, vous devriez voir :
- ✅ Studio accessible sur http://localhost:3333
- ✅ Interface avec les schémas (Restaurant, Thermomix, etc.)
- ✅ Possibilité de créer/modifier du contenu