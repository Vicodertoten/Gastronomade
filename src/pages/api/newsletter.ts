import type { APIRoute } from 'astro';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Désactiver le prerendering pour cette route API
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Email invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Chemin du fichier CSV
    const csvPath = join(process.cwd(), 'newsletter.csv');

    // Vérifier si le fichier existe et lire son contenu
    let csvContent = '';
    let existingEmails: string[] = [];

    if (existsSync(csvPath)) {
      csvContent = readFileSync(csvPath, 'utf-8');
      existingEmails = csvContent.split('\n').filter(line => line.trim() !== '');
    } else {
      // Créer l'en-tête si le fichier n'existe pas
      csvContent = 'Email,Date d\'inscription\n';
    }

    // Vérifier si l'email existe déjà
    const emailExists = existingEmails.some(line => line.startsWith(email + ','));

    if (emailExists) {
      return new Response(JSON.stringify({ error: 'Cet email est déjà inscrit à la newsletter' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ajouter la nouvelle inscription
    const now = new Date().toISOString();
    const newLine = `${email},${now}\n`;
    csvContent += newLine;

    // Écrire dans le fichier
    writeFileSync(csvPath, csvContent, 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: 'Inscription à la newsletter réussie !'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};;