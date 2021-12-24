import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {Button} from 'antd'
import logo from '../../Assets/logo-blue.png'
const DownloadTickets = ({id, FirstName, LastName}) => {
    const download = () => {
        const input = document.getElementById(id);
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({format: 'a5'});
            const text1 = `Dear customer ${FirstName} ${LastName},`
            const text2 = `Below is a copy of your reservation. Be advised that this copy can be used to get on your plane. `
            const text3 = 'Thank you for choosing Jet Away services!'
            pdf.text(text1, 5, 30);
            pdf.text(text2, 5, 40, {maxWidth: 130});
            pdf.text(text3, 5, 205);
            pdf.addImage(logo, 'PNG',75, 0, 70, 30);
            pdf.addImage(imgData, 'JPEG', 20, 50, 100, 150);
            pdf.save("ticket.pdf");
          })
        ;
      }
    return (
        <Button onClick={download} >Download Ticket</Button>
    )
}

export default DownloadTickets