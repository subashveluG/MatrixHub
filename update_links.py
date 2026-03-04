import glob
import os

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update link URLs
    content = content.replace('"index.html"', '"home1.html"')
    content = content.replace('"home-hype.html"', '"home2.html"')
    
    # Update display text specifically in navs/footers
    content = content.replace('>Home</a>', '>Home1</a>')
    content = content.replace('>Explore</a>', '>Home2</a>')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Updated all HTML files successfully.")
