import subprocess
from PIL import Image
import os
import sys

# --- CONFIGURATION DU CHEMIN ET DES FICHIERS ---

# Le chemin du script est utilisé pour déterminer le dossier de travail ('assets')
ASSETS_DIR = os.path.dirname(os.path.abspath(sys.argv[0]))

# Fichiers et exécutables
input_file_name = "logo-teo.png"
temp_png_file = "logo-teo_temp_palettized.png" 
output_avif_file = "logo-teo_ultra_compressed.avif"
avifenc_exec = "avifenc.exe" 
pngquant_exec = "pngquant.exe" # Nous l'utilisons en amont pour une préparation optimale du PNG

# PARAMÈTRES D'OPTIMISATION
# Cible agressive pour atteindre 50 Ko. Plus le chiffre est grand, plus la compression est forte.
QUALITE_AVIF = 45 

# --- PRÉPARATION ---
current_working_dir = os.getcwd()
os.chdir(ASSETS_DIR)

print(f"Répertoire de travail : {ASSETS_DIR}")
print("-" * 40)


# --- ÉTAPE 1 : Pré-optimisation PNG (avec Pngquant) ---

# Utiliser Pngquant pour réduire d'abord le PNG au maximum
print(f"1/3. Pré-optimisation du PNG '{input_file_name}' avec Pngquant...")

try:
    subprocess.run([
        pngquant_exec,
        '--force',
        '--quality', '65-80',
        '--output', temp_png_file, # Le résultat compressé du PNG va dans le fichier temporaire
        input_file_name
    ], check=True, capture_output=True, text=True)

except FileNotFoundError:
    print(f"\n💥 ERREUR CRITIQUE : '{pngquant_exec}' non trouvé. Vérifiez le chemin.")
    os.chdir(current_working_dir)
    sys.exit(1)
except subprocess.CalledProcessError as e:
    print(f"\n💥 ERREUR PNGQUANT : {e.stderr}")
    os.chdir(current_working_dir)
    sys.exit(1)

# --- ÉTAPE 2 : Vérification Pillow et Conversion Alpha ---

try:
    print(f"\n2/3. Vérification de la transparence...")
    
    # Ouvrir le fichier temporaire PNG (maintenant optimisé par pngquant)
    img = Image.open(temp_png_file)
    
    # Assurer que le mode est RGBA (avec transparence) pour l'encodeur AVIF
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        img.save(temp_png_file, optimize=True) # Ré-enregistrer si conversion nécessaire
        
except Exception as e:
    print(f"\n💥 ERREUR PIL/Pillow : Échec du traitement de l'image. Le message est : {e}")
    if os.path.exists(temp_png_file): os.remove(temp_png_file)
    os.chdir(current_working_dir)
    sys.exit(1)


# --- ÉTAPE 3 : Compression AVIF Ultime (avec avifenc) ---

print(f"\n3/3. Compression finale AVIF (Quantificateur : {QUALITE_AVIF})...")

try:
    # Exécution de l'encodeur AVIF
    subprocess.run([
        avifenc_exec,
        temp_png_file,      # Fichier PNG temporaire
        '-c', 'aom',        
        '-a', 'end-usage=q',  # Spécifie un encodage basé sur la qualité
        '-q', str(QUALITE_AVIF), # Le niveau de compression agressif
        output_avif_file    # Fichier final de sortie
    ], check=True, capture_output=True, text=True)
    
    # --- Affichage des résultats ---
    taille_originale_ko = os.path.getsize(input_file_name) / 1024
    taille_compressee_ko = os.path.getsize(output_avif_file) / 1024
    
    print("\n" + "#" * 40)
    print(f"✔️ COMPRESSION TERMINÉE AVEC SUCCÈS !")
    print(f"   Taille originale (PNG) : {taille_originale_ko:.2f} Ko")
    print(f"   Taille finale (AVIF)   : {taille_compressee_ko:.2f} Ko")
    print(f"   Gain total : {100 - (taille_compressee_ko / taille_originale_ko * 100):.2f} %")
    print(f"   Fichier généré : {output_avif_file}")
    
    if taille_compressee_ko <= 50:
         print("🎉 OBJECTIF ATTEINT : La taille est bien inférieure ou égale à 50 Ko !")
    else:
         print("⚠️ La taille est encore au-dessus de 50 Ko. Vous devrez augmenter la QUALITE_AVIF.")
         
    print("#" * 40)

except FileNotFoundError:
    print(f"\n💥 ERREUR CRITIQUE : Le programme '{avifenc_exec}' n'a PAS été trouvé. Vérifiez le chemin.")

except subprocess.CalledProcessError as e:
    print(f"\n💥 ERREUR AVIFENC : Le programme a échoué. Le message d'erreur est : {e.stderr}")

finally:
    # Nettoyage : Supprimer le fichier temporaire PNG
    if os.path.exists(temp_png_file):
        os.remove(temp_png_file)
        print(f"\nNettoyage : '{temp_png_file}' supprimé.")

    # Retour au répertoire initial
    os.chdir(current_working_dir)