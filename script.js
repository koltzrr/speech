document.addEventListener('DOMContentLoaded', () => {
    const fileSelect = document.getElementById('fileSelect');
    const fileContent = document.getElementById('fileContent');

    // Función para cargar archivos desde la carpeta "files"
    async function loadFiles() {
        try {
            const response = await fetch('files/');
            if (!response.ok) {
                throw new Error('No se pudo cargar la lista de archivos.');
            }
            const data = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const links = doc.querySelectorAll('a');
            links.forEach(link => {
                const fileName = link.getAttribute('href');
                if (fileName.endsWith('.txt')) {
                    const option = document.createElement('option');
                    option.value = fileName;
                    option.textContent = fileName;
                    fileSelect.appendChild(option);
                }
            });
        } catch (error) {
            console.error(error);
            fileContent.textContent = 'Error al cargar los archivos.';
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
