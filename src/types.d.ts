// Table `matieres`
interface Matiere {
  id: number; // Identifiant unique
  ordre: number; // Ordre d'affichage
  cle: string; // Clé de la matière
  nom: string; // Nom de la matière
  progcolles: 0 | 1 | 2; // Présence du programme de colles (0: vide, 1: présent, 2: désactivé)
  cdt: 0 | 1 | 2; // Présence du cahier de texte (0: vide, 1: présent, 2: désactivé)
  docs: 0 | 1 | 2; // Présence de documents (0: vide, 1: présent, 2: désactivé)
  notescolles: 0 | 1 | 2; // Présence des notes de colles (0: vide, 1: présent, 2: désactivé)
  transferts: 0 | 1 | 2; // Présence des transferts (0: vide, 1: présent, 2: désactivé)
  progcolles_protection: number; // Niveau de protection pour les colles
  cdt_protection: number; // Niveau de protection pour le cahier de texte
  docs_protection: number; // Niveau de protection pour les documents
  transferts_protection: number; // Niveau de protection pour les transferts
  dureecolles: number; // Durée des colles en minutes
  heurescolles: 0 | 1; // Mode de comptage des heures (0: décompte par élève, 1: arrondi à l'heure pleine)
}

// Table `utilisateurs`
interface Utilisateur {
  id: number; // Identifiant unique
  login: string; // Identifiant de connexion
  nom: string; // Nom de l'utilisateur
  prenom: string; // Prénom de l'utilisateur
  mail: string; // Adresse mail de l'utilisateur
  autorisation: number; // Type d'autorisation (1: invité, 2: élève, 3: colleur, 4: lycée, 5: professeur)
  mdp: string; // Mot de passe (40 caractères, symboles spécifiques pour l'état du compte)
  matieres: string; // Liste des matières associées
  timeout: number; // Temps d'inactivité avant déconnexion (en minutes)
  mailexp: string; // Nom d'expédition pour les mails
  mailcopie: 0 | 1; // Envoi automatique de copies des mails (0: non, 1: oui)
  permconn: string; // Token de connexion (cookie)
  lastconn: Date; // Date et heure de la dernière connexion
  menumatieres: string; // Liste des matières pour le menu personnalisé
  menuelements: string; // Configuration des éléments du menu
}

// Table `pages`
interface Page {
  id: number; // Identifiant unique
  ordre: number; // Ordre d'affichage
  cle: string; // Clé de la page
  matiere: number; // Matière associée
  nom: string; // Nom de la page
  titre: string; // Titre de la page
  bandeau: string; // Bandeau d'affichage
  protection: number; // Niveau de protection pour lecture
  edition: number; // Niveau de protection pour édition
}

// Table `infos`
interface Info {
  id: number; // Identifiant unique
  ordre: number; // Ordre d'affichage
  page: number; // Page associée
  cache: 0 | 1; // Mise en cache (0: non, 1: oui)
  titre: string; // Titre de l'information
  texte: string; // Texte de l'information
  protection: number; // Niveau de protection pour lecture
  edition: number; // Niveau de protection pour édition
  dispo: Date; // Date de disponibilité
}

// Table `semaines`
interface Semaine {
  id: number; // Identifiant unique
  debut: Date; // Date de début de la semaine
  colle: 0 | 1; // Indique si semaine de colle (0: non, 1: oui)
  vacances: 0 | 1; // Indique si semaine de vacances (0: non, 1: oui)
}

// Table `vacances`
interface Vacance {
  id: number; // Identifiant unique
  nom: string; // Nom de la période de vacances
}

// Table `progcolles`
interface Progcolle {
  id: number; // Identifiant unique
  semaine: number; // Semaine associée
  matiere: number; // Matière associée
  texte: string; // Contenu du programme de colle
  cache: 0 | 1; // Mise en cache (0: non, 1: oui)
  dispo: Date; // Date de disponibilité
}

// Table `cdt`
interface Cdt {
  id: number; // Identifiant unique
  matiere: number; // Matière associée
  semaine: number; // Semaine associée
  jour: Date; // Date du jour
  h_debut: string; // Heure de début
  h_fin: string; // Heure de fin
  pour: Date; // Date de validité
  type: number; // Type d'entrée dans le cahier de texte
  texte: string; // Texte de l'entrée
  demigroupe: 0 | 1; // Indique si demi-groupe (0: non, 1: oui)
  cache: 0 | 1; // Mise en cache (0: non, 1: oui)
  dispo: Date; // Date de disponibilité
}

// Table cdt-types
interface CdtType {
  id: number; // ID unique du type de "CDT"
  matiere: number; // ID de la matière associée
  ordre: number; // Ordre d'affichage
  titre: string; // Titre du type
  cle: string; // Clé unique de ce type
  deb_fin_pour: number; // Indicateur de début/fin pour
  nb: number; // Nombre associé à ce type
}

