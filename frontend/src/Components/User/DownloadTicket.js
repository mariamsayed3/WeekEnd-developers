import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {Button} from 'antd'
const DownloadTickets = ({id}) => {
    const download = () => {
        const input = document.getElementById(id);
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.text("Hello world!", 10, 10);
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("ticket.pdf");
          })
        ;
      }
    return (
        <Button onClick={download} >Download Tickets</Button>
    )
}

export default DownloadTickets