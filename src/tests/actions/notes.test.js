/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startUploading } from '../../../../../../Downloads/react-redux-journal-app-0.21.0/src/actions/notes';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}))
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING',
    },
    notes: {
        active: {
            id: '0w6guKyIIwTj4i73JsHT',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore( initState );

describe('Pruebas con las acciones de notes', () => {
    
    beforeEach( () => {
        store = mockStore( initState );
    });


    test('debe crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        // console.log( actions )

        const payload = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
        };

        expect( actions[0] ).toEqual({
            type: types.notesAddNew,
            payload 
        })

        expect( actions[1] ).toEqual({
            type: types.notesActive,
            payload
        })

        const uid = store.getState().auth.uid;
        const docId = actions[0].payload.id;
        //console.log(docId);
        
        await db.doc(`${uid}/journal/notes/${docId}`).delete();

    })

    test('startLoadingNotes debes cargar las notas', async() =>{

        const uid = store.getState().auth.uid;
        await store.dispatch( startLoadingNotes(uid) );

        const actions = store.getActions();
        //console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array),
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    })
    
    test('startSaveNote debe actualizar la nota', async () => {

        const note = {
            id: '1ydtjcnDFz1FxdMy3Wc1',
            title: 'titulo',
            body: 'body',
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        //console.log(actions)

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );
        
    })
    
    test('startUploading debe actualizar el url del entry', async() => {
        
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc('/TESTING/journal/notes/0w6guKyIIwTj4i73JsHT').get();
        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');

    })
})
