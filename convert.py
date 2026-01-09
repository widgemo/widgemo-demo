import re

with open('src/data/sampleData.ts', 'r') as f:
    content = f.read()

# Replace imagesConfig with mediaConfig structure
def replace_imagesConfig(match):
    config_content = match.group(1)
    # Extract properties
    field_match = re.search(r"field: '([^']+)'", config_content)
    fit_match = re.search(r"fit: '([^']+)'", config_content)
    lazy_match = re.search(r'lazy: (true|false)', config_content)
    loading_match = re.search(r'loadingPlaceholder: ([^,\n]+)', config_content)
    
    field = field_match.group(1) if field_match else 'src'
    fit = fit_match.group(1) if fit_match else 'cover'
    lazy = lazy_match.group(1) if lazy_match else 'true'
    loading = loading_match.group(1) if loading_match else "'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'"
    
    return f'''mediaConfig: {{
          fields: [{{
            field: '{field}',
            fit: '{fit}',
            lightbox: true
          }}],
          lazy: {lazy},
          loadingPlaceholder: {loading}
        }}'''

content = re.sub(r'imagesConfig: \{([^}]+)\}', replace_imagesConfig, content)

with open('src/data/sampleData.ts', 'w') as f:
    f.write(content)

print('Conversion completed')