
import { apiRunner as api } from '../session/interceptor';

export const uploadFiles = async (input: File, output: File, problemId: number) => {
    const formData = new FormData();
    formData.append(`inputs`, input);
    formData.append(`outputs`, output);
    formData.append(`problem_id`, problemId.toString());

    try {
        const response = await api.post('/testCases/uploadTests', formData);
        return response;
    } catch (error) {
        console.error('Error fetching upload files:', error);
    }
};

export const downloadFiles = async (problemId: number) => {

    try {
        const response = await api.get('/testCases/downloadTests', {
            params: {
              problem_id: problemId,
            },
          });

          console.log(response);

        return "si";
    } catch (error) {
        console.error('Error fetching upload files:', error);
    }
};

// const downloadFiles = async (): Promise<void> => {
//     const response = await fetch('http://localhost:3000/download-files');
  
//     if (!response.ok) {
//       throw new Error(Failed to fetch files: ${response.statusText});
//     }
  
//     // Aseguramos que la respuesta tenga el formato JSON esperado
//     const data: { file1: string; file2: string } = await response.json();
  
//     // Función auxiliar para crear y descargar un archivo
//     const downloadFile = (base64Content: string, fileName: string): void => {
//       const blob = new Blob([Uint8Array.from(atob(base64Content), c => c.charCodeAt(0))]);
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     };
  
//     // Descargar los archivos
//     downloadFile(data.file1, 'file1.zip');
//     downloadFile(data.file2, 'file2.zip');
//   };
  
//   downloadFiles().catch(error => {
//     console.error('Error downloading files:', error);
//   });