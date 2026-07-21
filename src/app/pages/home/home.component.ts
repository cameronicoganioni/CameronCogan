import { Component, AfterViewInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  showGame = false;
  gameStarted = false;
  level = 1;
  score = 0;
  gameOver = false;
  showVictory = false;
  highScore = 0;
  unlockedCode = '';

  // Mobile controls
  mobileLeft = false;
  mobileRight = false;
  mobileJump = false;

  // Cookie Preferences
  showPreferences = false;
  analyticsEnabled = false;
  showCookiePolicy = false;

  // Language
  currentLang: 'en' | 'fr' | 'de' = 'en';

  translations = {
    en: {
      aboutLabel: 'International Business Administration',
      aboutTitle: 'Cameron Cogan',
      aboutSubtitle: 'Top 12% of Cohort • Montpellier Business School',
      aboutText: 'I am currently pursuing a Bachelor of International Business Administration at Montpellier Business School. My studies encompass a broad range of disciplines, including artificial intelligence, business ethics, business law, consumer behaviour, digital tools, financial accounting, globalisation and geopolitics, intercultural management, leadership, macroeconomics, management, marketing, quantitative methods and statistics, and professional development. Through coursework, collaborative projects, and a professional internship, I have developed strong analytical, communication, problem-solving, and cross-cultural skills, preparing me to address business challenges in an international environment.',
      projectsLabel: 'Projects',
      projectsTitle: 'Featured Work',
      projectsIntro: 'A selection of projects demonstrating my experience in business analytics, marketing strategy, and development.',
      // Project 1
      project1Category: 'Business Analytics',
      project1Title: 'Export Analytics Dashboard',
      project1Text: 'This graph was created using imported Google and LinkedIn analytics to observe website use in relation to invites to follow deCogan. Results show a correlation between active users on a site and accepted invitations to follow. Results show that having a website could lead to higher success rates in follow invites.',
      project1Tag1: 'Google Sheets',
      project1Tag2: 'Data Visualisation',
      project1Tag3: 'Google Analytics Export',
      project1Tag4: 'LinkedIn Analytics Export',
      // Project 2
      project2Category: 'Web Analytics',
      project2Title: 'Google Analytics Setup on cameroncogan.com',
      project2Text: 'This image shows detailed custom event tracking.',
      project2Tag1: 'Google Analytics',
      project2Tag2: 'Event Tracking',
      project2Tag3: 'User Behaviour',
      project2Tag4: 'Traffic Analysis',
      experienceLabel: 'Experience',
      experienceTitle: 'Professional Journey',
      experienceIntro: 'Roles and contributions in marketing, communications, and international business.',
      // Project 3
      project3Category: 'Interactive Marketing',
      project3Title: 'Brookie Panda Game Easter Egg',
      project3Text: 'An interactive retro style game hidden on the website as an Easter egg. Visitors who engage with the game can unlock discount codes, turning a playful experience into a practical marketing tool that rewards attention and increases time spent on the site.',
      project3Tag1: 'Game Development',
      project3Tag2: 'Easter Egg',
      project3Tag3: 'Marketing Engagement',
      project3Tag4: 'Discount Codes',
      // Experience 1 - deCogan
      exp1Title: 'Assistant Marketing and Communication, deCogan',
      exp1Date: '06/26-08/26 (3 months)',
      exp1Text: 'Supporting marketing strategies and communication initiatives, managing social media and completed LinkedIn outreach at deCogan. Focused on content creation, CRM, brand development and data-driven insights (including Google & LinkedIn analytics), SEO- thereby meeting my first year study requirements.',
      exp1Tag1: 'Digital Marketing',
      exp1Tag2: 'Content Creation',
      exp1Tag3: 'Analytics',
      exp1Tag4: 'Brand Development',
      // Experience 2 - TourPourLaVie
      exp2Title: 'Ticket Sales Volunteer, Photos & Videos, TourPourLaVie',
      exp2Date: '16/05/26',
      exp2Text: 'Volunteered as Ticket Sales Assistant for a charity car exhibition benefiting sick and disabled children. Managed ticket sales and visitor flow while also helping the promotional videos and photographs of the displayed vehicles. The event was organized by TourPourLaVie to raise funds for Sourire à la Vie.',
      exp2Tag1: 'Event Setup',
      exp2Tag2: 'Ticket Sales',
      exp2Tag3: 'Photography & Videography',
      exp2Tag4: 'Volunteering',
      // Experience 3 - Complical
      exp3Title: 'Application Tester (Skill-based Volunteering), Complical',
      exp3Date: '04/25-05/25',
      exp3Text: 'Provided user-based feedback and identified bugs while testing the Complical site. Used Jira as the main project management tool to document issues, track tasks, and contribute to product improvements.',
      exp3Tag1: 'User Testing',
      exp3Tag2: 'Jira',
      exp3Tag3: 'Bug Reporting',
      exp3Tag4: 'Quality Assurance',
      // Experience 4 - Aeternum
      exp4Title: 'Marketing Director, Aeternum',
      exp4Date: '09/22-06/23',
      exp4Text: 'Acted as Marketing Director in a high school business project competition. Contributed skills in graphic design to media displays and social media. Participated in the West Berkshire round of Young Enterprise competition. Completed market research, attended trade fairs, managed YouTube account.',
      exp4Tag1: 'Media Creation Tools',
      exp4Tag2: 'Market Research',
      exp4Tag3: 'Sales',
      exp4Tag4: 'Customer Profiles',
      contactLabel: 'Contact',
      contactTitle: "Let's Connect!",
      contactText: "I'm always open to new opportunities and collaborations. Feel free to reach out!",
      cookieTitle: 'Cookie Policy',
      manageCookies: 'Manage Cookie Preferences',
      cookieLastUpdated: 'Last updated: July 19, 2026',
      cookieWhatTitle: '1. What Are Cookies?',
      cookieWhatText: 'Cookies are small text files placed on your device to help websites function and provide better user experiences.',
      cookieTypesTitle: '2. Cookies We Use',
      cookieEssentialTitle: 'Essential Cookies',
      cookieEssentialText: 'Required for the site to work (navigation, mobile menu). Cannot be disabled.',
      cookieAnalyticsTitle: 'Analytics Cookies',
      cookieAnalyticsText: 'Optional. Help me understand how visitors use the site to improve it.',
      cookieChoicesTitle: '3. Your Choices',
      cookieChoicesText: 'You can change your preferences anytime using the button above.',
      cookieContactTitle: '4. Contact',
      cookieContactText: 'If you have questions, feel free to',
      cookieContactLink: 'contact me',
      bannerText: 'This website uses essential cookies to function properly and optional analytics cookies to understand visitor traffic. You can choose your preferences below. For more details, see our',
      bannerCustomize: 'Customize',
      bannerReject: 'Reject Non-Essential',
      bannerAccept: 'Accept All',
      prefTitle: 'Cookie Preferences',
      prefSubtitle: 'Manage your cookie settings',
      prefSave: 'Save Preferences',
      prefCancel: 'Cancel',
      gameTitle: 'BROOKIE PANDA',
      gameLevel: 'Level',
      gameScore: 'Score',
      gameClickToStart: 'CLICK TO START',
      gameInstructions: 'Collect 🍫 • Avoid the Bamboo',
      gameJump: 'JUMP',
      gameRetry: 'Retry Level',
      gameControls: '← → or A/D to move • Space / W to jump • R to retry',
      gameOver: 'GAME OVER',
      gameOverHint: 'Tap the Retry button below',
      gameVictoryTitle: 'CONGRATULATIONS!',
      gameVictorySubtitle: 'You collected all the chocolates!',
      gameFinalScore: 'Final Score',
      gameHighScore: 'High Score',
      gameDiscountUnlocked: 'Discount code unlocked:',
      gamePlayAgain: 'Play Again',
      gameClose: 'Close',
    },
    fr: {
      aboutLabel: 'Management International des Affaires',
      aboutTitle: 'Cameron Cogan',
      aboutSubtitle: 'Top 12% de la promotion • Montpellier Business School',
      aboutText: 'Actuellement étudiant en BIBA à Montpellier Business School, Je suis notamment des cours d\'intelligence artificielle, d\'éthique des affaires, de droit des affaires, de comportement du consommateur, d’outils numériques, de comptabilité financière, de mondialisation et de géopolitique, de management interculturel, de leadership, de macroéconomie, de management, de marketing, de méthodes quantitatives et statistiques, ainsi que de développement professionnel. Grâce aux cours, aux projets collaboratifs et à un stage professionnel, j\'ai développé de solides compétences analytiques, de communication, de résolution de problèmes et interculturelles.',
      projectsLabel: 'Projets',
      projectsTitle: 'Portfolio',
      projectsIntro: 'Une sélection de projets démontrant mon expérience en analyse commerciale, stratégie marketing et développement.',
      // Project 1
      project1Category: 'Analyse commerciale',
      project1Title: 'Export Analytics',
      project1Text: 'Ce graphique a été créé à l\'aide des données de Google Analytics et de LinkedIn afin d\'analyser le lien entre l\'activité sur le site web et les invitations à suivre la page deCogan. On observe une corrélation entre le nombre d\'utilisateurs actifs et le nombre d\'invitations acceptées. Cela laisse penser que la présence d\'un site web pourrait favoriser un meilleur taux d\'acceptation des invitations.',
      project1Tag1: 'Google Sheets',
      project1Tag2: 'Visualisation de données',
      project1Tag3: 'Export Google Analytics',
      project1Tag4: 'Export LinkedIn Analytics',
      // Project 2
      project2Category: 'Analyse web',
      project2Title: 'Mise en place de Google Analytics sur cameroncogan.com',
      project2Text: 'Cette image montre le suivi détaillé d\'événements personnalisés.',
      project2Tag1: 'Google Analytics',
      project2Tag2: 'Suivi d\'événements',
      project2Tag3: 'Comportement utilisateur',
      project2Tag4: 'Analyse du trafic',
      experienceLabel: 'Expérience',
      experienceTitle: 'Parcours professionnel',
      experienceIntro: 'Rôles et contributions en marketing, communication et commerce international.',
      // Project 3
      project3Category: 'Marketing interactif',
      project3Title: 'Jeu caché Brookie Panda',
      project3Text: 'Un jeu interactif style retro caché sur le site comme Easter egg. Les visiteurs qui y jouent peuvent débloquer des codes de réduction, transformant une expérience ludique en outil marketing qui récompense l\'attention et augmente le temps passé sur le site.',
      project3Tag1: 'Développement de jeu',
      project3Tag2: 'Easter Egg',
      project3Tag3: 'Engagement marketing',
      project3Tag4: 'Codes de réduction',
      // Experience 1
      exp1Title: 'Assistant Marketing et Communication, deCogan',
      exp1Date: '06/26-08/26 (3 mois)',
      exp1Text: 'Soutien aux stratégies marketing et initiatives de communication, gestion des réseaux sociaux et outreach LinkedIn chez deCogan. Axé sur la création de contenu, le CRM, le développement de la marque et les insights data-driven (Google & LinkedIn analytics), ainsi que le SEO, répondant ainsi aux exigences de ma première année d\'études.',
      exp1Tag1: 'Marketing digital',
      exp1Tag2: 'Création de contenu',
      exp1Tag3: 'Analytics',
      exp1Tag4: 'Développement de marque',
      // Experience 2
      exp2Title: 'Bénévole billetterie, photos & vidéos, TourPourLaVie',
      exp2Date: '16/05/26',
      exp2Text: 'Bénévole en tant qu\'assistant billetterie pour une exposition automobile caritative au profit d\'enfants malades et handicapés. Gestion des ventes de billets et du flux de visiteurs, tout en aidant aux vidéos promotionnelles et photographies des véhicules exposés. L\'événement était organisé par TourPourLaVie pour collecter des fonds en faveur de Sourire à la Vie.',
      exp2Tag1: 'Organisation d\'événement',
      exp2Tag2: 'Vente de billets',
      exp2Tag3: 'Photo & Vidéo',
      exp2Tag4: 'Bénévolat',
      // Experience 3
      exp3Title: 'Testeur d\'application (bénévolat de compétences), Complical',
      exp3Date: '04/25-05/25',
      exp3Text: 'Fourniture de retours utilisateurs et identification de bugs lors des tests du site Complical. Utilisation de Jira comme outil principal de gestion de projet pour documenter les problèmes, suivre les tâches et contribuer aux améliorations du produit.',
      exp3Tag1: 'Tests utilisateurs',
      exp3Tag2: 'Jira',
      exp3Tag3: 'Rapport de bugs',
      exp3Tag4: 'Assurance qualité',
      // Experience 4
      exp4Title: 'Directeur Marketing, Aeternum',
      exp4Date: '09/22-06/23',
      exp4Text: 'Directeur Marketing dans un projet entrepreneurial au lycée. Contribution en design graphique pour les supports médias et les réseaux sociaux. Participation à la phase West Berkshire du concours Young Enterprise. Réalisation d\'études de marché, participation à des salons professionnels et gestion du compte YouTube.',
      exp4Tag1: 'Outils de création média',
      exp4Tag2: 'Étude de marché',
      exp4Tag3: 'Ventes',
      exp4Tag4: 'Profils clients',
      contactLabel: 'Contact',
      contactTitle: 'Restons en contact !',
      contactText: "Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter !",
      cookieTitle: 'Politique de cookies',
      manageCookies: 'Gérer les préférences de cookies',
      cookieLastUpdated: 'Dernière mise à jour : 19 juillet 2026',
      cookieWhatTitle: '1. Que sont les cookies ?',
      cookieWhatText: 'Les cookies sont de petits fichiers texte placés sur votre appareil pour aider les sites web à fonctionner et à offrir une meilleure expérience utilisateur.',
      cookieTypesTitle: '2. Cookies que nous utilisons',
      cookieEssentialTitle: 'Cookies essentiels',
      cookieEssentialText: 'Nécessaires au fonctionnement du site (navigation, menu mobile). Ne peuvent pas être désactivés.',
      cookieAnalyticsTitle: 'Cookies analytiques',
      cookieAnalyticsText: 'Optionnels. Ils m\'aident à comprendre comment les visiteurs utilisent le site afin de l\'améliorer.',
      cookieChoicesTitle: '3. Vos choix',
      cookieChoicesText: 'Vous pouvez modifier vos préférences à tout moment en utilisant le bouton ci-dessus.',
      cookieContactTitle: '4. Contact',
      cookieContactText: 'Si vous avez des questions, n\'hésitez pas à',
      cookieContactLink: 'me contacter',
      bannerText: 'Ce site utilise des cookies essentiels pour fonctionner correctement et des cookies analytiques optionnels pour comprendre le trafic. Vous pouvez choisir vos préférences ci-dessous. Pour plus de détails, consultez notre',
      bannerCustomize: 'Personnaliser',
      bannerReject: 'Refuser les non-essentiels',
      bannerAccept: 'Tout accepter',
      prefTitle: 'Préférences de cookies',
      prefSubtitle: 'Gérez vos paramètres de cookies',
      prefSave: 'Enregistrer les préférences',
      prefCancel: 'Annuler',
      gameTitle: 'BROOKIE PANDA',
      gameLevel: 'Niveau',
      gameScore: 'Score',
      gameClickToStart: 'CLIQUEZ POUR COMMENCER',
      gameInstructions: 'Collectez 🍫 • Évitez le bambou',
      gameJump: 'SAUTER',
      gameRetry: 'Réessayer le niveau',
      gameControls: '← → ou A/D pour bouger • Espace / W pour sauter • R pour réessayer',
      gameOver: 'GAME OVER',
      gameOverHint: 'Appuyez sur le bouton Réessayer ci-dessous',
      gameVictoryTitle: 'FÉLICITATIONS !',
      gameVictorySubtitle: 'Tu as collecté tous les chocolats !',
      gameFinalScore: 'Score final',
      gameHighScore: 'Meilleur score',
      gameDiscountUnlocked: 'Code de réduction débloqué :',
      gamePlayAgain: 'Rejouer',
      gameClose: 'Fermer',
    },
    de: {
      aboutLabel: 'International Business Administration',
      aboutTitle: 'Cameron Cogan',
      aboutSubtitle: 'Top 12% des Jahrgangs • Montpellier Business School',
      aboutText: 'Ich studiere derzeit einen Bachelor in International Business Administration an der Montpellier Business School. Mein Studium umfasst ein breites Spektrum an Disziplinen, darunter künstliche Intelligenz, Wirtschaftsethik, Wirtschaftsrecht, Konsumverhalten, digitale Tools, Finanzbuchhaltung, Globalisierung und Geopolitik, interkulturelles Management, Leadership, Makroökonomie, Management, Marketing, quantitative Methoden und Statistik sowie berufliche Entwicklung. Durch Kursarbeit, gemeinsame Projekte und ein Praktikum habe ich starke analytische, kommunikative, problemlösende und interkulturelle Fähigkeiten entwickelt.',
      projectsLabel: 'Projekte',
      projectsTitle: 'Ausgewählte Arbeiten',
      projectsIntro: 'Eine Auswahl an Projekten, die meine Erfahrung in Business Analytics, Marketingstrategie und Entwicklung zeigen.',
      // Project 1
      project1Category: 'Business Analytics',
      project1Title: 'Export Analytics Dashboard',
      project1Text: 'Dieses Diagramm wurde mit importierten Google und LinkedIn-Analytics erstellt, um die Website-Nutzung im Verhältnis zu Follow-Einladungen für deCogan zu beobachten. Die Ergebnisse zeigen eine Korrelation zwischen aktiven Nutzern einer Website und akzeptierten Einladungen. Eine eigene Website kann die Erfolgsquote von Follow-Einladungen erhöhen.',
      project1Tag1: 'Google Sheets',
      project1Tag2: 'Datenvisualisierung',
      project1Tag3: 'Google Analytics Export',
      project1Tag4: 'LinkedIn Analytics Export',
      // Project 2
      project2Category: 'Web Analytics',
      project2Title: 'Google Analytics Setup auf cameroncogan.com',
      project2Text: 'Dieses Bild zeigt detailliertes Custom-Event-Tracking.',
      project2Tag1: 'Google Analytics',
      project2Tag2: 'Event-Tracking',
      project2Tag3: 'Nutzerverhalten',
      project2Tag4: 'Traffic-Analyse',
      experienceLabel: 'Erfahrung',
      experienceTitle: 'Beruflicher Werdegang',
      experienceIntro: 'Rollen und Beiträge in Marketing, Kommunikation und internationalem Business.',
      // Project 3
      project3Category: 'Interaktives Marketing',
      project3Title: 'Brookie Panda Spiel-Easter-Egg',
      project3Text: 'Ein interaktives retro-Spiel, das als Easter Egg auf der Website versteckt ist. Besucher, die mit dem Spiel interagieren, können Rabattcodes freischalten, so wird ein spielerisches Erlebnis zu einem praktischen Marketing-Tool, das Aufmerksamkeit belohnt und die Verweildauer auf der Seite erhöht.',
      project3Tag1: 'Spieleentwicklung',
      project3Tag2: 'Easter Egg',
      project3Tag3: 'Marketing-Engagement',
      project3Tag4: 'Rabattcodes',
      // Experience 1
      exp1Title: 'Assistent Marketing und Kommunikation, deCogan',
      exp1Date: '06/26-08/26 (3 Monate)',
      exp1Text: 'Unterstützung von Marketingstrategien und Kommunikationsinitiativen, Verwaltung von Social Media und LinkedIn-Outreach bei deCogan. Fokus auf Content-Erstellung, CRM, Markenentwicklung und datengetriebene Insights (inkl. Google- & LinkedIn-Analytics) sowie SEO, damit erfüllte ich die Anforderungen meines ersten Studienjahres.',
      exp1Tag1: 'Digitales Marketing',
      exp1Tag2: 'Content-Erstellung',
      exp1Tag3: 'Analytics',
      exp1Tag4: 'Markenentwicklung',
      // Experience 2
      exp2Title: 'Ticketverkauf-Volunteer, Fotos & Videos, TourPourLaVie',
      exp2Date: '16/05/26',
      exp2Text: 'Ehrenamtlicher Einsatz als Ticketverkaufs-Assistent bei einer Charity-Autoausstellung zugunsten kranker und behinderter Kinder. Verwaltung des Ticketverkaufs und des Besucherflusses sowie Unterstützung bei Werbevideos und Fotografien der ausgestellten Fahrzeuge. Die Veranstaltung wurde von TourPourLaVie organisiert, um Spenden für Sourire à la Vie zu sammeln.',
      exp2Tag1: 'Event-Organisation',
      exp2Tag2: 'Ticketverkauf',
      exp2Tag3: 'Fotografie & Videografie',
      exp2Tag4: 'Ehrenamt',
      // Experience 3
      exp3Title: 'Application Tester (kompetenzbasiertes Volunteering), Complical',
      exp3Date: '04/25-05/25',
      exp3Text: 'Bereitstellung von Nutzerfeedback und Identifikation von Bugs beim Testen der Complical-Website. Verwendung von Jira als zentrales Projektmanagement-Tool zur Dokumentation von Problemen, Nachverfolgung von Aufgaben und Beitrag zu Produktverbesserungen.',
      exp3Tag1: 'Usertests',
      exp3Tag2: 'Jira',
      exp3Tag3: 'Bug-Reporting',
      exp3Tag4: 'Qualitätssicherung',
      // Experience 4
      exp4Title: 'Marketing Director, Aeternum',
      exp4Date: '09/22-06/23',
      exp4Text: 'Marketing Director in einem schulischen Unternehmensprojekt-Wettbewerb. Beitrag mit Grafikdesign-Kenntnissen für Mediendisplays und Social Media. Teilnahme an der West-Berkshire-Runde des Young-Enterprise-Wettbewerbs. Durchführung von Marktforschung, Besuch von Messen und Verwaltung des YouTube-Kanals.',
      exp4Tag1: 'Medien-Erstellungstools',
      exp4Tag2: 'Marktforschung',
      exp4Tag3: 'Verkauf',
      exp4Tag4: 'Kundenprofile',
      contactLabel: 'Kontakt',
      contactTitle: 'Lass uns verbinden!',
      contactText: 'Ich bin immer offen für neue Möglichkeiten und Kooperationen. Melde dich gerne!',
      cookieTitle: 'Cookie-Richtlinie',
      manageCookies: 'Cookie-Einstellungen verwalten',
      cookieLastUpdated: 'Zuletzt aktualisiert: 19. Juli 2026',
      cookieWhatTitle: '1. Was sind Cookies?',
      cookieWhatText: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, um Websites zu ermöglichen und bessere Nutzererfahrungen zu bieten.',
      cookieTypesTitle: '2. Welche Cookies wir verwenden',
      cookieEssentialTitle: 'Essenzielle Cookies',
      cookieEssentialText: 'Erforderlich, damit die Website funktioniert (Navigation, mobiles Menü). Können nicht deaktiviert werden.',
      cookieAnalyticsTitle: 'Analyse-Cookies',
      cookieAnalyticsText: 'Optional. Helfen mir zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern.',
      cookieChoicesTitle: '3. Ihre Auswahl',
      cookieChoicesText: 'Sie können Ihre Einstellungen jederzeit über die Schaltfläche oben ändern.',
      cookieContactTitle: '4. Kontakt',
      cookieContactText: 'Bei Fragen können Sie mich gerne',
      cookieContactLink: 'kontaktieren',
      bannerText: 'Diese Website verwendet essenzielle Cookies für den ordnungsgemäßen Betrieb und optionale Analyse-Cookies, um den Besucherverkehr zu verstehen. Sie können Ihre Einstellungen unten wählen. Weitere Details finden Sie in unserer',
      bannerCustomize: 'Anpassen',
      bannerReject: 'Nicht-essenzielle ablehnen',
      bannerAccept: 'Alle akzeptieren',
      prefTitle: 'Cookie-Einstellungen',
      prefSubtitle: 'Verwalten Sie Ihre Cookie-Einstellungen',
      prefSave: 'Einstellungen speichern',
      prefCancel: 'Abbrechen',
      gameTitle: 'BROOKIE PANDA',
      gameLevel: 'Level',
      gameScore: 'Punkte',
      gameClickToStart: 'KLICKEN ZUM STARTEN',
      gameInstructions: 'Sammle 🍫 • Vermeide den Bambus',
      gameJump: 'SPRINGEN',
      gameRetry: 'Level wiederholen',
      gameControls: '← → oder A/D zum Bewegen • Leertaste / W zum Springen • R zum Wiederholen',
      gameOver: 'GAME OVER',
      gameOverHint: 'Tippe unten auf den Wiederholen-Button',
      gameVictoryTitle: 'GLÜCKWUNSCH!',
      gameVictorySubtitle: 'Du hast alle Schokoladen gesammelt!',
      gameFinalScore: 'Endpunktzahl',
      gameHighScore: 'Highscore',
      gameDiscountUnlocked: 'Rabattcode freigeschaltet:',
      gamePlayAgain: 'Nochmal spielen',
      gameClose: 'Schließen',
    }
  };

  get t() {
    return this.translations[this.currentLang];
  }

  private levelStartScore = 0;
  private facingRight = true;
  private trackedSections = new Set<string>();

  private ctx!: CanvasRenderingContext2D;
  private player = { x: 50, y: 280, width: 40, height: 48, vx: 0, vy: 0, jumping: false };
  private keys: { [key: string]: boolean } = {};
  private animationId: number | null = null;

  private playerImage = new Image();
  private backgroundImage = new Image();

  private platforms: {
    x: number;
    y: number;
    width: number;
    height: number;
    vx?: number;        // horizontal speed (for moving platforms)
    startX?: number;    // original x (to move back and forth)
    range?: number;     // how far it can travel
  }[] = [];
  private chocolates: { x: number; y: number; collected: boolean }[] = [];
  private spikes: { x: number; y: number; width: number; tall: boolean }[] = [];
  private particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }[] = [];
  private shakeIntensity = 0;
  private shakeDecay = 0.82;

  // Audio
  private audioCtx: AudioContext | null = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    // Load language as early as possible
    const savedLang = localStorage.getItem('preferredLang') as 'en' | 'fr' | 'de';
    if (savedLang) {
      this.currentLang = savedLang;
    }
  }

  ngAfterViewInit() {
    this.checkCookieConsent();
    this.setupScrollTracking();

    // Track the language currently being used
    this.trackEvent('engagement', 'language_view', this.currentLang);
    window.addEventListener('open-cookie-policy', () => {
    this.showCookiePolicy = true;
    this.cdr.detectChanges();
});
  }

  setLanguage(lang: 'en' | 'fr' | 'de') {
    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);

    // Track language switch
    this.trackEvent('engagement', 'language_select', lang);

    // Reload so the Home component picks up the new language
    window.location.reload();
  }

  // ==================== COOKIE + GOOGLE ANALYTICS ====================
  private checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const analytics = localStorage.getItem('analyticsCookies');

    if (!consent) {
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.classList.remove('hidden');
    } else if (analytics === 'true') {
      this.loadGoogleAnalytics();
    }
  }

  acceptAll() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('analyticsCookies', 'true');
    this.hideBanner();
    this.loadGoogleAnalytics();
  }

  rejectNonEssential() {
    localStorage.setItem('cookieConsent', 'rejected-non-essential');
    localStorage.setItem('analyticsCookies', 'false');
    this.hideBanner();
  }

  managePreferences() {
    this.analyticsEnabled = localStorage.getItem('analyticsCookies') === 'true';
    this.showPreferences = true;
  }

  savePreferences() {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('analyticsCookies', this.analyticsEnabled ? 'true' : 'false');
    this.showPreferences = false;
    this.hideBanner();

    if (this.analyticsEnabled) {
      this.loadGoogleAnalytics();
    }
  }

  closePreferences() {
    this.showPreferences = false;
  }

  openCookieSettings() {
    this.managePreferences();
  }

  private hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('hidden');
  }

  private loadGoogleAnalytics() {
    if ((window as any).gtagLoaded) return;
    (window as any).gtagLoaded = true;

    console.log('Loading Google Analytics...');

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };

    w.gtag('js', new Date());
    w.gtag('config', 'G-4K67T8TTQ4');

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4K67T8TTQ4';
    document.head.appendChild(script);
  }

  trackEvent(category: string, action: string, label: string = '') {
    if (localStorage.getItem('analyticsCookies') === 'true' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  // ==================== SCROLL TRACKING ====================
  private setupScrollTracking() {
    const sections = [
      { id: 'about', name: 'About' },
      { id: 'projects', name: 'Projects' },
      { id: 'experience', name: 'Experience' },
      { id: 'contact', name: 'Contact' },
      { id: 'cookie-policy', name: 'Cookies' }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section && !this.trackedSections.has(section.id)) {
            this.trackedSections.add(section.id);
            this.trackEvent('navigation', 'section_view', section.name);
          }
        }
      });
    }, {
      threshold: 0.4
    });

    setTimeout(() => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);
  }

  // ==================== 8-BIT SOUNDS ====================
  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioCtx;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume = 0.1) {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not available
    }
  }

  private playJumpSound() {
    this.playTone(300, 0.1, 'square', 0.08);
    setTimeout(() => this.playTone(450, 0.12, 'square', 0.06), 70);
  }

  private playStartSound() {
    this.playTone(400, 0.1, 'square');
    setTimeout(() => this.playTone(500, 0.1, 'square'), 100);
    setTimeout(() => this.playTone(600, 0.15, 'square'), 200);
  }

  private playGameOverSound() {
    this.playTone(400, 0.15, 'sawtooth', 0.1);
    setTimeout(() => this.playTone(300, 0.15, 'sawtooth', 0.1), 150);
    setTimeout(() => this.playTone(200, 0.3, 'sawtooth', 0.1), 300);
  }

  private playWinSound() {
    this.playTone(500, 0.1, 'square');
    setTimeout(() => this.playTone(600, 0.1, 'square'), 100);
    setTimeout(() => this.playTone(700, 0.1, 'square'), 200);
    setTimeout(() => this.playTone(900, 0.25, 'square'), 300);
  }

  private playMunchSound() {
    this.playTone(180, 0.06, 'square', 0.09);
    setTimeout(() => this.playTone(140, 0.08, 'square', 0.07), 50);
  }

  // ==================== EASTER EGG ====================
  toggleEasterEgg() {
    this.showGame = true;
    this.gameStarted = false;
    this.level = 1;
    this.score = 0;
    this.levelStartScore = 0;
    this.gameOver = false;
    this.showVictory = false;
    this.highScore = parseInt(localStorage.getItem('brookieHighScore') || '0', 10);
    this.particles = [];
    this.shakeIntensity = 0;

    this.trackEvent('engagement', 'easter_egg_opened', 'Brookie Panda');

    setTimeout(() => this.startGame(), 100);
  }

  startPlaying() {
    this.gameStarted = true;
    this.playStartSound();
  }

  closeGame() {
    this.showGame = false;
    this.gameStarted = false;
    this.gameOver = false;
    this.showVictory = false;
    this.mobileLeft = false;
    this.mobileRight = false;
    this.mobileJump = false;
    this.particles = [];
    this.shakeIntensity = 0;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  retryLevel() {
    this.score = this.levelStartScore;
    this.loadLevel(this.level);
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  playAgain() {
    this.showVictory = false;
    this.gameOver = false;
    this.level = 1;
    this.score = 0;
    this.levelStartScore = 0;
    this.gameStarted = true;
    this.particles = [];
    this.shakeIntensity = 0;
    this.loadLevel(1);
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  private startGame() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d')!;
    this.playerImage.src = './img/panda.webp';
    this.backgroundImage.src = './img/background.webp';

    this.loadLevel(this.level);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.gameLoop();
  }

  private loadLevel(level: number) {
  this.keys = {};
  this.mobileLeft = false;
  this.mobileRight = false;
  this.mobileJump = false;

  this.player = { x: 40, y: 250, width: 40, height: 48, vx: 0, vy: 0, jumping: false };
  this.gameOver = false;
  this.levelStartScore = this.score;
  this.facingRight = true;
  this.particles = [];
  this.shakeIntensity = 0;
  this.backgroundImage.src = this.getBackgroundForLevel(level);

    this.platforms = [{ x: 0, y: 320, width: 800, height: 80 }]; // ground

    const platformCount = Math.min(4 + Math.floor(level * 0.8), 11);
    const heightVariation = 40 + level * 4;

      for (let i = 0; i < platformCount; i++) {
        const baseX = 100 + i * (85 + level * 4);
        const randomOffset = (Math.random() - 0.5) * 40;

        const platform: any = {
        x: baseX + randomOffset,
        y: 280 - (i % 4) * heightVariation - Math.floor(level / 2) * 8,
        width: Math.max(95 - level * 5, 42),
        height: 16
      };

      // Moving platforms from level 5 onwards
      if (level >= 5 && i % 2 === 0) {
        platform.vx = (Math.random() > 0.5 ? 1 : -1) * (1.2 + level * 0.15);
        platform.startX = platform.x;
        platform.range = 60 + level * 8;
      }

      this.platforms.push(platform);
    }

    this.spikes = [];
    const spikeCount = 3 + Math.floor(level * 1.2);

    for (let i = 0; i < spikeCount; i++) {
      const isTall = i === 0 ? false : Math.random() > 0.45;

      this.spikes.push({
        x: 180 + i * (140 - level * 3),
        y: 305,
        width: 28 + Math.random() * 12,
        tall: isTall
      });
    }

    this.chocolates = [];
    const chocolateCount = 5 + Math.floor(level / 1.5);

    for (let i = 0; i < chocolateCount; i++) {
      this.chocolates.push({
        x: 140 + i * (110 + level * 3),
        y: 140 + Math.sin(i) * 50 - level * 3,
        collected: false
      });
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.key] = true;
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.key] = false;
  };

  private die() {
    this.gameOver = true;
    this.score = this.levelStartScore;
    this.playGameOverSound();
    this.spawnParticles(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      '#ef4444',
      28
    );
    this.triggerShake(9);
    this.ngZone.run(() => this.cdr.detectChanges());
  }
  private getBackgroundForLevel(level: number): string {
    if (level <= 4) return './img/background2.webp';       
    if (level <= 7) return './img/background5.webp';       
    if (level === 8) return './img/background3.webp';      
    if (level === 9) return './img/background4.webp';      
    return './img/background.webp';                        
  }
  private getThemeColors(level: number) {
    if (level <= 4) {
      return {
        ground: '#10b981',          // emerald
        platform: '#5c4033',
        bamboo: '#eab308',          // golden yellow
        bambooDark: '#a16207',
        door: '#eab308',
        doorDark: '#ca8a04'
      };
    }
    if (level <= 7) {
      return {
        ground: '#14532d',
        platform: '#5c4033',
        bamboo: '#4ade80',
        bambooDark: '#166534',
        door: '#eab308',
        doorDark: '#ca8a04'
      };
    }
    if (level === 8) {
      return {
        ground: '#000000',
        platform: '#0C2340',
        bamboo: '#6b7280',
        bambooDark: '#111827',
        door: '#6b7280',
        doorDark: '#111827'
      };
    }
    if (level === 9) {
      // Rainbow will be handled specially in drawing
      return {
        ground: '#4c1d95',
        platform: '#7c3aed',
        bamboo: '#ec4899',
        bambooDark: '#be185d',
        door: '#f59e0b',
        doorDark: '#d97706'
      };
    }
    // Level 10
    return {
      ground: '#00563F',
      platform: '#355E3B',
      bamboo: '#138808',
      bambooDark: '#0f5c06',
      door: '#eab308',
      doorDark: '#ca8a04'
    };
  }
  private spawnParticles(x: number, y: number, color: string, count = 16) {
    for (let i = 0; i < count; i++) {
      const life = 45 + Math.random() * 35;
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 4,
        life,
        maxLife: life,
        color,
        size: 6 + Math.random() * 6
      });
    }
  }

  private triggerShake(amount: number = 6) {
    this.shakeIntensity = Math.max(this.shakeIntensity, amount);
  }

  private drawLargeBamboo(x: number, y: number) {
    this.ctx.fillStyle = '#4ade80';
    this.ctx.fillRect(x, y, 18, 180);

    this.ctx.strokeStyle = '#166534';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 50);
    this.ctx.lineTo(x + 18, y + 50);
    this.ctx.moveTo(x, y + 100);
    this.ctx.lineTo(x + 18, y + 100);
    this.ctx.moveTo(x, y + 150);
    this.ctx.lineTo(x + 18, y + 150);
    this.ctx.stroke();

    this.ctx.fillStyle = '#22c55e';
    this.ctx.beginPath();
    this.ctx.ellipse(x - 18, y + 30, 22, 8, -0.6, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x - 15, y + 80, 20, 7, -0.5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x + 36, y + 45, 22, 8, 0.6, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x + 33, y + 110, 20, 7, 0.5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private gameLoop = () => {
    if (!this.showGame) return;

    if (!this.gameOver && this.gameStarted) {
      this.player.vx = 0;

      if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'] || this.mobileLeft) {
        this.player.vx = -5.5;
        this.facingRight = false;
      }
      if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'] || this.mobileRight) {
        this.player.vx = 5.5;
        this.facingRight = true;
      }

      if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w'] || this.keys['W'] || this.mobileJump) && !this.player.jumping) {
        this.player.vy = -15;
        this.player.jumping = true;
        this.playJumpSound();
      }

      this.player.vy += 0.75;
      this.player.x += this.player.vx;
      this.player.y += this.player.vy;
      // Move platforms and carry the player
    for (const p of this.platforms) {
      if (p.vx) {
        p.x += p.vx;

        // Reverse direction at the ends
        if (p.x > p.startX! + p.range! || p.x < p.startX! - p.range!) {
          p.vx *= -1;
        }

        // If the player is standing on this platform → move the player too
        if (
          !this.player.jumping &&
          this.player.x + this.player.width > p.x &&
          this.player.x < p.x + p.width &&
          Math.abs((this.player.y + this.player.height) - p.y) < 6
        ) {
          this.player.x += p.vx;
        }
      }
    }

      this.player.jumping = true;
      for (const p of this.platforms) {
        if (
          this.player.x < p.x + p.width &&
          this.player.x + this.player.width > p.x &&
          this.player.y + this.player.height > p.y &&
          this.player.y + this.player.height < p.y + p.height + 15 &&
          this.player.vy >= 0
        ) {
          this.player.y = p.y - this.player.height;
          this.player.vy = 0;
          this.player.jumping = false;
        }
      }

      if (this.player.x < 0) this.player.x = 0;
      if (this.player.y > 400) this.die();

      for (const s of this.spikes) {
        const bambooTop = s.y - (s.tall ? 35 : 15);
        if (
          this.player.x < s.x + s.width &&
          this.player.x + this.player.width > s.x &&
          this.player.y + this.player.height > bambooTop &&
          this.player.y < s.y + 20
        ) {
          this.die();
        }
      }

      // Collect chocolates
      for (const c of this.chocolates) {
        if (!c.collected &&
          this.player.x < c.x + 20 &&
          this.player.x + this.player.width > c.x &&
          this.player.y < c.y + 20 &&
          this.player.y + this.player.height > c.y) {
    
        c.collected = true;
        this.playMunchSound();

        // Rainbow particles only on level 9
        if (this.level === 9) {
          const rainbowColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
          rainbowColors.forEach(color => {
            this.spawnParticles(c.x + 10, c.y + 10, color, 6);
          });
        } else {
          this.spawnParticles(c.x + 10, c.y + 10, '#fbbf24', 20);
        }

        this.triggerShake(4);

        this.ngZone.run(() => {
          this.score += 10;
          this.cdr.detectChanges();
        });
      }
    }

      if (this.player.x > 720) {
        this.ngZone.run(() => {
          this.level++;
          this.cdr.detectChanges();

          this.playWinSound();

          if (this.level > 10) {
            this.showVictory = true;
            this.gameOver = true;

            if (this.score > this.highScore) {
              this.highScore = this.score;
              localStorage.setItem('brookieHighScore', this.highScore.toString());
            }

            // Discount codes based on performance
            this.unlockedCode = this.score >= 300 ? 'BROOKIE20' :
                                this.score >= 200 ? 'PANDA15' : 'CHOCO10';

            this.cdr.detectChanges();
            return;
          }
          this.loadLevel(this.level);
        });
      }
    }

    // ========== DRAW ==========
    this.ctx.clearRect(0, 0, 800, 400);

    // Safe Screen Shake
    let shakeX = 0;
    let shakeY = 0;

    if (this.shakeIntensity > 0.3) {
      shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeIntensity = 0;
    }

    this.ctx.save();
    this.ctx.translate(shakeX, shakeY);

    if (this.backgroundImage.complete && this.backgroundImage.naturalWidth > 0) {
      this.ctx.drawImage(this.backgroundImage, 0, 0, 800, 400);
    } else {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, 800, 400);
    }

    // START SCREEN
    if (!this.gameStarted) {
      this.ctx.fillStyle = '#14532d';
      this.ctx.fillRect(0, 320, 800, 80);

      this.drawLargeBamboo(120, 140);
      this.drawLargeBamboo(620, 140);

      if (this.playerImage.complete && this.playerImage.naturalWidth > 0) {
        const size = 260;
        const x = (800 - size) / 2;
        const y = (400 - size) / 2 - 10;
        this.ctx.globalAlpha = 0.9;
        this.ctx.drawImage(this.playerImage, x, y, size, size);
        this.ctx.globalAlpha = 1;
      }

      this.ctx.restore(); // important!
      this.animationId = requestAnimationFrame(this.gameLoop);
      return;
    }

    // Platforms + Ground
    const theme = this.getThemeColors(this.level);

    for (const p of this.platforms) {
      // Ground platform
      if (p.y >= 320) {
        this.ctx.fillStyle = theme.ground;
      } else {
        this.ctx.fillStyle = theme.platform;
      }
      this.ctx.fillRect(p.x, p.y, p.width, p.height);

      // Small highlight on floating platforms
      if (p.y < 320) {
        this.ctx.fillStyle = 'rgba(255,255,255,0.15)';
        this.ctx.fillRect(p.x, p.y, p.width, 3);
      }
    }

    // Bamboo
    // Bamboo
    for (const s of this.spikes) {
      const stalkHeight = s.tall ? 55 : 35;
      const stalkY = s.y - (s.tall ? 35 : 15);

      this.ctx.fillStyle = theme.bamboo;
      this.ctx.fillRect(s.x + s.width / 2 - 4, stalkY, 8, stalkHeight);

      this.ctx.strokeStyle = theme.bambooDark;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x + s.width / 2 - 4, stalkY + 15);
      this.ctx.lineTo(s.x + s.width / 2 + 4, stalkY + 15);
      if (s.tall) {
        this.ctx.moveTo(s.x + s.width / 2 - 4, stalkY + 35);
        this.ctx.lineTo(s.x + s.width / 2 + 4, stalkY + 35);
      }
      this.ctx.stroke();

      // Leaves
      this.ctx.fillStyle = theme.bamboo;
      this.ctx.beginPath();
      this.ctx.ellipse(s.x + s.width / 2 - 10, stalkY + 5, 10, 4, -0.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.ellipse(s.x + s.width / 2 + 10, stalkY + 8, 10, 4, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
    // Chocolates
    for (const c of this.chocolates) {
      if (!c.collected) {
        this.ctx.font = '22px Arial';
        this.ctx.fillText('🍫', c.x, c.y + 18);
      }
    }
    // Goal / Door
    this.ctx.fillStyle = theme.door;
    this.ctx.fillRect(740, 230, 45, 90);
    this.ctx.fillStyle = theme.doorDark;
    this.ctx.fillRect(755, 260, 15, 25);

    // Player
    if (this.playerImage.complete && this.playerImage.naturalWidth > 0) {
      this.ctx.save();
      if (this.facingRight) {
        this.ctx.translate(this.player.x + this.player.width, this.player.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.playerImage, 0, 0, this.player.width, this.player.height);
      } else {
        this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height);
      }
      this.ctx.restore();
    } else {
      this.ctx.fillStyle = '#10b981';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    // ========== PARTICLES (update + draw) ==========
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.life--;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      const alpha = p.life / p.maxLife;
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = p.color;

      // Draw as circle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.globalAlpha = 1;
    }

    // Game Over (only show if not victory)
    if (this.gameOver && !this.showVictory) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      this.ctx.fillRect(0, 0, 800, 400);
      this.ctx.fillStyle = '#ef4444';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.t.gameOver, 400, 180);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '22px Arial';
      this.ctx.fillText(this.t.gameOverHint, 400, 240);
      this.ctx.textAlign = 'left';
    }

    if (this.gameOver && !this.showVictory && (this.keys['r'] || this.keys['R'])) {
      this.retryLevel();
    }

    this.ctx.restore(); // always restore
    this.animationId = requestAnimationFrame(this.gameLoop);
  };
}