// Table cdt-seances
interface CdtSeance {
  id: number; // ID de la séance
  matiere: number; // ID de la matière associée
  ordre: number; // Ordre de la séance
  nom: string; // Nom de la séance
  jour: number; // Jour de la séance (1-7)
  h_debut: string; // Heure de début (format 'HH:MM:SS')
  h_fin: string; // Heure de fin (format 'HH:MM:SS')
  type: number; // Type de la séance
  demigroupe: number; // Demi-groupe associé
  protection: number; // Niveau de protection de la séance
  template: string; // Contenu du modèle de séance
}

interface Folder {
  id: number; // ID du répertoire
  parent: number; // ID du répertoire parent
  parents: string; // Liste des parents hiérarchiques
  matiere: number; // ID de la matière associée
  nom: string; // Nom du répertoire
  protection: number; // Niveau de protection
  edition: number; // Niveau d'édition
  menu: number; // Indicateur d'affichage dans le menu (0 ou 1)
}

// Table docs
interface Doc {
  id: number; // ID du document
  parent: number; // ID du répertoire parent
  parents: string; // Liste des parents hiérarchiques
  matiere: number; // ID de la matière associée
  nom: string; // Nom du document
  nom_nat: string; // Nom natif du document
  upload: Date; // Date de l'upload
  taille: string; // Taille du fichier
  lien: string; // Lien de téléchargement
  ext: string; // Extension du fichier
  protection: number; // Niveau de protection
  dispo: Date; // Date de disponibilité
}

// Table recents
interface Recent {
  id: number; // ID unique de l'élément récent
  type: number; // Type d'élément
  publi: Date; // Date de publication
  maj: Date; // Date de mise à jour
  titre: string; // Titre de l'élément
  lien: string; // Lien vers l'élément
  texte: string; // Texte de l'élément
  protection: number; // Niveau de protection
  matiere: number; // ID de la matière associée
}

// Table notescolles
interface NoteColle {
  id: number; // ID de la note
  semaine: number; // Semaine associée
  heure: number; // Heure associée
  eleve: number; // ID de l'élève
  colleur: number; // ID du colleur
  matiere: number; // ID de la matière associée
  note: string; // Note
  commentaire: string; // Commentaire
}

// Table heurescolles
interface HeureColle {
  id: number; // ID de l'heure de colle
  colleur: number; // ID du colleur
  matiere: number; // ID de la matière associée
  jour: Date; // Date de la séance
  rattrapage: Date; // Date de rattrapage
  duree: number; // Durée en minutes
  description: string; // Description de l'heure de colle
  releve: Date; // Date de relèvement
  original: number; // ID de l'heure originale, si rattrapage
}

// Table groupes
interface Groupe {
  id: number; // ID du groupe
  nom: string; // Nom du groupe
  nom_nat: string; // Nom natif du groupe
  mails: number; // Envoi de mails : 0 ou 1
  notes: number; // Accès aux notes : 0 ou 1
  utilisateurs: string; // Liste des utilisateurs associés
}

// Table agenda
interface Agenda {
  id: number; // ID de l'événement
  matiere: number; // ID de la matière associée
  type: number; // Type d'événement
  debut: Date; // Date et heure de début
  fin: Date; // Date et heure de fin
  texte: string; // Description de l'événement
  protection: number; // Niveau de protection
  edition: number; // Niveau d'édition
  dispo: Date; // Date de disponibilité
  index_aff: number; // Index d'affichage
}

// Table agenda-types
interface AgendaType {
  id: number; // ID du type d'événement
  nom: string; // Nom du type d'événement
  matiere: number; // ID de la matière associée
  ordre: number; // Ordre d'affichage
  cle: string; // Clé unique de ce type
  couleur: string; // Couleur associée au type (code hexadécimal)
  index_nbmax: number; // Index maximum d'affichage
  index_datemax: number; // Date maximum d'affichage
  template: string; // Modèle de l'événement
}

// Table prefs
interface Pref {
  nom: string; // Nom de la préférence
  val: number; // Valeur associée
}

// Table transferts
interface Transfert {
  id: number; // ID du transfert
  type: number; // Type de transfert
  matiere: number; // ID de la matière associée
  deadline: Date; // Date limite de soumission
  titre: string; // Titre du transfert
  prefixe: string; // Préfixe des noms de fichiers
  lien: string; // Lien vers le transfert
  indications: string; // Indications pour le transfert
  dispo: Date; // Date de disponibilité
}

// Table transdocs
interface Transdoc {
  id: number; // ID du document de transfert
  transfert: number; // ID du transfert associé
  eleve: number; // ID de l'élève
  utilisateur: number; // ID de l'utilisateur
  numero: number; // Numéro de l'envoi
  upload: Date; // Date de l'upload
  taille: string; // Taille du fichier
  ext: string; // Extension du fichier
}
