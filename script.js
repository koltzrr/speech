document.addEventListener('DOMContentLoaded', () => {
    const fileSelect = document.getElementById('fileSelect');
    const fileContent = document.getElementById('fileContent');

    // Función para cargar la lista de archivos desde files.json
    async function loadFiles() {
        try {
            const response = await fetch('files.json');
            if (!response.ok) {
                throw new Error('No se pudo cargar la lista de archivos.');
            }
            const files = await response.json();
            files.forEach(fileName => {
                const option = document.createElement('option');
                option.value = fileName;
                option.textContent = fileName;
                fileSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            fileContent.textContent = 'Error al cargar la lista de archivos.';
        }
    }

    // Función para mostrar el contenido del archivo seleccionado
    async function showFileContent(event) {
        const fileName = event.target.value;
        if (fileName) {
            try {
                const response = await fetch(`files/${fileName}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo.');
                }
                const content = await response.text();
                fileContent.textContent = content;
            } catch (error) {
                console.error(error);
                fileContent.textContent = 'Error al cargar el archivo.';
            }
        } else {
            fileContent.textContent = '';
        }
    }

    // Event listener para cambios en el select
    fileSelect.addEventListener('change', showFileContent);

    // Cargar archivos al cargar la página
    loadFiles();
});
