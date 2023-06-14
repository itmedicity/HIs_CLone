
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownload = async (view) => {

    const printdate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')

    var pdf = {
        content: [
            {
                text: ' TRAVANCORE MEDICAL COLLEGE & HOSPITAL\n',
                style: 'header',

            },
            {
                text: 'A Unit Of Quilon Medical Trust, Mylapore, Thattamala P.O, Kollam',
                style: 'subheader'
            },

            {
                text: 'Phone: 0474-2729393, Mobile: 0474-2729393,2726161, FAX:',
                style: 'subheader1'
            },
            {
                text: 'Email: tmc@tmc.ac.in , Website :',
                style: 'small'
            },
            {
                text: 'User Creation List ',
                style: 'header'
            },
            {
                lineHeight: 1.3,
                text: printdate,
                fontSize: 8,
                bold: false,
                alignment: 'right',
            },


            {
                style: 'tableExample',
                table: {
                    widths: [25, 150, 70, '*', 100, '*'],

                    heights: 10,
                    body: [
                        [
                            { text: 'Sl.No', style: 'tableHeader' },
                            { text: 'Hospital Name', style: 'tableHeader' },
                            { text: 'User Name', style: 'tableHeader' },
                            { text: 'Short Name', style: 'tableHeader' },
                            { text: 'Real Name', style: 'tableHeader' },
                            { text: 'Active', style: 'tableHeader' },
                        ]
                    ].concat(view && view.map((val) => [
                        { text: val.emp_slno, fontSize: 8, alignment: 'center' },
                        { text: 'Travancore Medical College & Hospital', fontSize: 8, alignment: 'center' },
                        { text: val.usc_name, fontSize: 8, alignment: 'left' },
                        { text: val.usc_alias, fontSize: 8, alignment: 'left' },
                        { text: val.usc_first_name, fontSize: 8, alignment: 'left' },
                        { text: (val.usc_active) === 1 ? "Yes" : "No", fontSize: 8, alignment: 'center' },

                    ]))
                }
            }

        ],

        styles: {
            header: {
                fontSize: 11,
                alignment: 'center',
                fontFamily: 'Calibri',
                bold: true,
                lineHeight: 1.5

            },
            subheader: {
                lineHeight: 1.3,
                fontSize: 10,
                alignment: 'center',
                fontFamily: "Arial",
                bold: true

            },
            subheader1: {
                lineHeight: 1.2,
                fontSize: 10,
                alignment: 'center',
                fontFamily: "Arial",

            },
            small: {
                lineHeight: 2,
                alignment: 'center',
                fontSize: 8
            },
            tableExample: {
                lineHeight: 1
                // margin: [0, 0, 0, 0]

            },
            tableHeader: {
                bold: true,
                fontSize: 9,
                color: 'black',
                alignment: 'center',

            }
        }

    }
    pdfMake.createPdf(pdf).open();
}
