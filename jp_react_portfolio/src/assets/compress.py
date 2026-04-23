import subprocess
from PIL import Image
import os
import sys

# --- CONFIGURATION DU CHEMIN ET DES FICHIERS ---

# Le chemin du script est utilisé pour déterminer le dossier de travail ('assets')
# Ceci garantit que pngquant.exe sera trouvé
ASSETS_DIR = os.path.dirname(os.path.abspath(sys.argv[0]))

# Fichiers et exécutable (doivent être dans le dossier 'assets')
input_file_name = "logo-teo.png"
temp_file = "logo-teo_temp_palettized.png" # Fichier temporaire après traitement Pillow
output_file = "logo-teo_compressed_final.png"
pngquant_exec = "pngquant.exe"

# --- PRÉPARATION ---
# Sauvegarde du répertoire de travail actuel et déplacement vers le dossier 'assets'
current_working_dir = os.getcwd()
os.chdir(ASSETS_DIR)

print(f"Répertoire de travail : {ASSETS_DIR}")
print("-" * 40)

# --- ÉTAPE 1 : Optimisation de Palette (avec PIL) ---

try:
    print(f"1/2. Préparation de l'image source '{input_file_name}' (Optimisation de palette)...")
    
    img = Image.open(input_file_name)
    
    # Conserver la transparence (RGBA) puis convertir en mode Palette (P) 
    # pour réduire le nombre de couleurs et optimiser la compression PNG
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    # Convertir en mode 'P' (Palette) avec 256 couleurs pour un maximum de réduction
    img = img.convert('P', palette=Image.ADAPTIVE, colors=256) 
    
    # Sauvegarde temporaire du fichier préparé
    img.save(temp_file, optimize=True)
    
    print(f"   -> Image préparée en mode palette : {temp_file}")
    
except Exception as e:
    print(f"\n💥 ERREUR PIL/Pillow : Échec du traitement de l'image. Le message est : {e}")
    os.chdir(current_working_dir)
    sys.exit(1)


# --- ÉTAPE 2 : Compression maximale (avec pngquant) ---

print(f"\n2/2. Compression finale avec Pngquant...")

try:
    # Exécution de l'encodeur pngquant : 
    # Le paramètre '--quality 65-80' est un excellent compromis pour le PNG
    subprocess.run([
        pngquant_exec,
        '--force',
        '--quality', '65-80', # Qualité visuelle (la perte sera minimale)
        '--output', output_file,
        temp_file
    ], check=True, capture_output=True, text=True)
    
    # --- Affichage des résultats ---
    taille_originale = os.path.getsize(input_file_name) / 1024
    taille_compressee = os.path.getsize(output_file) / 1024
    
    print("\n" + "#" * 40)
    print(f"✔️ COMPRESSION TERMINÉE AVEC SUCCÈS !")
    print(f"   Taille originale : {taille_originale:.2f} Ko")
    print(f"   Taille finale    : {taille_compressee:.2f} Ko")
    print(f"   Gain total : {100 - (taille_compressee / taille_originale * 100):.2f} %")
    print(f"   Fichier généré : {output_file}")
    print("#" * 40)

except FileNotFoundError:
    print("\n💥 ERREUR CRITIQUE : Le programme 'pngquant.exe' n'a PAS été trouvé.")
    print("Veuillez vous assurer qu'il est bien dans le dossier 'assets'.")

except subprocess.CalledProcessError as e:
    print(f"\n💥 ERREUR PNGQUANT : Le programme a échoué. Le message d'erreur est : {e.stderr}")

finally:
    # Nettoyage : Supprimer le fichier temporaire
    if os.path.exists(temp_file):
        os.remove(temp_file)
        print(f"\nNettoyage : '{temp_file}' supprimé.")

    # Retour au répertoire initial
    os.chdir(current_working_dir)