import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePDF = (numeroFactura) => {
    const pdfRef = useRef(null);

    // Función para descargar PDF
    const downloadPDF = () => {
        const input = pdfRef.current;

        // Ocultar botones y elementos no necesarios en el PDF
        const originalDisplay = [];
        const elementsToHide = input.querySelectorAll('.no-print, button');
        elementsToHide.forEach((el, index) => {
            originalDisplay[index] = el.style.display;
            el.style.display = 'none';
        });

        html2canvas(input, {
            scale: 2, // Mejor calidad
            useCORS: true,
            logging: false
        }).then((canvas) => {
            // Restaurar elementos ocultos
            elementsToHide.forEach((el, index) => {
                el.style.display = originalDisplay[index];
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Ancho A4 en mm
            const pageHeight = 295; // Alto A4 en mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Añadir páginas adicionales si el contenido es muy largo
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Guardar PDF
            pdf.save(`factura-${numeroFactura}.pdf`);
        });
    };
    return { pdfRef, downloadPDF };
}
