import os
import glob
import shutil

dir_path = r"c:\Users\VISU\OneDrive\Documents\Smartfusion\Appstore"
html_files = glob.glob(os.path.join(dir_path, "*.html"))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Rename NexStore
    content = content.replace("NexStore", "MatrixHub")
    
    # 2. Add Favicon if not added
    if 'href="favicon.png"' not in content:
        content = content.replace('</head>', '    <link rel="icon" href="favicon.png">\n</head>')
    
    # 3. Update logo div to image
    if '<div class="logo-icon"></div>' in content:
        content = content.replace('<div class="logo-icon"></div>', '<img src="logo.png" class="logo-icon" alt="MatrixHub">')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Copy logo to destination
logo_src = r"C:\Users\VISU\.gemini\antigravity\brain\371fd2b3-4636-4a77-ab37-dd1662d7cb1a\matrixhub_logo_1772610127115.png"
logo_dest = os.path.join(dir_path, "logo.png")
favicon_dest = os.path.join(dir_path, "favicon.png")

if os.path.exists(logo_src):
    shutil.copyfile(logo_src, logo_dest)
    shutil.copyfile(logo_src, favicon_dest)

print("Replacement script executed successfully.")
