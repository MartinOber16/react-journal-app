import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dfoydewqq', 
    api_key: '475635351394693', 
    api_secret: 'sedrUf7LKorM_QeDVXtHtpA4tJo',
    secure: true
  });


describe('Pruebas en fileUpload', () => {

    test('debe cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        //console.log(url);
        expect( typeof url ).toBe( 'string' );

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        
        await cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            //done();
        });
    })

    test('debe retornar un error', async () => {
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    })
    
})
